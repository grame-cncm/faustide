import { describe, expect, it } from "vitest";
import { createAnalyserFrameBuffers, readAnalyserFrame } from "../scope/realtime/AnalyserFrameReader";
import { createMockAnalyserNode } from "./helpers/audioAnalyser";

describe("AnalyserFrameReader", () => {
    it("allocates buffers from analyser FFT sizes", () => {
        const analyser = createMockAnalyserNode({ fftSize: 512 });

        const buffers = createAnalyserFrameBuffers(analyser as unknown as AnalyserNode);

        expect(buffers.t).toHaveLength(512);
        expect(buffers.ti).toHaveLength(512);
        expect(buffers.f).toHaveLength(256);
    });

    it("reads float frequency and time-domain data", () => {
        const analyser = createMockAnalyserNode({
            fftSize: 4,
            frequencyData: [-90, -30],
            floatTimeDomainData: [0, 0.5, 0, -0.5]
        });
        const buffers = createAnalyserFrameBuffers(analyser as unknown as AnalyserNode);

        readAnalyserFrame(analyser as unknown as AnalyserNode, buffers);

        expect(Array.from(buffers.f)).toEqual([-90, -30]);
        expect(Array.from(buffers.t)).toEqual([0, 0.5, 0, -0.5]);
        expect(analyser.getFloatFrequencyData).toHaveBeenCalledWith(buffers.f);
        expect(analyser.getFloatTimeDomainData).toHaveBeenCalledWith(buffers.t);
    });

    it("falls back to byte time-domain data when float samples are unavailable", () => {
        const analyser = createMockAnalyserNode({
            fftSize: 4,
            byteTimeDomainData: [128, 255, 0, 64]
        }) as any;
        analyser.getFloatTimeDomainData = undefined;
        const buffers = createAnalyserFrameBuffers(analyser as AnalyserNode);

        readAnalyserFrame(analyser as AnalyserNode, buffers);

        expect(analyser.getByteTimeDomainData).toHaveBeenCalledWith(buffers.ti);
        expect(Array.from(buffers.t)).toEqual([0, 0.9921875, -1, -0.5]);
    });
});
