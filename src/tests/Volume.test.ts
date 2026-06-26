import { describe, it, expect } from "vitest";
import { sortEntries, childrenFromTree, isNativeFaustFile } from "../runtime/fs/Volume";
import type { VolumeEntry } from "../runtime/fs/Volume";

function entry(name: string, type: "file" | "dir", path = name): VolumeEntry {
    return { name, path, type, isNative: type === "file" && isNativeFaustFile(name) };
}

describe("isNativeFaustFile", () => {
    it("recognises .dsp", () => expect(isNativeFaustFile("reverb.dsp")).toBe(true));
    it("recognises .lib", () => expect(isNativeFaustFile("filters.lib")).toBe(true));
    it("is case-insensitive", () => expect(isNativeFaustFile("FOO.DSP")).toBe(true));
    it("rejects .wav", () => expect(isNativeFaustFile("kick.wav")).toBe(false));
    it("rejects .txt", () => expect(isNativeFaustFile("notes.txt")).toBe(false));
    it("rejects no extension", () => expect(isNativeFaustFile("Makefile")).toBe(false));
});

describe("sortEntries", () => {
    it("puts directories before files", () => {
        const entries = [entry("b.dsp", "file"), entry("samples", "dir"), entry("a.dsp", "file")];
        const sorted = sortEntries(entries);
        expect(sorted[0].type).toBe("dir");
        expect(sorted[1].type).toBe("file");
        expect(sorted[2].type).toBe("file");
    });

    it("sorts files alphabetically (locale, case-insensitive)", () => {
        const entries = [entry("Zap.dsp", "file"), entry("alpha.dsp", "file"), entry("Beta.dsp", "file")];
        const names = sortEntries(entries).map(e => e.name);
        expect(names).toEqual(["alpha.dsp", "Beta.dsp", "Zap.dsp"]);
    });

    it("does not mutate the original array", () => {
        const entries = [entry("b.dsp", "file"), entry("a.dsp", "file")];
        sortEntries(entries);
        expect(entries[0].name).toBe("b.dsp");
    });
});

describe("childrenFromTree", () => {
    const paths = [
        "reverb.dsp",
        "filters.lib",
        "samples/kick.wav",
        "samples/snare.wav",
        "deep/nested/file.dsp"
    ];

    it("returns immediate children of root (parentPath = '')", () => {
        const children = childrenFromTree(paths, "");
        const names = children.map(e => e.name).sort();
        expect(names).toEqual(["deep", "filters.lib", "reverb.dsp", "samples"]);
    });

    it("marks top-level directories as type dir", () => {
        const children = childrenFromTree(paths, "");
        const samples = children.find(e => e.name === "samples");
        expect(samples?.type).toBe("dir");
    });

    it("returns immediate children of a subdirectory", () => {
        const children = childrenFromTree(paths, "samples");
        const names = children.map(e => e.name).sort();
        expect(names).toEqual(["kick.wav", "snare.wav"]);
    });

    it("does not return grandchildren", () => {
        const children = childrenFromTree(paths, "");
        expect(children.some(e => e.name === "kick.wav")).toBe(false);
    });

    it("deduplicates directory entries", () => {
        const children = childrenFromTree(paths, "");
        const dirs = children.filter(e => e.name === "samples");
        expect(dirs).toHaveLength(1);
    });

    it("marks .dsp files as native", () => {
        const children = childrenFromTree(paths, "");
        const dsp = children.find(e => e.name === "reverb.dsp");
        expect(dsp?.isNative).toBe(true);
    });

    it("marks .wav files as non-native", () => {
        const children = childrenFromTree(paths, "samples");
        const wav = children.find(e => e.name === "kick.wav");
        expect(wav?.isNative).toBe(false);
    });

    it("returns empty array for non-existent path", () => {
        expect(childrenFromTree(paths, "nonexistent")).toHaveLength(0);
    });

    it("sets the correct path on each entry", () => {
        const children = childrenFromTree(paths, "samples");
        const kick = children.find(e => e.name === "kick.wav");
        expect(kick?.path).toBe("samples/kick.wav");
    });
});
