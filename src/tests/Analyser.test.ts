import { describe, expect, it, vi } from "vitest";
import { Analyser } from "../Analyser";

describe("Analyser", () => {
    it("uses a rectangular window offline and Blackman otherwise when window selection is automatic", () => {
        const analyser = new Analyser(1, "offline");

        expect(analyser.resolvedFftWindow).toBe("rectangular");

        analyser.drawMode = "continuous";
        expect(analyser.resolvedFftWindow).toBe("blackman");

        analyser.fftWindow = "rectangular";
        expect(analyser.resolvedFftWindow).toBe("rectangular");
    });

    it("matches the raw-rFFT impulse-response convention offline", () => {
        const analyser = new Analyser(1, "offline");
        analyser.fftSize = 4;
        analyser.fftOverlap = 1;

        analyser.plotHandler([new Float32Array([1, 0, 0, 0])], 0, undefined, true);

        expect(Array.from(analyser.freqDomainData[0])).toEqual([0, 0]);
        expect(Array.from(analyser.phaseDomainData[0])).toEqual([0, 0]);
    });

    it("passes magnitude and phase from the same FFT frames to the plot", () => {
        const drawHandler = vi.fn();
        const analyser = new Analyser(1, "manual", drawHandler);
        analyser.fftSize = 4;
        analyser.fftOverlap = 1;

        analyser.plotHandler([new Float32Array([0, 1, 0, -1])], 0);

        expect(analyser.freqDomainData[0]).toHaveLength(2);
        expect(analyser.phaseDomainData[0]).toHaveLength(2);
        expect(drawHandler).toHaveBeenCalledWith(expect.objectContaining({
            freqDomainData: analyser.freqDomainData,
            phaseDomainData: analyser.phaseDomainData
        }));
        expect(Array.from(analyser.phaseDomainData[0]).every(value => value >= -Math.PI && value <= Math.PI)).toBe(true);
    });
});
