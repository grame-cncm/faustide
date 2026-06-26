/**
 * Session-scoped origin for the currently open document.
 *
 * "Origin" = the (volumeId, path) pair that Save rewrites.  It is held in
 * session state — not on the document record — because content-addressed
 * backends (faustservice SHA, inline= share URL) yield a *new* identity on
 * every edit, so the origin cannot survive across sessions or Open/New actions.
 *
 * Rule (plan §2): origin is reset on every Open / New action, and is never
 * persisted to localStorage or IndexedDB.
 */
export interface Origin {
    /** Volume id (e.g. "library", "disk:<uuid>"). */
    volumeId: string;
    /** Path relative to the volume root (filename in the flat Library). */
    path: string;
}

/** Singleton session state tracking the current document's origin. */
export class OriginState {
    private current: Origin | null = null;

    /** Set the origin for the currently open document. */
    set(origin: Origin): void {
        this.current = origin;
    }

    /** Return the current origin, or null if no document is open / origin is unknown. */
    get(): Origin | null {
        return this.current;
    }

    /** Clear the origin.  Call on New / Open so Save does not write to a stale location. */
    reset(): void {
        this.current = null;
    }
}
