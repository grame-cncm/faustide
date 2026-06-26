import { describe, expect, it } from "vitest";
import { bundleFileList } from "../runtime/fs/BundleWriter";

describe("bundleFileList", () => {
    it("returns an empty array for an empty closure", () => {
        expect(bundleFileList([])).toEqual([]);
    });

    it("places the .dsp file last", () => {
        const result = bundleFileList(["main.dsp", "filter.lib"]);
        expect(result[result.length - 1]).toBe("main.dsp");
    });

    it("places all non-.dsp files before the .dsp", () => {
        const result = bundleFileList(["main.dsp", "filter.lib", "kick.wav"]);
        const dspIdx = result.indexOf("main.dsp");
        result.forEach((f, i) => {
            if (f !== "main.dsp") {
                expect(i).toBeLessThan(dspIdx);
            }
        });
    });

    it("handles multiple .dsp files (component() references)", () => {
        const result = bundleFileList(["main.dsp", "synth.dsp", "filter.lib"]);
        const libIdx = result.indexOf("filter.lib");
        const mainIdx = result.indexOf("main.dsp");
        const synthIdx = result.indexOf("synth.dsp");
        expect(libIdx).toBeLessThan(mainIdx);
        expect(libIdx).toBeLessThan(synthIdx);
    });

    it("returns only the .dsp when there are no dependencies", () => {
        expect(bundleFileList(["main.dsp"])).toEqual(["main.dsp"]);
    });

    it("returns only deps when there is no .dsp in the closure", () => {
        const result = bundleFileList(["filter.lib", "kick.wav"]);
        expect(result).not.toContain("main.dsp");
        expect(result).toContain("filter.lib");
        expect(result).toContain("kick.wav");
    });

    it("does not mutate the input array", () => {
        const input = ["main.dsp", "filter.lib"];
        const original = [...input];
        bundleFileList(input);
        expect(input).toEqual(original);
    });
});
