/* eslint-disable newline-per-chained-call */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-use-before-define */
// import { Faust } from "faust2webaudio";
// TODO
// webworkerify
// bargraph in scopes
// touch
// plot scope

import * as monaco from "monaco-editor"; // eslint-disable-line import/no-unresolved
import webmidi, { Input } from "webmidi";
import * as QRCode from "qrcode";
import * as WaveSurfer from "wavesurfer.js";
import { FaustScriptProcessorNode, FaustAudioWorkletNode, Faust } from "faust2webaudio";
import { Key2Midi } from "./Key2Midi";
import { Scope } from "./Scope";
import * as faustlang from "./monaco-faust";
import "bootstrap/js/dist/dropdown";
import "bootstrap/js/dist/tab";
import "bootstrap/js/dist/tooltip";
import "bootstrap/js/dist/modal";
import "@fortawesome/fontawesome-free/css/all.css";
import "bootstrap/scss/bootstrap.scss";
import "./index.scss";
import { StaticScope } from "./StaticScope";

declare global {
    interface Window {
        AudioContext: typeof AudioContext;
        webkitAudioContext: typeof AudioContext;
        AudioWorklet?: typeof AudioWorklet; // eslint-disable-line no-undef
        faustEnv: FaustEditorEnv;
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
};
type FaustEditorAudioEnv = {
    audioCtx?: AudioContext;
    splitterInput?: ChannelSplitterNode;
    analyserInput?: AnalyserNode;
    splitterOutput?: ChannelSplitterNode;
    analyserOutput?: AnalyserNode;
    inputs?: { [deviceId: string]: MediaStreamAudioSourceNode | MediaElementAudioSourceNode };
    currentInput?: string;
    mediaDestination?: MediaStreamAudioDestinationNode;
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
};
type FaustEditorCompileOptions = {
    name: string;
    useWorklet: boolean;
    bufferSize: 128 | 256 | 512 | 1024 | 2048 | 4096;
    saveParams: boolean;
    saveDsp: boolean;
    realtimeCompile: boolean;
    popup: boolean;
    voices: number;
    enableRtPlot: boolean;
    plot: number;
    plotSR: number;
    args: { [key: string]: any };
};
type FaustExportTargets = { [platform: string]: string[] };
$(async () => {
    // Async Load Faust Core
    const { Faust } = await import("faust2webaudio");
    const faust = new Faust();
    await faust.ready;
    const saveEditorDspTable = () => {
        localStorage.setItem("faust_editor_dsp_table", faust.stringifyDspTable());
    };
    const loadEditorDspTable = () => {
        const str = localStorage.getItem("faust_editor_dsp_table");
        if (str) faust.parseDspTable(str);
    };
    const saveEditorParams = () => {
        const str = JSON.stringify(compileOptions);
        localStorage.setItem("faust_editor_params", str);
    };
    const loadEditorParams = (): FaustEditorCompileOptions | {} => {
        const str = localStorage.getItem("faust_editor_params");
        if (!str) return {};
        try {
            return JSON.parse(localStorage.getItem("faust_editor_params")) as FaustEditorCompileOptions;
        } catch (e) {
            return {};
        }
    };
    const showError = (str: string) => {
        $(".alert-faust-code>span").text(str);
        $("#alert-faust-code").css("visibility", "visible");
    };
    // Async load Monaco Editor
    const editor = await initEditor();
    editor.layout();
    // Editor and Diagram
    let editorDecoration: string[] = [];
    const getDiagram = (code: string): { success: boolean; error?: Error } => {
        let svg: string;
        editorDecoration = editor.deltaDecorations(editorDecoration, []);
        try {
            svg = faust.getDiagram(code, ["-I", compileOptions.args["-I"]]);
        } catch (e) {
            const matchLine = e.toString().match(/FaustDSP : (\d+)/);
            if (matchLine) {
                const line = matchLine[1];
                editorDecoration = editor.deltaDecorations(editorDecoration, [
                    {
                        range: new monaco.Range(line, 1, line, 1),
                        options: { isWholeLine: true, linesDecorationsClassName: "monaco-decoration-error" }
                    }
                ]);
            }
            showError(e);
            return { error: e, success: false };
        }
        const $svg = $("#diagram-svg>svg");
        const curWidth = $svg.length ? $svg.width() : "100%";
        $("#diagram-svg").empty().html(svg).children("svg").width(curWidth);
        $("#diagram-default").hide();
        $("#alert-faust-code").css("visibility", "hidden");
        $("#diagram-svg").show();
        return { success: true };
    };
    // dsp Compiler
    const runDsp = async (code: string): Promise<{ success: boolean; error?: Error }> => {
        const audioCtx = audioEnv.audioCtx;
        const input = audioEnv.inputs[audioEnv.currentInput];
        let splitter = audioEnv.splitterOutput;
        const analyser = audioEnv.analyserOutput;
        if (!audioCtx) {
            await initAudioCtx(audioEnv);
            initAnalysersUI(uiEnv, audioEnv);
        }
        const { useWorklet, bufferSize, voices, args, enableRtPlot, plot } = compileOptions;
        let node: FaustScriptProcessorNode | FaustAudioWorkletNode;
        try {
            // const getDiagramResult = getDiagram(code);
            // if (!getDiagramResult.success) throw getDiagramResult.error;
            node = await faust.getNode(code, { audioCtx, useWorklet, bufferSize, voices, args, plotHandler: uiEnv.plotScope.draw, plot: enableRtPlot ? plot : undefined });
            if (!node) throw new Error("Unknown Error in WebAudio Node.");
        } catch (e) { /*
            const uiWindow = ($("#iframe-faust-ui")[0] as HTMLIFrameElement).contentWindow;
            uiWindow.postMessage(JSON.stringify({ type: "clear" }), "*");
            $("#faust-ui-default").show();
            $("#iframe-faust-ui").css("visibility", "hidden");
            $("#output-analyser-ui").hide();
            refreshDspUI(); */
            showError(e);
            return { success: false, error: e };
        }
        if ($("#tab-diagram").hasClass("active")) setTimeout(getDiagram, 0, code);
        $("#tab-diagram").off("show.bs.tab").one("show.bs.tab", () => getDiagram(code));
        if (audioEnv.dsp) { // Disconnect current
            const dsp = audioEnv.dsp;
            if (audioEnv.dspConnectedToInput) {
                input.disconnect(dsp);
                audioEnv.dspConnectedToInput = false;
            }
            dsp.disconnect();
            audioEnv.dspConnectedToOutput = false;
            delete audioEnv.dsp;
        }
        let dspParams: { [path: string]: number } = {};
        if (compileOptions.saveParams) {
            const strDspParams = localStorage.getItem("faust_editor_dsp_params");
            if (strDspParams) {
                dspParams = JSON.parse(strDspParams);
                for (const path in dspParams) {
                    if (node.getParams().indexOf(path) !== -1) {
                        node.setParamValue(path, dspParams[path]);
                    }
                }
            }
        }
        audioEnv.dsp = node;
        const channelsCount = node.getNumOutputs();
        if (!splitter || splitter.numberOfOutputs !== channelsCount) {
            if (splitter) splitter.disconnect(analyser);
            splitter = audioCtx.createChannelSplitter(channelsCount);
            delete audioEnv.splitterOutput;
            audioEnv.splitterOutput = splitter;
            uiEnv.outputScope.splitter = splitter;
            uiEnv.outputScope.channels = channelsCount;
            uiEnv.outputScope.channel = Math.min(uiEnv.outputScope.channel, channelsCount - 1);
            splitter.connect(analyser, uiEnv.outputScope.channel);
        }
        if (audioEnv.inputEnabled && node.getNumInputs()) {
            audioEnv.inputs[audioEnv.currentInput].connect(node);
            audioEnv.dspConnectedToInput = true;
        }
        node.connect(splitter);
        if (audioEnv.outputEnabled) {
            node.connect(audioEnv.audioCtx.destination);
            audioEnv.dspConnectedToOutput = true;
        }
        const bindUI = () => {
            const callback = () => {
                const msg = JSON.stringify({ type: "ui", json: node.getJSON() });
                uiWindow.postMessage(msg, "*");
                if (uiEnv.uiPopup) uiEnv.uiPopup.postMessage(msg, "*");
                node.setOutputParamHandler((path: string, value: number) => {
                    const msg = JSON.stringify({ path, value, type: "param" });
                    uiWindow.postMessage(msg, "*");
                    if (uiEnv.uiPopup) uiEnv.uiPopup.postMessage(msg, "*");
                });
                if (compileOptions.saveParams) {
                    const params = node.getParams();
                    for (const path in dspParams) {
                        if (params.indexOf(path) !== -1) {
                            const msg = JSON.stringify({ path, value: dspParams[path], type: "param" });
                            uiWindow.postMessage(msg, "*");
                            if (uiEnv.uiPopup) uiEnv.uiPopup.postMessage(msg, "*");
                        }
                    }
                }
            };
            const uiWindow = ($("#iframe-faust-ui")[0] as HTMLIFrameElement).contentWindow;
            if (!compileOptions.popup || (uiEnv.uiPopup && !uiEnv.uiPopup.closed)) callback();
            else {
                uiEnv.uiPopup = window.open("faust_ui.html", "Faust DSP", "directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=800,height=600");
                uiEnv.uiPopup.onload = callback;
            }
        };
        bindUI();
        $("#alert-faust-code").css("visibility", "hidden");
        $("#faust-ui-default").hide();
        $("#nav-item-faust-ui").show();
        $("#iframe-faust-ui").css("visibility", "visible");
        $("#output-analyser-ui").show();
        refreshDspUI(node);
        saveEditorDspTable();
        return { success: true };
    };
    let rtCompileTimer: NodeJS.Timeout;
    editor.onKeyUp(() => {
        const code = editor.getValue();
        if (localStorage.getItem("faust_editor_code") === code) return;
        localStorage.setItem("faust_editor_code", code);
        clearTimeout(rtCompileTimer);
        if (compileOptions.realtimeCompile) rtCompileTimer = setTimeout(audioEnv.dsp ? runDsp : getDiagram, 1000, code);
    });

    const audioEnv: FaustEditorAudioEnv = { dspConnectedToInput: false, dspConnectedToOutput: false, inputEnabled: false, outputEnabled: false };
    const midiEnv: FaustEditorMIDIEnv = { input: null };
    const uiEnv: FaustEditorUIEnv = { analysersInited: false, inputScope: null, outputScope: null, plotScope: new StaticScope({ container: $("#plot-ui")[0] as HTMLDivElement }) };
    const compileOptions: FaustEditorCompileOptions = { name: "untitled", useWorklet: false, bufferSize: 1024, saveParams: false, saveDsp: false, realtimeCompile: true, popup: false, voices: 0, args: { "-I": "https://faust.grame.fr/tools/editor/libraries/" }, enableRtPlot: false, plot: 256, plotSR: 48000, ...loadEditorParams() };
    const faustEnv: FaustEditorEnv = { audioEnv, midiEnv, uiEnv, compileOptions, jQuery, editor, faust };
    if (compileOptions.saveDsp) loadEditorDspTable();
    // Alerts
    $(".alert>.close").on("click", e => $(e.currentTarget).parent().css("visibility", "hidden"));
    $(".a-alert-faust-code-detail").on("click", e => $("#modal-alert-faust-code-detail .modal-body").text($(e.currentTarget).siblings("span").text()));
    // Tooltips
    $('[data-toggle="tooltip"]').tooltip({ trigger: "hover" });
    $("#btn-export").tooltip({ trigger: "hover" });
    $("#btn-share").tooltip({ trigger: "hover" });
    // Voices
    $("#select-voices").on("change", (e) => {
        compileOptions.voices = +(e.currentTarget as HTMLInputElement).value;
        saveEditorParams();
        if (compileOptions.realtimeCompile && audioEnv.dsp) runDsp(editor.getValue());
    });
    // BufferSize
    $("#select-buffer-size").on("change", (e) => {
        compileOptions.bufferSize = +(e.currentTarget as HTMLInputElement).value as 128 | 256 | 512 | 1024 | 2048 | 4096;
        saveEditorParams();
        if (compileOptions.realtimeCompile && audioEnv.dsp) runDsp(editor.getValue());
    });
    // AudioWorklet
    $("#check-worklet").on("change", (e) => {
        compileOptions.useWorklet = (e.currentTarget as HTMLInputElement).checked;
        if (compileOptions.useWorklet) $("#select-buffer-size").prop("disabled", true).children("option").eq(0).prop("selected", true);
        else $("#select-buffer-size").prop("disabled", false).children("option").eq([128, 256, 512, 1024, 2048, 4096].indexOf(compileOptions.bufferSize)).prop("selected", true);
        saveEditorParams();
        if (compileOptions.realtimeCompile && audioEnv.dsp) runDsp(editor.getValue());
    });
    // Save Params
    ($("#check-save-params").on("change", (e) => {
        compileOptions.saveParams = (e.currentTarget as HTMLInputElement).checked;
        saveEditorParams();
    })[0] as HTMLInputElement).checked = compileOptions.saveParams;
    // Save DSP
    ($("#check-save-dsp").on("change", (e) => {
        compileOptions.saveDsp = (e.currentTarget as HTMLInputElement).checked;
        loadEditorDspTable();
        saveEditorParams();
    })[0] as HTMLInputElement).checked = compileOptions.saveDsp;
    if (compileOptions.saveDsp) loadEditorDspTable();
    // Real-time Diagram
    $("#check-realtime-compile").on("change", (e) => {
        compileOptions.realtimeCompile = (e.currentTarget as HTMLInputElement).checked;
        saveEditorParams();
        if (compileOptions.realtimeCompile) {
            const code = editor.getValue();
            if (audioEnv.dsp) runDsp(code);
            else getDiagram(code);
        }
    });
    // Save Params
    ($("#check-popup").on("change", (e) => {
        compileOptions.popup = (e.currentTarget as HTMLInputElement).checked;
        saveEditorParams();
    })[0] as HTMLInputElement).checked = compileOptions.popup;
    // Plot
    ($("#check-plot-rt").on("change", (e) => {
        compileOptions.enableRtPlot = (e.currentTarget as HTMLInputElement).checked;
        $("#btn-plot").children("span").text("Plot " + (compileOptions.enableRtPlot ? "(Snapshot)" : "First Samples"));
        if (compileOptions.enableRtPlot) ($("#input-plot-sr").prop("disabled", true)[0] as HTMLInputElement).value = audioEnv.audioCtx ? audioEnv.audioCtx.sampleRate.toString() : "48000";
        else ($("#input-plot-sr").prop("disabled", false)[0] as HTMLInputElement).value = compileOptions.plotSR.toString();
        saveEditorParams();
    })[0] as HTMLInputElement).checked = compileOptions.enableRtPlot;
    $("#btn-plot").on("click", () => {
        if (compileOptions.enableRtPlot) {
            if (audioEnv.dsp) audioEnv.dsp.replot(compileOptions.plot).then(uiEnv.plotScope.draw);
            else runDsp(editor.getValue());
        } else {
            const code = editor.getValue();
            const { args, plot, plotSR } = compileOptions;
            faustEnv.faust.plot({ code, args, size: plot, sampleRate: plotSR }).then(uiEnv.plotScope.draw);
            if (!$("#tab-plot-ui").hasClass("active")) $("#tab-plot-ui").tab("show");
        }
    });
    ($("#input-plot-samps").on("change", (e) => {
        const v = +(e.currentTarget as HTMLInputElement).value;
        const bufferSize = (compileOptions.useWorklet ? 128 : compileOptions.bufferSize);
        const v1 = Math.max((v === compileOptions.plot - 1 ? Math.floor(v / bufferSize) : Math.ceil(v / bufferSize)) * bufferSize, bufferSize); // Spinner
        compileOptions.plot = v1;
        (e.currentTarget as HTMLInputElement).value = v1.toString();
        saveEditorParams();
    })[0] as HTMLInputElement).value = compileOptions.plot.toString();
    ($("#input-plot-sr").on("change", (e) => {
        const v = +(e.currentTarget as HTMLInputElement).value;
        const v1 = Math.max((v === compileOptions.plotSR - 1 ? Math.floor(v / 100) : Math.ceil(v / 100)) * 100, 1); // Spinner
        compileOptions.plotSR = v1;
        (e.currentTarget as HTMLInputElement).value = v1.toString();
        saveEditorParams();
    })[0] as HTMLInputElement).value = compileOptions.plotSR.toString();
    /**
     * Load stuffs from URL
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
        let code;
        if (urlParams.has("code")) {
            const codeURL = urlParams.get("code");
            compileOptions.name = codeURL.split("/").slice(-1)[0].split(".").slice(0, -1).join(".");
            $("#input-filename").val(compileOptions.name);
            const response = await fetch(codeURL);
            code = await response.text();
        }
        if (urlParams.has("code_string")) {
            code = urlParams.get("code_string");
        }
        if (urlParams.has("inline")) {
            const b64Code = urlParams.get("inline").replace("-", "+").replace("_", "/");
            code = atob(b64Code);
        }
        if (urlParams.has("name")) {
            const name = urlParams.get("name");
            compileOptions.name = name;
            $("#input-filename").val(compileOptions.name);
            saveEditorParams();
        }
        if (code) {
            editor.setValue(code);
            localStorage.setItem("faust_editor_code", code);
            saveEditorParams();
            if (urlParams.has("autorun") && urlParams.get("autorun")) {
                const compileResult = await runDsp(code);
                if (!compileResult.success) return;
                if (!$("#tab-faust-ui").hasClass("active")) $("#tab-faust-ui").tab("show");
            }
        }
    };
    // MIDI Devices
    const key2Midi = new Key2Midi({ keyMap: navigator.language === "fr-FR" ? Key2Midi.KEY_MAP_FR : Key2Midi.KEY_MAP, enabled: false });
    $(document).on("keydown", (e) => {
        if (faustEnv.editor && faustEnv.editor.hasTextFocus()) return;
        key2Midi.handleKeyDown(e.key);
    });
    $(document).on("keyup", (e) => {
        if (faustEnv.editor && faustEnv.editor.hasTextFocus()) return;
        key2Midi.handleKeyUp(e.key);
    });
    $("#select-midi-input").on("change", (e) => {
        const id = (e.currentTarget as HTMLSelectElement).value;
        if (midiEnv.input) midiEnv.input.removeListener("midimessage", "all");
        const keys: number[] = [];
        const listener = (data: number[] | Uint8Array) => {
            if (audioEnv.dsp) audioEnv.dsp.midiMessage(data);
            if (data[0] === 144) {
                if (data[2]) {
                    if (keys.indexOf(data[1]) === -1) keys.push(data[1]);
                    $("#midi-ui-note").text(data[1]).show();
                } else {
                    keys.splice(keys.indexOf(data[1]), 1);
                    if (keys.length === 0) $("#midi-ui-note").hide();
                    else $("#midi-ui-note").text(keys[keys.length - 1]);
                }
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
    webmidi.enable((e) => {
        if (e) return;
        $("#midi-ui-default").hide();
        const $select = $("#select-midi-input").prop("disabled", false);
        webmidi.inputs.forEach(input => $select.append(new Option(input.name, input.id)));
        if (webmidi.inputs.length) $select.children("option").eq(2).prop("selected", true).change();
    });
    // Audio Inputs
    let wavesurfer: WaveSurfer;
    $("#select-audio-input").on("change", async (e) => {
        const id = (e.currentTarget as HTMLSelectElement).value;
        if (audioEnv.currentInput === id) return;
        if (audioEnv.audioCtx) {
            const splitter = audioEnv.splitterInput;
            const dsp = audioEnv.dsp;
            const input = audioEnv.inputs[audioEnv.currentInput];
            if (splitter) input.disconnect(splitter);
            if (dsp && audioEnv.dspConnectedToInput && dsp.getNumInputs()) { // Disconnect
                input.disconnect(dsp);
                audioEnv.dspConnectedToInput = false;
            }
        }
        // MediaElementSource, Waveform
        if (id === "-1") $("#source-ui").show();
        else $("#source-ui").hide();
        await initAudioCtx(audioEnv);
        initAnalysersUI(uiEnv, audioEnv);
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
            wavesurfer.on("play", () => $("#btn-source-play .fa-play").removeClass("fa-play").addClass("fa-pause"));
            wavesurfer.on("pause", () => $("#btn-source-play .fa-pause").removeClass("fa-pause").addClass("fa-play"));
            wavesurfer.on("finish", () => {
                if ($("#btn-source-loop").hasClass("active")) wavesurfer.play();
                else $("#btn-source-play .fa-pause").removeClass("fa-pause").addClass("fa-play");
            });
            wavesurfer.load("./02-XYLO1.mp3");
            if ($("#source-waveform audio").length) {
                audioEnv.inputs[-1] = audioEnv.audioCtx.createMediaElementSource($("#source-waveform audio")[0] as HTMLMediaElement);
            }
        }
        await initAudioCtx(audioEnv, id);
        const splitter = audioEnv.splitterInput;
        const dsp = audioEnv.dsp;
        const input = audioEnv.inputs[id];
        audioEnv.currentInput = id;
        audioEnv.inputEnabled = true;
        if (splitter) input.connect(splitter);
        if (dsp && dsp.getNumInputs()) {
            input.connect(dsp);
            audioEnv.dspConnectedToInput = true;
        }
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
            const splitter = audioEnv.splitterInput;
            const analyser = audioEnv.analyserInput;
            const dsp = audioEnv.dsp;
            let input = audioEnv.inputs[-1];
            if (analyser && input) input.disconnect(splitter);
            if (dsp && audioEnv.dspConnectedToInput && dsp.getNumInputs()) { // Disconnect
                input.disconnect(dsp);
                audioEnv.dspConnectedToInput = false;
            }
            audioEnv.inputEnabled = false;

            const file = event.dataTransfer.files[0];
            try {
                wavesurfer.load(URL.createObjectURL(file));
            } catch (e) {
                console.error(e); // eslint-disable-line no-console
                showError("Cannot load sound file: " + e);
                return;
            }
            if ($("#source-waveform audio").length) {
                audioEnv.inputs[-1] = audioEnv.audioCtx.createMediaElementSource($("#source-waveform audio")[0] as HTMLMediaElement);
                input = audioEnv.inputs[-1];
            }
            audioEnv.inputEnabled = true;
            if (analyser && input) input.connect(splitter);
            if (dsp && dsp.getNumInputs()) {
                input.connect(dsp);
                audioEnv.dspConnectedToInput = true;
            }
        }
    });
    if (navigator.mediaDevices) {
        navigator.mediaDevices.enumerateDevices().then((devices) => {
            $("#input-ui-default").hide();
            const $select = $("#select-audio-input").prop("disabled", false);
            devices.forEach((device) => {
                if (device.kind === "audioinput") $select.append(new Option(device.label || device.deviceId, device.deviceId));
            });
        });
    }
    // DSP
    refreshDspUI();
    // Output
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
            $(".btn-dac").removeClass("btn-primary").addClass("btn-light")
                .children("span").html("Output is Off");
            audioEnv.outputEnabled = false;
            if (audioEnv.dspConnectedToOutput) {
                audioEnv.dsp.disconnect(audioEnv.audioCtx.destination);
                audioEnv.dspConnectedToOutput = false;
            }
        } else {
            audioEnv.outputEnabled = true;
            if (!audioEnv.audioCtx) {
                await initAudioCtx(audioEnv);
                initAnalysersUI(uiEnv, audioEnv);
            } else if (audioEnv.dsp) {
                audioEnv.dsp.connect(audioEnv.audioCtx.destination);
                audioEnv.dspConnectedToOutput = true;
            }
            $(".btn-dac").removeClass("btn-light").addClass("btn-primary")
                .children("span").html("Output is On");
        }
    });
    // Upload
    $("#btn-upload").on("click", () => {
        $("#input-upload").click();
    });
    $("#input-upload").on("input", (e) => {
        const file = (e.currentTarget as HTMLInputElement).files[0];
        const reader = new FileReader();
        reader.onload = () => {
            compileOptions.name = file.name.split(".").slice(0, -1).join(".");
            $("#input-filename").val(compileOptions.name);
            const code = reader.result.toString();
            editor.setValue(code);
            localStorage.setItem("faust_editor_code", code);
            saveEditorParams();
            if (compileOptions.realtimeCompile) {
                if (audioEnv.dsp) runDsp(code);
                else getDiagram(code);
            }
        };
        reader.onerror = () => undefined;
        reader.readAsText(file);
    }).on("click", e => e.stopPropagation());
    // Save as
    $("#btn-save").on("click", () => {
        const text = editor.getValue();
        const uri = "data:text/plain;charset=utf-8," + encodeURIComponent(text);
        $("#a-save").attr({ href: uri, download: compileOptions.name + ".dsp" })[0].click();
    });
    $("#a-save").on("click", e => e.stopPropagation());
    // Docs
    $("#btn-docs").on("click", () => $("#a-docs")[0].click());
    $("#a-docs").on("click", e => e.stopPropagation());
    // Export
    const server = "https://faustservicecloud.grame.fr";
    fetch(`${server}/targets`)
        .then(response => response.json())
        .then((targets: FaustExportTargets) => {
            const plats = Object.keys(targets);
            if (plats.length) {
                $("#export-platform").add("#export-arch").empty();
                plats.forEach((plat, i) => $("#export-platform").append(new Option(plat, plat, i === 0)));
                targets[plats[0]].forEach((arch, i) => $("#export-arch").append(new Option(arch, arch, i === 0)));
            }
            $("#modal-export").on("shown.bs.modal", () => $("#export-name").val(compileOptions.name));
            $("#export-platform").on("change", (e) => {
                const plat = (e.currentTarget as HTMLSelectElement).value;
                $("#export-arch").empty();
                targets[plat].forEach((arch, i) => $("#export-arch").append(new Option(arch, arch, i === 0)));
            });
            $("#export-download").on("click", () => $("#a-export-download")[0].click());
            $("#a-export-download").on("click", e => e.stopPropagation());
            $("#export-submit").on("click", () => {
                $("#export-download").hide();
                $("#export-loading").css("display", "inline-block");
                $("#qr-code").hide();
                $("#export-error").hide();
                const form = new FormData();
                form.append("file", new File([editor.getValue()], `${$("#export-name").val()}.dsp`));
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
                                $("#qr-code").show();
                                QRCode.toCanvas(
                                    $("#qr-code")[0] as HTMLCanvasElement,
                                    `${path}/${plat === "android" ? "binary.apk" : "binary.zip"}`,
                                );
                                return;
                            }
                            $("#export-loading").css("display", "none");
                            $("#export-error").html(result).show();
                        }).fail((jqXHR, textStatus) => {
                            $("#export-error").html(textStatus + ": " + jqXHR.responseText).show();
                        }).always(() => $("#export-loading").css("display", "none"));
                        return;
                    }
                    $("#export-loading").css("display", "none");
                    $("#export-error").html(shaKey).show();
                }).fail((jqXHR, textStatus) => {
                    $("#export-loading").css("display", "none");
                    $("#export-error").html(textStatus + ": " + jqXHR.responseText).show();
                });
            });
        }).catch(() => {
            $("#btn-export").prop("disabled", "true");
        });
    // Share
    const makeURL = () => {
        const base = window.location.origin + window.location.pathname;
        const urlParams = new URLSearchParams();
        urlParams.set("autorun", $("#share-autorun").prop("checked") ? "1" : "0");
        urlParams.set("voices", compileOptions.voices.toString());
        urlParams.set("name", compileOptions.name);
        urlParams.set("inline", btoa(editor.getValue()).replace("+", "-").replace("/", "_"));
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
                compileOptions.name = file.name.split(".").slice(0, -1).join(".");
                $("#input-filename").val(compileOptions.name);
                const code = reader.result.toString();
                editor.setValue(code);
                localStorage.setItem("faust_editor_code", code);
                saveEditorParams();
                if (compileOptions.realtimeCompile) {
                    if (audioEnv.dsp) runDsp(code);
                    else getDiagram(code);
                }
            };
            reader.onerror = () => undefined;
            reader.readAsText(file);
        }
    });
    $("#input-filename").val(compileOptions.name).on("keyup", (e) => {
        compileOptions.name = $(e.currentTarget).val() as string;
        saveEditorParams();
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
                    const $submenu = $("<div>").addClass("dropdown-menu");
                    $item.append($a, $submenu);
                    treeIn.children.forEach(v => parseTree(v, $submenu));
                    $menu.append($item);
                    $a.dropdown();
                }
            };
            if (tree.children) tree.children.forEach(v => parseTree(v, $menu));
        });
    $("#tab-examples").on("click", ".faust-example", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const path = $(e.currentTarget).data("path");
        const name = $(e.currentTarget).text();
        if (path) {
            fetch("../" + path)
                .then(response => response.text())
                .then((code) => {
                    compileOptions.name = name.split(".").slice(0, -1).join(".");
                    $("#input-filename").val(compileOptions.name);
                    editor.setValue(code);
                    localStorage.setItem("faust_editor_code", code);
                    saveEditorParams();
                    if (compileOptions.realtimeCompile) {
                        if (audioEnv.dsp) runDsp(code);
                        else getDiagram(code);
                    }
                });
        }
        $("#tab-examples").dropdown("toggle");
    });
    // Run Dsp Button
    $(".btn-run").prop("disabled", false).on("click", async () => {
        const compileResult = await runDsp(editor.getValue());
        if (!compileResult.success) return;
        if ($("#tab-diagram").hasClass("active") || !compileOptions.enableRtPlot) $("#tab-faust-ui").tab("show");
        // const dspOutputHandler = FaustUI.main(node.getJSON(), $("#faust-ui"), (path: string, val: number) => node.setParamValue(path, val));
        // node.setOutputParamHandler(dspOutputHandler);
    });
    const dspParams: { [path: string]: number } = {};
    $(window).on("message", (e) => {
        if (!(e.originalEvent as MessageEvent).data) return;
        const data = JSON.parse((e.originalEvent as MessageEvent).data);
        if (data.type === "param") {
            if (audioEnv.dsp) audioEnv.dsp.setParamValue(data.path, +data.value);
            if (compileOptions.saveParams) {
                dspParams[data.path] = +data.value;
                localStorage.setItem("faust_editor_dsp_params", JSON.stringify(dspParams));
            }
            const uiWindow = ($("#iframe-faust-ui")[0] as HTMLIFrameElement).contentWindow;
            const msg = JSON.stringify({ path: data.path, value: +data.value, type: "param" });
            uiWindow.postMessage(msg, "*");
            if (uiEnv.uiPopup) uiEnv.uiPopup.postMessage(msg, "*");
            return;
        }
        if (data.type === "keydown") key2Midi.handleKeyDown(data.key);
        else if (data.type === "keyup") key2Midi.handleKeyUp(data.key);
    });
    $(window).on("beforeunload", () => (uiEnv.uiPopup ? uiEnv.uiPopup.close() : undefined));
    $("#nav-item-faust-ui .btn-close-tab").on("click", (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (audioEnv.dsp) { // Disconnect current
            const input = audioEnv.inputs[audioEnv.currentInput];
            const dsp = audioEnv.dsp;
            if (audioEnv.dspConnectedToInput) {
                input.disconnect(dsp);
                audioEnv.dspConnectedToInput = false;
            }
            dsp.disconnect();
            audioEnv.dspConnectedToOutput = false;
            delete audioEnv.dsp;
        }
        if ($("#tab-faust-ui").hasClass("active")) $("#tab-diagram").tab("show");
        $("#nav-item-faust-ui").hide();
        const msg = JSON.stringify({ type: "clear" });
        const uiWindow = ($("#iframe-faust-ui")[0] as HTMLIFrameElement).contentWindow;
        uiWindow.postMessage(msg, "*");
        if (uiEnv.uiPopup) {
            uiEnv.uiPopup.postMessage(msg, "*");
            uiEnv.uiPopup.close();
        }
        $("#faust-ui-default").show();
        $("#iframe-faust-ui").css("visibility", "hidden");
        $("#output-analyser-ui").hide();
        refreshDspUI();
    });
    let svgDragged = false;
    // svg inject
    $("#diagram-svg").on("click", "a", (e) => {
        e.preventDefault();
        if (svgDragged) return;
        const fileName = (e.currentTarget as SVGAElement).href.baseVal;
        const svg = faust.readFile("FaustDSP-svg/" + fileName);
        $("#diagram-svg").empty().html(svg);
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
        const d = (e.originalEvent as WheelEvent).deltaY / 100;
        const w = $svg.width();
        $svg.width(w * (1 - d * 0.25));
    });
    // Analysers
    $("#output-analyser-ui").hide();
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
    $(".resizable").on("mousedown", (e) => {
        e.preventDefault();
        e.stopPropagation();
        $("#iframe-faust-ui").css("pointer-events", "none");
        const $div = $(e.currentTarget).parent();
        const x = e.pageX;
        const y = e.pageY;
        const w = $div.width();
        const h = $div.height();
        const modes: string[] = [];
        if ($(e.currentTarget).hasClass("resizable-left")) modes.push("left");
        if ($(e.currentTarget).hasClass("resizable-right")) modes.push("right");
        if ($(e.currentTarget).hasClass("resizable-top")) modes.push("top");
        if ($(e.currentTarget).hasClass("resizable-bottom")) modes.push("bottom");
        const handleMouseMove = (e: JQuery.MouseMoveEvent) => {
            e.preventDefault();
            e.stopPropagation();
            const dX = e.pageX - x;
            const dY = e.pageY - y;
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
        const handleMouseUp = (e: JQuery.MouseUpEvent) => {
            e.preventDefault();
            e.stopPropagation();
            $("#iframe-faust-ui").css("pointer-events", "");
            $(document).off("mousemove", handleMouseMove);
            $(document).off("mouseup", handleMouseUp);
        };
        $(document).on("mousemove", handleMouseMove);
        $(document).on("mouseup", handleMouseUp);
    });
    // Panels
    $(".btn-show-left").on("click", (e) => {
        if ($(e.currentTarget).hasClass("active")) {
            $("#left").css("visibility", "hidden");
            $(".btn-show-left").removeClass(["btn-primary", "active"]).addClass("btn-outline-secondary");
        } else {
            $("#left").css("visibility", "visible");
            $(".btn-show-left").addClass(["btn-primary", "active"]).removeClass("btn-outline-secondary");
        }
    });
    $(".btn-show-right").on("click", (e) => {
        if ($(e.currentTarget).hasClass("active")) {
            $("#right").css("visibility", "hidden");
            $(".btn-show-right").removeClass(["btn-primary", "active"]).addClass("btn-outline-secondary");
        } else {
            $("#right").css("visibility", "visible");
            $(".btn-show-right").addClass(["btn-primary", "active"]).removeClass("btn-outline-secondary");
        }
    });
    $(window).on("resize", () => {
        if (window.innerWidth <= 900) {
            $("#right").add("#left").css({ visibility: "hidden" });
            $(".btn-show-right").add(".btn-show-left").removeClass(["btn-primary", "active"]).addClass("btn-outline-secondary");
        } else {
            $("#right").add("#left").css({ visibility: "visible", height: "" });
            $(".btn-show-right").add(".btn-show-left").addClass(["btn-primary", "active"]).removeClass("btn-outline-secondary");
        }
    });
    // autorunning
    await loadURLParams(window.location.search);
    $("#select-voices").children(`option[value=${compileOptions.voices}]`).prop("selected", true);
    $("#select-buffer-size").children(`option[value=${compileOptions.bufferSize}]`).prop("selected", true);
    if (window.AudioWorklet) $("#check-worklet").prop({ disabled: false, checked: true }).change();
    $("#check-plot-rt").change();
    ($("#check-realtime-compile")[0] as HTMLInputElement).checked = compileOptions.realtimeCompile;
    if (compileOptions.realtimeCompile && !audioEnv.dsp) setTimeout(getDiagram, 0, editor.getValue());
    window.faustEnv = faustEnv;
});
const initAudioCtx = async (audioEnv: FaustEditorAudioEnv, deviceId?: string) => {
    if (!audioEnv.audioCtx) {
        const audioCtx = new (window.webkitAudioContext || window.AudioContext)();
        audioEnv.audioCtx = audioCtx;
        audioEnv.outputEnabled = true;
        audioCtx.addEventListener("statechange", () => {
            if (audioCtx.state === "running") {
                audioEnv.outputEnabled = true;
                $(".btn-dac").removeClass("btn-light").addClass("btn-primary")
                    .children("span").html("Output is On");
            } else {
                audioEnv.outputEnabled = false;
                $(".btn-dac").removeClass("btn-primary").addClass("btn-light")
                    .children("span").html("Output is Off");
            }
        });
        const unlockAudioContext = () => {
            if (audioCtx.state !== "suspended") return;
            const unlock = (): any => audioCtx.resume().then(clean);
            const clean = () => $("body").off("touchstart touchend mousedown keydown", unlock);
            $("body").on("touchstart touchend mousedown keydown", unlock);
        };
        unlockAudioContext();
    }
    if (audioEnv.audioCtx.state !== "running") audioEnv.audioCtx.resume();
    if (!audioEnv.inputs) audioEnv.inputs = {};
    if (deviceId && !audioEnv.inputs[deviceId]) {
        if (deviceId === "-1") {
            if ($("#source-waveform audio").length) audioEnv.inputs[deviceId] = audioEnv.audioCtx.createMediaElementSource($("#source-waveform audio")[0] as HTMLMediaElement);
        } else {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: { deviceId } });
            audioEnv.inputs[deviceId] = audioEnv.audioCtx.createMediaStreamSource(stream);
        }
    }
    if (!audioEnv.splitterInput) audioEnv.splitterInput = audioEnv.audioCtx.createChannelSplitter(2);
    if (!audioEnv.analyserInput) audioEnv.analyserInput = audioEnv.audioCtx.createAnalyser();
    if (!audioEnv.analyserOutput) audioEnv.analyserOutput = audioEnv.audioCtx.createAnalyser();
    audioEnv.splitterInput.connect(audioEnv.analyserInput, 0);
    if (!audioEnv.mediaDestination) {
        try {
            audioEnv.mediaDestination = audioEnv.audioCtx.createMediaStreamDestination();
        } catch (e) {} // eslint-disable-line no-empty
    }
    return audioEnv;
};
const initAnalysersUI = (uiEnv: FaustEditorUIEnv, audioEnv: FaustEditorAudioEnv) => {
    if (uiEnv.analysersInited) return;
    uiEnv.inputScope = new Scope({
        audioCtx: audioEnv.audioCtx,
        analyser: audioEnv.analyserInput,
        splitter: audioEnv.splitterInput,
        channels: 2,
        container: $("#input-analyser-ui")[0] as HTMLDivElement
    });
    uiEnv.outputScope = new Scope({
        audioCtx: audioEnv.audioCtx,
        analyser: audioEnv.analyserOutput,
        splitter: audioEnv.splitterOutput,
        channels: 1,
        container: $("#output-analyser-ui")[0] as HTMLDivElement
    });
    uiEnv.analysersInited = true;
};
const refreshDspUI = (node?: FaustAudioWorkletNode | FaustScriptProcessorNode) => {
    if (!node) {
        $("#dsp-ui-detail").hide();
        $("#dsp-ui-default").removeClass("badge-success").addClass("badge-warning").html("no DSP yet");
        return;
    }
    $("#dsp-ui-detail").show();
    if (node instanceof ScriptProcessorNode) {
        $("#dsp-ui-default").removeClass("badge-success").addClass("badge-warning").html("ScriptProcessor");
    } else {
        $("#dsp-ui-default").removeClass("badge-warning").addClass("badge-success").html("AudioWorklet");
    }
    $("#dsp-ui-detail-inputs").html(node.getNumInputs().toString());
    $("#dsp-ui-detail-outputs").html(node.getNumOutputs().toString());
    $("#dsp-ui-detail-params").html(node.getParams().length.toString());
};
const initEditor = async () => {
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
    const monaco = await import("monaco-editor"); // eslint-disable-line import/no-unresolved
    monaco.languages.register(faustlang.language);
    monaco.languages.setLanguageConfiguration("faust", faustlang.config);
    monaco.editor.defineTheme("vs-dark", faustlang.theme);
    const editor = monaco.editor.create($("#editor")[0], {
        value: localStorage.getItem("faust_editor_code") || code,
        language: "faust",
        theme: "vs-dark",
        dragAndDrop: true,
        mouseWheelZoom: true,
        wordWrap: "on"
    });
    faustlang.getProviders().then((providers) => {
        monaco.languages.registerHoverProvider("faust", providers.hoverProvider);
        monaco.languages.setMonarchTokensProvider("faust", providers.tokensProvider);
        monaco.languages.registerCompletionItemProvider("faust", providers.completionItemProvider);
        const faustDocURL = "https://faust.grame.fr/doc/libraries/";
        const showDoc = () => {
            const matched = faustlang.matchDocKey(providers.docs, editor.getModel(), editor.getPosition());
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
    });
    $(window).on("resize", () => editor.layout());
    return editor;
};
