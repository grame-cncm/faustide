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

/** Clamps a normalized zoom offset to the visible range for the current zoom. */
export const clampZoomOffset = (zoom: number, zoomOffset: number) =>
    Math.max(0, Math.min(1 - 1 / zoom, zoomOffset));
