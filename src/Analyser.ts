import { TDrawOptions } from "./StaticScope";

export class Analyser {
    cached: Float32Array[];
    cachedEvents: { type: string; data: any }[][];
    buffers: number;
    $: number;
    private _drawMode: "offline" | "continuous" | "onevent" | "manual";
    capturing: number;
    drawHandler: (options: TDrawOptions) => any;
    constructor(buffers?: number, drawMode?: "offline" | "continuous" | "onevent" | "manual", drawHandler?: (options: TDrawOptions) => any) {
        this.buffers = buffers || 0;
        this.drawMode = drawMode || "manual";
        this.drawHandler = drawHandler;
        this.capturing = -1;
    }
    initCache(bufferSize: number, channels: number) {
        if (this.cached && this.cached.length === channels && this.cached[0].length === bufferSize * this.buffers) return;
        this.cached = new Array(channels).fill(null).map(() => new Float32Array(bufferSize * this.buffers));
        this.$ = 0;
        this.cachedEvents = [];
    }
    plotHandler = (plotted: Float32Array[], index: number, events?: { type: string; data: any }[]) => {
        if (!plotted.length) return;
        const channels = plotted.length;
        const bufferSize = plotted[0].length;
        this.initCache(bufferSize, channels);
        this.$ = (index % this.buffers) * bufferSize;
        plotted.forEach((a, i) => this.cached[i].set(a, this.$));
        this.cachedEvents[index % this.buffers] = events || [];
        if (this.drawMode === "onevent") {
            if (events && this.capturing === -1) this.capturing = this.buffers - 1;
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
        if (!this.cached || !this.cached.length) return;
        const bufferSize = this.cached[0].length / this.buffers;
        const $ = (this.$ + bufferSize) % this.cached[0].length;
        if (this.drawMode === "continuous") this.drawHandler({ $, drawMode: this.drawMode, t: this.cached, e: this.cachedEvents });
        else this.drawHandler({ $, drawMode: this.drawMode, t: this.cached.map(a => a.slice()), e: this.cachedEvents.slice() });
    }
    get drawMode() {
        return this._drawMode;
    }
    set drawMode(modeIn) {
        this._drawMode = modeIn;
        this.draw();
    }
}
