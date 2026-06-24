import { describe, expect, it } from "vitest";
import { Faust2MD } from "../monaco-faust/Faust2MD";

describe("Faust2MD line matchers", () => {
    it("detects comment lines", () => {
        expect(Faust2MD.isComment("// hello")).toBe(true);
        expect(Faust2MD.isComment("   // indented")).toBe(true);
        expect(Faust2MD.isComment("process = _;")).toBe(false);
    });

    it("matches title / section / comment headers and returns their label", () => {
        expect(Faust2MD.matchBeginTitle("//#### Title Name ####")).toBe("Title Name");
        expect(Faust2MD.matchBeginSection("//==== Section Name ====")).toBe("Section Name");
        expect(Faust2MD.matchBeginComment("//--- foo(x,y) ---")).toBe("foo(x,y)");
        expect(Faust2MD.matchBeginTitle("//-- not a title --")).toBeNull();
    });

    it("matches closing markers and blank lines as ends", () => {
        expect(Faust2MD.matchEndComment("//----------")).toBe(true);
        expect(Faust2MD.matchEndSection("//==========")).toBe(true);
        expect(Faust2MD.matchEndTitle("//##########")).toBe(true);
        expect(Faust2MD.matchEndComment("")).toBe(true); // blank line ends a comment
        expect(Faust2MD.matchEndComment("// real text")).toBe(false);
    });

    it("measures the comment-prefix indentation", () => {
        expect(Faust2MD.indentation("// x")).toBe(3); // "// "
        expect(Faust2MD.indentation("  // y")).toBe(5); // "  // "
        expect(Faust2MD.indentation("process = _;")).toBe(0);
    });

    it("outdents comment lines, collapsing short lines to a newline", () => {
        expect(Faust2MD.outdent("//   doc line", 5)).toBe("doc line");
        expect(Faust2MD.outdent("//", 5)).toBe("\n");
    });

    it("builds YAML front matter with the file name", () => {
        const fm = Faust2MD.frontMatter("foo.dsp");
        expect(fm).toContain("file: foo.dsp");
        expect(fm.startsWith("---\n")).toBe(true);
    });

    it("converts a documented Faust source into markdown", () => {
        const src = [
            "//--- `foo(x)` ---",
            "// the doc line",
            "//----------------",
            "process = _;"
        ].join("\n");
        const md = Faust2MD.parse(src);
        expect(md).toContain("### `foo(x)`");
        expect(md).toContain("the doc line");
        expect(md).toContain("---");
    });

    it("includes code lines only when the code option is set", () => {
        const src = "process = _;";
        expect(Faust2MD.parse(src)).not.toContain("process = _;");
        expect(Faust2MD.parse(src, undefined, { code: true })).toContain("\tprocess = _;");
    });
});
