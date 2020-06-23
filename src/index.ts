/* eslint-disable newline-per-chained-call */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-use-before-define */
// TODO
// webworkerify
// bargraph in scopes
// init params with getNode
// popup plot => too heavy drawing
// bypass
// shared buffer
// PWA
// link params with export
// snippets
// indexDB

import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import webmidi, { Input, WebMidiEventConnected, WebMidiEventDisconnected } from "webmidi";
import * as QRCode from "qrcode";
import * as WaveSurfer from "wavesurfer.js";
import * as JSZip from "jszip";
import { FaustScriptProcessorNode, FaustAudioWorkletNode, Faust } from "faust2webaudio";
import { Key2Midi } from "./Key2Midi";
import { Scope } from "./Scope";
import "bootstrap/js/dist/dropdown";
import "bootstrap/js/dist/tab";
import "bootstrap/js/dist/tooltip";
import "bootstrap/js/dist/modal";
import "@fortawesome/fontawesome-free/css/all.css";
import "bootstrap/scss/bootstrap.scss";
import "./index.scss";
import { StaticScope } from "./StaticScope";
import { Analyser } from "./Analyser";
import { FileManager } from "./FileManager";
import { GainUI, createMeterNode, MeterNode } from "./MeterNode";
import { Recorder } from "./Recorder";
import { faustLangRegister } from "./monaco-faust/register";
import VERSION from "./version";

declare global {
    interface Window {
        AudioContext: typeof AudioContext;
        webkitAudioContext: typeof AudioContext;
        AudioWorklet?: typeof AudioWorklet; // eslint-disable-line no-undef
        faustEnv: FaustEditorEnv;
        faust: Faust;
    }
    interface HTMLMediaElement extends HTMLElement {
        setSinkId?(sinkId: string): Promise<undefined>;
        src: string;
    }
}
type FaustEditorEnv = {
    audioEnv: FaustEditorAudioEnv;
    midiEnv: FaustEditorMIDIEnv;
    uiEnv: FaustEditorUIEnv;
    compileOptions: FaustEditorCompileOptions;
    editor: monaco.editor.IStandaloneCodeEditor;
    jQuery: JQueryStatic;
    faust: Faust;
    recorder: Recorder;
};
type FaustEditorAudioEnv = {
    audioCtx?: AudioContext;
    meterInput?: MeterNode;
    gainInput?: GainNode;
    gainUIInput?: GainUI;
    splitterInput?: ChannelSplitterNode;
    analyserInput?: AnalyserNode;
    splitterOutput?: ChannelSplitterNode;
    analyserOutput?: AnalyserNode;
    inputs?: { [deviceId: string]: MediaStreamAudioSourceNode | MediaElementAudioSourceNode };
    currentInput?: string;
    destination?: MediaStreamAudioDestinationNode | AudioDestinationNode;
    dsp?: FaustScriptProcessorNode | FaustAudioWorkletNode;
    dspConnectedToOutput: boolean;
    dspConnectedToInput: boolean;
    inputEnabled: boolean;
    outputEnabled: boolean;
};
type FaustEditorMIDIEnv = {
    input: Input;
};
type FaustEditorUIEnv = {
    analysersInited: boolean;
    inputScope: Scope;
    outputScope: Scope;
    plotScope: StaticScope;
    uiPopup?: Window;
    analyser: Analyser;
    fileManager: FileManager;
};
type FaustExportTargets = { [platform: string]: string[] };
interface LegacyWaveSurferBackend extends WaveSurfer.WaveSurferBackend {
    buffer: AudioBuffer;
}

const supportAudioWorklet = !!window.AudioWorklet;
let supportMediaStreamDestination = !!(window.AudioContext || window.webkitAudioContext).prototype.createMediaStreamDestination && !!HTMLAudioElement.prototype.setSinkId;

