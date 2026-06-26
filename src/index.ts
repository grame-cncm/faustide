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

/**
 * Browser application composition root.
 *
 * This file intentionally centralizes the startup order and cross-module
 * wiring for Faust IDE. Runtime behavior should live in services, models,
 * controllers, or views; `index.ts` should only load browser dependencies,
 * construct shared objects, connect callbacks between them, run startup, and
 * expose legacy compatibility globals.
 */

import webmidi from "webmidi";
import "bootstrap/js/dist/dropdown";
import "bootstrap/js/dist/tab";
import "bootstrap/js/dist/tooltip";
import "bootstrap/js/dist/modal";
import "@fortawesome/fontawesome-free/css/all.css";
import "bootstrap/scss/bootstrap.scss";
import "./index.scss";
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
import type { RuntimeActions } from "./runtime/RuntimeActions";
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
import { AudioOutputStateView } from "./ui/AudioOutputStateView";
import { BrowserAudioEngineBindings } from "./ui/BrowserAudioEngineBindings";
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
import { ApplicationStartupController } from "./ui/ApplicationStartupController";
import { initEditor } from "./ui/FaustEditorFactory";
import { ProjectRuntimeController } from "./ui/ProjectRuntimeController";
import { DiagramController } from "./ui/DiagramController";
import { AnalyserScopeController } from "./ui/AnalyserScopeController";
import { TooltipController } from "./ui/TooltipController";
import { DiskVolume } from "./runtime/fs/DiskVolume";
import type { Volume } from "./runtime/fs/Volume";
import { VolumeBrowserController } from "./ui/VolumeBrowserController";
import { pickImportableFileHandle, pickDirectory, fsAccessAvailable, ensureRwPermission, openDecision } from "./runtime/fs/FileAccess";
import { MountRegistry } from "./runtime/fs/MountRegistry";
import { computeClosure } from "./model/Perimeter";
import { writeBundleToDir } from "./runtime/fs/BundleWriter";
import { DiskOriginTracker } from "./runtime/fs/DiskOriginTracker";

const PROJECT_DIR = "/usr/share/project/";

