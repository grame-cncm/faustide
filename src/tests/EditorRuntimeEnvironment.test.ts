import { describe, expect, it } from "vitest";
import { Analyser } from "../Analyser";
import { Recorder } from "../Recorder";
import { createEditorRuntimeEnvironment } from "../runtime/EditorRuntimeEnvironment";

describe("createEditorRuntimeEnvironment", () => {
    it("creates linked audio, MIDI, UI, and compatibility environments", () => {
        const compileOptions = { voices: 0 };
        const editor = { getValue: () => "process = _;" };
        const faustCompiler = {};
        const browserFS = {};
        const recorder = new Recorder();
        const analyser = new Analyser(4, "continuous");

        const environment = createEditorRuntimeEnvironment({
            compileOptions: compileOptions as any,
            editor: editor as any,
            jQuery,
            faustCompiler: faustCompiler as any,
            browserFS: browserFS as any,
            recorder,
            analyser
        });

        expect(environment.audioEnv).toMatchObject({
            dspConnectedToInput: false,
            dspConnectedToOutput: false,
            inputEnabled: false,
            outputEnabled: false
        });
        expect(environment.midiEnv.input).toBeNull();
        expect(environment.uiEnv).toMatchObject({
            analysersInited: false,
            inputScope: null,
            outputScope: null,
            plotScope: undefined,
            analyser,
            fileManager: undefined
        });
        expect(environment.faustEnv.audioEnv).toBe(environment.audioEnv);
        expect(environment.faustEnv.midiEnv).toBe(environment.midiEnv);
        expect(environment.faustEnv.uiEnv).toBe(environment.uiEnv);
        expect(environment.faustEnv.compileOptions).toBe(compileOptions);
        expect(environment.faustEnv.recorder).toBe(recorder);
        expect(environment.faustEnv.browserFS).toBe(browserFS);
    });
});
