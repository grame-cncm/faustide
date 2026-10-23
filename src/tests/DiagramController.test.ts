import { beforeEach, describe, expect, it, vi } from "vitest";
import { DiagramController } from "../ui/DiagramController";

const setupDom = () => {
    document.body.innerHTML = `
        <div id="diagram" style="width: 300px; height: 150px"></div>
        <div id="diagram-selector" class="d-none">
            <button data-diagram="main" class="active"></button>
            <button data-diagram="effect"></button>
        </div>
        <div id="diagram-svg"></div>
        <div id="diagram-default"></div>
    `;
    $("#diagram").width(300).height(150);
};

const bindController = (overrides: any = {}) => {
    const options = {
        compileOptions: {
            args: ["-I", "/usr/share/project/"],
            useDouble: false,
            ...overrides.compileOptions
        },
        diagramService: {
            generateProcessSvg: vi.fn(() => ({
                success: true,
                svg: '<svg width="600" height="300"><path /></svg>'
            })),
            generateEffectSvg: vi.fn(() => null)
        },
        alertController: {
            show: vi.fn(),
            clear: vi.fn()
        },
        editor: {
            deltaDecorations: vi.fn(() => ["decoration"])
        },
        monaco: {
            Range: vi.fn(function Range(this: any, startLineNumber, startColumn, endLineNumber, endColumn) {
                this.startLineNumber = startLineNumber;
                this.startColumn = startColumn;
                this.endLineNumber = endLineNumber;
                this.endColumn = endColumn;
            })
        },
        ...overrides.options
    };
    const controller = new DiagramController(options as any);
    return { controller, options };
};

describe("DiagramController", () => {
    beforeEach(() => {
        vi.restoreAllMocks();
        setupDom();
    });

    it("renders generated SVG and clears previous errors", () => {
        const { controller, options } = bindController();

        expect(controller.update("process = _;")).toEqual({ success: true });

        expect(options.diagramService.generateProcessSvg).toHaveBeenCalledWith(
            "process = _;",
            ["-I", "/usr/share/project/"],
            false
        );
        expect($("#diagram-svg svg").length).toBe(1);
        expect($("#diagram-svg svg").width()).toBe(300);
        expect($("#diagram-default").css("display")).toBe("none");
        expect(options.alertController.clear).toHaveBeenCalled();
        expect($("#diagram-selector").hasClass("d-none")).toBe(true);
        expect($("#diagram-svg").attr("data-diagram")).toBe("main");
    });

    it("offers a process/effect selector when an effect diagram exists", () => {
        const { controller, options } = bindController();
        options.diagramService.generateEffectSvg = vi.fn(() => ({
            success: true,
            svg: '<svg width="300" height="300"><text>fx</text></svg>'
        }));
        controller.bind();

        expect(controller.update("process = _; effect = _;")).toEqual({ success: true });
        expect($("#diagram-selector").hasClass("d-none")).toBe(false);
        expect($("#diagram-svg text").length).toBe(0);

        $("#diagram-selector button[data-diagram=effect]").trigger("click");
        expect($("#diagram-svg text").text()).toBe("fx");
        expect($("#diagram-svg").attr("data-diagram")).toBe("effect");
        expect($("#diagram-selector button[data-diagram=effect]").hasClass("active")).toBe(true);
        expect($("#diagram-selector button[data-diagram=main]").hasClass("active")).toBe(false);

        // The selection survives a regeneration while the effect still exists.
        controller.update("process = _; effect = _;");
        expect($("#diagram-svg").attr("data-diagram")).toBe("effect");

        // Falls back to the process diagram once the effect disappears.
        options.diagramService.generateEffectSvg = vi.fn(() => null);
        controller.update("process = _;");
        expect($("#diagram-svg").attr("data-diagram")).toBe("main");
        expect($("#diagram-selector").hasClass("d-none")).toBe(true);
    });

    it("shows the process diagram and reports an effect error", () => {
        const error = new Error("FaustDSP : 3");
        const { controller, options } = bindController();
        options.diagramService.generateEffectSvg = vi.fn(() => ({ success: false, error, errorLine: 3 }));

        expect(controller.update("bad effect")).toEqual({ success: false, error });

        expect($("#diagram-svg svg").length).toBe(1);
        expect(options.monaco.Range).toHaveBeenCalledWith(3, 1, 3, 1);
        expect(options.alertController.show).toHaveBeenCalledWith(error);
        expect(options.alertController.clear).not.toHaveBeenCalled();
    });

    it("decorates Faust error lines and shows the alert", () => {
        const error = new Error("FaustDSP : 12");
        const { controller, options } = bindController({
            options: {
                diagramService: {
                    generateProcessSvg: vi.fn(() => ({
                        success: false,
                        error,
                        errorLine: 12
                    }))
                }
            }
        });

        expect(controller.update("bad")).toEqual({ success: false, error });

        expect(options.editor.deltaDecorations).toHaveBeenCalledTimes(2);
        expect(options.monaco.Range).toHaveBeenCalledWith(12, 1, 12, 1);
        expect(options.alertController.show).toHaveBeenCalledWith(error);
    });
});
