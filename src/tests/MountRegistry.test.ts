import { describe, it, expect, beforeEach } from "vitest";
import { IDBFactory } from "fake-indexeddb";
import { MountRegistry, canUnmount } from "../runtime/fs/MountRegistry";
import { ProjectModel } from "../model/ProjectModel";

// Minimal MemoryFs for ProjectModel construction
class MemoryFs {
    files = new Map<string, string>();
    rename() { return undefined; }
    unlink(p: string) { this.files.delete(p.replace(/^\.\//, "")); }
    readdir() { return [".", ".."]; }
    mkdir() { return undefined; }
    isDir(m: number) { return m === 1; }
    isFile(m: number) { return m === 2; }
    stat() { return { mode: 2 }; }
    writeFile(p: string, data: string) { this.files.set(p.replace(/^\.\//, ""), data); }
    readFile(p: string, opt?: { encoding?: string }) {
        return opt?.encoding === "utf8" ? this.files.get(p.replace(/^\.\//, "")) : undefined;
    }
}

function makeRegistry() {
    const model = new ProjectModel({ fs: new MemoryFs() as any, path: "./" });
    return new MountRegistry(model);
}

// Reset IDB between tests by patching globalThis with a fresh factory.
// fake-indexeddb's deleteDatabase hangs, so we create a new factory instead.
function resetIdb() {
    // eslint-disable-next-line no-undef
    Object.assign(window, { indexedDB: new IDBFactory() });
}

describe("canUnmount", () => {
    it("returns false for library (always locked)", () => {
        expect(canUnmount("library", null)).toBe(false);
    });

    it("returns false when the volume is the open origin", () => {
        expect(canUnmount("disk:abc", "disk:abc")).toBe(false);
    });

    it("returns true when the volume is not the open origin", () => {
        expect(canUnmount("disk:abc", "disk:xyz")).toBe(true);
    });

    it("returns true when no origin is open (null)", () => {
        expect(canUnmount("disk:abc", null)).toBe(true);
    });
});

describe("MountRegistry", () => {
    let registry: MountRegistry;

    beforeEach(() => {
        resetIdb();
        registry = makeRegistry();
    });

    it("getLibrary() returns a LibraryVolume with id='library'", () => {
        expect(registry.getLibrary().id).toBe("library");
    });

    describe("disk mounts", () => {
        // Note: FileSystemDirectoryHandle cannot be faithfully simulated in jsdom:
        // structured-clone (used by fake-indexeddb) drops prototype methods, so
        // isSameEntry-based deduplication and the structured-clone assertion are
        // manual-verified in real Chromium (plan §0.4).  The tests below cover the
        // IDB I/O paths using a plain-object stand-in.

        function fakeHandle(name: string) {
            // Plain object (no class) so structured-clone survives in fake-indexeddb.
            // isSameEntry is omitted — tests that rely on it are manual-only.
            return { name, kind: "directory" } as unknown as FileSystemDirectoryHandle;
        }

        it("mountDisk returns a disk: id", async () => {
            const id = await registry.mountDisk(fakeHandle("patches"));
            expect(id).toMatch(/^disk:/);
        });

        it("two different handles produce different ids", async () => {
            const id1 = await registry.mountDisk(fakeHandle("patches"));
            const id2 = await registry.mountDisk(fakeHandle("samples"));
            expect(id1).not.toBe(id2);
        });

        it("loadDiskMounts() returns a previously mounted handle record", async () => {
            await registry.mountDisk(fakeHandle("patches"));
            const mounts = await registry.loadDiskMounts();
            expect(mounts).toHaveLength(1);
            expect(mounts[0].id).toMatch(/^disk:/);
        });

        it("a second registry reading the same IDB sees the mount (survives reload)", async () => {
            await registry.mountDisk(fakeHandle("patches"));
            const registry2 = makeRegistry();
            const mounts = await registry2.loadDiskMounts();
            expect(mounts).toHaveLength(1);
        });

        it("unmountDisk removes the mount", async () => {
            const id = await registry.mountDisk(fakeHandle("patches"));
            await registry.unmountDisk(id);
            const mounts = await registry.loadDiskMounts();
            expect(mounts).toHaveLength(0);
        });

        it("mounting multiple handles stores all of them", async () => {
            await registry.mountDisk(fakeHandle("patches"));
            await registry.mountDisk(fakeHandle("samples"));
            const mounts = await registry.loadDiskMounts();
            expect(mounts).toHaveLength(2);
        });
    });

    describe("repo mounts", () => {
        it("mountRepo returns a repo: id", () => {
            const id = registry.mountRepo({ owner: "grame-cncm", repo: "faustide", branch: "master" });
            expect(id).toMatch(/^repo:/);
        });

        it("mountRepo is idempotent for same coords", () => {
            const coords = { owner: "grame-cncm", repo: "faustide", branch: "master" };
            const id1 = registry.mountRepo(coords);
            const id2 = registry.mountRepo(coords);
            expect(id1).toBe(id2);
            expect(registry.loadRepoMounts()).toHaveLength(1);
        });

        it("unmountRepo removes the repo", () => {
            const id = registry.mountRepo({ owner: "grame-cncm", repo: "faustide", branch: "master" });
            registry.unmountRepo(id);
            expect(registry.loadRepoMounts()).toHaveLength(0);
        });

        it("loadRepoMounts returns [] when nothing is mounted", () => {
            expect(registry.loadRepoMounts()).toEqual([]);
        });

        it("multiple repos are stored independently", () => {
            registry.mountRepo({ owner: "user1", repo: "proj1", branch: "main" });
            registry.mountRepo({ owner: "user2", repo: "proj2", branch: "dev" });
            expect(registry.loadRepoMounts()).toHaveLength(2);
        });
    });

    describe("listVolumes", () => {
        it("always includes the library", async () => {
            const { library } = await registry.listVolumes();
            expect(library.id).toBe("library");
        });

        it("lists mounted disk volumes", async () => {
            await registry.mountDisk({ name: "patches", kind: "directory" } as any);
            const { diskMounts } = await registry.listVolumes();
            expect(diskMounts).toHaveLength(1);
        });

        it("lists mounted repos", async () => {
            registry.mountRepo({ owner: "grame-cncm", repo: "faustide", branch: "master" });
            const { repoMounts } = await registry.listVolumes();
            expect(repoMounts).toHaveLength(1);
        });

        it("returns empty disk and repo lists when nothing is mounted", async () => {
            const { diskMounts, repoMounts } = await registry.listVolumes();
            expect(diskMounts).toHaveLength(0);
            expect(repoMounts).toHaveLength(0);
        });
    });
});
