import type { FileManager } from "../FileManager";
import type { ExportService } from "../runtime/ExportService";
import type { FaustEditorCompileOptions } from "../runtime/types";

type ExportControllerOptions = {
    compileOptions: FaustEditorCompileOptions;
    fileManager: FileManager;
    exportService: ExportService;
    qrCode: { toCanvas: (canvas: HTMLCanvasElement, text: string) => void };
    getServer: () => string;
    setServer: (server: string) => void;
    saveEditorParams: () => void;
    onError?: (error: Error) => void;
};

/**
 * Binds Faust service export modal controls.
 *
 * ExportService owns target discovery and upload/precompile protocol details;
 * this controller owns modal state, selected platform/architecture controls,
 * download links, QR rendering, and default export button behavior.
 */
export class ExportController {
    private readonly compileOptions: FaustEditorCompileOptions;
    private readonly fileManager: FileManager;
    private readonly exportService: ExportService;
    private readonly qrCode: { toCanvas: (canvas: HTMLCanvasElement, text: string) => void };
    private readonly getServer: () => string;
    private readonly setServer: (server: string) => void;
    private readonly saveEditorParams: () => void;
    private readonly onError: (error: Error) => void;

    constructor(options: ExportControllerOptions) {
        this.compileOptions = options.compileOptions;
        this.fileManager = options.fileManager;
        this.exportService = options.exportService;
        this.qrCode = options.qrCode;
        this.getServer = options.getServer;
        this.setServer = options.setServer;
        this.saveEditorParams = options.saveEditorParams;
        this.onError = options.onError || (() => undefined);
    }

    /** Wires the export modal, default export button, and initial target list. */
    async bind() {
        $<HTMLInputElement>("#export-server").val(this.getServer()).on("change", e => this.changeServer(e.currentTarget.value));
        $(".btn-def-exp").prop("disabled", false).on("click", () => this.exportProgram(true));
        try {
            await this.loadTargets(this.getServer());
        } catch (e) {
            this.onError(e as Error);
        }
    }

    /**
     * Builds the export ZIP, uploads it to faustservice, and updates the modal
     * with a download link plus QR code.
     *
     * @param download when true, triggers the generated download immediately.
     */
    private async exportProgram(download: boolean) {
        this.showExportLoading();
        const name = this.sanitizeName($("#export-name").val() as string);
        try {
            const file = await this.exportService.buildProjectZip({
                name,
                fileNames: this.fileManager.fileNames,
                getValue: fileName => this.fileManager.getValue(fileName),
                mainCode: this.fileManager.mainCode
            });
            const { href } = await this.exportService.uploadAndPrecompile({
                server: this.getServer(),
                file,
                platform: $("#export-platform").val() as string,
                arch: $("#export-arch").val() as string
            });
            $("#a-export-download").attr({ href });
            $("#export-download").show();
            if (download === true) $("#export-download").click();
            $("#qr-code").show();
            this.qrCode.toCanvas($<HTMLCanvasElement>("#qr-code")[0], href);
        } catch (e) {
            $("#export-error").html(e).show();
        } finally {
            this.hideExportLoading();
        }
    }

    /**
     * Refreshes available platform and architecture choices from a faustservice
     * endpoint, then binds modal controls that depend on those targets.
     */
    private async loadTargets(server: string) {
        this.resetTargetControls();
        const targets = await this.exportService.fetchTargets(server);
        const platforms = Object.keys(targets).sort();
        if (platforms.length) {
            platforms.forEach((platform, i) => $("#export-platform").append(new Option(platform, platform, i === 0)));
            $("#export-platform").val(this.compileOptions.exportPlatform);
            targets[this.compileOptions.exportPlatform].forEach((arch, i) => $("#export-arch").append(new Option(arch, arch, i === 0)));
            $("#export-arch").val(this.compileOptions.exportArch).change();
        }
        $("#modal-export").on("shown.bs.modal", () => $("#export-name").val(this.fileManager.mainFileNameWithoutSuffix));
        $("#export-name").on("keydown", (e) => {
            if (e.key.match(/[^a-zA-Z0-9_]/)) e.preventDefault();
        });
        $<HTMLSelectElement>("#export-platform").on("change", e => this.changePlatform(e.currentTarget.value, targets));
        $<HTMLSelectElement>("#export-arch").on("change", e => this.changeArch(e.currentTarget.value));
        $("#export-download").on("click", () => $("#a-export-download")[0].click());
        $("#a-export-download").on("click", e => e.stopPropagation());
        $("#export-submit").prop("disabled", false).on("click", () => this.exportProgram(false));
    }

    /**
     * Clears target-dependent controls before fetching a new target table.
     */
    private resetTargetControls() {
        $("#export-platform").add("#export-arch").empty();
        $("#export-platform").off("change");
        $("#export-download").off("click");
        $("#a-export-download").off("click");
        $("#export-submit").prop("disabled", true).off("click");
    }

    /**
     * Stores the selected service URL and reloads its target list.
     */
    private changeServer(server: string) {
        this.setServer(server);
        this.loadTargets(server).catch(this.onError);
    }

    /**
     * Persists the selected platform and repopulates architectures for it.
     */
    private changePlatform(platform: string, targets: Record<string, string[]>) {
        this.compileOptions.exportPlatform = platform;
        this.saveEditorParams();
        $("#export-arch").empty();
        targets[this.compileOptions.exportPlatform].forEach((arch, i) => $("#export-arch").append(new Option(arch, arch, i === 0)));
    }

    /**
     * Persists the selected architecture.
     */
    private changeArch(arch: string) {
        this.compileOptions.exportArch = arch;
        this.saveEditorParams();
    }

    /**
     * Shows both modal and default-button loading indicators while exporting.
     */
    private showExportLoading() {
        $("#export-download").hide();
        $("#export-loading").css("display", "inline-block");
        $("#def-exp-icon").hide();
        $("#def-exp-loading").css("display", "inline-block");
        $("#qr-code").hide();
        $("#export-error").hide();
    }

    /**
     * Restores export buttons after success or failure.
     */
    private hideExportLoading() {
        $("#export-loading").css("display", "none");
        $("#def-exp-loading").css("display", "none");
        $("#def-exp-icon").show();
    }

    /**
     * Applies faustservice-safe export naming while preserving legacy fallback.
     */
    private sanitizeName(name: string) {
        return name.replace(/[^a-zA-Z0-9_]/g, "") || "untitled";
    }
}
