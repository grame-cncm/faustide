import type { FaustEditorAudioEnv, FaustEditorEnv } from "../runtime/types";

/**
 * Minimal analyser API required during startup.
 *
 * Keeping this contract local lets the composition root provide the existing
 * analyser controller without coupling startup orchestration to its full UI API.
 */
type AnalyserStartupController = {
    initialize: () => void;
    disableOutputDisplay: () => void;
};

/**
 * Startup control hook created by the composition root.
 */
type StartupControls = {
    apply: () => void;
};

type ApplicationStartupControllerOptions = {
    audioEnv: FaustEditorAudioEnv;
    faustEnv: FaustEditorEnv;
    initAudioCtx: () => Promise<any> | any;
    analyserScopeController: AnalyserStartupController;
    loadUrlParams: () => Promise<any>;
    createStartupControls: () => StartupControls;
    selectAudioInput: () => void;
    exposeFaustEnv: (faustEnv: FaustEditorEnv) => void;
};

/**
 * Runs the final application startup sequence after controllers are bound.
 *
 * The order is intentionally kept close to the historical `index.ts` flow:
 * unlock audio, synchronize recorder sample rate, initialize analysers, trigger
 * input selection, import URL parameters, apply startup controls, then expose
 * the compatibility Faust environment.
 *
 * This class owns ordering only. It does not construct application services;
 * those factories stay in `index.ts`, where the wiring remains visible.
 */
export class ApplicationStartupController {
    private readonly options: ApplicationStartupControllerOptions;

    /**
     * Stores the startup actions provided by the composition root.
     */
    constructor(options: ApplicationStartupControllerOptions) {
        this.options = options;
    }

    /**
     * Applies the startup sequence needed before the app is ready for use.
     *
     * Audio is initialized first because later controllers read the live audio
     * context, and URL/startup controls run after the initial UI state exists.
     */
    async apply(): Promise<void> {
        const {
            audioEnv,
            faustEnv,
            initAudioCtx,
            analyserScopeController,
            loadUrlParams,
            createStartupControls,
            selectAudioInput,
            exposeFaustEnv
        } = this.options;

        await initAudioCtx();
        faustEnv.recorder.sampleRate = audioEnv.audioCtx.sampleRate;
        analyserScopeController.initialize();
        analyserScopeController.disableOutputDisplay();
        selectAudioInput();
        await loadUrlParams();
        createStartupControls().apply();
        exposeFaustEnv(faustEnv);
    }
}
