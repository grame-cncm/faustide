import { isNativeFaustFile, sortEntries } from "./Volume";
import type { Volume, VolumeEntry, VolumeState } from "./Volume";

// FS Access typing (not fully covered by the current TS DOM lib).
// We declare a separate interface rather than extending the DOM type because
// the DOM lib's FileSystemDirectoryHandle.values() returns a stricter generic
// that conflicts with the shim's AsyncIterableIterator<FileSystemHandle>.
interface FsDirHandle {
    values(): AsyncIterableIterator<FileSystemHandle>;
    queryPermission?(d: { mode: "readwrite" }): Promise<PermissionState>;
    requestPermission?(d: { mode: "readwrite" }): Promise<PermissionState>;
    getDirectoryHandle(name: string, opts?: { create?: boolean }): Promise<FileSystemDirectoryHandle>;
    getFileHandle(name: string, opts?: { create?: boolean }): Promise<FileSystemFileHandle>;
}

/**
 * A real folder on the machine, mounted via a FileSystemDirectoryHandle.
 * Chromium-only — callers gate on fsAccessAvailable() from FileAccess.ts.
 *
 * Plan P6/I5: Save As = pick target volume + folder + name; state tracks
 * whether the RW permission is still active (lapse → 'needs-permission').
 */
export class DiskVolume implements Volume {
    readonly kind = "disk" as const;

    readonly id: string;

    readonly label: string;

    private readonly root: FileSystemDirectoryHandle;

    constructor(root: FileSystemDirectoryHandle, id: string) {
        this.root = root;
        this.id = id;
        this.label = root.name;
    }

    async state(): Promise<VolumeState> {
        const h = this.root as FsDirHandle;
        if (!h.queryPermission) return "ready";
        const perm = await h.queryPermission({ mode: "readwrite" });
        return perm === "granted" ? "ready" : "needs-permission";
    }

    /** Re-request RW permission (needs a user gesture). Returns whether granted. */
    async requestPermission(): Promise<boolean> {
        const h = this.root as FsDirHandle;
        if (!h.requestPermission) return true;
        return (await h.requestPermission({ mode: "readwrite" })) === "granted";
    }

    /** The mounted root directory handle (for persistence and re-grant). */
    get rootHandle(): FileSystemDirectoryHandle {
        return this.root;
    }

    private async dirAt(path: string): Promise<FileSystemDirectoryHandle> {
        let dir = this.root;
        const segs = path.split("/").filter(s => s !== "");
        for (let i = 0; i < segs.length; i++) {
            // sequential navigation: each step depends on the previous handle
            // eslint-disable-next-line no-await-in-loop
            dir = await dir.getDirectoryHandle(segs[i]);
        }
        return dir;
    }

    async list(path: string): Promise<VolumeEntry[]> {
        const dir = (await this.dirAt(path)) as FsDirHandle;
        // Collect all handles first so the async-iter disable is confined here.
        const handles: FileSystemHandle[] = [];
        // eslint-disable-next-line no-restricted-syntax
        for await (const h of dir.values()) {
            handles.push(h);
        }
        const entries: VolumeEntry[] = handles.map((h) => {
            const child = path === "" ? h.name : `${path}/${h.name}`;
            return {
                name: h.name,
                path: child,
                type: h.kind === "directory" ? "dir" as const : "file" as const,
                isNative: h.kind === "file" && isNativeFaustFile(h.name)
            };
        });
        return sortEntries(entries);
    }

    async readText(path: string): Promise<string> {
        return (await (await this.fileHandle(path)).getFile()).text();
    }

    /** The file handle at `path` (for in-place reads and future Save-As writes). */
    async fileHandle(path: string): Promise<FileSystemFileHandle> {
        const segs = path.split("/").filter(s => s !== "");
        const name = segs.pop();
        if (name === undefined) throw new Error("DiskVolume: empty path");
        const dir = await this.dirAt(segs.join("/"));
        return dir.getFileHandle(name);
    }

    /** Create (or open) a file handle at `path`, creating parent folders as needed. */
    async createFileHandle(path: string): Promise<FileSystemFileHandle> {
        const segs = path.split("/").filter(s => s !== "");
        const name = segs.pop();
        if (name === undefined) throw new Error("DiskVolume: empty path");
        let dir = this.root;
        for (let i = 0; i < segs.length; i++) {
            // sequential: each parent dir must exist before we can enter its child
            // eslint-disable-next-line no-await-in-loop
            dir = await dir.getDirectoryHandle(segs[i], { create: true });
        }
        return dir.getFileHandle(name, { create: true });
    }
}
