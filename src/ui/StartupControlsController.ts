import type { FileManager } from "../FileManager";
import type { FaustEditorAudioEnv, FaustEditorCompileOptions } from "../runtime/types";
import type { DspControlsController } from "./DspControlsController";

type StartupControlsControllerOptions = {
    compileOptions: FaustEditorCompileOptions;
    audioEnv: FaustEditorAudioEnv;
    fileManager: FileManager;
    dspControlsController: DspControlsController;
    updateDiagram: (code: string) => { success: boolean; error?: Error };
};

/**
 * Synchronizes startup-only DOM controls from loaded compile options.
 *
 * URL loading and stored settings may change options before the interface is
 * fully shown. This controller applies the final option values to selects,
 * checkboxes, plot controls, the DSP implementation mode, and the initial
 * realtime diagram request.
 */
export class StartupControlsController {
    private readonly compileOptions: FaustEditorCompileOptions;
    private readonly audioEnv: FaustEditorAudioEnv;
    private readonly fileManager: FileManager;
    private readonly dspControlsController: DspControlsController;
    private readonly updateDiagram: (code: string) => { success: boolean; error?: Error };

    constructor(options: StartupControlsControllerOptions) {
        this.compileOptions = options.compileOptions;
        this.audioEnv = options.audioEnv;
        this.fileManager = options.fileManager;
        this.dspControlsController = options.dspControlsController;
        this.updateDiagram = options.updateDiagram;
    }

    /**
     * Applies stored and URL-derived compile options to the existing controls.
     */
    apply() {
        $("#select-voices").children(`option[value=${this.compileOptions.voices}]`).prop("selected", true);
        $("#select-buffer-size").children(`option[value=${this.compileOptions.bufferSize}]`).prop("selected", true);
        this.dspControlsController.applyUseWorkletMode(this.compileOptions.useWorklet, false);
        $("#select-plot-mode").children(`option[value=${this.compileOptions.plotMode}]`).prop("selected", true).change();
        $("#select-plot-fftsize").children(`option[value=${this.compileOptions.plotFFT}]`).prop("selected", true).change();
        $("#select-plot-fftoverlap").children(`option[value=${this.compileOptions.plotFFTOverlap}]`).prop("selected", true).change();
        $("#input-plot-samps").change();
        $("#check-draw-spectrogram").change();
        $<HTMLInputElement>("#check-realtime-compile")[0].checked = this.compileOptions.realtimeCompile;
        if (this.compileOptions.realtimeCompile && !this.audioEnv.dsp) {
            setTimeout(this.updateDiagram, 0, this.fileManager.mainCode);
        }
    }
}
