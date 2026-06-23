import type { FaustCompiler, FaustAudioWorkletNode, FaustScriptProcessorNode } from "@grame/faustwasm";
import type { FileManager } from "../FileManager";
import type { ExportService } from "../runtime/ExportService";
import type { FaustEditorAudioEnv, FaustEditorCompileOptions, FaustEditorUIEnv } from "../runtime/types";
import type { MidiController } from "./MidiController";

type DspNode = FaustAudioWorkletNode | FaustScriptProcessorNode;

type FaustUiControllerOptions = {
    audioEnv: FaustEditorAudioEnv;
    uiEnv: FaustEditorUIEnv;
    compileOptions: FaustEditorCompileOptions;
    fileManager: FileManager;
    dspParams: { [path: string]: number };
    faustCompiler: FaustCompiler;
    exportService: ExportService;
    getServer: () => string;
    getMidiController: () => MidiController | undefined;
    saveDspParams: () => void;
};

/**
 * Binds Faust UI iframe/popup messaging and DSP UI lifecycle controls.
 *
 * Compilation stays in DspRunner and the composition root. This controller owns
 * the DOM and cross-window protocol around compiled DSP nodes: parameter
 * mirroring, keyboard MIDI forwarding, GUI Builder exports, popup creation,
 * tab close teardown, and DSP metadata badge refresh.
 */
export class FaustUiController {
    private readonly audioEnv: FaustEditorAudioEnv;
    private readonly uiEnv: FaustEditorUIEnv;
    private readonly compileOptions: FaustEditorCompileOptions;
    private readonly fileManager: FileManager;
    private readonly dspParams: { [path: string]: number };
    private readonly faustCompiler: FaustCompiler;
    private readonly exportService: ExportService;
    private readonly getServer: () => string;
    private readonly getMidiController: () => MidiController | undefined;
    private readonly saveDspParams: () => void;

    constructor(options: FaustUiControllerOptions) {
        this.audioEnv = options.audioEnv;
        this.uiEnv = options.uiEnv;
        this.compileOptions = options.compileOptions;
        this.fileManager = options.fileManager;
        this.dspParams = options.dspParams;
        this.faustCompiler = options.faustCompiler;
        this.exportService = options.exportService;
        this.getServer = options.getServer;
        this.getMidiController = options.getMidiController;
        this.saveDspParams = options.saveDspParams;
    }

    /**
     * Binds window messages, popup lifecycle, and the close-tab control.
     */
    bind() {
        $(window).on("message", e => this.handleMessage(e.originalEvent as MessageEvent));
        $(window).on("beforeunload", () => (this.uiEnv.uiPopup ? this.uiEnv.uiPopup.close() : undefined));
        $("#nav-item-faust-ui .btn-popup").on("click", e => this.openPopup(e));
        $("#nav-item-faust-ui .btn-close-tab").on("click", e => this.closeDspTab(e));
    }

    /**
     * Wires a freshly compiled DSP node to the iframe/popup UI and reveals the
     * output UI panels.
     */
    showCompiledDsp(node: DspNode) {
        const uiWindow = this.uiWindow();
        node.setOutputParamHandler((path: string, value: number) => {
            const msg = { path, value, type: "param" };
            if (uiWindow) uiWindow.postMessage(msg, "*");
            if (this.uiEnv.uiPopup) this.uiEnv.uiPopup.postMessage(msg, "*");
        });
        this.bindNodeUi(node, uiWindow);
        $("#faust-ui-default").hide();
        $("#nav-item-faust-ui").show();
        $("#iframe-faust-ui").css("visibility", "visible");
        $("#output-analyser-ui").show();
        if (this.uiEnv.outputScope) this.uiEnv.outputScope.disabled = false;
        this.refreshDspUI(node);
    }

    /**
     * Updates the right-panel DSP metadata badge.
     */
    refreshDspUI(node?: DspNode) {
        if (!node) {
            $("#dsp-ui-detail").hide();
            $("#dsp-ui-default").removeClass(["badge-success", "switch"]).addClass("badge-warning").html("no DSP yet");
            return;
        }
        $("#dsp-ui-detail").show();
        if (typeof ScriptProcessorNode !== "undefined" && node instanceof ScriptProcessorNode) {
            $("#dsp-ui-default").removeClass("badge-success").addClass(["badge-warning", "switch"]).html("ScriptProcessor");
        } else {
            $("#dsp-ui-default").removeClass("badge-warning").addClass(["badge-success", "switch"]).html("AudioWorklet");
        }
        $("#dsp-ui-detail-inputs").html(node.getNumInputs().toString());
        $("#dsp-ui-detail-outputs").html(node.getNumOutputs().toString());
        $("#dsp-ui-detail-params").html(node.getParams().length.toString());
    }

    /**
     * Sends the DSP UI JSON and optionally saved parameter values to active UI
     * windows.
     */
    private bindNodeUi(node: DspNode, uiWindow: Window | null) {
        const callback = () => {
            const msg = { type: "ui", ui: node.getUI() };
            if (uiWindow) uiWindow.postMessage(msg, "*");
            if (this.uiEnv.uiPopup) this.uiEnv.uiPopup.postMessage(msg, "*");
            if (this.compileOptions.saveParams) this.postCurrentParams(node, uiWindow);
        };
        if (!this.compileOptions.popup || (this.uiEnv.uiPopup && !this.uiEnv.uiPopup.closed)) callback();
        else this.openPopupWindow(callback);
    }

