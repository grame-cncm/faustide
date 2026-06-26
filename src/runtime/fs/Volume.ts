// Types-only file — no adapter imports; adapters import this, not the reverse.
// (plan §5 role: "Volume interface"; §5b: lifted from markpage/src/volumes.ts,
// isMarkdown → isNative, kept the pure helpers sortEntries / childrenFromTree.)

/** Possible lifecycle states for a mounted volume. */
export type VolumeState = "ready" | "needs-permission" | "offline" | "error";

/** The storage backend family a volume belongs to. */
export type VolumeKind = "library" | "disk" | "repo";

/** A single entry returned by Volume.list(). */
export interface VolumeEntry {
    /** Display name (filename or directory name, no path prefix). */
    name: string;
    /**
     * Path relative to the volume root, no leading "/".
     * Use "" for the volume root itself when calling list().
     */
    path: string;
    type: "file" | "dir";
    /**
     * True for native Faust formats (.dsp, .lib) that should be opened in place
     * (invariant I4).  False for foreign formats → copied into the Library.
     */
    isNative: boolean;
}

/** Read-only interface every volume adapter must implement. */
export interface Volume {
    readonly id: string;
    readonly kind: VolumeKind;
    readonly label: string;

    /** Current lifecycle state (async — may require a permission query). */
    state(): Promise<VolumeState>;

    /**
     * List the immediate children of `path` ("" = volume root).
     * Throws if the volume is not ready; callers should check state() first.
     */
    list(path: string): Promise<VolumeEntry[]>;

    /** Read a UTF-8 text file at `path` relative to the volume root. */
    readText(path: string): Promise<string>;
}

// ── Pure helpers ─────────────────────────────────────────────────────────────

const NATIVE_EXTENSIONS = new Set([".dsp", ".lib"]);

/** Returns true for files that should be opened in place (invariant I4). */
export function isNativeFaustFile(name: string): boolean {
    const dot = name.lastIndexOf(".");
    if (dot === -1) return false;
    return NATIVE_EXTENSIONS.has(name.slice(dot).toLowerCase());
}

/**
 * Sort volume entries: directories first, then alphabetically by name
 * (locale-aware, case-insensitive).
 */
export function sortEntries(entries: VolumeEntry[]): VolumeEntry[] {
    return entries.slice().sort((a, b) => {
        if (a.type !== b.type) return a.type === "dir" ? -1 : 1;
        return a.name.localeCompare(b.name, undefined, { sensitivity: "base" });
    });
}

/**
 * Given a flat list of paths (e.g. from a recursive tree), return only the
 * immediate children of `parentPath` as VolumeEntry objects.
 *
 * @param allPaths   Flat array of relative paths (no leading "/").
 * @param parentPath Parent path to filter on ("" for root).
 */
export function childrenFromTree(allPaths: string[], parentPath: string): VolumeEntry[] {
    const prefix = parentPath === "" ? "" : `${parentPath}/`;
    const seen = new Set<string>();
    const result: VolumeEntry[] = [];

    allPaths.forEach((p) => {
        if (!p.startsWith(prefix)) return;
        const rest = p.slice(prefix.length);
        if (!rest) return;
        const slash = rest.indexOf("/");
        const segment = slash === -1 ? rest : rest.slice(0, slash);
        if (seen.has(segment)) return;
        seen.add(segment);
        const isDir = slash !== -1;
        const entryPath = prefix + segment;
        result.push({
            name: segment,
            path: entryPath,
            type: isDir ? "dir" : "file",
            isNative: !isDir && isNativeFaustFile(segment)
        });
    });

    return result;
}
