import { AudioGraphState } from "../runtime/state/AudioGraphState";
import type { FaustEditorAudioEnv } from "../runtime/types";

type AudioOutputControllerOptions = {
    audioEnv: FaustEditorAudioEnv;
    getSupportMediaStreamDestination: () => boolean;
    initAudioCtx: () => Promise<FaustEditorAudioEnv>;
    initAnalysersUI: () => void;
    setRecorderSampleRate: (sampleRate: number) => void;
};

/**
 * Binds audio output device selection and DAC output toggling.
 *
 * The controller keeps the DOM-visible button state in sync with the audio
 * graph, while delegating context creation and analyser initialization to the
 * runtime composition root.
 */
export class AudioOutputController {
    private readonly audioEnv: FaustEditorAudioEnv;
    private readonly audioState: AudioGraphState;
    private readonly getSupportMediaStreamDestination: () => boolean;
    private readonly initAudioCtx: () => Promise<FaustEditorAudioEnv>;
    private readonly initAnalysersUI: () => void;
    private readonly setRecorderSampleRate: (sampleRate: number) => void;

    constructor(options: AudioOutputControllerOptions) {
        this.audioEnv = options.audioEnv;
        this.audioState = new AudioGraphState(options.audioEnv);
        this.getSupportMediaStreamDestination = options.getSupportMediaStreamDestination;
        this.initAudioCtx = options.initAudioCtx;
        this.initAnalysersUI = options.initAnalysersUI;
        this.setRecorderSampleRate = options.setRecorderSampleRate;
    }

    /**
     * Binds output device selection and DAC toggle controls.
     */
    bind() {
        $<HTMLSelectElement>("#select-audio-output")
            .on("change", e => this.selectOutputDevice(e.currentTarget.value))
            .change();
        $(".btn-dac").on("click", () => this.toggleDac());
    }

    /**
     * Applies the selected output sink when the browser supports setSinkId.
     */
    private async selectOutputDevice(id: string) {
        if (!this.getSupportMediaStreamDestination()) return;
        await this.initAudioCtx();
        this.setRecorderSampleRate(this.audioEnv.audioCtx.sampleRate);
        const audio = $<HTMLAudioElement & { setSinkId: (sinkId: string) => Promise<void> }>("#output-audio-stream")[0];
        audio.setSinkId(id);
    }

    /**
     * Switches the DSP output connection on or off.
     */
    private async toggleDac() {
        if (this.audioEnv.outputEnabled) {
            this.disableOutput();
        } else {
            await this.enableOutput();
        }
    }

    /**
     * Disconnects the DSP from the audio destination and updates button state.
     */
    private disableOutput() {
        this.audioState.setOutputEnabled(false);
        this.audioState.disconnectFromOutput();
        $(".btn-dac").removeClass("btn-primary").addClass("btn-light").children("span").html("Output is Off");
        $(".fa-volume-up").removeClass("fa-volume-up").addClass("fa-volume-mute");
    }

    /**
     * Ensures audio is initialized, connects DSP output, and updates UI state.
     */
    private async enableOutput() {
        this.audioState.setOutputEnabled(true);
        if (!this.audioEnv.audioCtx) {
            await this.initAudioCtx();
            this.initAnalysersUI();
        } else if (this.audioEnv.dsp) {
            this.audioState.connectToOutput(this.audioEnv.dsp);
        }
        $(".btn-dac").removeClass("btn-light").addClass("btn-primary").children("span").html("Output is On");
        $(".fa-volume-mute").removeClass("fa-volume-mute").addClass("fa-volume-up");
    }
}