$(async () => {
    /**
     * Async Load Faust Core
     * Use import() for webpack code splitting, needs babel-dynamic-import
     */
    const { Faust } = await import("faust2webaudio");
    const faust = new Faust({ wasmLocation: "./libfaust-wasm.wasm", dataLocation: "./libfaust-wasm.data" });
    await faust.ready;
    const faustPrimitiveLibFile = await fetch("./primitives.lib");
    const faustPrimitiveLib = await faustPrimitiveLibFile.text();
    faust.fs.writeFile("./libraries/primitives.lib", faustPrimitiveLib);
    window.faust = faust;
    /**
     * To save dsp table to localStorage
     */
    const saveEditorDspTable = () => {
        localStorage.setItem("faust_editor_dsp_table", faust.stringifyDspTable());
    };
    /**
     * To load dsp table from localStorage
     */
    const loadEditorDspTable = () => {
        const str = localStorage.getItem("faust_editor_dsp_table");
        if (str) faust.parseDspTable(str);
    };
    /**
     * To save editor params to localStorage
     */
    const saveEditorParams = () => {
        const str = JSON.stringify(compileOptions);
        localStorage.setItem("faust_editor_params", str);
    };
    /**
     * To load editor params from localStorage
     *
     * @returns {(FaustEditorCompileOptions | {})}
     */
    const loadEditorParams = (): FaustEditorCompileOptions | {} => {
        const clientVersion = localStorage.getItem("faust_editor_version");
        if (clientVersion !== VERSION) return {};
        const str = localStorage.getItem("faust_editor_params");
        if (!str) return {};
        try {
            return JSON.parse(str) as FaustEditorCompileOptions;
        } catch (e) {
            return {};
        }
    };
    /**
     * To load dsp params from localStorage
     *
     * @returns {{ [path: string]: number }}
     */
    const loadDspParams = (): { [path: string]: number } => {
        const str = localStorage.getItem("faust_editor_dsp_params");
        if (!str) return {};
        try {
            return JSON.parse(str) as { [path: string]: number };
        } catch (e) {
            return {};
        }
    };
    /**
     * To save dsp params to localStorage
     */
    const saveDspParams = () => {
        const str = JSON.stringify(dspParams);
        localStorage.setItem("faust_editor_dsp_params", str);
    };
    const dspParams = loadDspParams();
    /**
     * Load all files to Emscripten File System from localStorage
     *
     */
    const loadProject = () => {
        faust.fs.mkdir("project");
        let project: { [name: string]: string };
        try {
            project = JSON.parse(localStorage.getItem("faust_editor_project")) || {};
        } catch (e) {
            project = {};
        }
        for (const fileName in project) {
            faust.fs.writeFile("project/" + fileName, project[fileName]);
        }
    };
    /**
     * To show Error at bottom of center
     *
     * @param {string} e
     */
    const showError = (e: Error | string) => {
        $(".alert-faust-code>span").text(e instanceof Error ? e.message : e);
        $("#alert-faust-code").css("visibility", "visible");
    };
    /**
     * Hide error display
     *
     */
    const clearError = () => $("#alert-faust-code").css("visibility", "hidden");
    /**
     * Async Load Monaco Editor Core
     * Use import() for webpack code splitting, needs babel-dynamic-import
     */
    const { editor, monaco } = await initEditor(faust);
    editor.layout(); // Force editor to fill div
    // Editor and Diagram
    let editorDecoration: string[] = []; // lines with error
    /**
     * Generate diagram and insert the svg into diagram container
     *
     * @param {string} code
     * @returns {{ success: boolean; error?: Error }}
     */
    const updateDiagram = (code: string): { success: boolean; error?: Error } => {
        let strSvg: string; // Diagram SVG as string
        editorDecoration = editor.deltaDecorations(editorDecoration, []);
        try {
            strSvg = faust.getDiagram(code, compileOptions.args);
        } catch (e) {
            /**
             * Parse Faust-generated error message to locate the lines with error
             */
            const matchLine = e.message.match(/FaustDSP : (\d+)/);
            if (matchLine) {
                const line = matchLine[1];
                editorDecoration = editor.deltaDecorations(editorDecoration, [{
                    range: new monaco.Range(line, 1, line, 1),
                    options: { isWholeLine: true, linesDecorationsClassName: "monaco-decoration-error" }
                }]);
            }
            showError(e);
            return { error: e, success: false };
        }
        // const $svg = $("#diagram-svg>svg");
        // const curWidth = $svg.length ? $svg.width() : "100%"; // preserve current zoom
        const svg = $<SVGSVGElement>(strSvg).filter("svg")[0];
        const width = Math.min($("#diagram").width(), $("#diagram").height() / svg.height.baseVal.value * svg.width.baseVal.value);
        $("#diagram-svg").empty().append(svg).children("svg").width(width); // replace svg;
        $("#diagram-default").hide(); // hide "No Diagram" info
        clearError(); // Supress error shown
        $("#diagram-svg").show(); // Show diagram div (if first time after opening page)
        return { success: true };
    };
    let isCompilingDsp = false;
    /**
     * Generate both diagram and dsp
     *
     * @param {string} code
     * @returns {{ success: boolean; error?: Error }}
     */
    const runDsp = async (codeIn: string): Promise<{ success: boolean; error?: Error }> => {
        if (isCompilingDsp) return { success: false, error: new Error("Another DSP is compiling") };
        isCompilingDsp = true;
        const code = `declare filename "${uiEnv.fileManager.mainFileName}"; declare name "${uiEnv.fileManager.mainFileNameWithoutSuffix}"; ${codeIn}`;
        const audioCtx = audioEnv.audioCtx;
        const gain = audioEnv.gainInput;
        let splitter = audioEnv.splitterOutput;
        const analyser = audioEnv.analyserOutput;
        if (!audioCtx) { // If audioCtx not init yet
            await initAudioCtx(audioEnv);
            initAnalysersUI(uiEnv, audioEnv);
        }
        const { useWorklet, bufferSize, voices, args } = compileOptions;
        let node: FaustScriptProcessorNode | FaustAudioWorkletNode;
        // Recorder, show current recorded length without too many refreshes
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
        // Receives buffer from DSP, send it to analyzer for scopes, and recorder
        const plotHandler = (plotted: Float32Array[], index: number, events?: { type: string; data: any }[]) => {
            uiEnv.analyser.plotHandler(plotted, index, events);
            if (!faustEnv.recorder.enabled) return;
            const t = faustEnv.recorder.append(plotted, index);
            if (mediaLengthRaf) cancelAnimationFrame(mediaLengthRaf);
            mediaLengthRaf = requestAnimationFrame(() => mediaLengthDisplay(t));
        };
        try {
            // const getDiagramResult = getDiagram(code);
            // if (!getDiagramResult.success) throw getDiagramResult.error;
            node = await faust.getNode(code, { audioCtx, useWorklet, bufferSize, voices, args, plotHandler });
            if (!node) throw new Error("Unknown Error in WebAudio Node.");
        } catch (e) { /*
            const uiWindow = ($("#iframe-faust-ui")[0] as HTMLIFrameElement).contentWindow;
            uiWindow.postMessage(JSON.stringify({ type: "clear" }), "*");
            $("#faust-ui-default").show();
            $("#iframe-faust-ui").css("visibility", "hidden");
            $("#output-analyser-ui").hide();
            refreshDspUI(); */
            showError(e);
            isCompilingDsp = false;
            return { success: false, error: e };
        }
        /**
         * Push get diagram to end of scheduler
         * generate diagram only when the tab is active
         */
        if ($("#tab-diagram").hasClass("active")) setTimeout(updateDiagram, 0, code);
        $("#tab-diagram").off("show.bs.tab").one("show.bs.tab", () => updateDiagram(code));
        if (audioEnv.dsp) { // Disconnect current
            const dsp = audioEnv.dsp;
            if (audioEnv.dspConnectedToInput) {
                gain.disconnect(dsp);
                audioEnv.dspConnectedToInput = false;
            }
            dsp.disconnect();
            audioEnv.dspConnectedToOutput = false;
            dsp.destroy();
            delete audioEnv.dsp;
        }
        /**
         * Update the dsp with saved params
         */
        if (compileOptions.saveParams) {
            for (const path in dspParams) {
                if (node.getParams().indexOf(path) !== -1) {
                    node.setParamValue(path, dspParams[path]);
                }
            }
        }
        await audioEnv.audioCtx.resume(); // Resume audioContext for firefox
        /**
         * Connect the dsp to graph (use a new splitter)
         */
        audioEnv.dsp = node;
        const channelsCount = node.getNumOutputs();
        if (!splitter || splitter.numberOfOutputs !== channelsCount) {
            if (splitter) splitter.disconnect();
            splitter = audioCtx.createChannelSplitter(channelsCount);
            delete audioEnv.splitterOutput;
            audioEnv.splitterOutput = splitter;
            uiEnv.outputScope.splitter = splitter;
            uiEnv.outputScope.channels = channelsCount;
            uiEnv.outputScope.channel = Math.min(uiEnv.outputScope.channel, channelsCount - 1);
            splitter.connect(analyser, uiEnv.outputScope.channel);
        }
        if (audioEnv.gainInput && node.getNumInputs()) {
            audioEnv.gainInput.connect(node);
            audioEnv.dspConnectedToInput = true;
        }
        node.connect(splitter);
        if (audioEnv.outputEnabled) {
            node.connect(audioEnv.destination);
            audioEnv.dspConnectedToOutput = true;
        }
        const uiWindow = ($("#iframe-faust-ui")[0] as HTMLIFrameElement).contentWindow;
        /**
         * set handler for param changed of dsp
         * send current value to window
         */
        node.setOutputParamHandler((path: string, value: number) => {
            const msg = { path, value, type: "param" };
            if (uiWindow) uiWindow.postMessage(msg, "*");
            if (uiEnv.uiPopup) uiEnv.uiPopup.postMessage(msg, "*");
        });
        /**
         * Bind dsp params to ui interface
         * as UI is in an iframe and a popup window,
         * send a message with params into the window
         * bind events on param change
         */
        const bindUI = () => {
            const callback = () => {
                const msg = { type: "ui", ui: node.getUI() };
                /**
                 * Post param list json
                 */
                uiWindow.postMessage(msg, "*");
                if (uiEnv.uiPopup) uiEnv.uiPopup.postMessage(msg, "*");
                /**
                 * Post current param values
                 */
                if (compileOptions.saveParams) {
                    const params = node.getParams();
                    for (const path in dspParams) {
                        if (params.indexOf(path) !== -1) {
                            const msg = { path, value: dspParams[path], type: "param" };
                            uiWindow.postMessage(msg, "*");
                            if (uiEnv.uiPopup) uiEnv.uiPopup.postMessage(msg, "*");
                        }
                    }
                }
            };
            /**
             * if window is opened, bind directly, else bind when window is loaded.
             */
            if (!compileOptions.popup || (uiEnv.uiPopup && !uiEnv.uiPopup.closed)) callback();
            else {
                uiEnv.uiPopup = window.open("faust-ui.html", "Faust DSP", "directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=800,height=600");
                uiEnv.uiPopup.onload = callback;
            }
        };
        bindUI();
        clearError(); // Supress error shown
        $("#faust-ui-default").hide(); // Hide "No DSP yet" info
        $("#nav-item-faust-ui").show(); // Show DSP UI tab
        $("#iframe-faust-ui").css("visibility", "visible"); // Show iframe
        $("#output-analyser-ui").show(); // Show dsp info on right panel
        if (uiEnv.outputScope) uiEnv.outputScope.disabled = false;
        refreshDspUI(node); // update dsp info
        saveEditorDspTable(); // Save the new DSP table to localStorage
        if (compileOptions.enableGuiBuilder) {
            $("#gui-builder-default").hide(); // Hide "No DSP yet" info
            $("#nav-item-gui-builder").show(); // Show GUI Builder tab
            $("#iframe-gui-builder").css("visibility", "visible"); // Show iframe
            const guiBuilder = $<HTMLIFrameElement>("#iframe-gui-builder")[0];
            guiBuilder.src = "";
            guiBuilder.src = `${compileOptions.guiBuilderUrl}?name=${uiEnv.fileManager.mainFileName}`;
            guiBuilder.onload = () => guiBuilder.contentWindow.postMessage({ type: "build", ui: node.getUI(), name: `${uiEnv.fileManager.mainFileName}`, code: uiEnv.fileManager.mainCode }, "*");
        }
        isCompilingDsp = false;
        return { success: true };
    };
    let rtCompileTimer: NodeJS.Timeout;
    const audioEnv: FaustEditorAudioEnv = { dspConnectedToInput: false, dspConnectedToOutput: false, inputEnabled: false, outputEnabled: false };
    const midiEnv: FaustEditorMIDIEnv = { input: null };
    const uiEnv: FaustEditorUIEnv = { analysersInited: false, inputScope: null, outputScope: null, plotScope: undefined, analyser: new Analyser(16, "continuous"), fileManager: undefined };
    const compileOptions: FaustEditorCompileOptions = { useWorklet: false, bufferSize: 1024, saveCode: true, saveParams: false, saveDsp: false, realtimeCompile: true, popup: false, voices: 0, plotMode: "offline", plot: 256, plotSR: 48000, plotFFT: 256, plotFFTOverlap: 2, drawSpectrogram: false, enableGuiBuilder: false, guiBuilderUrl: "https://mainline.i3s.unice.fr/fausteditorweb/dist/PedalEditor/Front-End/", exportPlatform: "owl", exportArch: "owl", ...loadEditorParams(), args: { "-I": ["libraries/", "project/"] } };
    const faustEnv: FaustEditorEnv = { audioEnv, midiEnv, uiEnv, compileOptions, jQuery, editor, faust, recorder: new Recorder() };
    localStorage.setItem("faust_editor_version", VERSION);
    uiEnv.plotScope = new StaticScope({ container: $<HTMLDivElement>("#plot-ui")[0] });
    uiEnv.analyser.drawHandler = uiEnv.plotScope.draw;
    uiEnv.analyser.getSampleRate = () => (compileOptions.plotMode === "offline" ? compileOptions.plotSR : audioEnv.audioCtx.sampleRate);
    if (compileOptions.saveCode) loadProject(); else faust.fs.mkdir("project");
    uiEnv.fileManager = new FileManager({
        container: $<HTMLDivElement>("#filemanager")[0],
        fs: faust.fs,
        path: "project/",
        $mainFile: compileOptions.mainFileIndex || 0,
        selectHandler: (fileName, content) => editor.setValue(content),
        saveHandler: (fileName: string, content: string, mainCode: string) => {
            let project: { [name: string]: string };
            try {
                project = JSON.parse(localStorage.getItem("faust_editor_project")) || {};
            } catch (e) {
                project = {};
            }
            project[fileName] = content;
            try {
                localStorage.setItem("faust_editor_project", JSON.stringify(project));
            } catch (e) {
                showError(e);
            }
            clearTimeout(rtCompileTimer);
            if (compileOptions.realtimeCompile) rtCompileTimer = setTimeout(audioEnv.dsp ? runDsp : updateDiagram, 1000, mainCode);
        },
        deleteHandler: (fileName) => {
            let project: { [name: string]: string };
            try {
                project = JSON.parse(localStorage.getItem("faust_editor_project")) || {};
            } catch (e) {
                return;
            }
            delete project[fileName];
            localStorage.setItem("faust_editor_project", JSON.stringify(project));
        },
        mainFileChangeHandler: (index, mainCode) => {
            compileOptions.mainFileIndex = index;
            saveEditorParams();
            clearTimeout(rtCompileTimer);
            if (compileOptions.realtimeCompile) rtCompileTimer = setTimeout(audioEnv.dsp ? runDsp : updateDiagram, 100, mainCode);
        }
    });
    if (compileOptions.saveDsp) loadEditorDspTable();

    /**
     * Bind DOM events
     */
    // Alerts
    $(".alert>.close").on("click", e => $(e.currentTarget).parent().css("visibility", "hidden"));
    $(".a-alert-faust-code-detail").on("click", e => $("#modal-alert-faust-code-detail .modal-body").text($(e.currentTarget).siblings("span").text()));
    // Tooltips
    $('[data-toggle="tooltip"]').tooltip({ trigger: "hover", boundary: "viewport" });
    $("#btn-export").tooltip({ trigger: "hover", boundary: "viewport" });
    $("#btn-share").tooltip({ trigger: "hover", boundary: "viewport" });
    $("#btn-tab-setting").tooltip({ trigger: "hover", boundary: "viewport" });
    $<HTMLInputElement>("#enable-gui-editor").on("change", (e) => {
        const { checked } = e.currentTarget;
        if (!checked) {
            $("#nav-item-gui-builder").hide(); // Hide GUI Builder tab
            $("#iframe-gui-builder").css("visibility", "hidden"); // Show iframe
        }
        compileOptions.enableGuiBuilder = checked;
        saveEditorParams();
    })[0].checked = compileOptions.enableGuiBuilder;
    $<HTMLInputElement>("#gui-builder-url").val(compileOptions.guiBuilderUrl).on("change", (e) => {
        compileOptions.guiBuilderUrl = e.currentTarget.value || "https://mainline.i3s.unice.fr/fausteditorweb/dist/PedalEditor/Front-End/";
        saveEditorParams();
    });
    /**
     * Left panel options
     */
    // Voices
    $<HTMLSelectElement>("#select-voices").on("change", (e) => {
        compileOptions.voices = +e.currentTarget.value;
        saveEditorParams();
        if (compileOptions.realtimeCompile && audioEnv.dsp) runDsp(uiEnv.fileManager.mainCode);
    });
    // BufferSize
    $<HTMLSelectElement>("#select-buffer-size").on("change", (e) => {
        compileOptions.bufferSize = +e.currentTarget.value as 128 | 256 | 512 | 1024 | 2048 | 4096;
        saveEditorParams();
        if (compileOptions.realtimeCompile && audioEnv.dsp) runDsp(uiEnv.fileManager.mainCode);
    });
    // AudioWorklet
    $<HTMLInputElement>("#check-worklet").on("change", (e) => {
        compileOptions.useWorklet = e.currentTarget.checked;
        const $options = $("#select-buffer-size").prop("disabled", true).children("option");
        $options.eq(0).prop("disabled", !compileOptions.useWorklet);
        $("#select-buffer-size").prop("disabled", !!compileOptions.useWorklet);
        if (compileOptions.useWorklet) $options.eq(0).prop("selected", true);
        else $options.eq([128, 256, 512, 1024, 2048, 4096].indexOf(compileOptions.bufferSize)).prop("selected", true);
        $("#input-plot-samps").change();
        saveEditorParams();
        if (compileOptions.realtimeCompile && audioEnv.dsp) runDsp(uiEnv.fileManager.mainCode);
    });
    // Save Params
    $<HTMLInputElement>("#check-save-code").on("change", (e) => {
        compileOptions.saveCode = e.currentTarget.checked;
        saveEditorParams();
    })[0].checked = compileOptions.saveCode;
    // Save Params
    $<HTMLInputElement>("#check-save-params").on("change", (e) => {
        compileOptions.saveParams = e.currentTarget.checked;
        saveEditorParams();
    })[0].checked = compileOptions.saveParams;
    // Save DSP
    $<HTMLInputElement>("#check-save-dsp").on("change", (e) => {
        compileOptions.saveDsp = e.currentTarget.checked;
        loadEditorDspTable();
        saveEditorParams();
    })[0].checked = compileOptions.saveDsp;
    if (compileOptions.saveDsp) loadEditorDspTable();
    // Real-time Diagram
    $<HTMLInputElement>("#check-realtime-compile").on("change", (e) => {
        compileOptions.realtimeCompile = e.currentTarget.checked;
        saveEditorParams();
        if (compileOptions.realtimeCompile) {
            const code = uiEnv.fileManager.mainCode;
            if (audioEnv.dsp) runDsp(code);
            else updateDiagram(code);
        }
    });
    // Save Params
    $<HTMLInputElement>("#check-popup").on("change", (e) => {
        compileOptions.popup = e.currentTarget.checked;
        saveEditorParams();
    })[0].checked = compileOptions.popup;
    // Plot
    $<HTMLInputElement>("#select-plot-mode").on("change", (e) => {
        compileOptions.plotMode = e.currentTarget.value as "offline" | "continuous" | "onevent" | "manual";
        uiEnv.analyser.drawMode = compileOptions.plotMode;
        const $span = $("#btn-plot").children("span");
        if (compileOptions.plotMode === "offline") {
            $("#btn-plot").show();
            $span.text("Plot First Samples");
        } else if (compileOptions.plotMode === "manual") {
            $("#btn-plot").show();
            $span.text("Plot (Snapshot)");
        } else $("#btn-plot").hide();
        if (compileOptions.plotMode === "continuous") uiEnv.plotScope.mode = 2;
        const $plotSR = $<HTMLInputElement>("#input-plot-sr");
        if (compileOptions.plotMode === "offline") $plotSR.prop("disabled", false)[0].value = compileOptions.plotSR.toString();
        else $plotSR.prop("disabled", true)[0].value = audioEnv.audioCtx ? audioEnv.audioCtx.sampleRate.toString() : "48000";
        saveEditorParams();
    });
    $("#btn-plot").on("click", () => {
        if (compileOptions.plotMode === "offline") {
            const code = uiEnv.fileManager.mainCode;
            const { args, plot, plotSR } = compileOptions;
            faustEnv.faust.plot({ code, args, size: plot, sampleRate: plotSR }).then(t => uiEnv.analyser.plotHandler(t, 0, undefined, true));
            if (!$("#tab-plot-ui").hasClass("active")) $("#tab-plot-ui").tab("show");
        } else { // eslint-disable-next-line no-lonely-if
            if (audioEnv.dsp) uiEnv.analyser.draw();
            else runDsp(uiEnv.fileManager.mainCode);
        }
    });
    $("#tab-plot-ui").on("shown.bs.tab", () => uiEnv.plotScope.draw());
    $<HTMLInputElement>("#input-plot-samps").on("change", (e) => {
        const v = +e.currentTarget.value;
        const bufferSize = (compileOptions.useWorklet ? 128 : compileOptions.bufferSize);
        const fftSize = compileOptions.plotFFT || 256;
        const step = Math.max(bufferSize, fftSize);
        const v1 = Math.max((v === compileOptions.plot - +e.currentTarget.step ? Math.floor(v / step) : Math.ceil(v / step)) * step, step); // Spinner
        compileOptions.plot = v1;
        uiEnv.analyser.buffers = v1 / bufferSize;
        e.currentTarget.step = step.toString();
        e.currentTarget.value = v1.toString();
        saveEditorParams();
    })[0].value = compileOptions.plot.toString();
    $<HTMLInputElement>("#input-plot-sr").on("change", (e) => {
        compileOptions.plotSR = +e.currentTarget.value;
        saveEditorParams();
    })[0].value = compileOptions.plotSR.toString();
    $<HTMLInputElement>("#check-draw-spectrogram").on("change", (e) => {
        compileOptions.drawSpectrogram = e.currentTarget.checked;
        uiEnv.plotScope.drawSpectrogram = compileOptions.drawSpectrogram;
        uiEnv.inputScope.drawSpectrogram = compileOptions.drawSpectrogram;
        uiEnv.outputScope.drawSpectrogram = compileOptions.drawSpectrogram;
        saveEditorParams();
    })[0].checked = compileOptions.drawSpectrogram;
    // Plot
    $<HTMLInputElement>("#select-plot-fftsize").on("change", (e) => {
        compileOptions.plotFFT = +e.currentTarget.value as 256 | 1024 | 4096;
        uiEnv.analyser.fftSize = compileOptions.plotFFT;
        $("#input-plot-samps").change();
        saveEditorParams();
    });
    $<HTMLInputElement>("#select-plot-fftoverlap").on("change", (e) => {
        compileOptions.plotFFTOverlap = +e.currentTarget.value as 1 | 2 | 4 | 8;
        uiEnv.analyser.fftOverlap = compileOptions.plotFFTOverlap;
        saveEditorParams();
    });
    /**
     * Load options from URL, override current
     * Available params:
     * {boolean} autorun
     * {boolean} realtime_compile
     * {string} name - as string
     * {string} code - as URL to fetch
     * {string} inline - as Base64URL (should be url safe version)
     * {string} code_string - as string
     * {number} voices - poly voices
     * {number} buffer_size - buffer size
     *
     * @param {string} url
     * @returns
     */
    const loadURLParams = async (url: string) => {
        const urlParams = new URLSearchParams(url);
        if (urlParams.has("realtime_compile")) {
            compileOptions.realtimeCompile = !!+urlParams.get("realtime_compile");
            saveEditorParams();
        }
        if (urlParams.has("voices")) {
            const voices = +urlParams.get("voices");
            compileOptions.voices = [1, 2, 4, 8, 16, 32, 64, 128].indexOf(voices) === -1 ? 0 : voices;
            saveEditorParams();
        }
        if (urlParams.has("buffer_size")) {
            const bufferSize = +urlParams.get("buffer_size");
            compileOptions.bufferSize = [128, 256, 512, 1024, 2048, 4096].indexOf(bufferSize) === -1 ? 1024 : (bufferSize as 128 | 256 | 512 | 1024 | 2048 | 4096);
            saveEditorParams();
        }
        if (urlParams.has("mode")) {
            if (urlParams.get("mode") === "amstram") {
                compileOptions.exportPlatform = "esp32";
                compileOptions.exportArch = "gramophoneFlash";
                $("#btn-def-exp-content").html("Gramo");
                saveEditorParams();
                $("#export-platform").val(compileOptions.exportPlatform);
                $("#export-arch").val(compileOptions.exportArch);
                // getTargets(server);
            }
        }
        let code;
        if (urlParams.has("code")) {
            const codeURL = urlParams.get("code");
            const name = codeURL.split("/").slice(-1)[0].split(".").slice(0, -1).join(".").replace(/[^a-zA-Z0-9_]/g, "") || "untitled";
            uiEnv.fileManager.renameSelected(`${name}.dsp`);
            try {
                const response = await fetch(codeURL);
                code = await response.text();
            } catch (e) {} // eslint-disable-line no-empty
        }
        if (urlParams.has("code_string")) {
            code = urlParams.get("code_string");
        }
        if (urlParams.has("inline")) {
            const b64Code = urlParams.get("inline").replace("-", "+").replace("_", "/");
            code = atob(b64Code);
        }
        if (urlParams.has("name")) {
            const name = urlParams.get("name").replace(/[^a-zA-Z0-9_]/g, "") || "untitled";
            uiEnv.fileManager.renameSelected(`${name}.dsp`);
            saveEditorParams();
        }
        if (code) {
            uiEnv.fileManager.setValue(code);
            if (urlParams.has("autorun") && urlParams.get("autorun")) {
                const compileResult = await runDsp(code);
                if (!compileResult.success) return;
                if (!$("#tab-faust-ui").hasClass("active")) $("#tab-faust-ui").tab("show");
            }
        }
    };
    // Upload
    $("#btn-upload").on("click", () => {
        $("#input-upload").click();
    });
    $<HTMLInputElement>("#input-upload").on("input", (e) => {
        const file = e.currentTarget.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            const fileName = file.name.replace(/[^a-zA-Z0-9_.]/g, "") || "untitled.dsp";
            const code = reader.result.toString();
            uiEnv.fileManager.newFile(fileName, code);
            if (compileOptions.realtimeCompile) {
                if (audioEnv.dsp) runDsp(uiEnv.fileManager.mainCode);
                else updateDiagram(uiEnv.fileManager.mainCode);
            }
        };
        reader.onerror = () => undefined;
        reader.readAsText(file);
    }).on("click", e => e.stopPropagation());
    // Save as //TODO zip
    $("#btn-save").on("click", async () => {
        const zip = new JSZip();
        uiEnv.fileManager._fileList.forEach(n => zip.file(n, uiEnv.fileManager.getValue(n)));
        const b = await zip.generateAsync({ type: "blob" });
        const uri = URL.createObjectURL(b);
        $("#a-save").attr({ href: uri, download: `${uiEnv.fileManager.mainFileNameWithoutSuffix}.zip` })[0].click();
    });
    $("#a-save").on("click", e => e.stopPropagation());
    // Docs
    $("#a-docs").on("click", e => e.stopPropagation());
    /**
     * Export
     * Append options to export model
     */
    const server = "https://faustservicecloud.grame.fr";
    // If true, the download argument will force the download of the generated target
    const exportProgram = (download: boolean) => {
        $("#export-download").hide();
        $("#export-loading").css("display", "inline-block");
        $("#def-exp-icon").hide();
        $("#def-exp-loading").css("display", "inline-block");
        $("#qr-code").hide();
        $("#export-error").hide();
        const form = new FormData();
        const name = ($("#export-name").val() as string).replace(/[^a-zA-Z0-9_]/g, "") || "untitled";
        try {
            // 03/12/2020: The code is not expanded anymore, since with esp32 the remote compilation service uses the "platform.lib" library
            // const expandedCode = faust.expandCode(uiEnv.fileManager.mainCode, compileOptions.args);
            const expandedCode = uiEnv.fileManager.mainCode;
            form.append("file", new File([`declare filename "${name}.dsp"; declare name "${name}"; ${expandedCode}`], `${name}.dsp`));
        } catch (e) {
            $("#export-loading").css("display", "none");
            $("#def-exp-loading").css("display", "none");
            $("#def-exp-icon").show();
            $("#export-error").html(e).show();
            return;
        }
        $.ajax({
            method: "POST",
            url: `${server}/filepost`,
            data: form,
            contentType: false,
            processData: false
        }).done((shaKey) => {
            const matched = shaKey.match(/^[0-9A-Fa-f]+$/);
            if (matched) {
                const plat = $("#export-platform").val();
                const arch = $("#export-arch").val();
                const path = `${server}/${shaKey}/${plat}/${arch}`;
                $.ajax({
                    method: "GET",
                    url: `${path}/precompile`
                }).done((result) => {
                    if (result === "DONE") {
                        const href = `${path}/${plat === "android" ? "binary.apk" : "binary.zip"}`;
                        $("#a-export-download").attr({ href });
                        $("#export-download").show();
                        if (download === true) {
                            $("#export-download").click();
                        }
                        $("#qr-code").show();
                        QRCode.toCanvas(
                            $<HTMLCanvasElement>("#qr-code")[0],
                            `${path}/${plat === "android" ? "binary.apk" : "binary.zip"}`
                        );
                        return;
                    }
                    $("#export-loading").css("display", "none");
                    $("#def-exp-loading").css("display", "none");
                    $("#def-exp-icon").show();
                    $("#export-error").html(result).show();
                }).fail((jqXHR, textStatus) => {
                    $("#export-error").html(textStatus + ": " + jqXHR.responseText).show();
                }).always(() => {
                    $("#export-loading").css("display", "none");
                    $("#def-exp-loading").css("display", "none");
                    $("#def-exp-icon").show();
                });
                return;
            }
            $("#export-loading").css("display", "none");
            $("#def-exp-loading").css("display", "none");
            $("#def-exp-icon").show();
            $("#export-error").html(shaKey).show();
        }).fail((jqXHR, textStatus) => {
            $("#export-loading").css("display", "none");
            $("#def-exp-loading").css("display", "none");
            $("#def-exp-icon").show();
            $("#export-error").html(textStatus + ": " + jqXHR.responseText).show();
        });
    };
    const getTargets = (server: string) => {
        $("#export-platform").add("#export-arch").empty();
        $("#export-platform").off("change");
        $("#export-download").off("click");
        $("#a-export-download").off("click");
        $("#export-submit").prop("disabled", true).off("click");
        fetch(`${server}/targets`)
            .then(response => response.json())
            .then((targets: FaustExportTargets) => {
                const plats = Object.keys(targets);
                if (plats.length) {
                    plats.forEach((plat, i) => $("#export-platform").append(new Option(plat, plat, i === 0)));
                    $("#export-platform").val(compileOptions.exportPlatform);
                    targets[compileOptions.exportPlatform].forEach((arch, i) => $("#export-arch").append(new Option(arch, arch, i === 0)));
                    $("#export-arch").val(compileOptions.exportArch);
                }
                $("#modal-export").on("shown.bs.modal", () => $("#export-name").val(uiEnv.fileManager.mainFileNameWithoutSuffix));
                $("#export-name").on("keydown", (e) => {
                    if (e.key.match(/[^a-zA-Z0-9_]/)) e.preventDefault();
                });
                $<HTMLSelectElement>("#export-platform").on("change", (e) => {
                    compileOptions.exportPlatform = e.currentTarget.value;
                    saveEditorParams();
                    $("#export-arch").empty();
                    targets[compileOptions.exportPlatform].forEach((arch, i) => $("#export-arch").append(new Option(arch, arch, i === 0)));
                });
                $<HTMLSelectElement>("#export-arch").on("change", (e) => {
                    compileOptions.exportArch = e.currentTarget.value;
                    saveEditorParams();
                    // eslint-disable-next-line no-console
                    console.log(compileOptions);
                });
                $("#export-download").on("click", () => $("#a-export-download")[0].click());
                $("#a-export-download").on("click", e => e.stopPropagation());
                $("#export-submit").prop("disabled", false).on("click", () => {
                    exportProgram(false);
                });
            })
            .catch(() => undefined);
    };
    $<HTMLInputElement>("#export-server").val(server).on("change", e => getTargets(e.currentTarget.value)).change();
    // Share
    /**
     * Make share URL with options
     *
     * @returns
     */
    const makeURL = () => {
        const base = window.location.origin + window.location.pathname;
        const urlParams = new URLSearchParams();
        urlParams.set("autorun", $("#share-autorun").prop("checked") ? "1" : "0");
        urlParams.set("voices", compileOptions.voices.toString());
        urlParams.set("name", uiEnv.fileManager.mainFileNameWithoutSuffix);
        urlParams.set("inline", btoa(uiEnv.fileManager.mainCode).replace("+", "-").replace("/", "_"));
        return base + "?" + urlParams.toString();
    };
    $("#modal-share").on("shown.bs.modal", () => {
        $("#share-btn-copy").html("Copy");
        $("#share-url").val(makeURL());
    });
    $("#share-autorun").on("change", () => {
        $("#share-btn-copy").html("Copy");
        $("#share-url").val(makeURL());
    });
    $("#share-btn-copy").on("click", (e) => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText($("#share-url").val() as string);
        } else {
            $("#share-url").focus().select();
            document.execCommand("copy");
        }
        $(e.currentTarget).html('<i class="fas fa-check"></i>');
    });
    /**
     * Right panel options
     */
    // Keyboard as midi input
    const key2Midi = new Key2Midi({ keyMap: navigator.language === "fr-FR" ? Key2Midi.KEY_MAP_FR : Key2Midi.KEY_MAP, enabled: false });
    $(document).on("keydown", (e) => {
        if (faustEnv.editor && faustEnv.editor.hasTextFocus()) return;
        key2Midi.handleKeyDown(e.key);
    });
    $(document).on("keyup", (e) => {
        if (faustEnv.editor && faustEnv.editor.hasTextFocus()) return;
        key2Midi.handleKeyUp(e.key);
    });
    // MIDI Devices select
    $<HTMLSelectElement>("#select-midi-input").on("change", (e) => {
        const id = e.currentTarget.value;
        if (midiEnv.input) midiEnv.input.removeListener("midimessage", "all");
        const keys: number[] = [];
        const listener = (data: number[] | Uint8Array) => {
            if (audioEnv.dsp) audioEnv.dsp.midiMessage(data); // Send midi message to dsp node
            if (data[0] === 144 && data[2]) { // Show as pill midi note
                if (keys.indexOf(data[1]) === -1) keys.push(data[1]);
                $("#midi-ui-note").text(data[1]).show();
            } else if (data[0] === 128 || (data[0] === 144 && !data[2])) {
                keys.splice(keys.indexOf(data[1]), 1);
                if (keys.length === 0) $("#midi-ui-note").hide();
                else $("#midi-ui-note").text(keys[keys.length - 1]);
            }
        };
        if (id === "-2") {
            key2Midi.handler = listener;
            key2Midi.enabled = true;
            return;
        }
        key2Midi.enabled = false;
        if (id === "-1") return;
        const input = webmidi.getInputById(id);
        if (!input) return;
        midiEnv.input = input;
        input.addListener("midimessage", "all", e => listener(e.data));
    });
    // Append current connected devices
    const handleMIDIConnect = (e: WebMidiEventConnected) => {
        if (e.port.type !== "input") return;
        const $select = $("#select-midi-input");
        if ($select.find(`option[value="${e.port.id}"]`).length) return;
        const $option = $(new Option(e.port.name, e.port.id));
        $select.append($option);
        $option.prop("selected", true).change();
    };
    const handleMIDIDisconnect = (e: WebMidiEventDisconnected) => {
        if (e.port.type !== "input") return;
        const $select = $("#select-midi-input");
        const $find = $select.find(`option[value="${e.port.id}"]`);
        if (!$find.length) return;
        $find.remove();
        $select.children("option").last().prop("selected", true).change();
    };
    $("#select-midi-input").children("option").eq(1).prop("selected", true).change();
    webmidi.enable((e) => {
        if (e) return;
        $("#midi-ui-default").hide();
        $("#select-midi-input").prop("disabled", false);
        webmidi.addListener("connected", handleMIDIConnect);
        webmidi.addListener("disconnected", handleMIDIDisconnect);
    });
    /**
     * Audio Inputs
     * Use WaveSurfer lib with MediaElement and <audio />
     */
    let wavesurfer: WaveSurfer;
    $<HTMLSelectElement>("#select-audio-input").on("change", async (e) => {
        const id = e.currentTarget.value;
        if (audioEnv.currentInput === id) return;
        if (audioEnv.audioCtx && audioEnv.currentInput) {
            const gain = audioEnv.gainInput;
            const input = audioEnv.inputs[audioEnv.currentInput];
            if (gain) input.disconnect(gain); // Disconnect
        }
        if (!wavesurfer) {
            wavesurfer = WaveSurfer.create({
                container: $("#source-waveform")[0],
                audioContext: audioEnv.audioCtx,
                backend: "MediaElement",
                cursorColor: "#EEE",
                progressColor: "#888",
                waveColor: "#BBB",
                height: 60,
                splitChannels: true
            });
            wavesurfer.on("play", () => {
                $("#btn-source-play .fa-play").removeClass("fa-play").addClass("fa-pause");
                $("#input-analyser-ui").show();
                if (uiEnv.inputScope) uiEnv.inputScope.disabled = false;
            });
            wavesurfer.on("pause", () => {
                $("#btn-source-play .fa-pause").removeClass("fa-pause").addClass("fa-play");
                $("#input-analyser-ui").hide();
                if (uiEnv.inputScope) uiEnv.inputScope.disabled = true;
            });
            wavesurfer.on("finish", () => {
                if ($("#btn-source-loop").hasClass("active")) wavesurfer.play();
                else {
                    $("#btn-source-play .fa-pause").removeClass("fa-pause").addClass("fa-play");
                    $("#input-analyser-ui").hide();
                    if (uiEnv.inputScope) uiEnv.inputScope.disabled = true;
                }
            });
            wavesurfer.on("waveform-ready", () => {
                audioEnv.gainUIInput.channels = (wavesurfer.backend as LegacyWaveSurferBackend).buffer.numberOfChannels;
            });
            wavesurfer.load("./02-XYLO1.mp3");
        }
        // MediaElementSource, Waveform
        if (id === "-1") {
            $("#source-ui").show();
            $("#input-analyser-ui").hide();
            if (uiEnv.inputScope) uiEnv.inputScope.disabled = true;
            audioEnv.gainUIInput.channels = (wavesurfer.backend as LegacyWaveSurferBackend).buffer ? (wavesurfer.backend as LegacyWaveSurferBackend).buffer.numberOfChannels : 2;
        } else {
            $("#source-ui").hide();
            $("#input-analyser-ui").show();
            if (uiEnv.inputScope) uiEnv.inputScope.disabled = false;
            audioEnv.gainUIInput.channels = 2;
        }
        // init audio environment
        await initAudioCtx(audioEnv, id);
        const gain = audioEnv.gainInput;
        const input = audioEnv.inputs[id];
        audioEnv.currentInput = id;
        audioEnv.inputEnabled = true;
        if (gain) input.connect(gain);
    });
    /**
     * Audio Outputs
     * Choose and audio stream <audio />
     */
    $<HTMLSelectElement>("#select-audio-output").on("change", async (e) => {
        if (!supportMediaStreamDestination) return;
        const id = e.currentTarget.value;
        await initAudioCtx(audioEnv);
        faustEnv.recorder.sampleRate = audioEnv.audioCtx.sampleRate;
        const audio = $<HTMLAudioElement>("#output-audio-stream")[0];
        audio.setSinkId(id);
    }).change();
    // Waveform
    $("#btn-source-play").on("click", () => {
        if (!wavesurfer || !wavesurfer.isReady) return;
        if (wavesurfer.isPlaying()) {
            wavesurfer.pause();
        } else {
            wavesurfer.play();
        }
    });
    $("#btn-source-rewind").on("click", () => {
        if (!wavesurfer.isReady) return;
        wavesurfer.seekTo(0);
    });
    $("#btn-source-loop").on("click", (e) => {
        $(e.currentTarget).toggleClass("active");
    });
    // Waveform drag'n'drop
    $("#source-waveform").on("dragenter dragover", (e) => {
        const event = e.originalEvent as DragEvent;
        if (event.dataTransfer && event.dataTransfer.items.length && event.dataTransfer.items[0].kind === "file") {
            e.preventDefault();
            e.stopPropagation();
            $("#source-overlay").show();
        }
    });
    $("#source-overlay").on("dragleave dragend", (e) => {
        e.preventDefault();
        e.stopPropagation();
        $(e.currentTarget).hide();
    });
    $("#source-overlay").on("dragenter dragover", (e) => {
        e.preventDefault();
        e.stopPropagation();
    });
    $("#source-overlay").on("drop", (e) => {
        $(e.currentTarget).hide();
        if (!wavesurfer.isReady) return;
        const event = e.originalEvent as DragEvent;
        if (event.dataTransfer && event.dataTransfer.files.length) {
            // Stop the propagation of the event
            e.preventDefault();
            e.stopPropagation();
            const gain = audioEnv.gainInput;
            let input = audioEnv.inputs[-1];
            if (gain) input.disconnect(gain); // Disconnect
            audioEnv.inputEnabled = false;

            const file = event.dataTransfer.files[0];
            try {
                wavesurfer.load(URL.createObjectURL(file));
            } catch (e) {
                console.error(e); // eslint-disable-line no-console
                showError("Cannot load sound file: " + e.message);
                return;
            }
            if ($("#source-waveform audio").length) {
                audioEnv.inputs[-1] = audioEnv.audioCtx.createMediaElementSource($<HTMLAudioElement>("#source-waveform audio")[0]);
                input = audioEnv.inputs[-1];
            }
            audioEnv.inputEnabled = true;
            if (gain) input.connect(gain);
        }
    });
    // Append connected audio devices
    const handleMediaDeviceChange = async () => {
        try {
            await navigator.mediaDevices.getUserMedia({ audio: true });
        } catch (e) {} // eslint-disable-line no-empty
        const devices = await navigator.mediaDevices.enumerateDevices();
        const $selectInput = $("#select-audio-input");
        const $selectOutput = $("#select-audio-output");
        $selectInput.children("option").each((i, e: HTMLOptionElement) => {
            if (e.value === "-1") return;
            if (!devices.find(device => device.deviceId === e.value && device.kind === "audioinput")) {
                e.remove();
                if (e.selected) $selectInput.find("option").eq(0).prop("selected", true).change();
            }
        });
        $selectOutput.children("option").each((i, e: HTMLOptionElement) => {
            if (e.value === "-1") return;
            if (!devices.find(device => device.deviceId === e.value && device.kind === "audiooutput")) {
                e.remove();
                if (e.selected) $selectOutput.find("option").eq(0).prop("selected", true).change();
            }
        });
        devices.forEach((device) => {
            if (!device.deviceId) return;
            if (device.kind === "audioinput") {
                if ($selectInput.find(`option[value=${device.deviceId}]`).length) return;
                $selectInput.append(new Option(device.label || device.deviceId, device.deviceId));
            }
            if (supportMediaStreamDestination && device.kind === "audiooutput") {
                if ($selectOutput.find(`option[value=${device.deviceId}]`).length) return;
                $selectOutput.append(new Option(device.label || device.deviceId, device.deviceId));
            }
        });
    };
    if (navigator.mediaDevices) {
        try {
            await navigator.mediaDevices.getUserMedia({ audio: true });
        } catch (e) {} // eslint-disable-line no-empty
        const devices = await navigator.mediaDevices.enumerateDevices();
        $("#input-ui-default").hide();
        const $selectInput = $("#select-audio-input").prop("disabled", false);
        let $selectOutput: JQuery<HTMLElement>;
        if (supportMediaStreamDestination) {
            if (devices.find(device => device.kind === "audiooutput")) {
                $("#output-ui-default").hide();
                $selectOutput = $("#select-audio-output").prop("disabled", false);
            } else { // No audio outputs, fallback to audioCtx.destination
                if (audioEnv.audioCtx && audioEnv.destination) audioEnv.destination = audioEnv.audioCtx.destination;
                supportMediaStreamDestination = false;
            }
        }
        navigator.mediaDevices.ondevicechange = handleMediaDeviceChange;
        devices.forEach((device) => {
            if (!device.deviceId) return;
            if (device.kind === "audioinput") {
                $selectInput.append(new Option(device.label || device.deviceId, device.deviceId));
            }
            if (supportMediaStreamDestination && device.kind === "audiooutput") {
                $selectOutput.append(new Option(device.label || device.deviceId, device.deviceId));
            }
        });
    }
    // DSP info
    refreshDspUI();
    if (supportAudioWorklet) { // Switch between AW / SP nodes
        $("#dsp-ui-default").on("click", (e) => {
            if (!$(e.currentTarget).hasClass("switch")) return;
            $<HTMLInputElement>("#check-worklet")[0].checked = !compileOptions.useWorklet;
            $("#check-worklet").change();
            if (!compileOptions.realtimeCompile) runDsp(uiEnv.fileManager.mainCode);
        });
    } else $("#dsp-ui-default").tooltip("disable").css("pointer-events", "none");
    // Record
    $("#recorder-aim").on("click", (e) => {
        const recorder = faustEnv.recorder;
        if ($(e.currentTarget).hasClass("btn-light")) {
            $(e.currentTarget).removeClass("btn-light").addClass("btn-danger");
            recorder.enabled = true;
        } else {
            $(e.currentTarget).addClass("btn-light").removeClass("btn-danger");
            recorder.enabled = false;
        }
    });
    $("#recorder-save").on("click", async () => {
        const recorder = faustEnv.recorder;
        if (recorder.totalSec === 0) return;
        const b = new Blob([await recorder.encode()], { type: "audio/wav" });
        const url = URL.createObjectURL(b);
        $("#a-recorder-save").attr({ href: url, download: `${uiEnv.fileManager.mainFileNameWithoutSuffix}.wav` })[0].click();
    });
    $("#a-recorder-save").on("click", e => e.stopPropagation());
    // Output switch to connect / disconnect dsp from destination
    $(".btn-dac").on("click", async () => {
        /*
        if (!audioEnv.audioCtx) {
            await initAudioCtx(audioEnv);
            $(e.currentTarget).removeClass("btn-light").addClass("btn-primary")
            .children("span").html("Output is On");
        } else if (audioEnv.audioCtx.state === "suspended") {
            audioEnv.audioCtx.resume();
            $(e.currentTarget).removeClass("btn-light").addClass("btn-primary")
            .children("span").html("Output is On");
        } else {
            audioEnv.audioCtx.suspend();
            $(e.currentTarget).removeClass("btn-primary").addClass("btn-light")
            .children("span").html("Output is Off");
        }
        */
        if (audioEnv.outputEnabled) {
            // disable audio output
            audioEnv.outputEnabled = false;
            if (audioEnv.dspConnectedToOutput) {
                audioEnv.dsp.disconnect(audioEnv.destination);
                audioEnv.dspConnectedToOutput = false;
            }
            $(".btn-dac").removeClass("btn-primary").addClass("btn-light").children("span").html("Output is Off");
            $(".fa-volume-up").removeClass("fa-volume-up").addClass("fa-volume-mute");
        } else {
            // enable audio output
            audioEnv.outputEnabled = true;
            if (!audioEnv.audioCtx) {
                await initAudioCtx(audioEnv);
                initAnalysersUI(uiEnv, audioEnv);
            } else if (audioEnv.dsp) {
                audioEnv.dsp.connect(audioEnv.destination);
                audioEnv.dspConnectedToOutput = true;
            }
            $(".btn-dac").removeClass("btn-light").addClass("btn-primary").children("span").html("Output is On");
            $(".fa-volume-mute").removeClass("fa-volume-mute").addClass("fa-volume-up");
        }
    });
    /**
     * Center
     */
    // File Drag and drop
    $("#top").on("dragenter dragover", (e) => {
        const event = e.originalEvent as DragEvent;
        if (event.dataTransfer && event.dataTransfer.items.length && event.dataTransfer.items[0].kind === "file") {
            e.preventDefault();
            e.stopPropagation();
            $("#editor-overlay").show();
        }
    });
    $("#editor-overlay").on("dragleave dragend", (e) => {
        e.preventDefault();
        e.stopPropagation();
        $(e.currentTarget).hide();
    });
    $("#editor-overlay").on("dragenter dragover", (e) => {
        e.preventDefault();
        e.stopPropagation();
    });
    $("#editor-overlay").on("drop", (e) => {
        $(e.currentTarget).hide();
        const event = e.originalEvent as DragEvent;
        if (event.dataTransfer && event.dataTransfer.files.length) {
            // Stop the propagation of the event
            e.preventDefault();
            e.stopPropagation();
            const file = event.dataTransfer.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                // Update filename
                const fileName = file.name.replace(/[^a-zA-Z0-9_.]/g, "") || "untitled.dsp";
                const code = reader.result.toString();
                uiEnv.fileManager.newFile(fileName, code);
                // compile diagram or dsp if necessary
                if (compileOptions.realtimeCompile) {
                    if (audioEnv.dsp) runDsp(uiEnv.fileManager.mainCode);
                    else updateDiagram(uiEnv.fileManager.mainCode);
                }
            };
            reader.onerror = () => undefined;
            reader.readAsText(file);
        }
    });
    // Examples
    type DirectoryTree = {
        path: string;
        name: string;
        size: number;
        type: "directory" | "file";
        children?: DirectoryTree[];
        extension?: string;
    };
    // Append each file in examples.json to div menu
    fetch("./examples.json")
        .then(response => response.json())
        .then((tree: DirectoryTree) => {
            const $menu = $("#tab-examples");
            const parseTree = (treeIn: DirectoryTree, $menu: JQuery<HTMLElement>) => {
                if (treeIn.type === "file") {
                    const $item = $("<a>").addClass(["dropdown-item", "faust-example"]).attr("href", "#").text(treeIn.name).data("path", treeIn.path);
                    $menu.append($item);
                } else {
                    const $item = $("<div>").addClass(["dropright", "submenu"]);
                    const $a = $("<a>").addClass(["dropdown-item", "dropdown-toggle", "submenu-toggle"]).attr("href", "#").text(treeIn.name);
                    $a.on("click", (e) => {
                        e.stopImmediatePropagation();
                        e.preventDefault();
                    });
                    const $submenu = $("<div>").addClass("dropdown-menu");
                    $item.append($a, $submenu);
                    treeIn.children.forEach(v => parseTree(v, $submenu));
                    $menu.append($item);
                    $a.dropdown();
                }
            };
            if (tree.children) tree.children.forEach(v => parseTree(v, $menu));
        }).catch(() => undefined);
    // Load an example
    $("#tab-examples").on("click", ".faust-example", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const path = $(e.currentTarget).data("path");
        const name = $(e.currentTarget).text();
        if (path) {
            fetch(path)
                .then(response => response.text())
                .then((code) => {
                    const fileName = name.replace(/[^a-zA-Z0-9_.]/g, "") || "untitled.dsp";
                    uiEnv.fileManager.newFile(fileName, code);
                    if (compileOptions.realtimeCompile) {
                        if (audioEnv.dsp) runDsp(uiEnv.fileManager.mainCode);
                        else updateDiagram(uiEnv.fileManager.mainCode);
                    }
                });
        }
        $("#tab-examples").dropdown("toggle");
    });
    /**
     * Save current code to localStorage
     * if realtime compile is on, do compile
     */
    editor.getModel().onDidChangeContent(() => {
        const code = editor.getValue();
        uiEnv.fileManager.setValue(code, false);
    });
    // Run Dsp Button
    $(".btn-run").prop("disabled", false).on("click", async () => {
        const compileResult = await runDsp(uiEnv.fileManager.mainCode);
        if (!compileResult.success) return;
        if ($("#tab-diagram").hasClass("active") || compileOptions.plotMode === "offline") $("#tab-faust-ui").tab("show");
        // const dspOutputHandler = FaustUI.main(node.getJSON(), $("#faust-ui"), (path: string, val: number) => node.setParamValue(path, val));
        // node.setOutputParamHandler(dspOutputHandler);
    });
    // Default export button
    $(".btn-def-exp").prop("disabled", false).on("click", async () => {
        exportProgram(true);
    });
    /**
     * Bind message event for changing dsp params on receiving msg from ui window
     */
    $(window).on("message", (e) => {
        const $e = (e.originalEvent as MessageEvent);
        if (!$e.data) return;
        const { data, source } = $e;
        if (!data.type) return;
        if (data.type === "param") {
            if (audioEnv.dsp) audioEnv.dsp.setParamValue(data.path, +data.value);
            dspParams[data.path] = +data.value;
            if (compileOptions.saveParams) saveDspParams();
            const uiWindow = $<HTMLIFrameElement>("#iframe-faust-ui")[0].contentWindow;
            const msg = { path: data.path, value: +data.value, type: "param" };
            if (uiWindow !== source) uiWindow.postMessage(msg, "*");
            if (uiEnv.uiPopup && uiEnv.uiPopup !== source) uiEnv.uiPopup.postMessage(msg, "*");
            return;
        }
        // Pass keyboard midi messages even inner window is focused
        if (data.type === "keydown") key2Midi.handleKeyDown(data.key);
        else if (data.type === "keyup") key2Midi.handleKeyUp(data.key);
        // From GUI Builder
        else if (data.type === "export") {
            const form = new FormData();
            const fileName = uiEnv.fileManager.mainFileName;
            const name = uiEnv.fileManager.mainFileNameWithoutSuffix;
            const plat = data.plat || "web";
            const arch = data.arch || "wap";
            const expandedCode = faust.expandCode(uiEnv.fileManager.mainCode, compileOptions.args);
            form.append("file", new File([`declare filename "${fileName}"; declare name "${name}"; ${expandedCode}`], `${fileName}`));
            $.ajax({
                method: "POST",
                url: `${server}/filepost`,
                data: form,
                contentType: false,
                processData: false
            }).done((shaKey) => {
                const matched = shaKey.match(/^[0-9A-Fa-f]+$/);
                if (matched) {
                    const path = `${server}/${shaKey}/${plat}/${arch}`;
                    $.ajax({
                        method: "GET",
                        url: `${path}/precompile`
                    }).done((result) => {
                        if (result === "DONE") {
                            const href = `${path}/binary.zip`;
                            ((e.originalEvent as MessageEvent).source as WindowProxy).postMessage({ type: "exported", href }, "*");
                        }
                    }).fail((jqXHR, textStatus) => {
                        throw new Error(textStatus + ": " + jqXHR.responseText);
                    });
                }
            }).fail((jqXHR, textStatus) => {
                throw new Error(textStatus + ": " + jqXHR.responseText);
            });
        }
    });
    // Close DSP UI Popup when main window is closed
    $(window).on("beforeunload", () => (uiEnv.uiPopup ? uiEnv.uiPopup.close() : undefined));
    $("#nav-item-faust-ui .btn-popup").on("click", (e) => {
        e.stopPropagation();
        e.preventDefault();
        const node = audioEnv.dsp;
        if (!node) return;
        const callback = () => {
            const msg = { type: "ui", ui: node.getUI() };
            /**
             * Post param list json
             */
            if (uiEnv.uiPopup) uiEnv.uiPopup.postMessage(msg, "*");
            /**
             * Post current param values
             */
            const params = node.getParams();
            for (const path in dspParams) {
                if (params.indexOf(path) !== -1) {
                    const msg = { path, value: dspParams[path], type: "param" };
                    if (uiEnv.uiPopup) uiEnv.uiPopup.postMessage(msg, "*");
                }
            }
        };
        /**
         * if window is opened, bind directly, else bind when window is loaded.
         */
        if (uiEnv.uiPopup && !uiEnv.uiPopup.closed) callback();
        else {
            uiEnv.uiPopup = window.open("faust-ui.html", "Faust DSP", "directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=800,height=600");
            uiEnv.uiPopup.onload = callback;
        }
    });
    $("#nav-item-faust-ui .btn-close-tab").on("click", (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (audioEnv.dsp) { // Disconnect current
            const gain = audioEnv.gainInput;
            const dsp = audioEnv.dsp;
            if (audioEnv.dspConnectedToInput) {
                gain.disconnect(dsp);
                audioEnv.dspConnectedToInput = false;
            }
            dsp.disconnect();
            audioEnv.dspConnectedToOutput = false;
            dsp.destroy();
            delete audioEnv.dsp;
        }
        if ($("#tab-faust-ui").hasClass("active")) $("#tab-diagram").tab("show");
        $("#nav-item-faust-ui").hide();
        if (uiEnv.uiPopup) uiEnv.uiPopup.close();
        $("#faust-ui-default").show();
        $("#iframe-faust-ui").css("visibility", "hidden");
        $("#output-analyser-ui").hide();
        if (uiEnv.outputScope) uiEnv.outputScope.disabled = true;
        refreshDspUI();
    });
    let svgDragged = false;
    // svg inject
    $<SVGAElement>("#diagram-svg").on("click", "a", (e) => {
        e.preventDefault();
        if (svgDragged) return;
        // const $svg = $("#diagram-svg>svg");
        // const curWidth = $svg.length ? $svg.width() : $("#diagram").width(); // preserve current zoom
        const fileName = e.currentTarget.href.baseVal;
        const strSvg = faust.fs.readFile("FaustDSP-svg/" + fileName, { encoding: "utf8" }) as string;
        const svg = $<SVGSVGElement>(strSvg).filter("svg")[0];
        const width = Math.min($("#diagram").width(), $("#diagram").height() / svg.height.baseVal.value * svg.width.baseVal.value);
        $("#diagram-svg").empty().append(svg).children("svg").width(width); // replace svg;
    });
    // svg zoom
    $("#diagram-svg").on("mousedown", "svg", (e) => {
        e.preventDefault();
        e.stopPropagation();
        svgDragged = false;
        const $div = $(e.currentTarget).parent();
        const x = e.pageX;
        const y = e.pageY;
        const sL = $div.scrollLeft();
        const sT = $div.scrollTop();
        const handleMouseMove = (e: JQuery.MouseMoveEvent) => {
            if (!e.originalEvent.movementX && !e.originalEvent.movementY) return;
            svgDragged = true;
            const dX = e.pageX - x;
            const dY = e.pageY - y;
            $div.scrollLeft(sL - dX);
            $div.scrollTop(sT - dY);
            e.preventDefault();
            e.stopPropagation();
        };
        const handleMouseUp = (e: JQuery.MouseUpEvent) => {
            $(document).off("mousemove", handleMouseMove);
            $(document).off("mouseup", handleMouseUp);
            if (!svgDragged) return;
            e.preventDefault();
            e.stopPropagation();
        };
        $(document).on("mousemove", handleMouseMove);
        $(document).on("mouseup", handleMouseUp);
    });
    $("#diagram").on("wheel", (e) => {
        if (!e.ctrlKey) return;
        const $svg = $(e.currentTarget).find("svg");
        if (!$svg.length) return;
        e.preventDefault();
        e.stopPropagation();
        const d = (e.originalEvent as WheelEvent).deltaY > 0 ? 1 : -1;
        const w = $svg.width();
        $svg.width(w * (1 - d * 0.25));
    });
    // Keys
    $(document).on("keydown", (e) => {
        if (e.ctrlKey) {
            if (e.key === "d") {
                e.preventDefault();
                e.stopPropagation();
                $("#btn-docs")[0].click();
                return;
            }
            if (e.key === "r") {
                e.preventDefault();
                e.stopPropagation();
                $("#btn-run").click();
            }
        }
    });
    // Resizables
    $(".resizable").on("mousedown touchstart", (e: JQuery.TouchStartEvent | JQuery.MouseDownEvent) => {
        if (e.originalEvent instanceof MouseEvent) {
            e.preventDefault();
            e.stopPropagation();
        }
        $("#iframe-faust-ui").css("pointer-events", "none");
        const $div = $(e.currentTarget).parent();
        const x = typeof e.pageX === "number" ? e.pageX : e.touches[0].pageX;
        const y = typeof e.pageY === "number" ? e.pageY : e.touches[0].pageY;
        const w = $div.width();
        const h = $div.height();
        const modes: string[] = [];
        if ($(e.currentTarget).hasClass("resizable-left")) modes.push("left");
        if ($(e.currentTarget).hasClass("resizable-right")) modes.push("right");
        if ($(e.currentTarget).hasClass("resizable-top")) modes.push("top");
        if ($(e.currentTarget).hasClass("resizable-bottom")) modes.push("bottom");
        const handleMouseMove = (e: JQuery.TouchMoveEvent | JQuery.MouseMoveEvent) => {
            if (e.originalEvent instanceof MouseEvent) {
                e.preventDefault();
                e.stopPropagation();
            }
            const dX = (typeof e.pageX === "number" ? e.pageX : e.touches[0].pageX) - x;
            const dY = (typeof e.pageY === "number" ? e.pageY : e.touches[0].pageY) - y;
            if (modes.indexOf("left") !== -1) $div.width(w - dX);
            if (modes.indexOf("right") !== -1) $div.width(w + dX);
            if (modes.indexOf("top") !== -1) $div.height(h - dY);
            if (modes.indexOf("bottom") !== -1) $div.height(h + dY);
            if (editor) editor.layout();
            if (wavesurfer.isReady && wavesurfer.drawer.containerWidth !== wavesurfer.drawer.container.clientWidth) {
                wavesurfer.drawer.containerWidth = wavesurfer.drawer.container.clientWidth;
                wavesurfer.drawBuffer();
            }
        };
        const handleMouseUp = (e: JQuery.TouchEndEvent | JQuery.MouseUpEvent) => {
            if (e.originalEvent instanceof MouseEvent) {
                e.preventDefault();
                e.stopPropagation();
            }
            $("#iframe-faust-ui").css("pointer-events", "");
            $(document).off("mousemove touchmove", handleMouseMove);
            $(document).off("mouseup", handleMouseUp);
        };
        $(document).on("mousemove touchmove", handleMouseMove);
        $(document).on("mouseup touchend", handleMouseUp);
    });
    // Panels
    $(".btn-show-left").on("click", (e) => {
        if ($(e.currentTarget).hasClass("active")) {
            $("#left").hide();
            $(".btn-show-left").removeClass(["btn-primary", "active"]).addClass("btn-outline-secondary");
        } else {
            $("#left").show();
            $(".btn-show-left").addClass(["btn-primary", "active"]).removeClass("btn-outline-secondary");
        }
        editor.layout();
    });
    $(".btn-show-right").on("click", (e) => {
        if ($(e.currentTarget).hasClass("active")) {
            $("#right").hide();
            $(".btn-show-right").removeClass(["btn-primary", "active"]).addClass("btn-outline-secondary");
        } else {
            $("#right").show();
            $(".btn-show-right").addClass(["btn-primary", "active"]).removeClass("btn-outline-secondary");
        }
        editor.layout();
    });
    $(window).on("resize", () => {
        if (window.innerWidth <= 900) {
            $("#right").add("#left").hide();
            $(".btn-show-right").add(".btn-show-left").removeClass(["btn-primary", "active"]).addClass("btn-outline-secondary");
        } else {
            $("#right").add("#left").show();
            $(".btn-show-right").add(".btn-show-left").addClass(["btn-primary", "active"]).removeClass("btn-outline-secondary");
        }
    }).resize();
    // autorunning
    await initAudioCtx(audioEnv);
    // Analysers
    initAnalysersUI(uiEnv, audioEnv);
    $("#output-analyser-ui").hide();
    uiEnv.outputScope.disabled = true;
    $<HTMLSelectElement>("#select-audio-input").change();
    await loadURLParams(window.location.search);
    $("#select-voices").children(`option[value=${compileOptions.voices}]`).prop("selected", true);
    $("#select-buffer-size").children(`option[value=${compileOptions.bufferSize}]`).prop("selected", true);
    if (supportAudioWorklet) $("#check-worklet").prop({ disabled: false, checked: true }).change();
    $("#select-plot-mode").children(`option[value=${compileOptions.plotMode}]`).prop("selected", true).change();
    $("#select-plot-fftsize").children(`option[value=${compileOptions.plotFFT}]`).prop("selected", true).change();
    $("#select-plot-fftoverlap").children(`option[value=${compileOptions.plotFFTOverlap}]`).prop("selected", true).change();
    $("#input-plot-samps").change();
    $("#check-draw-spectrogram").change();
    $<HTMLInputElement>("#check-realtime-compile")[0].checked = compileOptions.realtimeCompile;
    if (compileOptions.realtimeCompile && !audioEnv.dsp) setTimeout(updateDiagram, 0, uiEnv.fileManager.mainCode);
    window.faustEnv = faustEnv;
});
/**
 * Init audio environment, audioNodes
 *
 * @param {FaustEditorAudioEnv} audioEnv
 * @param {string} [deviceId]
 * @returns
 */
