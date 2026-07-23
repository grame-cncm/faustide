import { describe, expect, it } from "vitest";
import {
    FrequencyScaleMode,
    RealtimeScopeType,
    StaticScopeMode,
    getRealtimeScopeIconClassName,
    getStaticScopeIconClassName,
    getStaticScopeModeName
} from "../scope/ScopeModes";

describe("ScopeModes", () => {
    it("keeps stable numeric values for static scope modes and frequency scales", () => {
        expect(StaticScopeMode.Data).toBe(0);
        expect(StaticScopeMode.Interleaved).toBe(1);
        expect(StaticScopeMode.Oscilloscope).toBe(2);
        expect(StaticScopeMode.Spectroscope).toBe(3);
        expect(StaticScopeMode.Spectrogram).toBe(4);
        expect(StaticScopeMode.Phase).toBe(5);
        expect(FrequencyScaleMode.Linear).toBe(0);
        expect(FrequencyScaleMode.Logarithmic).toBe(1);
    });

    it("returns static scope labels and icons", () => {
        expect(getStaticScopeModeName(StaticScopeMode.Data)).toBe("Data");
        expect(getStaticScopeModeName(StaticScopeMode.Interleaved)).toBe("Interleaved");
        expect(getStaticScopeModeName(StaticScopeMode.Oscilloscope)).toBe("Oscilloscope");
        expect(getStaticScopeModeName(StaticScopeMode.Spectroscope)).toBe("Spectroscope");
        expect(getStaticScopeModeName(StaticScopeMode.Spectrogram)).toBe("Spectrogram");
        expect(getStaticScopeModeName(StaticScopeMode.Phase)).toBe("Phase");
        expect(getStaticScopeIconClassName(StaticScopeMode.Data)).toBe("fas fa-sm fa-table");
        expect(getStaticScopeIconClassName(StaticScopeMode.Interleaved)).toBe("fas fa-sm fa-water");
        expect(getStaticScopeIconClassName(StaticScopeMode.Spectrogram)).toBe("fas fa-sm fa-align-justify");
        expect(getStaticScopeIconClassName(StaticScopeMode.Phase)).toBe("fas fa-sm fa-chart-line");
    });

    it("keeps stable real-time scope values and icons", () => {
        expect(RealtimeScopeType.Oscilloscope).toBe(0);
        expect(RealtimeScopeType.Spectroscope).toBe(1);
        expect(RealtimeScopeType.Spectrogram).toBe(2);
        expect(getRealtimeScopeIconClassName(RealtimeScopeType.Oscilloscope)).toBe("fas fa-sm fa-wave-square");
        expect(getRealtimeScopeIconClassName(RealtimeScopeType.Spectroscope)).toBe("fas fa-sm fa-chart-bar");
        expect(getRealtimeScopeIconClassName(RealtimeScopeType.Spectrogram)).toBe("fas fa-sm fa-water");
    });
});
