import { FaustScriptProcessorNode, FaustAudioWorkletNode } from "faust2webaudio";

enum TScopeType {
    Oscilloscope = 0,
    Spectroscope = 1,
    Spectrogram = 2,
    Plot = 3
}
type TOptions = {
    audioCtx: AudioContext,
    analyser: AnalyserNode,
    splitter: ChannelSplitterNode;
    channels: number;
    container: HTMLDivElement,
    type?: TScopeType
};

export class Scope {
    static sizes = [128, 512, 2048, 8192];
    raf: number;
    ctx: CanvasRenderingContext2D;
    _paused = false;
    frame = 0;
    audioCtx: AudioContext;
    analyser: AnalyserNode;
    splitter: ChannelSplitterNode;
    _channel = 0;
    channels: number;
    container: HTMLDivElement;
    canvas: HTMLCanvasElement;
    btnSwitch: HTMLButtonElement;
    btnSize: HTMLButtonElement;
    btnCh: HTMLButtonElement;
    iSwitch: HTMLElement;
    type = TScopeType.Oscilloscope;
    _size = 2048;
    t: Float32Array;
    ti: Uint8Array;
    f: Float32Array;

    static drawOscilloscope(ctx: CanvasRenderingContext2D, l: number, w: number, h: number, d: Float32Array, freq: number, sr: number) {
        this.drawBackground(ctx, w, h);
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 2;
        ctx.beginPath();
        let $zerox = 0;
        const thresh = 0.01;
        const period = sr / freq;
        const times = Math.floor(l / period) - 1;
        while (d[$zerox++] > 0 && $zerox < l);
        if ($zerox >= l - 1) {
            $zerox = 0;
        } else {
            while (d[$zerox++] < 0 + thresh && $zerox < l);
            if ($zerox >= l - 1) {
                $zerox = 0;
            }
        }
        const drawL = times > 0 && isFinite(period) ? Math.min(period * times, l - $zerox) : l - $zerox;
        for (let i = $zerox; i < $zerox + drawL; i++) {
            const x = w * (i - $zerox) / (drawL - 1);
            const y = h - (d[i] * 0.5 + 0.5) * h;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();
    }
    static drawSpectroscope(ctx: CanvasRenderingContext2D, l: number, w: number, h: number, d: Float32Array) {
        this.drawBackground(ctx, w, h);
        ctx.fillStyle = "#FFFFFF";
        for (let i = 0; i < l; i++) {
            const x = w * i / l;
            const y = ((d[i] + 10) / 100 + 1) * h;
            ctx.fillRect(x, h - y, w / l, y);
        }
    }
    static drawBackground(ctx: CanvasRenderingContext2D, w: number, h: number) {
        ctx.save();
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, w, h);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#404040";
        for (let i = 0; i < 4; i++) {
            ctx.moveTo(w * i / 4, 0);
            ctx.lineTo(w * i / 4, h);
            ctx.moveTo(0, h * i / 4);
            ctx.lineTo(w, h * i / 4);
        }
        ctx.stroke();
        ctx.restore();
    }
    static drawStats(ctx: CanvasRenderingContext2D, w: number, freq: number, samp: number, rms: number) {
        ctx.save();
        ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
        ctx.fillRect(w - 50, 0, 50, 50);
        ctx.fillStyle = "#DDDD99";
        ctx.textAlign = "right";
        ctx.font = "12px Consolas, monospace";
        ctx.fillText((samp >= 0 ? "@+" : "@") + samp.toFixed(3), w - 2, 15, 50);
        ctx.fillText("~" + freq.toFixed(0) + "Hz", w - 2, 30, 50);
        ctx.fillText("x̄:" + rms.toFixed(3), w - 2, 45, 50);
        ctx.restore();
    }

