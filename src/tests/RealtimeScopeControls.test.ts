import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { createRealtimeScopeControls } from "../scope/realtime/RealtimeScopeControls";
import { installMockCanvasContext } from "./helpers/canvasContext";
import { createScopeContainer } from "./helpers/scopeDom";

describe("RealtimeScopeControls", () => {
    let canvasMock: ReturnType<typeof installMockCanvasContext>;

    beforeEach(() => {
        canvasMock = installMockCanvasContext({ width: 320, height: 180 });
    });

    afterEach(() => {
        canvasMock.restore();
    });

    it("creates missing scope canvas, controller, buttons, icon, and cache", () => {
        const { container } = createScopeContainer();

        const controls = createRealtimeScopeControls(container, 512, 0);

        expect(container.querySelector(".scope-controller")).toBeInstanceOf(HTMLDivElement);
        expect(container.querySelector(".scope-canvas")).toBe(controls.canvas);
        expect(controls.btnSwitch).toBeInstanceOf(HTMLButtonElement);
        expect(controls.btnSize.innerText).toBe("512samps");
        expect(controls.btnCh.innerText).toBe("ch 1");
        expect(controls.iSwitch.className).toBe("fas fa-sm fa-wave-square");
        expect(controls.spectTempCtx.canvas.width).toBe(1024);
        expect(controls.spectTempCtx.canvas.height).toBe(1024);
    });

    it("reuses existing controller and canvas children", () => {
        const { container, controller, canvas } = createScopeContainer({
            withController: true,
            withCanvas: true
        });

        const controls = createRealtimeScopeControls(container, 2048, 1);

        expect(controls.canvas).toBe(canvas);
        expect(container.querySelector(".scope-controller")).toBe(controller);
        expect(container.querySelectorAll(".scope-controller")).toHaveLength(1);
    });
});
