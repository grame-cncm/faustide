import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Scope } from "../Scope";
import { createMockAnalyserNode, createMockChannelSplitter } from "./helpers/audioAnalyser";
import { installAnimationFrameMock } from "./helpers/animationFrame";
import { installMockCanvasContext } from "./helpers/canvasContext";
import { createScopeContainer, setElementVisible } from "./helpers/scopeDom";

const ScopeType = {
    Oscilloscope: 0,
    Spectroscope: 1,
    Spectrogram: 2
} as const;

const createAudioContext = (overrides: Partial<AudioContext> = {}) => ({
    sampleRate: 48000,
    state: "running",
    ...overrides
} as AudioContext);

const setAudioWorklet = (value: unknown) => {
    Object.defineProperty(window, "AudioWorklet", {
        configurable: true,
        value
    });
};

describe("Scope instance behavior", () => {
    let canvasMock: ReturnType<typeof installMockCanvasContext>;
    let rafMock: ReturnType<typeof installAnimationFrameMock>;

    beforeEach(() => {
        canvasMock = installMockCanvasContext({ width: 320, height: 180 });
        rafMock = installAnimationFrameMock();
        setAudioWorklet(function AudioWorklet() {});
    });

    afterEach(() => {
        canvasMock.restore();
        rafMock.restore();
        vi.useRealTimers();
        vi.restoreAllMocks();
    });

    it("creates missing controls and initializes analyser buffers", () => {
        const analyser = createMockAnalyserNode({ fftSize: 512 });
        const splitter = createMockChannelSplitter();
        const { container } = createScopeContainer({ width: 320, height: 180 });

        const scope = new Scope({
            audioCtx: createAudioContext(),
            analyser,
            splitter,
            channels: 2,
            container,
            paused: false
        });

        expect(container.querySelector(".scope-controller")).toBeInstanceOf(HTMLDivElement);
        expect(container.querySelector(".scope-canvas")).toBe(scope.canvas);
        expect(scope.btnSwitch).toBeInstanceOf(HTMLButtonElement);
        expect(scope.btnSize.innerText).toBe("512samps");
        expect(scope.btnCh.innerText).toBe("ch 1");
        expect(scope.t).toHaveLength(512);
        expect(scope.ti).toHaveLength(512);
        expect(scope.f).toHaveLength(256);
        expect(scope.spectTempCtx.canvas.width).toBe(1024);
        expect(scope.spectTempCtx.canvas.height).toBe(1024);
    });

    it("reuses existing controller and canvas children", () => {
        const { container, controller, canvas } = createScopeContainer({
            withController: true,
            withCanvas: true
        });

        const scope = new Scope({
            audioCtx: createAudioContext(),
            analyser: createMockAnalyserNode(),
            splitter: createMockChannelSplitter(),
            channels: 1,
            container,
            paused: false
        });

        expect(scope.canvas).toBe(canvas);
        expect(container.querySelectorAll(".scope-controller")).toHaveLength(1);
        expect(container.querySelector(".scope-controller")).toBe(controller);
    });

    it("pauses by default when AudioWorklet is unavailable and respects explicit paused state when available", () => {
        setAudioWorklet(undefined);
        const unavailable = new Scope({
            audioCtx: createAudioContext(),
            analyser: createMockAnalyserNode(),
            splitter: createMockChannelSplitter(),
            channels: 1,
            container: createScopeContainer().container
        });
        expect(unavailable.paused).toBe(true);

        setAudioWorklet(function AudioWorklet() {});
        const explicit = new Scope({
            audioCtx: createAudioContext(),
            analyser: createMockAnalyserNode(),
            splitter: createMockChannelSplitter(),
            channels: 1,
            container: createScopeContainer().container,
            paused: true
        });
        expect(explicit.paused).toBe(true);
    });

    it("reads analyser data and renders oscilloscope every third visible running frame", () => {
        const analyser = createMockAnalyserNode({ fftSize: 8, frequencyData: [-90, -80, -60, -30], floatTimeDomainData: [0, 0.5, 0, -0.5] });
        const scope = new Scope({
            audioCtx: createAudioContext(),
            analyser,
            splitter: createMockChannelSplitter(),
            channels: 1,
            container: createScopeContainer({ width: 320, height: 180 }).container,
            paused: false
        });
        setElementVisible(scope.canvas, true);
        const drawOscilloscope = vi.spyOn(Scope, "drawOscilloscope").mockImplementation(() => undefined);
        const drawStats = vi.spyOn(Scope, "drawStats").mockImplementation(() => undefined);

        scope.draw();
        scope.draw();
        expect(analyser.getFloatFrequencyData).not.toHaveBeenCalled();

        scope.draw();

        expect(analyser.getFloatFrequencyData).toHaveBeenCalledWith(scope.f);
        expect(analyser.getFloatTimeDomainData).toHaveBeenCalledWith(scope.t);
        expect(drawOscilloscope).toHaveBeenCalledWith(scope.ctx, 320, 180, scope.t, expect.any(Number), 48000, 1, 0);
        expect(drawStats).toHaveBeenCalledWith(scope.ctx, 320, 180, expect.any(Number), expect.any(Number), expect.any(Number), 1);
    });

    it("uses byte time-domain fallback when float time-domain data is unavailable", () => {
        const analyser = createMockAnalyserNode({ fftSize: 4, byteTimeDomainData: [128, 255, 0, 64] }) as any;
        analyser.getFloatTimeDomainData = undefined;
        const scope = new Scope({
            audioCtx: createAudioContext(),
            analyser,
            splitter: createMockChannelSplitter(),
            channels: 1,
            container: createScopeContainer().container,
            paused: false
        });
        setElementVisible(scope.canvas, true);

        scope.draw();
        scope.draw();
        scope.draw();

        expect(analyser.getByteTimeDomainData).toHaveBeenCalledWith(scope.ti);
        expect(Array.from(scope.t)).toEqual([0, 0.9921875, -1, -0.5]);
    });

    it("dispatches spectroscope and spectrogram rendering paths", () => {
        const scope = new Scope({
            audioCtx: createAudioContext(),
            analyser: createMockAnalyserNode({ fftSize: 8 }),
            splitter: createMockChannelSplitter(),
            channels: 1,
            container: createScopeContainer({ width: 320, height: 180 }).container,
            paused: false
        });
        setElementVisible(scope.canvas, true);
        const drawSpectroscope = vi.spyOn(Scope, "drawSpectroscope").mockImplementation(() => undefined);
        const drawSpectrogram = vi.spyOn(Scope, "drawSpectrogram").mockImplementation(() => undefined);
        const drawOfflineSpectrogram = vi.spyOn(Scope, "drawOfflineSpectrogram").mockImplementation(() => undefined);
        vi.spyOn(Scope, "drawStats").mockImplementation(() => undefined);

        scope.type = ScopeType.Spectroscope as any;
        scope.draw();
        scope.draw();
        scope.draw();
        expect(drawSpectroscope).toHaveBeenCalledWith(scope.ctx, 320, 180, scope.f, 1, 0);

        scope.type = ScopeType.Spectrogram as any;
        scope.drawSpectrogram = true;
        scope.draw();
        scope.draw();
        scope.draw();
        expect(drawOfflineSpectrogram).toHaveBeenCalledWith(scope.spectTempCtx, scope.f, expect.any(Number));
        expect(drawSpectrogram).toHaveBeenCalledWith(scope.ctx, scope.spectTempCtx, expect.any(Number), 320, 180, scope.f, 1);
    });

    it("skips analyser reads and rendering when hidden, stopped, or disabled", () => {
        const analyser = createMockAnalyserNode();
        const scope = new Scope({
            audioCtx: createAudioContext({ state: "running" } as Partial<AudioContext>),
            analyser,
            splitter: createMockChannelSplitter(),
            channels: 1,
            container: createScopeContainer().container,
            paused: false
        });
        setElementVisible(scope.canvas, false);

        scope.draw();
        scope.draw();
        scope.draw();
        expect(analyser.getFloatFrequencyData).not.toHaveBeenCalled();

        setElementVisible(scope.canvas, true);
        scope.disabled = true;
        expect(rafMock.cancelAnimationFrame).toHaveBeenCalled();
    });

    it("cycles mode, FFT size, channel, and pause controls", async () => {
        const analyser = createMockAnalyserNode({ fftSize: 128 });
        const splitter = createMockChannelSplitter();
        const scope = new Scope({
            audioCtx: createAudioContext(),
            analyser,
            splitter,
            channels: 2,
            container: createScopeContainer().container,
            paused: false
        });

        scope.btnSwitch.click();
        expect(scope.type).toBe(ScopeType.Spectroscope);
        expect(scope.iSwitch.className).toBe("fas fa-sm fa-chart-bar");
        scope.btnSwitch.click();
        expect(scope.type).toBe(ScopeType.Oscilloscope);

        scope.drawSpectrogram = true;
        scope.btnSwitch.click();
        expect(scope.type).toBe(ScopeType.Spectroscope);
        scope.btnSwitch.click();
        expect(scope.type).toBe(ScopeType.Spectrogram);

        scope.btnSize.click();
        expect(analyser.fftSize).toBe(8192);
        expect(scope.t).toHaveLength(8192);
        expect(scope.f).toHaveLength(4096);
        expect(scope.btnSize.innerText).toBe("8192 samps");

        scope.btnCh.click();
        expect(scope.channel).toBe(1);
        expect(scope.btnCh.innerText).toBe("ch 2");
        expect(splitter.connect).toHaveBeenCalledWith(analyser, 1, 0);
        await new Promise(resolve => setTimeout(resolve, 20));
        expect(splitter.disconnect).toHaveBeenCalledWith(analyser, 0, 0);

        scope.canvas.click();
        expect(scope.paused).toBe(true);
        expect(rafMock.requestAnimationFrame).toHaveBeenCalledWith(scope.drawPause);
        scope.canvas.click();
        expect(scope.paused).toBe(false);
        expect(rafMock.requestAnimationFrame).toHaveBeenCalledWith(scope.draw);
    });

    it("clamps wheel zoom and panning", () => {
        const scope = new Scope({
            audioCtx: createAudioContext(),
            analyser: createMockAnalyserNode(),
            splitter: createMockChannelSplitter(),
            channels: 1,
            container: createScopeContainer().container,
            paused: false
        });
        scope.canvas.getBoundingClientRect = vi.fn(() => ({
            x: 0,
            y: 0,
            top: 0,
            left: 0,
            right: 320,
            bottom: 180,
            width: 320,
            height: 180,
            toJSON: () => ({})
        } as DOMRect));

        const zoomIn = new WheelEvent("wheel", { deltaY: -1 });
        Object.defineProperty(zoomIn, "pageX", { value: 160 });
        scope.canvas.dispatchEvent(zoomIn);
        expect(scope.zoom).toBeCloseTo(1.5);

        const panRight = new WheelEvent("wheel", { deltaX: 1 });
        Object.defineProperty(panRight, "pageX", { value: 160 });
        scope.canvas.dispatchEvent(panRight);
        expect(scope.zoomOffset).toBeGreaterThanOrEqual(0);
        expect(scope.zoomOffset).toBeLessThanOrEqual(1 - 1 / scope.zoom);

        scope.zoom = 999;
        expect(scope.zoom).toBe(16);
        scope.zoomOffset = 999;
        expect(scope.zoomOffset).toBeCloseTo(0.9375);
    });
});
