import { describe, expect, it } from "vitest";
import { Faust2Doc } from "../monaco-faust/Faust2Doc";

describe("Faust2Doc parsing helpers", () => {
    it("matches library definitions", () => {
        expect(Faust2Doc.matchLibrary('os = library("oscillators.lib");')).toEqual([
            { namespace: "os", fileName: "oscillators.lib" }
        ]);
        expect(Faust2Doc.matchLibrary("process = _;")).toEqual([]);
    });

    it("matches import expressions", () => {
        expect(Faust2Doc.matchImport('import("stdfaust.lib");')).toEqual(["stdfaust.lib"]);
        expect(Faust2Doc.matchImport("// nothing here")).toEqual([]);
    });

    it("extracts the function name from a backticked comment header", () => {
        expect(Faust2Doc.matchFuncName("`(os.)osc`")).toBe("osc");
        expect(Faust2Doc.matchFuncName("no backticks")).toBeNull();
    });

    it("expands conditional name patterns", () => {
        expect(Faust2Doc.getAllConditions("a[1|2]b")).toEqual(["a1b", "a2b"]);
        // A single bracketed token is optional: present or absent.
        expect(Faust2Doc.getAllConditions("x[n]")).toEqual(["x", "xn"]);
        expect(Faust2Doc.getAllConditions("plain")).toEqual(["plain"]);
    });
});

describe("Faust2Doc.parse", () => {
    const parseFiles = (files: Record<string, string>, entry: string) =>
        Faust2Doc.parse(entry, async fileName => files[fileName] ?? "");

    it("records a documented function from a single file", async () => {
        const doc = await parseFiles({
            "main.lib": [
                "//--- `osc` ---",
                "// An oscillator",
                "//-----",
                "process = _;"
            ].join("\n")
        }, "main.lib");

        expect(doc.osc).toBeDefined();
        expect(doc.osc.name).toBe("osc");
        expect(doc.osc.doc).toContain("An oscillator");
    });

    it("follows library definitions and namespaces the docs", async () => {
        const doc = await parseFiles({
            "main.lib": 'os = library("osc.lib");',
            "osc.lib": [
                "//--- `osc` ---",
                "// An oscillator",
                "//-----",
                "process = _;"
            ].join("\n")
        }, "main.lib");

        expect(doc["os.osc"]).toBeDefined();
        expect(doc["os.osc"].path).toEqual(["os"]);
        expect(doc["os.osc"].name).toBe("osc");
    });

    it("stops recursing at depth 0", async () => {
        const doc = await Faust2Doc.parse("main.lib", async () => "process = _;", 0);
        expect(doc).toBeUndefined();
    });
});
