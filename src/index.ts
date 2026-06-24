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

import webmidi from "webmidi";
import type { FaustCompiler } from "@grame/faustwasm";
import type {
    FaustEditorAudioEnv,
    FaustEditorCompileOptions,
    FaustEditorEnv,
    FaustEditorMIDIEnv,
    FaustEditorUIEnv
} from "./runtime/types";
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
import { Recorder } from "./Recorder";
import * as VERSION from "./version";
import { EditorSettingsStore } from "./runtime/EditorSettingsStore";
import { ProjectPersistence } from "./runtime/ProjectPersistence";
import { DiagramService } from "./runtime/DiagramService";
import { AudioEngine } from "./runtime/AudioEngine";
import { DspRunner } from "./runtime/DspRunner";
import { ExportService } from "./runtime/ExportService";
import { ShareUrlService } from "./runtime/ShareUrlService";
import { GlobalShortcutsController } from "./ui/GlobalShortcutsController";
import { PanelToggleView } from "./ui/PanelToggleView";
import { ResizablePanelsController } from "./ui/ResizablePanelsController";
import { DiagramView } from "./ui/DiagramView";
import { MidiController } from "./ui/MidiController";
import { RecorderController } from "./ui/RecorderController";
import { PlotController } from "./ui/PlotController";
import { AudioOutputController } from "./ui/AudioOutputController";
import { AudioInputController } from "./ui/AudioInputController";
import { AudioDeviceController } from "./ui/AudioDeviceController";
import { SettingsPanelController } from "./ui/SettingsPanelController";
import { ProjectFilesController } from "./ui/ProjectFilesController";
import { ExamplesController } from "./ui/ExamplesController";
import { ShareModalController } from "./ui/ShareModalController";
import { ExportController } from "./ui/ExportController";
import { DspControlsController } from "./ui/DspControlsController";
import { FaustUiController } from "./ui/FaustUiController";
import { UrlParamsController } from "./ui/UrlParamsController";
import { AlertController } from "./ui/AlertController";
import { DspCompileController } from "./ui/DspCompileController";
import { StartupControlsController } from "./ui/StartupControlsController";
import { initEditor } from "./ui/FaustEditorFactory";
import { ProjectRuntimeController } from "./ui/ProjectRuntimeController";
import { DiagramController } from "./ui/DiagramController";

declare global {
    interface Window {
        webkitAudioContext: typeof AudioContext;
        faustEnv: FaustEditorEnv;
        faustCompiler: FaustCompiler;
    }
}

const supportAudioWorklet = !!window.AudioWorklet;
let supportMediaStreamDestination = !!(window.AudioContext
    || window.webkitAudioContext).prototype.createMediaStreamDestination
    && !!HTMLAudioElement.prototype.setSinkId;

//let server = "https://faustservicecloud.grame.fr";
let server = "https://faustservice.inria.fr";

const PROJECT_DIR = "/usr/share/project/";
let audioEngine: AudioEngine;
let midiController: MidiController;
let faustUiController: FaustUiController;

