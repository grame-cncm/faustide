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
        window.addEventListener("focus", () => { void this.pollAll(); });
        document.addEventListener("visibilitychange", () => {
            if (document.visibilityState === "visible") void this.pollAll();
        });
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
            this.alertController.show(`${fileName} changed on disk and has local edits in Faust IDE. Reload it or save a local copy before writing back.`);
            return;
        }
        if (result.status === "unread") {
            this.alertController.show(`${fileName} could not be checked on disk. Re-authorize the mounted folder before saving.`);
        }
    }
}
