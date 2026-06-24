import { Scope } from "../Scope";
import { StaticScope } from "../StaticScope";
import type { FaustEditorAudioEnv, FaustEditorCompileOptions, FaustEditorUIEnv } from "../runtime/types";

type ScopeFactoryOptions = ConstructorParameters<typeof Scope>[0];
type ScopeFactory = new (options: ScopeFactoryOptions) => Scope;
type StaticScopeFactoryOptions = ConstructorParameters<typeof StaticScope>[0];
type StaticScopeFactory = new (options: StaticScopeFactoryOptions) => StaticScope;

type AnalyserScopeControllerOptions = {
    audioEnv: FaustEditorAudioEnv;
    uiEnv: FaustEditorUIEnv;
    compileOptions: FaustEditorCompileOptions;
    scopeFactory?: ScopeFactory;
    staticScopeFactory?: StaticScopeFactory;
};

/**
 * Creates and initializes oscilloscope/analyser UI scopes.
 *
 * AudioEngine owns the Web Audio graph. This controller owns the UI Scope
 * instances bound to that graph and the offline plot scope used by the plot
 * controls. It also keeps one-time initialization protection and startup
 * hidden/disabled output state away from the composition root.
 */
export class AnalyserScopeController {
    private readonly audioEnv: FaustEditorAudioEnv;
    private readonly uiEnv: FaustEditorUIEnv;
    private readonly compileOptions: FaustEditorCompileOptions;
    private readonly scopeFactory: ScopeFactory;
    private readonly staticScopeFactory: StaticScopeFactory;

    constructor(options: AnalyserScopeControllerOptions) {
        this.audioEnv = options.audioEnv;
        this.uiEnv = options.uiEnv;
        this.compileOptions = options.compileOptions;
        this.scopeFactory = options.scopeFactory || Scope;
        this.staticScopeFactory = options.staticScopeFactory || StaticScope;
    }

    /**
     * Creates the plot scope and connects the analyser callbacks used for
     * offline, continuous, event, and manual plot rendering.
     *
     * The analyser asks for its sample rate lazily so it always reflects the
     * current plot mode and audio context.
     */
    initializePlotScope() {
        this.uiEnv.plotScope = new this.staticScopeFactory({ container: $<HTMLDivElement>("#plot-ui")[0] });
        this.uiEnv.analyser.drawHandler = this.uiEnv.plotScope.draw;
        this.uiEnv.analyser.getSampleRate = () => (
            this.compileOptions.plotMode === "offline"
                ? this.compileOptions.plotSR
                : this.audioEnv.audioCtx.sampleRate
        );
    }

    /**
     * Initializes input and output analyser scopes once.
     */
    initialize() {
        if (this.uiEnv.analysersInited) return;
        this.uiEnv.inputScope = new this.scopeFactory({
            audioCtx: this.audioEnv.audioCtx,
            analyser: this.audioEnv.analyserInput,
            splitter: this.audioEnv.splitterInput,
            channels: 2,
            container: $<HTMLDivElement>("#input-analyser-ui")[0]
        });
        this.uiEnv.outputScope = new this.scopeFactory({
            audioCtx: this.audioEnv.audioCtx,
            analyser: this.audioEnv.analyserOutput,
            splitter: this.audioEnv.splitterOutput,
            channels: 1,
            container: $<HTMLDivElement>("#output-analyser-ui")[0]
        });
        this.uiEnv.analysersInited = true;
    }

    /**
     * Applies the initial no-DSP output scope state used at startup.
     */
    disableOutputDisplay() {
        $("#output-analyser-ui").hide();
        if (this.uiEnv.outputScope) this.uiEnv.outputScope.disabled = true;
    }
}
