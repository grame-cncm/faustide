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
import "bootstrap/js/dist/dropdown";
import "bootstrap/js/dist/tab";
import "bootstrap/js/dist/tooltip";
import "bootstrap/js/dist/modal";
import "@fortawesome/fontawesome-free/css/all.css";
import "bootstrap/scss/bootstrap.scss";
import "./index.scss";
import { StaticScope } from "./StaticScope";
import { FileManager } from "./FileManager";
import * as VERSION from "./version";
import { EditorSettingsStore } from "./runtime/EditorSettingsStore";
import { ProjectPersistence } from "./runtime/ProjectPersistence";
import { DiagramService } from "./runtime/DiagramService";
import { AudioEngine } from "./runtime/AudioEngine";
import { DspRunner } from "./runtime/DspRunner";
import { ExportService } from "./runtime/ExportService";
import { ShareUrlService } from "./runtime/ShareUrlService";
import { RuntimeSettingsController } from "./runtime/RuntimeSettingsController";
import { AppRuntimeConfig, DEFAULT_FAUST_SERVICE_URL, detectAudioFeatureSupport } from "./runtime/AppRuntimeConfig";
import { createCompileOptions } from "./runtime/CompileOptionsFactory";
import { createEditorRuntimeEnvironment } from "./runtime/EditorRuntimeEnvironment";
import { exposeFaustCompilerGlobal, exposeFaustEnvironmentGlobal } from "./runtime/FaustCompatibilityGlobals";
import { loadBrowserFileSystem, loadBrowserLibraries, loadFaustRuntime } from "./runtime/BootstrapLoaders";
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
import { ExampleLoaderController } from "./ui/ExampleLoaderController";
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
import { AnalyserScopeController } from "./ui/AnalyserScopeController";
import { TooltipController } from "./ui/TooltipController";

const PROJECT_DIR = "/usr/share/project/";

