import type { FileManager } from "../FileManager";
import type { ShareUrlService } from "../runtime/ShareUrlService";
import type { FaustEditorCompileOptions } from "../runtime/types";

type UrlParamsControllerOptions = {
    compileOptions: FaustEditorCompileOptions;
    fileManager: FileManager;
    shareUrlService: ShareUrlService;
    runDsp: (code: string) => Promise<{ success: boolean; error?: Error }>;
    saveEditorParams: () => void;
    setServer: (server: string) => void;
};

/**
 * Applies Faust IDE query-string state to editor options and project content.
 *
 * ShareUrlService owns parsing and remote code loading. This controller owns
 * the UI side effects that preserve legacy startup behavior: option storage,
 * amstram mode tweaks, selected file naming, optional autorun, and tab
 * switching after a successful autorun.
 */
export class UrlParamsController {
    private readonly compileOptions: FaustEditorCompileOptions;
    private readonly fileManager: FileManager;
    private readonly shareUrlService: ShareUrlService;
    private readonly runDsp: (code: string) => Promise<{ success: boolean; error?: Error }>;
    private readonly saveEditorParams: () => void;
    private readonly setServer: (server: string) => void;

    constructor(options: UrlParamsControllerOptions) {
        this.compileOptions = options.compileOptions;
        this.fileManager = options.fileManager;
        this.shareUrlService = options.shareUrlService;
        this.runDsp = options.runDsp;
        this.saveEditorParams = options.saveEditorParams;
        this.setServer = options.setServer;
    }

    /**
     * Loads URL parameters and applies them in the same precedence order as the
     * historical bootstrap code.
     *
     * @param search window.location.search-compatible query string
     */
    async load(search: string) {
        const params = await this.shareUrlService.load(search);
        if (params.realtimeCompile !== undefined) {
            this.compileOptions.realtimeCompile = params.realtimeCompile;
            this.saveEditorParams();
        }
        if (params.voices !== undefined) {
            this.compileOptions.voices = params.voices;
            this.saveEditorParams();
        }
        if (params.bufferSize !== undefined) {
            this.compileOptions.bufferSize = params.bufferSize;
            this.saveEditorParams();
        }
        if (params.mode) this.applyAmstramMode(params.mode);
        if (params.name) {
            this.fileManager.renameSelected(`${params.name}.dsp`);
            this.saveEditorParams();
        }
        if (params.code) {
            this.fileManager.setValue(params.code);
            if (params.autorun) await this.autorun(params.code);
        }
    }

    /**
     * Applies the legacy amstram export target and optional reduced UI mode.
     */
    private applyAmstramMode(mode: "amstram" | "amstram-pro") {
        const server = "https://faustservice-old.inria.fr";
        this.setServer(server);
        this.compileOptions.exportPlatform = "esp32";
        this.compileOptions.exportArch = "gramophoneFlash";
        $("#export-server").val(server).change();
        $("#btn-def-exp-content").html("Gramo");
        if (mode === "amstram") {
            $("#ide-params").css("display", "none");
            $("#form-plot").css("display", "none");
            $("#show-right-panel").click().change();
        }
    }

    /**
     * Runs shared code during startup and reveals the Faust UI tab only after a
     * successful compile.
     */
    private async autorun(code: string) {
        const compileResult = await this.runDsp(code);
        if (!compileResult.success) return;
        if (!$("#tab-faust-ui").hasClass("active")) $("#tab-faust-ui").tab("show");
    }
}
