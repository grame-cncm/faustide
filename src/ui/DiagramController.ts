import type { DiagramName, DiagramService, DiagramStepOptions } from "../runtime/DiagramService";
import type { FaustEditorCompileOptions } from "../runtime/types";
import type { AlertController } from "./AlertController";

type EditorDecorationTarget = {
    deltaDecorations: (oldDecorations: string[], newDecorations: unknown[]) => string[];
};

type MonacoRangeFactory = {
    Range: new (startLineNumber: number, startColumn: number, endLineNumber: number, endColumn: number) => unknown;
};

type DiagramDisplay = {
    display: (strSvg: string) => SVGSVGElement;
};

type DiagramControllerOptions = {
    compileOptions: FaustEditorCompileOptions;
    diagramService: DiagramService;
    diagramView: DiagramDisplay;
    alertController: AlertController;
    editor: EditorDecorationTarget;
    monaco: MonacoRangeFactory;
};

/**
 * Renders generated Faust process and effect diagrams into the diagram pane.
 *
 * DiagramService performs UI-free SVG generation and DiagramView inserts the
 * SVG into the pane. This controller owns the editor decoration lifecycle,
 * error alerting, empty-state visibility, the process/effect selector shown
 * when a polyphonic instrument defines an `effect`, and the Step controls of
 * the diagram toolbar, which regenerate the diagrams as steppable diagrams
 * (`faust -sst`) for a number of samples and a test signal. The displayed set
 * is recorded in `#diagram-svg[data-diagram]` so DiagramView follows links in
 * the right generated directory.
 */
export class DiagramController {
    private readonly compileOptions: FaustEditorCompileOptions;
    private readonly diagramService: DiagramService;
    private readonly diagramView: DiagramDisplay;
    private readonly alertController: AlertController;
    private readonly editor: EditorDecorationTarget;
    private readonly monaco: MonacoRangeFactory;
    private editorDecorations: string[] = [];
    private svgs: Partial<Record<DiagramName, string>> = {};
    private selected: DiagramName = "main";
    private step: DiagramStepOptions | undefined;
    private code: string | undefined;

    constructor(options: DiagramControllerOptions) {
        this.compileOptions = options.compileOptions;
        this.diagramService = options.diagramService;
        this.diagramView = options.diagramView;
        this.alertController = options.alertController;
        this.editor = options.editor;
        this.monaco = options.monaco;
    }

    /** Binds the process/effect selector buttons and the Step controls. */
    bind() {
        $("#diagram-selector").on("click", "button", (e) => {
            this.show($(e.currentTarget).attr("data-diagram") as DiagramName);
        });
        $("#check-diagram-step, #diagram-step-samples, #diagram-step-input").on("change", () => this.applyStep());
    }

    /**
     * Reads the Step controls and regenerates the last diagrammed code: plain
     * diagrams when Step is off, otherwise steppable diagrams for the given
     * number of samples (1 to 1024) and test signal.
     */
    private applyStep() {
        const enabled = $<HTMLInputElement>("#check-diagram-step").prop("checked") as boolean;
        $("#diagram-step-samples, #diagram-step-input").prop("disabled", !enabled);
        const samples = Math.round(+$("#diagram-step-samples").val());
        this.step = enabled
            ? {
                samples: Number.isFinite(samples) ? Math.min(1024, Math.max(1, samples)) : 32,
                input: String($("#diagram-step-input").val() ?? "")
            }
            : undefined;
        if (this.step) $("#diagram-step-samples").val(this.step.samples);
        if (this.code !== undefined) this.update(this.code);
    }

    /**
     * Generates and displays the current process diagram, plus the effect
     * diagram when the code defines one. The last selected diagram stays
     * displayed while it still exists.
     *
     * @param code Faust source code to diagram
     */
    update(code: string): { success: boolean; error?: Error } {
        this.code = code;
        this.editorDecorations = this.editor.deltaDecorations(this.editorDecorations, []);
        const { args, useDouble } = this.compileOptions;
        const result = this.diagramService.generateProcessSvg(code, args, useDouble, this.step);
        if (!result.success) return this.fail(result);
        const effect = this.diagramService.generateEffectSvg(code, args, useDouble, this.step);
        this.svgs = { main: result.svg };
        if (effect?.success) this.svgs.effect = effect.svg;
        $("#diagram-selector").toggleClass("d-none", !this.svgs.effect);
        this.show(this.svgs[this.selected] ? this.selected : "main");
        $("#diagram-default").hide();
        $("#diagram-svg").show();
        if (effect && !effect.success) return this.fail(effect);
        this.alertController.clear();
        return { success: true };
    }

    /**
     * Displays one of the generated diagrams, fitted to the pane.
     *
     * @param name diagram set to display; ignored when it was not generated
     */
    show(name: DiagramName) {
        const strSvg = this.svgs[name];
        if (!strSvg) return;
        this.selected = name;
        $("#diagram-svg").attr("data-diagram", name);
        this.diagramView.display(strSvg);
        $("#diagram-selector button").each((_i, button) => {
            $(button).toggleClass("active", $(button).attr("data-diagram") === name);
        });
    }

    /**
     * Reports a failed diagram generation in the editor gutter and alert.
     */
    private fail(result: { error?: Error; errorLine?: number }) {
        if (result.errorLine) this.decorateErrorLine(result.errorLine);
        this.alertController.show(result.error);
        return { error: result.error, success: false };
    }

    /**
     * Adds the Monaco gutter marker used for Faust compile errors.
     */
    private decorateErrorLine(errorLine: number) {
        this.editorDecorations = this.editor.deltaDecorations(this.editorDecorations, [{
            range: new this.monaco.Range(errorLine, 1, errorLine, 1),
            options: { isWholeLine: true, linesDecorationsClassName: "monaco-decoration-error" }
        }]);
    }
}
