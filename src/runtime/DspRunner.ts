import type { AudioData, FaustAudioWorkletNode, FaustCompiler, FaustScriptProcessorNode, LibFaust } from "@grame/faustwasm";
import { FaustMonoDspGenerator, FaustPolyDspGenerator } from "@grame/faustwasm";
import { AudioGraphState } from "./state/AudioGraphState";
import type { FaustEditorAudioEnv } from "./types";

type DspNode = FaustScriptProcessorNode<any> | FaustAudioWorkletNode<any>;

type DspRunnerOptions = {
    audioEnv: FaustEditorAudioEnv;
    faustCompiler: FaustCompiler;
    libFaust: LibFaust;
    projectDir: string;
};

export type DspRunOptions = {
    code: string;
    compilerArgs: string[];
    useDouble: boolean;
    useWorklet: boolean;
    bufferSize: number;
    voices: number;
    saveParams: boolean;
    dspParams: { [path: string]: number };
    plotHandler: (plotted: Float32Array[], index: number, events?: { type: string; data: any }[]) => void;
    onOutputSplitterChanged?: (splitter: ChannelSplitterNode, channels: number) => void;
};

export type DspRunResult = {
    success: boolean;
    node?: DspNode;
    error?: Error;
};

/**
 * Owns Faust DSP compilation and the non-visual Web Audio node swap.
 *
 * The surrounding UI still decides when to initialize the AudioContext, how to
 * display compilation errors, and how to bind the generated Faust UI. This
 * service only handles deterministic runtime work: generator selection,
 * soundfile injection, parameter restoration, and graph reconnection.
 */
export class DspRunner {
    private readonly audioEnv: FaustEditorAudioEnv;
    private readonly audioState: AudioGraphState;
    private readonly faustCompiler: FaustCompiler;
    private readonly libFaust: LibFaust;
    private readonly projectDir: string;
    private compiling = false;

    constructor(options: DspRunnerOptions) {
        this.audioEnv = options.audioEnv;
        this.audioState = new AudioGraphState(options.audioEnv);
        this.faustCompiler = options.faustCompiler;
        this.libFaust = options.libFaust;
        this.projectDir = options.projectDir;
    }

    /**
     * Compiles a DSP, replaces the previous node, restores saved parameters,
     * and reconnects input/output graph state.
     */
    async run(options: DspRunOptions): Promise<DspRunResult> {
        if (this.compiling) return { success: false, error: new Error("Another DSP is compiling") };
        this.compiling = true;
        try {
            const node = await this.compileNode(options);
            if (!node) throw new Error("Unknown Error in WebAudio Node.");
            node.setPlotHandler(options.plotHandler);
            node.startSensors();
            this.replaceCurrentNode(node, options);
            await this.audioEnv.audioCtx.resume();
            return { success: true, node };
        } catch (error) {
            return { success: false, error: error instanceof Error ? error : new Error(String(error)) };
        } finally {
            this.compiling = false;
        }
    }

    /**
     * Loads project-local soundfiles into the shape expected by faustwasm.
     * Exposed for offline plotting, which shares the same project filesystem.
     */
    async loadSoundfiles(audioCtx: BaseAudioContext, soundfileList: string[]): Promise<Record<string, AudioData>> {
        const map = {} as Record<string, AudioData>;
        const files = this.libFaust.fs().readdir(this.projectDir) as string[];
        await Promise.all(files.filter(n => soundfileList.indexOf(n) !== -1).map(async (filename) => {
            const ui8Array = this.libFaust.fs().readFile(this.projectDir + filename);
            try {
                const audioBuffer = await audioCtx.decodeAudioData(ui8Array.buffer);
                map[filename] = {
                    audioBuffer: new Array(audioBuffer.numberOfChannels).fill(0).map((v, i) => audioBuffer.getChannelData(i)),
                    sampleRate: audioBuffer.sampleRate
                } as AudioData;
            } catch (error) {
                return false;
            }
            return true;
        }));
        return map;
    }

    /**
     * Selects mono or poly generation and injects any required soundfiles
     * before creating the browser DSP node.
     */
    private async compileNode(options: DspRunOptions): Promise<DspNode> {
        const audioCtx = this.requireAudioContext();
        const args = options.compilerArgs.slice();
        if (options.useDouble) args.push("-double");
        if (options.voices) {
            const factory = await new FaustPolyDspGenerator().compile(this.faustCompiler, "main", options.code, args.join(" "));
            const soundfileList = factory.getSoundfileList();
            const soundfiles = await this.loadSoundfiles(audioCtx, soundfileList);
            factory.addSoundfiles(soundfiles);
            return factory.createNode(audioCtx, options.voices, "main", undefined, undefined, undefined, !options.useWorklet, options.bufferSize);
        }
        const factory = await new FaustMonoDspGenerator().compile(this.faustCompiler, "main", options.code, args.join(" "));
        const soundfileList = factory.getSoundfileList();
        const soundfiles = await this.loadSoundfiles(audioCtx, soundfileList);
        factory.addSoundfiles(soundfiles);
        return factory.createNode(audioCtx, "main", undefined, !options.useWorklet, options.bufferSize);
    }

    /**
     * Disconnects the previous DSP and connects the new one to the existing
     * input, analyser splitter, and destination according to runtime flags.
     */
    private replaceCurrentNode(node: DspNode, options: DspRunOptions) {
        const audioCtx = this.requireAudioContext();
        const gain = this.audioEnv.gainInput;
        const analyser = this.audioEnv.analyserOutput;
        if (!gain || !analyser || !this.audioEnv.destination) throw new Error("Audio graph is not ready");
        this.disconnectCurrentNode(gain);
        this.restoreParams(node, options);
        this.audioState.setCurrentDsp(node);

        const channelsCount = node.getNumOutputs();
        let splitter = this.audioEnv.splitterOutput;
        if (!splitter || splitter.numberOfOutputs !== channelsCount) {
            if (splitter) splitter.disconnect();
            splitter = audioCtx.createChannelSplitter(channelsCount);
            this.audioState.setSplitterOutput(splitter);
            options.onOutputSplitterChanged?.(splitter, channelsCount);
        }
        if (this.audioEnv.gainInput && node.getNumInputs()) {
            this.audioEnv.gainInput.connect(node);
            this.audioState.markConnectedToInput(true);
        }
        node.connect(splitter);
        if (this.audioEnv.outputEnabled) {
            node.connect(this.audioEnv.destination);
            this.audioState.markConnectedToOutput(true);
        }
    }

    /** Re-applies saved parameter values to a freshly created node, skipping paths it does not expose. */
    private restoreParams(node: DspNode, options: DspRunOptions) {
        if (!options.saveParams) return;
        const params = node.getParams();
        for (const path in options.dspParams) {
            if (params.indexOf(path) !== -1) node.setParamValue(path, options.dspParams[path]);
        }
    }

    /** Disconnects, destroys, and clears the current DSP node, resetting its input/output wiring flags. */
    private disconnectCurrentNode(gain: GainNode) {
        if (!this.audioEnv.dsp) return;
        const dsp = this.audioEnv.dsp;
        if (this.audioState.connectedToInput) {
            gain.disconnect(dsp);
            this.audioState.markConnectedToInput(false);
        }
        dsp.disconnect();
        this.audioState.markConnectedToOutput(false);
        dsp.destroy();
        this.audioState.clearCurrentDsp();
    }

    /** Returns the active AudioContext or throws if the audio graph is not ready. */
    private requireAudioContext() {
        if (!this.audioEnv.audioCtx) throw new Error("Audio context is not ready");
        return this.audioEnv.audioCtx;
    }
}
