import { beforeEach, describe, expect, it, vi } from "vitest";
import {
    fsAccessAvailable, openDecision, pickImportableFileHandle,
    pickDirectory, ensureRwPermission, queryRwGranted
} from "../runtime/fs/FileAccess";

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
