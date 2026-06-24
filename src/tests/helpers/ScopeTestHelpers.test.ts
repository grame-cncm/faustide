import { afterEach, describe, expect, it, vi } from "vitest";
import { createMockAnalyserNode, createMockChannelSplitter } from "./audioAnalyser";
import { createMockCanvasContext, installMockCanvasContext } from "./canvasContext";
import { installAnimationFrameMock } from "./animationFrame";
import { createScopeContainer, setElementVisible } from "./scopeDom";

describe("scope test helpers", () => {
    let restore: (() => void) | undefined;

    afterEach(() => {
        if (restore) restore();
        restore = undefined;
        vi.restoreAllMocks();
    });

    it("creates observable canvas drawing contexts", () => {
        const { canvas, context } = createMockCanvasContext({ width: 64, height: 32 });

        context.fillStyle = "black";
        context.fillRect(0, 0, canvas.width, canvas.height);

        expect(canvas.width).toBe(64);
        expect(canvas.height).toBe(32);
        expect(context.fillStyle).toBe("black");
        expect(context.fillRect).toHaveBeenCalledWith(0, 0, 64, 32);
    });

    it("installs getContext doubles for canvases created by production code", () => {
        const canvasContext = installMockCanvasContext({ width: 128, height: 64 });
        restore = canvasContext.restore;
        const canvas = document.createElement("canvas");

        const context = canvas.getContext("2d");

        expect(context).toBe(canvasContext.contexts[0]);
        expect(canvasContext.contexts).toHaveLength(1);
    });

    it("creates scope containers and explicit visibility markers", () => {
        const { container, controller, canvas } = createScopeContainer({
            withController: true,
            withCanvas: true,
            visible: true
        });

        expect(container.querySelector(".scope-controller")).toBe(controller);
        expect(container.querySelector(".scope-canvas")).toBe(canvas);
        expect(canvas.offsetParent).toBe(document.body);

        setElementVisible(canvas, false);
        expect(canvas.offsetParent).toBeNull();
    });

    it("provides analyser and splitter doubles", () => {
        const analyser = createMockAnalyserNode({
            fftSize: 8,
            frequencyBinCount: 4,
            frequencyData: [-90, -80, -70, -60],
            floatTimeDomainData: [0, 0.25, -0.25, 0.5]
        });
        const splitter = createMockChannelSplitter();
        const frequency = new Float32Array(4);
        const time = new Float32Array(8);

        analyser.getFloatFrequencyData(frequency);
        analyser.getFloatTimeDomainData(time);
        splitter.connect(analyser, 1, 0);

        expect(Array.from(frequency)).toEqual([-90, -80, -70, -60]);
        expect(Array.from(time.slice(0, 4))).toEqual([0, 0.25, -0.25, 0.5]);
        expect(splitter.connect).toHaveBeenCalledWith(analyser, 1, 0);
    });

    it("runs requestAnimationFrame callbacks deterministically", () => {
        const frames = installAnimationFrameMock();
        restore = frames.restore;
        const callback = vi.fn();

        const handle = requestAnimationFrame(callback);
        expect(frames.frames.map(frame => frame.handle)).toEqual([handle]);

        expect(frames.step(12)).toBe(true);
        expect(callback).toHaveBeenCalledWith(12);
        expect(frames.step()).toBe(false);
    });
});
