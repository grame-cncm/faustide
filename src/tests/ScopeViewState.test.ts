import { describe, expect, it } from "vitest";
import { ScopeViewState } from "../scope/static/ScopeViewState";

describe("ScopeViewState", () => {
    it("defaults every mode to zoom 1, offset 0, vzoom 1", () => {
        const s = new ScopeViewState();
        expect(s.getZoom("oscilloscope")).toBe(1);
        expect(s.getZoomOffset("spectroscope")).toBe(0);
        expect(s.getVerticalZoom("spectrogram")).toBe(1);
        expect(s.getZoom("phase")).toBe(1);
    });

    it("clamps vertical zoom to [1, 16]", () => {
        const s = new ScopeViewState();
        s.setVerticalZoom("oscilloscope", 100);
        expect(s.getVerticalZoom("oscilloscope")).toBe(16);
        s.setVerticalZoom("oscilloscope", 0);
        expect(s.getVerticalZoom("oscilloscope")).toBe(1);
        s.setVerticalZoom("oscilloscope", 4);
        expect(s.getVerticalZoom("oscilloscope")).toBe(4);
    });

    it("keeps per-mode state independent", () => {
        const s = new ScopeViewState();
        s.setVerticalZoom("oscilloscope", 8);
        expect(s.getVerticalZoom("oscilloscope")).toBe(8);
        expect(s.getVerticalZoom("spectroscope")).toBe(1);
        s.zoomTo("phase", 4, 16, 0.5);
        expect(s.getZoom("phase")).toBe(4);
        expect(s.getZoom("spectroscope")).toBe(1);
    });

    it("zoomTo anchors the offset around the cursor and returns the applied zoom", () => {
        const s = new ScopeViewState();
        // from zoom 1 / offset 0, cursor at viewport centre (0.5)
        const applied = s.zoomTo("oscilloscope", 2, 16, 0.5);
        expect(applied).toBe(2);
        expect(s.getZoom("oscilloscope")).toBe(2);
        // cursorPositionInData = 0 + 0.5/1 = 0.5 ; offset = 0.5 - 0.5/2 = 0.25 (in [0, 0.5])
        expect(s.getZoomOffset("oscilloscope")).toBeCloseTo(0.25, 10);
    });

    it("clamps zoomTo to [1, maxZoom]", () => {
        const s = new ScopeViewState();
        expect(s.zoomTo("oscilloscope", 100, 4, 0.5)).toBe(4);
        expect(s.zoomTo("oscilloscope", 0.1, 4, 0.5)).toBe(1);
    });

    it("clamps the offset to [0, 1 - 1/zoom]", () => {
        const s = new ScopeViewState();
        // zoom 1 ⇒ max offset 0
        s.setZoomOffset("oscilloscope", 0.5);
        expect(s.getZoomOffset("oscilloscope")).toBe(0);
        // zoom 4 ⇒ max offset 0.75
        s.zoomTo("spectrogram", 4, 16, 0);
        s.setZoomOffset("spectrogram", 1);
        expect(s.getZoomOffset("spectrogram")).toBeCloseTo(0.75, 10);
    });

    it("reset() clears horizontal zoom/offset but keeps vertical zoom", () => {
        const s = new ScopeViewState();
        s.setVerticalZoom("oscilloscope", 8);
        s.zoomTo("oscilloscope", 4, 16, 0.5);
        s.reset();
        expect(s.getZoom("oscilloscope")).toBe(1);
        expect(s.getZoomOffset("oscilloscope")).toBe(0);
        expect(s.getVerticalZoom("oscilloscope")).toBe(8);
    });
});
