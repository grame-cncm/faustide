import type { Scope } from "../../Scope";
import type { StaticScope } from "../../StaticScope";
import type { FaustEditorUIEnv } from "../types";

/**
 * Single-owner accessor over the analyser/scope slice of the UI runtime state
 * (Phase 12).
 *
 * Like {@link AudioGraphState}, it wraps the *same* {@link FaustEditorUIEnv}
 * record so the `window.faustEnv.uiEnv` identity and the e2e contract are
 * preserved. The scope instances and the one-time `analysersInited` guard are
 * owned by `AnalyserScopeController`; this type makes that ownership explicit
 * and keeps the writes in one place.
 */
export class ScopeState {
    constructor(private readonly env: FaustEditorUIEnv) {}

    /** Whether the input/output analyser scopes have been created. */
    get analysersInited(): boolean {
        return this.env.analysersInited;
    }

    markAnalysersInited(): void {
        this.env.analysersInited = true;
    }

    get inputScope(): Scope {
        return this.env.inputScope;
    }

    setInputScope(scope: Scope): void {
        this.env.inputScope = scope;
    }

    get outputScope(): Scope {
        return this.env.outputScope;
    }

    setOutputScope(scope: Scope): void {
        this.env.outputScope = scope;
    }

    get plotScope(): StaticScope {
        return this.env.plotScope;
    }

    setPlotScope(scope: StaticScope): void {
        this.env.plotScope = scope;
    }
}
