import type JSZip from "jszip";
import type { FileManager } from "../FileManager";
import type { FaustEditorAudioEnv, FaustEditorCompileOptions } from "../runtime/types";

type ProjectFilesControllerOptions = {
    fileManager: FileManager;
    compileOptions: FaustEditorCompileOptions;
    audioEnv: FaustEditorAudioEnv;
    createZip: () => JSZip;
    readFileAsText?: (file: File) => Promise<string>;
    runDsp: (code: string) => Promise<{ success: boolean; error?: Error }>;
    updateDiagram: (code: string) => { success: boolean; error?: Error };
};

/**
 * Binds local project file import/export controls.
 *
 * This controller owns browser file input, editor drag-and-drop, and project
 * ZIP download behavior while delegating project mutations to FileManager and
 * recompilation decisions to injected runtime callbacks.
 */
export class ProjectFilesController {
    private readonly fileManager: FileManager;
    private readonly compileOptions: FaustEditorCompileOptions;
    private readonly audioEnv: FaustEditorAudioEnv;
    private readonly createZip: () => JSZip;
    private readonly readFileAsText: (file: File) => Promise<string>;
    private readonly runDsp: (code: string) => Promise<{ success: boolean; error?: Error }>;
    private readonly updateDiagram: (code: string) => { success: boolean; error?: Error };

    constructor(options: ProjectFilesControllerOptions) {
        this.fileManager = options.fileManager;
        this.compileOptions = options.compileOptions;
        this.audioEnv = options.audioEnv;
        this.createZip = options.createZip;
        this.readFileAsText = options.readFileAsText || ProjectFilesController.readFileAsText;
        this.runDsp = options.runDsp;
        this.updateDiagram = options.updateDiagram;
    }

    bind() {
        $("#btn-upload").on("click", () => {
            $("#input-upload").click();
        });
        $<HTMLInputElement>("#input-upload")
            .on("input", e => this.importFile(e.currentTarget.files && e.currentTarget.files[0]))
            .on("click", e => e.stopPropagation());
        $("#btn-save").on("click", () => this.saveZip());
        $("#a-save").on("click", e => e.stopPropagation());
        $("#a-docs").on("click", e => e.stopPropagation());
        this.bindEditorDrop();
    }

    private async importFile(file?: File) {
        if (!file) return;
        const code = await this.readFileAsText(file);
        this.fileManager.newFile(this.sanitizeFileName(file.name), code);
        this.recompileIfNeeded();
    }

    private async saveZip() {
        const zip = this.createZip();
        this.fileManager._fileList.forEach(n => zip.file(n, this.fileManager.getValue(n)));
        const blob = await zip.generateAsync({ type: "blob" });
        const uri = URL.createObjectURL(blob);
        $("#a-save").attr({ href: uri, download: `${this.fileManager.mainFileNameWithoutSuffix}.zip` })[0].click();
        setTimeout(() => URL.revokeObjectURL(uri), 5000);
    }

    private bindEditorDrop() {
        $("#top").on("dragenter dragover", (e) => {
            const event = e.originalEvent as DragEvent;
            if (event.dataTransfer && event.dataTransfer.items.length && event.dataTransfer.items[0].kind === "file") {
                e.preventDefault();
                e.stopPropagation();
                $("#editor-overlay").show();
            }
        });
        $("#editor-overlay").on("dragleave dragend", (e) => {
            e.preventDefault();
            e.stopPropagation();
            $(e.currentTarget).hide();
        });
        $("#editor-overlay").on("dragenter dragover", (e) => {
            e.preventDefault();
            e.stopPropagation();
        });
        $("#editor-overlay").on("drop", e => this.dropFile(e));
    }

    private async dropFile(e: JQuery.DropEvent) {
        $(e.currentTarget).hide();
        const event = e.originalEvent as DragEvent;
        if (!event.dataTransfer || !event.dataTransfer.files.length) return;
        e.preventDefault();
        e.stopPropagation();
        await this.importFile(event.dataTransfer.files[0]);
    }

    private recompileIfNeeded() {
        if (!this.compileOptions.realtimeCompile) return;
        if (this.audioEnv.dsp) this.runDsp(this.fileManager.mainCode);
        else this.updateDiagram(this.fileManager.mainCode);
    }

    private sanitizeFileName(fileName: string) {
        return fileName.replace(/[^a-zA-Z0-9_.]/g, "") || "untitled.dsp";
    }

    private static readFileAsText(file: File) {
        return new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result.toString());
            reader.onerror = () => resolve("");
            reader.readAsText(file);
        });
    }
}
