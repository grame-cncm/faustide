import { describe, expect, it, vi } from "vitest";
import { DiagramService } from "../runtime/DiagramService";

describe("DiagramService", () => {
    it("generates process SVG with precision args", () => {
        const from = vi.fn(() => ({ "process.svg": "<svg></svg>" }));
        const service = new DiagramService({ from }, {} as any);

        expect(service.generateProcessSvg("process = _;", ["-I", "/project"], true)).toEqual({
            success: true,
            svg: "<svg></svg>"
        });
        expect(from).toHaveBeenCalledWith("main", "process = _;", "-I /project -double");
    });

    it("returns Faust error and parsed line", () => {
        const error = new Error("FaustDSP : 12 : syntax error");
        const service = new DiagramService({
            from: () => {
                throw error;
            }
        }, {} as any);

        expect(service.generateProcessSvg("bad", [], false)).toEqual({
            success: false,
            error,
            errorLine: 12
        });
    });

    it("returns null when an error line cannot be parsed", () => {
        expect(DiagramService.parseErrorLine(new Error("other error"))).toBeNull();
    });

    it("reads generated linked SVG files from Faust FS", () => {
        const readFile = vi.fn(() => "<svg></svg>");
        const service = new DiagramService({ from: vi.fn() }, { readFile } as any);

        expect(service.readGeneratedSvg("sub.svg")).toBe("<svg></svg>");
        expect(readFile).toHaveBeenCalledWith("main-svg/sub.svg", { encoding: "utf8" });
    });
});
