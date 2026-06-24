import { describe, expect, it } from "vitest";
import { StaticScope, type TDrawOptions } from "../StaticScope";
import { createMockCanvasContext } from "./helpers/canvasContext";

const ScopeMode = {
    Data: 0,
    Interleaved: 1,
    Oscilloscope: 2,
    Spectroscope: 3,
    Spectrogram: 4
} as const;

const FreqScaleMode = {
    Linear: 0,
    Logarithmic: 1
} as const;

const createDrawOptions = (overrides: Partial<TDrawOptions> = {}): TDrawOptions => ({
    drawMode: "manual",
    startSampleIndex: 0,
    startBufferIndex: 0,
    timeDomainData: [new Float32Array([0, 0.25, -0.25, 0.5])],
    freqDomainData: [new Float32Array([-90, -60, -30, -12, -24, -48, -72, -96])],
    events: [],
    bufferSize: 4,
    fftSize: 8,
    fftOverlap: 2,
    sampleRate: 48000,
    ...overrides
});

describe("StaticScope rendering helpers", () => {
    it("keeps stable labels and icons for all display modes", () => {
        expect([
            StaticScope.getModeName(ScopeMode.Data as any),
            StaticScope.getModeName(ScopeMode.Interleaved as any),
            StaticScope.getModeName(ScopeMode.Oscilloscope as any),
            StaticScope.getModeName(ScopeMode.Spectroscope as any),
            StaticScope.getModeName(ScopeMode.Spectrogram as any)
        ]).toEqual(["Data", "Interleaved", "Oscilloscope", "Spectroscope", "Spectrogram"]);

        expect([
            StaticScope.getIconClassName(ScopeMode.Data as any),
            StaticScope.getIconClassName(ScopeMode.Interleaved as any),
            StaticScope.getIconClassName(ScopeMode.Oscilloscope as any),
            StaticScope.getIconClassName(ScopeMode.Spectroscope as any),
            StaticScope.getIconClassName(ScopeMode.Spectrogram as any)
        ]).toEqual([
            "fas fa-sm fa-table",
            "fas fa-sm fa-water",
            "fas fa-sm fa-wave-square",
            "fas fa-sm fa-chart-bar",
            "fas fa-sm fa-align-justify"
        ]);
    });

    it("draws the background over the full canvas", () => {
        const { context } = createMockCanvasContext();

        StaticScope.drawBackground(context, 320, 180);

        expect(context.save).toHaveBeenCalled();
        expect(context.fillStyle).toBe("#181818");
        expect(context.fillRect).toHaveBeenCalledWith(0, 0, 320, 180);
        expect(context.restore).toHaveBeenCalled();
    });

    it("draws cursor stats with axis labels and value panel", () => {
        const { context } = createMockCanvasContext();

        StaticScope.drawStats(context, 320, 180, {
            x: 120,
            y: 80,
            xLabel: "128",
            yLabel: "0.50",
            values: [0.25, -0.5]
        });

        expect(context.moveTo).toHaveBeenCalledWith(120, 0);
        expect(context.lineTo).toHaveBeenCalledWith(120, 160);
        expect(context.moveTo).toHaveBeenCalledWith(50, 80);
        expect(context.lineTo).toHaveBeenCalledWith(320, 80);
        expect(context.fillText).toHaveBeenCalledWith("128", 120, 170, 40);
        expect(context.fillText).toHaveBeenCalledWith("0.50", 40, 80, 40);
        expect(context.fillText).toHaveBeenCalledWith("0.2500000", 318, 15, 70);
        expect(context.fillText).toHaveBeenCalledWith("-0.5000000", 318, 30, 70);
    });

    it("draws event labels on the right when there is enough space", () => {
        const { context } = createMockCanvasContext();
        const events = [
            { type: "ctrl", data: { path: "/gain", value: 0.5 } },
            { type: "midi", data: [144, 60, 127] }
        ];

        StaticScope.drawEvent(context, 320, 180, 80, events);

        expect(context.fillRect).toHaveBeenCalledWith(80, 0, expect.any(Number), 32);
        expect(context.textAlign).toBe("left");
        expect(context.fillText).toHaveBeenCalledWith("/gain: 0.5", 80, 15, expect.any(Number));
        expect(context.fillText).toHaveBeenCalledWith("midi: 144,60,127", 80, 30, expect.any(Number));
    });

    it("draws time-domain grid axes, labels, and event markers", () => {
        const { context } = createMockCanvasContext();
        const drawOptions = createDrawOptions({
            events: [
                [{ type: "midi", data: [144, 60, 127] }],
                [],
                [{ type: "ctrl", data: { path: "/freq", value: 440 } }]
            ]
        });

        const eventsToDraw = StaticScope.drawGrid(
            context,
            320,
            180,
            0,
            16,
            0,
            1,
            drawOptions,
            ScopeMode.Oscilloscope as any
        );

        expect(context.fillText).toHaveBeenCalledWith("lvl/samp", 45, 170, 40);
        expect(context.moveTo).toHaveBeenCalledWith(50, 0);
        expect(context.lineTo).toHaveBeenCalledWith(50, 160);
        expect(eventsToDraw.length).toBeGreaterThan(0);
        expect(eventsToDraw[0][1][0].type).toBe("midi");
    });

    it("draws logarithmic frequency labels for spectroscope grids", () => {
        const { context } = createMockCanvasContext();

        StaticScope.drawGrid(
            context,
            320,
            180,
            20,
            20000,
            0,
            1,
            createDrawOptions(),
            ScopeMode.Spectroscope as any,
            FreqScaleMode.Logarithmic as any
        );

        expect(context.fillText).toHaveBeenCalledWith("dB/Hz", 45, 170, 40);
        expect(context.fillText).toHaveBeenCalledWith("100", expect.any(Number), 170);
        expect(context.fillText).toHaveBeenCalledWith("1.0k", expect.any(Number), 170);
        expect(context.fillText).toHaveBeenCalledWith("10.0k", expect.any(Number), 170);
    });

    it("draws oscilloscope traces and cursor stats", () => {
        const { context } = createMockCanvasContext();

        StaticScope.drawOscilloscope(
            context,
            320,
            180,
            createDrawOptions({
                timeDomainData: [
                    new Float32Array([0, 0.5, 0, -0.5, 0, 0.75, 0, -0.75]),
                    new Float32Array([0.25, 0, -0.25, 0, 0.5, 0, -0.5, 0])
                ]
            }),
            1,
            0,
            1,
            { x: 160, y: 60 }
        );

        expect(context.beginPath).toHaveBeenCalled();
        expect(context.moveTo).toHaveBeenCalledWith(50, expect.any(Number));
        expect(context.lineTo).toHaveBeenCalledWith(expect.any(Number), expect.any(Number));
        expect(context.fillText).toHaveBeenCalledWith(expect.stringMatching(/^-?\d+\.\d{7}$/), 318, expect.any(Number), 70);
    });

    it("draws interleaved traces in separate channel lanes", () => {
        const { context } = createMockCanvasContext();

        StaticScope.drawInterleaved(
            context,
            320,
            180,
            createDrawOptions({
                timeDomainData: [
                    new Float32Array([0, 0.5, 0, -0.5]),
                    new Float32Array([1, 0.5, 0, -0.5])
                ]
            }),
            1,
            0,
            1,
            { x: 120, y: 40 }
        );

        expect(context.beginPath).toHaveBeenCalled();
        expect(context.stroke).toHaveBeenCalled();
        expect(context.moveTo).toHaveBeenCalledWith(50, expect.any(Number));
        expect(context.fillText).toHaveBeenCalledWith(expect.stringMatching(/^-?\d+\.\d{7}$/), 318, expect.any(Number), 70);
    });

    it("draws a linear spectroscope filled spectrum", () => {
        const { context } = createMockCanvasContext();

        StaticScope.drawSpectroscope(
            context,
            320,
            180,
            createDrawOptions({
                freqDomainData: [new Float32Array([-90, -60, -30, -10, -20, -40, -70, -95])],
                fftSize: 8
            }),
            1,
            0,
            { x: 160, y: 60 },
            FreqScaleMode.Linear as any
        );

        expect(context.closePath).toHaveBeenCalled();
        expect(context.fill).toHaveBeenCalled();
        expect(context.fillText).toHaveBeenCalledWith(expect.stringMatching(/^-?\d+\.\d{7}$/), 318, expect.any(Number), 70);
    });

    it("draws contiguous and wrapped spectrogram cache regions", () => {
        const main = createMockCanvasContext();
        const cache = createMockCanvasContext({ width: 4, height: 64 });
        const drawOptions = createDrawOptions({
            startSampleIndex: 0,
            freqDomainData: [new Float32Array(16).fill(-30)],
            fftSize: 8,
            fftOverlap: 2
        });

        StaticScope.drawSpectrogram(
            main.context,
            cache.context,
            320,
            180,
            drawOptions,
            2,
            0,
            { x: 160, y: 60 },
            FreqScaleMode.Linear as any
        );
        expect(main.context.drawImage).toHaveBeenCalledWith(cache.canvas, 0, 0, 2, 64, 50, 0, 270, 160);

        StaticScope.drawSpectrogram(
            main.context,
            cache.context,
            320,
            180,
            { ...drawOptions, startSampleIndex: 8 },
            1,
            0,
            { x: 160, y: 60 },
            FreqScaleMode.Linear as any
        );
        expect(main.context.drawImage).toHaveBeenCalledWith(cache.canvas, 2, 0, 2, 64, 50, 0, 135, 160);
        expect(main.context.drawImage).toHaveBeenCalledWith(cache.canvas, 0, 0, 1.99, 64, 185, 0, 135, 160);
    });

    it("updates the offline spectrogram cache in linear and logarithmic modes", () => {
        const cache = createMockCanvasContext({ width: 1, height: 8 });
        const drawOptions = createDrawOptions({
            startSampleIndex: 0,
            freqDomainData: [new Float32Array([-90, -60, -30, -10, -20, -40, -70, -95])],
            fftSize: 4,
            fftOverlap: 2,
            sampleRate: 48000
        });

        const linearLastIndex = StaticScope.drawOfflineSpectrogram(cache.context, drawOptions, 0, FreqScaleMode.Linear as any);

        expect(cache.canvas.width).toBe(4);
        expect(cache.context.fillRect).toHaveBeenCalledWith(0, 0, 1, 8);
        expect(linearLastIndex).toBe(0);

        const logCache = createMockCanvasContext({ width: 1, height: 8 });
        StaticScope.drawOfflineSpectrogram(logCache.context, drawOptions, 0, FreqScaleMode.Logarithmic as any);

        expect(logCache.canvas.width).toBe(4);
        expect(logCache.context.fillRect).toHaveBeenCalledWith(expect.any(Number), expect.any(Number), 1, 1);
    });

    it("renders data rows and clears stale rows", () => {
        const container = document.createElement("div");

        StaticScope.fillDivData(container, createDrawOptions({
            timeDomainData: [
                new Float32Array([0, 0.25, -0.25, 0.5]),
                new Float32Array([1, 0.75, 0.5, 0.25])
            ],
            events: [[{ type: "midi", data: [144, 60, 127] }]]
        }));

        expect(container.querySelectorAll(".static-scope-channel")).toHaveLength(2);
        expect(container.querySelectorAll(".static-scope-cell")).toHaveLength(8);
        expect(container.querySelectorAll(".highlight")).toHaveLength(2);
        expect(Array.from(container.querySelectorAll("span")).map(span => span.innerText)).toContain("0.2500000");

        StaticScope.fillDivData(container, createDrawOptions({
            timeDomainData: [new Float32Array([0.125])]
        }));

        expect(container.querySelectorAll(".static-scope-channel")).toHaveLength(1);
        expect(container.querySelectorAll(".static-scope-cell")).toHaveLength(1);
        const renderedText = Array.from(container.querySelectorAll("span")).map(span => span.innerText);
        expect(renderedText).toContain("0.1250000");
        expect(renderedText).not.toContain("0.2500000");
    });
});
