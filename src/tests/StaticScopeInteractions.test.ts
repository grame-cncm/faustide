import { describe, expect, it, vi } from "vitest";
import type { TDrawOptions } from "../StaticScope";
import {
    StaticScopeInteractionTarget,
    handleStaticScopePointerDown,
    handleStaticScopePointerLeave,
    handleStaticScopePointerMove,
    handleStaticScopeWheel
} from "../scope/static/StaticScopeInteractions";
import { StaticScopeMode } from "../scope/ScopeModes";
import { createMockCanvasContext } from "./helpers/canvasContext";

const createDrawOptions = (): TDrawOptions => ({
    drawMode: "manual",
    startSampleIndex: 0,
    startBufferIndex: 0,
    timeDomainData: [new Float32Array([0, 0.25, -0.25, 0.5])],
    events: [],
    bufferSize: 4,
    fftSize: 8,
    fftOverlap: 2,
    sampleRate: 48000
});

const createTarget = (): StaticScopeInteractionTarget => {
    const container = document.createElement("div");
    Object.defineProperty(container, "clientWidth", { configurable: true, value: 320 });
    Object.defineProperty(container, "clientHeight", { configurable: true, value: 180 });
    const { canvas } = createMockCanvasContext({ width: 320, height: 180 });
    let zoomValue = 1;
    let zoomOffsetValue = 0;
    let verticalZoomValue = 1;

    return {
        data: createDrawOptions(),
        mode: StaticScopeMode.Oscilloscope,
        container,
        canvas,
        dragging: false,
        get zoom() { return zoomValue; },
        set zoom(value: number) { zoomValue = value; },
        get zoomOffset() { return zoomOffsetValue; },
        set zoomOffset(value: number) { zoomOffsetValue = value; },
        get vzoom() { return verticalZoomValue; },
        set vzoom(value: number) { verticalZoomValue = value; },
        draw: vi.fn()
    };
};

describe("StaticScopeInteractions", () => {
    it("updates and clears clamped cursor state", () => {
        const target = createTarget();
        const move = new MouseEvent("mousemove");
        Object.defineProperties(move, {
            offsetX: { value: 420 },
            offsetY: { value: -10 }
        });

        handleStaticScopePointerMove(target, move);
        expect(target.cursor).toEqual({ x: 320, y: 0 });
        expect(target.draw).toHaveBeenCalled();

        handleStaticScopePointerLeave(target);
        expect(target.cursor).toBeUndefined();
    });

    it("applies wheel zoom and trackpad pan", () => {
        const target = createTarget();
        const verticalWheel = new WheelEvent("wheel", { deltaY: -1 });
        Object.defineProperties(verticalWheel, {
            offsetX: { value: 10 },
            offsetY: { value: 20 }
        });

        handleStaticScopeWheel(target, verticalWheel);
        expect(target.vzoom).toBeCloseTo(1 / 1.5);

        const horizontalWheel = new WheelEvent("wheel", { deltaY: -1, deltaX: 1 });
        Object.defineProperties(horizontalWheel, {
            offsetX: { value: 120 },
            offsetY: { value: 40 }
        });
        handleStaticScopeWheel(target, horizontalWheel);

        expect(target.zoom).toBeCloseTo(1.5);
        expect(target.zoomOffset).toBeCloseTo(0.1);
        expect(target.cursor).toEqual({ x: 120, y: 40 });
    });

    it("pans while dragging and removes document listeners on release", () => {
        const target = createTarget();
        const down = new MouseEvent("mousedown");
        Object.defineProperty(down, "pageX", { value: 100 });
        const preventDefault = vi.spyOn(down, "preventDefault");
        const stopPropagation = vi.spyOn(down, "stopPropagation");

        handleStaticScopePointerDown(target, down);
        expect(preventDefault).toHaveBeenCalled();
        expect(stopPropagation).toHaveBeenCalled();
        expect(target.dragging).toBe(true);
        expect(target.canvas.style.cursor).toBe("grab");

        const drag = new MouseEvent("mousemove");
        Object.defineProperty(drag, "pageX", { value: 80 });
        document.dispatchEvent(drag);
        expect(target.zoomOffset).toBeGreaterThan(0);
        expect(target.draw).toHaveBeenCalled();

        document.dispatchEvent(new MouseEvent("mouseup"));
        expect(target.dragging).toBe(false);
        expect(target.canvas.style.cursor).toBe("");
    });
});