$(async () => {
    const { setTimeout } = window;
    const { FaustCompiler, libFaust, faustCompiler, faustSvgDiagrams } = await loadFaustRuntime();
    const bfs = await loadBrowserFileSystem();
    const { JSZip, WaveSurfer, QRCode } = await loadBrowserLibraries();
    // TODO(ijc): This previously set `window.faust`; what depends on that being set?
    exposeFaustCompilerGlobal(faustCompiler);
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
    const runtimeSettings = new RuntimeSettingsController(settingsStore, FaustCompiler);
    const runtimeConfig = new AppRuntimeConfig({
        server: DEFAULT_FAUST_SERVICE_URL,
        ...detectAudioFeatureSupport()
    });
    const dspParams = runtimeSettings.loadDspParams();
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
    let diagramController: DiagramController;
    let midiController: MidiController;
    const updateDiagram = (code: string) => diagramController.update(code);
    const runDsp = (code: string) => dspCompileController.run(code);
    const compileOptions = createCompileOptions({
        projectDir: PROJECT_DIR,
        supportAudioWorklet: runtimeConfig.supportAudioWorklet,
        savedOptions: runtimeSettings.loadCompileOptions()
    });
    const { audioEnv, midiEnv, uiEnv, faustEnv } = createEditorRuntimeEnvironment({
        compileOptions,
        editor,
        jQuery,
        faustCompiler,
        browserFS: bfs
    });
    const audioEngine = new AudioEngine({
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
    const initializeAudioContext = (deviceId?: string) => audioEngine.initialize(deviceId);
    const dspRunner = new DspRunner({
        audioEnv,
        faustCompiler,
        libFaust,
        projectDir: PROJECT_DIR
    });
    const analyserScopeController = new AnalyserScopeController({ audioEnv, uiEnv });
    diagramController = new DiagramController({
        compileOptions,
        diagramService,
        alertController,
        editor,
        monaco
    });
    runtimeSettings.saveVersion();
    uiEnv.plotScope = new StaticScope({ container: $<HTMLDivElement>("#plot-ui")[0] });
    uiEnv.analyser.drawHandler = uiEnv.plotScope.draw;
    uiEnv.analyser.getSampleRate = () => (compileOptions.plotMode === "offline" ? compileOptions.plotSR : audioEnv.audioCtx.sampleRate);
    await loadProject();
    const projectRuntimeController = new ProjectRuntimeController({
        compileOptions,
        audioEnv,
        projectPersistence,
        alertController,
        saveEditorParams: () => runtimeSettings.saveCompileOptions(compileOptions),
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
    if (compileOptions.saveDsp) runtimeSettings.loadDspFactoryCache();

    const dspControlsController = new DspControlsController({
        compileOptions,
        audioEnv,
        fileManager: uiEnv.fileManager,
        supportAudioWorklet: runtimeConfig.supportAudioWorklet,
        saveEditorParams: () => runtimeSettings.saveCompileOptions(compileOptions),
        runDsp
    });
    const faustUiController = new FaustUiController({
        audioEnv,
        uiEnv,
        compileOptions,
        fileManager: uiEnv.fileManager,
        dspParams,
        faustCompiler,
        exportService,
        getServer: () => runtimeConfig.getServer(),
        getMidiController: () => midiController,
        saveDspParams: () => runtimeSettings.saveDspParams(dspParams)
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
        initAudioCtx: () => initializeAudioContext(),
        initAnalysersUI: () => analyserScopeController.initialize(),
        updateDiagram,
        saveEditorDspTable: () => runtimeSettings.saveDspFactoryCache()
    });
    /**
     * Bind DOM events
     */
    alertController.bind();
    new TooltipController().bind();
    new SettingsPanelController({
        compileOptions,
        audioEnv,
        uiEnv,
        saveEditorParams: () => runtimeSettings.saveCompileOptions(compileOptions),
        saveEditorDspTable: () => runtimeSettings.saveDspFactoryCache(),
        loadEditorDspTable: () => runtimeSettings.loadDspFactoryCache(),
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
        saveEditorParams: () => runtimeSettings.saveCompileOptions(compileOptions)
    }).bind();
    const urlParamsController = new UrlParamsController({
        compileOptions,
        fileManager: uiEnv.fileManager,
        shareUrlService,
        runDsp,
        saveEditorParams: () => runtimeSettings.saveCompileOptions(compileOptions),
        setServer: value => runtimeConfig.setServer(value)
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
        getServer: () => runtimeConfig.getServer(),
        setServer: value => runtimeConfig.setServer(value),
        saveEditorParams: () => runtimeSettings.saveCompileOptions(compileOptions),
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
        initAudioCtx: deviceId => initializeAudioContext(deviceId),
        showError: error => alertController.show(error),
        onWaveSurferCreated: value => { wavesurfer = value; }
    }).bind();
    new AudioOutputController({
        audioEnv,
        getSupportMediaStreamDestination: () => runtimeConfig.getSupportMediaStreamDestination(),
        initAudioCtx: () => initializeAudioContext(),
        initAnalysersUI: () => analyserScopeController.initialize(),
        setRecorderSampleRate: sampleRate => { faustEnv.recorder.sampleRate = sampleRate; }
    }).bind();
    await new AudioDeviceController({
        audioEnv,
        mediaDevices: navigator.mediaDevices,
        getSupportMediaStreamDestination: () => runtimeConfig.getSupportMediaStreamDestination(),
        setSupportMediaStreamDestination: supported => runtimeConfig.setSupportMediaStreamDestination(supported)
    }).bind();
    faustUiController.refreshDspUI();
    dspControlsController.bind();
    new RecorderController({
        recorder: faustEnv.recorder,
        fileNameProvider: () => uiEnv.fileManager.mainFileNameWithoutSuffix
    }).bind();
    new ExampleLoaderController({
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
    await initializeAudioContext();
    faustEnv.recorder.sampleRate = audioEnv.audioCtx.sampleRate;
    analyserScopeController.initialize();
    analyserScopeController.disableOutputDisplay();
    $<HTMLSelectElement>("#select-audio-input").change();
    await urlParamsController.load(window.location.search);
    new StartupControlsController({
        compileOptions,
        audioEnv,
        fileManager: uiEnv.fileManager,
        dspControlsController,
        updateDiagram
    }).apply();
    exposeFaustEnvironmentGlobal(faustEnv);
});
