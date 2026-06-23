import type { FaustEditorAudioEnv, FaustEditorUIEnv, LegacyWaveSurferBackend } from "../runtime/types";

type WaveSurferFactory = {
    create: (options: Record<string, unknown>) => WaveSurfer;
};

type AudioInputControllerOptions = {
    audioEnv: FaustEditorAudioEnv;
    uiEnv: FaustEditorUIEnv;
    waveSurferFactory: WaveSurferFactory;
    initAudioCtx: (deviceId: string) => Promise<FaustEditorAudioEnv>;
    showError: (message: string) => void;
    onWaveSurferCreated?: (wavesurfer: WaveSurfer) => void;
};

/**
 * Binds audio input selection and source waveform controls.
 *
 * WaveSurfer is created lazily because its media element is also consumed by
 * the audio graph. The controller owns only the source UI state and delegates
 * audio graph creation to the runtime composition root.
 */
export class AudioInputController {
    private readonly audioEnv: FaustEditorAudioEnv;
    private readonly uiEnv: FaustEditorUIEnv;
    private readonly waveSurferFactory: WaveSurferFactory;
    private readonly initAudioCtx: (deviceId: string) => Promise<FaustEditorAudioEnv>;
    private readonly showError: (message: string) => void;
    private readonly onWaveSurferCreated?: (wavesurfer: WaveSurfer) => void;
    private wavesurfer?: WaveSurfer;

    constructor(options: AudioInputControllerOptions) {
        this.audioEnv = options.audioEnv;
        this.uiEnv = options.uiEnv;
        this.waveSurferFactory = options.waveSurferFactory;
        this.initAudioCtx = options.initAudioCtx;
        this.showError = options.showError;
        this.onWaveSurferCreated = options.onWaveSurferCreated;
    }

    /**
     * Returns the lazily-created WaveSurfer instance for layout integrations.
     */
    getWaveSurfer() {
        return this.wavesurfer;
    }

    /**
     * Binds input selector, waveform controls, loop toggle, and drag-and-drop.
     */
    bind() {
        $<HTMLSelectElement>("#select-audio-input").on("change", e => this.selectInput(e.currentTarget.value));
        $("#btn-source-play").on("click", () => this.toggleSourcePlayback());
        $("#btn-source-rewind").on("click", () => this.rewindSource());
        $("#btn-source-loop").on("click", e => $(e.currentTarget).toggleClass("active"));
        this.bindWaveformDrop();
    }

    /**
     * Switches between file-backed source input and hardware audio inputs.
     */
    private async selectInput(id: string) {
        if (this.audioEnv.currentInput === id) return;
        this.disconnectCurrentInput();
        const wavesurfer = this.ensureWaveSurfer();
        this.applyInputUi(id, wavesurfer);
        await this.initAudioCtx(id);
        const gain = this.audioEnv.gainInput;
        const input = this.audioEnv.inputs[id];
        this.audioEnv.currentInput = id;
        this.audioEnv.inputEnabled = true;
        if (gain) input.connect(gain);
    }

    /**
     * Disconnects the previous input from the shared input gain node.
     */
    private disconnectCurrentInput() {
        if (!this.audioEnv.audioCtx || !this.audioEnv.currentInput) return;
        const gain = this.audioEnv.gainInput;
        const input = this.audioEnv.inputs[this.audioEnv.currentInput];
        if (gain) input.disconnect(gain);
    }

    /**
     * Lazily creates WaveSurfer once its source UI is first needed.
     */
    private ensureWaveSurfer() {
        if (this.wavesurfer) return this.wavesurfer;
        this.wavesurfer = this.waveSurferFactory.create({
            container: $("#source-waveform")[0],
            audioContext: this.audioEnv.audioCtx,
            backend: "MediaElement",
            cursorColor: "#EEE",
            progressColor: "#888",
            waveColor: "#BBB",
            height: 60,
            splitChannels: true
        });
        this.bindWaveSurferEvents(this.wavesurfer);
        this.wavesurfer.load("./02-XYLO1.mp3");
        if (this.onWaveSurferCreated) this.onWaveSurferCreated(this.wavesurfer);
        return this.wavesurfer;
    }

