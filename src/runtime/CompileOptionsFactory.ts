import type { FaustEditorCompileOptions } from "./types";

export interface CompileOptionsFactoryOptions {
    projectDir: string;
    supportAudioWorklet: boolean;
    savedOptions?: Partial<FaustEditorCompileOptions> | {};
}

/**
 * Builds the compile options used by the editor runtime.
 *
 * The factory preserves the legacy precedence from `index.ts`: persisted
 * options can override user-facing defaults, while startup-only safety values
 * such as `realtimeCompile` and the Faust include path are recomputed on every
 * boot.
 */
export function createCompileOptions(options: CompileOptionsFactoryOptions): FaustEditorCompileOptions {
    return {
        useWorklet: options.supportAudioWorklet,
        useDouble: false,
        bufferSize: 1024,
        saveCode: true,
        saveParams: false,
        saveDsp: false,
        popup: false,
        voices: 0,
        plotMode: "offline",
        plot: 256,
        plotSR: 48000,
        plotFFT: 256,
        plotFFTOverlap: 2,
        drawSpectrogram: false,
        enableGuiBuilder: false,
        guiBuilderUrl: "https://mainline.i3s.unice.fr/fausteditorweb/dist/PedalEditor/Front-End/",
        exportPlatform: "source",
        exportArch: "cplusplus",
        ...options.savedOptions,
        realtimeCompile: false,
        args: ["-f", "10", "-I", options.projectDir]
    };
}
