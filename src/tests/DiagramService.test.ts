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

    it("makes steppable diagrams from step options", () => {
        expect(DiagramService.stepArgs()).toEqual([]);
        expect(DiagramService.stepArgs({ samples: 32, input: "" })).toEqual(["-sst", "32"]);
        // from() splits its arguments at spaces: the test signal loses its white space.
        expect(DiagramService.stepArgs({ samples: 8, input: " 1 - 1' , 0.5 " })).toEqual(["-sst", "8", "-ssi", "1-1',0.5"]);
    });

    it("passes the step arguments to the process and effect diagrams", () => {
        const from = vi.fn(() => ({ "process.svg": "<svg></svg>" }));
        const service = new DiagramService({ from }, {} as any);
        const step = { samples: 16, input: "os.osc(440)" };

        service.generateProcessSvg("process = _;", ["-I", "/project"], true, step);
        expect(from).toHaveBeenLastCalledWith("main", "process = _;", "-I /project -double -sst 16 -ssi os.osc(440)");
        service.generateEffectSvg("effect = _;", [], false, step);
        expect(from).toHaveBeenLastCalledWith("effect", expect.any(String), "-sst 16 -ssi os.osc(440)");
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

    it("generates the effect SVG from an environment wrapper keeping line numbers", () => {
        const from = vi.fn(() => ({ "process.svg": "<svg>fx</svg>" }));
        const service = new DiagramService({ from }, {} as any);
        const code = "process = _;\neffect = _,_;";

        expect(service.generateEffectSvg(code, ["-I", "/project"], false)).toEqual({
            success: true,
            svg: "<svg>fx</svg>"
        });
        expect(from).toHaveBeenCalledWith(
            "effect",
            `dsp_code = environment{${code}\n};\nprocess = dsp_code.effect;`,
            "-I /project"
        );
    });

    it("returns null without compiling when no effect is defined", () => {
        const from = vi.fn();
        const service = new DiagramService({ from }, {} as any);

        expect(service.generateEffectSvg("process = _;", [], false)).toBeNull();
        expect(from).not.toHaveBeenCalled();
    });

    it("returns null when Faust reports the effect symbol as undefined", () => {
        const service = new DiagramService({
            from: () => {
                throw new Error("ERROR : undefined symbol : effect");
            }
        }, {} as any);

        expect(service.generateEffectSvg("process = _;\n// effect = _;\neffect = x;", [], false)).toBeNull();
    });

    it("returns effect errors with their parsed line", () => {
        const error = new Error("FaustDSP : 2 : undefined symbol : foo");
        const service = new DiagramService({
            from: () => {
                throw error;
            }
        }, {} as any);

        expect(service.generateEffectSvg("process = _;\neffect = foo;", [], true)).toEqual({
            success: false,
            error,
            errorLine: 2
        });
    });

    it("reads generated linked SVG files from Faust FS", () => {
        const readFile = vi.fn(() => "<svg></svg>");
        const service = new DiagramService({ from: vi.fn() }, { readFile } as any);

        expect(service.readGeneratedSvg("sub.svg")).toBe("<svg></svg>");
        expect(readFile).toHaveBeenCalledWith("main-svg/sub.svg", { encoding: "utf8" });
        service.readGeneratedSvg("fx.svg", "effect");
        expect(readFile).toHaveBeenCalledWith("effect-svg/fx.svg", { encoding: "utf8" });
    });
});
