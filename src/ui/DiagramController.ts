import type { DiagramService } from "../runtime/DiagramService";
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
 * Renders generated Faust process diagrams into the diagram pane.
 *
 * DiagramService performs UI-free SVG generation. This controller owns the
 * editor decoration lifecycle, error alerting, SVG DOM replacement, empty-state
 * visibility, and initial fit-to-pane sizing for generated diagrams.
 */
export class DiagramController {
    private readonly compileOptions: FaustEditorCompileOptions;
    private readonly diagramService: DiagramService;
    private readonly alertController: AlertController;
    private readonly editor: EditorDecorationTarget;
    private readonly monaco: MonacoRangeFactory;
    private editorDecorations: string[] = [];

    constructor(options: DiagramControllerOptions) {
        this.compileOptions = options.compileOptions;
        this.diagramService = options.diagramService;
        this.alertController = options.alertController;
        this.editor = options.editor;
        this.monaco = options.monaco;
    }

    /**
     * Generates and displays the current process diagram.
     *
     * @param code Faust source code to diagram
     */
    update(code: string): { success: boolean; error?: Error } {
        this.editorDecorations = this.editor.deltaDecorations(this.editorDecorations, []);
        const result = this.diagramService.generateProcessSvg(code, this.compileOptions.args, this.compileOptions.useDouble);
        if (!result.success) {
            if (result.errorLine) this.decorateErrorLine(result.errorLine);
            this.alertController.show(result.error);
            return { error: result.error, success: false };
        }
        const svg = $<SVGSVGElement>(result.svg).filter("svg")[0];
        $("#diagram-svg").empty().append(svg).children("svg").width(this.fitWidth(svg));
        $("#diagram-default").hide();
        this.alertController.clear();
        $("#diagram-svg").show();
        return { success: true };
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
