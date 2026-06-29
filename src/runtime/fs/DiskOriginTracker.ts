import type { DiskVolume } from "./DiskVolume";
import { openDecision } from "./FileAccess";

const ORIGINS_LS_KEY = "faust:fs:origins";

export interface DiskOriginRef {
    vol: DiskVolume;
    /** Path within the volume (e.g. "patches/kick.dsp" or "kick.dsp"). */
    path: string;
}

/** Serialisable record stored in localStorage. */
export interface PersistedOrigin {
    volumeId: string;
    path: string;
}

function savePersistedOrigins(origins: Map<string, PersistedOrigin>): void {
    const obj: Record<string, PersistedOrigin> = {};
    for (const [name, origin] of origins) obj[name] = origin;
    localStorage.setItem(ORIGINS_LS_KEY, JSON.stringify(obj));
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
 * the green disk-tracked indicator survives a page reload. On startup callers
 * prune origins for missing project files, match remaining volumeIds to the
 * restored DiskVolume instances, and call `restore()` for each file still
 * present in the project.
 */
export class DiskOriginTracker {
    private readonly origins = new Map<string, DiskOriginRef>();

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

    /**
     * Remove every origin attached to a disk volume.
     *
     * @returns Library file names that used to be linked to the volume.
     */
    forgetVolume(volumeId: string): string[] {
        const forgotten: string[] = [];
        for (const [libraryName, origin] of this.origins) {
            if (origin.vol.id !== volumeId) continue;
            this.origins.delete(libraryName);
            forgotten.push(libraryName);
        }
        if (forgotten.length > 0) this.persist();
        return forgotten;
    }

    /** Returns true when `libraryName` has a known disk origin. */
    has(libraryName: string): boolean {
        return this.origins.has(libraryName);
    }

    /** Return the active disk origin for `libraryName`, if one is tracked. */
    getOrigin(libraryName: string): DiskOriginRef | undefined {
        return this.origins.get(libraryName);
    }

    /**
     * Finds the Library file currently linked to a disk origin.
     *
     * Drag/drop uses this to make repeated drops from a mounted folder
     * idempotent: if the same disk file is already open in the Library, the
     * freshly imported collision copy is discarded instead of becoming another
     * green disk-tracked row.
     */
    findLibraryName(vol: DiskVolume, path: string): string | null {
        for (const [libraryName, origin] of this.origins) {
            if (origin.vol.id === vol.id && origin.path === path) return libraryName;
        }
        return null;
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

    /**
     * Drops persisted origins whose Library file is no longer present.
     *
     * Startup uses this before re-applying green disk indicators. It prevents a
     * deleted mounted file's stale origin from attaching to a later local file
     * with the same name after reload.
     */
    static prunePersistedOrigins(reachableNames: Iterable<string>): Map<string, PersistedOrigin> {
        const reachable = new Set(reachableNames);
        const origins = DiskOriginTracker.loadPersistedOrigins();
        let changed = false;
        for (const name of origins.keys()) {
            if (reachable.has(name)) continue;
            origins.delete(name);
            changed = true;
        }
        if (changed) savePersistedOrigins(origins);
        return origins;
    }

    private persist(): void {
        const origins = new Map<string, PersistedOrigin>();
        for (const [name, { vol, path }] of this.origins) origins.set(name, { volumeId: vol.id, path });
        savePersistedOrigins(origins);
    }
}
