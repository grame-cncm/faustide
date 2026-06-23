import type { FaustEditorAudioEnv, FaustEditorCompileOptions, FaustEditorUIEnv } from "../runtime/types";

type SettingsPanelControllerOptions = {
    compileOptions: FaustEditorCompileOptions;
    audioEnv: FaustEditorAudioEnv;
    uiEnv: FaustEditorUIEnv;
    saveEditorParams: () => void;
    saveEditorDspTable: () => void;
    loadEditorDspTable: () => Promise<void>;
    runDsp: (code: string) => Promise<{ success: boolean; error?: Error }>;
    updateDiagram: (code: string) => { success: boolean; error?: Error };
};

/**
 * Binds the settings controls that mutate compile and persistence options.
 *
 * The controller keeps option form state in sync with `compileOptions` and
 * delegates recompilation, diagram updates, and persistence to injected
 * runtime callbacks.
 */
export class SettingsPanelController {
    private readonly compileOptions: FaustEditorCompileOptions;
    private readonly audioEnv: FaustEditorAudioEnv;
    private readonly uiEnv: FaustEditorUIEnv;
    private readonly saveEditorParams: () => void;
    private readonly saveEditorDspTable: () => void;
    private readonly loadEditorDspTable: () => Promise<void>;
    private readonly runDsp: (code: string) => Promise<{ success: boolean; error?: Error }>;
    private readonly updateDiagram: (code: string) => { success: boolean; error?: Error };

    constructor(options: SettingsPanelControllerOptions) {
        this.compileOptions = options.compileOptions;
        this.audioEnv = options.audioEnv;
        this.uiEnv = options.uiEnv;
        this.saveEditorParams = options.saveEditorParams;
        this.saveEditorDspTable = options.saveEditorDspTable;
        this.loadEditorDspTable = options.loadEditorDspTable;
        this.runDsp = options.runDsp;
        this.updateDiagram = options.updateDiagram;
    }

    /**
     * Initializes form state from compileOptions and binds setting changes.
     */
    bind() {
        $<HTMLInputElement>("#enable-gui-editor").on("change", e => this.applyGuiBuilderEnabled(e.currentTarget.checked))[0].checked = this.compileOptions.enableGuiBuilder;
        $<HTMLInputElement>("#gui-builder-url")
            .val(this.compileOptions.guiBuilderUrl)
            .on("change", e => this.applyGuiBuilderUrl(e.currentTarget.value));
        $<HTMLSelectElement>("#select-voices").on("change", e => this.applyVoices(+e.currentTarget.value));
        $<HTMLSelectElement>("#select-buffer-size").on("change", e => this.applyBufferSize(+e.currentTarget.value));
        $<HTMLInputElement>("#check-double").on("change", e => this.applyDouble(e.currentTarget.checked))[0].checked = this.compileOptions.useDouble;
        $<HTMLInputElement>("#check-save-code").on("change", e => this.applySaveCode(e.currentTarget.checked))[0].checked = this.compileOptions.saveCode;
        $<HTMLInputElement>("#check-save-params").on("change", e => this.applySaveParams(e.currentTarget.checked))[0].checked = this.compileOptions.saveParams;
        $<HTMLInputElement>("#check-save-dsp").on("change", e => this.applySaveDsp(e.currentTarget.checked))[0].checked = this.compileOptions.saveDsp;
        if (this.compileOptions.saveDsp) this.loadEditorDspTable();
        $<HTMLInputElement>("#check-realtime-compile").on("change", e => this.applyRealtimeCompile(e.currentTarget.checked));
        $<HTMLInputElement>("#check-popup").on("change", e => this.applyPopup(e.currentTarget.checked))[0].checked = this.compileOptions.popup;
    }

    /**
     * Enables or hides GUI Builder integration.
     */
    private applyGuiBuilderEnabled(checked: boolean) {
        if (!checked) {
            $("#nav-item-gui-builder").hide();
            $("#iframe-gui-builder").css("visibility", "hidden");
        }
        this.compileOptions.enableGuiBuilder = checked;
        this.saveEditorParams();
    }

    /**
     * Stores a custom GUI Builder URL or restores the legacy default.
     */
    private applyGuiBuilderUrl(value: string) {
        this.compileOptions.guiBuilderUrl = value || "https://mainline.i3s.unice.fr/fausteditorweb/dist/PedalEditor/Front-End/";
        this.saveEditorParams();
    }

    /**
     * Updates polyphony and recompiles when realtime DSP is active.
     */
    private applyVoices(voices: number) {
        this.compileOptions.voices = voices;
        this.saveEditorParams();
        if (this.compileOptions.realtimeCompile && this.audioEnv.dsp) this.runDsp(this.uiEnv.fileManager.mainCode);
    }

    /**
     * Updates ScriptProcessor buffer size and recompiles when needed.
     */
    private applyBufferSize(bufferSize: number) {
        this.compileOptions.bufferSize = bufferSize as FaustEditorCompileOptions["bufferSize"];
        this.saveEditorParams();
        if (this.compileOptions.realtimeCompile && this.audioEnv.dsp) this.runDsp(this.uiEnv.fileManager.mainCode);
    }

    /**
     * Toggles double precision and refreshes the current DSP or diagram.
     */
    private applyDouble(checked: boolean) {
        this.compileOptions.useDouble = checked;
        this.saveEditorParams();
        if (this.compileOptions.realtimeCompile) {
            if (this.audioEnv.dsp) this.runDsp(this.uiEnv.fileManager.mainCode);
            else this.updateDiagram(this.uiEnv.fileManager.mainCode);
        }
    }

    /**
     * Persists whether project source files should be stored locally.
     */
    private applySaveCode(checked: boolean) {
        this.compileOptions.saveCode = checked;
        this.saveEditorParams();
    }

    /**
     * Persists whether DSP parameter values should be restored.
     */
    private applySaveParams(checked: boolean) {
        this.compileOptions.saveParams = checked;
        this.saveEditorParams();
    }

    /**
     * Persists DSP factory cache preference and writes the current cache.
     */
    private applySaveDsp(checked: boolean) {
        this.compileOptions.saveDsp = checked;
        this.saveEditorDspTable();
        this.saveEditorParams();
    }

    /**
     * Toggles realtime compile and immediately refreshes the current output.
     */
    private applyRealtimeCompile(checked: boolean) {
        this.compileOptions.realtimeCompile = checked;
        this.saveEditorParams();
        if (!this.compileOptions.realtimeCompile) return;
        const code = this.uiEnv.fileManager.mainCode;
        if (this.audioEnv.dsp) this.runDsp(code);
        else this.updateDiagram(code);
    }

    /**
     * Persists whether Faust UI should open in an external popup.
     */
    private applyPopup(checked: boolean) {
        this.compileOptions.popup = checked;
        this.saveEditorParams();
    }
}
