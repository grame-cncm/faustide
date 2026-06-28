// Volume open/save orchestration — the logic that used to live inline in the
// composition root (index.ts) as VolumeBrowserController callbacks.
//
// Three user actions are covered:
//   - openFromVolume         open a file picked in the volume browser
//   - pickAndImportDeviceFile import a file from the local device (OS picker)
//   - saveBundleToVolume      Save As: write the main DSP's perimeter closure
//
// Kept as functions taking narrow structural dependencies (same style as
// DroppedDiskFileTracking.ts) so they are unit-testable without a real
// FileManager, DiskVolume, or DOM.

import { ProjectModel } from "../../model/ProjectModel";
import { computeClosure } from "../../model/Perimeter";
import { writeBundleToDir } from "./BundleWriter";
import { fsAccessAvailable, openDecision, pickImportableFileHandle } from "./FileAccess";
import { handleExistingDiskFile } from "./DroppedDiskFileTracking";
import type { DiskVolume } from "./DiskVolume";
import type { Volume, VolumeEntry } from "./Volume";

/** The slice of FileManager these actions depend on (structural typing). */
export interface VolumeActionsFileManager {
    readonly fileNames: string[];
    readonly mainFileName: string;
    getValue(fileName?: string): string | Uint8Array;
    newFile(
        fileName: string,
        content: string | Uint8Array,
        options?: { persist?: "immediate" | "debounced" | "manual" }
    ): string;
    persistFile(fileName: string, content: string | Uint8Array, options?: { immediate?: boolean }): Promise<void>;
    setDiskTracked(fileName: string, tracked: boolean): void;
    select(fileName: string): void;
    deleteFile(fileName: string): void;
}

/** The slice of DiskOriginTracker these actions depend on. */
export interface VolumeActionsDiskTracker {
    findLibraryName(vol: DiskVolume, path: string): string | null;
    track(libraryName: string, vol: DiskVolume, path: string): void;
}

/**
 * Reads a picked/dropped File into text or raw bytes depending on its
 * extension, tolerating browsers (or tests) without `File.text()` /
 * `File.arrayBuffer()` by falling back to FileReader.
 *
 * Audio detection is delegated to ProjectModel.isAudioFile — the single source
 * of truth for the audio-extension set.
 */
export function readPickedFileContent(file: File): Promise<string | Uint8Array> {
    if (ProjectModel.isAudioFile(file.name)) {
        if (typeof file.arrayBuffer === "function") {
            return file.arrayBuffer().then(buffer => new Uint8Array(buffer));
        }
        return new Promise<Uint8Array>((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(new Uint8Array(reader.result as ArrayBuffer));
            reader.onerror = () => resolve(new Uint8Array());
            reader.readAsArrayBuffer(file);
        });
    }
    if (typeof file.text === "function") return file.text();
    return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result ? reader.result.toString() : "");
        reader.onerror = () => resolve("");
        reader.readAsText(file);
    });
}

/** Add `content` to the Library under a fresh name and persist it immediately. */
async function importContent(
    fileManager: Pick<VolumeActionsFileManager, "newFile" | "persistFile">,
    name: string,
    content: string | Uint8Array
): Promise<string> {
    const savedName = fileManager.newFile(name, content, { persist: "manual" });
    await fileManager.persistFile(savedName, content, { immediate: true });
    return savedName;
}

export interface OpenFromVolumeDeps {
    fileManager: VolumeActionsFileManager;
    diskTracker: VolumeActionsDiskTracker;
    /** Invoked when a local Library copy clashes with the mounted file. */
    onLocalConflict?: (fileName: string) => void;
}

/**
 * Open a file selected in the volume browser.
 *
 * Native Faust files (.dsp / .lib) from a Disk volume are opened in place: the
 * disk origin is recorded so later edits write back to disk (green indicator).
 * An already-open origin short-circuits via handleExistingDiskFile. All other
 * files are import-copied into the Library.
 */
export async function openFromVolume(deps: OpenFromVolumeDeps, vol: Volume, entry: VolumeEntry): Promise<void> {
    const { fileManager, diskTracker, onLocalConflict } = deps;
    const inPlace = vol.kind === "disk" && openDecision(entry.name) === "open-in-place";
    if (inPlace && handleExistingDiskFile(fileManager, diskTracker, vol as DiskVolume, entry.path, entry.name, {
        onLocalConflict
    })) return;

    const content = await vol.readText(entry.path);
    const savedName = await importContent(fileManager, entry.name, content);
    if (inPlace) {
        diskTracker.track(savedName, vol as DiskVolume, entry.path);
        fileManager.setDiskTracked(savedName, true);
    }
}

export interface ImportDeviceFileDeps {
    fileManager: Pick<VolumeActionsFileManager, "newFile" | "persistFile">;
}

/**
 * Import a file from the local device.
 *
 * Uses the Chromium File System Access picker when available, otherwise falls
 * back to a transient `<input type=file>`. The file is read with
 * readPickedFileContent and added to the Library.
 */
export async function pickAndImportDeviceFile(deps: ImportDeviceFileDeps): Promise<void> {
    if (fsAccessAvailable()) {
        const handle = await pickImportableFileHandle();
        if (!handle) return;
        const file = await handle.getFile();
        await importContent(deps.fileManager, handle.name, await readPickedFileContent(file));
        return;
    }
    const input = document.createElement("input");
    input.type = "file";
    input.addEventListener("change", async () => {
        const file = input.files?.[0];
        if (!file) return;
        await importContent(deps.fileManager, file.name, await readPickedFileContent(file));
    });
    input.click();
}

export interface SaveBundleDeps {
    fileManager: Pick<VolumeActionsFileManager, "fileNames" | "mainFileName" | "getValue">;
}

/**
 * Save As: write the main DSP and its perimeter closure (imported libraries,
 * components, soundfiles) into `folderPath` inside a Disk volume.
 *
 * No-op for volumes that cannot create file handles (e.g. the Library, not yet
 * supported as a Save As target). When `name` ends in `.dsp`, the main file is
 * renamed to `name` in the written bundle; dependencies keep their own names.
 */
export async function saveBundleToVolume(
    deps: SaveBundleDeps,
    vol: Volume,
    folderPath: string,
    name: string
): Promise<void> {
    const diskVol = vol as DiskVolume;
    if (!diskVol.createFileHandle) return;
    const { fileManager } = deps;
    const mainFile = fileManager.mainFileName;
    const fileNameSet = new Set(fileManager.fileNames);
    const readText = (n: string): string | null => {
        const val = fileManager.getValue(n);
        return typeof val === "string" ? val : null;
    };
    const { files } = computeClosure(mainFile, readText, n => fileNameSet.has(n));
    const bundle = new Map<string, string>();
    files.forEach((f) => {
        const text = readText(f);
        if (text !== null) bundle.set(name.endsWith(".dsp") && f === mainFile ? name : f, text);
    });
    await writeBundleToDir(diskVol, folderPath, bundle);
}
