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
    fft: FFT;
    drawHandler: (options: TDrawOptions) => any;
    constructor(buffers?: number, drawMode?: "offline" | "continuous" | "onevent" | "manual", drawHandler?: (options: TDrawOptions) => any) {
        this.buffers = buffers || 0;
        this.drawMode = drawMode || "manual";
        this.drawHandler = drawHandler;
        this.capturing = -1;
    }
    initCache(bufferSize: number, channels: number) {
        if (this.t && this.t.length === channels && this.t[0].length === bufferSize * this.buffers) return;
        this.t = new Array(channels).fill(null).map(() => new Float32Array(bufferSize * this.buffers));
        this.f = new Array(channels).fill(null).map(() => new Float32Array(bufferSize * this.buffers));
        this.$ = 0;
        this.e = [];
        if (this.fft) this.fft.dispose();
        this.fft = new FFT(bufferSize);
    }
    plotHandler = (plotted: Float32Array[], index: number, events?: { type: string; data: any }[]) => {
        if (!plotted.length) return;
        const channels = plotted.length;
        const bufferSize = plotted[0].length;
        this.initCache(bufferSize, channels);
        this.$ = (index % this.buffers) * bufferSize;
        this.$buffer = index;
        plotted.forEach((a, i) => {
            this.t[i].set(a, this.$);
            this.f[i].set(this.fft.forward(apply(a, blackman)).reduce((acc: number[], cur: number, idx: number) => {
                if (idx % 2 === 0) acc[idx / 2] = cur;
                else acc[(idx - 1) / 2] = (acc[(idx - 1) / 2] ** 2 + cur ** 2) ** 0.5;
                return acc;
            }, []), this.$);
        });
        this.e[index] = events || [];
        delete this.e[index - this.buffers - 1];
        if (this.drawMode === "onevent") {
            if (events && events.length && this.capturing === -1) this.capturing = this.buffers - 1;
            if (this.capturing > 0) this.capturing--;
            if (this.capturing === 0) {
                this.draw();
                this.capturing = -1;
            }
        } else if (this.drawMode === "continuous") this.draw();
        else if (this.drawMode === "manual" && index === this.buffers - 1) this.draw();
    }
    draw() {
        if (this.drawMode === "offline") return;
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
}