    /**
     * Mirrors WaveSurfer playback events into analyser and play-button state.
     */
    private bindWaveSurferEvents(wavesurfer: WaveSurfer) {
        wavesurfer.on("play", () => {
            $("#btn-source-play .fa-play").removeClass("fa-play").addClass("fa-pause");
            $("#input-analyser-ui").show();
            if (this.uiEnv.inputScope) this.uiEnv.inputScope.disabled = false;
        });
        wavesurfer.on("pause", () => {
            this.hideInputAnalyser();
        });
        wavesurfer.on("finish", () => {
            if ($("#btn-source-loop").hasClass("active")) wavesurfer.play();
            else this.hideInputAnalyser();
        });
        wavesurfer.on("waveform-ready", () => {
            this.audioEnv.gainUIInput.channels = (wavesurfer.backend as LegacyWaveSurferBackend).buffer.numberOfChannels;
        });
    }

    /**
     * Shows source-file UI or hardware analyser UI for the selected input.
     */
    private applyInputUi(id: string, wavesurfer: WaveSurfer) {
        if (id === "-1") {
            $("#source-ui").show();
            $("#input-analyser-ui").hide();
            if (this.uiEnv.inputScope) this.uiEnv.inputScope.disabled = true;
            const backend = wavesurfer.backend as LegacyWaveSurferBackend;
            this.audioEnv.gainUIInput.channels = backend.buffer ? backend.buffer.numberOfChannels : 2;
        } else {
            $("#source-ui").hide();
            $("#input-analyser-ui").show();
            if (this.uiEnv.inputScope) this.uiEnv.inputScope.disabled = false;
            this.audioEnv.gainUIInput.channels = 2;
        }
    }

    /**
     * Resets play-button and input analyser state after playback stops.
     */
    private hideInputAnalyser() {
        $("#btn-source-play .fa-pause").removeClass("fa-pause").addClass("fa-play");
        $("#input-analyser-ui").hide();
        if (this.uiEnv.inputScope) this.uiEnv.inputScope.disabled = true;
    }

    /**
     * Toggles WaveSurfer playback from the source play button.
     */
    private toggleSourcePlayback() {
        const wavesurfer = this.wavesurfer;
        if (!wavesurfer || !wavesurfer.isReady) return;
        if (wavesurfer.isPlaying()) wavesurfer.pause();
        else wavesurfer.play();
    }

    /**
     * Seeks the source waveform back to the beginning.
     */
    private rewindSource() {
        const wavesurfer = this.wavesurfer;
        if (!wavesurfer || !wavesurfer.isReady) return;
        wavesurfer.seekTo(0);
    }

    /**
     * Binds drag-and-drop for replacing the file-backed source waveform.
     */
    private bindWaveformDrop() {
        $("#source-waveform").on("dragenter dragover", (e) => {
            const event = e.originalEvent as DragEvent;
            if (event.dataTransfer && event.dataTransfer.items.length && event.dataTransfer.items[0].kind === "file") {
                e.preventDefault();
                e.stopPropagation();
                $("#source-overlay").show();
            }
        });
        $("#source-overlay").on("dragleave dragend", (e) => {
            e.preventDefault();
            e.stopPropagation();
            $(e.currentTarget).hide();
        });
        $("#source-overlay").on("dragenter dragover", (e) => {
            e.preventDefault();
            e.stopPropagation();
        });
        $("#source-overlay").on("drop", e => this.dropSourceFile(e));
    }

    /**
     * Loads a dropped audio file into WaveSurfer and reconnects its media node.
     */
    private dropSourceFile(e: JQuery.DropEvent) {
        $(e.currentTarget).hide();
        const wavesurfer = this.wavesurfer;
        if (!wavesurfer || !wavesurfer.isReady) return;
        const event = e.originalEvent as DragEvent;
        if (!event.dataTransfer || !event.dataTransfer.files.length) return;
        e.preventDefault();
        e.stopPropagation();
        const gain = this.audioEnv.gainInput;
        let input = this.audioEnv.inputs[-1];
        if (gain) input.disconnect(gain);
        this.audioEnv.inputEnabled = false;

        const file = event.dataTransfer.files[0];
        try {
            wavesurfer.load(URL.createObjectURL(file));
        } catch (error) {
            console.error(error); // eslint-disable-line no-console
            this.showError("Cannot load sound file: " + (error as Error).message);
            return;
        }
        if ($("#source-waveform audio").length) {
            this.audioEnv.inputs[-1] = this.audioEnv.audioCtx.createMediaElementSource($<HTMLAudioElement>("#source-waveform audio")[0]);
            input = this.audioEnv.inputs[-1];
        }
        this.audioEnv.inputEnabled = true;
        if (gain) input.connect(gain);
    }
}
