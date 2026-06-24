import { estimateFreq, getRms } from "../../utils";
import { readAnalyserFrame } from "./AnalyserFrameReader";
import { RealtimeScopeType } from "../ScopeModes";

type ScopeDrawLoopTarget = {
    /** RequestAnimationFrame handle owned by the public Scope instance. */
    raf: number;
    /** Throttling counter; only every third frame reads analyser data. */
    frame: number;
    /** Audio context must be running before analyser data is meaningful. */
    audioCtx: AudioContext;
    /** Source analyser node. */
    analyser: AnalyserNode;
    /** Root element providing the visible canvas width/height limits. */
    container: HTMLDivElement;
    /** Visible analyser canvas. */
    canvas: HTMLCanvasElement;
    /** Visible analyser canvas context. */
    ctx: CanvasRenderingContext2D;
    /** Rolling spectrogram cache context. */
    spectTempCtx: CanvasRenderingContext2D;
    /** Current spectrogram cache column. */
    spectCol$: number;
    /** Current display mode. */
    type: RealtimeScopeType;
    /** Whether the cache should be updated before drawing spectrogram mode. */
    drawSpectrogram: boolean;
    /** Current horizontal zoom. */
    zoom: number;
    /** Current horizontal zoom offset. */
    zoomOffset: number;
    /** Float time-domain buffer. */
    t: Float32Array;
    /** Byte time-domain fallback buffer. */
    ti: Uint8Array;
    /** Float frequency-domain buffer. */
    f: Float32Array;
    /** Public draw callback rescheduled at the end of each frame. */
    draw: () => number;
};

type ScopeDrawRenderers = {
    drawOfflineSpectrogram: (ctx: CanvasRenderingContext2D, data: Float32Array, columnIndex: number) => void;
    drawOscilloscope: (ctx: CanvasRenderingContext2D, width: number, height: number, data: Float32Array, frequency: number, sampleRate: number, zoom: number, zoomOffset: number) => void;
    drawSpectroscope: (ctx: CanvasRenderingContext2D, width: number, height: number, data: Float32Array, zoom: number, zoomOffset: number) => void;
    drawSpectrogram: (ctx: CanvasRenderingContext2D, tempCtx: CanvasRenderingContext2D, columnIndex: number, width: number, height: number, data: Float32Array, zoom: number) => void;
    drawStats: (ctx: CanvasRenderingContext2D, width: number, height: number, frequency: number, sample: number, rms: number, zoom?: number, zoomMin?: number, zoomMax?: number) => void;
};

/**
 * Runs one real-time analyser draw-loop tick and schedules the next one.
 *
 * The analyser is intentionally throttled to every third animation frame, as in
 * the original `Scope.draw` implementation. Hidden canvases, missing audio
 * context/analyser, and non-running audio contexts skip analyser reads but
 * still schedule the next frame.
 */
export const runRealtimeScopeDrawLoop = (
    target: ScopeDrawLoopTarget,
    renderers: ScopeDrawRenderers
) => {
    target.frame++;
    if (target.canvas.offsetParent !== null && target.frame % 3 === 0 && target.audioCtx && target.audioCtx.state === "running" && target.analyser) {
        const sampleRate = target.audioCtx.sampleRate;
        const width = target.container.clientWidth;
        const height = Math.floor(Math.min(width * 0.75, target.container.clientHeight));
        target.canvas.width = width;
        target.canvas.height = height;

        readAnalyserFrame(target.analyser, { t: target.t, ti: target.ti, f: target.f });
        const frequency = estimateFreq(target.f, sampleRate);
        const sample = target.t[target.t.length - 1];
        const rms = getRms(target.t);

        if (target.drawSpectrogram) renderers.drawOfflineSpectrogram(target.spectTempCtx, target.f, target.spectCol$);
        if (target.type === RealtimeScopeType.Oscilloscope) {
            renderers.drawOscilloscope(target.ctx, width, height, target.t, frequency, sampleRate, target.zoom, target.zoomOffset);
            renderers.drawStats(target.ctx, width, height, frequency, sample, rms, target.zoom);
        } else if (target.type === RealtimeScopeType.Spectroscope) {
            renderers.drawSpectroscope(target.ctx, width, height, target.f, target.zoom, target.zoomOffset);
            renderers.drawStats(target.ctx, width, height, frequency, sample, rms, target.zoom, sampleRate / 2 * target.zoomOffset, sampleRate / 2 / target.zoom + sampleRate / 2 * target.zoomOffset);
        } else if (target.type === RealtimeScopeType.Spectrogram) {
            renderers.drawSpectrogram(target.ctx, target.spectTempCtx, target.spectCol$, width, height, target.f, target.zoom);
            renderers.drawStats(target.ctx, width, height, frequency, sample, rms, target.zoom);
        }
        target.spectCol$ = (target.spectCol$ + 1) % target.spectTempCtx.canvas.width;
    }

    target.raf = requestAnimationFrame(target.draw);
    return target.raf;
};

/**
 * Draws the paused overlay used when the real-time analyser is paused.
 */
export const drawRealtimeScopePause = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
) => {
    ctx.fillStyle = "#00000080";
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(width * 0.38, height * 0.35, width * 0.08, height * 0.3);
    ctx.fillRect(width * 0.54, height * 0.35, width * 0.08, height * 0.3);
};
