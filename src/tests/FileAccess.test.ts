import { beforeEach, describe, expect, it, vi } from "vitest";
import {
    fsAccessAvailable, openDecision, pickImportableFileHandle,
    pickDirectory, ensureRwPermission, queryRwGranted, captureDroppedFileHandle, captureDroppedFileHandles
} from "../runtime/fs/FileAccess";

/** Builds a DataTransfer-shaped stub whose first item exposes getAsFileSystemHandle. */
const makeDropTransfer = (handle: FileSystemHandle | null, hasApi = true): DataTransfer => ({
    items: [{
        kind: "file",
        ...(hasApi ? { getAsFileSystemHandle: vi.fn().mockResolvedValue(handle) } : {})
    }]
} as unknown as DataTransfer);

const makeDropTransferWithHandles = (handles: Array<FileSystemHandle | null>): DataTransfer => ({
    items: handles.map(handle => ({
        kind: "file",
        getAsFileSystemHandle: vi.fn().mockResolvedValue(handle)
    }))
} as unknown as DataTransfer);

const makeFakeDirHandle = (overrides: Record<string, unknown> = {}): FileSystemDirectoryHandle => ({
    kind: "directory" as const,
    name: "testdir",
    queryPermission: vi.fn().mockResolvedValue("granted"),
    requestPermission: vi.fn().mockResolvedValue("granted"),
    getDirectoryHandle: vi.fn(),
    getFileHandle: vi.fn(),
    isSameEntry: vi.fn().mockResolvedValue(false),
    resolve: vi.fn(),
    keys: vi.fn(),
    values: vi.fn(),
    entries: vi.fn(),
    [Symbol.asyncIterator]: vi.fn(),
    ...overrides
} as unknown as FileSystemDirectoryHandle);

describe("fsAccessAvailable", () => {
    it("returns false when showOpenFilePicker is absent", () => {
        const orig = (window as any).showOpenFilePicker;
        delete (window as any).showOpenFilePicker;
        expect(fsAccessAvailable()).toBe(false);
        if (orig !== undefined) (window as any).showOpenFilePicker = orig;
    });

    it("returns true when showOpenFilePicker is present", () => {
        (window as any).showOpenFilePicker = vi.fn();
        expect(fsAccessAvailable()).toBe(true);
        delete (window as any).showOpenFilePicker;
    });
});

describe("openDecision", () => {
    it("routes .dsp to open-in-place", () => {
        expect(openDecision("main.dsp")).toBe("open-in-place");
    });

    it("routes .lib to open-in-place", () => {
        expect(openDecision("stdfaust.lib")).toBe("open-in-place");
    });

    it("routes .DSP (uppercase) to open-in-place", () => {
        expect(openDecision("MAIN.DSP")).toBe("open-in-place");
    });

    it("routes .wav to import-copy", () => {
        expect(openDecision("kick.wav")).toBe("import-copy");
    });

    it("routes .txt to import-copy", () => {
        expect(openDecision("notes.txt")).toBe("import-copy");
    });

    it("routes no-extension to import-copy", () => {
        expect(openDecision("Makefile")).toBe("import-copy");
    });

    it("routes .mp3 to import-copy", () => {
        expect(openDecision("beat.mp3")).toBe("import-copy");
    });

    it("routes empty string to import-copy", () => {
        expect(openDecision("")).toBe("import-copy");
    });
});

describe("pickImportableFileHandle", () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it("returns null when fsAccess is unavailable", async () => {
        delete (window as any).showOpenFilePicker;
        expect(await pickImportableFileHandle()).toBeNull();
    });

    it("calls showOpenFilePicker and returns the handle", async () => {
        const handle = { name: "main.dsp", kind: "file" };
        (window as any).showOpenFilePicker = vi.fn().mockResolvedValue([handle]);
        const result = await pickImportableFileHandle();
        expect(result).toBe(handle);
        delete (window as any).showOpenFilePicker;
    });

    it("returns null when the user cancels (picker throws)", async () => {
        (window as any).showOpenFilePicker = vi.fn().mockRejectedValue(new DOMException("AbortError"));
        const result = await pickImportableFileHandle();
        expect(result).toBeNull();
        delete (window as any).showOpenFilePicker;
    });
});

describe("pickDirectory", () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it("returns null when fsAccess is unavailable", async () => {
        delete (window as any).showOpenFilePicker;
        expect(await pickDirectory()).toBeNull();
    });

    it("calls showDirectoryPicker and returns the handle", async () => {
        const handle = { name: "mydir", kind: "directory" };
        (window as any).showOpenFilePicker = vi.fn(); // for availability check
        (window as any).showDirectoryPicker = vi.fn().mockResolvedValue(handle);
        const result = await pickDirectory();
        expect(result).toBe(handle);
        delete (window as any).showOpenFilePicker;
        delete (window as any).showDirectoryPicker;
    });

    it("returns null when the user cancels", async () => {
        (window as any).showOpenFilePicker = vi.fn();
        (window as any).showDirectoryPicker = vi.fn().mockRejectedValue(new DOMException("AbortError"));
        const result = await pickDirectory();
        expect(result).toBeNull();
        delete (window as any).showOpenFilePicker;
        delete (window as any).showDirectoryPicker;
    });
});

describe("ensureRwPermission", () => {
    it("returns true when requestPermission returns 'granted'", async () => {
        const handle = makeFakeDirHandle({ requestPermission: vi.fn().mockResolvedValue("granted") });
        expect(await ensureRwPermission(handle)).toBe(true);
    });

    it("returns false when requestPermission returns 'denied'", async () => {
        const handle = makeFakeDirHandle({ requestPermission: vi.fn().mockResolvedValue("denied") });
        expect(await ensureRwPermission(handle)).toBe(false);
    });

    it("returns true when requestPermission is absent", async () => {
        const handle = makeFakeDirHandle({ requestPermission: undefined });
        expect(await ensureRwPermission(handle)).toBe(true);
    });
});

