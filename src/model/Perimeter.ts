/**
 * Perimeter closure — computes the set of project-local files that must travel
 * with a Faust DSP for it to compile: its imported libraries, component DSPs,
 * and referenced soundfiles.
 *
 * Adapted from markpage/src/resource-mapping.ts (opaqueCodeRanges technique).
 * The masking approach is identical: blank out comments and string literals
 * before scanning, so refs inside non-argument strings are not collected.
 *
 * Plan §7: four file-pulling primitives are recognized:
 *   import("x.lib")      — pull a library by path
 *   library("x.lib")     — pull a library and bind it to a name
 *   component("x.dsp")   — embed another DSP file
 *   soundfile("name", n) — reference a project-local audio file by label
 */

// ── Masking ───────────────────────────────────────────────────────────────────

// [start, end) byte range of opaque source (comment or string literal).
// Using an object instead of a tuple to stay compatible with ESLint 6's
// @typescript-eslint/parser which crashes on tuple type annotations.
interface CodeRange { start: number; end: number; }

/**
 * Returns the [start, end) byte ranges of Faust source that are opaque:
 * `// …` line comments and `/* … *\/` block comments.
 *
 * String literals are intentionally NOT masked because the primitives we scan
 * for (`import`, `library`, `component`, `soundfile`) appear as calls whose
 * string argument IS the target we want to collect.  Masking strings would
 * discard the filenames.  The only false-positive risk is a primitive call
 * inside a comment, which comment masking handles correctly.
 */
export function maskFaustCode(source: string): CodeRange[] {
    const ranges: CodeRange[] = [];
    let i = 0;
    const len = source.length;

    while (i < len) {
        if (source[i] === "/" && source[i + 1] === "/") {
            const start = i;
            i += 2;
            while (i < len && source[i] !== "\n") i += 1;
            ranges.push({ start, end: i });
        } else if (source[i] === "/" && source[i + 1] === "*") {
            const start = i;
            i += 2;
            while (i < len - 1 && !(source[i] === "*" && source[i + 1] === "/")) i += 1;
            i += 2;
            ranges.push({ start, end: i });
        } else {
            i += 1;
        }
    }
    return ranges;
}

function inMaskedRange(index: number, ranges: CodeRange[]): boolean {
    return ranges.some(r => index >= r.start && index < r.end);
}

// ── File-ref extraction ───────────────────────────────────────────────────────

/**
 * Regex that matches the four Faust file-pulling call shapes and captures
 * the first string argument (the filename / label):
 *
 *   import("x")     library("x")     component("x")     soundfile("x", …)
 *
 * Group 1: primitive name  Group 2: the first string argument
 */
const FILE_REF_RE = /\b(import|library|component|soundfile)\s*\(\s*"([^"]+)"/g;

/**
 * Extract all file references from a Faust source string, skipping any
 * occurrence that falls inside a masked (comment / non-argument string) range.
 *
 * Returns an array of raw string arguments as they appear in the source
 * (may include relative path segments — callers normalise).
 */
export function extractFileRefs(source: string): string[] {
    const masked = maskFaustCode(source);
    const refs: string[] = [];

    // Reset lastIndex before iterating
    FILE_REF_RE.lastIndex = 0;
    let m = FILE_REF_RE.exec(source);
    while (m !== null) {
        // The opening `"` of the string argument starts at m.index + length of
        // everything before the quote.  We check whether the quote itself is
        // masked (i.e. this call is inside a comment / another string).
        const quotePos = m.index + m[0].indexOf('"');
        if (!inMaskedRange(quotePos, masked)) {
            refs.push(m[2]);
        }
        m = FILE_REF_RE.exec(source);
    }
    return refs;
}

// ── Closure computation ───────────────────────────────────────────────────────

export interface PerimeterResult {
    /** All project-local files required by the main DSP (including itself). */
    files: string[];
    /** Files referenced in the source but not found in the project. */
    missing: string[];
}

/**
 * Compute the transitive closure of files required by `mainFile`.
 *
 * @param mainFile       Filename of the entry-point DSP (relative to project root).
 * @param readText       Reads a file's text content by filename. Returns null/undefined
 *                       if the file cannot be read (e.g. binary audio file).
 * @param isProjectLocal Returns true when a referenced name corresponds to a
 *                       project-local file (i.e. it exists in the project and
 *                       is NOT a bundled standard library resolved by the compiler).
 *
 * Cycle-safe: a file visited more than once is not re-expanded.
 *
 * soundfile("label", n) — the label is treated as a potential filename.
 * The `isProjectLocal` predicate decides if the project actually contains it.
 */
export function computeClosure(
    mainFile: string,
    readText: (name: string) => string | null | undefined,
    isProjectLocal: (name: string) => boolean
): PerimeterResult {
    const visited = new Set<string>();
    const missing: string[] = [];
    const queue: string[] = [mainFile];

    while (queue.length > 0) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const current = queue.shift()!;
        if (visited.has(current)) continue;
        visited.add(current);

        if (!isProjectLocal(current)) {
            // Standard library or unknown — skip without marking missing
            // (stdfaust.lib & co. are resolved by the compiler, not us).
            if (current !== mainFile) continue;
        }

        const text = readText(current);
        if (text == null) {
            // File exists in project but is binary (audio) or unreadable.
            // Already included via visited; refs cannot be extracted from binary.
            continue;
        }

        const refs = extractFileRefs(text);
        refs.forEach((ref) => {
            // Normalise: strip any path prefix — we only track filenames in the
            // flat project namespace (plan §9 decision #3).
            const name = ref.includes("/") ? ref.slice(ref.lastIndexOf("/") + 1) : ref;
            if (!visited.has(name)) {
                if (isProjectLocal(name)) {
                    queue.push(name);
                } else if (name.endsWith(".lib") || name.endsWith(".dsp")) {
                    // A Faust library or DSP not in the project → compiler resolves.
                    // Not missing from the bundle, just not ours.
                } else {
                    // Could be a soundfile label; check isProjectLocal handles it.
                    if (isProjectLocal(name)) queue.push(name);
                    else missing.push(name);
                }
            }
        });
    }

    return {
        files: [...visited].filter(f => isProjectLocal(f)),
        missing
    };
}