$(async () => {
    /*
     * Browser-only loaders.
     *
     * These initialize the Faust WebAssembly runtime, persistent BrowserFS
     * storage, and heavy browser libraries that are kept out of the static
     * import graph for bootstrap/code-splitting reasons.
     */
    const { FaustCompiler, libFaust, faustCompiler, faustSvgDiagrams } = await loadFaustRuntime();
    const bfs = await loadBrowserFileSystem();
    const { JSZip, WaveSurfer, QRCode } = await loadBrowserLibraries();
    // TODO(ijc): This previously set `window.faust`; what depends on that being set?
    exposeFaustCompilerGlobal(faustCompiler);

    /*
     * Long-lived stores and runtime services.
     *
     * These objects are shared by several controllers. They are created before
     * DOM controllers so every controller receives explicit dependencies
     * instead of importing storage, Faust runtime, or service globals directly.
     */
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
    const audioOutputStateView = new AudioOutputStateView();
    const browserAudioEngineBindings = new BrowserAudioEngineBindings({
        onStateChange: state => audioOutputStateView.updateAudioContextState(state)
    });
    const dspParams = runtimeSettings.loadDspParams();

    /**
     * Async Load Monaco Editor Core
     * Use import() for webpack code splitting, needs babel-dynamic-import
     */
    const { editor, monaco } = await initEditor(libFaust);
    editor.layout(); // Force editor to fill div

    /*
     * Cross-controller action seam.
     *
     * `dspCompileController` is the one participant that cannot be constructed
     * before its consumers: the run/diagram actions are needed by controllers
     * built earlier (ProjectRuntimeController, DspControlsController, ...), while
     * dspCompileController transitively depends on the FileManager those
     * controllers help build. It stays late-bound; the `runtimeActions` seam
     * (defined once diagramController exists, below) names it. diagramController
     * and midiController have no such cycle and are constructed directly.
     */
    let dspCompileController: DspCompileController;
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

    /*
     * Core runtime graph.
     *
     * AudioEngine owns the base Web Audio graph, DspRunner owns Faust DSP node
     * creation/replacement, and AnalyserScopeController owns analyser/plot
     * scope startup. The composition root only supplies browser adapters and
     * callbacks between those pieces.
     */
    const audioEngine = new AudioEngine({
        env: audioEnv,
        ...browserAudioEngineBindings.createOptions()
    });
    const initializeAudioContext = (deviceId?: string) => audioEngine.initialize(deviceId);
    const dspRunner = new DspRunner({
        audioEnv,
        faustCompiler,
        libFaust,
        projectDir: PROJECT_DIR
    });
    const analyserScopeController = new AnalyserScopeController({ audioEnv, uiEnv, compileOptions });
    const diagramController = new DiagramController({
        compileOptions,
        diagramService,
        alertController,
        editor,
        monaco
    });
    const runtimeActions: RuntimeActions = {
        runDsp: code => dspCompileController.run(code),
        updateDiagram: code => diagramController.update(code)
    };
    const { runDsp, updateDiagram } = runtimeActions;
    runtimeSettings.saveVersion();
    analyserScopeController.initializePlotScope();

    /*
     * Project model and persistence wiring.
     *
     * Persistent files are loaded into the Faust virtual filesystem before
     * FileManager is constructed, so FileManager can render the current project
     * immediately. ProjectRuntimeController supplies the save/delete/main-file
     * side effects used by FileManager.
     */
    await projectPersistence.loadProject(compileOptions.saveCode);
    const diskTracker = new DiskOriginTracker();
    const projectRuntimeController = new ProjectRuntimeController({
        compileOptions,
        audioEnv,
        projectPersistence,
        alertController,
        saveEditorParams: () => runtimeSettings.saveCompileOptions(compileOptions),
        runDsp,
        updateDiagram,
        onDiskSave: (fileName, content) => diskTracker.writeToDisk(fileName, content)
    });
    uiEnv.fileManager = new FileManager({
        container: $<HTMLDivElement>("#filemanager")[0],
        fs: libFaust.fs(),
        path: PROJECT_DIR,
        mainFile: compileOptions.mainFile,
        ...projectRuntimeController.createFileManagerHandlers((fileName, content) => editor.setValue(content))
    });
    if (compileOptions.saveDsp) runtimeSettings.loadDspFactoryCache();

    /*
     * DSP compilation and UI surface.
     *
     * DspControlsController owns run/build options, FaustUiController owns the
     * generated Faust UI and popup synchronization, and DspCompileController
     * connects editor code, Faust compilation, DSP node replacement, analyser
     * initialization, recorder state, and diagram refresh.
     */
    const dspControlsController = new DspControlsController({
        compileOptions,
        audioEnv,
        fileManager: uiEnv.fileManager,
        supportAudioWorklet: runtimeConfig.supportAudioWorklet,
        saveEditorParams: () => runtimeSettings.saveCompileOptions(compileOptions),
        runDsp
    });
    const midiController = new MidiController({
        midiEnv,
        webmidi,
        keyMap: navigator.language === "fr-FR" ? MidiController.KEY_MAP_FR : MidiController.KEY_MAP,
        hasEditorFocus: () => faustEnv.editor && faustEnv.editor.hasTextFocus(),
        sendToDsp: (data) => {
            if (audioEnv.dsp) audioEnv.dsp.midiMessage(data);
        }
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

    /*
     * Left/top project and compile controls.
     *
     * These controllers bind existing DOM controls to settings, plot, file,
     * export, share URL, and URL-parameter services. Bind calls are kept here
     * so startup order remains explicit.
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
    const mountRegistry = new MountRegistry(uiEnv.fileManager.model);
    // Shared mutable volume list — both browsers hold the same reference so
    // pushing a new DiskVolume is visible on the next open() call.
    const volumes: Volume[] = [];

    const mountDisk = fsAccessAvailable() ? async () => {
        const dirHandle = await pickDirectory();
        if (!dirHandle) return;
        const id = await mountRegistry.mountDisk(dirHandle);
        volumes.push(new DiskVolume(dirHandle, id));
    } : undefined;

    const reauthorize = async (vol: Volume): Promise<boolean> => {
        const diskVol = vol as DiskVolume;
        if (!diskVol.rootHandle) return false;
        return ensureRwPermission(diskVol.rootHandle);
    };

    const openBrowser = new VolumeBrowserController({
        volumes,
        onOpen: (vol, entry) => {
            vol.readText(entry.path).then((content) => {
                const savedName = uiEnv.fileManager.newFile(entry.name, content);
                if (vol.kind === "disk" && openDecision(entry.name) === "open-in-place") {
                    diskTracker.track(savedName, vol as DiskVolume, entry.path);
                    uiEnv.fileManager.setDiskTracked(savedName, true);
                }
            });
        },
        onOpenDeviceFile: async () => {
            if (fsAccessAvailable()) {
                const handle = await pickImportableFileHandle();
                if (!handle) return;
                const file = await handle.getFile();
                const content = /\.(wav|mp3|ogg|flac|aac)$/i.test(handle.name)
                    ? new Uint8Array(await file.arrayBuffer())
                    : await file.text();
                uiEnv.fileManager.newFile(handle.name, content);
            } else {
                const input = document.createElement("input");
                input.type = "file";
                input.addEventListener("change", async () => {
                    const file = input.files?.[0];
                    if (!file) return;
                    const content = /\.(wav|mp3|ogg|flac|aac)$/i.test(file.name)
                        ? new Uint8Array(await file.arrayBuffer())
                        : await file.text();
                    uiEnv.fileManager.newFile(file.name, content);
                });
                input.click();
            }
        },
        onMountDisk: mountDisk,
        onReauthorize: reauthorize
    });
    openBrowser.bind();

    const saveBrowser = new VolumeBrowserController({
        volumes,
        mode: "save",
        onSave: async (vol, folderPath, name) => {
            const diskVol = vol as DiskVolume;
            if (!diskVol.createFileHandle) return; // Library volumes not yet supported for Save As
            const mainFile = uiEnv.fileManager.mainFileName;
            const fileNameSet = new Set(uiEnv.fileManager.fileNames);
            const readText = (n: string): string | null => {
                const val = uiEnv.fileManager.getValue(n);
                return typeof val === "string" ? val : null;
            };
            const isLocal = (n: string) => fileNameSet.has(n);
            const { files } = computeClosure(mainFile, readText, isLocal);
            const bundle = new Map<string, string>();
            files.forEach((f) => {
                const text = readText(f);
                if (text !== null) bundle.set(name.endsWith(".dsp") && f === mainFile ? name : f, text);
            });
            await writeBundleToDir(diskVol, folderPath, bundle);
        },
        onMountDisk: mountDisk,
        onReauthorize: reauthorize
    });

    // Add a "Save to disk" button in the file manager header (💾, right: 50px).
    // The original #btn-save (zip download) is left unchanged.
    if (fsAccessAvailable()) saveBrowser.bindSave();
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
    /*
     * Audio, MIDI, recorder, examples, and panel controls.
     *
     * MidiController is constructed earlier (FaustUiController reads it through a
     * getter); here it only binds its DOM and Web MIDI listeners. WaveSurfer is
     * captured after AudioInputController creates it, then passed to panel
     * resizing.
     */
    midiController.bind();
    let wavesurfer: WaveSurfer;
    new AudioInputController({
        audioEnv,
        uiEnv,
        waveSurferFactory: WaveSurfer,
        initAudioCtx: deviceId => initializeAudioContext(deviceId),
        showError: error => alertController.show(error),
        onWaveSurferCreated: (value) => { wavesurfer = value; }
    }).bind();
    new AudioOutputController({
        audioEnv,
        getSupportMediaStreamDestination: () => runtimeConfig.getSupportMediaStreamDestination(),
        initAudioCtx: () => initializeAudioContext(),
        initAnalysersUI: () => analyserScopeController.initialize(),
        setRecorderSampleRate: (sampleRate) => { faustEnv.recorder.sampleRate = sampleRate; }
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
    new ResizablePanelsController(editor, () => wavesurfer).bind();
    new PanelToggleView(editor).bind();

    /*
     * Final startup sequence and compatibility bridge.
     *
     * ApplicationStartupController preserves the historical startup order:
     * unlock audio, initialize analyser state, apply URL/startup controls, then
     * expose `window.faustEnv` for integrations that still depend on it.
     */
    await new ApplicationStartupController({
        audioEnv,
        faustEnv,
        initAudioCtx: () => initializeAudioContext(),
        analyserScopeController,
        loadUrlParams: () => urlParamsController.load(window.location.search),
        createStartupControls: () => new StartupControlsController({
            compileOptions,
            audioEnv,
            fileManager: uiEnv.fileManager,
            dspControlsController,
            updateDiagram
        }),
        selectAudioInput: () => $<HTMLSelectElement>("#select-audio-input").change(),
        exposeFaustEnv: exposeFaustEnvironmentGlobal
    }).apply();
});
