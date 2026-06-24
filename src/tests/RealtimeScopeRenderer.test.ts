import { describe, expect, it } from "vitest";
import {
    drawRealtimeBackground,
    drawRealtimeGrid,
    drawRealtimeOfflineSpectrogram,
    drawRealtimeOscilloscope,
    drawRealtimeSpectrogram,
    drawRealtimeSpectroscope,
    drawRealtimeStats
} from "../scope/realtime/RealtimeScopeRenderer";
import { createMockCanvasContext } from "./helpers/canvasContext";

describe("RealtimeScopeRenderer", () => {
    it("draws background, grid, and stats overlays", () => {
        const { context } = createMockCanvasContext();

        drawRealtimeBackground(context, 320, 180);
        drawRealtimeGrid(context, 320, 180);
        drawRealtimeStats(context, 320, 180, 440.4, -0.125, 0.25, 2, 100, 12000);

        expect(context.fillRect).toHaveBeenCalledWith(0, 0, 320, 180);
        expect(context.moveTo).toHaveBeenCalledWith(80, 0);
        expect(context.lineTo).toHaveBeenCalledWith(80, 180);
        expect(context.fillText).toHaveBeenCalledWith("2.0x", 160, 178, 40);
        expect(context.fillText).toHaveBeenCalledWith("@-0.125", 318, 15, 50);
        expect(context.fillText).toHaveBeenCalledWith("440Hz", 318, 30, 50);
    });

    it("draws oscilloscope and spectroscope traces", () => {
        const oscilloscope = createMockCanvasContext();
        const spectroscope = createMockCanvasContext();

        drawRealtimeOscilloscope(
            oscilloscope.context,
            320,
            180,
            new Float32Array([0.5, 0.25, -0.25, -0.5, 0, 0.5, 0, -0.5]),
            1000,
            48000,
            1,
            0
        );
        drawRealtimeSpectroscope(
            spectroscope.context,
            320,
            180,
            new Float32Array([-90, -60, -30, -10, -20, -40, -70, -95]),
            2,
            0.25
        );

        expect(oscilloscope.context.beginPath).toHaveBeenCalled();
        expect(oscilloscope.context.stroke).toHaveBeenCalled();
        expect(spectroscope.context.closePath).toHaveBeenCalled();
        expect(spectroscope.context.fill).toHaveBeenCalled();
    });

    it("writes and draws rolling spectrogram cache ranges", () => {
        const cache = createMockCanvasContext({ width: 4, height: 8 });
        const main = createMockCanvasContext();
        const temp = createMockCanvasContext({ width: 4, height: 64 });

        drawRealtimeOfflineSpectrogram(cache.context, new Float32Array([-90, -60, -30, -10, -20, -40, -70, -95]), 2);
        drawRealtimeSpectrogram(main.context, temp.context, 1, 320, 180, new Float32Array(8), 1);

        expect(cache.context.fillRect).toHaveBeenCalledWith(2, 0, 1, 8);
        expect(cache.context.fillRect).toHaveBeenCalledWith(2, expect.any(Number), 1, 1);
        expect(main.context.drawImage).toHaveBeenCalledWith(temp.canvas, 2, 0, 2, 64, 0, 0, 240, 180);
        expect(main.context.drawImage).toHaveBeenCalledWith(temp.canvas, 0, 0, 2, 64, 240, 0, 80, 180);
    });
});
