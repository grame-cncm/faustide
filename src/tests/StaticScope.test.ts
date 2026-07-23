import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { StaticScope, TDrawOptions } from "../StaticScope";
import { FrequencyScaleMode as FreqScaleMode, StaticScopeMode as ScopeMode } from "../scope/ScopeModes";
import { installAnimationFrameMock } from "./helpers/animationFrame";
import { installMockCanvasContext } from "./helpers/canvasContext";
import { createStaticScopeContainer, setElementVisible } from "./helpers/scopeDom";

const createDrawOptions = (overrides: Partial<TDrawOptions> = {}): TDrawOptions => ({
    drawMode: "manual",
    startSampleIndex: 0,
    startBufferIndex: 0,
    timeDomainData: [
        new Float32Array([0, 0.25, -0.25, 0.5]),
        new Float32Array([0.5, 0.25, 0, -0.25])
    ],
    freqDomainData: [new Float32Array([-90, -60, -30, -12, -24, -48, -72, -96])],
    phaseDomainData: [new Float32Array([0, 0.25, 0.5, 0.75, 1, -0.75, -0.5, -0.25])],
    events: [],
    bufferSize: 4,
    fftSize: 8,
    fftOverlap: 2,
    sampleRate: 48000,
    ...overrides
});

describe("StaticScope instance behavior", () => {
    let canvasMock: ReturnType<typeof installMockCanvasContext>;
    let rafMock: ReturnType<typeof installAnimationFrameMock>;

    beforeEach(() => {
        canvasMock = installMockCanvasContext({ width: 320, height: 180 });
        rafMock = installAnimationFrameMock();
    });

    afterEach(() => {
        canvasMock.restore();
        rafMock.restore();
        vi.restoreAllMocks();
    });

    it("creates missing controls, canvas, data surface, and spectrogram cache", () => {
        const { container } = createStaticScopeContainer({ width: 360, height: 200 });

        const scope = new StaticScope({ container });

        expect(container.querySelector(".static-scope-ui-controller")).toBeInstanceOf(HTMLDivElement);
        expect(container.querySelector(".static-scope-canvas")).toBe(scope.canvas);
        expect(container.querySelector(".static-scope-data")).toBe(scope.divData);
        expect(container.querySelector(".static-scope-default")).toBe(scope.divDefault);
        expect(scope.spectTempCtx.canvas.height).toBe(1024);
        expect(scope.spanSwitch.innerText).toBe("Oscilloscope");
        expect(scope.iScale.className).toBe("fas fa-chart-line");
        expect(scope.canvas.tabIndex).toBe(0);
        expect(scope.zoom).toBe(1);
        expect(scope.zoomOffset).toBe(0);
        expect(scope.vzoom).toBe(1);
    });

    it("reuses existing static scope DOM surfaces", () => {
        const { container, controller, canvas, data, defaultMessage } = createStaticScopeContainer({
            withController: true,
            withCanvas: true,
            withData: true,
            withDefault: true
        });

        const scope = new StaticScope({ container });

        expect(scope.canvas).toBe(canvas);
        expect(scope.divData).toBe(data);
        expect(scope.divDefault).toBe(defaultMessage);
        expect(container.querySelectorAll(".static-scope-ui-controller")).toHaveLength(1);
        expect(container.querySelector(".static-scope-ui-controller")).toBe(controller);
    });

    it("cycles mode controls and skips unavailable modes", () => {
        const { container } = createStaticScopeContainer();
        const scope = new StaticScope({ container });
        scope.drawSpectrogram = true;
        scope.draw(createDrawOptions());

        scope.btnSwitch.click();
        expect(scope.spanSwitch.innerText).toBe("Spectroscope");
        scope.btnSwitch.click();
        expect(scope.spanSwitch.innerText).toBe("Spectrogram");
        scope.btnSwitch.click();
        expect(scope.spanSwitch.innerText).toBe("Phase");
        scope.btnSwitch.click();
        expect(scope.spanSwitch.innerText).toBe("Data");
        scope.btnSwitch.click();
        expect(scope.spanSwitch.innerText).toBe("Interleaved");
        scope.btnSwitch.click();
        expect(scope.spanSwitch.innerText).toBe("Oscilloscope");

        scope.drawSpectrogram = false;
        scope.mode = ScopeMode.Spectroscope;
        scope.btnSwitch.click();
        expect(scope.spanSwitch.innerText).toBe("Phase");

        scope.data = createDrawOptions({ drawMode: "continuous" });
        scope.mode = ScopeMode.Spectrogram;
        scope.btnSwitch.click();
        expect(scope.spanSwitch.innerText).toBe("Phase");
    });

    it("updates surfaces and controls when mode changes", () => {
        const { container } = createStaticScopeContainer();
        const scope = new StaticScope({ container });

        scope.mode = ScopeMode.Data;
        expect(scope.divData.style.display).toBe("block");
        expect(scope.canvas.style.display).toBe("none");
        expect(scope.btnZoom.style.display).toBe("none");
        expect(scope.btnScale.style.display).toBe("none");

        scope.mode = ScopeMode.Spectroscope;
        expect(scope.divData.style.display).toBe("none");
        expect(scope.canvas.style.display).toBe("block");
        expect(scope.btnZoom.style.display).toBe("");
        expect(scope.btnScale.style.display).toBe("");
        expect(scope.btnMagnitude.style.display).toBe("");
        expect(scope.iSwitch.className).toBe("fas fa-sm fa-chart-bar");
    });

    it("toggles frequency scale, resets spectrogram cache state, and redraws", () => {
        const { container } = createStaticScopeContainer();
        const scope = new StaticScope({ container });
        const drawSpy = vi.spyOn(scope, "draw");
        scope.lastSpect$ = 42;

        scope.btnScale.click();

        expect(scope.freqScaleMode).toBe(FreqScaleMode.Linear);
        expect(scope.iScale.className).toBe("fas fa-ruler-horizontal");
        expect(scope.btnScale.getAttribute("title")).toBe("Switch to Logarithmic Scale");
        expect(scope.lastSpect$).toBe(0);
        expect(scope.spectTempCtx.clearRect).toHaveBeenCalledWith(0, 0, scope.spectTempCtx.canvas.width, scope.spectTempCtx.canvas.height);
        expect(drawSpy).toHaveBeenCalled();
    });

    it("toggles spectrum magnitude between dB and linear amplitude", () => {
        const { container } = createStaticScopeContainer();
        const scope = new StaticScope({ container });
        scope.mode = ScopeMode.Spectroscope;

        scope.btnMagnitude.click();

        expect(scope.magnitudeScaleMode).toBe(0);
        expect(scope.btnMagnitude.innerText).toBe("amp");
        expect(scope.btnMagnitude.getAttribute("title")).toBe("Switch to Decibels");
    });

    it("clamps zoom, pan, vertical zoom, and reset controls", () => {
        const { container } = createStaticScopeContainer();
        const scope = new StaticScope({ container });
        scope.draw(createDrawOptions());

        scope.zoom = 4;
        scope.zoomOffset = 99;
        expect(scope.zoomOffset).toBeCloseTo(0.75);

        scope.zoomOffset = -1;
        expect(scope.zoomOffset).toBe(0);

        scope.vzoom = 100;
        expect(scope.vzoom).toBe(16);

        scope.btnZoom.click();
        expect(scope.zoom).toBe(1);
        expect(scope.btnZoom.innerHTML).toBe("1.0x");
    });

    it("updates cursor state from pointer movement and clears it on leave", () => {
        const { container } = createStaticScopeContainer({ width: 320, height: 180 });
        const scope = new StaticScope({ container });
        scope.draw(createDrawOptions());
        const drawSpy = vi.spyOn(scope, "draw");

        const move = new MouseEvent("mousemove");
        Object.defineProperties(move, {
            offsetX: { value: 120 },
            offsetY: { value: 40 }
        });
        scope.canvas.dispatchEvent(move);
        expect(scope.cursor).toEqual({ x: 120, y: 40 });
        expect(drawSpy).toHaveBeenCalled();

        scope.canvas.dispatchEvent(new MouseEvent("mouseleave"));
        expect(scope.cursor).toBeUndefined();
    });

    it("schedules one frame and dispatches draw callbacks by mode", () => {
        const { container } = createStaticScopeContainer({ width: 320, height: 180 });
        const scope = new StaticScope({ container });
        setElementVisible(scope.canvas, true);
        const drawOptions = createDrawOptions();
        const drawOscilloscope = vi.spyOn(StaticScope, "drawOscilloscope").mockImplementation(() => undefined);
        const fillDivData = vi.spyOn(StaticScope, "fillDivData").mockImplementation(() => undefined);
        const drawSpectroscope = vi.spyOn(StaticScope, "drawSpectroscope").mockImplementation(() => undefined);
        const drawPhase = vi.spyOn(StaticScope, "drawPhase").mockImplementation(() => undefined);

        scope.draw(drawOptions);
        scope.draw(drawOptions);
        expect(rafMock.frames).toHaveLength(1);

        scope.mode = ScopeMode.Oscilloscope;
        rafMock.flush();
        expect(drawOscilloscope).toHaveBeenCalledWith(scope.ctx, 320, 180, drawOptions, 1, 0, 1, undefined);

        scope.mode = ScopeMode.Data;
        rafMock.flush();
        expect(fillDivData).toHaveBeenCalledWith(scope.divData, drawOptions);

        scope.mode = ScopeMode.Spectroscope;
        rafMock.flush();
        expect(drawSpectroscope).toHaveBeenCalledWith(scope.ctx, 320, 180, drawOptions, 1, 0, undefined, FreqScaleMode.Logarithmic, 1);

        scope.mode = ScopeMode.Phase;
        rafMock.flush();
        expect(drawPhase).toHaveBeenCalledWith(scope.ctx, 320, 180, drawOptions, 1, 0, undefined, FreqScaleMode.Logarithmic);
    });

    it("skips continuous rendering while hidden and resets spectrogram cache on data shape change", () => {
        const { container } = createStaticScopeContainer({ width: 320, height: 180 });
        const scope = new StaticScope({ container });
        const drawOscilloscope = vi.spyOn(StaticScope, "drawOscilloscope").mockImplementation(() => undefined);
        scope.lastSpect$ = 12;
        setElementVisible(scope.canvas, false);

        scope.draw(createDrawOptions({
            drawMode: "continuous",
            freqDomainData: [new Float32Array(16)]
        }));
        expect(scope.lastSpect$).toBe(0);
        rafMock.flush();

        expect(drawOscilloscope).not.toHaveBeenCalled();
    });
});
