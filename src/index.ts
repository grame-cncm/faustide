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
 *
 * Startup is deliberately linear:
 *
 * 1. Load browser-only runtimes: Faust WASM/compiler, BrowserFS, Monaco, and
 *    large UI libraries that must not be pulled into tests or runtime services.
 * 2. Create long-lived stores/services before DOM controllers so state,
 *    persistence, compilation, export/share, diagram, and audio dependencies
 *    are injected explicitly.
 * 3. Build the editor/runtime environment and the core audio/DSP/diagram graph.
 *    The single late-bound reference is `dspCompileController`: several early
 *    controllers need a `runDsp` callback, while the compiler controller itself
 *    needs the FileManager created later.
 * 4. Load persisted project files before constructing FileManager, then bind
 *    project/file controllers and optional disk-origin tracking.
 * 5. Bind UI controllers. `bind()` calls stay in this file to make side-effect
 *    order visible and auditable.
 * 6. Run `ApplicationStartupController.apply()`, which unlocks audio,
 *    initializes analysers, applies URL/startup options, and finally exposes
 *    `window.faustEnv` for compatibility.
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
import { DiskCoherenceController } from "./ui/DiskCoherenceController";
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
import { pickDirectory, fsAccessAvailable, ensureRwPermission, type DroppedFileHandleCallback } from "./runtime/fs/FileAccess";
import { MountRegistry } from "./runtime/fs/MountRegistry";
import { DiskOriginTracker } from "./runtime/fs/DiskOriginTracker";
import { DiskCoherenceService } from "./runtime/fs/DiskCoherenceService";
import { createDroppedDiskFileTracker } from "./runtime/fs/DroppedDiskFileTracking";
import { openFromVolume, pickAndImportDeviceFile, saveBundleToVolume } from "./runtime/fs/VolumeFileActions";

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
     * These objects are shared by several controllers and remain alive for the
     * browser session. They are created before DOM controllers so every
     * controller receives explicit dependencies instead of importing storage,
     * Faust runtime, or service globals directly.
     *
     * - EditorSettingsStore owns localStorage compatibility keys and versioned
     *   editor/DSP options.
     * - ProjectPersistence bridges BrowserFS and the Faust virtual FS so the
     *   file manager starts from the persisted project snapshot.
     * - DiagramService is the DOM-free Faust SVG generation/read boundary.
     * - ExportService and ShareUrlService isolate faustservice upload/target
     *   behavior and query-string compatibility.
     * - RuntimeSettingsController translates saved settings into the runtime
     *   compile/DSP option records used by controllers.
     * - AppRuntimeConfig keeps mutable feature flags and the selected
     *   faustservice endpoint in one place.
     * - BrowserAudioEngineBindings adapts browser audio state changes to the UI
     *   without letting AudioEngine know about DOM elements.
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
     * AudioEngine owns the base Web Audio graph and must be constructed before
     * controllers that can request audio input/output. DspRunner owns Faust DSP
     * node creation/replacement and depends on the already-created compile
     * environment. AnalyserScopeController owns analyser/plot scope startup and
     * is initialized in two stages: lightweight plot setup here, full analyser
     * initialization later when audio is unlocked.
     *
     * DiagramController can be constructed immediately because it depends only
     * on the editor, Monaco, compile options, and DiagramService. The
     * composition root only supplies browser adapters and callbacks between
     * these pieces.
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
     * side effects used by FileManager. It is built before FileManager because
     * it provides the handlers, but it is bound to editor content after all file
     * and example controllers are registered.
     */
    await projectPersistence.loadProject(compileOptions.saveCode);
    const diskTracker = new DiskOriginTracker();
    const diskCoherence = new DiskCoherenceService(diskTracker);
    const projectRuntimeController = new ProjectRuntimeController({
        compileOptions,
        audioEnv,
        projectPersistence,
        alertController,
        saveEditorParams: () => runtimeSettings.saveCompileOptions(compileOptions),
        runDsp,
        updateDiagram,
        onDiskSave: async (fileName, content) => {
            await diskCoherence.checkBeforeWrite(fileName, content);
            await diskTracker.writeToDisk(fileName, content);
            diskCoherence.acceptWrittenContent(fileName, content);
        },
        onFileDelete: (fileName) => {
            diskTracker.forget(fileName);
            diskCoherence.forget(fileName);
        }
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
     * DspControlsController owns run/build options and therefore needs the
     * late-bound `runDsp` action. MidiController is constructed before
     * FaustUiController because the generated UI can send MIDI through a getter.
     * FaustUiController owns the generated Faust UI and popup synchronization.
     * DspCompileController closes the dependency cycle by connecting editor
     * code, Faust compilation, DSP node replacement, analyser initialization,
     * recorder state, and diagram refresh.
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
     * so startup order remains explicit: generic alerts/tooltips first, then
     * settings and plot controls, then URL/project/file controls that can call
     * run/diagram actions.
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
    const mountRegistry = new MountRegistry(uiEnv.fileManager.model);
    // Shared mutable volume list — both browsers hold the same reference so
    // pushing a new DiskVolume is visible on the next open() call.
    const volumes: Volume[] = [];

    // Restore disk mounts persisted in IDB from previous sessions.
    for (const { id, handle } of await mountRegistry.loadDiskMounts()) {
        volumes.push(new DiskVolume(handle, id));
    }

    // Origins persisted by a previous session, keyed by saved file name. Prune
    // names no longer present in the project before re-applying green status.
    const persistedOrigins = DiskOriginTracker.prunePersistedOrigins(uiEnv.fileManager.fileNames);

    // Re-establish disk tracking for a single file: green indicator + write-back
    // link. Reuses the in-memory origin when present, otherwise falls back to
    // the origin persisted by a previous session. No-op when the file has no
    // known origin.
    const restoreDiskTracking = (savedName: string): void => {
        if (!diskTracker.has(savedName)) {
            const origin = persistedOrigins.get(savedName);
            if (!origin) return;
            const vol = volumes.find(v => v.id === origin.volumeId);
            if (!vol) return;
            diskTracker.restore(savedName, vol as DiskVolume, origin.path);
        }
        uiEnv.fileManager.setDiskTracked(savedName, true);
        void diskCoherence.acceptKnownContent(savedName, uiEnv.fileManager.getValue(savedName));
    };

    // On startup, re-apply tracking to every project file.
    uiEnv.fileManager.fileNames.forEach(restoreDiskTracking);

    // When a file is dropped from a mounted folder, find which volume it belongs
    // to and mark it as disk-tracked (green indicator + write-back on save).
    // resolvePath relies on the Chromium-only FS Access API — gate on availability.
    const warnLocalDiskConflict = (fileName: string) => alertController.show(
        `${fileName} already exists as a local copy. Rename or delete it before opening the mounted disk file.`
    );
    const onDiskDropCallback: DroppedFileHandleCallback | undefined = fsAccessAvailable()
        ? createDroppedDiskFileTracker({
            volumes,
            diskTracker,
            fileManager: uiEnv.fileManager,
            onLocalConflict: warnLocalDiskConflict,
            onDiskTracked: fileName => diskCoherence.captureDiskSnapshot(fileName)
        })
        : undefined;
    uiEnv.fileManager.onDroppedFileHandle = onDiskDropCallback;
    const diskCoherenceController = new DiskCoherenceController({
        fileManager: uiEnv.fileManager,
        diskTracker,
        diskCoherence,
        alertController
    });
    diskCoherenceController.bind();
    new ProjectFilesController({
        fileManager: uiEnv.fileManager,
        compileOptions,
        audioEnv,
        createZip: () => new JSZip(),
        runDsp,
        updateDiagram,
        onDroppedFileHandle: onDiskDropCallback
    }).bind();

    const mountDisk = fsAccessAvailable() ? async () => {
        const dirHandle = await pickDirectory();
        if (!dirHandle) return;
        const id = await mountRegistry.mountDisk(dirHandle);
        if (volumes.some(vol => vol.id === id)) return;
        volumes.push(new DiskVolume(dirHandle, id));
    } : undefined;

    const unmountDisk = fsAccessAvailable() ? (vol: Volume) => {
        const index = volumes.findIndex(existing => existing.id === vol.id);
        if (index === -1 || vol.kind !== "disk") return;
        volumes.splice(index, 1);
        void mountRegistry.unmountDisk(vol.id);
        diskTracker.forgetVolume(vol.id).forEach((fileName) => {
            uiEnv.fileManager.setDiskTracked(fileName, false);
            diskCoherence.forget(fileName);
        });
    } : undefined;

    const reauthorize = async (vol: Volume): Promise<boolean> => {
        const diskVol = vol as DiskVolume;
        if (!diskVol.rootHandle) return false;
        return ensureRwPermission(diskVol.rootHandle);
    };

    const openBrowser = new VolumeBrowserController({
        volumes,
        onOpen: (vol, entry) => {
            void openFromVolume(
                {
                    fileManager: uiEnv.fileManager,
                    diskTracker,
                    onLocalConflict: warnLocalDiskConflict,
                    onDiskTracked: fileName => diskCoherence.captureDiskSnapshot(fileName)
                },
                vol,
                entry
            );
        },
        onOpenDeviceFile: () => pickAndImportDeviceFile({ fileManager: uiEnv.fileManager }),
        onMountDisk: mountDisk,
        onUnmountDisk: unmountDisk,
        onReauthorize: reauthorize
    });
    openBrowser.bind();

    const saveBrowser = new VolumeBrowserController({
        volumes,
        mode: "save",
        onSave: (vol, folderPath, name) => {
            void saveBundleToVolume({ fileManager: uiEnv.fileManager }, vol, folderPath, name);
        },
        onMountDisk: mountDisk,
        onUnmountDisk: unmountDisk,
        onReauthorize: reauthorize
    });

    // Add a "Save to disk" button in the file manager header (💾, right: 50px).
    // The original #btn-save (zip download) is left unchanged.
    if (fsAccessAvailable()) saveBrowser.bindSave();
    // Do not await — target discovery is a background network call that must
    // not block the rest of startup (Run button, audio device init, etc.).
    new ExportController({
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
     * MidiController is constructed earlier (FaustUiController reads it through
     * a getter); here it only binds its DOM and Web MIDI listeners. Audio input
     * binds before output/device enumeration so a selected input can initialize
     * the audio context and create WaveSurfer. Device binding is awaited because
     * later startup reads the populated input selector. DSP UI refresh then
     * reconciles any saved DSP parameters before run controls and recorder
     * controls become interactive. WaveSurfer is captured after
     * AudioInputController creates it, then passed to panel resizing.
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
     * ApplicationStartupController preserves the historical startup order after
     * all controllers are bound:
     *
     * 1. initialize/unlock the audio context and copy its sample rate into the
     *    recorder;
     * 2. initialize analyser state and hide the output display until the user
     *    enables it;
     * 3. trigger the audio-input selector so saved/default input state is
     *    reflected in the audio graph;
     * 4. load URL parameters, which may update files/options and optionally run
     *    DSP;
     * 5. apply startup controls from saved compile options;
     * 6. expose `window.faustEnv` last, once the compatibility object reflects
     *    the initialized editor, filesystem, audio, UI, and recorder state.
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