const initAudioCtx = async (audioEnv: FaustEditorAudioEnv, deviceId?: string) => {
    if (!audioEnv.audioCtx) {
        const audioCtx = new (window.webkitAudioContext || window.AudioContext)({ latencyHint: 0.00001 });
        audioEnv.audioCtx = audioCtx;
        audioEnv.outputEnabled = true;
        audioCtx.addEventListener("statechange", () => {
            if (audioCtx.state === "running") {
                $(".btn-dac").removeClass("btn-light").addClass("btn-primary")
                    .children("span").html("Output is On");
            } else {
                $(".btn-dac").removeClass("btn-primary").addClass("btn-light")
                    .children("span").html("Output is Off");
            }
        });
        const unlockAudioContext = () => {
            if (audioCtx.state !== "suspended") return;
            const unlock = (): any => audioCtx.resume().then(clean);
            // const unlock = (): any => audioCtx.resume().then(() => $<HTMLAudioElement>("#output-audio-stream")[0].play()).then(clean);
            const clean = () => $("body").off("touchstart touchend mousedown keydown", unlock);
            $("body").on("touchstart touchend mousedown keydown", unlock);
        };
        unlockAudioContext();
    }
    if (audioEnv.audioCtx.state !== "running") audioEnv.audioCtx.resume();
    if (!audioEnv.inputs) audioEnv.inputs = {};
    if (deviceId && !audioEnv.inputs[deviceId]) {
        if (deviceId === "-1") {
            if ($("#source-waveform audio").length) audioEnv.inputs[deviceId] = audioEnv.audioCtx.createMediaElementSource($<HTMLAudioElement>("#source-waveform audio")[0]);
        } else {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: { deviceId, echoCancellation: false, noiseSuppression: false, autoGainControl: false } });
            audioEnv.inputs[deviceId] = audioEnv.audioCtx.createMediaStreamSource(stream);
        }
    }
    if (!audioEnv.meterInput) audioEnv.meterInput = createMeterNode(audioEnv.audioCtx);
    if (!audioEnv.gainInput) audioEnv.gainInput = audioEnv.audioCtx.createGain();
    audioEnv.gainInput.connect(audioEnv.meterInput, 0, 0);
    if (!audioEnv.gainUIInput) audioEnv.gainUIInput = new GainUI($<HTMLDivElement>("#input-gain")[0], audioEnv.meterInput, audioEnv.gainInput);
    audioEnv.gainUIInput.value = 0;
    if (!audioEnv.splitterInput) audioEnv.splitterInput = audioEnv.audioCtx.createChannelSplitter(2);
    audioEnv.meterInput.connect(audioEnv.splitterInput, 0, 0);
    if (!audioEnv.analyserInput) audioEnv.analyserInput = audioEnv.audioCtx.createAnalyser();
    if (!audioEnv.analyserOutput) audioEnv.analyserOutput = audioEnv.audioCtx.createAnalyser();
    audioEnv.splitterInput.connect(audioEnv.analyserInput, 0);
    if (!audioEnv.destination) {
        audioEnv.destination = audioEnv.audioCtx.destination;
        /*
        if (supportMediaStreamDestination) {
            audioEnv.destination = audioEnv.audioCtx.createMediaStreamDestination();
            const audio = $("#output-audio-stream")[0] as HTMLAudioElement;
            if ("srcObject" in audio) audio.srcObject = audioEnv.destination.stream;
            else (audio as HTMLAudioElement).src = URL.createObjectURL(audioEnv.destination.stream);
        } else {
            audioEnv.destination = audioEnv.audioCtx.destination;
        }
        */
        audioEnv.destination.channelInterpretation = "discrete";
    }
    return audioEnv;
};
/**
 * Init analyser scopes with audio environment
 *
 * @param {FaustEditorUIEnv} uiEnv
 * @param {FaustEditorAudioEnv} audioEnv
 * @returns
 */
