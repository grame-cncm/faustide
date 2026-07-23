/**
 * Frequency-domain math shared by static and real-time scope renderers.
 *
 * The helpers keep the historical scope formulas in one place: FFT bin to Hz
 * conversion, linear Hz to bin mapping, logarithmic viewport projection, and
 * normalized zoom-offset clamping.
 */

/** Converts an FFT bin index to a frequency in Hz. */
export const indexToFrequency = (index: number, frequencyBinCount: number, sampleRate: number) =>
    (index % frequencyBinCount) / frequencyBinCount * sampleRate / 2;

/** Maps a frequency in Hz to a fractional FFT bin index. */
export const frequencyToBinIndex = (frequency: number, maxFrequency: number, frequencyBinCount: number) =>
    frequency / maxFrequency * frequencyBinCount;

/** Converts an FFT bin index to a frequency using an explicit maximum frequency. */
export const binIndexToFrequency = (binIndex: number, maxFrequency: number, frequencyBinCount: number) =>
    binIndex / frequencyBinCount * maxFrequency;

/** Converts a 0..1 logarithmic axis position to a frequency in Hz. */
export const logarithmicPositionToFrequency = (position: number, minFrequency: number, maxFrequency: number) =>
    10 ** (Math.log10(minFrequency) + position * (Math.log10(maxFrequency) - Math.log10(minFrequency)));

/** Converts a frequency in Hz to a 0..1 logarithmic axis position. */
export const frequencyToLogarithmicPosition = (frequency: number, minFrequency: number, maxFrequency: number) =>
    (Math.log10(frequency) - Math.log10(minFrequency)) / (Math.log10(maxFrequency) - Math.log10(minFrequency));

/**
 * Computes the visible logarithmic frequency range for a zoomed scope viewport.
 */
export const getLogFrequencyWindow = (
    minFrequency: number,
    maxFrequency: number,
    horizontalZoom: number,
    horizontalZoomOffset: number
) => {
    const minLog = Math.log10(minFrequency);
    const maxLog = Math.log10(maxFrequency);
    const fullLogRange = maxLog - minLog;
    const viewLogRange = fullLogRange / horizontalZoom;
    const startLog = minLog + horizontalZoomOffset * fullLogRange;
    const endLog = startLog + viewLogRange;
    return {
        startLog,
        endLog,
        viewLogRange,
        startFrequency: 10 ** startLog,
        endFrequency: 10 ** endLog
    };
};

/** One grid tick on a numeric axis. */
export type AxisTick = {
    value: number;
    major: boolean;
};

/** Returns a human-readable frequency label without unnecessary decimals. */
export const formatFrequency = (frequency: number) => {
    if (Math.abs(frequency) >= 1000) {
        const kilohertz = frequency / 1000;
        return `${Number(kilohertz.toFixed(kilohertz < 10 && !Number.isInteger(kilohertz) ? 1 : 0))}k`;
    }
    return `${Number(frequency.toFixed(Math.abs(frequency) < 10 && !Number.isInteger(frequency) ? 1 : 0))}`;
};

/** Chooses a 1/2/5 × 10ⁿ step for a readable linear axis. */
export const getNiceLinearStep = (range: number, targetTickCount = 7) => {
    const rawStep = Math.abs(range) / Math.max(1, targetTickCount - 1);
    if (!isFinite(rawStep) || rawStep === 0) return 1;
    const magnitude = 10 ** Math.floor(Math.log10(rawStep));
    const normalized = rawStep / magnitude;
    const multiplier = normalized <= 1 ? 1 : normalized <= 2 ? 2 : normalized <= 5 ? 5 : 10;
    return multiplier * magnitude;
};

/** Builds stable, evenly spaced ticks for a visible linear range. */
export const getLinearAxisTicks = (rangeStart: number, rangeEnd: number, targetTickCount = 7): AxisTick[] => {
    const min = Math.min(rangeStart, rangeEnd);
    const max = Math.max(rangeStart, rangeEnd);
    const step = getNiceLinearStep(max - min, targetTickCount);
    const first = Math.ceil((min - step * 1e-9) / step) * step;
    const ticks: AxisTick[] = [];
    for (let value = first; value <= max + step * 1e-9; value += step) {
        ticks.push({ value: Number(value.toPrecision(12)), major: true });
    }
    return ticks;
};

/** Builds conventional 1/2/5 ticks for a visible logarithmic range. */
export const getLogarithmicAxisTicks = (rangeStart: number, rangeEnd: number): AxisTick[] => {
    const min = Math.max(Number.MIN_VALUE, Math.min(rangeStart, rangeEnd));
    const max = Math.max(rangeStart, rangeEnd);
    if (!isFinite(min) || !isFinite(max) || min >= max) return [];
    const ticks: AxisTick[] = [];
    const firstPower = Math.floor(Math.log10(min));
    const lastPower = Math.ceil(Math.log10(max));
    for (let power = firstPower; power <= lastPower; power++) {
        const decade = 10 ** power;
        for (const multiplier of [1, 2, 5]) {
            const value = multiplier * decade;
            if (value < min || value > max) continue;
            ticks.push({ value, major: multiplier === 1 });
        }
    }
    return ticks;
};

/** Clamps a normalized zoom offset to the visible range for the current zoom. */
export const clampZoomOffset = (zoom: number, zoomOffset: number) =>
    Math.max(0, Math.min(1 - 1 / zoom, zoomOffset));
