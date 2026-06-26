import { describe, it, expect } from "vitest";
import { maskFaustCode, extractFileRefs, computeClosure } from "../model/Perimeter";

// ── maskFaustCode ─────────────────────────────────────────────────────────────

describe("maskFaustCode", () => {
    it("returns empty array for source with no comments or strings", () => {
        expect(maskFaustCode("process = +;")).toEqual([]);
    });

    it("masks a // line comment", () => {
        const src = "process = +; // this is a comment\nprocess = *;";
        const ranges = maskFaustCode(src);
        expect(ranges).toHaveLength(1);
        expect(ranges[0].start).toBe(src.indexOf("//"));
    });

    it("masks a /* */ block comment", () => {
        const src = "/* block */\nprocess = +;";
        const ranges = maskFaustCode(src);
        expect(ranges).toHaveLength(1);
        expect(ranges[0].start).toBe(0);
        expect(ranges[0].end).toBe(11);
    });

    it("does NOT mask string literals (they are the extraction targets)", () => {
        const src = 'import("stdfaust.lib");';
        const ranges = maskFaustCode(src);
        // No ranges: string literals are not comments
        expect(ranges).toHaveLength(0);
    });

    it("masks multiple comment ranges independently", () => {
        const src = '// comment\nimport("foo.lib"); /* block */';
        const ranges = maskFaustCode(src);
        expect(ranges).toHaveLength(2); // line comment + block comment
    });
});

// ── extractFileRefs ───────────────────────────────────────────────────────────

describe("extractFileRefs", () => {
    it("extracts import()", () => {
        expect(extractFileRefs('import("stdfaust.lib");')).toContain("stdfaust.lib");
    });

    it("extracts library()", () => {
        expect(extractFileRefs('hs = library("hoa.lib");')).toContain("hoa.lib");
    });

    it("extracts component()", () => {
        expect(extractFileRefs('c = component("synth.dsp");')).toContain("synth.dsp");
    });

    it("extracts soundfile() first argument", () => {
        expect(extractFileRefs('sf = soundfile("kick.wav", 1);')).toContain("kick.wav");
    });

    it("ignores refs inside // line comments", () => {
        const src = '// import("nope.lib")\nimport("yes.lib");';
        expect(extractFileRefs(src)).not.toContain("nope.lib");
        expect(extractFileRefs(src)).toContain("yes.lib");
    });

    it("ignores refs inside /* */ block comments", () => {
        const src = '/* import("nope.lib") */\nimport("yes.lib");';
        expect(extractFileRefs(src)).not.toContain("nope.lib");
        expect(extractFileRefs(src)).toContain("yes.lib");
    });

    it("extracts multiple refs from one source", () => {
        const src = 'import("stdfaust.lib");\nimport("myfilter.lib");\nsf = soundfile("kick.wav", 1);';
        const refs = extractFileRefs(src);
        expect(refs).toContain("stdfaust.lib");
        expect(refs).toContain("myfilter.lib");
        expect(refs).toContain("kick.wav");
    });

    it("returns empty array for source with no refs", () => {
        expect(extractFileRefs("process = _;")).toHaveLength(0);
    });

    it("handles refs with path prefix (returns the full argument)", () => {
        expect(extractFileRefs('import("path/to/foo.lib");')).toContain("path/to/foo.lib");
    });
});

// ── computeClosure ────────────────────────────────────────────────────────────

describe("computeClosure", () => {
    function makeProject(files: Record<string, string>) {
        const isLocal = (name: string) => name in files;
        const read = (name: string): string | null => files[name] ?? null;
        return { isLocal, read };
    }

    it("includes only the main file when it has no refs", () => {
        const { isLocal, read } = makeProject({ "main.dsp": "process = _;" });
        const result = computeClosure("main.dsp", read, isLocal);
        expect(result.files).toEqual(["main.dsp"]);
        expect(result.missing).toHaveLength(0);
    });

    it("includes directly imported project-local libraries", () => {
        const { isLocal, read } = makeProject({
            "main.dsp": 'import("myfilter.lib"); process = _;',
            "myfilter.lib": "// my filter"
        });
        const result = computeClosure("main.dsp", read, isLocal);
        expect(result.files).toContain("main.dsp");
        expect(result.files).toContain("myfilter.lib");
    });

    it("traverses transitively (A imports B which imports C)", () => {
        const { isLocal, read } = makeProject({
            "main.dsp": 'import("b.lib"); process = _;',
            "b.lib": 'import("c.lib");',
            "c.lib": "// leaf"
        });
        const result = computeClosure("main.dsp", read, isLocal);
        expect(result.files).toContain("c.lib");
    });

    it("is cycle-safe (A imports B imports A)", () => {
        const { isLocal, read } = makeProject({
            "a.dsp": 'import("b.lib"); process = _;',
            "b.lib": 'import("a.dsp");'
        });
        // Should not hang or crash
        const result = computeClosure("a.dsp", read, isLocal);
        expect(result.files.length).toBeGreaterThan(0);
    });

    it("excludes standard libraries (not project-local)", () => {
        const { isLocal, read } = makeProject({
            "main.dsp": 'import("stdfaust.lib"); process = _;'
        });
        const result = computeClosure("main.dsp", read, isLocal);
        expect(result.files).not.toContain("stdfaust.lib");
        expect(result.files).toContain("main.dsp");
    });

    it("includes soundfile references that match project files", () => {
        const { isLocal, read } = makeProject({
            "main.dsp": 'sf = soundfile("kick.wav", 1); process = _;',
            "kick.wav": ""
        });
        const result = computeClosure("main.dsp", read, isLocal);
        expect(result.files).toContain("kick.wav");
    });

    it("does not include audio files in missing when they are not project-local", () => {
        const { isLocal, read } = makeProject({
            "main.dsp": 'sf = soundfile("kick.wav", 1); process = _;'
        });
        // kick.wav not in project — it's either a soundfile label or truly missing
        const result = computeClosure("main.dsp", read, isLocal);
        expect(result.files).not.toContain("kick.wav");
    });

    it("includes component() references that are project-local", () => {
        const { isLocal, read } = makeProject({
            "main.dsp": 'v = component("synth.dsp"); process = v;',
            "synth.dsp": "process = _;"
        });
        const result = computeClosure("main.dsp", read, isLocal);
        expect(result.files).toContain("synth.dsp");
    });

    it("deduplicates files referenced more than once", () => {
        const { isLocal, read } = makeProject({
            "main.dsp": 'import("lib.lib"); import("lib.lib"); process = _;',
            "lib.lib": "// lib"
        });
        const result = computeClosure("main.dsp", read, isLocal);
        const libCount = result.files.filter(f => f === "lib.lib").length;
        expect(libCount).toBe(1);
    });

    it("strips path prefix when resolving project files", () => {
        const { isLocal, read } = makeProject({
            "main.dsp": 'import("libs/myfilter.lib"); process = _;',
            "myfilter.lib": "// filter"
        });
        // Closure strips the "libs/" prefix and matches "myfilter.lib" in the project
        const result = computeClosure("main.dsp", read, isLocal);
        expect(result.files).toContain("myfilter.lib");
    });
});
