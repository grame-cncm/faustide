import { describe, expect, it } from "vitest";
import { ScopeState } from "../runtime/state/ScopeState";
import type { FaustEditorUIEnv } from "../runtime/types";

const makeEnv = (): FaustEditorUIEnv => ({
    analysersInited: false,
    inputScope: null,
    outputScope: null,
    plotScope: undefined,
    analyser: {} as any,
    fileManager: undefined
});

describe("ScopeState", () => {
    it("wraps the same uiEnv record so the bridge identity is preserved", () => {
        const env = makeEnv();
        const state = new ScopeState(env);
        const input = { id: "input" } as any;
        const output = { id: "output" } as any;
        const plot = { id: "plot" } as any;

        state.setInputScope(input);
        state.setOutputScope(output);
        state.setPlotScope(plot);

        expect(env.inputScope).toBe(input);
        expect(env.outputScope).toBe(output);
        expect(env.plotScope).toBe(plot);
        expect(state.inputScope).toBe(input);
    });

    it("guards one-time analyser initialization", () => {
        const env = makeEnv();
        const state = new ScopeState(env);

        expect(state.analysersInited).toBe(false);
        state.markAnalysersInited();
        expect(env.analysersInited).toBe(true);
        expect(state.analysersInited).toBe(true);
    });
});
