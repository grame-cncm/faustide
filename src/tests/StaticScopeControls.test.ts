import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
    createStaticScopeControls,
    updateStaticScopeMagnitudeButton,
    updateStaticScopeModeControls,
    updateStaticScopeScaleButton
} from "../scope/static/StaticScopeControls";
import { FrequencyScaleMode, MagnitudeScaleMode, StaticScopeMode } from "../scope/ScopeModes";
import { installMockCanvasContext } from "./helpers/canvasContext";
import { createStaticScopeContainer } from "./helpers/scopeDom";

describe("StaticScopeControls", () => {
    let canvasMock: ReturnType<typeof installMockCanvasContext>;

    beforeEach(() => {
        canvasMock = installMockCanvasContext({ width: 320, height: 180 });
    });

    afterEach(() => {
        canvasMock.restore();
    });

    it("creates missing scope surfaces and toolbar controls", () => {
        const { container } = createStaticScopeContainer();

        const controls = createStaticScopeControls(container);

        expect(container.querySelector(".static-scope-ui-controller")).toBeInstanceOf(HTMLDivElement);
        expect(container.querySelector(".static-scope-canvas")).toBe(controls.canvas);
        expect(container.querySelector(".static-scope-data")).toBe(controls.divData);
        expect(container.querySelector(".static-scope-default")).toBe(controls.divDefault);
        expect(controls.spectTempCtx.canvas.height).toBe(1024);
        expect(controls.btnZoom.innerText).toBe("1.0x");
        expect(controls.canvas.tabIndex).toBe(0);
        expect(controls.canvas.title).toContain("Double-click an axis");
        expect(container.querySelector(".static-scope-ui-magnitude")).toBeInstanceOf(HTMLButtonElement);
        expect(controls.iSwitch.className).toBe("fas fa-sm fa-wave-square");
        expect(controls.spanSwitch.innerText).toBe("Oscilloscope");
    });

    it("reuses existing scope DOM surfaces", () => {
        const { container, controller, canvas, data, defaultMessage } = createStaticScopeContainer({
            withController: true,
            withCanvas: true,
            withData: true,
            withDefault: true
        });

        const controls = createStaticScopeControls(container);

        expect(controls.canvas).toBe(canvas);
        expect(controls.divData).toBe(data);
        expect(controls.divDefault).toBe(defaultMessage);
        expect(container.querySelector(".static-scope-ui-controller")).toBe(controller);
        expect(container.querySelectorAll(".static-scope-ui-controller")).toHaveLength(1);
    });

    it("updates scale button and mode-specific control visibility", () => {
        const { container } = createStaticScopeContainer();
        const controls = createStaticScopeControls(container);

        updateStaticScopeScaleButton(controls.btnScale, controls.iScale, FrequencyScaleMode.Linear);
        expect(controls.iScale.className).toBe("fas fa-ruler-horizontal");
        expect(controls.btnScale.getAttribute("title")).toBe("Switch to Logarithmic Scale");
        updateStaticScopeMagnitudeButton(controls.btnMagnitude, MagnitudeScaleMode.Linear);
        expect(controls.btnMagnitude.innerText).toBe("amp");
        expect(controls.btnMagnitude.getAttribute("title")).toBe("Switch to Decibels");

        updateStaticScopeModeControls({
            mode: StaticScopeMode.Data,
            inFrequencyDomain: false,
            iSwitch: controls.iSwitch,
            spanSwitch: controls.spanSwitch,
            divData: controls.divData,
            canvas: controls.canvas,
            btnZoom: controls.btnZoom,
            btnZoomIn: controls.btnZoomIn,
            btnZoomOut: controls.btnZoomOut,
            btnScale: controls.btnScale,
            btnMagnitude: controls.btnMagnitude
        });
        expect(controls.spanSwitch.innerText).toBe("Data");
        expect(controls.divData.style.display).toBe("block");
        expect(controls.canvas.style.display).toBe("none");
        expect(controls.btnScale.style.display).toBe("none");

        updateStaticScopeModeControls({
            mode: StaticScopeMode.Spectroscope,
            inFrequencyDomain: true,
            iSwitch: controls.iSwitch,
            spanSwitch: controls.spanSwitch,
            divData: controls.divData,
            canvas: controls.canvas,
            btnZoom: controls.btnZoom,
            btnZoomIn: controls.btnZoomIn,
            btnZoomOut: controls.btnZoomOut,
            btnScale: controls.btnScale,
            btnMagnitude: controls.btnMagnitude
        });
        expect(controls.iSwitch.className).toBe("fas fa-sm fa-chart-bar");
        expect(controls.divData.style.display).toBe("none");
        expect(controls.canvas.style.display).toBe("block");
        expect(controls.btnScale.style.display).toBe("");
        expect(controls.btnMagnitude.style.display).toBe("");
    });
});
