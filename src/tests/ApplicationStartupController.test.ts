import { describe, expect, it, vi } from "vitest";
import { ApplicationStartupController } from "../ui/ApplicationStartupController";

describe("ApplicationStartupController", () => {
    it("runs startup actions in order and exposes the Faust environment", async () => {
        const calls: string[] = [];
        const faustEnv = { recorder: { sampleRate: 0 } };
        const startupControls = { apply: vi.fn(() => calls.push("startup")) };
        const exposeFaustEnv = vi.fn(() => calls.push("expose"));

        await new ApplicationStartupController({
            audioEnv: { audioCtx: { sampleRate: 48000 } } as any,
            faustEnv: faustEnv as any,
            initAudioCtx: vi.fn(async () => calls.push("audio")),
            analyserScopeController: {
                initialize: vi.fn(() => calls.push("analysers")),
                disableOutputDisplay: vi.fn(() => calls.push("disable-output"))
            },
            loadUrlParams: vi.fn(async () => calls.push("url")),
            createStartupControls: vi.fn(() => startupControls),
            selectAudioInput: vi.fn(() => calls.push("input")),
            exposeFaustEnv
        }).apply();

        expect(calls).toEqual(["audio", "analysers", "disable-output", "input", "url", "startup", "expose"]);
        expect(faustEnv.recorder.sampleRate).toBe(48000);
        expect(exposeFaustEnv).toHaveBeenCalledWith(faustEnv);
        expect(startupControls.apply).toHaveBeenCalled();
    });
});
