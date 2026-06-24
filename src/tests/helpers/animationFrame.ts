import { vi } from "vitest";

type Frame = {
    handle: number;
    callback: FrameRequestCallback;
};

/**
 * Installs a deterministic animation-frame queue.
 *
 * Scope widgets schedule recursive drawing with `requestAnimationFrame`.
 * Tests can use `step()` to run one frame or `flush()` to run the current
 * queue without relying on timers.
 */
export const installAnimationFrameMock = () => {
    let nextHandle = 1;
    const frames: Frame[] = [];
    const originalRequestAnimationFrame = window.requestAnimationFrame;
    const originalCancelAnimationFrame = window.cancelAnimationFrame;
    const originalGlobalRequestAnimationFrame = globalThis.requestAnimationFrame;
    const originalGlobalCancelAnimationFrame = globalThis.cancelAnimationFrame;

    const requestAnimationFrame = vi.fn((callback: FrameRequestCallback) => {
        const handle = nextHandle++;
        frames.push({ handle, callback });
        return handle;
    });
    const cancelAnimationFrame = vi.fn((handle: number) => {
        const index = frames.findIndex(frame => frame.handle === handle);
        if (index >= 0) frames.splice(index, 1);
    });

    window.requestAnimationFrame = requestAnimationFrame;
    window.cancelAnimationFrame = cancelAnimationFrame;
    Object.assign(globalThis, { requestAnimationFrame, cancelAnimationFrame });

    const step = (time = performance.now()) => {
        const frame = frames.shift();
        if (!frame) return false;
        frame.callback(time);
        return true;
    };

    return {
        frames,
        requestAnimationFrame,
        cancelAnimationFrame,
        step,
        flush: (time = performance.now()) => {
            const count = frames.length;
            for (let i = 0; i < count; i++) step(time);
            return count;
        },
        restore: () => {
            window.requestAnimationFrame = originalRequestAnimationFrame;
            window.cancelAnimationFrame = originalCancelAnimationFrame;
            Object.assign(globalThis, {
                requestAnimationFrame: originalGlobalRequestAnimationFrame,
                cancelAnimationFrame: originalGlobalCancelAnimationFrame
            });
        }
    };
};
