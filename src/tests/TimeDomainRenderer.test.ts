import { describe, expect, it, vi } from "vitest";
import type { TDrawOptions } from "../StaticScope";
import { drawStaticInterleaved, drawStaticOscilloscope } from "../scope/static/TimeDomainRenderer";
import { createMockCanvasContext } from "./helpers/canvasContext";

const createDrawOptions = (overrides: Partial<TDrawOptions> = {}): TDrawOptions => ({
    drawMode: "manual",
    startSampleIndex: 0,
    startBufferIndex: 0,
    timeDomainData: [
        new Float32Array([0, 0.5, 0, -0.5]),
        new Float32Array([1, 0.5, 0, -0.5])
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

describe("TimeDomainRenderer", () => {
    it("draws overlaid oscilloscope channels and cursor stats", () => {
        const { context } = createMockCanvasContext();
        const dependencies = createDependencies();
        const drawOptions = createDrawOptions();

        drawStaticOscilloscope(dependencies, context, 320, 180, drawOptions, 1, 0, 1, { x: 160, y: 60 });

        expect(dependencies.drawBackground).toHaveBeenCalledWith(context, 320, 180);
        expect(dependencies.drawGrid).toHaveBeenCalledWith(context, 320, 180, expect.any(Number), expect.any(Number), expect.any(Number), 1, drawOptions, 2);
        expect(context.beginPath).toHaveBeenCalled();
        expect(context.stroke).toHaveBeenCalled();
        expect(dependencies.drawStats).toHaveBeenCalledWith(context, 320, 180, expect.objectContaining({
            x: expect.any(Number),
            xLabel: expect.any(String),
            values: expect.any(Array)
        }));
    });

    it("draws interleaved lanes and injected event overlays", () => {
        const { context } = createMockCanvasContext();
        const dependencies = createDependencies();
        const eventPayload = [{ type: "midi", data: [144, 60, 127] }];
        dependencies.drawGrid.mockReturnValue([[120, eventPayload]]);
        const drawOptions = createDrawOptions();

        drawStaticInterleaved(dependencies, context, 320, 180, drawOptions, 1, 0, 1, { x: 120, y: 40 });

        expect(dependencies.drawGrid).toHaveBeenCalledWith(context, 320, 180, expect.any(Number), expect.any(Number), expect.any(Number), 1, drawOptions, 1);
        expect(context.beginPath).toHaveBeenCalled();
        expect(context.stroke).toHaveBeenCalled();
        expect(dependencies.drawEvent).toHaveBeenCalledWith(context, 320, 180, 120, eventPayload);
        expect(dependencies.drawStats).toHaveBeenCalled();
    });
});
