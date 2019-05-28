import { FFT } from "kissfft-js";
import { blackman } from "window-function";
import apply from "window-function/apply";
import { TDrawOptions } from "./StaticScope";

export class Analyser {
    t: Float32Array[];
    f: Float32Array[];
    e: { type: string; data: any }[][];
    buffers: number;
    $buffer: number;
    $: number;
    private _drawMode: "offline" | "continuous" | "onevent" | "manual";
    capturing: number;
    private _fft: FFT;
    private _fftSize: 256 | 1024 | 4096;
    private _fftOverlap: 1 | 2 | 4 = 2;
    drawHandler: (options: TDrawOptions) => any;
    constructor(buffers?: number, drawMode?: "offline" | "continuous" | "onevent" | "manual", drawHandler?: (options: TDrawOptions) => any) {
        this.buffers = buffers || 0;
        this.drawMode = drawMode || "manual";
        this.drawHandler = drawHandler;
        this.capturing = -1;
        this.fftSize = 256;
    }
    initCache(bufferSize: number, channels: number) {
        const buffers = this.drawMode === "offline" ? 1 : this.buffers;
        if (this.t && this.t.length === channels && this.t[0].length === bufferSize * buffers) return;
        this.t = new Array(channels).fill(null).map(() => new Float32Array(bufferSize * buffers));
        this.f = new Array(channels).fill(null).map(() => new Float32Array(bufferSize * buffers));
        this.$ = 0;
        this.e = [];
    }
    plotHandler = (plotted: Float32Array[], index: number, events?: { type: string; data: any }[], drawOffline?: boolean) => {
        if (!plotted.length) return;
        if (this.drawMode === "offline" && !drawOffline) return;
        const channels = plotted.length;
        const bufferSize = plotted[0].length;
        this.initCache(bufferSize, channels);
        this.$ = (index % this.buffers) * bufferSize;
        this.$buffer = index;
        const fftHopSize = this.fftHopSize;
        const t4fft = new Float32Array(this.fftSize);
        plotted.forEach((a, i) => {
            this.t[i].set(a, this.$);
            if ((this.$ + bufferSize) % this.fftHopSize === 0) {
                if (bufferSize > this.fftSize) {
                    for (let j = 1 - this.fftOverlap; j < bufferSize / fftHopSize - (this.fftOverlap - 1); j++) {
                        if (j >= 0) t4fft.set(a.subarray(j * fftHopSize, j * fftHopSize + this.fftSize));
                        else {
                            const $split = j * fftHopSize * -1;
                            if (this.$ - $split > 0) t4fft.set(this.t[i].subarray(this.$ - $split, this.$));
                            else {
                                const $tSplit = $split - this.$;
                                t4fft.set(this.t[i].subarray(this.t[i].length - $tSplit));
                                t4fft.set(this.t[i].subarray(0, this.$), $tSplit);
                            }
                            t4fft.set(a.subarray(0, this.fftSize - $split), $split);
                        }
                        const mag = this.fft.forward(apply(t4fft, blackman)).reduce((acc: number[], cur: number, idx: number) => {
                            if (idx >= t4fft.length) return acc;
                            if (idx % 2 === 0) acc[idx / 2] = cur;
                            else acc[(idx - 1) / 2] = 10 * Math.log10((acc[(idx - 1) / 2] ** 2 + cur ** 2) ** 0.5 / this.fftSize);
                            return acc;
                        }, []);
                        this.f[i].set(mag, this.$ + (j + this.fftOverlap - 1) * fftHopSize);
                    }
                } else {
                    if (bufferSize === this.fftSize) t4fft.set(a);
                    else if (this.$ + bufferSize >= this.fftSize) t4fft.set(this.t[i].subarray(this.$ + bufferSize - this.fftSize, this.$ + bufferSize));
                    else {
                        const $split = this.fftSize - (this.$ + bufferSize);
                        t4fft.set(this.t[i].subarray(this.$ + bufferSize - this.fftSize));
                        t4fft.set(this.t[i].subarray(0, this.fftSize - $split), $split);
                    }
                    const mag = this.fft.forward(apply(t4fft, blackman)).reduce((acc: number[], cur: number, idx: number) => {
                        if (idx >= t4fft.length) return acc;
                        if (idx % 2 === 0) acc[idx / 2] = cur;
                        else acc[(idx - 1) / 2] = 10 * Math.log10((acc[(idx - 1) / 2] ** 2 + cur ** 2) ** 0.5 / this.fftSize);
                        return acc;
                    }, []);
                    this.f[i].set(mag, this.$);
                }
            }
        });
        this.e[index] = events || [];
        delete this.e[index - this.buffers - 1];
        if (this.drawMode === "onevent") {
            if (events && events.length && this.capturing === -1) this.capturing = this.buffers - 1;
            if (this.capturing >= 0) this.capturing--;
            if (this.capturing !== -1) this.draw();
        } else if (this.drawMode === "manual") {
            if (index === this.buffers - 1) this.draw();
        } else this.draw();
    }
    draw() {
        if (!this.drawHandler) return;
        if (!this.t || !this.t.length) return;
        const bufferSize = this.t[0].length / this.buffers;
        const $ = (this.$ + bufferSize) % this.t[0].length;
        const $buffer = this.$buffer + 1 - this.buffers;
        if (this.drawMode === "continuous") this.drawHandler({ $, $buffer, bufferSize, drawMode: this.drawMode, t: this.t, f: this.f, e: this.e });
        else this.drawHandler({ $, $buffer, bufferSize, drawMode: this.drawMode, t: this.t.map(a => a.slice()), f: this.f.map(a => a.slice()), e: this.e.slice() });
    }
    get drawMode() {
        return this._drawMode;
    }
    set drawMode(modeIn) {
        this._drawMode = modeIn;
        this.draw();
    }
    get fft() {
        return this._fft;
    }
    get fftSize() {
        return this._fftSize;
    }
    set fftSize(fftSizeIn) {
        this._fftSize = fftSizeIn;
        if (this.fft) this.fft.dispose();
        this._fft = new FFT(fftSizeIn);
    }
    get fftOverlap() {
        return this._fftOverlap;
    }
    get fftHopSize() {
        return this.fftSize / this.fftOverlap;
    }
}
