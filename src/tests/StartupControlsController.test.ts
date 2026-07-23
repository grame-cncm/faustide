import { beforeEach, describe, expect, it, vi } from "vitest";
import { StartupControlsController } from "../ui/StartupControlsController";

const setupDom = () => {
    document.body.innerHTML = `
        <select id="select-voices"><option value="0"></option><option value="8"></option></select>
        <select id="select-buffer-size"><option value="1024"></option><option value="512"></option></select>
        <select id="select-plot-mode"><option value="offline"></option><option value="continuous"></option></select>
        <select id="select-plot-fftsize"><option value="256"></option><option value="512"></option></select>
        <select id="select-plot-fftoverlap"><option value="2"></option><option value="4"></option></select>
        <select id="select-plot-fftwindow"><option value="auto"></option><option value="blackman"></option></select>
        <input id="input-plot-samps" />
        <input id="check-draw-spectrogram" type="checkbox" />
        <input id="check-realtime-compile" type="checkbox" />
    `;
};

const bindController = (overrides: any = {}) => {
    const compileOptions = {
        voices: 8,
        bufferSize: 512,
        useWorklet: true,
        plotMode: "continuous",
        plotFFT: 512,
        plotFFTOverlap: 4,
        plotFFTWindow: "blackman",
        realtimeCompile: false,
        ...overrides.compileOptions
    };
    const options = {
        compileOptions,
        audioEnv: { ...overrides.audioEnv },
        fileManager: { mainCode: "process = _;" },
        dspControlsController: { applyUseWorkletMode: vi.fn() },
        updateDiagram: vi.fn(() => ({ success: true }))
    };
    const controller = new StartupControlsController(options as any);
    return { controller, options };
};

describe("StartupControlsController", () => {
    beforeEach(() => {
        vi.restoreAllMocks();
        vi.useFakeTimers();
        setupDom();
    });

    it("applies loaded compile options to startup controls", () => {
        const { controller, options } = bindController();

        controller.apply();

        expect($("#select-voices").val()).toBe("8");
        expect($("#select-buffer-size").val()).toBe("512");
        expect(options.dspControlsController.applyUseWorkletMode).toHaveBeenCalledWith(true, false);
        expect($("#select-plot-mode").val()).toBe("continuous");
        expect($("#select-plot-fftsize").val()).toBe("512");
        expect($("#select-plot-fftoverlap").val()).toBe("4");
        expect($("#select-plot-fftwindow").val()).toBe("blackman");
        expect($<HTMLInputElement>("#check-realtime-compile")[0].checked).toBe(false);
    });

    it("schedules an initial diagram when realtime compile is enabled without a DSP", () => {
        const { controller, options } = bindController({
            compileOptions: { realtimeCompile: true }
        });

        controller.apply();
        vi.runOnlyPendingTimers();

        expect(options.updateDiagram).toHaveBeenCalledWith("process = _;");
        expect($<HTMLInputElement>("#check-realtime-compile")[0].checked).toBe(true);
    });

    it("does not schedule an initial diagram when a DSP is already running", () => {
        const { controller, options } = bindController({
            compileOptions: { realtimeCompile: true },
            audioEnv: { dsp: {} }
        });

        controller.apply();
        vi.runOnlyPendingTimers();

        expect(options.updateDiagram).not.toHaveBeenCalled();
    });
});
