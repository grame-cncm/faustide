/**
 * Shared runtime type definitions for the Faust IDE.
 *
 * These types were previously declared globally (in `src/types.d.ts` and on the
 * legacy `faustEnv` object). They are collected here as explicit modules so
 * services and controllers can depend on named contracts instead of ambient
 * globals. Several of the environment objects stay intentionally mutable
 * because legacy controllers attach live audio/UI state to them during startup.
 */
import type { FaustAudioWorkletNode, FaustCompiler, FaustScriptProcessorNode } from "@grame/faustwasm";
import type * as monaco from "monaco-editor";
import type { Input } from "webmidi";
import type { Analyser } from "../Analyser";
import type { FileManager } from "../FileManager";
import type { GainUI, MeterNode } from "../MeterNode";
import type { Recorder } from "../Recorder";
import type { Scope } from "../Scope";
import type { StaticScope } from "../StaticScope";

/**
 * User-facing and startup-only compile settings.
 *
 * Produced by `createCompileOptions` and persisted through
 * {@link EditorSettingsStore}; mixes editor preferences (plot, voices, export
 * target) with Faust compiler arguments (`args`, `useDouble`, `useWorklet`).
 */
export type FaustEditorCompileOptions = {
    mainFile?: string;
    useWorklet: boolean;
    useDouble: boolean;
    bufferSize: 128 | 256 | 512 | 1024 | 2048 | 4096;
    saveCode: boolean;
    saveParams: boolean;
    saveDsp: boolean;
    realtimeCompile: boolean;
    popup: boolean;
    voices: number;
    plotMode: "offline" | "continuous" | "onevent" | "manual";
    plot: number;
    plotSR: number;
    plotFFT: 256 | 512 | 1024 | 2048 | 4096 | 8192 | 16384 | 32768 | 65536;
    plotFFTOverlap: 1 | 2 | 4 | 8;
    drawSpectrogram: boolean;
    args: string[];
    enableGuiBuilder: boolean;
    guiBuilderUrl: string;
    exportPlatform: string;
    exportArch: string;
};

/**
 * Top-level runtime environment, exposed as the legacy `window.faustEnv` bridge.
 *
 * Aggregates the audio, MIDI, and UI sub-environments together with the shared
 * editor, compiler, recorder, and persistent filesystem handles.
 */
export type FaustEditorEnv = {
    audioEnv: FaustEditorAudioEnv;
    midiEnv: FaustEditorMIDIEnv;
    uiEnv: FaustEditorUIEnv;
    compileOptions: FaustEditorCompileOptions;
    editor: monaco.editor.IStandaloneCodeEditor;
    jQuery: JQueryStatic;
    faustCompiler: FaustCompiler;
    recorder: Recorder;
    browserFS: typeof import("@zenfs/core").promises;
};

/**
 * Live audio-graph state owned by {@link AudioEngine} and the audio controllers.
 *
 * Holds the AudioContext, the input/output meter–splitter–analyser chain, the
 * cache of input sources, the current DSP node, and the boolean flags tracking
 * whether the DSP is wired to input/output and whether each side is enabled.
 */
export type FaustEditorAudioEnv = {
    audioCtx?: AudioContext;
    meterInput?: MeterNode;
    gainInput?: GainNode;
    gainUIInput?: GainUI;
    splitterInput?: ChannelSplitterNode;
    analyserInput?: AnalyserNode;
    splitterOutput?: ChannelSplitterNode;
    analyserOutput?: AnalyserNode;
    inputs?: { [deviceId: string]: MediaStreamAudioSourceNode | MediaElementAudioSourceNode };
    currentInput?: string;
    destination?: MediaStreamAudioDestinationNode | AudioDestinationNode;
    dsp?: FaustScriptProcessorNode | FaustAudioWorkletNode;
    dspConnectedToOutput: boolean;
    dspConnectedToInput: boolean;
    inputEnabled: boolean;
    outputEnabled: boolean;
};

/** Currently selected Web MIDI input, or `null` when none is connected. */
export type FaustEditorMIDIEnv = {
    input: Input;
};

/**
 * UI-side runtime state: analyser/scope instances, the optional DSP UI popup
 * window, and the file manager. `analysersInited` guards one-time scope setup.
 */
export type FaustEditorUIEnv = {
    analysersInited: boolean;
    inputScope: Scope;
    outputScope: Scope;
    plotScope: StaticScope;
    uiPopup?: Window;
    analyser: Analyser;
    fileManager: FileManager;
};

/** Export targets discovered from the Faust service: platform → list of architectures. */
export type FaustExportTargets = { [platform: string]: string[] };

/**
 * WaveSurfer backend augmented with the decoded `buffer`.
 *
 * The shipped WaveSurfer typings omit the `buffer` field that the recorder
 * playback path reads, so this interface restores it for type-safe access.
 */
export interface LegacyWaveSurferBackend extends WaveSurfer.WaveSurferBackend {
    buffer: AudioBuffer;
}
