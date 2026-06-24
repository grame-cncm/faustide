import { Scope } from "../Scope";
import type { FaustEditorAudioEnv, FaustEditorUIEnv } from "../runtime/types";

type ScopeFactoryOptions = ConstructorParameters<typeof Scope>[0];
type ScopeFactory = new (options: ScopeFactoryOptions) => Scope;

type AnalyserScopeControllerOptions = {
    audioEnv: FaustEditorAudioEnv;
    uiEnv: FaustEditorUIEnv;
    scopeFactory?: ScopeFactory;
};

/**
 * Creates and initializes oscilloscope/analyser UI scopes.
 *
 * AudioEngine owns the Web Audio graph. This controller owns the UI Scope
 * instances bound to that graph: input scope, output scope, one-time
 * initialization protection, and the startup hidden/disabled output state.
 */
export class AnalyserScopeController {
    private readonly audioEnv: FaustEditorAudioEnv;
    private readonly uiEnv: FaustEditorUIEnv;
    private readonly scopeFactory: ScopeFactory;

    constructor(options: AnalyserScopeControllerOptions) {
        this.audioEnv = options.audioEnv;
        this.uiEnv = options.uiEnv;
        this.scopeFactory = options.scopeFactory || Scope;
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
