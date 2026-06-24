import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { drawRealtimeScopePause, runRealtimeScopeDrawLoop } from "../scope/realtime/ScopeDrawLoop";
import { RealtimeScopeType } from "../scope/ScopeModes";
import { createMockAnalyserNode } from "./helpers/audioAnalyser";
import { installAnimationFrameMock } from "./helpers/animationFrame";
import { createMockCanvasContext } from "./helpers/canvasContext";
import { setElementVisible } from "./helpers/scopeDom";

const createTarget = (overrides: Record<string, unknown> = {}) => {
    const container = document.createElement("div");
    Object.defineProperty(container, "clientWidth", { configurable: true, value: 320 });
    Object.defineProperty(container, "clientHeight", { configurable: true, value: 180 });
    const main = createMockCanvasContext({ width: 320, height: 180 });
    const cache = createMockCanvasContext({ width: 4, height: 64 });
    setElementVisible(main.canvas, true);

    return {
        raf: undefined,
        frame: 0,
        audioCtx: { sampleRate: 48000, state: "running" } as AudioContext,
        analyser: createMockAnalyserNode({ fftSize: 8, frequencyData: [-90, -80, -60, -30], floatTimeDomainData: [0, 0.5, 0, -0.5] }) as unknown as AnalyserNode,
        container,
        canvas: main.canvas,
        ctx: main.context,
        spectTempCtx: cache.context,
        spectCol$: 0,
        type: RealtimeScopeType.Oscilloscope,
        drawSpectrogram: false,
        zoom: 1,
        zoomOffset: 0,
        t: new Float32Array(8),
        ti: new Uint8Array(8),
        f: new Float32Array(4),
        draw: vi.fn(),
        ...overrides
    };
};

const createRenderers = () => ({
    drawOfflineSpectrogram: vi.fn(),
    drawOscilloscope: vi.fn(),
    drawSpectroscope: vi.fn(),
    drawSpectrogram: vi.fn(),
    drawStats: vi.fn()
});

describe("ScopeDrawLoop", () => {
    let rafMock: ReturnType<typeof installAnimationFrameMock>;

    beforeEach(() => {
        rafMock = installAnimationFrameMock();
    });

    afterEach(() => {
        rafMock.restore();
    });

    it("throttles analyser reads and dispatches oscilloscope rendering every third visible running frame", () => {
        const target = createTarget();
        const renderers = createRenderers();

        runRealtimeScopeDrawLoop(target as any, renderers);
        runRealtimeScopeDrawLoop(target as any, renderers);
        expect((target.analyser as any).getFloatFrequencyData).not.toHaveBeenCalled();

        runRealtimeScopeDrawLoop(target as any, renderers);

        expect((target.analyser as any).getFloatFrequencyData).toHaveBeenCalledWith(target.f);
        expect((target.analyser as any).getFloatTimeDomainData).toHaveBeenCalledWith(target.t);
        expect(renderers.drawOscilloscope).toHaveBeenCalledWith(target.ctx, 320, 180, target.t, expect.any(Number), 48000, 1, 0);
        expect(renderers.drawStats).toHaveBeenCalledWith(target.ctx, 320, 180, expect.any(Number), expect.any(Number), expect.any(Number), 1);
        expect(rafMock.frames.length).toBe(3);
    });

    it("dispatches spectrogram rendering and advances the cache column", () => {
        const target = createTarget({
            frame: 2,
            type: RealtimeScopeType.Spectrogram,
            drawSpectrogram: true
        });
        const renderers = createRenderers();

        runRealtimeScopeDrawLoop(target as any, renderers);

        expect(renderers.drawOfflineSpectrogram).toHaveBeenCalledWith(target.spectTempCtx, target.f, 0);
        expect(renderers.drawSpectrogram).toHaveBeenCalledWith(target.ctx, target.spectTempCtx, 0, 320, 180, target.f, 1);
        expect(target.spectCol$).toBe(1);
    });

    it("skips analyser reads while hidden or stopped but still schedules the next frame", () => {
        const hidden = createTarget({ frame: 2 });
        setElementVisible(hidden.canvas, false);
        const stopped = createTarget({ frame: 2, audioCtx: { sampleRate: 48000, state: "suspended" } as AudioContext });
        const renderers = createRenderers();

        runRealtimeScopeDrawLoop(hidden as any, renderers);
        runRealtimeScopeDrawLoop(stopped as any, renderers);

        expect((hidden.analyser as any).getFloatFrequencyData).not.toHaveBeenCalled();
        expect((stopped.analyser as any).getFloatFrequencyData).not.toHaveBeenCalled();
        expect(rafMock.frames.length).toBe(2);
    });

    it("draws the pause overlay", () => {
        const { context } = createMockCanvasContext();

        drawRealtimeScopePause(context, 320, 180);

        expect(context.fillRect).toHaveBeenCalledWith(0, 0, 320, 180);
        expect(context.fillRect).toHaveBeenCalledWith(121.6, 62.99999999999999, 25.6, 54);
        expect(context.fillRect).toHaveBeenCalledWith(172.8, 62.99999999999999, 25.6, 54);
    });
});
