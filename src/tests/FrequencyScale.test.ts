import { describe, expect, it } from "vitest";
import {
    binIndexToFrequency,
    clampZoomOffset,
    frequencyToBinIndex,
    frequencyToLogarithmicPosition,
    formatFrequency,
    getLinearAxisTicks,
    getLogarithmicAxisTicks,
    getLogFrequencyWindow,
    indexToFrequency,
    logarithmicPositionToFrequency
} from "../scope/FrequencyScale";

describe("FrequencyScale", () => {
    it("converts between FFT bin indexes and frequencies", () => {
        expect(indexToFrequency(0, 512, 48000)).toBe(0);
        expect(indexToFrequency(256, 512, 48000)).toBe(12000);
        expect(frequencyToBinIndex(12000, 24000, 512)).toBe(256);
        expect(binIndexToFrequency(256, 24000, 512)).toBe(12000);
    });

    it("projects frequencies on a logarithmic axis", () => {
        const midpointFrequency = logarithmicPositionToFrequency(0.5, 100, 10000);

        expect(midpointFrequency).toBeCloseTo(1000);
        expect(frequencyToLogarithmicPosition(1000, 100, 10000)).toBeCloseTo(0.5);
    });

    it("computes a zoomed logarithmic frequency window", () => {
        const window = getLogFrequencyWindow(100, 10000, 2, 0.25);

        expect(window.viewLogRange).toBeCloseTo(1);
        expect(window.startFrequency).toBeCloseTo(316.227766);
        expect(window.endFrequency).toBeCloseTo(3162.27766);
    });

    it("clamps normalized zoom offsets to the visible range", () => {
        expect(clampZoomOffset(1, 0.5)).toBe(0);
        expect(clampZoomOffset(4, -1)).toBe(0);
        expect(clampZoomOffset(4, 1)).toBe(0.75);
        expect(clampZoomOffset(4, 0.25)).toBe(0.25);
    });

    it("creates readable ticks for visible linear and logarithmic ranges", () => {
        expect(getLinearAxisTicks(6000, 12000).map(tick => tick.value)).toEqual([6000, 7000, 8000, 9000, 10000, 11000, 12000]);
        expect(getLogarithmicAxisTicks(20, 20000).map(tick => tick.value)).toEqual([20, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000]);
        expect(formatFrequency(6000)).toBe("6k");
        expect(formatFrequency(1500)).toBe("1.5k");
    });
});
