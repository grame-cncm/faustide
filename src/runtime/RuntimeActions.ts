/**
 * The cross-controller action seam (Phase 12.4).
 *
 * A handful of controllers need to trigger "compile and run the current DSP" or
 * "refresh the process diagram" without holding a reference to the controllers
 * that implement those actions (`DspCompileController`, `DiagramController`).
 * Historically these were two loose callbacks threaded through many option
 * objects; this interface gives the seam a single name.
 *
 * It is intentionally tiny and synchronous-to-construct: the composition root
 * builds one `RuntimeActions` value once `DiagramController` exists and the
 * `DspCompileController` slot is reserved, which is what lets the rest of the
 * wiring read as ordered construction.
 */
export interface RuntimeActions {
    /** Compiles and runs the given Faust code, replacing the current DSP node. */
    runDsp(code: string): Promise<{ success: boolean; error?: Error }>;
    /** Regenerates and renders the process diagram for the given code. */
    updateDiagram(code: string): { success: boolean; error?: Error };
}
