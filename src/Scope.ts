import "./Scope.scss";
import { estimateFreq, getRms } from "./utils";
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

type TOptions = {
    audioCtx: AudioContext;
    analyser: AnalyserNode;
    splitter: ChannelSplitterNode;
    channels: number;
    container: HTMLDivElement;
    type?: TScopeType;
    paused?: boolean;
};

export class Scope {
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

    constructor(options: TOptions) {
        Object.assign(this, options);
        this.t = new Float32Array(this.analyser.fftSize);
        this.ti = new Uint8Array(this.analyser.fftSize);
        this.f = new Float32Array(this.analyser.frequencyBinCount);
        this.getChildren();
        this.bind();
        if (!window.AudioWorklet) this.paused = true;
        else if (typeof options.paused === "undefined") this.paused = false;
    }
    getChildren() {
        this.spectTempCtx = document.createElement("canvas").getContext("2d");
        this.spectTempCtx.canvas.height = 1024;
        this.spectTempCtx.canvas.width = 1024;
        let ctrl: HTMLDivElement;
        for (let i = 0; i < this.container.children.length; i++) {
            const e = this.container.children[i];
            if (e.classList.contains("scope-controller")) ctrl = e as HTMLDivElement;
            if (e.classList.contains("scope-canvas")) this.canvas = e as HTMLCanvasElement;
        }
        if (!ctrl) {
            ctrl = document.createElement("div");
            ctrl.classList.add("scope-controller");
            this.container.appendChild(ctrl);
        }
        if (!this.canvas) {
            const canvas = document.createElement("canvas");
            canvas.classList.add("scope-canvas");
            canvas.setAttribute("data-toggle", "tooltip");
            canvas.setAttribute("data-placement", "left");
            canvas.setAttribute("title", "Input analyser");
            this.container.appendChild(canvas);
            this.canvas = canvas;
            try {
                $(canvas).tooltip({ trigger: "hover", boundary: "viewport" });
            } catch (e) {} // eslint-disable-line no-empty
        }
        this.ctx = this.canvas.getContext("2d");
        for (let i = 0; i < ctrl.children.length; i++) {
            const e = ctrl.children[i];
            if (e.classList.contains("scope-btn-switch")) this.btnSwitch = e as HTMLButtonElement;
            if (e.classList.contains("scope-btn-size")) this.btnSize = e as HTMLButtonElement;
            if (e.classList.contains("scope-btn-ch")) this.btnCh = e as HTMLButtonElement;
        }
        if (!this.btnSwitch) {
            const btn = document.createElement("button");
            btn.className = "scope-btn-switch btn btn-outline-light btn-sm btn-overlay btn-overlay-icon";
            btn.setAttribute("data-toggle", "tooltip");
            btn.setAttribute("data-placement", "top");
            btn.setAttribute("title", "Oscilloscope / Spectroscope / Spectrogram");
            ctrl.appendChild(btn);
            this.btnSwitch = btn;
            try {
                $(btn).tooltip({ trigger: "hover", boundary: "viewport" });
            } catch (e) {} // eslint-disable-line no-empty
        }
        if (!this.btnSize) {
            const btn = document.createElement("button");
            btn.className = "scope-btn-size btn btn-outline-light btn-sm btn-overlay";
            btn.setAttribute("data-toggle", "tooltip");
            btn.setAttribute("data-placement", "top");
            btn.setAttribute("title", "Analyser Size");
            btn.innerText = this.analyser.fftSize + "samps";
            ctrl.appendChild(btn);
            this.btnSize = btn;
            try {
                $(btn).tooltip({ trigger: "hover", boundary: "viewport" });
            } catch (e) {} // eslint-disable-line no-empty
        }
        if (!this.btnCh) {
            const btn = document.createElement("button");
            btn.className = "scope-btn-ch btn btn-outline-light btn-sm btn-overlay";
            btn.setAttribute("data-toggle", "tooltip");
            btn.setAttribute("data-placement", "top");
            btn.setAttribute("title", "Current Channel");
            btn.innerText = "ch " + (this._channel + 1).toString();
            ctrl.appendChild(btn);
            this.btnCh = btn;
            try {
                $(btn).tooltip({ trigger: "hover", boundary: "viewport" });
            } catch (e) {} // eslint-disable-line no-empty
        }
        for (let i = 0; i < this.btnSwitch.children.length; i++) {
            const e = this.btnSwitch.children[i];
            if (e.classList.contains("fas")) this.iSwitch = e as HTMLElement;
        }
        if (!this.iSwitch) {
            const i = document.createElement("i");
            i.className = "fas fa-sm fa-wave-square";
            this.btnSwitch.appendChild(i);
            this.iSwitch = i;
        }
    }
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
    draw = () => {
        this.frame++; // Reduce frame rate
        if (this.canvas.offsetParent !== null && this.frame % 3 === 0 && this.audioCtx && this.audioCtx.state === "running" && this.analyser) {
            const ctx = this.ctx;
            const sr = this.audioCtx.sampleRate;
            const w = this.container.clientWidth;
            const h = Math.floor(Math.min(w * 0.75, this.container.clientHeight));
            this.canvas.width = w;
            this.canvas.height = h;
            this.analyser.getFloatFrequencyData(this.f);
            if (this.analyser.getFloatTimeDomainData) {
                this.analyser.getFloatTimeDomainData(this.t);
            } else { // This is for Safari, what a shame
                this.analyser.getByteTimeDomainData(this.ti);
                this.ti.forEach((v, i) => this.t[i] = v / 128 - 1);
            }
            const freq = estimateFreq(this.f, sr);
            const samp = this.t[this.t.length - 1];
            const rms = getRms(this.t);
            if (this.drawSpectrogram) Scope.drawOfflineSpectrogram(this.spectTempCtx, this.f, this.spectCol$);
            if (this.type === TScopeType.Oscilloscope) {
                Scope.drawOscilloscope(ctx, w, h, this.t, freq, sr, this.zoom, this.zoomOffset);
                Scope.drawStats(ctx, w, h, freq, samp, rms, this.zoom);
            } else if (this.type === TScopeType.Spectroscope) {
                Scope.drawSpectroscope(ctx, w, h, this.f, this.zoom, this.zoomOffset);
                Scope.drawStats(ctx, w, h, freq, samp, rms, this.zoom, sr / 2 * this.zoomOffset, sr / 2 / this.zoom + sr / 2 * this.zoomOffset);
            } else if (this.type === TScopeType.Spectrogram) {
                Scope.drawSpectrogram(ctx, this.spectTempCtx, this.spectCol$, w, h, this.f, this.zoom);
                Scope.drawStats(ctx, w, h, freq, samp, rms, this.zoom);
            }
            this.spectCol$ = (this.spectCol$ + 1) % this.spectTempCtx.canvas.width;
        }
        this.raf = requestAnimationFrame(this.draw);
        return this.raf;
    }
    drawPause = () => {
        const ctx = this.ctx;
        const w = this.canvas.width;
        const h = this.canvas.height;
        ctx.fillStyle = "#00000080";
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(w * 0.38, h * 0.35, w * 0.08, h * 0.3);
        ctx.fillRect(w * 0.54, h * 0.35, w * 0.08, h * 0.3);
    };
    get size() {
        return this._size;
    }
    set size(sizeIn: number) {
        this.analyser.fftSize = sizeIn;
        this.t = new Float32Array(this.analyser.fftSize);
        this.ti = new Uint8Array(this.analyser.fftSize);
        this.f = new Float32Array(this.analyser.frequencyBinCount);
        this.btnSize.innerText = sizeIn.toString() + " samps";
        this._size = sizeIn;
    }
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
    get channel() {
        return this._channel;
    }
    set channel(channelIn) {
        if (channelIn >= this.channels) return;
        const oldCh = this._channel;
        this._channel = channelIn;
        this.btnCh.innerText = "ch " + (this._channel + 1).toString();
        if (this._channel === oldCh) return;
        this.splitter.connect(this.analyser, this._channel, 0); // Need to be done in the order, or Chrome inspect the graph and disable the analyser.
        setTimeout(() => {
            try { this.splitter.disconnect(this.analyser, oldCh, 0); } catch {} // eslint-disable-line no-empty
        }, 10);
        this._channel = channelIn;
    }
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