describe("captureDroppedFileHandle", () => {
    const fileHandle = { kind: "file", name: "src.dsp" } as FileSystemFileHandle;

    it("invokes the callback with the saved name and captured file handle", async () => {
        const cb = vi.fn();
        const resolve = captureDroppedFileHandle(makeDropTransfer(fileHandle), cb);
        await resolve("untitled.dsp");
        expect(cb).toHaveBeenCalledWith("untitled.dsp", fileHandle);
    });

    it("calls getAsFileSystemHandle synchronously, before the resolver awaits", () => {
        const transfer = makeDropTransfer(fileHandle);
        const getAsFileSystemHandle = (transfer.items[0] as any).getAsFileSystemHandle;
        captureDroppedFileHandle(transfer, vi.fn());
        // Captured eagerly so the stale DataTransfer is read before any yield.
        expect(getAsFileSystemHandle).toHaveBeenCalledTimes(1);
    });

    it("is a no-op when no callback is registered", () => {
        const transfer = makeDropTransfer(fileHandle);
        const getAsFileSystemHandle = (transfer.items[0] as any).getAsFileSystemHandle;
        captureDroppedFileHandle(transfer, undefined);
        expect(getAsFileSystemHandle).not.toHaveBeenCalled();
    });

    it("does not call back when the saved name is undefined", async () => {
        const cb = vi.fn();
        const resolve = captureDroppedFileHandle(makeDropTransfer(fileHandle), cb);
        await resolve(undefined);
        expect(cb).not.toHaveBeenCalled();
    });

    it("does not call back when getAsFileSystemHandle is unavailable (non-Chromium)", async () => {
        const cb = vi.fn();
        const resolve = captureDroppedFileHandle(makeDropTransfer(null, false), cb);
        await resolve("untitled.dsp");
        expect(cb).not.toHaveBeenCalled();
    });

    it("ignores a directory handle (only file drops are tracked)", async () => {
        const cb = vi.fn();
        const dir = { kind: "directory", name: "folder" } as unknown as FileSystemHandle;
        const resolve = captureDroppedFileHandle(makeDropTransfer(dir), cb);
        await resolve("untitled.dsp");
        expect(cb).not.toHaveBeenCalled();
    });

    it("tolerates a null DataTransfer", async () => {
        const cb = vi.fn();
        const resolve = captureDroppedFileHandle(null, cb);
        await resolve("untitled.dsp");
        expect(cb).not.toHaveBeenCalled();
    });
});

describe("captureDroppedFileHandles", () => {
    const fileA = { kind: "file", name: "a.dsp" } as FileSystemFileHandle;
    const fileB = { kind: "file", name: "b.lib" } as FileSystemFileHandle;

    it("invokes the callback for each saved name and captured file handle", async () => {
        const cb = vi.fn();
        const resolve = captureDroppedFileHandles(makeDropTransferWithHandles([fileA, fileB]), cb);

        await resolve(["saved-a.dsp", "saved-b.lib"]);

        expect(cb).toHaveBeenCalledWith("saved-a.dsp", fileA);
        expect(cb).toHaveBeenCalledWith("saved-b.lib", fileB);
    });

    it("waits for async callbacks before resolving", async () => {
        const completed: string[] = [];
        const cb = vi.fn(async (savedName: string) => {
            await Promise.resolve();
            completed.push(savedName);
        });
        const resolve = captureDroppedFileHandles(makeDropTransferWithHandles([fileA, fileB]), cb);

        await resolve(["saved-a.dsp", "saved-b.lib"]);

        expect(completed).toEqual(["saved-a.dsp", "saved-b.lib"]);
    });

    it("calls every getAsFileSystemHandle synchronously before resolving", () => {
        const transfer = makeDropTransferWithHandles([fileA, fileB]);
        captureDroppedFileHandles(transfer, vi.fn());

        expect((transfer.items[0] as any).getAsFileSystemHandle).toHaveBeenCalledTimes(1);
        expect((transfer.items[1] as any).getAsFileSystemHandle).toHaveBeenCalledTimes(1);
    });

    it("skips missing saved names and directory handles", async () => {
        const cb = vi.fn();
        const dir = { kind: "directory", name: "folder" } as unknown as FileSystemHandle;
        const resolve = captureDroppedFileHandles(makeDropTransferWithHandles([fileA, dir, fileB]), cb);

        await resolve(["saved-a.dsp", undefined, "saved-b.lib"]);

        expect(cb).toHaveBeenCalledTimes(2);
        expect(cb).toHaveBeenCalledWith("saved-a.dsp", fileA);
        expect(cb).toHaveBeenCalledWith("saved-b.lib", fileB);
    });
});

describe("queryRwGranted", () => {
    it("returns true when queryPermission returns 'granted'", async () => {
        const handle = makeFakeDirHandle({ queryPermission: vi.fn().mockResolvedValue("granted") });
        expect(await queryRwGranted(handle)).toBe(true);
    });

    it("returns false when queryPermission returns 'prompt'", async () => {
        const handle = makeFakeDirHandle({ queryPermission: vi.fn().mockResolvedValue("prompt") });
        expect(await queryRwGranted(handle)).toBe(false);
    });

    it("returns true when queryPermission is absent", async () => {
        const handle = makeFakeDirHandle({ queryPermission: undefined });
        expect(await queryRwGranted(handle)).toBe(true);
    });
});
