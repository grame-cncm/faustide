import { beforeEach, describe, expect, it, vi } from "vitest";
import { PlotController } from "../ui/PlotController";

// PlotController tests cover DOM/state binding. Offline Faust rendering remains
// delegated to faustwasm and is kept out of the fast jsdom path.
const createCompileOptions = () => ({
    useWorklet: true,
    useDouble: false,
    bufferSize: 1024,
    saveCode: true,
    saveParams: false,
    saveDsp: false,
    realtimeCompile: false,
    popup: false,
    voices: 0,
    plotMode: "offline" as const,
    plot: 256,
    plotSR: 48000,
    plotFFT: 256 as const,
    plotFFTOverlap: 2 as const,
    drawSpectrogram: false,
    args: ["-I", "/project"],
    enableGuiBuilder: false,
    guiBuilderUrl: "",
    exportPlatform: "source",
    exportArch: "cplusplus",
    mainFile: "main.dsp"
});

const createUiEnv = () => ({
    analyser: {
        drawMode: "offline",
        buffers: 0,
        fftSize: 256,
        fftOverlap: 2,
        draw: vi.fn(),
        plotHandler: vi.fn()
    },
    plotScope: {
        mode: 0,
        draw: vi.fn(),
        drawSpectrogram: false
    },
    inputScope: {
        drawSpectrogram: false
    },
    outputScope: {
        drawSpectrogram: false
    }
});

const setupDom = () => {
    document.body.innerHTML = `
        <select id="select-plot-mode">
            <option value="offline">Offline</option>
            <option value="manual">Manual</option>
            <option value="continuous">Continuous</option>
        </select>
        <button id="btn-plot"><span></span></button>
        <div id="tab-plot-ui"></div>
        <input id="input-plot-samps" step="128" />
        <input id="input-plot-sr" />
        <input id="check-draw-spectrogram" type="checkbox" />
        <select id="select-plot-fftsize"></select>
        <select id="select-plot-fftoverlap"></select>
    `;
};

describe("PlotController", () => {
    beforeEach(() => {
        $(document).off();
        setupDom();
    });

    it("applies plot mode UI state and sample-rate enablement", () => {
        const compileOptions = createCompileOptions();
        const uiEnv = createUiEnv();
        const saveEditorParams = vi.fn();
        new PlotController({
            compileOptions: compileOptions as any,
            audioEnv: { audioCtx: { sampleRate: 44100 }, dspConnectedToInput: false, dspConnectedToOutput: false, inputEnabled: false, outputEnabled: false } as any,
            uiEnv: uiEnv as any,
            faustCompiler: {} as any,
            dspRunner: {} as any,
            getMainCode: () => "process = _;",
            runDsp: vi.fn(),
            saveEditorParams
        }).bind();

        $("#select-plot-mode").val("manual").trigger("change");
        expect(compileOptions.plotMode).toBe("manual");
        expect($("#btn-plot").css("display")).not.toBe("none");
        expect($("#btn-plot span").text()).toBe("Plot (Snapshot)");
        expect($("#input-plot-sr").prop("disabled")).toBe(true);
        expect($("#input-plot-sr").val()).toBe("44100");
        expect(saveEditorParams).toHaveBeenCalled();

        $("#select-plot-mode").val("continuous").trigger("change");
        expect($("#btn-plot").css("display")).toBe("none");
        expect(uiEnv.plotScope.mode).toBe(2);
    });

    it("quantizes sample count and updates analyser buffer count", () => {
        const compileOptions = createCompileOptions();
        const uiEnv = createUiEnv();
        const saveEditorParams = vi.fn();
        new PlotController({
            compileOptions: compileOptions as any,
            audioEnv: { dspConnectedToInput: false, dspConnectedToOutput: false, inputEnabled: false, outputEnabled: false } as any,
            uiEnv: uiEnv as any,
            faustCompiler: {} as any,
            dspRunner: {} as any,
            getMainCode: () => "process = _;",
            runDsp: vi.fn(),
            saveEditorParams
        }).bind();

        $("#input-plot-samps").val("300").trigger("change");

        expect(compileOptions.plot).toBe(512);
        expect(uiEnv.analyser.buffers).toBe(4);
        expect($("#input-plot-samps").attr("step")).toBe("256");
        expect(saveEditorParams).toHaveBeenCalled();
    });

    it("updates spectrogram flags across scopes", () => {
        const compileOptions = createCompileOptions();
        const uiEnv = createUiEnv();
        new PlotController({
            compileOptions: compileOptions as any,
            audioEnv: { dspConnectedToInput: false, dspConnectedToOutput: false, inputEnabled: false, outputEnabled: false } as any,
            uiEnv: uiEnv as any,
            faustCompiler: {} as any,
            dspRunner: {} as any,
            getMainCode: () => "process = _;",
            runDsp: vi.fn(),
            saveEditorParams: vi.fn()
        }).bind();

        $("#check-draw-spectrogram").prop("checked", true).trigger("change");

        expect(compileOptions.drawSpectrogram).toBe(true);
        expect(uiEnv.plotScope.drawSpectrogram).toBe(true);
        expect(uiEnv.inputScope.drawSpectrogram).toBe(true);
        expect(uiEnv.outputScope.drawSpectrogram).toBe(true);
    });

    it("toggles the spectrogram flag without throwing before the analyser scopes exist", () => {
        const compileOptions = createCompileOptions();
        const uiEnv = createUiEnv();
        // input/output scopes are created lazily on first analyser init.
        uiEnv.inputScope = null;
        uiEnv.outputScope = null;
        new PlotController({
            compileOptions: compileOptions as any,
            audioEnv: { dspConnectedToInput: false, dspConnectedToOutput: false, inputEnabled: false, outputEnabled: false } as any,
            uiEnv: uiEnv as any,
            faustCompiler: {} as any,
            dspRunner: {} as any,
            getMainCode: () => "process = _;",
            runDsp: vi.fn(),
            saveEditorParams: vi.fn()
        }).bind();

        expect(() => $("#check-draw-spectrogram").prop("checked", true).trigger("change")).not.toThrow();
        expect(compileOptions.drawSpectrogram).toBe(true);
        expect(uiEnv.plotScope.drawSpectrogram).toBe(true);
    });

    it("draws the analyser in non-offline mode when a DSP already exists", async () => {
        const compileOptions = createCompileOptions();
        compileOptions.plotMode = "manual";
        const uiEnv = createUiEnv();
        new PlotController({
            compileOptions: compileOptions as any,
            audioEnv: { dsp: {}, dspConnectedToInput: false, dspConnectedToOutput: false, inputEnabled: false, outputEnabled: false } as any,
            uiEnv: uiEnv as any,
            faustCompiler: {} as any,
            dspRunner: {} as any,
            getMainCode: () => "process = _;",
            runDsp: vi.fn(),
            saveEditorParams: vi.fn()
        }).bind();

        $("#btn-plot").trigger("click");
        await Promise.resolve();

        expect(uiEnv.analyser.draw).toHaveBeenCalledTimes(1);
    });
});