$(async () => {
    const { setTimeout } = window;
    const { instantiateFaustModuleFromFile, LibFaust, FaustCompiler, FaustSvgDiagrams } = await import("@grame/faustwasm");
    const faustModule = await instantiateFaustModuleFromFile("faustwasm/libfaust-wasm.js");
    const libFaust = new LibFaust(faustModule);
    const faustCompiler = new FaustCompiler(libFaust);
    const faustSvgDiagrams = new FaustSvgDiagrams(faustCompiler);
    const faustPrimitiveLibFile = await fetch("primitives.lib");
    const faustPrimitiveLib = await faustPrimitiveLibFile.text();
    libFaust.fs().writeFile("/usr/share/faust/primitives.lib", faustPrimitiveLib);

    const BrowserFS = await import("@zenfs/core");
    const { IndexedDB } = await import("@zenfs/dom");
    await BrowserFS.configureSingle({
        backend: IndexedDB,
        storeName: "FaustIDE" as any
    });
    const bfs = BrowserFS.promises;

    const JSZip = (await import("jszip") as any).default as import("jszip");
    const WaveSurfer = (await import("wavesurfer.js") as any).default as import("wavesurfer.js");
    const QRCode = await import("qrcode");
    // TODO(ijc): This previously set `window.faust`; what depends on that being set?
    window.faustCompiler = faustCompiler;
    const settingsStore = new EditorSettingsStore(VERSION as string);
    const projectPersistence = new ProjectPersistence({
        browserFS: bfs,
        faustFS: libFaust.fs(),
        projectDir: PROJECT_DIR
    });
    const diagramService = new DiagramService(faustSvgDiagrams, libFaust.fs());
    const exportService = new ExportService();
    const shareUrlService = new ShareUrlService();
    const alertController = new AlertController();
    /**
     * To save dsp table to localStorage
     */
    const saveEditorDspTable = () => {
        settingsStore.saveDspFactoryCache(FaustCompiler);
    };
    /**
     * To load dsp table from localStorage
     */
    const loadEditorDspTable = async () => {
        await settingsStore.loadDspFactoryCache(FaustCompiler);
    };
    /**
     * To save editor params to localStorage
     */
    const saveEditorParams = () => {
        settingsStore.saveCompileOptions(compileOptions);
    };
    /**
     * To load editor params from localStorage
     *
     * @returns {(FaustEditorCompileOptions | {})}
     */
    const loadEditorParams = (): FaustEditorCompileOptions | {} => {
        return settingsStore.loadCompileOptions();
    };
    /**
     * To load dsp params from localStorage
     *
     * @returns {{ [path: string]: number }}
     */
    const loadDspParams = (): { [path: string]: number } => {
        return settingsStore.loadDspParams();
    };
    /**
     * To save dsp params to localStorage
     */
    const saveDspParams = () => {
        settingsStore.saveDspParams(dspParams);
    };
    const dspParams = loadDspParams();
    /**
     * Load all files to Emscripten File System from localStorage
     *
     */
    const loadProject = async () => {
        await projectPersistence.loadProject(compileOptions.saveCode);
    };
    /**
     * Async Load Monaco Editor Core
     * Use import() for webpack code splitting, needs babel-dynamic-import
     */
    const { editor, monaco } = await initEditor(libFaust);
    editor.layout(); // Force editor to fill div
    let dspCompileController: DspCompileController;
    const diagramController = new DiagramController({
        compileOptions,
        diagramService,
        alertController,
        editor,
        monaco
    });
    const updateDiagram = (code: string) => diagramController.update(code);
    const runDsp = (code: string) => dspCompileController.run(code);
    const audioEnv: FaustEditorAudioEnv = {
        dspConnectedToInput: false,
        dspConnectedToOutput: false,
        inputEnabled: false,
        outputEnabled: false
    };
    audioEngine = new AudioEngine({
        env: audioEnv,
        gainContainer: $<HTMLDivElement>("#input-gain")[0],
        mediaElementProvider: () => $<HTMLAudioElement>("#source-waveform audio")[0] || null,
        unlockTarget: {
            add: handler => $("body").on("touchstart touchend mousedown keydown", handler),
            remove: handler => $("body").off("touchstart touchend mousedown keydown", handler)
        },
        onStateChange: (state) => {
            if (state === "running") {
                $(".btn-dac").removeClass("btn-light").addClass("btn-primary")
                    .children("span").html("Output is On");
            } else {
                $(".btn-dac").removeClass("btn-primary").addClass("btn-light")
                    .children("span").html("Output is Off");
            }
        }
    });
    const dspRunner = new DspRunner({
        audioEnv,
        faustCompiler,
        libFaust,
        projectDir: PROJECT_DIR
    });
    const midiEnv: FaustEditorMIDIEnv = { input: null };
    const uiEnv: FaustEditorUIEnv = {
        analysersInited: false,
        inputScope: null,
        outputScope: null,
        plotScope: undefined,
        analyser: new Analyser(16, "continuous"),
        fileManager: undefined
    };
    const compileOptions: FaustEditorCompileOptions = {
        useWorklet: supportAudioWorklet,
        useDouble: false,
        bufferSize: 1024,
        saveCode: true,
        saveParams: false,
        saveDsp: false,
        popup: false,
        voices: 0,
        plotMode: "offline",
        plot: 256,
        plotSR: 48000,
        plotFFT: 256,
        plotFFTOverlap: 2,
        drawSpectrogram: false,
        enableGuiBuilder: false,
        guiBuilderUrl: "https://mainline.i3s.unice.fr/fausteditorweb/dist/PedalEditor/Front-End/",
        exportPlatform: "source",
        exportArch: "cplusplus",
        ...loadEditorParams(),
        realtimeCompile: false,
        args: ["-f", "10", "-I", PROJECT_DIR]
    };
    const faustEnv: FaustEditorEnv = {
        audioEnv,
        midiEnv,
        uiEnv,
        compileOptions,
        jQuery,
        editor,
        faustCompiler,
        recorder: new Recorder(),
        browserFS: bfs
    };
    settingsStore.saveVersion();
    uiEnv.plotScope = new StaticScope({ container: $<HTMLDivElement>("#plot-ui")[0] });
    uiEnv.analyser.drawHandler = uiEnv.plotScope.draw;
    uiEnv.analyser.getSampleRate = () => (compileOptions.plotMode === "offline" ? compileOptions.plotSR : audioEnv.audioCtx.sampleRate);
    await loadProject();
    const projectRuntimeController = new ProjectRuntimeController({
        compileOptions,
        audioEnv,
        projectPersistence,
        alertController,
        saveEditorParams,
        runDsp,
        updateDiagram
    });
    uiEnv.fileManager = new FileManager({
        container: $<HTMLDivElement>("#filemanager")[0],
        fs: libFaust.fs(),
        path: PROJECT_DIR,
        mainFile: compileOptions.mainFile,
        ...projectRuntimeController.createFileManagerHandlers((fileName, content) => editor.setValue(content))
    });
    if (compileOptions.saveDsp) loadEditorDspTable();

    const dspControlsController = new DspControlsController({
        compileOptions,
        audioEnv,
        fileManager: uiEnv.fileManager,
        supportAudioWorklet,
        saveEditorParams,
        runDsp
    });
    faustUiController = new FaustUiController({
        audioEnv,
        uiEnv,
        compileOptions,
        fileManager: uiEnv.fileManager,
        dspParams,
        faustCompiler,
        exportService,
        getServer: () => server,
        getMidiController: () => midiController,
        saveDspParams
    });
    dspCompileController = new DspCompileController({
        audioEnv,
        uiEnv,
        compileOptions,
        dspParams,
        recorder: faustEnv.recorder,
        dspRunner,
        faustUiController,
        alertController,
        initAudioCtx: () => initAudioCtx(audioEnv),
        initAnalysersUI: () => initAnalysersUI(uiEnv, audioEnv),
        updateDiagram,
        saveEditorDspTable
    });
    /**
     * Bind DOM events
     */
    alertController.bind();
    // Tooltips
    $('[data-toggle="tooltip"]').tooltip({ trigger: "hover", boundary: "viewport" });
    $("#btn-export").tooltip({ trigger: "hover", boundary: "viewport" });
    $("#btn-share").tooltip({ trigger: "hover", boundary: "viewport" });
    $("#btn-tab-setting").tooltip({ trigger: "hover", boundary: "viewport" });
    new SettingsPanelController({
        compileOptions,
        audioEnv,
        uiEnv,
        saveEditorParams,
        saveEditorDspTable,
        loadEditorDspTable,
        runDsp,
        updateDiagram
    }).bind();
    new PlotController({
        compileOptions,
        audioEnv,
        uiEnv,
        faustCompiler,
        dspRunner,
        getMainCode: () => uiEnv.fileManager.mainCode,
        runDsp,
        saveEditorParams
    }).bind();
    const urlParamsController = new UrlParamsController({
        compileOptions,
        fileManager: uiEnv.fileManager,
        shareUrlService,
        runDsp,
        saveEditorParams,
        setServer: value => { server = value; }
    });
    new ProjectFilesController({
        fileManager: uiEnv.fileManager,
        compileOptions,
        audioEnv,
        createZip: () => new JSZip(),
        runDsp,
        updateDiagram
    }).bind();
    await new ExportController({
        compileOptions,
        fileManager: uiEnv.fileManager,
        exportService,
        qrCode: QRCode,
        getServer: () => server,
        setServer: value => { server = value; },
        saveEditorParams,
        onError: error => console.error(error) // eslint-disable-line no-console
    }).bind();
    new ShareModalController({
        compileOptions,
        fileManager: uiEnv.fileManager,
        shareUrlService
    }).bind();
    /**
     * Right panel options
     */
    midiController = new MidiController({
        midiEnv,
        webmidi,
        keyMap: navigator.language === "fr-FR" ? MidiController.KEY_MAP_FR : MidiController.KEY_MAP,
        hasEditorFocus: () => faustEnv.editor && faustEnv.editor.hasTextFocus(),
        sendToDsp: data => {
            if (audioEnv.dsp) audioEnv.dsp.midiMessage(data);
        }
    });
    midiController.bind();
    let wavesurfer: WaveSurfer;
    new AudioInputController({
        audioEnv,
        uiEnv,
        waveSurferFactory: WaveSurfer,
        initAudioCtx: deviceId => initAudioCtx(audioEnv, deviceId),
        showError: error => alertController.show(error),
        onWaveSurferCreated: value => { wavesurfer = value; }
    }).bind();
    new AudioOutputController({
        audioEnv,
        getSupportMediaStreamDestination: () => supportMediaStreamDestination,
        initAudioCtx: () => initAudioCtx(audioEnv),
        initAnalysersUI: () => initAnalysersUI(uiEnv, audioEnv),
        setRecorderSampleRate: sampleRate => { faustEnv.recorder.sampleRate = sampleRate; }
    }).bind();
    await new AudioDeviceController({
        audioEnv,
        mediaDevices: navigator.mediaDevices,
        getSupportMediaStreamDestination: () => supportMediaStreamDestination,
        setSupportMediaStreamDestination: supported => { supportMediaStreamDestination = supported; }
    }).bind();
    faustUiController.refreshDspUI();
    dspControlsController.bind();
    new RecorderController({
        recorder: faustEnv.recorder,
        fileNameProvider: () => uiEnv.fileManager.mainFileNameWithoutSuffix
    }).bind();
    new ExamplesController({
        fileManager: uiEnv.fileManager,
        compileOptions,
        audioEnv,
        runDsp,
        updateDiagram
    }).bind();
    projectRuntimeController.bindEditorContent(editor, uiEnv.fileManager);
    faustUiController.bind();
    new DiagramView(diagramService).bind();
    new GlobalShortcutsController({
        docs: () => $("#btn-docs")[0].click(),
        run: () => $("#btn-run").click()
    }).bind();
    new ResizablePanelsController(editor, wavesurfer).bind();
    new PanelToggleView(editor).bind();
    // autorunning
    await initAudioCtx(audioEnv);
    faustEnv.recorder.sampleRate = audioEnv.audioCtx.sampleRate;
    // Analysers
    initAnalysersUI(uiEnv, audioEnv);
    $("#output-analyser-ui").hide();
    uiEnv.outputScope.disabled = true;
    $<HTMLSelectElement>("#select-audio-input").change();
    await urlParamsController.load(window.location.search);
    new StartupControlsController({
        compileOptions,
        audioEnv,
        fileManager: uiEnv.fileManager,
        dspControlsController,
        updateDiagram
    }).apply();
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
    if (!audioEngine) throw new Error("Audio engine is not ready");
    return audioEngine.initialize(deviceId);
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
