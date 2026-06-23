import type { Recorder } from "../Recorder";
import type { DspRunner } from "../runtime/DspRunner";
import type { FaustEditorAudioEnv, FaustEditorCompileOptions, FaustEditorUIEnv } from "../runtime/types";
import type { AlertController } from "./AlertController";
import type { FaustUiController } from "./FaustUiController";

type DspCompileControllerOptions = {
    audioEnv: FaustEditorAudioEnv;
    uiEnv: FaustEditorUIEnv;
    compileOptions: FaustEditorCompileOptions;
    dspParams: { [path: string]: number };
    recorder: Recorder;
    dspRunner: DspRunner;
    faustUiController: FaustUiController;
    alertController: AlertController;
    initAudioCtx: () => Promise<void>;
    initAnalysersUI: () => void;
    updateDiagram: (code: string) => { success: boolean; error?: Error };
    saveEditorDspTable: () => void;
};

/**
 * Coordinates one DSP compilation run and the UI effects around it.
 *
 * DspRunner owns Faust compilation and audio-node replacement. This controller
 * owns the application workflow around that service: build the declared source,
 * initialize audio prerequisites, feed plotted buffers to scopes/recorder,
 * update diagram scheduling, reveal Faust UI, update GUI Builder, and report
 * failures through the alert controller.
 */
export class DspCompileController {
    private readonly audioEnv: FaustEditorAudioEnv;
    private readonly uiEnv: FaustEditorUIEnv;
    private readonly compileOptions: FaustEditorCompileOptions;
    private readonly dspParams: { [path: string]: number };
    private readonly recorder: Recorder;
    private readonly dspRunner: DspRunner;
    private readonly faustUiController: FaustUiController;
    private readonly alertController: AlertController;
    private readonly initAudioCtx: () => Promise<void>;
    private readonly initAnalysersUI: () => void;
    private readonly updateDiagram: (code: string) => { success: boolean; error?: Error };
    private readonly saveEditorDspTable: () => void;
    private isCompiling = false;

    constructor(options: DspCompileControllerOptions) {
        this.audioEnv = options.audioEnv;
        this.uiEnv = options.uiEnv;
        this.compileOptions = options.compileOptions;
        this.dspParams = options.dspParams;
        this.recorder = options.recorder;
        this.dspRunner = options.dspRunner;
        this.faustUiController = options.faustUiController;
        this.alertController = options.alertController;
        this.initAudioCtx = options.initAudioCtx;
        this.initAnalysersUI = options.initAnalysersUI;
        this.updateDiagram = options.updateDiagram;
        this.saveEditorDspTable = options.saveEditorDspTable;
    }

    /**
     * Compiles the supplied Faust code and applies the resulting DSP node to
     * the editor runtime.
     *
     * @param codeIn raw code from the current main file, without generated declarations
     */
    async run(codeIn: string): Promise<{ success: boolean; error?: Error }> {
        if (this.isCompiling) return { success: false, error: new Error("Another DSP is compiling") };
        this.isCompiling = true;
        const code = this.withDeclarations(codeIn);
        if (!this.audioEnv.audioCtx) {
            await this.initAudioCtx();
            this.initAnalysersUI();
        }
        const compileResult = await this.dspRunner.run({
            code,
            compilerArgs: this.compileOptions.args,
            useDouble: this.compileOptions.useDouble,
            useWorklet: this.compileOptions.useWorklet,
            bufferSize: this.compileOptions.bufferSize,
            voices: this.compileOptions.voices,
            saveParams: this.compileOptions.saveParams,
            dspParams: this.dspParams,
            plotHandler: this.createPlotHandler(),
            onOutputSplitterChanged: (splitter, channelsCount) => {
                this.uiEnv.outputScope.splitter = splitter;
                this.uiEnv.outputScope.channels = channelsCount;
                this.uiEnv.outputScope.channel = Math.min(this.uiEnv.outputScope.channel, channelsCount - 1);
                splitter.connect(this.audioEnv.analyserOutput, this.uiEnv.outputScope.channel);
            }
        });
        if (!compileResult.success || !compileResult.node) {
            this.alertController.show(compileResult.error);
            this.isCompiling = false;
            return { success: false, error: compileResult.error };
        }
        if ($("#tab-diagram").hasClass("active")) setTimeout(this.updateDiagram, 0, code);
        $("#tab-diagram").off("show.bs.tab").one("show.bs.tab", () => this.updateDiagram(code));
        this.alertController.clear();
        this.faustUiController.showCompiledDsp(compileResult.node);
        this.saveEditorDspTable();
        this.updateGuiBuilder(compileResult.node);
        this.isCompiling = false;
        return { success: true };
    }

    /**
     * Prefixes user code with the declarations required by downstream Faust UI
     * and export flows.
     */
    private withDeclarations(codeIn: string) {
        return `declare filename "${this.uiEnv.fileManager.mainFileName}"; declare name "${this.uiEnv.fileManager.mainFileNameWithoutSuffix}"; ${codeIn}`;
    }

    /**
     * Builds the plotted-buffer callback passed to DspRunner.
     *
     * It keeps plot scopes updated and appends recorder data while throttling
     * the visible media duration label to avoid excessive layout work.
     */
    private createPlotHandler() {
        let mediaLengthRaf: number;
        let mediaLengthFrame = 0;
        const mediaLengthSpan = $<HTMLSpanElement>("#recorder-time")[0];
        const mediaLengthDisplay = (t: number) => {
            mediaLengthFrame++;
            if (mediaLengthFrame % 3 !== 0) {
                if (mediaLengthRaf) cancelAnimationFrame(mediaLengthRaf);
                mediaLengthRaf = requestAnimationFrame(() => mediaLengthDisplay(t));
            }
            const d = new Date(t * 1000);
            const min = d.getMinutes();
            const sec = `0${d.getSeconds()}`.slice(-2);
            const ms = `00${d.getMilliseconds()}`.slice(-3);
            mediaLengthSpan.innerText = `${min}:${sec}.${ms}`;
        };
        return (plotted: Float32Array[], index: number, events?: { type: string; data: any }[]) => {
            this.uiEnv.analyser.plotHandler(plotted, index, events);
            if (!this.recorder.enabled) return;
            const t = this.recorder.append(plotted, index);
            if (mediaLengthRaf) cancelAnimationFrame(mediaLengthRaf);
            mediaLengthRaf = requestAnimationFrame(() => mediaLengthDisplay(t));
        };
    }

    /**
     * Sends the current DSP UI and source code to the optional GUI Builder tab.
     */
    private updateGuiBuilder(node: { getUI: () => unknown }) {
        if (!this.compileOptions.enableGuiBuilder) return;
        $("#gui-builder-default").hide();
        $("#nav-item-gui-builder").show();
        $("#iframe-gui-builder").css("visibility", "visible");
        const guiBuilder = $<HTMLIFrameElement>("#iframe-gui-builder")[0];
        guiBuilder.src = "";
        guiBuilder.onload = () => {
            guiBuilder.src = `${this.compileOptions.guiBuilderUrl}?name=${this.uiEnv.fileManager.mainFileName}`;
            guiBuilder.onload = () => guiBuilder.contentWindow.postMessage({
                type: "build",
                ui: node.getUI(),
                name: `${this.uiEnv.fileManager.mainFileName}`,
                code: this.uiEnv.fileManager.mainCode,
                poly: !!this.compileOptions.voices
            }, "*");
        };
    }
}
