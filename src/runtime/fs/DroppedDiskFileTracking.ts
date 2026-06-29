import type { DroppedFileHandleCallback } from "./FileAccess";
import type { DiskVolume } from "./DiskVolume";
import type { Volume } from "./Volume";

type DiskOriginRegistry = {
    findLibraryName(vol: DiskVolume, path: string): string | null;
    track(libraryName: string, vol: DiskVolume, path: string): void;
};

type DiskTrackingFileManager = {
    readonly fileNames: string[];
    deleteFile(fileName: string): void;
    select(fileName: string): void;
    setDiskTracked(fileName: string, tracked: boolean): void;
};

type DroppedDiskFileTrackerOptions = {
    volumes: Volume[];
    diskTracker: DiskOriginRegistry;
    fileManager: DiskTrackingFileManager;
    onLocalConflict?: (fileName: string) => void;
    onDiskTracked?: (fileName: string) => void | Promise<void>;
};

export type ExistingDiskFileResult = "tracked" | "local-conflict" | null;

/**
 * Handles a disk open whose target may already be represented in the Library.
 *
 * Already tracked origins are selected. Local white copies with the same name
 * are treated as conflicts so their possibly edited content is not overwritten
 * or silently linked to disk.
 */
export function handleExistingDiskFile(
    fileManager: DiskTrackingFileManager,
    diskTracker: DiskOriginRegistry,
    diskVol: DiskVolume,
    path: string,
    libraryName: string,
    options: { ignoreLocalName?: string; onLocalConflict?: (fileName: string) => void } = {}
): ExistingDiskFileResult {
    const existingName = diskTracker.findLibraryName(diskVol, path);
    if (existingName) {
        fileManager.select(existingName);
        fileManager.setDiskTracked(existingName, true);
        return "tracked";
    }
    if (options.ignoreLocalName !== libraryName && fileManager.fileNames.includes(libraryName)) {
        fileManager.select(libraryName);
        options.onLocalConflict?.(libraryName);
        return "local-conflict";
    }
    return null;
}

/**
 * Builds the drag/drop bridge from browser file handles to disk origins.
 *
 * The helper keeps UI imports idempotent for mounted files. If a dropped file
 * resolves to an origin that is already tracked, the new Library collision copy
 * is removed and the existing disk-backed file stays selected/tracked.
 */
export function createDroppedDiskFileTracker(options: DroppedDiskFileTrackerOptions): DroppedFileHandleCallback {
    const { volumes, diskTracker, fileManager, onLocalConflict, onDiskTracked } = options;
    return async (savedName, handle) => {
        for (const vol of volumes) {
            if (vol.kind !== "disk") continue;
            const diskVol = vol as DiskVolume;
            // resolvePath() is null unless the handle lives inside this mount.
            const path = await diskVol.resolvePath(handle);
            if (path === null) continue;
            const result = handleExistingDiskFile(fileManager, diskTracker, diskVol, path, handle.name, {
                ignoreLocalName: savedName,
                onLocalConflict
            });
            if (result) {
                if (savedName !== handle.name) fileManager.deleteFile(savedName);
                return;
            }
            diskTracker.track(savedName, diskVol, path);
            fileManager.setDiskTracked(savedName, true);
            await onDiskTracked?.(savedName);
            return;
        }
    };
}
