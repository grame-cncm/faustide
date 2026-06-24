import "./Scope.scss";
import { clampZoomOffset } from "./scope/FrequencyScale";
import { RealtimeScopeType as TScopeType, getRealtimeScopeIconClassName } from "./scope/ScopeModes";
import {
    drawRealtimeBackground,
    drawRealtimeGrid,
    drawRealtimeOfflineSpectrogram,
    drawRealtimeOscilloscope,
    drawRealtimeSpectrogram,
    drawRealtimeSpectroscope,
    drawRealtimeStats
} from "./scope/realtime/RealtimeScopeRenderer";
import { createRealtimeScopeControls } from "./scope/realtime/RealtimeScopeControls";
import { createAnalyserFrameBuffers } from "./scope/realtime/AnalyserFrameReader";
import { routeScopeChannel } from "./scope/realtime/ScopeChannelRouter";
import { drawRealtimeScopePause, runRealtimeScopeDrawLoop } from "./scope/realtime/ScopeDrawLoop";

type TOptions = {
    audioCtx: AudioContext;
    analyser: AnalyserNode;
    splitter: ChannelSplitterNode;
    channels: number;
    container: HTMLDivElement;
    type?: TScopeType;
    paused?: boolean;
};

/**
 * Real-time analyser scope widget (oscilloscope / spectroscope / spectrogram).
 *
 * Bound to a Web Audio `AnalyserNode` and `ChannelSplitterNode`, it polls the
 * analyser each animation frame and renders the selected view onto its own
 * canvas, with overlay controls for type, FFT size, channel, and pause. The
 * heavy rendering, control DOM, analyser reads, channel routing, and draw loop
 * live in `src/scope/realtime/`; this class owns the widget lifecycle and the
 * zoom/channel/pause/disabled state. The `static draw*` methods are thin
 * compatibility wrappers over those renderers.
 */
export class Scope {
    /** Selectable FFT window sizes cycled by the size button. */
    static sizes = [128, 512, 2048, 8192];
    raf: number;
    ctx: CanvasRenderingContext2D;
    spectTempCtx: CanvasRenderingContext2D;
    spectCol$ = 0;
    private _disabled = false;
    private _paused = false;
    frame = 0;
    readonly audioCtx: AudioContext;
    readonly analyser: AnalyserNode;
    splitter: ChannelSplitterNode;
    private _channel = 0;
    channels: number;
    container: HTMLDivElement;
    canvas: HTMLCanvasElement;
    btnSwitch: HTMLButtonElement;
    btnSize: HTMLButtonElement;
    btnCh: HTMLButtonElement;
    iSwitch: HTMLElement;
    type = TScopeType.Oscilloscope;
    private _zoom = 1;
    private _zoomOffset = 0;
    private _size = 2048;
    t: Float32Array;
    ti: Uint8Array;
    f: Float32Array;
    drawSpectrogram: boolean = false;

    // Compatibility wrappers: the real implementations live in
    // src/scope/realtime/RealtimeScopeRenderer. Kept as static methods because
    // the draw loop and tests reference them through the class.
    static drawOscilloscope(ctx: CanvasRenderingContext2D, w: number, h: number, d: Float32Array, freq: number, sr: number, zoom: number, zoomOffset: number) {
        drawRealtimeOscilloscope(ctx, w, h, d, freq, sr, zoom, zoomOffset);
    }
    static drawSpectroscope(ctx: CanvasRenderingContext2D, w: number, h: number, d: Float32Array, zoom: number, zoomOffset: number) {
        drawRealtimeSpectroscope(ctx, w, h, d, zoom, zoomOffset);
    }
    static drawOfflineSpectrogram(ctx: CanvasRenderingContext2D, d: Float32Array, $: number) {
        drawRealtimeOfflineSpectrogram(ctx, d, $);
    }
    static drawSpectrogram(ctx: CanvasRenderingContext2D, tempCtx: CanvasRenderingContext2D, $: number, w: number, h: number, d: Float32Array, zoom: number) {
        drawRealtimeSpectrogram(ctx, tempCtx, $, w, h, d, zoom);
    }
    static drawBackground(ctx: CanvasRenderingContext2D, w: number, h: number) {
        drawRealtimeBackground(ctx, w, h);
    }
    static drawGrid(ctx: CanvasRenderingContext2D, w: number, h: number) {
        drawRealtimeGrid(ctx, w, h);
    }
    static drawStats(ctx: CanvasRenderingContext2D, w: number, h: number, freq: number, samp: number, rms: number, zoom?: number, zoomMin?: number, zoomMax?: number) {
        drawRealtimeStats(ctx, w, h, freq, samp, rms, zoom, zoomMin, zoomMax);
    }
    static getIconClassName(typeIn: TScopeType) {
        return getRealtimeScopeIconClassName(typeIn);
    }