const initAnalysersUI = (uiEnv: FaustEditorUIEnv, audioEnv: FaustEditorAudioEnv) => {
    if (uiEnv.analysersInited) return;
    uiEnv.inputScope = new Scope({
        audioCtx: audioEnv.audioCtx,
        analyser: audioEnv.analyserInput,
        splitter: audioEnv.splitterInput,
        channels: 2,
        container: $<HTMLDivElement>("#input-analyser-ui")[0]
    });
    uiEnv.outputScope = new Scope({
        audioCtx: audioEnv.audioCtx,
        analyser: audioEnv.analyserOutput,
        splitter: audioEnv.splitterOutput,
        channels: 1,
        container: $<HTMLDivElement>("#output-analyser-ui")[0]
    });
    uiEnv.analysersInited = true;
};
/**
 * Update dsp inputs, outputs, params info
 *
 * @param {(FaustAudioWorkletNode | FaustScriptProcessorNode)} [node]
 * @returns
 */
const refreshDspUI = (node?: FaustAudioWorkletNode | FaustScriptProcessorNode) => {
    if (!node) {
        $("#dsp-ui-detail").hide();
        $("#dsp-ui-default").removeClass(["badge-success", "switch"]).addClass("badge-warning").html("no DSP yet");
        return;
    }
    $("#dsp-ui-detail").show();
    if (node instanceof ScriptProcessorNode) {
        $("#dsp-ui-default").removeClass("badge-success").addClass(["badge-warning", "switch"]).html("ScriptProcessor");
    } else {
        $("#dsp-ui-default").removeClass("badge-warning").addClass(["badge-success", "switch"]).html("AudioWorklet");
    }
    $("#dsp-ui-detail-inputs").html(node.getNumInputs().toString());
    $("#dsp-ui-detail-outputs").html(node.getNumOutputs().toString());
    $("#dsp-ui-detail-params").html(node.getParams().length.toString());
};
/**
 * Init editor, register faust language and code hint
 *
 * @returns
 */
