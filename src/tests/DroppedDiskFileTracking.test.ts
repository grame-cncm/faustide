import { describe, expect, it, vi } from "vitest";
import { createDroppedDiskFileTracker, handleExistingDiskFile } from "../runtime/fs/DroppedDiskFileTracking";
import type { DiskVolume } from "../runtime/fs/DiskVolume";

const makeDiskVolume = (id: string, path: string | null) => ({
    id,
    kind: "disk",
    resolvePath: vi.fn(async () => path)
});

const makeTracker = () => ({
    findLibraryName: vi.fn(() => null as string | null),
    track: vi.fn()
});

const makeFileManager = (fileNames: string[] = []) => ({
    fileNames,
    deleteFile: vi.fn(),
    select: vi.fn(),
    setDiskTracked: vi.fn()
});

describe("createDroppedDiskFileTracker", () => {
    it("selects an existing Library file for an already tracked disk origin", () => {
        const volume = makeDiskVolume("disk:1", "main.dsp") as unknown as DiskVolume;
        const tracker = makeTracker();
        tracker.findLibraryName.mockReturnValue("main.dsp");
        const fileManager = makeFileManager();

        const result = handleExistingDiskFile(fileManager, tracker, volume, "main.dsp", "main.dsp");

        expect(result).toBe("tracked");
        expect(fileManager.select).toHaveBeenCalledWith("main.dsp");
        expect(fileManager.setDiskTracked).toHaveBeenCalledWith("main.dsp", true);
        expect(tracker.track).not.toHaveBeenCalled();
    });

    it("reports a conflict for a matching local Library copy when its disk folder is mounted later", () => {
        const volume = makeDiskVolume("disk:1", "main.dsp") as unknown as DiskVolume;
        const tracker = makeTracker();
        const fileManager = makeFileManager(["main.dsp"]);
        const onLocalConflict = vi.fn();

        const result = handleExistingDiskFile(fileManager, tracker, volume, "main.dsp", "main.dsp", { onLocalConflict });

        expect(result).toBe("local-conflict");
        expect(tracker.track).not.toHaveBeenCalled();
        expect(fileManager.select).toHaveBeenCalledWith("main.dsp");
        expect(fileManager.setDiskTracked).not.toHaveBeenCalled();
        expect(onLocalConflict).toHaveBeenCalledWith("main.dsp");
    });

    it("reports null when a disk origin is not already tracked", () => {
        const volume = makeDiskVolume("disk:1", "main.dsp") as unknown as DiskVolume;
        const tracker = makeTracker();
        const fileManager = makeFileManager();

        const result = handleExistingDiskFile(fileManager, tracker, volume, "main.dsp", "main.dsp");

        expect(result).toBeNull();
        expect(fileManager.select).not.toHaveBeenCalled();
        expect(fileManager.setDiskTracked).not.toHaveBeenCalled();
    });

    it("tracks a newly dropped mounted file under its saved Library name", async () => {
        const volume = makeDiskVolume("disk:1", "main.dsp") as unknown as DiskVolume;
        const tracker = makeTracker();
        const fileManager = makeFileManager(["main.dsp"]);
        const callback = createDroppedDiskFileTracker({
            volumes: [volume],
            diskTracker: tracker,
            fileManager
        });

        await callback("main.dsp", { kind: "file", name: "main.dsp" } as FileSystemFileHandle);

        expect(tracker.track).toHaveBeenCalledWith("main.dsp", volume, "main.dsp");
        expect(fileManager.setDiskTracked).toHaveBeenCalledWith("main.dsp", true);
        expect(fileManager.deleteFile).not.toHaveBeenCalled();
    });

    it("removes a collision copy and reports a conflict when a matching local file exists", async () => {
        const volume = makeDiskVolume("disk:1", "main.dsp") as unknown as DiskVolume;
        const tracker = makeTracker();
        const fileManager = makeFileManager(["main.dsp", "untitled1.dsp"]);
        const onLocalConflict = vi.fn();
        const callback = createDroppedDiskFileTracker({
            volumes: [volume],
            diskTracker: tracker,
            fileManager,
            onLocalConflict
        });

        await callback("untitled1.dsp", { kind: "file", name: "main.dsp" } as FileSystemFileHandle);

        expect(tracker.track).not.toHaveBeenCalled();
        expect(fileManager.deleteFile).toHaveBeenCalledWith("untitled1.dsp");
        expect(fileManager.select).toHaveBeenCalledWith("main.dsp");
        expect(fileManager.setDiskTracked).not.toHaveBeenCalled();
        expect(onLocalConflict).toHaveBeenCalledWith("main.dsp");
    });

    it("removes a collision copy when the same mounted file is dropped again", async () => {
        const volume = makeDiskVolume("disk:1", "main.dsp") as unknown as DiskVolume;
        const tracker = makeTracker();
        tracker.findLibraryName.mockReturnValue("main.dsp");
        const fileManager = makeFileManager();
        const callback = createDroppedDiskFileTracker({
            volumes: [volume],
            diskTracker: tracker,
            fileManager
        });

        await callback("untitled1.dsp", { kind: "file", name: "main.dsp" } as FileSystemFileHandle);

        expect(fileManager.deleteFile).toHaveBeenCalledWith("untitled1.dsp");
        expect(fileManager.select).toHaveBeenCalledWith("main.dsp");
        expect(fileManager.setDiskTracked).toHaveBeenCalledWith("main.dsp", true);
        expect(tracker.track).not.toHaveBeenCalled();
    });

    it("ignores files that do not resolve inside a mounted disk volume", async () => {
        const volume = makeDiskVolume("disk:1", null) as unknown as DiskVolume;
        const tracker = makeTracker();
        const fileManager = makeFileManager();
        const callback = createDroppedDiskFileTracker({
            volumes: [volume],
            diskTracker: tracker,
            fileManager
        });

        await callback("copy.dsp", { kind: "file", name: "copy.dsp" } as FileSystemFileHandle);

        expect(tracker.track).not.toHaveBeenCalled();
        expect(fileManager.setDiskTracked).not.toHaveBeenCalled();
        expect(fileManager.deleteFile).not.toHaveBeenCalled();
    });
});
