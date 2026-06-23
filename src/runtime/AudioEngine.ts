import type { FaustEditorAudioEnv } from "./types";
import { GainUI, createMeterNode } from "../MeterNode";

/**
 * Small adapter used by AudioEngine to install the browser gesture unlock
 * handler without depending on jQuery or concrete DOM event wiring.
 */
type UnlockTarget = {
    add: (handler: () => any) => void;
    remove: (handler: () => any) => void;
};

/**
 * Dependencies needed to build the shared Web Audio graph.
 *
 * The service owns runtime audio nodes, but UI-specific concerns stay injected:
 * state badge updates, gesture-unlock event binding, and the sample-player
 * media element lookup remain outside of this class.
 */
type AudioEngineOptions = {
    env: FaustEditorAudioEnv;
    gainContainer: HTMLDivElement;
    mediaElementProvider?: () => HTMLMediaElement | null;
    unlockTarget?: UnlockTarget;
    onStateChange?: (state: AudioContextState) => void;
};

/**
 * Creates and maintains the editor's base audio environment.
 *
 * This class deliberately stops at the stable graph infrastructure:
 * AudioContext, input source cache, input gain/meter/splitter/analyser chain,
 * output analyser, and destination setup. DSP node creation/replacement remains
 * in the runtime for now because it is tied to Faust compilation and UI binding.
 */
export class AudioEngine {
    env: FaustEditorAudioEnv;
    gainContainer: HTMLDivElement;
    mediaElementProvider: () => HTMLMediaElement | null;
    unlockTarget?: UnlockTarget;
    onStateChange: (state: AudioContextState) => void;

    constructor(options: AudioEngineOptions) {
        this.env = options.env;
        this.gainContainer = options.gainContainer;
        this.mediaElementProvider = options.mediaElementProvider || (() => null);
        this.unlockTarget = options.unlockTarget;
        this.onStateChange = options.onStateChange || (() => undefined);
    }

    /**
     * Ensures the audio context and base graph exist, optionally creating a
     * cached input source for a media element (`-1`) or a real audio input
     * device. The method is idempotent for the same environment.
     */
    async initialize(deviceId?: string) {
        if (!this.env.audioCtx) this.createAudioContext();
        if (this.env.audioCtx.state !== "running") this.env.audioCtx.resume();
        await this.ensureInput(deviceId);
        this.ensureInputGraph();
        this.ensureDestination();
        return this.env;
    }

    /**
     * Creates the browser AudioContext with the same low-latency hint used by
     * the legacy runtime and wires the state-change callback for UI consumers.
     */
    private createAudioContext() {
        const audioCtx = new (window.webkitAudioContext || window.AudioContext)({ latencyHint: 0.00001 });
        this.env.audioCtx = audioCtx;
        this.env.outputEnabled = true;
        audioCtx.addEventListener("statechange", () => this.onStateChange(audioCtx.state));
        this.installUnlockHandler(audioCtx);
    }

    /**
     * Some browsers require a user gesture before a suspended AudioContext can
     * resume. The caller provides the event binding target so this service stays
     * independent from jQuery.
     */
    private installUnlockHandler(audioCtx: AudioContext) {
        if (!this.unlockTarget) return;
        if (audioCtx.state !== "suspended") return;
        const unlock = (): any => audioCtx.resume().then(clean);
        const clean = () => this.unlockTarget.remove(unlock);
        this.unlockTarget.add(unlock);
    }

    /**
     * Creates one input source per device id and keeps it in `env.inputs`.
     * The special id `-1` is the sample-player media element used by the app.
     */
    private async ensureInput(deviceId?: string) {
        if (!this.env.inputs) this.env.inputs = {};
        if (!deviceId || this.env.inputs[deviceId]) return;
        if (deviceId === "-1") {
            const mediaElement = this.mediaElementProvider();
            if (mediaElement) this.env.inputs[deviceId] = this.env.audioCtx.createMediaElementSource(mediaElement);
            return;
        }
        const stream = await navigator.mediaDevices.getUserMedia({ audio: { deviceId, echoCancellation: false, noiseSuppression: false, autoGainControl: false } });
        this.env.inputs[deviceId] = this.env.audioCtx.createMediaStreamSource(stream);
    }

    /**
     * Builds the shared input monitoring chain:
     * gain -> meter -> splitter -> analyser.
     *
     * Existing code calls initialization from several paths, so repeated calls
     * must preserve previously created nodes while refreshing UI gain state.
     */
    private ensureInputGraph() {
        if (!this.env.meterInput) this.env.meterInput = createMeterNode(this.env.audioCtx);
        if (!this.env.gainInput) this.env.gainInput = this.env.audioCtx.createGain();
        this.env.gainInput.connect(this.env.meterInput, 0, 0);
        if (!this.env.gainUIInput) this.env.gainUIInput = new GainUI(this.gainContainer, this.env.meterInput, this.env.gainInput);
        this.env.gainUIInput.value = 0;
        if (!this.env.splitterInput) this.env.splitterInput = this.env.audioCtx.createChannelSplitter(2);
        this.env.meterInput.connect(this.env.splitterInput, 0, 0);
        if (!this.env.analyserInput) this.env.analyserInput = this.env.audioCtx.createAnalyser();
        if (!this.env.analyserOutput) this.env.analyserOutput = this.env.audioCtx.createAnalyser();
        this.env.splitterInput.connect(this.env.analyserInput, 0);
    }

    /**
     * Uses the AudioContext destination and configures it for discrete channel
     * handling, matching the previous inline runtime behavior.
     */
    private ensureDestination() {
        if (this.env.destination) return;
        this.env.destination = this.env.audioCtx.destination;
        this.env.destination.channelCount = this.env.destination.maxChannelCount;
        this.env.destination.channelInterpretation = "discrete";
    }
}
