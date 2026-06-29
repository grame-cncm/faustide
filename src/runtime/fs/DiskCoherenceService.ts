import type { DiskOriginRef } from "./DiskOriginTracker";

interface DiskOriginLookup {
    getOrigin(libraryName: string): DiskOriginRef | undefined;
}

interface CoherenceSnapshot {
    text: string;
    lastModified: number;
    size: number;
}

export type DiskCoherencePollResult =
    | { status: "unchanged" }
    | { status: "reload"; content: string }
    | { status: "conflict" }
    | { status: "unread"; error: unknown };

/**
 * Detects external edits to mounted disk files before Faust IDE writes back.
 *
 * The browser File System Access API does not provide a portable watcher, so
 * this service keeps the last disk text Faust IDE accepted and compares it with
 * the current file just before a disk write. UI code can later use the same
 * service for focus-time polling and conflict presentation.
 */
export class DiskCoherenceService {
    private readonly origins: DiskOriginLookup;

    private readonly snapshots = new Map<string, CoherenceSnapshot>();

    constructor(origins: DiskOriginLookup) {
        this.origins = origins;
    }

    /**
     * Capture the current disk file as the accepted base for `libraryName`.
     *
     * Use this after opening or dropping a mounted file, where the disk content
     * has just been imported into the Library project.
     */
    async captureDiskSnapshot(libraryName: string): Promise<void> {
        const origin = this.origins.getOrigin(libraryName);
        if (!origin) return;
        try {
            this.snapshots.set(libraryName, await this.readSnapshot(origin));
        } catch {
            this.snapshots.delete(libraryName);
        }
    }

    /**
     * Record the content currently accepted by Faust IDE.
     *
     * Startup uses this with the BrowserFS-restored Library content. If the disk
     * file has changed since the last session, a later write will see that the
     * current disk text differs from this accepted base and will report a
     * conflict instead of overwriting it.
     */
    async acceptKnownContent(libraryName: string, content: string | Uint8Array): Promise<void> {
        if (typeof content !== "string") return;
        const origin = this.origins.getOrigin(libraryName);
        if (!origin) return;
        try {
            const current = await this.readSnapshot(origin);
            this.snapshots.set(libraryName, {
                text: content,
                lastModified: current.lastModified,
                size: current.size
            });
        } catch {
            this.snapshots.set(libraryName, {
                text: content,
                lastModified: 0,
                size: content.length
            });
        }
    }

    /**
     * Verify that a mounted disk file has not diverged before write-back.
     *
     * Throws when the disk file text no longer matches the last accepted base
     * and also differs from the content Faust IDE is about to write.
     */
    async checkBeforeWrite(libraryName: string, content: string | Uint8Array): Promise<void> {
        if (typeof content !== "string") return;
        const origin = this.origins.getOrigin(libraryName);
        if (!origin) return;

        let current: CoherenceSnapshot;
        try {
            current = await this.readSnapshot(origin);
        } catch (error) {
            throw new DiskCoherenceReadError(libraryName, error);
        }
        const accepted = this.snapshots.get(libraryName);
        if (!accepted) {
            if (current.text !== content) throw new DiskCoherenceConflictError(libraryName);
            this.snapshots.set(libraryName, current);
            return;
        }
        if (current.text !== accepted.text && current.text !== content) {
            throw new DiskCoherenceConflictError(libraryName);
        }
        if (current.text === content) this.snapshots.set(libraryName, current);
    }

    /**
     * Check whether a mounted disk file changed since the accepted base.
     *
     * A clean local buffer can be reloaded automatically. A dirty local buffer
     * reports conflict so UI code can block write-back and ask the user.
     */
    async poll(libraryName: string, localContent: string | Uint8Array): Promise<DiskCoherencePollResult> {
        if (typeof localContent !== "string") return { status: "unchanged" };
        const origin = this.origins.getOrigin(libraryName);
        if (!origin) return { status: "unchanged" };

        let current: CoherenceSnapshot;
        try {
            current = await this.readSnapshot(origin);
        } catch (error) {
            return { status: "unread", error };
        }

        const accepted = this.snapshots.get(libraryName);
        if (!accepted) {
            if (current.text === localContent) {
                this.snapshots.set(libraryName, current);
                return { status: "unchanged" };
            }
            return { status: "conflict" };
        }

        if (current.text === accepted.text) return { status: "unchanged" };
        if (localContent === current.text) {
            this.snapshots.set(libraryName, current);
            return { status: "unchanged" };
        }
        if (localContent === accepted.text) {
            this.snapshots.set(libraryName, current);
            return { status: "reload", content: current.text };
        }
        return { status: "conflict" };
    }

    /**
     * Mark a successful Faust IDE write as the new accepted disk base.
     */
    acceptWrittenContent(libraryName: string, content: string | Uint8Array): void {
        if (typeof content !== "string") return;
        this.snapshots.set(libraryName, {
            text: content,
            lastModified: Date.now(),
            size: content.length
        });
    }

    /** Drop coherence state when a file is deleted, renamed, or unlinked. */
    forget(libraryName: string): void {
        this.snapshots.delete(libraryName);
    }

    private async readSnapshot(origin: DiskOriginRef): Promise<CoherenceSnapshot> {
        const file = await (await origin.vol.fileHandle(origin.path)).getFile();
        return {
            text: await file.text(),
            lastModified: file.lastModified,
            size: file.size
        };
    }
}

/** Error raised when a mounted file changed outside Faust IDE. */
export class DiskCoherenceConflictError extends Error {
    constructor(libraryName: string) {
        super(`${libraryName} changed on disk outside Faust IDE. Reload it or save a local copy before writing back.`);
        this.name = "DiskCoherenceConflictError";
    }
}

/** Error raised when a mounted file cannot be read before write-back. */
export class DiskCoherenceReadError extends Error {
    readonly originalError: unknown;

    constructor(libraryName: string, cause: unknown) {
        super(`${libraryName} could not be checked on disk before writing back.`);
        this.name = "DiskCoherenceReadError";
        this.originalError = cause;
    }
}