    /**
     * Applies incoming iframe/popup messages to DSP params, MIDI keys, or GUI
     * Builder export flow.
     */
    private handleMessage(message: MessageEvent) {
        if (!message.data || !message.data.type) return;
        const { data, source } = message;
        if (data.type === "param") {
            this.applyParamMessage(data, source);
            return;
        }
        if (data.type === "keydown") this.getMidiController()?.handleKeyDown(data.key);
        else if (data.type === "keyup") this.getMidiController()?.handleKeyUp(data.key);
        else if (data.type === "export") {
            void this.exportFromGuiBuilder(data, source as WindowProxy);
        }
    }

    /**
     * Mirrors a param message to the DSP, saved params, iframe, and popup.
     */
    private applyParamMessage(data: { path: string; value: number }, source: MessageEventSource | null) {
        if (this.audioEnv.dsp) this.audioEnv.dsp.setParamValue(data.path, +data.value);
        this.dspParams[data.path] = +data.value;
        if (this.compileOptions.saveParams) this.saveDspParams();
        const uiWindow = this.uiWindow();
        const msg = { path: data.path, value: +data.value, type: "param" };
        if (uiWindow && uiWindow !== source) uiWindow.postMessage(msg, "*");
        if (this.uiEnv.uiPopup && this.uiEnv.uiPopup !== source) this.uiEnv.uiPopup.postMessage(msg, "*");
    }

    /**
     * Handles GUI Builder's export request by expanding DSP code and uploading
     * a single source file through ExportService.
     */
    private async exportFromGuiBuilder(data: { plat?: string; arch?: string }, source: WindowProxy) {
        const fileName = this.fileManager.mainFileName;
        const name = this.fileManager.mainFileNameWithoutSuffix;
        const platform = data.plat || "web";
        const arch = data.arch || "wap";
        const expandedCode = this.faustCompiler.expandDSP(this.fileManager.mainCode, this.compileOptions.args.join(" "));
        const file = this.exportService.buildSourceFile({ fileName, name, code: expandedCode });
        const { href } = await this.exportService.uploadAndPrecompile({
            server: this.getServer(),
            file,
            platform,
            arch,
            chaosStratusInstallerForAnyArch: true
        });
        source.postMessage({ type: "exported", href }, "*");
    }

    /**
     * Opens or refreshes the external Faust UI popup for the current DSP node.
     */
    private openPopup(e: JQuery.ClickEvent) {
        e.stopPropagation();
        e.preventDefault();
        const node = this.audioEnv.dsp as DspNode;
        if (!node) return;
        const callback = () => {
            if (this.uiEnv.uiPopup) this.uiEnv.uiPopup.postMessage({ type: "ui", ui: node.getUI() }, "*");
            this.postCurrentParams(node, this.uiEnv.uiPopup);
        };
        if (this.uiEnv.uiPopup && !this.uiEnv.uiPopup.closed) callback();
        else this.openPopupWindow(callback);
    }

    /**
     * Tears down the current DSP node and restores the no-DSP UI state.
     */
    private closeDspTab(e: JQuery.ClickEvent) {
        e.stopPropagation();
        e.preventDefault();
        if (this.audioEnv.dsp) {
            const gain = this.audioEnv.gainInput;
            const dsp = this.audioEnv.dsp;
            if (this.audioEnv.dspConnectedToInput) {
                gain.disconnect(dsp);
                this.audioEnv.dspConnectedToInput = false;
            }
            dsp.disconnect();
            this.audioEnv.dspConnectedToOutput = false;
            dsp.destroy();
            delete this.audioEnv.dsp;
        }
        if ($("#tab-faust-ui").hasClass("active")) $("#tab-diagram").tab("show");
        $("#nav-item-faust-ui").hide();
        if (this.uiEnv.uiPopup) this.uiEnv.uiPopup.close();
        $("#faust-ui-default").show();
        $("#iframe-faust-ui").css("visibility", "hidden");
        $("#output-analyser-ui").hide();
        if (this.uiEnv.outputScope) this.uiEnv.outputScope.disabled = true;
        this.refreshDspUI();
    }

    /**
     * Posts all stored param values that still exist on the current DSP node.
     */
    private postCurrentParams(node: DspNode, target?: Window | WindowProxy) {
        if (!target) return;
        const params = node.getParams();
        for (const path in this.dspParams) {
            if (params.indexOf(path) !== -1) {
                target.postMessage({ path, value: this.dspParams[path], type: "param" }, "*");
            }
        }
    }

    /**
     * Opens the external Faust UI window and runs the callback on load.
     */
    private openPopupWindow(callback: () => void) {
        this.uiEnv.uiPopup = window.open("faust-ui/index.html", "Faust DSP", "directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=800,height=600");
        if (!this.uiEnv.uiPopup) return;
        this.uiEnv.uiPopup.onload = callback;
    }

    /**
     * Returns the Faust UI iframe content window.
     */
    private uiWindow(): Window | null {
        return $<HTMLIFrameElement>("#iframe-faust-ui")[0]?.contentWindow ?? null;
    }
}