    constructor(options: TOptions) {
        Object.assign(this, options);
        this.t = new Float32Array(this.analyser.fftSize);
        this.ti = new Uint8Array(this.analyser.fftSize);
        this.f = new Float32Array(this.analyser.frequencyBinCount);
        this.getChildrens();
        this.bind();
        this.draw();
        if (!window.AudioWorklet) this.paused = true;
    }
    getChildrens() {
        let ctrl: HTMLDivElement;
        for (const e of this.container.children) {
            if (e.classList.contains("analyser-controller")) ctrl = e as HTMLDivElement;
            if (e.classList.contains("canvas-analyser")) this.canvas = e as HTMLCanvasElement;
        }
        if (!ctrl) {
            ctrl = document.createElement("div");
            ctrl.classList.add("analyser.controller");
            this.container.appendChild(ctrl);
        }
        if (!this.canvas) {
            const canvas = document.createElement("canvas");
            canvas.classList.add("canvas-analyser");
            canvas.setAttribute("data-toggle", "tooltip");
            canvas.setAttribute("data-placement", "left");
            canvas.setAttribute("title", "Input analyser");
            this.container.appendChild(canvas);
            this.canvas = canvas;
            try {
                $(canvas).tooltip({ trigger: "hover" });
            } catch (e) {}
        }
        this.ctx = this.canvas.getContext("2d");
        for (const e of ctrl.children) {
            if (e.classList.contains("analyser-btn-switch")) this.btnSwitch = e as HTMLButtonElement;
            if (e.classList.contains("analyser-btn-size")) this.btnSize = e as HTMLButtonElement;
            if (e.classList.contains("analyser-btn-ch")) this.btnCh = e as HTMLButtonElement;
        }
        if (!this.btnSwitch) {
            const btn = document.createElement("button");
            btn.className = "analyser-btn-switch btn btn-outline-light btn-sm btn-overlay btn-overlay-icon";
            btn.setAttribute("data-toggle", "tooltip");
            btn.setAttribute("data-placement", "top");
            btn.setAttribute("title", "Oscilloscope / Spectroscope / Spectrogram");
            ctrl.appendChild(btn);
            this.btnSwitch = btn;
            try {
                $(btn).tooltip({ trigger: "hover" });
            } catch (e) {}
        }
        if (!this.btnSize) {
            const btn = document.createElement("button");
            btn.className = "analyser-btn-size btn btn-outline-light btn-sm btn-overlay";
            btn.setAttribute("data-toggle", "tooltip");
            btn.setAttribute("data-placement", "top");
            btn.setAttribute("title", "Analyser Size");
            btn.innerText = this.analyser.fftSize + "samps";
            ctrl.appendChild(btn);
            this.btnSize = btn;
            try {
                $(btn).tooltip({ trigger: "hover" });
            } catch (e) {}
        }
        if (!this.btnCh) {
            const btn = document.createElement("button");
            btn.className = "analyser-btn-ch btn btn-outline-light btn-sm btn-overlay";
            btn.setAttribute("data-toggle", "tooltip");
            btn.setAttribute("data-placement", "top");
            btn.setAttribute("title", "Current Channel");
            btn.innerText = (this._channel + 1).toString() + " ch";
            ctrl.appendChild(btn);
            this.btnCh = btn;
            try {
                $(btn).tooltip({ trigger: "hover" });
            } catch (e) {}
        }
        for (const e of this.btnSwitch.children) {
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
        this.btnSwitch.addEventListener("click", (e) => {
            this.type = (this.type + 1) % 3;
            this.iSwitch.className = this.getIconClassName();
        });
        this.btnSize.addEventListener("click", (e) => {
            this.size = Scope.sizes[(Scope.sizes.indexOf(this.size) + 1) % 4];
        });
        this.btnCh.addEventListener("click", (e) => {
            this.channel = (this.channel + 1) % this.channels;
        });
        this.canvas.addEventListener("click", (e) => {
            this.paused = !this.paused;
        });
    }
    getIconClassName() {
        const prefix = "fas fa-sm ";
        if (this.type === TScopeType.Oscilloscope) return prefix + "fa-wave-square";
        if (this.type === TScopeType.Spectroscope) return prefix + "fa-chart-bar";
        if (this.type === TScopeType.Spectrogram) return prefix + "fa-water";
        if (this.type === TScopeType.Plot) return prefix + "fa-table";
        return prefix;
    }
    draw = () => {
        this.frame++; // Reduce frame rate
        if (this.frame % 2 === 0 && this.audioCtx && this.audioCtx.state === "running" && this.analyser) {
            const ctx = this.ctx;
            const sr = this.audioCtx.sampleRate;
            const w = this.container.clientWidth;
            const h = Math.min(w * 0.75, this.container.clientHeight);
            this.canvas.width = w;
            this.canvas.height = h;
            this.analyser.getFloatFrequencyData(this.f);
            if (this.analyser.getFloatTimeDomainData) {
                this.analyser.getFloatTimeDomainData(this.t);
            } else { // This is for Safari, what a shame
                this.analyser.getByteTimeDomainData(this.ti);
                this.ti.forEach((v, i) => this.t[i] = v / 128 - 1);
            }
            const freq = this.f.indexOf(Math.max(...this.f)) / this.f.length * sr / 2;
            const samp = this.t[this.t.length - 1];
            const rms = (this.t.reduce((a, v) => a += v ** 2, 0) / this.t.length) ** 0.5; // tslint:disable-line no-parameter-reassignment
            if (this.type === TScopeType.Oscilloscope) {
                const l = this.t.length;
                Scope.drawOscilloscope(ctx, l, w, h, this.t, freq, sr);
            } else if (this.type === TScopeType.Spectroscope) {
                const l = this.f.length;
                Scope.drawSpectroscope(ctx, l, w, h, this.f);
            }
            Scope.drawStats(ctx, w, freq, samp, rms);
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
    set paused(pausedIn: boolean) {
        if (pausedIn) {
            requestAnimationFrame(this.draw);
        } else {
            cancelAnimationFrame(this.raf);
            requestAnimationFrame(this.drawPause);
        }
        this._paused = pausedIn;
    }
    get channel() {
        return this._channel;
    }
    set channel(channelIn) {
        if (channelIn >= this.channels) return;
        const oldCh = this._channel;
        this._channel = channelIn;
        this.btnCh.innerText = (this._channel + 1).toString() + " ch";
        if (this._channel === oldCh) return;
        this.splitter.connect(this.analyser, this._channel, 0); // Need to be done in the order, or Chrome inspect the graph and disable the analyser.
        setTimeout(() => {
            try { this.splitter.disconnect(this.analyser, oldCh, 0); } catch {}
        }, 10);
        this._channel = channelIn;
    }
}
