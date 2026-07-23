import { describe, expect, it, vi } from "vitest";
import type { TDrawOptions } from "../StaticScope";
import { drawStaticPhase, drawStaticSpectroscope } from "../scope/static/FrequencyRenderer";
import { FrequencyScaleMode, MagnitudeScaleMode, StaticScopeMode } from "../scope/ScopeModes";
import { createMockCanvasContext } from "./helpers/canvasContext";

const createDrawOptions = (overrides: Partial<TDrawOptions> = {}): TDrawOptions => ({
    drawMode: "manual",
    startSampleIndex: 0,
    startBufferIndex: 0,
    freqDomainData: [
        new Float32Array([-90, -60, -30, -10, -20, -40, -70, -95]),
        new Float32Array([-95, -70, -45, -25, -15, -35, -55, -80])
    ],
    phaseDomainData: [
        new Float32Array([0, Math.PI / 4, Math.PI / 2, Math.PI, -Math.PI, -Math.PI / 2, -Math.PI / 4, 0]),
        new Float32Array([0, -Math.PI / 4, -Math.PI / 2, -Math.PI, Math.PI, Math.PI / 2, Math.PI / 4, 0])
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
        expect(dependencies.drawGrid).toHaveBeenCalledWith(context, 320, 180, expect.any(Number), expect.any(Number), 0, 1, drawOptions, StaticScopeMode.Spectroscope, FrequencyScaleMode.Linear, MagnitudeScaleMode.Decibels);
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

        expect(dependencies.drawGrid).toHaveBeenCalledWith(context, 320, 180, expect.any(Number), expect.any(Number), 0, 1, drawOptions, StaticScopeMode.Spectroscope, FrequencyScaleMode.Logarithmic, MagnitudeScaleMode.Decibels);
        expect(context.beginPath).toHaveBeenCalled();
        expect(context.closePath).toHaveBeenCalled();
        expect(context.fill).toHaveBeenCalled();
        expect(dependencies.drawEvent).toHaveBeenCalledWith(context, 320, 180, 120, eventPayload);
        expect(dependencies.drawStats).toHaveBeenCalled();
    });

    it("does not perform logarithmic math once per FFT bin", () => {
        const { context } = createMockCanvasContext({ width: 1024, height: 300 });
        const dependencies = createDependencies();
        const fftSize = 65536;
        const drawOptions = createDrawOptions({
            fftSize,
            freqDomainData: [new Float32Array(fftSize / 2).fill(-30)]
        });
        const log10 = vi.spyOn(Math, "log10");

        drawStaticSpectroscope(dependencies, context, 1024, 300, drawOptions, 1, 0, undefined, FrequencyScaleMode.Logarithmic);

        expect(log10.mock.calls.length).toBeLessThan(1000);
        log10.mockRestore();
    });

    it("converts dB values to normalized linear amplitude", () => {
        const { context } = createMockCanvasContext();
        const dependencies = createDependencies();

        drawStaticSpectroscope(dependencies, context, 320, 180, createDrawOptions(), 1, 0, { x: 160, y: 60 }, FrequencyScaleMode.Linear, MagnitudeScaleMode.Linear);

        expect(dependencies.drawGrid).toHaveBeenCalledWith(
            context,
            320,
            180,
            expect.any(Number),
            expect.any(Number),
            0,
            1,
            expect.any(Object),
            StaticScopeMode.Spectroscope,
            FrequencyScaleMode.Linear,
            MagnitudeScaleMode.Linear
        );
        const stats = dependencies.drawStats.mock.calls[0][3];
        expect(stats.values.every((value: number) => value >= 0 && value <= 1)).toBe(true);
    });

    it("draws phase on logarithmic frequency coordinates", () => {
        const { context } = createMockCanvasContext();
        const dependencies = createDependencies();

        drawStaticPhase(dependencies, context, 320, 180, createDrawOptions(), 1, 0, { x: 160, y: 60 }, FrequencyScaleMode.Logarithmic);

        expect(dependencies.drawGrid).toHaveBeenCalledWith(context, 320, 180, expect.any(Number), expect.any(Number), 0, 1, expect.any(Object), StaticScopeMode.Phase, FrequencyScaleMode.Logarithmic);
        expect(context.stroke).toHaveBeenCalled();
        expect(dependencies.drawStats).toHaveBeenCalled();
    });
});
