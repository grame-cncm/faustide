import type { DroppedFileHandleCallback } from "./FileAccess";
import type { DiskVolume } from "./DiskVolume";
import type { Volume } from "./Volume";

type DiskOriginRegistry = {
    findLibraryName(vol: DiskVolume, path: string): string | null;
    track(libraryName: string, vol: DiskVolume, path: string): void;
};

type DiskTrackingFileManager = {
    deleteFile(fileName: string): void;
    select(fileName: string): void;
    setDiskTracked(fileName: string, tracked: boolean): void;
};

type DroppedDiskFileTrackerOptions = {
    volumes: Volume[];
    diskTracker: DiskOriginRegistry;
    fileManager: DiskTrackingFileManager;
};

/**
 * Selects the Library file already linked to `path` in `diskVol`.
 *
 * Returns null when this is the first open of that disk origin. Callers use
 * this to make both volume-browser open and drag/drop idempotent for mounted
 * files.
 */
export function selectExistingDiskOrigin(
    fileManager: DiskTrackingFileManager,
    diskTracker: DiskOriginRegistry,
    diskVol: DiskVolume,
    path: string
): string | null {
    const existingName = diskTracker.findLibraryName(diskVol, path);
    if (!existingName) return null;
    fileManager.select(existingName);
    fileManager.setDiskTracked(existingName, true);
    return existingName;
}

/**
 * Builds the drag/drop bridge from browser file handles to disk origins.
 *
 * The helper keeps UI imports idempotent for mounted files. If a dropped file
 * resolves to an origin that is already tracked, the new Library collision copy
 * is removed and the existing disk-backed file stays selected/tracked.
 */
export function createDroppedDiskFileTracker(options: DroppedDiskFileTrackerOptions): DroppedFileHandleCallback {
    const { volumes, diskTracker, fileManager } = options;
    return async (savedName, handle) => {
        for (const vol of volumes) {
            if (vol.kind !== "disk") continue;
            const diskVol = vol as DiskVolume;
            // resolvePath() is null unless the handle lives inside this mount.
            const path = await diskVol.resolvePath(handle);
            if (path === null) continue;
            const existingName = selectExistingDiskOrigin(fileManager, diskTracker, diskVol, path);
            if (existingName && existingName !== savedName) {
                fileManager.deleteFile(savedName);
                return;
            }
            diskTracker.track(savedName, diskVol, path);
            fileManager.setDiskTracked(savedName, true);
            return;
        }
    };
}
