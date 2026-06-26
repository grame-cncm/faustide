import { describe, expect, it } from "vitest";
import { DiskVolume } from "../runtime/fs/DiskVolume";

// ---- Fake File System Access handles ----------------------------------------
// These plain-object fakes implement only what DiskVolume's pure logic needs.
// Async-iterable values() yields synchronously via an array-backed iterator.

type FakeHandle = { kind: "file" | "directory"; name: string };

const makeAsyncIter = (items: FakeHandle[]): AsyncIterableIterator<FileSystemHandle> => {
    let i = 0;
    return {
        next: () => {
            const done = i >= items.length;
            const value = done ? undefined : items[i++] as unknown as FileSystemHandle;
            return Promise.resolve(done ? { done: true as const, value: undefined } : { done: false, value });
        },
        [Symbol.asyncIterator]() { return this; }
    };
};

type FakeDirOptions = {
    name?: string;
    children?: FakeHandle[];
    subdirs?: Record<string, FakeDirOptions>;
    permission?: PermissionState;
};

const makeFakeDir = (opts: FakeDirOptions = {}): FileSystemDirectoryHandle => {
    const name = opts.name ?? "root";
    const children = opts.children ?? [];
    const subdirs = opts.subdirs ?? {};
    const permission = opts.permission ?? "granted";

    const handle: any = {
        kind: "directory",
        name,
        values: () => makeAsyncIter(children),
        queryPermission: (_d: { mode: string }) => Promise.resolve(permission),
        requestPermission: (_d: { mode: string }) => Promise.resolve(permission),
        getDirectoryHandle: (seg: string, _opts?: { create?: boolean }) => {
            const sub = subdirs[seg];
            if (!sub && !(_opts && _opts.create)) return Promise.reject(new Error(`no dir ${seg}`));
            return Promise.resolve(makeFakeDir(sub ?? { name: seg }));
        },
        getFileHandle: (seg: string, _opts?: { create?: boolean }) => {
            const found = children.find(c => c.name === seg && c.kind === "file");
            if (!found && !(_opts && _opts.create)) return Promise.reject(new Error(`no file ${seg}`));
            const fileHandle: any = {
                kind: "file",
                name: seg,
                getFile: () => Promise.resolve({ text: () => Promise.resolve(`content of ${seg}`) })
            };
            return Promise.resolve(fileHandle);
        },
        isSameEntry: (_other: any) => Promise.resolve(false)
    };
    return handle as FileSystemDirectoryHandle;
};

// ---- Tests -------------------------------------------------------------------

