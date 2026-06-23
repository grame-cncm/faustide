import type { FaustAudioWorkletNode, FaustCompiler, FaustScriptProcessorNode } from "@grame/faustwasm";
import type * as monaco from "monaco-editor";
import type { Input } from "webmidi";
import type { Analyser } from "../Analyser";
import type { FileManager } from "../FileManager";
import type { GainUI, MeterNode } from "../MeterNode";
import type { Recorder } from "../Recorder";
import type { Scope } from "../Scope";
import type { StaticScope } from "../StaticScope";

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

export type FaustEditorMIDIEnv = {
    input: Input;
};

export type FaustEditorUIEnv = {
    analysersInited: boolean;
    inputScope: Scope;
    outputScope: Scope;
    plotScope: StaticScope;
    uiPopup?: Window;
    analyser: Analyser;
    fileManager: FileManager;
};

export type FaustExportTargets = { [platform: string]: string[] };

export interface LegacyWaveSurferBackend extends WaveSurfer.WaveSurferBackend {
    buffer: AudioBuffer;
}
