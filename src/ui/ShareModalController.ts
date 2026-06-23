import type { FileManager } from "../FileManager";
import type { ShareUrlService } from "../runtime/ShareUrlService";
import type { FaustEditorCompileOptions } from "../runtime/types";

type ShareModalControllerOptions = {
    compileOptions: FaustEditorCompileOptions;
    fileManager: FileManager;
    shareUrlService: ShareUrlService;
    locationProvider?: () => Pick<Location, "origin" | "pathname">;
    clipboard?: Pick<Clipboard, "writeText">;
    execCopy?: () => void;
};

/**
 * Binds the share modal URL generation and copy controls.
 *
 * URL encoding remains in ShareUrlService; this controller only maps current
 * UI state into the service and applies the legacy clipboard fallback.
 */
export class ShareModalController {
    private readonly compileOptions: FaustEditorCompileOptions;
    private readonly fileManager: FileManager;
    private readonly shareUrlService: ShareUrlService;
    private readonly locationProvider: () => Pick<Location, "origin" | "pathname">;
    private readonly clipboard?: Pick<Clipboard, "writeText">;
    private readonly execCopy: () => void;

    constructor(options: ShareModalControllerOptions) {
        this.compileOptions = options.compileOptions;
        this.fileManager = options.fileManager;
        this.shareUrlService = options.shareUrlService;
        this.locationProvider = options.locationProvider || (() => window.location);
        this.clipboard = options.clipboard || navigator.clipboard;
        this.execCopy = options.execCopy || (() => document.execCommand("copy"));
    }

    bind() {
        $("#modal-share").on("shown.bs.modal", () => this.refreshShareUrl());
        $("#share-autorun").on("change", () => this.refreshShareUrl());
        $("#share-btn-copy").on("click", e => this.copyShareUrl($(e.currentTarget)));
    }

    private refreshShareUrl() {
        $("#share-btn-copy").html("Copy");
        $("#share-url").val(this.makeURL());
    }

    private makeURL() {
        const location = this.locationProvider();
        return this.shareUrlService.build({
            origin: location.origin,
            pathname: location.pathname,
            autorun: !!$("#share-autorun").prop("checked"),
            voices: this.compileOptions.voices,
            name: this.fileManager.mainFileNameWithoutSuffix,
            code: this.fileManager.mainCode
        });
    }

    private copyShareUrl($button: JQuery<HTMLElement>) {
        const url = $("#share-url").val() as string;
        if (this.clipboard) {
            this.clipboard.writeText(url);
        } else {
            $("#share-url").focus().select();
            this.execCopy();
        }
        $button.html('<i class="fas fa-check"></i>');
    }
}
