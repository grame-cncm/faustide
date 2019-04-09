// import { Faust } from "faust2webaudio";
// TODO
// primitives doc
// bargraph in scopes
import * as monaco from "monaco-editor";
import webmidi, { Input } from "webmidi";
import { FaustScriptProcessorNode, FaustAudioWorkletNode, Faust } from "faust2webaudio";
import { Key2Midi } from "./Key2Midi";
import * as QRCode from "qrcode";
import * as WaveSurfer from "wavesurfer.js";
import * as faustlang from "./monaco-faust";
import "bootstrap/js/dist/tab";
import "bootstrap/js/dist/tooltip";
import "bootstrap/js/dist/modal";
import "@fortawesome/fontawesome-free/css/all.css";
import "bootstrap/scss/bootstrap.scss";
import "./index.scss";
declare global {
    interface Window {
        AudioContext: typeof AudioContext;
        webkitAudioContext: typeof AudioContext;
        AudioWorklet?: typeof AudioWorklet;
        faustEnv: FaustEditorEnv;
    }
}
type FaustEditorEnv = {
    audioEnv: FaustEditorAudioEnv,
    midiEnv: FaustEditorMIDIEnv,
    uiEnv: FaustEditorUIEnv,
    compileOptions: FaustEditorCompileOptions,
    editor?: monaco.editor.IStandaloneCodeEditor,
    jQuery: JQueryStatic,
    faust: Faust
};
type FaustEditorAudioEnv = {
    audioCtx?: AudioContext,
    splitterInput?: ChannelSplitterNode,
    analyserInputI: number,
    analyserInput?: AnalyserNode,
    splitterOutput?: ChannelSplitterNode,
    analyserOutputI: number,
    analyserOutput?: AnalyserNode,
    inputs?: { [deviceId: string]: MediaStreamAudioSourceNode | MediaElementAudioSourceNode },
    currentInput?: string,
    mediaDestination?: MediaStreamAudioDestinationNode,
    dsp?: FaustScriptProcessorNode | FaustAudioWorkletNode,
    dspConnectedToOutput: boolean,
    dspConnectedToInput: boolean,
    inputEnabled: boolean,
    outputEnabled: boolean
};
type FaustEditorMIDIEnv = {
    input: Input
};
type FaustEditorUIEnv = {
    analysersInited: boolean,
    inputAnalyser: 0 | 1, // 0 scope, 1 spect
    outputAnalyser: 0 | 1,
};
type FaustEditorCompileOptions = {
    name: string,
    useWorklet: boolean,
    bufferSize: 128 | 256 | 512 | 1024 | 2048 | 4096,
    saveParams: boolean,
    saveDsp: boolean,
    realtimeDiagram: boolean,
    voices: number,
    args: { [key: string]: any }
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
    let editorDecoration = [] as string[];
    const getDiagram = (code: string): { success: boolean, error?: Error } => {
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
        $("#diagram-default").add("#diagram-error").hide();
        $("#alert-faust-code").css("visibility", "hidden");
        $("#diagram-svg").show();
        return { success: true };
    };
    // dsp Compiler
    const runDsp = async (code: string): Promise<{ success: boolean, error?: Error }> => {
        const audioCtx = audioEnv.audioCtx;
        const input = audioEnv.inputs[audioEnv.currentInput];
        let splitter = audioEnv.splitterOutput;
        const analyser = audioEnv.analyserOutput;
        if (!audioCtx) {
            await initAudioCtx(audioEnv);
            initAnalysersUI(uiEnv, audioEnv);
        }
        const { useWorklet, bufferSize, voices, args } = compileOptions;
        let node: FaustScriptProcessorNode | FaustAudioWorkletNode;
        try {
            const getDiagramResult = getDiagram(code);
            if (!getDiagramResult.success) throw getDiagramResult.error;
            node = await faust.getNode(code, { audioCtx, useWorklet, bufferSize, voices, args });
            if (!node) throw "Unknown Error in WebAudio Node.";
        } catch (e) {/*
            const uiWindow = ($("#iframe-faust-ui")[0] as HTMLIFrameElement).contentWindow;
            uiWindow.postMessage(JSON.stringify({ type: "clear" }), "*");
            $("#faust-ui-default").show();
            $("#iframe-faust-ui").css("visibility", "hidden");
            $("#output-analyser-ui").hide();
            refreshDspUI(); */
            showError(e);
            return { success: false, error: e };
        }
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
        let dspParams = {} as { [path: string]: number };
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
            if (audioEnv.analyserOutputI > channelsCount - 1) {
                audioEnv.analyserOutputI = channelsCount - 1;
                $("#btn-output-analyser-ch").html("ch " + (audioEnv.analyserOutputI + 1).toString());
            }
            splitter.connect(analyser, audioEnv.analyserOutputI);
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
            const uiWindow = ($("#iframe-faust-ui")[0] as HTMLIFrameElement).contentWindow;
            uiWindow.postMessage(JSON.stringify({ type: "ui", json: node.getJSON() }), "*");
            node.setOutputParamHandler((path: string, value: number) => uiWindow.postMessage(JSON.stringify({ path, value, type: "param" }), "*"));
            if (compileOptions.saveParams) {
                const params = node.getParams();
                for (const path in dspParams) {
                    if (params.indexOf(path) !== -1) uiWindow.postMessage(JSON.stringify({ path, value: dspParams[path], type: "param" }), "*");
                }
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
        if (compileOptions.realtimeDiagram) rtCompileTimer = setTimeout(audioEnv.dsp ? runDsp : getDiagram, 1000, code);
    });

    const audioEnv = { dspConnectedToInput: false, dspConnectedToOutput: false, analyserInputI: 0, analyserOutputI: 0, inputEnabled: false, outputEnabled: false } as FaustEditorAudioEnv;
    const midiEnv = { input: null } as FaustEditorMIDIEnv;
    const uiEnv = { analysersInited: false, inputAnalyser: 0, outputAnalyser: 0 } as FaustEditorUIEnv;
    const compileOptions = { name: "untitled", useWorklet: false, bufferSize: 1024, saveParams: false, saveDsp: false, realtimeDiagram: true, voices: 0, args: { "-I": "https://faust.grame.fr/tools/editor/libraries/" }, ...loadEditorParams() } as FaustEditorCompileOptions;
    const faustEnv = { audioEnv, midiEnv, uiEnv, compileOptions, jQuery } as FaustEditorEnv;
    faustEnv.editor = editor;
    faustEnv.faust = faust;
    if (compileOptions.saveDsp) loadEditorDspTable();
    // Alerts
    $(".alert>.close").on("click", e => $(e.currentTarget).parent().css("visibility", "hidden"));
    $(".a-alert-faust-code-detail").on("click", e => $("#modal-alert-faust-code-detail .modal-body").text($(e.currentTarget).siblings("span").text()));
    // Tooltips
    $('[data-toggle="tooltip"]').tooltip({ trigger: "hover" });
    $("#btn-export").tooltip({ trigger: "hover" });
    // Voices
    $("#select-voices").on("change", (e) => {
        compileOptions.voices = +(e.currentTarget as HTMLInputElement).value;
        if (compileOptions.realtimeDiagram && audioEnv.dsp) runDsp(editor.getValue());
    }).children(`option[value=${compileOptions.voices}]`).prop("selected", true);
    // BufferSize
    $("#select-buffer-size").on("change", (e) => {
        compileOptions.bufferSize = +(e.currentTarget as HTMLInputElement).value as 128 | 256 | 512 | 1024 | 2048 | 4096;
        saveEditorParams();
        if (compileOptions.realtimeDiagram && audioEnv.dsp) runDsp(editor.getValue());
    }).children(`option[value=${compileOptions.bufferSize}]`).prop("selected", true);
    // AudioWorklet
    $("#check-worklet").on("change", (e) => {
        compileOptions.useWorklet = (e.currentTarget as HTMLInputElement).checked;
        if (compileOptions.useWorklet) $("#select-buffer-size").prop("disabled", true).children("option").eq(0).prop("selected", true);
        else $("#select-buffer-size").prop("disabled", false).children("option").eq([128, 256, 512, 1024, 2048, 4096].indexOf(compileOptions.bufferSize)).prop("selected", true);
        saveEditorParams();
        if (compileOptions.realtimeDiagram && audioEnv.dsp) runDsp(editor.getValue());
    });
    if (window.AudioWorklet) $("#check-worklet").prop({ disabled: false, checked: true }).change();
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
    ($("#check-realtime-diagram").on("change", (e) => {
        compileOptions.realtimeDiagram = (e.currentTarget as HTMLInputElement).checked;
        if (compileOptions.realtimeDiagram) getDiagram(editor.getValue());
        saveEditorParams();
    })[0] as HTMLInputElement).checked = compileOptions.realtimeDiagram;
    if (compileOptions.realtimeDiagram) getDiagram(editor.getValue());
    // MIDI Devices
    const key2Midi = new Key2Midi({ keyMap: navigator.language === "fr-FR" ? Key2Midi.KEY_MAP_FR : Key2Midi.KEY_MAP, enabled: false });
    document.addEventListener("keydown", (e) => {
        if (faustEnv.editor && faustEnv.editor.hasTextFocus()) return;
        key2Midi.handleKeyDown(e.key);
    });
    document.addEventListener("keyup", (e) => {
        if (faustEnv.editor && faustEnv.editor.hasTextFocus()) return;
        key2Midi.handleKeyUp(e.key);
    });
    $("#select-midi-input").on("change", (e) => {
        const id = (e.currentTarget as HTMLSelectElement).value;
        if (midiEnv.input) midiEnv.input.removeListener("midimessage", "all");
        const listener = (data: number[] | Uint8Array) => { if (audioEnv.dsp) audioEnv.dsp.midiMessage(data); };
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
            const analyser = audioEnv.analyserInput;
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
        const analyser = audioEnv.analyserInput;
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
    $("#btn-source-play").on("click", (e) => {
        if (!wavesurfer || !wavesurfer.isReady) return;
        if (wavesurfer.isPlaying()) {
            wavesurfer.pause();
        } else {
            wavesurfer.play();
        }
    });
    $("#btn-source-rewind").on("click", (e) => {
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
                console.error(e);
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
    navigator.mediaDevices.enumerateDevices().then((devices) => {
        $("#input-ui-default").hide();
        const $select = $("#select-audio-input").prop("disabled", false);
        devices.forEach((device) => {
            if (device.kind === "audioinput") $select.append(new Option(device.label || device.deviceId, device.deviceId));
        });
    });
    // DSP
    refreshDspUI();
    // Output
    $("#btn-dac").on("click", async (e) => {
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
            $(e.currentTarget).removeClass("btn-primary").addClass("btn-light")
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
            $(e.currentTarget).removeClass("btn-light").addClass("btn-primary")
            .children("span").html("Output is On");
        }
    });
    // Upload
    $("#btn-upload").on("click", (e) => {
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
            if (compileOptions.realtimeDiagram) {
                if (audioEnv.dsp) runDsp(code);
                else getDiagram(code);
            }
        };
        reader.onerror = () => undefined;
        reader.readAsText(file);
    }).on("click", e => e.stopPropagation());
    // Save as
    $("#btn-save").on("click", (e) => {
        const text = editor.getValue();
        const uri = "data:text/plain;charset=utf-8," + encodeURIComponent(text);
        $("#a-save").attr({ href: uri, download: compileOptions.name + ".dsp" })[0].click();
    });
    $("#a-save").on("click", e => e.stopPropagation());
    // Docs
    $("#btn-docs").on("click", e => $("#a-docs")[0].click());
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
        $("#export-download").on("click", e => $("#a-export-download")[0].click());
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
                            $("#a-export-download").attr({ href })[0];
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
    }).catch((r) => {
        $("#btn-export").prop("disabled", "true");
    });
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
                if (compileOptions.realtimeDiagram) {
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
    // Run Dsp Button
    $("#btn-run").prop("disabled", false).on("click", async (e) => {
        const compileResult = await runDsp(editor.getValue());
        if (!compileResult.success) return;
        if (!$("#tab-faust-ui").hasClass("active")) $("#tab-faust-ui").tab("show");
        // const dspOutputHandler = FaustUI.main(node.getJSON(), $("#faust-ui"), (path: string, val: number) => node.setParamValue(path, val));
        // node.setOutputParamHandler(dspOutputHandler);
    });
    const dspParams = {} as { [path: string]: number };
    window.addEventListener("message", (e) => {
        if (!e.data) return;
        const data = JSON.parse(e.data);
        if (data.type === "param") {
            if (audioEnv.dsp) audioEnv.dsp.setParamValue(data.path, +data.value);
            if (compileOptions.saveParams) {
                dspParams[data.path] = +data.value;
                localStorage.setItem("faust_editor_dsp_params", JSON.stringify(dspParams));
            }
            return;
        }
        if (data.type === "keydown") return key2Midi.handleKeyDown(data.key);
        if (data.type === "keyup") return key2Midi.handleKeyUp(data.key);
    });
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
        const uiWindow = ($("#iframe-faust-ui")[0] as HTMLIFrameElement).contentWindow;
        uiWindow.postMessage(JSON.stringify({ type: "clear" }), "*");
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
                return;
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
        const mode = $(e.currentTarget).hasClass("resizable-left")
            ? "left"
            : $(e.currentTarget).hasClass("resizable-right")
            ? "right"
            : $(e.currentTarget).hasClass("resizable-top")
            ? "top"
            : $(e.currentTarget).hasClass("resizable-bottom")
            ? "bottom"
            : undefined;
        const handleMouseMove = (e: JQuery.MouseMoveEvent) => {
            e.preventDefault();
            e.stopPropagation();
            const dX = e.pageX - x;
            const dY = e.pageY - y;
            if (mode === "left") $div.width(w - dX);
            else if (mode === "right") $div.width(w + dX);
            else if (mode === "top") $div.height(h - dY);
            else if (mode === "bottom") $div.height(h + dY);
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
                $("#btn-dac").removeClass("btn-light").addClass("btn-primary")
                .children("span").html("Output is On");
            } else {
                audioEnv.outputEnabled = false;
                $("#btn-dac").removeClass("btn-primary").addClass("btn-light")
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
        } catch (e) {}
    }
    return audioEnv;
};
const initAnalysersUI = (uiEnv: FaustEditorUIEnv, audioEnv: FaustEditorAudioEnv) => {
    if (uiEnv.analysersInited) return;
    $("#btn-input-analyser-switch").on("click", (e) => {
        if (uiEnv.inputAnalyser === 0) {
            uiEnv.inputAnalyser = 1;
            $(e.currentTarget).children(".fa-wave-square").removeClass("fa-wave-square").addClass("fa-chart-bar");
        } else {
            uiEnv.inputAnalyser = 0;
            $(e.currentTarget).children(".fa-chart-bar").removeClass("fa-chart-bar").addClass("fa-wave-square");
        }
    });
    $("#btn-output-analyser-switch").on("click", (e) => {
        if (uiEnv.outputAnalyser === 0) {
            uiEnv.outputAnalyser = 1;
            $(e.currentTarget).children(".fa-wave-square").removeClass("fa-wave-square").addClass("fa-chart-bar");
        } else {
            uiEnv.outputAnalyser = 0;
            $(e.currentTarget).children(".fa-chart-bar").removeClass("fa-chart-bar").addClass("fa-wave-square");
        }
    });
    let iRAF: number, oRAF: number;
    let iPaused = false;
    let oPaused = false;
    const audioCtx = audioEnv.audioCtx;
    const iNode = audioEnv.analyserInput;
    const oNode = audioEnv.analyserOutput;
    let iT = new Uint8Array(iNode.fftSize);
    let iF = new Uint8Array(iNode.frequencyBinCount);
    let iFF = new Float32Array(iNode.frequencyBinCount);
    let oT = new Uint8Array(oNode.fftSize);
    let oF = new Uint8Array(oNode.frequencyBinCount);
    let oFF = new Float32Array(oNode.frequencyBinCount);
    const iCanvas = $("#input-analyser")[0] as HTMLCanvasElement;
    const iCtx = iCanvas.getContext("2d");
    const oCanvas = $("#output-analyser")[0] as HTMLCanvasElement;
    const oCtx = oCanvas.getContext("2d");
    const sizes = [128, 512, 2048, 8192];
    $("#btn-input-analyser-size").on("click", (e) => {
        const size = sizes[(sizes.indexOf(iNode.fftSize) + 1) % 4];
        iNode.fftSize = size;
        iT = new Uint8Array(iNode.fftSize);
        iF = new Uint8Array(iNode.frequencyBinCount);
        iFF = new Float32Array(iNode.frequencyBinCount);
        $(e.currentTarget).html(size.toString() + " samps");
    });
    $("#btn-output-analyser-size").on("click", (e) => {
        const size = sizes[(sizes.indexOf(oNode.fftSize) + 1) % 4];
        oNode.fftSize = size;
        oT = new Uint8Array(oNode.fftSize);
        oF = new Uint8Array(oNode.frequencyBinCount);
        oFF = new Float32Array(oNode.frequencyBinCount);
        $(e.currentTarget).html(size.toString() + " samps");
    });
    $("#btn-input-analyser-ch").on("click", (e) => {
        const iSplitter = audioEnv.splitterInput;
        const oldI = audioEnv.analyserInputI;
        const i = (oldI + 1) % 2;
        if (i === oldI) return;
        iSplitter.connect(iNode, i, 0); // Need to be done in the order, or Chrome inspect the graph and disable the analyser.
        setTimeout(() => iSplitter.disconnect(iNode, oldI, 0), 10);
        audioEnv.analyserInputI = i;
        $(e.currentTarget).html("ch " + (i + 1).toString());
    });
    $("#btn-output-analyser-ch").on("click", (e) => {
        const oSplitter = audioEnv.splitterOutput;
        const oldI = audioEnv.analyserOutputI;
        const i = (oldI + 1) % audioEnv.dsp.getNumOutputs();
        if (i === oldI) return;
        oSplitter.connect(oNode, i, 0);
        setTimeout(() => oSplitter.disconnect(oNode, oldI, 0), 10);
        audioEnv.analyserOutputI = i;
        $(e.currentTarget).html("ch " + (i + 1).toString());
    });
    const drawOsc = (ctx: CanvasRenderingContext2D, l: number, w: number, h: number, d: Uint8Array, freq: number, sr: number) => {
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = "#FFFFFF";
        ctx.textAlign = "right";
        ctx.fillText("~" + freq.toFixed(1) + "Hz", w - 2, 15, 50);
        ctx.strokeStyle = "#FFFFFF";
        ctx.beginPath();
        let $zerox = 0;
        const thresh = 1;
        const period = sr / freq;
        const times = Math.floor(l / period) - 1;
        while (d[$zerox++] > 128 && $zerox < l);
        if ($zerox >= l - 1) {
            $zerox = 0;
        } else {
            while (d[$zerox++] < 128 + thresh && $zerox < l);
            if ($zerox >= l - 1) {
                $zerox = 0;
            }
        }
        const drawL = times > 0 && isFinite(period) ? Math.min(period * times, l - $zerox) : l - $zerox;
        for (let i = $zerox; i < $zerox + drawL; i++) {
            const x = w * (i - $zerox) / (drawL - 1);
            const y = h - d[i] / 128.0 * (h / 2);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();
    };
    const drawSpe = (ctx: CanvasRenderingContext2D, l: number, w: number, h: number, d: Uint8Array, freq: number) => {
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = "#FFFFFF";
        ctx.textAlign = "right";
        ctx.fillText("~" + freq.toFixed(1) + "Hz", w - 2, 15, 50);
        for (let i = 0; i < l; i++) {
            const x = w * i / l;
            const y = d[i] / 128.0 * h;
            ctx.fillRect(x, h - y, w / l, y);
        }
    };
    const iDraw = () => {
        if (audioCtx && audioCtx.state === "running" && iNode && audioEnv.inputEnabled) {
            const ctx = iCtx;
            const sr = audioCtx.sampleRate;
            const w = $("#input-analyser-ui").innerWidth();
            const h = Math.min(w * 0.75, $("#input-analyser-ui").innerHeight());
            iCanvas.width = w;
            iCanvas.height = h;
            iNode.getFloatFrequencyData(iFF);
            const freq = iFF.indexOf(Math.max(...iFF)) / iFF.length * sr / 2;
            if (uiEnv.inputAnalyser === 0) {
                const l = iT.length;
                iNode.getByteTimeDomainData(iT);
                drawOsc(ctx, l, w, h, iT, freq, sr);
            } else if (uiEnv.inputAnalyser === 1) {
                const l = iF.length;
                iNode.getByteFrequencyData(iF);
                drawSpe(ctx, l, w, h, iF, freq);
            }
        }
        iRAF = requestAnimationFrame(iDraw);
        return iRAF;
    };
    const oDraw = () => {
        if (audioCtx && audioCtx.state === "running" && oNode && audioEnv.dsp) {
            const ctx = oCtx;
            const sr = audioCtx.sampleRate;
            const w = $("#output-analyser-ui").innerWidth();
            const h = Math.min(w * 0.75, $("#output-analyser-ui").innerHeight());
            oCanvas.width = w;
            oCanvas.height = h;
            oNode.getFloatFrequencyData(oFF);
            const freq = oFF.indexOf(Math.max(...oFF)) / oFF.length * sr / 2;
            if (uiEnv.outputAnalyser === 0) {
                const l = oT.length;
                oNode.getByteTimeDomainData(oT);
                drawOsc(ctx, l, w, h, oT, freq, sr);
            } else if (uiEnv.outputAnalyser === 1) {
                const l = oF.length;
                oNode.getByteFrequencyData(oF);
                drawSpe(ctx, l, w, h, oF, freq);
            }
        }
        oRAF = requestAnimationFrame(oDraw);
        return oRAF;
    };
    const iDrawPause = () => {
        const ctx = iCtx;
        const w = iCanvas.width;
        const h = iCanvas.height;
        ctx.fillStyle = "#00000080";
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(w * 0.38, h * 0.35, w * 0.08, h * 0.3);
        ctx.fillRect(w * 0.54, h * 0.35, w * 0.08, h * 0.3);
    };
    const oDrawPause = () => {
        const ctx = oCtx;
        const w = oCanvas.width;
        const h = oCanvas.height;
        ctx.fillStyle = "#00000080";
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(w * 0.38, h * 0.35, w * 0.08, h * 0.3);
        ctx.fillRect(w * 0.54, h * 0.35, w * 0.08, h * 0.3);
    };
    $("#input-analyser").on("click", (e) => {
        if (iPaused) {
            requestAnimationFrame(iDraw);
        } else {
            cancelAnimationFrame(iRAF);
            requestAnimationFrame(iDrawPause);
        }
        iPaused = !iPaused;
    });
    $("#output-analyser").on("click", (e) => {
        if (oPaused) {
            requestAnimationFrame(oDraw);
        } else {
            cancelAnimationFrame(oRAF);
            requestAnimationFrame(oDrawPause);
        }
        oPaused = !oPaused;
    });
    uiEnv.analysersInited = true;
    iDraw();
    oDraw();
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
    const code =
`import("stdfaust.lib");
process = ba.pulsen(1, 10000) : pm.djembe(60, 0.3, 0.4, 1) <: dm.freeverb_demo;`;
    const polycode =
`import("stdfaust.lib");
process = ba.pulsen(1, ba.hz2midikey(freq) * 1000) : pm.marimba(freq, 0, 7000, 0.5, 0.8) * gate * gain with {
    freq = hslider("freq", 440, 40, 8000, 1);
    gain = hslider("gain", 0.5, 0, 1, 0.01);
    gate = button("gate");
};
effect = dm.freeverb_demo;`;
    const monaco = await import("monaco-editor");
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
                const name = prefix.pop();
                const doc = matched.doc;
                $("#a-docs").attr("href", `${faustDocURL}#${prefix.length ? prefix.join(".") + "." : ""}${doc.name.replace(/[\[\]\|]/g, "").toLowerCase()}`)[0].click();
                return;
            }
            $("#a-docs").attr("href", faustDocURL)[0].click();
        };
        $("#btn-docs").off("click").on("click", showDoc);
    });
    $(window).on("resize", () => editor.layout());
    return editor;
};
