import { describe, expect, it, vi } from "vitest";
import type { TDrawOptions } from "../StaticScope";
import { drawStaticSpectroscope } from "../scope/static/FrequencyRenderer";
import { FrequencyScaleMode, StaticScopeMode } from "../scope/ScopeModes";
import { createMockCanvasContext } from "./helpers/canvasContext";

const createDrawOptions = (overrides: Partial<TDrawOptions> = {}): TDrawOptions => ({
    drawMode: "manual",
    startSampleIndex: 0,
    startBufferIndex: 0,
    freqDomainData: [
        new Float32Array([-90, -60, -30, -10, -20, -40, -70, -95]),
        new Float32Array([-95, -70, -45, -25, -15, -35, -55, -80])
    ],
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

describe("FrequencyRenderer", () => {
    it("draws linear spectra and cursor stats", () => {
        const { context } = createMockCanvasContext();
        const dependencies = createDependencies();
        const drawOptions = createDrawOptions();

        drawStaticSpectroscope(dependencies, context, 320, 180, drawOptions, 1, 0, { x: 160, y: 60 }, FrequencyScaleMode.Linear);

        expect(dependencies.drawBackground).toHaveBeenCalledWith(context, 320, 180);
        expect(dependencies.drawGrid).toHaveBeenCalledWith(context, 320, 180, expect.any(Number), expect.any(Number), 0, 1, drawOptions, StaticScopeMode.Spectroscope, FrequencyScaleMode.Linear);
        expect(context.beginPath).toHaveBeenCalled();
        expect(context.closePath).toHaveBeenCalled();
        expect(context.fill).toHaveBeenCalled();
        expect(dependencies.drawStats).toHaveBeenCalledWith(context, 320, 180, expect.objectContaining({
            x: expect.any(Number),
            xLabel: expect.any(String),
            values: expect.any(Array)
        }));
    });

    it("draws logarithmic spectra and injected event overlays", () => {
        const { context } = createMockCanvasContext();
        const dependencies = createDependencies();
        const eventPayload = [{ type: "midi", data: [144, 60, 127] }];
        dependencies.drawGrid.mockReturnValue([[120, eventPayload]]);
        const drawOptions = createDrawOptions();

        drawStaticSpectroscope(dependencies, context, 320, 180, drawOptions, 1, 0, { x: 160, y: 60 }, FrequencyScaleMode.Logarithmic);

        expect(dependencies.drawGrid).toHaveBeenCalledWith(context, 320, 180, expect.any(Number), expect.any(Number), 0, 1, drawOptions, StaticScopeMode.Spectroscope, FrequencyScaleMode.Logarithmic);
        expect(context.beginPath).toHaveBeenCalled();
        expect(context.closePath).toHaveBeenCalled();
        expect(context.fill).toHaveBeenCalled();
        expect(dependencies.drawEvent).toHaveBeenCalledWith(context, 320, 180, 120, eventPayload);
        expect(dependencies.drawStats).toHaveBeenCalled();
    });
});
