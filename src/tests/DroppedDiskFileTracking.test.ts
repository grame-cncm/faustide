import { describe, expect, it, vi } from "vitest";
import { createDroppedDiskFileTracker, selectExistingDiskOrigin } from "../runtime/fs/DroppedDiskFileTracking";
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

const makeFileManager = () => ({
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

        const selectedName = selectExistingDiskOrigin(fileManager, tracker, volume, "main.dsp");

        expect(selectedName).toBe("main.dsp");
        expect(fileManager.select).toHaveBeenCalledWith("main.dsp");
        expect(fileManager.setDiskTracked).toHaveBeenCalledWith("main.dsp", true);
    });

    it("reports null when a disk origin is not already tracked", () => {
        const volume = makeDiskVolume("disk:1", "main.dsp") as unknown as DiskVolume;
        const tracker = makeTracker();
        const fileManager = makeFileManager();

        const selectedName = selectExistingDiskOrigin(fileManager, tracker, volume, "main.dsp");

        expect(selectedName).toBeNull();
        expect(fileManager.select).not.toHaveBeenCalled();
        expect(fileManager.setDiskTracked).not.toHaveBeenCalled();
    });

    it("tracks a newly dropped mounted file under its saved Library name", async () => {
        const volume = makeDiskVolume("disk:1", "main.dsp") as unknown as DiskVolume;
        const tracker = makeTracker();
        const fileManager = makeFileManager();
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