describe("DiskVolume", () => {
    it("exposes the root directory name as its label", () => {
        const vol = new DiskVolume(makeFakeDir({ name: "MyProject" }), "disk:abc");
        expect(vol.label).toBe("MyProject");
    });

    it("has the given id", () => {
        const vol = new DiskVolume(makeFakeDir(), "disk:xyz");
        expect(vol.id).toBe("disk:xyz");
        expect(vol.kind).toBe("disk");
    });

    // ── state() ───────────────────────────────────────────────────────────────

    it("state() is 'ready' when queryPermission returns 'granted'", async () => {
        const vol = new DiskVolume(makeFakeDir({ permission: "granted" }), "disk:1");
        expect(await vol.state()).toBe("ready");
    });

    it("state() is 'needs-permission' when queryPermission returns 'prompt'", async () => {
        const vol = new DiskVolume(makeFakeDir({ permission: "prompt" }), "disk:1");
        expect(await vol.state()).toBe("needs-permission");
    });

    it("state() is 'needs-permission' when queryPermission returns 'denied'", async () => {
        const vol = new DiskVolume(makeFakeDir({ permission: "denied" }), "disk:1");
        expect(await vol.state()).toBe("needs-permission");
    });

    it("state() is 'ready' when queryPermission is absent (older browser shim)", async () => {
        const dir = makeFakeDir({ permission: "granted" }) as any;
        delete dir.queryPermission;
        const vol = new DiskVolume(dir, "disk:1");
        expect(await vol.state()).toBe("ready");
    });

    // ── requestPermission() ───────────────────────────────────────────────────

    it("requestPermission() returns true when granted", async () => {
        const vol = new DiskVolume(makeFakeDir({ permission: "granted" }), "disk:1");
        expect(await vol.requestPermission()).toBe(true);
    });

    it("requestPermission() returns false when denied", async () => {
        const vol = new DiskVolume(makeFakeDir({ permission: "denied" }), "disk:1");
        expect(await vol.requestPermission()).toBe(false);
    });

    it("requestPermission() returns true when the method is absent", async () => {
        const dir = makeFakeDir({ permission: "granted" }) as any;
        delete dir.requestPermission;
        const vol = new DiskVolume(dir, "disk:1");
        expect(await vol.requestPermission()).toBe(true);
    });

    // ── rootHandle ────────────────────────────────────────────────────────────

    it("exposes the root handle for persistence", () => {
        const dir = makeFakeDir();
        const vol = new DiskVolume(dir, "disk:1");
        expect(vol.rootHandle).toBe(dir);
    });

    // ── resolvePath() ─────────────────────────────────────────────────────────

    it("resolvePath() joins the segments returned by the native resolve()", async () => {
        const handle = { kind: "file", name: "main.dsp" } as FileSystemFileHandle;
        const dir = makeFakeDir() as any;
        dir.resolve = (h: FileSystemHandle) => Promise.resolve(h === handle ? ["sub", "main.dsp"] : null);
        const vol = new DiskVolume(dir, "disk:1");
        expect(await vol.resolvePath(handle)).toBe("sub/main.dsp");
    });

    it("resolvePath() returns null when the handle is outside the mount", async () => {
        const dir = makeFakeDir() as any;
        dir.resolve = () => Promise.resolve(null);
        const vol = new DiskVolume(dir, "disk:1");
        const outsider = { kind: "file", name: "other.dsp" } as FileSystemFileHandle;
        expect(await vol.resolvePath(outsider)).toBeNull();
    });

    it("resolvePath() returns null when resolve() is unavailable (older shim)", async () => {
        const vol = new DiskVolume(makeFakeDir(), "disk:1");
        const handle = { kind: "file", name: "main.dsp" } as FileSystemFileHandle;
        expect(await vol.resolvePath(handle)).toBeNull();
    });

    // ── list() ────────────────────────────────────────────────────────────────

    it("list('') returns flat entries for root children", async () => {
        const dir = makeFakeDir({
            children: [
                { kind: "file", name: "main.dsp" },
                { kind: "file", name: "kick.wav" }
            ]
        });
        const vol = new DiskVolume(dir, "disk:1");
        const entries = await vol.list("");
        expect(entries.map(e => e.name)).toContain("main.dsp");
        expect(entries.map(e => e.name)).toContain("kick.wav");
    });

    it("list() includes directory entries", async () => {
        const dir = makeFakeDir({
            children: [
                { kind: "directory", name: "sounds" },
                { kind: "file", name: "main.dsp" }
            ]
        });
        const vol = new DiskVolume(dir, "disk:1");
        const entries = await vol.list("");
        const dir_ = entries.find(e => e.name === "sounds");
        expect(dir_).toBeTruthy();
        expect(dir_ && dir_.type).toBe("dir");
    });

    it("list() marks .dsp and .lib files as isNative=true", async () => {
        const dir = makeFakeDir({
            children: [
                { kind: "file", name: "main.dsp" },
                { kind: "file", name: "filter.lib" },
                { kind: "file", name: "kick.wav" }
            ]
        });
        const vol = new DiskVolume(dir, "disk:1");
        const entries = await vol.list("");
        const byName = (n: string) => entries.find(e => e.name === n);
        const dspEntry = byName("main.dsp");
        const libEntry = byName("filter.lib");
        const wavEntry = byName("kick.wav");
        expect(dspEntry && dspEntry.isNative).toBe(true);
        expect(libEntry && libEntry.isNative).toBe(true);
        expect(wavEntry && wavEntry.isNative).toBe(false);
    });

    it("list() sorts directories before files", async () => {
        const dir = makeFakeDir({
            children: [
                { kind: "file", name: "main.dsp" },
                { kind: "directory", name: "libs" }
            ]
        });
        const vol = new DiskVolume(dir, "disk:1");
        const entries = await vol.list("");
        expect(entries[0].type).toBe("dir");
        expect(entries[1].type).toBe("file");
    });

    it("list('sub') navigates into a subdirectory and prefixes paths", async () => {
        const dir = makeFakeDir({
            subdirs: { libs: { name: "libs", children: [{ kind: "file", name: "filter.lib" }] } }
        });
        const vol = new DiskVolume(dir, "disk:1");
        const entries = await vol.list("libs");
        expect(entries[0].path).toBe("libs/filter.lib");
    });

    // ── readText() / fileHandle() / createFileHandle() ────────────────────────

    it("readText() reads the content of a root-level file", async () => {
        const dir = makeFakeDir({
            children: [{ kind: "file", name: "main.dsp" }]
        });
        const vol = new DiskVolume(dir, "disk:1");
        const text = await vol.readText("main.dsp");
        expect(text).toBe("content of main.dsp");
    });

    it("fileHandle() resolves a nested file handle", async () => {
        const dir = makeFakeDir({
            subdirs: {
                sub: {
                    name: "sub",
                    children: [{ kind: "file", name: "filter.lib" }]
                }
            }
        });
        const vol = new DiskVolume(dir, "disk:1");
        const handle = await vol.fileHandle("sub/filter.lib");
        expect(handle.name).toBe("filter.lib");
    });

    it("createFileHandle() creates a root-level file", async () => {
        const dir = makeFakeDir();
        const vol = new DiskVolume(dir, "disk:1");
        const handle = await vol.createFileHandle("new.dsp");
        expect(handle.name).toBe("new.dsp");
    });
});
