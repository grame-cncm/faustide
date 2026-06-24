import type { FaustCompiler } from "@grame/faustwasm";
import { FaustMonoDspGenerator } from "@grame/faustwasm";
import type { DspRunner } from "../runtime/DspRunner";
import type { FaustEditorAudioEnv, FaustEditorCompileOptions, FaustEditorUIEnv } from "../runtime/types";

type PlotControllerOptions = {
    compileOptions: FaustEditorCompileOptions;
    audioEnv: FaustEditorAudioEnv;
    uiEnv: FaustEditorUIEnv;
    faustCompiler: FaustCompiler;
    dspRunner: DspRunner;
    getMainCode: () => string;
    runDsp: (code: string) => Promise<{ success: boolean; error?: Error }>;
    saveEditorParams: () => void;
};

/**
 * Binds plot controls and offline plot rendering.
 *
 * The controller owns DOM state for the plot panel, but delegates DSP runtime
 * execution and soundfile loading to existing services.
 */
export class PlotController {
    private readonly compileOptions: FaustEditorCompileOptions;
    private readonly audioEnv: FaustEditorAudioEnv;
    private readonly uiEnv: FaustEditorUIEnv;
    private readonly faustCompiler: FaustCompiler;
    private readonly dspRunner: DspRunner;
    private readonly getMainCode: () => string;
    private readonly runDsp: (code: string) => Promise<{ success: boolean; error?: Error }>;
    private readonly saveEditorParams: () => void;

    constructor(options: PlotControllerOptions) {
        this.compileOptions = options.compileOptions;
        this.audioEnv = options.audioEnv;
        this.uiEnv = options.uiEnv;
        this.faustCompiler = options.faustCompiler;
        this.dspRunner = options.dspRunner;
        this.getMainCode = options.getMainCode;
        this.runDsp = options.runDsp;
        this.saveEditorParams = options.saveEditorParams;
    }

    /**
     * Wires the plot panel controls (mode, plot button, sample count, sample
     * rate, FFT size/overlap, spectrogram) and seeds them from the current
     * compile options.
     */
    bind() {
        $<HTMLInputElement>("#select-plot-mode").on("change", e => this.applyPlotMode(e.currentTarget.value as FaustEditorCompileOptions["plotMode"]));
        $("#btn-plot").on("click", () => this.plot());
        $("#tab-plot-ui").on("shown.bs.tab", () => this.uiEnv.plotScope.draw());
        $<HTMLInputElement>("#input-plot-samps").on("change", e => this.applySampleCount(e.currentTarget));
        $<HTMLInputElement>("#input-plot-sr").on("change", e => {
            this.compileOptions.plotSR = +e.currentTarget.value;
            this.saveEditorParams();
        })[0].value = this.compileOptions.plotSR.toString();
        $<HTMLInputElement>("#check-draw-spectrogram").on("change", e => this.applySpectrogram(e.currentTarget.checked))[0].checked = this.compileOptions.drawSpectrogram;
        $<HTMLInputElement>("#select-plot-fftsize").on("change", e => {
            this.compileOptions.plotFFT = +e.currentTarget.value as FaustEditorCompileOptions["plotFFT"];
            this.uiEnv.analyser.fftSize = this.compileOptions.plotFFT;
            $("#input-plot-samps").change();
            this.saveEditorParams();
        });
        $<HTMLInputElement>("#select-plot-fftoverlap").on("change", e => {
            this.compileOptions.plotFFTOverlap = +e.currentTarget.value as FaustEditorCompileOptions["plotFFTOverlap"];
            this.uiEnv.analyser.fftOverlap = this.compileOptions.plotFFTOverlap;
            this.saveEditorParams();
        });
        $<HTMLInputElement>("#input-plot-samps")[0].value = this.compileOptions.plot.toString();
    }

