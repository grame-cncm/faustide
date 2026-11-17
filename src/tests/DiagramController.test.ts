import { beforeEach, describe, expect, it, vi } from "vitest";
import { DiagramController } from "../ui/DiagramController";
import { DiagramView } from "../ui/DiagramView";

const setupDom = () => {
    document.body.innerHTML = `
        <div id="diagram" style="width: 300px; height: 150px"></div>
        <div id="diagram-toolbar">
            <div id="diagram-selector" class="d-none">
                <button data-diagram="main" class="active"></button>
                <button data-diagram="effect"></button>
            </div>
            <input type="checkbox" id="check-diagram-step">
            <input type="number" id="diagram-step-samples" value="32" disabled>
            <input type="text" id="diagram-step-input" disabled>
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
            generateEffectSvg: vi.fn(() => null),
            readGeneratedSvg: vi.fn((file: string): string => {
                if (file === "sub-1.svg") return '<svg width="600" height="300"><text>sub</text></svg>';
                throw new Error(`ENOENT: ${file}`);
            })
        },
        diagramView: new DiagramView({ readGeneratedSvg: vi.fn() }),
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
            false,
            undefined
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

    it("fits the diagram below the diagram toolbar", () => {
        const { controller, options } = bindController();
        $("#diagram-toolbar").height(30);
        options.diagramService.generateEffectSvg = vi.fn(() => ({ success: true, svg: "<svg></svg>" }));

        controller.update("process = _; effect = _;");

        // (150 - 30) / 300 * 600: the toolbar height is taken from the pane.
        expect($("#diagram-svg svg").width()).toBe(240);
    });

    it("regenerates the last diagram as a steppable diagram with the Step controls", () => {
        const { controller, options } = bindController();
        controller.bind();
        const step = $<HTMLInputElement>("#check-diagram-step");
        controller.update("process = _;");

        step.prop("checked", true).trigger("change");
        expect($("#diagram-step-samples").prop("disabled")).toBe(false);
        expect(options.diagramService.generateProcessSvg).toHaveBeenLastCalledWith(
            "process = _;", ["-I", "/usr/share/project/"], false, { samples: 32, input: "" }
        );

        // The number of samples is clamped to 1..1024; later updates keep the options.
        $("#diagram-step-samples").val("5000").trigger("change");
        $("#diagram-step-input").val("1").trigger("change");
        expect($("#diagram-step-samples").val()).toBe("1024");
        controller.update("process = +(1) ~ _;");
        expect(options.diagramService.generateProcessSvg).toHaveBeenLastCalledWith(
            "process = +(1) ~ _;", ["-I", "/usr/share/project/"], false, { samples: 1024, input: "1" }
        );
        expect(options.diagramService.generateEffectSvg).toHaveBeenLastCalledWith(
            "process = +(1) ~ _;", ["-I", "/usr/share/project/"], false, { samples: 1024, input: "1" }
        );

        step.prop("checked", false).trigger("change");
        expect($("#diagram-step-input").prop("disabled")).toBe(true);
        expect(options.diagramService.generateProcessSvg).toHaveBeenLastCalledWith(
            "process = +(1) ~ _;", ["-I", "/usr/share/project/"], false, undefined
        );
    });

    it("keeps the sub-diagram shown when Step regenerates the diagrams", () => {
        const { controller, options } = bindController();
        controller.bind();
        controller.update("process = _;");
        options.diagramView.display('<svg width="600" height="300"><text>sub</text></svg>', { file: "sub-1.svg" });
        $("#diagram-svg text").text("old");

        $("#check-diagram-step").prop("checked", true).trigger("change");

        expect(options.diagramService.readGeneratedSvg).toHaveBeenCalledWith("sub-1.svg", "main");
        expect($("#diagram-svg text").text()).toBe("sub");
        expect(options.diagramView.currentPlace()).toEqual({ file: "sub-1.svg" });
    });

    it("falls back to the process diagram when the sub-diagram is gone", () => {
        const { controller, options } = bindController();
        controller.bind();
        controller.update("process = _;");
        options.diagramView.display("<svg><text>gone</text></svg>", { file: "gone-2.svg" });

        $("#check-diagram-step").prop("checked", true).trigger("change");

        expect($("#diagram-svg text").length).toBe(0);
        expect(options.diagramView.currentPlace()).toEqual({ file: "process.svg" });
    });

    it("waits for a first diagram before applying the Step controls", () => {
        const { controller, options } = bindController();
        controller.bind();

        $("#check-diagram-step").prop("checked", true).trigger("change");

        expect(options.diagramService.generateProcessSvg).not.toHaveBeenCalled();
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
