import { beforeEach, describe, expect, it, vi } from "vitest";
import { AnalyserScopeController } from "../ui/AnalyserScopeController";

const setupDom = () => {
    document.body.innerHTML = `
        <div id="input-analyser-ui"></div>
        <div id="output-analyser-ui"></div>
        <div id="plot-ui"></div>
    `;
};

const bindController = (overrides: any = {}) => {
    const createdScopes: any[] = [];
    const ScopeFactory = vi.fn(function FakeScope(this: any, options: any) {
        Object.assign(this, options);
        this.disabled = false;
        createdScopes.push(this);
    });
    const audioEnv = {
        audioCtx: { sampleRate: 48000 },
        analyserInput: { name: "inputAnalyser" },
        splitterInput: { name: "inputSplitter" },
        analyserOutput: { name: "outputAnalyser" },
        splitterOutput: { name: "outputSplitter" },
        ...overrides.audioEnv
    };
    const uiEnv = {
        analysersInited: false,
        inputScope: null,
        outputScope: null,
        analyser: {},
        ...overrides.uiEnv
    };
    const compileOptions = {
        plotMode: "offline",
        plotSR: 44100,
        ...overrides.compileOptions
    };
    const StaticScopeFactory = vi.fn(function FakeStaticScope(this: any, options: any) {
        Object.assign(this, options);
        this.draw = vi.fn();
    });
    const controller = new AnalyserScopeController({
        audioEnv,
        uiEnv,
        compileOptions,
        scopeFactory: ScopeFactory as any,
        staticScopeFactory: StaticScopeFactory as any
    });
    return { controller, audioEnv, uiEnv, compileOptions, ScopeFactory, StaticScopeFactory, createdScopes };
};

describe("AnalyserScopeController", () => {
    beforeEach(() => {
        vi.restoreAllMocks();
        setupDom();
    });

    it("initializes input and output scopes once", () => {
        const { controller, audioEnv, uiEnv, ScopeFactory } = bindController();

        controller.initialize();
        controller.initialize();

        expect(ScopeFactory).toHaveBeenCalledTimes(2);
        expect(uiEnv.analysersInited).toBe(true);
        expect(uiEnv.inputScope.analyser).toBe(audioEnv.analyserInput);
        expect(uiEnv.inputScope.channels).toBe(2);
        expect(uiEnv.outputScope.analyser).toBe(audioEnv.analyserOutput);
        expect(uiEnv.outputScope.channels).toBe(1);
    });

    it("hides and disables the output scope display", () => {
        const { controller, uiEnv } = bindController();

        controller.initialize();
        controller.disableOutputDisplay();

        expect($("#output-analyser-ui").css("display")).toBe("none");
        expect(uiEnv.outputScope.disabled).toBe(true);
    });

    it("initializes the plot scope and analyser draw callbacks", () => {
        const { controller, audioEnv, uiEnv, compileOptions, StaticScopeFactory } = bindController();

        controller.initializePlotScope();

        expect(StaticScopeFactory).toHaveBeenCalledWith({ container: $("#plot-ui")[0] });
        expect(uiEnv.analyser.drawHandler).toBe(uiEnv.plotScope.draw);
        expect(uiEnv.analyser.getSampleRate()).toBe(44100);

        uiEnv.plotScope.draw();
        expect(uiEnv.plotScope.draw).toHaveBeenCalled();

        compileOptions.plotMode = "continuous";
        expect(uiEnv.analyser.getSampleRate()).toBe(audioEnv.audioCtx.sampleRate);
    });
});