const initEditor = async (faust: Faust) => {
    const code = `import("stdfaust.lib");
process = ba.pulsen(1, 10000) : pm.djembe(60, 0.3, 0.4, 1) <: dm.freeverb_demo;`;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const polycode = `import("stdfaust.lib");
process = ba.pulsen(1, ba.hz2midikey(freq) * 1000) : pm.marimba(freq, 0, 7000, 0.5, 0.8) * gate * gain with {
    freq = hslider("freq", 440, 40, 8000, 1);
    gain = hslider("gain", 0.5, 0, 1, 0.01);
    gate = button("gate");
};
effect = dm.freeverb_demo;`;
    const monaco = await import("monaco-editor/esm/vs/editor/editor.api");
    const { faustLang, providers } = await faustLangRegister(monaco, faust);
    let saveCode = false;
    try {
        saveCode = JSON.parse(localStorage.getItem("faust_editor_params")).saveCode;
    } catch {} // eslint-disable-line no-empty
    const editor = monaco.editor.create($("#editor")[0], {
        value: saveCode ? (localStorage.getItem("faust_editor_code") || code) : code,
        language: "faust",
        theme: "vs-dark",
        dragAndDrop: true,
        mouseWheelZoom: true,
        wordWrap: "on"
    });
    editor.onKeyDown((e) => {
        if (e.ctrlKey && e.browserEvent.key === "d") {
            e.stopPropagation();
            e.preventDefault();
            showDoc();
        }
    });
    const faustDocURL = "https://faust.grame.fr/doc/libraries/";
    const showDoc = () => {
        const matched = faustLang.matchDocKey(providers.docs, editor.getModel(), editor.getPosition());
        if (matched) {
            const prefix = matched.nameArray.slice();
            prefix.pop();
            const doc = matched.doc;
            $("#a-docs").attr("href", `${faustDocURL}#${prefix.length ? prefix.join(".") + "." : ""}${doc.name.replace(/[[\]|]/g, "").toLowerCase()}`)[0].click();
            return;
        }
        $("#a-docs").attr("href", faustDocURL)[0].click();
    };
    $("#btn-docs").off("click").on("click", showDoc);
    $(window).on("resize", () => editor.layout());
    return { editor, monaco };
};
