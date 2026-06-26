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
