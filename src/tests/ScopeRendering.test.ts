import { describe, expect, it } from "vitest";
import { Scope } from "../Scope";
import { createMockCanvasContext } from "./helpers/canvasContext";

const ScopeType = {
    Oscilloscope: 0,
    Spectroscope: 1,
    Spectrogram: 2
} as const;

describe("Scope rendering helpers", () => {
    it("draws the background and grid primitives", () => {
        const { context } = createMockCanvasContext();

        Scope.drawBackground(context, 320, 180);
        expect(context.save).toHaveBeenCalled();
        expect(context.fillRect).toHaveBeenCalledWith(0, 0, 320, 180);
        expect(context.restore).toHaveBeenCalled();

        Scope.drawGrid(context, 320, 180);
        expect(context.beginPath).toHaveBeenCalled();
        expect(context.moveTo).toHaveBeenCalledWith(80, 0);
        expect(context.lineTo).toHaveBeenCalledWith(80, 180);
        expect(context.moveTo).toHaveBeenCalledWith(0, 45);
        expect(context.lineTo).toHaveBeenCalledWith(320, 45);
        expect(context.stroke).toHaveBeenCalled();
    });

    it("draws stats with zoom and min/max labels", () => {
        const { context } = createMockCanvasContext();

        Scope.drawStats(context, 320, 180, 440.4, -0.125, 0.25, 2, 100, 12000);

        expect(context.fillRect).toHaveBeenCalledWith(270, 0, 50, 50);
        expect(context.fillRect).toHaveBeenCalledWith(0, 164, 40, 16);
        expect(context.fillRect).toHaveBeenCalledWith(280, 164, 40, 16);
        expect(context.fillText).toHaveBeenCalledWith("2.0x", 160, 178, 40);
        expect(context.fillText).toHaveBeenCalledWith("100", 2, 178, 40);
        expect(context.fillText).toHaveBeenCalledWith("12000", 318, 178, 40);
        expect(context.fillText).toHaveBeenCalledWith("@-0.125", 318, 15, 50);
        expect(context.fillText).toHaveBeenCalledWith("440Hz", 318, 30, 50);
        expect(context.fillText).toHaveBeenCalledWith("x\u0304:0.250", 318, 45, 50);
    });

    it("returns stable icons for all scope modes", () => {
        expect(Scope.getIconClassName(ScopeType.Oscilloscope as any)).toBe("fas fa-sm fa-wave-square");
        expect(Scope.getIconClassName(ScopeType.Spectroscope as any)).toBe("fas fa-sm fa-chart-bar");
        expect(Scope.getIconClassName(ScopeType.Spectrogram as any)).toBe("fas fa-sm fa-water");
    });

    it("draws an oscilloscope waveform window", () => {
        const { context } = createMockCanvasContext();

        Scope.drawOscilloscope(
            context,
            320,
            180,
            new Float32Array([0.5, 0.25, -0.25, -0.5, 0, 0.5, 0, -0.5]),
            1000,
            48000,
            1,
            0
        );

        expect(context.beginPath).toHaveBeenCalled();
        expect(context.moveTo).toHaveBeenCalledWith(0, expect.any(Number));
        expect(context.lineTo).toHaveBeenCalledWith(expect.any(Number), expect.any(Number));
        expect(context.stroke).toHaveBeenCalled();
    });

    it("falls back to full-buffer oscilloscope drawing when frequency is invalid", () => {
        const { context } = createMockCanvasContext();

        Scope.drawOscilloscope(
            context,
            320,
            180,
            new Float32Array([0, 0.25, -0.25, 0.5]),
            0,
            48000,
            1,
            0
        );

        expect(context.moveTo).toHaveBeenCalledWith(0, 90);
        expect(context.lineTo).toHaveBeenCalledWith(320, 45);
    });

    it("draws a filled spectroscope spectrum for the zoom window", () => {
        const { context } = createMockCanvasContext();

        Scope.drawSpectroscope(
            context,
            320,
            180,
            new Float32Array([-90, -60, -30, -10, -20, -40, -70, -95]),
            2,
            0.25
        );

        expect(context.beginPath).toHaveBeenCalled();
        expect(context.moveTo).toHaveBeenCalledWith(0, expect.any(Number));
        expect(context.lineTo).toHaveBeenCalledWith(320, 180);
        expect(context.closePath).toHaveBeenCalled();
        expect(context.fill).toHaveBeenCalled();
    });

    it("writes one spectrogram cache column from frequency bins", () => {
        const { context } = createMockCanvasContext({ width: 4, height: 8 });

        Scope.drawOfflineSpectrogram(context, new Float32Array([-90, -60, -30, -10, -20, -40, -70, -95]), 2);

        expect(context.fillRect).toHaveBeenCalledWith(2, 0, 1, 8);
        expect(context.fillRect).toHaveBeenCalledWith(2, expect.any(Number), 1, 1);
    });

    it("draws wrapped and non-wrapped spectrogram cache ranges", () => {
        const main = createMockCanvasContext();
        const temp = createMockCanvasContext({ width: 4, height: 64 });

        Scope.drawSpectrogram(main.context, temp.context, 1, 320, 180, new Float32Array(8), 1);
        expect(main.context.drawImage).toHaveBeenCalledWith(temp.canvas, 2, 0, 2, 64, 0, 0, 240, 180);
        expect(main.context.drawImage).toHaveBeenCalledWith(temp.canvas, 0, 0, 2, 64, 240, 0, 80, 180);

        Scope.drawSpectrogram(main.context, temp.context, 3, 320, 180, new Float32Array(8), 1);
        expect(main.context.drawImage).toHaveBeenCalledWith(temp.canvas, 0, 0, 4, 64, 0, 0, 320, 180);
    });
});
