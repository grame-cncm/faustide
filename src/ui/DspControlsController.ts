import type { FileManager } from "../FileManager";
import type { FaustEditorAudioEnv, FaustEditorCompileOptions } from "../runtime/types";

const BUFFER_SIZE_VALUES: FaustEditorCompileOptions["bufferSize"][] = [128, 256, 512, 1024, 2048, 4096];

type DspControlsControllerOptions = {
    compileOptions: FaustEditorCompileOptions;
    audioEnv: FaustEditorAudioEnv;
    fileManager: FileManager;
    supportAudioWorklet: boolean;
    saveEditorParams: () => void;
    runDsp: (code: string) => Promise<{ success: boolean; error?: Error }>;
};

/**
 * Binds high-level DSP controls: run button and AudioWorklet/SP toggle.
 *
 * This controller owns the DOM state for the DSP implementation badge and
 * keeps the buffer-size selector, plot sample count, stored preferences, and
 * optional realtime recompilation synchronized.
 */
export class DspControlsController {
    private readonly compileOptions: FaustEditorCompileOptions;
    private readonly audioEnv: FaustEditorAudioEnv;
    private readonly fileManager: FileManager;
    private readonly supportAudioWorklet: boolean;
    private readonly saveEditorParams: () => void;
    private readonly runDsp: (code: string) => Promise<{ success: boolean; error?: Error }>;

    constructor(options: DspControlsControllerOptions) {
        this.compileOptions = options.compileOptions;
        this.audioEnv = options.audioEnv;
        this.fileManager = options.fileManager;
        this.supportAudioWorklet = options.supportAudioWorklet;
        this.saveEditorParams = options.saveEditorParams;
        this.runDsp = options.runDsp;
    }

    /**
     * Binds the right-panel DSP badge and the run button.
     */
    bind() {
        if (this.supportAudioWorklet) {
            $("#dsp-ui-default").on("click", e => this.toggleWorkletMode(e));
        } else $("#dsp-ui-default").tooltip("disable").css("pointer-events", "none");
        $(".btn-run").prop("disabled", false).on("click", () => this.run());
    }

    /**
     * Applies AudioWorklet or ScriptProcessor mode and keeps dependent controls
     * synchronized.
     *
     * @param nextValue preferred worklet state as requested by UI or startup
     * @param rerun when true, recompiles an active realtime DSP if mode changed
     */
    applyUseWorkletMode(nextValue: boolean, rerun = true) {
        const desired = this.supportAudioWorklet && nextValue;
        const previous = this.compileOptions.useWorklet;
        this.compileOptions.useWorklet = desired;
        const $bufferSelect = $("#select-buffer-size").prop("disabled", !!this.compileOptions.useWorklet);
        const $options = $bufferSelect.children("option");
        $options.eq(0).prop("disabled", !this.compileOptions.useWorklet);
        if (this.compileOptions.useWorklet) $options.eq(0).prop("selected", true);
        else {
            const index = BUFFER_SIZE_VALUES.indexOf(this.compileOptions.bufferSize);
            if (index !== -1) $options.eq(index).prop("selected", true);
        }
        if (desired !== previous) {
            $("#input-plot-samps").change();
            this.saveEditorParams();
            if (rerun && this.compileOptions.realtimeCompile && this.audioEnv.dsp) this.runDsp(this.fileManager.mainCode);
        }
    }

    /**
     * Runs the current DSP and switches to Faust UI when legacy conditions do.
     */
    private async run() {
        const compileResult = await this.runDsp(this.fileManager.mainCode);
        if (!compileResult.success) return;
        if ($("#tab-diagram").hasClass("active") || this.compileOptions.plotMode === "offline") $("#tab-faust-ui").tab("show");
    }

    /**
     * Handles badge clicks, ignoring non-switch states such as "no DSP yet".
     */
    private toggleWorkletMode(e: JQuery.ClickEvent) {
        if (!$(e.currentTarget).hasClass("switch")) return;
        this.applyUseWorkletMode(!this.compileOptions.useWorklet);
        if (!this.compileOptions.realtimeCompile) this.runDsp(this.fileManager.mainCode);
    }
}
