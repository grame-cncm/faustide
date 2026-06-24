import type { FileManager } from "../FileManager";
import type { ProjectPersistence } from "../runtime/ProjectPersistence";
import type { FaustEditorAudioEnv, FaustEditorCompileOptions } from "../runtime/types";
import type { AlertController } from "./AlertController";

type EditorContentAdapter = {
    getValue: () => string;
    getModel: () => {
        onDidChangeContent: (handler: () => void) => unknown;
    };
};

type ProjectRuntimeControllerOptions = {
    compileOptions: FaustEditorCompileOptions;
    audioEnv: FaustEditorAudioEnv;
    projectPersistence: ProjectPersistence;
    alertController: AlertController;
    saveEditorParams: () => void;
    runDsp: (code: string) => Promise<{ success: boolean; error?: Error }>;
    updateDiagram: (code: string) => { success: boolean; error?: Error };
};

/**
 * Coordinates project persistence callbacks around FileManager.
 *
 * FileManager still owns rendering and file mutations. This controller owns the
 * runtime consequences of those mutations: debounced BrowserFS persistence,
 * persisted main-file option updates, realtime compile/diagram scheduling, and
 * editor-content mirroring back into the selected file.
 */
export class ProjectRuntimeController {
    private readonly compileOptions: FaustEditorCompileOptions;
    private readonly audioEnv: FaustEditorAudioEnv;
    private readonly projectPersistence: ProjectPersistence;
    private readonly alertController: AlertController;
    private readonly saveEditorParams: () => void;
    private readonly runDsp: (code: string) => Promise<{ success: boolean; error?: Error }>;
    private readonly updateDiagram: (code: string) => { success: boolean; error?: Error };
    private saveTimeout: number;
    private realtimeCompileTimer: number;

    constructor(options: ProjectRuntimeControllerOptions) {
        this.compileOptions = options.compileOptions;
        this.audioEnv = options.audioEnv;
        this.projectPersistence = options.projectPersistence;
        this.alertController = options.alertController;
        this.saveEditorParams = options.saveEditorParams;
        this.runDsp = options.runDsp;
        this.updateDiagram = options.updateDiagram;
    }

    /**
     * Creates FileManager callback handlers with the existing runtime side
     * effects wired in.
     *
     * @param selectHandler callback used to display selected file content
     */
    createFileManagerHandlers(selectHandler: (fileName: string, content: string) => void) {
        return {
            selectHandler,
            saveHandler: (fileName: string, content: string | Uint8Array, mainCode: string) => this.saveFile(fileName, content, mainCode),
            deleteHandler: (fileName: string) => this.deleteFile(fileName),
            mainFileChangeHandler: (filename: string, mainCode: string) => this.changeMainFile(filename, mainCode)
        };
    }

    /**
     * Mirrors Monaco content changes into FileManager without reselecting the
     * file. FileManager then drives persistence through its save handler.
     */
    bindEditorContent(editor: EditorContentAdapter, fileManager: FileManager) {
        editor.getModel().onDidChangeContent(() => {
            fileManager.setValue(editor.getValue(), false);
        });
    }

    /**
     * Debounces project file writes and schedules realtime work for the latest
     * main file code.
     */
    private saveFile(fileName: string, content: string | Uint8Array, mainCode: string) {
        clearTimeout(this.saveTimeout);
        this.saveTimeout = setTimeout(async () => {
            try {
                await this.projectPersistence.saveFile(fileName, content);
            } catch (e) {
                this.alertController.show(e instanceof Error ? e : String(e));
            }
        }, 1000);
        this.scheduleRealtimeCompile(mainCode, 1000);
    }

    /**
     * Removes deleted files from persistent BrowserFS storage.
     */
    private async deleteFile(fileName: string) {
        try {
            await this.projectPersistence.deleteFile(fileName);
        } catch (e) {
            this.alertController.show(e instanceof Error ? e : String(e));
        }
    }

    /**
     * Persists the selected main DSP file and refreshes realtime output.
     */
    private changeMainFile(filename: string, mainCode: string) {
        this.compileOptions.mainFile = filename;
        this.saveEditorParams();
        this.scheduleRealtimeCompile(mainCode, 100);
    }

    /**
     * Preserves legacy realtime behavior: active DSPs recompile, otherwise only
     * the diagram is refreshed.
     */
    private scheduleRealtimeCompile(mainCode: string, delay: number) {
        clearTimeout(this.realtimeCompileTimer);
        if (!this.compileOptions.realtimeCompile) return;
        this.realtimeCompileTimer = setTimeout(this.audioEnv.dsp ? this.runDsp : this.updateDiagram, delay, mainCode);
    }
}
