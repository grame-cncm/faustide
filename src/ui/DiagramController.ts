import type { DiagramName, DiagramService } from "../runtime/DiagramService";
import type { FaustEditorCompileOptions } from "../runtime/types";
import type { AlertController } from "./AlertController";

type EditorDecorationTarget = {
    deltaDecorations: (oldDecorations: string[], newDecorations: unknown[]) => string[];
};

type MonacoRangeFactory = {
    Range: new (startLineNumber: number, startColumn: number, endLineNumber: number, endColumn: number) => unknown;
};

type DiagramControllerOptions = {
    compileOptions: FaustEditorCompileOptions;
    diagramService: DiagramService;
    alertController: AlertController;
    editor: EditorDecorationTarget;
    monaco: MonacoRangeFactory;
};

/**
 * Renders generated Faust process and effect diagrams into the diagram pane.
 *
 * DiagramService performs UI-free SVG generation. This controller owns the
 * editor decoration lifecycle, error alerting, SVG DOM replacement, empty-state
 * visibility, initial fit-to-pane sizing, and the process/effect selector shown
 * when a polyphonic instrument defines an `effect`. The displayed set is
 * recorded in `#diagram-svg[data-diagram]` so DiagramView follows links in the
 * right generated directory.
 */
export class DiagramController {
    private readonly compileOptions: FaustEditorCompileOptions;
    private readonly diagramService: DiagramService;
    private readonly alertController: AlertController;
    private readonly editor: EditorDecorationTarget;
    private readonly monaco: MonacoRangeFactory;
    private editorDecorations: string[] = [];
    private svgs: Partial<Record<DiagramName, string>> = {};
    private selected: DiagramName = "main";

    constructor(options: DiagramControllerOptions) {
        this.compileOptions = options.compileOptions;
        this.diagramService = options.diagramService;
        this.alertController = options.alertController;
        this.editor = options.editor;
        this.monaco = options.monaco;
    }

    /** Binds the process/effect selector buttons. */
    bind() {
        $("#diagram-selector").on("click", "button", (e) => {
            this.show($(e.currentTarget).attr("data-diagram") as DiagramName);
        });
    }

    /**
     * Generates and displays the current process diagram, plus the effect
     * diagram when the code defines one. The last selected diagram stays
     * displayed while it still exists.
     *
     * @param code Faust source code to diagram
     */
    update(code: string): { success: boolean; error?: Error } {
        this.editorDecorations = this.editor.deltaDecorations(this.editorDecorations, []);
        const { args, useDouble } = this.compileOptions;
        const result = this.diagramService.generateProcessSvg(code, args, useDouble);
        if (!result.success) return this.fail(result);
        const effect = this.diagramService.generateEffectSvg(code, args, useDouble);
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
        const svg = $<SVGSVGElement>(strSvg).filter("svg")[0];
        $("#diagram-svg").attr("data-diagram", name).empty().append(svg).children("svg").width(this.fitWidth(svg));
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

    /**
     * Fits the generated SVG to the current diagram viewport while preserving
     * aspect ratio.
     */
    private fitWidth(svg: SVGSVGElement) {
        const svgWidth = svg.width?.baseVal?.value || +svg.getAttribute("width") || 0;
        const svgHeight = svg.height?.baseVal?.value || +svg.getAttribute("height") || 1;
        return Math.min($("#diagram").width(), $("#diagram").height() / svgHeight * svgWidth);
    }
}
