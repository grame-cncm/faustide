// File System Access API helpers — Chromium-only; callers must gate on
// fsAccessAvailable().  Unit-testable pure parts: openDecision().
// I/O functions (pick*) are tested by stubbing window.show*Picker.

import { isNativeFaustFile } from "./Volume";

// ---- File System Access typing (not all in the TS DOM lib) ------------------

interface FsPickerWindow {
    showOpenFilePicker(opts?: {
        multiple?: boolean;
        types?: { description?: string; accept: Record<string, string[]> }[];
        excludeAcceptAllOption?: boolean;
    }): Promise<FileSystemFileHandle[]>;
    showDirectoryPicker(opts?: { mode?: "read" | "readwrite" }): Promise<FileSystemDirectoryHandle>;
}

interface FsPermHandle {
    queryPermission(d: { mode: "readwrite" }): Promise<PermissionState>;
    requestPermission(d: { mode: "readwrite" }): Promise<PermissionState>;
}

// ---- Feature detection -------------------------------------------------------

/** Whether the File System Access pickers are available (Chromium-only). */
export function fsAccessAvailable(): boolean {
    return typeof window !== "undefined"
        && "showOpenFilePicker" in window;
}

// ---- Format routing (pure) --------------------------------------------------

/** How a picked file should be handled in faustide. */
export type OpenDecision = "open-in-place" | "import-copy";

/**
 * Routes a file name to an open strategy based on its extension.
 *   - Native Faust files (.dsp, .lib) → "open-in-place" (keep the handle for
 *     future saves; P6 wires actual disk-origin tracking).
 *   - All other files → "import-copy" (read and add to the Library).
 */
export function openDecision(name: string): OpenDecision {
    return isNativeFaustFile(name) ? "open-in-place" : "import-copy";
}

// ---- Picker -----------------------------------------------------------------

/**
 * Prompts the user to pick a single file (Chromium File System Access path).
 * Returns null if the user cancels or if the picker is unavailable.
 *
 * The caller decides how to handle the result using openDecision(handle.name).
 */
export async function pickImportableFileHandle(): Promise<FileSystemFileHandle | null> {
    if (!fsAccessAvailable()) return null;
    try {
        const [handle] = await (window as unknown as FsPickerWindow).showOpenFilePicker({
            types: [
                {
                    description: "Faust DSP and libraries",
                    accept: {
                        "text/plain": [".dsp", ".lib"]
                    }
                }
            ],
            excludeAcceptAllOption: false
        });
        return handle ?? null;
    } catch {
        return null; // user dismissed the picker
    }
}

/** Prompt for a read-write directory handle; null if the user cancels. */
export async function pickDirectory(): Promise<FileSystemDirectoryHandle | null> {
    if (!fsAccessAvailable()) return null;
    try {
        return await (window as unknown as FsPickerWindow).showDirectoryPicker({ mode: "readwrite" });
    } catch {
        return null;
    }
}

// ---- Drag-and-drop handle capture -------------------------------------------

/** A DataTransferItem augmented with the Chromium-only handle accessor. */
type FsDataTransferItem = DataTransferItem & {
    getAsFileSystemHandle?(): Promise<FileSystemHandle | null>;
};

/** Invoked once a dropped file has been saved, with the source file's FS handle. */
export type DroppedFileHandleCallback = (savedName: string, handle: FileSystemFileHandle) => void | Promise<void>;

/**
 * Captures the source FileSystemHandle of a drag-and-drop, bridging the event's
 * synchronous lifetime and the asynchronous save that follows.
 *
 * A DataTransfer's items are only valid synchronously inside the drop event;
 * they go stale as soon as the handler yields at its first `await`.  This helper
 * calls the Chromium-only `getAsFileSystemHandle()` immediately (keeping only the
 * returned promise) and hands back a deferred resolver to await later, once the
 * dropped file has been saved under its final name.
 *
 * The resolver invokes `callback(savedName, handle)` only when a real file handle
 * was captured.  When `getAsFileSystemHandle` is unavailable (non-Chromium), no
 * callback is registered, or no name was saved, both capture and resolve are
 * no-ops.
 *
 * @param dataTransfer the drop event's DataTransfer (may be null)
 * @param callback     invoked with the resolved handle after the save
 * @returns a resolver to call with each saved file name, in drop order
 */
export function captureDroppedFileHandles(
    dataTransfer: DataTransfer | null,
    callback?: DroppedFileHandleCallback
): (savedNames: Array<string | undefined>) => Promise<void> {
    const handlePromises = callback && dataTransfer?.items
        ? Array.from(dataTransfer.items)
            .filter(item => item.kind === "file")
            .map((item) => {
                const fsItem = item as FsDataTransferItem;
                return fsItem.getAsFileSystemHandle ? fsItem.getAsFileSystemHandle() : null;
            })
        : [];
    return async (savedNames) => {
        if (!callback || handlePromises.length === 0) return;
        await Promise.all(handlePromises.map(async (handlePromise, index) => {
            const savedName = savedNames[index];
            if (!savedName || !handlePromise) return;
            const handle = await handlePromise;
            if (handle?.kind === "file") await callback(savedName, handle as FileSystemFileHandle);
        }));
    };
}

/**
 * Single-file compatibility wrapper around `captureDroppedFileHandles`.
 */
export function captureDroppedFileHandle(
    dataTransfer: DataTransfer | null,
    callback?: DroppedFileHandleCallback
): (savedName: string | undefined) => Promise<void> {
    const resolve = captureDroppedFileHandles(dataTransfer, callback);
    return savedName => resolve([savedName]);
}

/**
 * Re-request RW permission on a persisted handle (requires a user gesture).
 * Returns whether the permission is now granted.
 */
export async function ensureRwPermission(handle: FileSystemDirectoryHandle): Promise<boolean> {
    const h = handle as unknown as FsPermHandle;
    if (typeof h.requestPermission !== "function") return true;
    return (await h.requestPermission({ mode: "readwrite" })) === "granted";
}

/**
 * Query RW permission silently (no user gesture, no prompt).
 * Returns true only if already granted — used by background pollers.
 */
export async function queryRwGranted(handle: FileSystemDirectoryHandle): Promise<boolean> {
    const h = handle as unknown as FsPermHandle;
    if (typeof h.queryPermission !== "function") return true;
    return (await h.queryPermission({ mode: "readwrite" })) === "granted";
}
