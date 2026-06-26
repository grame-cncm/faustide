import type { Volume } from "./Volume";
import { LibraryVolume } from "./LibraryVolume";
import type { ProjectModel } from "../../model/ProjectModel";

// ── IndexedDB constants ────────────────────────────────────────────────────

const DB_NAME = "faust-volumes";
const DB_VERSION = 1;
const DISK_STORE = "disk-handles";

// ── localStorage key ───────────────────────────────────────────────────────

const REPO_LS_KEY = "faust:fs:repos";

// ── Types ──────────────────────────────────────────────────────────────────

/** Persisted record for a disk mount (IndexedDB). */
interface DiskMountRecord {
    id: string;
    handle: FileSystemDirectoryHandle;
}

/** Persisted record for a repo mount (localStorage). */
export interface RepoMountCoords {
    id: string;
    owner: string;
    repo: string;
    branch: string;
}

// ── IDB helpers (thin wrappers; real FileSystemHandle cannot be cloned to
//    JSON — only structured-clone, which IDB uses natively) ─────────────────

function openDb(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        const req = indexedDB.open(DB_NAME, DB_VERSION);
        req.onupgradeneeded = () => {
            req.result.createObjectStore(DISK_STORE, { keyPath: "id" });
        };
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });
}

function idbPut(db: IDBDatabase, store: string, value: unknown): Promise<void> {
    return new Promise((resolve, reject) => {
        const tx = db.transaction(store, "readwrite");
        const req = tx.objectStore(store).put(value);
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
    });
}

function idbDelete(db: IDBDatabase, store: string, key: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const tx = db.transaction(store, "readwrite");
        const req = tx.objectStore(store).delete(key);
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
    });
}

function idbGetAll<T>(db: IDBDatabase, store: string): Promise<T[]> {
    return new Promise((resolve, reject) => {
        const tx = db.transaction(store, "readonly");
        const req = tx.objectStore(store).getAll();
        req.onsuccess = () => resolve(req.result as T[]);
        req.onerror = () => reject(req.error);
    });
}

// ── Public guard ───────────────────────────────────────────────────────────

/**
 * Returns false when `volumeId` is in use by `openOrigin`, preventing an
 * orphaned live document (invariant I2).
 */
export function canUnmount(volumeId: string, openOriginVolumeId: string | null): boolean {
    if (volumeId === "library") return false; // library is always locked
    return openOriginVolumeId !== volumeId;
}

// ── MountRegistry ──────────────────────────────────────────────────────────

/**
 * Manages the set of mounted volumes and their persistence.
 *
 * - The Library is auto-mounted and cannot be unmounted (I2).
 * - Disk handles are persisted to IndexedDB (structured-clone, never JSON).
 * - Repo coordinates are persisted to localStorage (`faust:fs:repos`).
 * - Storage keys are namespaced to `faust:fs:*` / `faust-volumes` and never
 *   overlap with the reserved `faust_editor_*` keys.
 *
 * Ported from markpage/src/volume-registry.ts; keys and DB name renamed.
 */
export class MountRegistry {
    private library: LibraryVolume;

    constructor(model: ProjectModel) {
        this.library = new LibraryVolume(model);
    }

    /** Always-present Library volume (cannot be unmounted). */
    getLibrary(): LibraryVolume {
        return this.library;
    }

    // ── Disk ──────────────────────────────────────────────────────────────

    /**
     * Persist a disk directory handle.  If the same directory (by identity)
     * is already mounted, the existing id is returned (idempotent — prevents
     * duplicates when the user picks the same folder twice).
     *
     * @returns The mount id (stable across reloads).
     */
    async mountDisk(handle: FileSystemDirectoryHandle): Promise<string> {
        const db = await openDb();
        const existing = await idbGetAll<DiskMountRecord>(db, DISK_STORE);

        // isSameEntry deduplication — same as markpage/src/volume-registry.ts
        const dup = await this.findDuplicate(existing, handle);
        if (dup) return dup.id;

        const id = `disk:${crypto.randomUUID()}`;
        await idbPut(db, DISK_STORE, { id, handle });
        return id;
    }

    async unmountDisk(id: string): Promise<void> {
        const db = await openDb();
        await idbDelete(db, DISK_STORE, id);
    }

    /** Load all persisted disk mounts (e.g. after a tab reload). */
    async loadDiskMounts(): Promise<DiskMountRecord[]> {
        const db = await openDb();
        return idbGetAll<DiskMountRecord>(db, DISK_STORE);
    }

    // ── Repo ──────────────────────────────────────────────────────────────

    mountRepo(coords: Omit<RepoMountCoords, "id">): string {
        const existing = this.loadRepoMounts();
        const id = `repo:${coords.owner}/${coords.repo}@${coords.branch}`;
        const deduped = existing.filter(r => r.id !== id);
        deduped.push({ id, ...coords });
        localStorage.setItem(REPO_LS_KEY, JSON.stringify(deduped));
        return id;
    }

    unmountRepo(id: string): void {
        const existing = this.loadRepoMounts().filter(r => r.id !== id);
        localStorage.setItem(REPO_LS_KEY, JSON.stringify(existing));
    }

    loadRepoMounts(): RepoMountCoords[] {
        try {
            return JSON.parse(localStorage.getItem(REPO_LS_KEY) || "[]") as RepoMountCoords[];
        } catch {
            return [];
        }
    }

    // ── Combined listing ───────────────────────────────────────────────────

    /**
     * Return all currently mounted volumes.
     * Library is always first; disk and repo mounts follow.
     * (Volumes are returned as typed records; callers can build Volume
     * adapters from disk handles as needed — DiskVolume comes in P6.)
     */
    async listVolumes(): Promise<{ library: LibraryVolume; diskMounts: DiskMountRecord[]; repoMounts: RepoMountCoords[] }> {
        const diskMounts = await this.loadDiskMounts();
        const repoMounts = this.loadRepoMounts();
        return { library: this.library, diskMounts, repoMounts };
    }

    // ── Internal ──────────────────────────────────────────────────────────

    private async findDuplicate(
        records: DiskMountRecord[],
        handle: FileSystemDirectoryHandle
    ): Promise<DiskMountRecord | undefined> {
        // isSameEntry is the reliable identity test; JSON/name comparison is unreliable.
        const checks = records.map(async (r) => {
            try {
                const same = await r.handle.isSameEntry(handle);
                return same ? r : undefined;
            } catch {
                return undefined;
            }
        });
        const results = await Promise.all(checks);
        return results.find(r => r !== undefined);
    }
}

// Keep Volume import used only for type annotation; this file is the registry,
// not an adapter, so no circular dependency.
export type { Volume };
