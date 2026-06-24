import type { FaustCompiler } from "@grame/faustwasm";
import type * as monaco from "monaco-editor";
import type {
    FaustEditorAudioEnv,
    FaustEditorCompileOptions,
    FaustEditorEnv,
    FaustEditorMIDIEnv,
    FaustEditorUIEnv
} from "./types";
import { Analyser } from "../Analyser";
import { Recorder } from "../Recorder";

export interface EditorRuntimeEnvironment {
    audioEnv: FaustEditorAudioEnv;
    midiEnv: FaustEditorMIDIEnv;
    uiEnv: FaustEditorUIEnv;
    faustEnv: FaustEditorEnv;
}

export interface CreateEditorRuntimeEnvironmentOptions {
    compileOptions: FaustEditorCompileOptions;
    editor: monaco.editor.IStandaloneCodeEditor;
    jQuery: JQueryStatic;
    faustCompiler: FaustCompiler;
    browserFS: FaustEditorEnv["browserFS"];
    recorder?: Recorder;
    analyser?: Analyser;
}

/**
 * Creates the mutable runtime environment objects shared by legacy controllers.
 *
 * These structures are still intentionally mutable because many existing
 * controllers attach audio nodes, scopes, DSP instances, and file-manager state
 * during startup. Keeping construction here documents the initial empty state
 * while allowing `index.ts` to remain focused on wiring services together.
 */
export function createEditorRuntimeEnvironment(options: CreateEditorRuntimeEnvironmentOptions): EditorRuntimeEnvironment {
    const audioEnv: FaustEditorAudioEnv = {
        dspConnectedToInput: false,
        dspConnectedToOutput: false,
        inputEnabled: false,
        outputEnabled: false
    };
    const midiEnv: FaustEditorMIDIEnv = { input: null };
    const uiEnv: FaustEditorUIEnv = {
        analysersInited: false,
        inputScope: null,
        outputScope: null,
        plotScope: undefined,
        analyser: options.analyser || new Analyser(16, "continuous"),
        fileManager: undefined
    };
    const faustEnv: FaustEditorEnv = {
        audioEnv,
        midiEnv,
        uiEnv,
        compileOptions: options.compileOptions,
        jQuery: options.jQuery,
        editor: options.editor,
        faustCompiler: options.faustCompiler,
        recorder: options.recorder || new Recorder(),
        browserFS: options.browserFS
    };

    return {
        audioEnv,
        midiEnv,
        uiEnv,
        faustEnv
    };
}
