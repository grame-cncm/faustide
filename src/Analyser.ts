import { FFTR } from "kissfft-js";
import { TDrawOptions } from "./StaticScope";
import { sliceWrap, getFrequencyDomainData, setWrap, estimateFreq } from "./utils";

export class Analyser {
    t: Float32Array[];
    f: Float32Array[];
    e: { type: string; data: any }[][];
    buffers: number;
    $buffer: number;
    $: number;
    private _drawMode: "offline" | "continuous" | "onevent" | "manual";
    capturing: number;
    private _fft: FFTR;
    private _fftSize: 256 | 1024 | 4096;
    private _fftOverlap: 1 | 2 | 4 = 2;
    drawHandler: (options: TDrawOptions) => any;
    freqEstimated: number;
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
        this.f = new Array(channels).fill(null).map(() => new Float32Array(bufferSize * buffers).fill(-Infinity));
        this.$ = 0;
        this.e = [];
    }
    plotHandler = (t: Float32Array[], index: number, events?: { type: string; data: any }[], drawOffline?: boolean) => {
        if (!t.length) return;
        if (this.drawMode === "offline" && !drawOffline) return;
        if (drawOffline) {
            this.$ = 0;
            this.e = [];
        }
        const channels = t.length;
        const bufferSize = t[0].length;
        this.initCache(bufferSize, channels);
        this.$ = (index % this.buffers) * bufferSize;
        this.$buffer = index;
        const { fftSize, fftHopSize, fft } = this;
        t.forEach((a, i) => {
            this.t[i].set(a, this.$);
            let fData: Float32Array;
            for (let $fftEnd = (this.$ + bufferSize) - (this.$ + bufferSize) % fftHopSize; $fftEnd > this.$; $fftEnd -= fftHopSize) {
                const $fft = $fftEnd - fftSize;
                const t4fft = sliceWrap(this.t[i], $fft, fftSize);
                fData = getFrequencyDomainData(t4fft, fft);
                setWrap(this.f[i], fData, $fftEnd - fftHopSize);
            }
            if (fData) {
                let sr = 48000;
                try {
                    sr = this.getSampleRate();
                    if (typeof sr !== "number") sr = 48000;
                } catch (e) {
                    sr = 48000;
                }
                this.freqEstimated = estimateFreq(fData, sr);
            }
        });
        this.e[index] = events || [];
        delete this.e[index - this.buffers - 1];
        if (this.drawMode === "onevent") {
            if (events && events.length && this.capturing === -1) this.capturing = this.buffers - 1;
            if (this.capturing >= 0) this.capturing--;
            if (this.capturing !== -1 || (events && events.length)) this.draw();
        } else if (this.drawMode === "manual") {
            if (index === this.buffers - 1) this.draw();
        } else this.draw();
    }
    draw() {
        const { t, f, e, drawHandler, drawMode, fftSize, freqEstimated } = this;
        if (!drawHandler) return;
        if (!t || !t.length) return;
        if (drawMode === "offline") {
            drawHandler({ $: 0, $buffer: 0, bufferSize: t[0].length, drawMode, fftSize, freqEstimated, t, f, e });
            return;
        }
        const bufferSize = this.t[0].length / this.buffers;
        const $ = (this.$ + bufferSize) % this.t[0].length;
        const $buffer = this.$buffer + 1 - this.buffers;
        if (this.drawMode === "continuous" || this.capturing > 0) this.drawHandler({ $, $buffer, bufferSize, drawMode, fftSize, freqEstimated, t, f, e });
        else this.drawHandler({ $, $buffer, bufferSize, drawMode, fftSize, freqEstimated, t: this.t.map(a => a.slice()), f: this.f.map(a => a.slice()), e: this.e.slice() });
    }
    getSampleRate = () => 48000;
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
        this._fft = new FFTR(fftSizeIn);
    }
    get fftOverlap() {
        return this._fftOverlap;
    }
    get fftHopSize() {
        return this.fftSize / this.fftOverlap;
    }
}
