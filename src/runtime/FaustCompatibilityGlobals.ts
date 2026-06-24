import type { FaustCompiler } from "@grame/faustwasm";
import type { FaustEditorEnv } from "./types";

export type FaustCompatibilityWindow = Window & typeof globalThis & {
    faustCompiler?: FaustCompiler;
    faustEnv?: FaustEditorEnv;
};

/**
 * Exposes the Faust compiler on `window` for legacy integrations.
 *
 * New runtime code should receive the compiler through explicit dependencies.
 * This bridge is kept for external scripts and browser smoke tests that still
 * verify the historic compatibility surface.
 */
export function exposeFaustCompilerGlobal(
    faustCompiler: FaustCompiler,
    browserWindow: FaustCompatibilityWindow = window as FaustCompatibilityWindow
) {
    browserWindow.faustCompiler = faustCompiler;
}

/**
 * Exposes the editor runtime environment on `window` for legacy integrations.
 *
 * The object remains mutable because existing consumers expect live references
 * to the audio, MIDI, UI, and compile-option environments after startup.
 */
export function exposeFaustEnvironmentGlobal(
    faustEnv: FaustEditorEnv,
    browserWindow: FaustCompatibilityWindow = window as FaustCompatibilityWindow
) {
    browserWindow.faustEnv = faustEnv;
}
