import { describe, expect, it, vi } from "vitest";
import type { TDrawOptions } from "../StaticScope";
import { drawStaticOfflineSpectrogram, drawStaticSpectrogram } from "../scope/static/SpectrogramRenderer";
import { FrequencyScaleMode, StaticScopeMode } from "../scope/ScopeModes";
import { createMockCanvasContext } from "./helpers/canvasContext";

const createDrawOptions = (overrides: Partial<TDrawOptions> = {}): TDrawOptions => ({
    drawMode: "manual",
    startSampleIndex: 0,
    startBufferIndex: 0,
    freqDomainData: [new Float32Array(16).fill(-30)],
    events: [],
    bufferSize: 4,
    fftSize: 8,
    fftOverlap: 2,
    sampleRate: 48000,
    ...overrides
});

const createDependencies = () => ({
    drawBackground: vi.fn(),
    drawGrid: vi.fn(() => []),
    drawEvent: vi.fn(),
    drawStats: vi.fn()
});

describe("SpectrogramRenderer", () => {
    it("draws visible cache regions, overlays events, and reports cursor stats", () => {
        const main = createMockCanvasContext();
        const cache = createMockCanvasContext({ width: 4, height: 64 });
        const dependencies = createDependencies();
        const eventPayload = [{ type: "midi", data: [144, 60, 127] }];
        dependencies.drawGrid.mockReturnValue([[120, eventPayload]]);
        const drawOptions = createDrawOptions();

        drawStaticSpectrogram(dependencies, main.context, cache.context, 320, 180, drawOptions, 2, 0, { x: 160, y: 60 }, FrequencyScaleMode.Linear);

        expect(dependencies.drawBackground).toHaveBeenCalledWith(main.context, 320, 180);
        expect(dependencies.drawGrid).toHaveBeenCalledWith(main.context, 320, 180, 0, 8, 0, 1, drawOptions, StaticScopeMode.Spectrogram, FrequencyScaleMode.Linear);
        expect(main.context.drawImage).toHaveBeenCalledWith(cache.canvas, 0, 0, 2, 64, 50, 0, 270, 160);
        expect(dependencies.drawEvent).toHaveBeenCalledWith(main.context, 320, 180, 120, eventPayload);
        expect(dependencies.drawStats).toHaveBeenCalledWith(main.context, 320, 180, expect.objectContaining({
            x: expect.any(Number),
            y: 60,
            xLabel: expect.any(String),
            yLabel: expect.any(String),
            values: expect.any(Array)
        }));
    });

    it("splits visible cache drawing when the frame window wraps", () => {
        const main = createMockCanvasContext();
        const cache = createMockCanvasContext({ width: 4, height: 64 });
        const dependencies = createDependencies();

        drawStaticSpectrogram(
            dependencies,
            main.context,
            cache.context,
            320,
            180,
            createDrawOptions({ startSampleIndex: 8 }),
            1,
            0,
            { x: 160, y: 60 },
            FrequencyScaleMode.Linear
        );

        expect(main.context.drawImage).toHaveBeenCalledWith(cache.canvas, 2, 0, 2, 64, 50, 0, 135, 160);
        expect(main.context.drawImage).toHaveBeenCalledWith(cache.canvas, 0, 0, 1.99, 64, 185, 0, 135, 160);
    });

    it("updates the offline cache in linear and logarithmic modes", () => {
        const drawOptions = createDrawOptions({
            freqDomainData: [new Float32Array([-90, -60, -30, -10, -20, -40, -70, -95])],
            fftSize: 4,
            fftOverlap: 2,
            sampleRate: 48000
        });
        const linearCache = createMockCanvasContext({ width: 1, height: 8 });
        const logCache = createMockCanvasContext({ width: 1, height: 8 });

        const linearLastIndex = drawStaticOfflineSpectrogram(linearCache.context, drawOptions, 0, FrequencyScaleMode.Linear);
        const logLastIndex = drawStaticOfflineSpectrogram(logCache.context, drawOptions, 0, FrequencyScaleMode.Logarithmic);

        expect(linearCache.canvas.width).toBe(4);
        expect(linearCache.context.fillRect).toHaveBeenCalledWith(0, 0, 1, 8);
        expect(linearLastIndex).toBe(0);
        expect(logCache.canvas.width).toBe(4);
        expect(logCache.context.fillRect).toHaveBeenCalledWith(expect.any(Number), expect.any(Number), 1, 1);
        expect(logLastIndex).toBe(0);
    });
});
