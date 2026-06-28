import { afterEach, describe, expect, it, vi } from "vitest";
import {
    openFromVolume,
    pickAndImportDeviceFile,
    readPickedFileContent,
    saveBundleToVolume
} from "../runtime/fs/VolumeFileActions";
import type { DiskVolume } from "../runtime/fs/DiskVolume";
import type { Volume, VolumeEntry } from "../runtime/fs/Volume";

const makeFileManager = (over: Record<string, unknown> = {}) => ({
    fileNames: [] as string[],
    mainFileName: "main.dsp",
    getValue: vi.fn<(name?: string) => string | Uint8Array>(),
    newFile: vi.fn((name: string) => name),
    persistFile: vi.fn(async () => {}),
    setDiskTracked: vi.fn(),
    select: vi.fn(),
    deleteFile: vi.fn(),
    ...over
});

const makeTracker = () => ({
    findLibraryName: vi.fn<(vol: DiskVolume, path: string) => string | null>(() => null),
    track: vi.fn()
});

const entry = (over: Partial<VolumeEntry> = {}): VolumeEntry => ({
    name: "foo.txt",
    path: "foo.txt",
    type: "file",
    isNative: false,
    ...over
});

// ── readPickedFileContent ─────────────────────────────────────────────────────

describe("readPickedFileContent", () => {
    it("reads a non-audio file as text via File.text()", async () => {
        const file = { name: "a.dsp", text: async () => "process = _;" } as unknown as File;
        expect(await readPickedFileContent(file)).toBe("process = _;");
    });

    it("reads an audio file as bytes via File.arrayBuffer()", async () => {
        const bytes = new Uint8Array([1, 2, 3]);
        const file = { name: "kick.wav", arrayBuffer: async () => bytes.buffer } as unknown as File;
        expect(await readPickedFileContent(file)).toEqual(bytes);
    });

    it("treats an uppercase audio extension as binary (case-insensitive)", async () => {
        const bytes = new Uint8Array([9]);
        const file = { name: "LOOP.WAV", arrayBuffer: async () => bytes.buffer } as unknown as File;
        expect(await readPickedFileContent(file)).toEqual(bytes);
    });
});

// ── openFromVolume ────────────────────────────────────────────────────────────

describe("openFromVolume", () => {
    it("import-copies a foreign file without disk tracking", async () => {
        const fileManager = makeFileManager();
        const diskTracker = makeTracker();
        const vol = { kind: "library", readText: vi.fn(async () => "hello") } as unknown as Volume;

        await openFromVolume({ fileManager, diskTracker }, vol, entry({ name: "notes.md", path: "notes.md" }));

        expect(fileManager.newFile).toHaveBeenCalledWith("notes.md", "hello", { persist: "manual" });
        expect(fileManager.persistFile).toHaveBeenCalledWith("notes.md", "hello", { immediate: true });
        expect(diskTracker.track).not.toHaveBeenCalled();
        expect(fileManager.setDiskTracked).not.toHaveBeenCalled();
    });

    it("opens a native disk file in place and records its origin", async () => {
        const fileManager = makeFileManager();
        const diskTracker = makeTracker();
        const vol = { kind: "disk", id: "disk:1", readText: vi.fn(async () => "import(\"x.lib\");") } as unknown as DiskVolume;

        await openFromVolume({ fileManager, diskTracker }, vol, entry({ name: "main.dsp", path: "sub/main.dsp", isNative: true }));

        expect(fileManager.newFile).toHaveBeenCalledWith("main.dsp", "import(\"x.lib\");", { persist: "manual" });
        expect(diskTracker.track).toHaveBeenCalledWith("main.dsp", vol, "sub/main.dsp");
        expect(fileManager.setDiskTracked).toHaveBeenCalledWith("main.dsp", true);
    });

    it("short-circuits when the disk origin is already open (no re-read)", async () => {
        const fileManager = makeFileManager();
        const diskTracker = makeTracker();
        diskTracker.findLibraryName.mockReturnValue("main.dsp");
        const readText = vi.fn(async () => "code");
        const vol = { kind: "disk", id: "disk:1", readText } as unknown as DiskVolume;

        await openFromVolume({ fileManager, diskTracker }, vol, entry({ name: "main.dsp", path: "main.dsp", isNative: true }));

        expect(readText).not.toHaveBeenCalled();
        expect(fileManager.newFile).not.toHaveBeenCalled();
        expect(fileManager.select).toHaveBeenCalledWith("main.dsp");
    });
});

// ── saveBundleToVolume ────────────────────────────────────────────────────────

describe("saveBundleToVolume", () => {
    it("is a no-op for volumes without createFileHandle (e.g. Library)", async () => {
        const fileManager = makeFileManager();
        const vol = { kind: "library" } as unknown as Volume;

        await saveBundleToVolume({ fileManager }, vol, "", "out.dsp");

        expect(fileManager.getValue).not.toHaveBeenCalled();
    });

    it("writes the closure, renaming the main .dsp to the chosen name", async () => {
        const writes = new Map<string, string>();
        const vol = {
            kind: "disk",
            createFileHandle: vi.fn(async (path: string) => ({
                createWritable: async () => ({
                    write: async (c: string) => { writes.set(path, c); },
                    close: async () => {}
                })
            }))
        } as unknown as DiskVolume;
        const sources: Record<string, string> = {
            "main.dsp": "import(\"filter.lib\");",
            "filter.lib": "filter = _;"
        };
        const fileManager = makeFileManager({
            fileNames: ["main.dsp", "filter.lib"],
            mainFileName: "main.dsp",
            getValue: vi.fn((n: string) => sources[n])
        });

        await saveBundleToVolume({ fileManager }, vol, "patches", "renamed.dsp");

        expect(writes.get("patches/filter.lib")).toBe("filter = _;");
        expect(writes.get("patches/renamed.dsp")).toBe("import(\"filter.lib\");");
        expect(writes.has("patches/main.dsp")).toBe(false);
    });
});

// ── pickAndImportDeviceFile ───────────────────────────────────────────────────

describe("pickAndImportDeviceFile", () => {
    afterEach(() => {
        delete (window as unknown as { showOpenFilePicker?: unknown }).showOpenFilePicker;
    });

    it("imports the file chosen via the File System Access picker", async () => {
        const fileManager = makeFileManager();
        const file = { name: "synth.dsp", text: async () => "process = _;" } as unknown as File;
        const handle = { kind: "file", name: "synth.dsp", getFile: async () => file };
        (window as unknown as { showOpenFilePicker: unknown }).showOpenFilePicker = vi.fn(async () => [handle]);

        await pickAndImportDeviceFile({ fileManager });

        expect(fileManager.newFile).toHaveBeenCalledWith("synth.dsp", "process = _;", { persist: "manual" });
        expect(fileManager.persistFile).toHaveBeenCalledWith("synth.dsp", "process = _;", { immediate: true });
    });

    it("does nothing when the picker is dismissed", async () => {
        const fileManager = makeFileManager();
        (window as unknown as { showOpenFilePicker: unknown }).showOpenFilePicker = vi.fn(async () => { throw new Error("aborted"); });

        await pickAndImportDeviceFile({ fileManager });

        expect(fileManager.newFile).not.toHaveBeenCalled();
    });
});
