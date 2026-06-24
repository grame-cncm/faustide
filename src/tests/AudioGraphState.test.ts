import { describe, expect, it } from "vitest";
import { AudioGraphState } from "../runtime/state/AudioGraphState";
import type { FaustEditorAudioEnv } from "../runtime/types";

const makeEnv = (): FaustEditorAudioEnv => ({
    dspConnectedToInput: false,
    dspConnectedToOutput: false,
    inputEnabled: false,
    outputEnabled: false
});

describe("AudioGraphState", () => {
    it("wraps the same underlying record so the bridge identity is preserved", () => {
        const env = makeEnv();
        const state = new AudioGraphState(env);
        const node = { id: "dsp" } as any;

        state.setCurrentDsp(node);
        // The write lands on the original object, not a copy.
        expect(env.dsp).toBe(node);
        expect(state.currentDsp).toBe(node);
    });

    it("clears the current DSP by deleting the field", () => {
        const env = makeEnv();
        const state = new AudioGraphState(env);
        state.setCurrentDsp({ id: "dsp" } as any);

        state.clearCurrentDsp();
        expect("dsp" in env).toBe(false);
        expect(state.currentDsp).toBeUndefined();
    });

    it("is the single writer for the connection flags", () => {
        const env = makeEnv();
        const state = new AudioGraphState(env);

        state.markConnectedToInput(true);
        state.markConnectedToOutput(true);
        expect(env.dspConnectedToInput).toBe(true);
        expect(env.dspConnectedToOutput).toBe(true);
        expect(state.connectedToInput).toBe(true);
        expect(state.connectedToOutput).toBe(true);

        state.markConnectedToOutput(false);
        expect(env.dspConnectedToOutput).toBe(false);
    });

    it("funnels enable, input, splitter, and destination writes", () => {
        const env = makeEnv();
        const state = new AudioGraphState(env);
        const splitter = { id: "splitter" } as any;
        const destination = { id: "destination" } as any;

        state.setInputEnabled(true);
        state.setOutputEnabled(true);
        state.setCurrentInput("-1");
        state.setSplitterOutput(splitter);
        state.setDestination(destination);

        expect(env.inputEnabled).toBe(true);
        expect(env.outputEnabled).toBe(true);
        expect(env.currentInput).toBe("-1");
        expect(env.splitterOutput).toBe(splitter);
        expect(env.destination).toBe(destination);
    });
});
