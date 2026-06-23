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

    private applyGuiBuilderEnabled(checked: boolean) {
        if (!checked) {
            $("#nav-item-gui-builder").hide();
            $("#iframe-gui-builder").css("visibility", "hidden");
        }
        this.compileOptions.enableGuiBuilder = checked;
        this.saveEditorParams();
    }

    private applyGuiBuilderUrl(value: string) {
        this.compileOptions.guiBuilderUrl = value || "https://mainline.i3s.unice.fr/fausteditorweb/dist/PedalEditor/Front-End/";
        this.saveEditorParams();
    }

    private applyVoices(voices: number) {
        this.compileOptions.voices = voices;
        this.saveEditorParams();
        if (this.compileOptions.realtimeCompile && this.audioEnv.dsp) this.runDsp(this.uiEnv.fileManager.mainCode);
    }

    private applyBufferSize(bufferSize: number) {
        this.compileOptions.bufferSize = bufferSize as FaustEditorCompileOptions["bufferSize"];
        this.saveEditorParams();
        if (this.compileOptions.realtimeCompile && this.audioEnv.dsp) this.runDsp(this.uiEnv.fileManager.mainCode);
    }

    private applyDouble(checked: boolean) {
        this.compileOptions.useDouble = checked;
        this.saveEditorParams();
        if (this.compileOptions.realtimeCompile) {
            if (this.audioEnv.dsp) this.runDsp(this.uiEnv.fileManager.mainCode);
            else this.updateDiagram(this.uiEnv.fileManager.mainCode);
        }
    }

    private applySaveCode(checked: boolean) {
        this.compileOptions.saveCode = checked;
        this.saveEditorParams();
    }

    private applySaveParams(checked: boolean) {
        this.compileOptions.saveParams = checked;
        this.saveEditorParams();
    }

    private applySaveDsp(checked: boolean) {
        this.compileOptions.saveDsp = checked;
        this.saveEditorDspTable();
        this.saveEditorParams();
    }

    private applyRealtimeCompile(checked: boolean) {
        this.compileOptions.realtimeCompile = checked;
        this.saveEditorParams();
        if (!this.compileOptions.realtimeCompile) return;
        const code = this.uiEnv.fileManager.mainCode;
        if (this.audioEnv.dsp) this.runDsp(code);
        else this.updateDiagram(code);
    }

    private applyPopup(checked: boolean) {
        this.compileOptions.popup = checked;
        this.saveEditorParams();
    }
}