    /**
     * Wires the scope to an analyser/splitter, allocates frame buffers, builds
     * the controls, and starts paused when AudioWorklet is unavailable.
     */
    constructor(options: TOptions) {
        Object.assign(this, options);
        Object.assign(this, createAnalyserFrameBuffers(this.analyser));
        this.getChildren();
        this.bind();
        if (!window.AudioWorklet) this.paused = true;
        else if (typeof options.paused === "undefined") this.paused = false;
    }
    /** Creates (or reuses) the canvas and overlay control buttons. */
    getChildren() {
        Object.assign(this, createRealtimeScopeControls(this.container, this.analyser.fftSize, this._channel));
    }
    /** Binds the type/size/channel buttons, click-to-pause, and wheel zoom/pan. */
    bind() {
        this.btnSwitch.addEventListener("click", () => {
            this.zoom = 1;
            this.zoomOffset = 0;
            this.type = (this.type + 1) % (this.drawSpectrogram ? 3 : 2);
            this.iSwitch.className = Scope.getIconClassName(this.type);
        });
        this.btnSize.addEventListener("click", () => {
            this.zoom = 1;
            this.zoomOffset = 0;
            this.size = Scope.sizes[(Scope.sizes.indexOf(this.size) + 1) % 4];
        });
        this.btnCh.addEventListener("click", () => {
            this.channel = (this.channel + 1) % this.channels;
        });
        this.canvas.addEventListener("click", () => {
            this.paused = !this.paused;
        });
        this.canvas.addEventListener("wheel", (e) => {
            const multiplier = 1.5 ** (e.deltaY > 0 ? -1 : 1);
            const zoom = this.zoom;
            const rect = this.canvas.getBoundingClientRect();
            const center = (e.pageX - rect.left) / rect.width / zoom + this.zoomOffset;
            if (e.deltaY !== 0) {
                this.zoom *= multiplier;
                this.zoomOffset = center - center / this.zoom;
            }
            if (e.deltaX !== 0) this.zoomOffset += (e.deltaX > 0 ? 1 : -1) * 0.1;
        });
    }
    /** One animation-frame tick: reads the analyser and renders the current view. */
    draw = () => {
        return runRealtimeScopeDrawLoop(this, {
            drawOfflineSpectrogram: Scope.drawOfflineSpectrogram,
            drawOscilloscope: Scope.drawOscilloscope,
            drawSpectroscope: Scope.drawSpectroscope,
            drawSpectrogram: Scope.drawSpectrogram,
            drawStats: Scope.drawStats
        });
    }
    /** Renders the static "paused" frame instead of running the draw loop. */
    drawPause = () => {
        drawRealtimeScopePause(this.ctx, this.canvas.width, this.canvas.height);
    };
    /** FFT window size; the setter reallocates analyser buffers and relabels the button. */
    get size() {
        return this._size;
    }
    set size(sizeIn: number) {
        this.analyser.fftSize = sizeIn;
        Object.assign(this, createAnalyserFrameBuffers(this.analyser));
        this.btnSize.innerText = sizeIn.toString() + " samps";
        this._size = sizeIn;
    }
    /** Pauses/resumes the draw loop (shows the paused frame while paused). */
    get paused() {
        return this._paused;
    }
    set paused(pausedIn) {
        if (pausedIn === this.paused) return;
        this._paused = pausedIn;
        if (this.disabled) return;
        if (this.paused) {
            cancelAnimationFrame(this.raf);
            this.raf = requestAnimationFrame(this.drawPause);
        } else {
            this.raf = requestAnimationFrame(this.draw);
        }
    }
    /** When disabled, the draw loop is stopped regardless of pause state (no-DSP output scope). */
    get disabled() {
        return this._disabled;
    }
    set disabled(disabledIn) {
        if (disabledIn === this.disabled) return;
        this._disabled = disabledIn;
        if (this.paused) return;
        if (this.disabled) {
            cancelAnimationFrame(this.raf);
        } else {
            this.raf = requestAnimationFrame(this.draw);
        }
    }
    /** Displayed channel; the setter reconnects the splitter to the analyser. */
    get channel() {
        return this._channel;
    }
    set channel(channelIn) {
        const routedChannel = routeScopeChannel({
            splitter: this.splitter,
            analyser: this.analyser,
            channels: this.channels,
            currentChannel: this._channel,
            nextChannel: channelIn
        });
        if (typeof routedChannel !== "number") return;
        this._channel = routedChannel;
        this.btnCh.innerText = "ch " + (this._channel + 1).toString();
    }
    /** Horizontal zoom factor, clamped to [1, 16]; re-clamps the offset on change. */
    get zoom() {
        return this._zoom;
    }
    set zoom(zoomIn) {
        this._zoom = Math.min(16, Math.max(1, zoomIn));
        this.zoomOffset = this._zoomOffset;
    }
    get zoomOffset() {
        return this._zoomOffset;
    }
    set zoomOffset(zoomOffsetIn) {
        this._zoomOffset = clampZoomOffset(this._zoom, zoomOffsetIn);
    }
}
