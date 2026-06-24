export type AnalyserFrameBuffers = {
    /** Float time-domain samples consumed by oscilloscope and stats. */
    t: Float32Array;
    /** Byte time-domain fallback buffer for browsers without `getFloatTimeDomainData`. */
    ti: Uint8Array;
    /** Float frequency-domain bins consumed by spectroscope and spectrogram. */
    f: Float32Array;
};

/**
 * Allocates analyser buffers sized from the current `AnalyserNode`.
 */
export const createAnalyserFrameBuffers = (analyser: AnalyserNode): AnalyserFrameBuffers => ({
    t: new Float32Array(analyser.fftSize),
    ti: new Uint8Array(analyser.fftSize),
    f: new Float32Array(analyser.frequencyBinCount)
});

/**
 * Reads one analyser frame into reusable buffers.
 *
 * Modern browsers expose float time-domain data directly. The byte fallback is
 * kept for Safari-compatible analyser implementations and converts unsigned
 * bytes back to the historical `[-1, 1]` float range.
 */
export const readAnalyserFrame = (
    analyser: AnalyserNode,
    buffers: AnalyserFrameBuffers
) => {
    analyser.getFloatFrequencyData(buffers.f);
    if (analyser.getFloatTimeDomainData) {
        analyser.getFloatTimeDomainData(buffers.t);
        return;
    }
    analyser.getByteTimeDomainData(buffers.ti);
    buffers.ti.forEach((value, index) => {
        buffers.t[index] = value / 128 - 1;
    });
};
