import type { DiskVolume } from "./DiskVolume";
import { openDecision } from "./FileAccess";

const ORIGINS_LS_KEY = "faust:fs:origins";

interface DiskOrigin {
    vol: DiskVolume;
    /** Path within the volume (e.g. "patches/kick.dsp" or "kick.dsp"). */
    path: string;
}

/** Serialisable record stored in localStorage. */
export interface PersistedOrigin {
    volumeId: string;
    path: string;
}

/**
 * Per-file disk origin registry for open-in-place editing (invariant I5).
 *
 * When a native Faust file (.dsp / .lib) is opened from a DiskVolume, the
 * caller records its origin here.  The save pipeline then writes edits back
 * to the original disk file after every debounced BrowserFS write.
 *
 * Keyed by the Library file name (the name FileManager uses internally).
 * Binary audio files are never tracked — they are import-copy only.
 *
 * The mapping is also persisted to localStorage (`faust:fs:origins`) so that
 * the green disk-tracked indicator survives a page reload.  On startup callers
 * read `loadPersistedOrigins()`, match volumeIds to the restored DiskVolume
 * instances, and call `restore()` for each file still present in the project.
 */
export class DiskOriginTracker {
    private readonly origins = new Map<string, DiskOrigin>();

    /**
     * Record that `libraryName` mirrors `path` inside `vol`.
     * No-op for non-native files (audio) — those are import-copy only.
     */
    track(libraryName: string, vol: DiskVolume, path: string): void {
        if (openDecision(libraryName) !== "open-in-place") return;
        this.origins.set(libraryName, { vol, path });
        this.persist();
    }

    /**
     * Restore an origin without the openDecision guard.
     * Used at startup to re-establish disk tracking from a previous session.
     */
    restore(libraryName: string, vol: DiskVolume, path: string): void {
        this.origins.set(libraryName, { vol, path });
    }

    /** Remove the origin when the file is deleted or renamed. */
    forget(libraryName: string): void {
        this.origins.delete(libraryName);
        this.persist();
    }

    /** Returns true when `libraryName` has a known disk origin. */
    has(libraryName: string): boolean {
        return this.origins.has(libraryName);
    }

    /**
     * Write `content` back to the original disk file.
     * No-op when there is no tracked origin or content is binary.
     *
     * Uses FileSystemWritableFileStream so the write is atomic: the file is
     * replaced only when `close()` succeeds (browser-level guarantee on Chrome).
     */
    async writeToDisk(libraryName: string, content: string | Uint8Array): Promise<void> {
        if (typeof content !== "string") return;
        const origin = this.origins.get(libraryName);
        if (!origin) return;
        const handle = await origin.vol.fileHandle(origin.path);
        const writable = await handle.createWritable();
        await writable.write(content);
        await writable.close();
    }

    /** Load the persisted origin map written by a previous session. */
    static loadPersistedOrigins(): Map<string, PersistedOrigin> {
        try {
            const raw = localStorage.getItem(ORIGINS_LS_KEY);
            if (!raw) return new Map();
            return new Map(Object.entries(JSON.parse(raw) as Record<string, PersistedOrigin>));
        } catch {
            return new Map();
        }
    }

    private persist(): void {
        const obj: Record<string, PersistedOrigin> = {};
        for (const [name, { vol, path }] of this.origins) {
            obj[name] = { volumeId: vol.id, path };
        }
        localStorage.setItem(ORIGINS_LS_KEY, JSON.stringify(obj));
    }
}
