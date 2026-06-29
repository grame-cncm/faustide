import type { FileManager } from "../FileManager";
import type { DiskCoherenceService } from "../runtime/fs/DiskCoherenceService";
import type { DiskOriginTracker } from "../runtime/fs/DiskOriginTracker";
import type { AlertController } from "./AlertController";

/**
 * Binds browser focus events to mounted-file coherence polling.
 *
 * Runtime services decide whether a disk file is unchanged, reloadable, or in
 * conflict. This controller owns the UI-facing consequences: applying clean
 * reloads to FileManager and surfacing conflicts through the shared alert.
 */
export class DiskCoherenceController {
    private readonly fileManager: FileManager;
    private readonly diskTracker: DiskOriginTracker;
    private readonly diskCoherence: DiskCoherenceService;
    private readonly alertController: AlertController;
    private readonly conflicts = new Map<string, string>();
    private modal: HTMLDivElement;
    private message: HTMLSpanElement;
    private reloadButton: HTMLButtonElement;
    private overwriteButton: HTMLButtonElement;
    private keepCopyButton: HTMLButtonElement;
    private activeConflict: string | null = null;
    private polling = false;

    constructor(options: {
        fileManager: FileManager;
        diskTracker: DiskOriginTracker;
        diskCoherence: DiskCoherenceService;
        alertController: AlertController;
    }) {
        this.fileManager = options.fileManager;
        this.diskTracker = options.diskTracker;
        this.diskCoherence = options.diskCoherence;
        this.alertController = options.alertController;
    }

    /** Attach focus/visibility listeners used to catch external editor saves. */
    bind(): void {
        this.ensureModal();
        window.addEventListener("focus", () => { void this.pollAll(); });
        document.addEventListener("visibilitychange", () => {
            if (document.visibilityState === "visible") void this.pollAll();
        });
        this.reloadButton.addEventListener("click", () => { void this.reloadFromDisk(); });
        this.overwriteButton.addEventListener("click", () => { void this.overwriteDisk(); });
        this.keepCopyButton.addEventListener("click", () => { void this.keepLocalCopy(); });
    }

    /** Poll every currently tracked mounted file once. */
    async pollAll(): Promise<void> {
        if (this.polling) return;
        this.polling = true;
        try {
            const names = this.diskTracker.trackedNames();
            await Promise.all(names.map(fileName => this.pollFile(fileName)));
        } finally {
            this.polling = false;
        }
    }

    private async pollFile(fileName: string): Promise<void> {
        const result = await this.diskCoherence.poll(fileName, this.fileManager.getValue(fileName));
        if (result.status === "reload") {
            await this.fileManager.replaceExternalText(fileName, result.content);
            return;
        }
        if (result.status === "conflict") {
            this.conflicts.set(fileName, result.diskContent);
            this.showConflict(fileName);
            return;
        }
        if (result.status === "unread") {
            this.alertController.show(`${fileName} could not be checked on disk. Re-authorize the mounted folder before saving.`);
        }
    }

    private async reloadFromDisk(): Promise<void> {
        const fileName = this.activeConflict;
        if (!fileName) return;
        const diskContent = this.conflicts.get(fileName);
        if (diskContent === undefined) return;
        await this.fileManager.replaceExternalText(fileName, diskContent);
        this.conflicts.delete(fileName);
        this.hideConflict();
    }

    private async overwriteDisk(): Promise<void> {
        const fileName = this.activeConflict;
        if (!fileName) return;
        const content = this.fileManager.getValue(fileName);
        await this.diskCoherence.checkBeforeWrite(fileName, content).catch(() => undefined);
        await this.diskTracker.writeToDisk(fileName, content);
        this.diskCoherence.acceptWrittenContent(fileName, content);
        this.conflicts.delete(fileName);
        this.hideConflict();
    }

    private async keepLocalCopy(): Promise<void> {
        const fileName = this.activeConflict;
        if (!fileName) return;
        const localContent = this.fileManager.getValue(fileName);
        const diskContent = this.conflicts.get(fileName);
        if (typeof localContent === "string") {
            this.fileManager.newFile(this.localCopyName(fileName), localContent, { persist: "immediate" });
        }
        if (diskContent !== undefined) await this.fileManager.replaceExternalText(fileName, diskContent);
        this.conflicts.delete(fileName);
        this.hideConflict();
    }

    private showConflict(fileName: string): void {
        this.ensureModal();
        this.activeConflict = fileName;
        this.message.textContent = `${fileName} changed on disk and has local edits in Faust IDE.`;
        this.modal.style.display = "block";
        this.alertController.show(`${fileName} changed on disk and has local edits in Faust IDE.`);
    }

    private hideConflict(): void {
        this.activeConflict = null;
        this.modal.style.display = "none";
        this.alertController.clear();
    }

    private ensureModal(): void {
        if (this.modal) return;
        this.modal = document.createElement("div");
        this.modal.className = "modal";
        this.modal.style.display = "none";
        this.modal.innerHTML = `
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Mounted file changed</h5>
                    </div>
                    <div class="modal-body"><span></span></div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-action="keep-copy">Keep Local Copy</button>
                        <button type="button" class="btn btn-warning" data-action="overwrite">Overwrite Disk</button>
                        <button type="button" class="btn btn-primary" data-action="reload">Reload from Disk</button>
                    </div>
                </div>
            </div>`;
        document.body.appendChild(this.modal);
        this.message = this.modal.querySelector(".modal-body span") as HTMLSpanElement;
        this.reloadButton = this.modal.querySelector("[data-action='reload']") as HTMLButtonElement;
        this.overwriteButton = this.modal.querySelector("[data-action='overwrite']") as HTMLButtonElement;
        this.keepCopyButton = this.modal.querySelector("[data-action='keep-copy']") as HTMLButtonElement;
    }

    private localCopyName(fileName: string): string {
        const dot = fileName.lastIndexOf(".");
        if (dot === -1) return `${fileName}_local`;
        return `${fileName.slice(0, dot)}_local${fileName.slice(dot)}`;
    }
}
