import { describe, expect, it } from "vitest";
import { buildScopeCsv } from "../scope/static/ScopeCsvExport";
import { StaticScopeMode as EScopeMode } from "../scope/ScopeModes";
import type { TDrawOptions } from "../scope/static/StaticScopeTypes";

const base: TDrawOptions = {
    drawMode: "manual",
    startSampleIndex: 0,
    startBufferIndex: 0,
    bufferSize: 128,
    fftSize: 4,
    fftOverlap: 2
};

describe("buildScopeCsv", () => {
    it("serializes time-domain data with a channel header per column (Oscilloscope)", () => {
        const data: TDrawOptions = {
            ...base,
            timeDomainData: [new Float32Array([10, 20]), new Float32Array([30, 40])]
        };
        expect(buildScopeCsv(EScopeMode.Oscilloscope, data)).toBe("channel1,channel2\n10,30\n20,40\n");
    });

    it("uses the same time-domain layout for Interleaved and Data modes", () => {
        const data: TDrawOptions = { ...base, timeDomainData: [new Float32Array([1, 2])] };
        const expected = "channel1\n1\n2\n";
        expect(buildScopeCsv(EScopeMode.Interleaved, data)).toBe(expected);
        expect(buildScopeCsv(EScopeMode.Data, data)).toBe(expected);
    });

    it("serializes the latest FFT frame bins (Spectroscope)", () => {
        const data: TDrawOptions = { ...base, freqDomainData: [new Float32Array([5, 6])] };
        expect(buildScopeCsv(EScopeMode.Spectroscope, data)).toBe("channel1\n5\n6\n");
    });

    it("serializes phase bins with the same frequency-domain layout", () => {
        const phase = new Float32Array([0, Math.PI]);
        const data: TDrawOptions = { ...base, phaseDomainData: [phase] };
        expect(buildScopeCsv(EScopeMode.Phase, data)).toBe(
            `channel1\n0\n${phase[1]}\n`
        );
    });

    it("serializes frames × channels per bin row (Spectrogram)", () => {
        const data: TDrawOptions = { ...base, freqDomainData: [new Float32Array([1, 2, 3, 4])] };
        expect(buildScopeCsv(EScopeMode.Spectrogram, data)).toBe(
            "frame1_channel1,frame2_channel1\n1,3\n2,4\n"
        );
    });

    it("returns an empty string when the relevant buffer is missing", () => {
        expect(buildScopeCsv(EScopeMode.Oscilloscope, base)).toBe("");
        expect(buildScopeCsv(EScopeMode.Spectroscope, base)).toBe("");
        expect(buildScopeCsv(EScopeMode.Phase, base)).toBe("");
        expect(buildScopeCsv(EScopeMode.Spectrogram, base)).toBe("");
    });

    it("respects the circular-buffer start offset", () => {
        // startSampleIndex=1 ⇒ wrap(j,1,2): row order rotates by one sample.
        const data: TDrawOptions = {
            ...base,
            startSampleIndex: 1,
            timeDomainData: [new Float32Array([10, 20])]
        };
        expect(buildScopeCsv(EScopeMode.Oscilloscope, data)).toBe("channel1\n20\n10\n");
    });
});