    /**
     * Applies a plot mode, updating the analyser draw mode, the plot button
     * label/visibility, and whether the sample-rate field is editable (only the
     * offline mode lets the user choose a rate; live modes track the AudioContext).
     */
    private applyPlotMode(plotMode: FaustEditorCompileOptions["plotMode"]) {
        this.compileOptions.plotMode = plotMode;
        this.uiEnv.analyser.drawMode = this.compileOptions.plotMode;
        const $span = $("#btn-plot").children("span");
        if (this.compileOptions.plotMode === "offline") {
            $("#btn-plot").show();
            $span.text("Plot First Samples");
        } else if (this.compileOptions.plotMode === "manual") {
            $("#btn-plot").show();
            $span.text("Plot (Snapshot)");
        } else $("#btn-plot").hide();
        if (this.compileOptions.plotMode === "continuous") this.uiEnv.plotScope.mode = 2;
        const $plotSR = $<HTMLInputElement>("#input-plot-sr");
        if (this.compileOptions.plotMode === "offline") $plotSR.prop("disabled", false)[0].value = this.compileOptions.plotSR.toString();
        else $plotSR.prop("disabled", true)[0].value = this.audioEnv.audioCtx ? this.audioEnv.audioCtx.sampleRate.toString() : "48000";
        this.saveEditorParams();
    }

    /**
     * Handles the plot button: renders offline samples in offline mode, redraws
     * the analyser if a DSP is already running, otherwise compiles and runs the
     * main code to start producing data.
     */
    private async plot() {
        if (this.compileOptions.plotMode === "offline") {
            await this.plotOffline();
        } else if (this.audioEnv.dsp) this.uiEnv.analyser.draw();
        else await this.runDsp(this.getMainCode());
    }

    /**
     * Compiles the main code, renders the first N samples through an
     * OfflineAudioContext (loading any required soundfiles first), and feeds the
     * result to the analyser plot handler.
     */
    private async plotOffline() {
        const code = this.getMainCode();
        const { plot, plotSR, useDouble } = this.compileOptions;
        const args = this.compileOptions.args.slice();
        if (useDouble) args.push("-double");
        const generator = new FaustMonoDspGenerator();
        await generator.compile(this.faustCompiler, "main", code, args.join(" "));
        const soundfileList = generator.getSoundfileList();
        const offlineCtx = new OfflineAudioContext({ sampleRate: plotSR, length: 1 });
        const soundfiles = await this.dspRunner.loadSoundfiles(offlineCtx, soundfileList);
        generator.addSoundfiles(soundfiles);
        const processor = await generator.createOfflineProcessor(plotSR, 128, undefined, offlineCtx);
        const output = processor.render([], plot);
        this.uiEnv.analyser.plotHandler(output, 0, undefined, true);
        if (!$("#tab-plot-ui").hasClass("active")) $("#tab-plot-ui").tab("show");
    }

    /**
     * Snaps the requested sample count to a multiple of the step (the larger of
     * the buffer size and FFT size), updates the analyser buffer count, and
     * persists the value. Stepping down keeps the lower multiple.
     */
    private applySampleCount(input: HTMLInputElement) {
        const v = +input.value;
        const bufferSize = (this.compileOptions.useWorklet ? 128 : this.compileOptions.bufferSize);
        const fftSize = this.compileOptions.plotFFT || 256;
        const step = Math.max(bufferSize, fftSize);
        const v1 = Math.max((v === this.compileOptions.plot - +input.step ? Math.floor(v / step) : Math.ceil(v / step)) * step, step);
        this.compileOptions.plot = v1;
        this.uiEnv.analyser.buffers = v1 / bufferSize;
        input.step = step.toString();
        input.value = v1.toString();
        this.saveEditorParams();
    }

    /** Toggles spectrogram rendering across the plot, input, and output scopes. */
    private applySpectrogram(checked: boolean) {
        this.compileOptions.drawSpectrogram = checked;
        this.uiEnv.plotScope.drawSpectrogram = this.compileOptions.drawSpectrogram;
        this.uiEnv.inputScope.drawSpectrogram = this.compileOptions.drawSpectrogram;
        this.uiEnv.outputScope.drawSpectrogram = this.compileOptions.drawSpectrogram;
        this.saveEditorParams();
    }
}
