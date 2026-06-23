import type { FileManager } from "../FileManager";
import type { FaustEditorAudioEnv, FaustEditorCompileOptions } from "../runtime/types";

type DirectoryTree = {
    path: string;
    name: string;
    size: number;
    type: "directory" | "file";
    children?: DirectoryTree[];
    extension?: string;
};

type ExamplesControllerOptions = {
    fileManager: FileManager;
    compileOptions: FaustEditorCompileOptions;
    audioEnv: FaustEditorAudioEnv;
    fetchResource?: typeof fetch;
    runDsp: (code: string) => Promise<{ success: boolean; error?: Error }>;
    updateDiagram: (code: string) => { success: boolean; error?: Error };
};

/**
 * Binds the examples dropdown tree and example loading behavior.
 *
 * The controller turns `examples.json` into the existing Bootstrap menu shape
 * and delegates loaded example files to FileManager before optionally
 * recompiling in realtime mode.
 */
export class ExamplesController {
    private readonly fileManager: FileManager;
    private readonly compileOptions: FaustEditorCompileOptions;
    private readonly audioEnv: FaustEditorAudioEnv;
    private readonly fetchResource: typeof fetch;
    private readonly runDsp: (code: string) => Promise<{ success: boolean; error?: Error }>;
    private readonly updateDiagram: (code: string) => { success: boolean; error?: Error };

    constructor(options: ExamplesControllerOptions) {
        this.fileManager = options.fileManager;
        this.compileOptions = options.compileOptions;
        this.audioEnv = options.audioEnv;
        this.fetchResource = options.fetchResource || fetch;
        this.runDsp = options.runDsp;
        this.updateDiagram = options.updateDiagram;
    }

    /**
     * Starts loading the examples tree and binds delegated clicks for examples.
     */
    bind() {
        this.loadExamplesMenu();
        $("#tab-examples").on("click", ".faust-example", e => this.loadExample(e));
    }

    /**
     * Fetches the static examples index and renders it into the dropdown.
     */
    private loadExamplesMenu() {
        this.fetchResource("./examples.json")
            .then(response => response.json())
            .then((tree: DirectoryTree) => {
                const $menu = $("#tab-examples");
                if (tree.children) tree.children.forEach(v => this.appendTreeItem(v, $menu));
            }).catch(() => undefined);
    }

    /**
     * Recursively appends files and submenus using the legacy Bootstrap markup.
     */
    private appendTreeItem(tree: DirectoryTree, $menu: JQuery<HTMLElement>) {
        if (tree.type === "file") {
            const $item = $("<a>").addClass(["dropdown-item", "faust-example"]).attr("href", "#").text(tree.name).data("path", tree.path);
            $menu.append($item);
            return;
        }
        const $item = $("<div>").addClass(["dropright", "submenu"]);
        const $a = $("<a>").addClass(["dropdown-item", "dropdown-toggle", "submenu-toggle"]).attr("href", "#").text(tree.name);
        $a.on("click", (e) => {
            e.stopImmediatePropagation();
            e.preventDefault();
        });
        const $submenu = $("<div>").addClass("dropdown-menu");
        $item.append($a, $submenu);
        tree.children.forEach(v => this.appendTreeItem(v, $submenu));
        $menu.append($item);
        $a.dropdown();
    }

    /**
     * Fetches a selected example file and imports it into the current project.
     */
    private loadExample(e: JQuery.ClickEvent) {
        e.preventDefault();
        e.stopPropagation();
        const path = $(e.currentTarget).data("path");
        const name = $(e.currentTarget).text();
        if (path) {
            this.fetchResource(path)
                .then(response => response.text())
                .then((code) => {
                    this.fileManager.newFile(this.sanitizeFileName(name), code);
                    this.recompileIfNeeded();
                });
        }
        $("#tab-examples").dropdown("toggle");
    }

    /**
     * Preserves realtime compile behavior after importing an example.
     */
    private recompileIfNeeded() {
        if (!this.compileOptions.realtimeCompile) return;
        if (this.audioEnv.dsp) this.runDsp(this.fileManager.mainCode);
        else this.updateDiagram(this.fileManager.mainCode);
    }

    /**
     * Applies the historical example filename sanitization.
     */
    private sanitizeFileName(fileName: string) {
        return fileName.replace(/[^a-zA-Z0-9_.]/g, "") || "untitled.dsp";
    }
}
