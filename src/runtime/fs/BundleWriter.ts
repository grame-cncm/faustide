// P6.2 — Faust perimeter bundle writer/reader.
//
// Format: each file in the closure is written at its real name inside the
// chosen directory.  Write order: all non-.dsp files first, then the main
// .dsp last — so an external reader never sees a main that references a
// library that does not yet exist (poor-man's atomicity; there is no disk
// transaction).

import type { DiskVolume } from "./DiskVolume";

/**
 * Returns the closure file list sorted for safe disk write order:
 *   non-.dsp resources (libraries, audio) first, .dsp files last.
 *
 * Pure — unit-testable without any I/O.
 */
export function bundleFileList(closureFiles: string[]): string[] {
    const deps = closureFiles.filter(f => !f.endsWith(".dsp"));
    const dsps = closureFiles.filter(f => f.endsWith(".dsp"));
    return [...deps, ...dsps];
}

/**
 * Write a Faust perimeter bundle into `folderPath` inside `vol`.
 *
 * `files` maps file name → text content (already computed by computeClosure).
 * Non-.dsp files are written before .dsp files (see module header).
 *
 * File System Access I/O — Chromium-only; tested manually (plan §6 caveat).
 */
export async function writeBundleToDir(
    vol: DiskVolume,
    folderPath: string,
    files: Map<string, string>
): Promise<void> {
    const ordered = bundleFileList(Array.from(files.keys()));
    for (let i = 0; i < ordered.length; i++) {
        const name = ordered[i];
        const content = files.get(name) ?? "";
        // eslint-disable-next-line no-await-in-loop
        const handle = await vol.createFileHandle(
            folderPath !== "" ? `${folderPath}/${name}` : name
        );
        // eslint-disable-next-line no-await-in-loop
        const writable = await handle.createWritable();
        // eslint-disable-next-line no-await-in-loop
        await writable.write(content);
        // eslint-disable-next-line no-await-in-loop
        await writable.close();
    }
}

/**
 * Read all text files from `folderPath` inside `vol`.
 * Returns a Map<name, content>.  Directories and unreadable files are skipped.
 *
 * File System Access I/O — Chromium-only; tested manually.
 */
export async function readBundleFromDir(
    vol: DiskVolume,
    folderPath: string
): Promise<Map<string, string>> {
    const entries = await vol.list(folderPath);
    const result = new Map<string, string>();
    for (let i = 0; i < entries.length; i++) {
        const entry = entries[i];
        if (entry.type !== "file") continue; // eslint-disable-line no-continue
        try {
            // eslint-disable-next-line no-await-in-loop
            const text = await vol.readText(entry.path);
            result.set(entry.name, text);
        } catch { /* skip binary or unreadable files */ }
    }
    return result;
}
