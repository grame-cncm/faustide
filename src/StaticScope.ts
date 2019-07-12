import { wrap, indexToFreq } from "./utils";
import "./StaticScope.scss";

enum EScopeMode {
    Data = 0,
    Interleaved = 1,
    Oscilloscope = 2,
    Spectroscope = 3,
    Spectrogram = 4
}
type TOptions = {
    container: HTMLDivElement;
    type?: EScopeMode;
};
type TStatsToDraw = {
    x?: number;
    y?: number;
    xLabel?: string;
    yLabel?: string;
    values: number[];
};
export type TDrawOptions = {
    drawMode: "offline" | "continuous" | "onevent" | "manual";
    $: number; // start sample index
    $buffer: number; // start buffer index
    t?: Float32Array[]; // Time domain data
    f?: Float32Array[]; // Freq domain data
    e?: { type: string; data: any }[][]; // events of each buffer
    bufferSize: number;
    fftSize: number;
    fftOverlap: 1 | 2 | 4 | 8;
    freqEstimated?: number;
    sampleRate?: number;
}

export class StaticScope {
    raf: number;
    ctx: CanvasRenderingContext2D;
    container: HTMLDivElement;
    canvas: HTMLCanvasElement;
    btnSwitch: HTMLButtonElement;
    btnZoomOut: HTMLButtonElement;
    btnZoom: HTMLButtonElement;
    btnZoomIn: HTMLButtonElement;
    iSwitch: HTMLElement;
    spanSwitch: HTMLSpanElement;
    divData: HTMLDivElement;
    divDefault: HTMLDivElement;
    private _mode = EScopeMode.Oscilloscope;
    private _zoom = { oscilloscope: 1, spectroscope: 1, spectrogram: 1 };
    private _vzoom = { oscilloscope: 1, spectroscope: 1, spectrogram: 1 };
    private _zoomOffset = { oscilloscope: 0, spectroscope: 0, spectrogram: 0 };
    data: TDrawOptions = { drawMode: "manual", t: undefined, $: 0, $buffer: 0, bufferSize: 128, fftSize: 256, fftOverlap: 2 };
    cursor: { x: number; y: number };
    dragging: boolean = false;
    spectTempCtx: CanvasRenderingContext2D;
    lastSpect$: number = 0;
    drawSpectrogram: boolean = false;

    handleMouseMove = (e: MouseEvent | TouchEvent) => {
        if (!this.data || !this.data.t || !this.data.t.length || !this.data.t[0].length) return;
        if (this.mode === EScopeMode.Data) return;
        const w = this.container.clientWidth;
        const h = this.container.clientHeight;
        const rect = this.canvas.getBoundingClientRect();
        let x = e instanceof MouseEvent ? e.offsetX : e.touches[0].pageX - rect.left;
        x = Math.max(0, Math.min(w, x));
        let y = e instanceof MouseEvent ? e.offsetY : e.touches[0].pageY - rect.top;
        y = Math.max(0, Math.min(h, y));
        this.cursor = { x, y };
        // if (this.data.drawMode === "continuous") return;
        this.draw();
    }
    handleMouseDown = (eDown: MouseEvent | TouchEvent) => {
        if (!this.data || !this.data.t || !this.data.t.length || !this.data.t[0].length) return;
        if (this.mode === EScopeMode.Data) return;
        eDown.preventDefault();
        eDown.stopPropagation();
        this.dragging = true;
        this.canvas.style.cursor = "grab";
        const origZoom = this.zoom;
        const origOffset = this.zoomOffset;
        let prevX = eDown instanceof MouseEvent ? eDown.pageX : eDown.touches[0].pageX;
        let prevY = eDown instanceof MouseEvent ? eDown.pageY : eDown.touches[0].pageY;
        const handleMouseMove = (eMove: MouseEvent | TouchEvent) => {
            const x = eMove instanceof MouseEvent ? eMove.pageX : eMove.touches[0].pageX;
            const y = eMove instanceof MouseEvent ? eMove.pageY : eMove.touches[0].pageY;
            const dX = x - prevX;
            const dY = y - prevY;
            prevX = x;
            prevY = y;
            const multiplier = 1 / 1.015 ** dY;
            const offset = -dX / this.zoom / this.canvas.width;
            if (multiplier !== 1) this.zoom *= multiplier;
            if (offset !== 0) this.zoomOffset += offset;
            if (this.zoom !== origZoom || this.zoomOffset !== origOffset) this.draw();
        };
        const handleMouseUp = () => {
            this.dragging = false;
            this.canvas.style.cursor = "";
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("touchmove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
            document.removeEventListener("touchend", handleMouseUp);
        };
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("touchmove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
        document.addEventListener("touchend", handleMouseUp);
    }
    handleMouseLeave = () => {
        if (!this.data || !this.data.t || !this.data.t.length || !this.data.t[0].length) return;
        if (this.mode === EScopeMode.Data) return;
        this.cursor = undefined;
        this.draw();
    }
    static drawInterleaved(ctx: CanvasRenderingContext2D, w: number, h: number, d: TDrawOptions, zoom: number, zoomOffset: number, vzoom: number, cursor?: { x: number; y: number }) {
        this.drawBackground(ctx, w, h);
        if (!d) return;
        const { $, t, freqEstimated, sampleRate, drawMode } = d;
        if (!t || !t.length || !t[0].length) return;
        const l = t[0].length;
        // Fastest way to get highest abs value in buffer
        let yFactor = 1;
        let i = t.length;
        while (i--) {
            let j = l;
            while (j--) {
                const abs = Math.abs(t[i][j]);
                if (abs > yFactor) yFactor = abs;
            }
        }
        yFactor *= vzoom;
        let $0 = 0; // Draw start
        let $1 = l - 1; // Draw End
        let $zerox = 0;
        if (drawMode === "continuous") { // Stablize
            const thresh = 0.001;
            const period = sampleRate / freqEstimated;
            const times = Math.floor(l / period) - 1;
            while (t[0][wrap($zerox++, $, l)] > thresh && $zerox < l);
            if ($zerox >= l - 1) {
                $zerox = 0;
            } else {
                while (t[0][wrap($zerox++, $, l)] < thresh && $zerox < l);
                if ($zerox >= l - 1) {
                    $zerox = 0;
                }
            }
            const drawL = times > 0 && isFinite(period) ? Math.min(period * times, l - $zerox) : l - $zerox;
            $0 = Math.round($zerox + drawL * zoomOffset);
            $1 = Math.round($zerox + drawL / zoom + drawL * zoomOffset);
        } else {
            $0 = Math.round(l * zoomOffset);
            $1 = Math.round(l / zoom + l * zoomOffset);
        }
        const left = 50;
        const bottom = 20;
        const hCh = (h - bottom) / t.length; // Height per channel
        const eventsToDraw = this.drawGrid(ctx, w, h, $0 - $zerox, $1 - $zerox, yFactor, d, EScopeMode.Interleaved);
        const gridX = (w - left) / ($1 - $0 - 1);
        const step = Math.max(1, Math.round(1 / gridX)); // horizontal draw step for optimization
        ctx.lineWidth = 2;
        for (let i = 0; i < t.length; i++) {
            ctx.beginPath();
            ctx.strokeStyle = `hsl(${i * 60}, 100%, 85%)`;
            let maxInStep;
            let minInstep;
            for (let j = $0; j < $1; j++) {
                const $j = wrap(j, $, l); // True index
                const samp = t[i][$j];
                const $step = (j - $0) % step;
                if ($step === 0) {
                    maxInStep = samp;
                    minInstep = samp;
                }
                if ($step !== step - 1) {
                    if ($step !== 0) {
                        if (samp > maxInStep) maxInStep = samp;
                        if (samp < minInstep) minInstep = samp;
                    }
                    continue;
                }
                const x = (j - $0) * gridX + left;
                let y = hCh * (i + 0.5 - maxInStep / yFactor * 0.5);
                if (j === $0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
                if (minInstep !== maxInStep) {
                    y = hCh * (i + 0.5 - minInstep / yFactor * 0.5);
                    ctx.lineTo(x, y);
                }
            }
            ctx.stroke();
        }
        eventsToDraw.forEach(params => this.drawEvent(...params));
        if (cursor && cursor.x > left && cursor.y < h - bottom) {
            const statsToDraw: TStatsToDraw = { values: [] };
            const $cursor = Math.round($0 + (cursor.x - left) / gridX);
            statsToDraw.values = [];
            statsToDraw.x = ($cursor - $0) * gridX + left;
            statsToDraw.xLabel = ($cursor - $zerox).toFixed(0);
            const $j = wrap($cursor, $, l);
            for (let i = 0; i < t.length; i++) {
                const samp = t[i][$j];
                if (typeof samp === "number") statsToDraw.values.push(samp);
            }
            this.drawStats(ctx, w, h, statsToDraw);
        }
    }
    static drawOscilloscope(ctx: CanvasRenderingContext2D, w: number, h: number, d: TDrawOptions, zoom: number, zoomOffset: number, vzoom: number, cursor?: { x: number; y: number }) {
        this.drawBackground(ctx, w, h);
        if (!d) return;
        const { $, t, freqEstimated, sampleRate, drawMode } = d;
        if (!t || !t.length || !t[0].length) return;
        const l = t[0].length;
        // Fastest way to get highest abs value in buffer
        let yFactor = 1;
        let i = t.length;
        while (i--) {
            let j = l;
            while (j--) {
                const abs = Math.abs(t[i][j]);
                if (abs > yFactor) yFactor = abs;
            }
        }
        yFactor *= vzoom;
        let $0 = 0; // Draw start
        let $1 = l - 1; // Draw End
        let $zerox = 0;
        if (drawMode === "continuous") { // Stablize
            const thresh = 0.001;
            const period = sampleRate / freqEstimated;
            const times = Math.floor(l / period) - 1;
            while (t[0][wrap($zerox++, $, l)] > thresh && $zerox < l); // Find first raise
            if ($zerox >= l - 1) { // Found nothing, no stablization
                $zerox = 0;
            } else {
                while (t[0][wrap($zerox++, $, l)] < thresh && $zerox < l); // Find first drop
                if ($zerox >= l - 1) {
                    $zerox = 0;
                }
            }
            const drawL = times > 0 && isFinite(period) ? Math.min(period * times, l - $zerox) : l - $zerox; // length to draw
            $0 = Math.round($zerox + drawL * zoomOffset);
            $1 = Math.round($zerox + drawL / zoom + drawL * zoomOffset);
        } else {
            $0 = Math.round(l * zoomOffset);
            $1 = Math.round(l / zoom + l * zoomOffset);
        }
        const left = 50;
        const bottom = 20;
        const eventsToDraw = this.drawGrid(ctx, w, h, $0 - $zerox, $1 - $zerox, yFactor, d, EScopeMode.Oscilloscope);
        const gridX = (w - left) / ($1 - $0 - 1);
        const step = Math.max(1, Math.round(1 / gridX));
        ctx.lineWidth = 2;
        for (let i = 0; i < t.length; i++) {
            ctx.beginPath();
            ctx.strokeStyle = t.length === 1 ? "white" : `hsl(${i * 60}, 100%, 85%)`;
            let maxInStep;
            let minInStep;
            for (let j = $0; j < $1; j++) {
                const $j = wrap(j, $, l);
                const samp = t[i][$j];
                const $step = (j - $0) % step;
                if ($step === 0) {
                    maxInStep = samp;
                    minInStep = samp;
                }
                if ($step !== step - 1) {
                    if ($step !== 0) {
                        if (samp > maxInStep) maxInStep = samp;
                        if (samp < minInStep) minInStep = samp;
                    }
                    continue;
                }
                const x = (j - $0) * gridX + left;
                let y = (h - bottom) * (0.5 - maxInStep / yFactor * 0.5);
                if (j === $0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
                if (minInStep !== maxInStep) {
                    y = (h - bottom) * (0.5 - minInStep / yFactor * 0.5);
                    ctx.lineTo(x, y);
                }
            }
            ctx.stroke();
        }
        eventsToDraw.forEach(params => this.drawEvent(...params));
        if (cursor && cursor.x > left && cursor.y < h - bottom) {
            const statsToDraw: TStatsToDraw = { values: [] };
            const $cursor = Math.round($0 + (cursor.x - left) / gridX);
            statsToDraw.values = [];
            statsToDraw.x = ($cursor - $0) * gridX + left;
            statsToDraw.xLabel = ($cursor - $zerox).toFixed(0);
            const $j = wrap($cursor, $, l);
            for (let i = 0; i < t.length; i++) {
                const samp = t[i][$j];
                if (typeof samp === "number") statsToDraw.values.push(samp);
            }
            this.drawStats(ctx, w, h, statsToDraw);
        }
    }
    static drawSpectroscope(ctx: CanvasRenderingContext2D, w: number, h: number, d: TDrawOptions, zoom: number, zoomOffset: number, cursor?: { x: number; y: number }) {
        this.drawBackground(ctx, w, h);
        if (!d) return;
        const { $, f, fftSize, fftOverlap } = d;
        if (!f || !f.length || !f[0].length) return;
        const fftBins = fftSize / 2;
        let $f = $ * fftOverlap / 2;
        $f -= $f % fftBins;
        const l = f[0].length;
        const $0 = l - fftBins + Math.round(fftBins * zoomOffset);
        const $1 = l - fftBins + Math.round(fftBins / zoom + fftBins * zoomOffset);
        const left = 50;
        const bottom = 20;
        const hCh = (h - bottom) / f.length;
        const eventsToDraw = this.drawGrid(ctx, w, h, $0, $1, 1, d, EScopeMode.Spectroscope);
        const gridX = (w - left) / ($1 - $0 - 1);
        const step = Math.max(1, Math.round(1 / gridX));
        for (let i = 0; i < f.length; i++) {
            ctx.beginPath();
            ctx.fillStyle = f.length === 1 ? "white" : `hsl(${i * 60}, 100%, 85%)`;
            let maxInStep;
            for (let j = $0; j < $1; j++) {
                const $j = wrap(j, $f, l);
                const samp = f[i][$j];
                const $step = (j - $0) % step;
                if ($step === 0) maxInStep = samp;
                if ($step !== step - 1) {
                    if ($step !== 0 && samp > maxInStep) maxInStep = samp;
                    continue;
                }
                const x = (j - $0) * gridX + left;
                const y = hCh * (i + 1 - Math.min(1, Math.max(0, maxInStep / 100 + 1)));
                if (j === $0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.lineTo(w, hCh * (i + 1));
            ctx.lineTo(left, hCh * (i + 1));
            ctx.closePath();
            ctx.fill();
        }
        eventsToDraw.forEach(params => this.drawEvent(...params));
        if (cursor && cursor.x > left && cursor.y < h - bottom) {
            const statsToDraw: TStatsToDraw = { values: [] };
            const $cursor = $0 + Math.round((cursor.x - left) / gridX);
            statsToDraw.values = [];
            statsToDraw.x = ($cursor - $0) * gridX + left;
            statsToDraw.xLabel = indexToFreq($cursor, fftBins, d.sampleRate).toFixed(0);
            const $j = wrap($cursor, $f, l);
            for (let i = 0; i < f.length; i++) {
                const samp = f[i][$j];
                if (typeof samp === "number") statsToDraw.values.push(samp);
            }
            this.drawStats(ctx, w, h, statsToDraw);
        }
    }
    static drawSpectrogram(ctx: CanvasRenderingContext2D, tempCtx: CanvasRenderingContext2D, w: number, h: number, d: TDrawOptions, zoom: number, zoomOffset: number, cursor?: { x: number; y: number }) {
        this.drawBackground(ctx, w, h);
        if (!d) return;
        const { $, f, fftSize, fftOverlap } = d;
        if (!f || !f.length || !f[0].length) return;
        const fftBins = fftSize / 2;
        let $f = $ * fftOverlap / 2;
        $f -= $f % fftBins;
        const l = f[0].length / fftBins;
        const $0fft = Math.floor(l * zoomOffset);
        const $1fft = Math.ceil(l / zoom + l * zoomOffset);
        const $0 = $0fft * fftBins;
        const $1 = $1fft * fftBins;
        const eventsToDraw = this.drawGrid(ctx, w, h, $0, $1, 1, d, EScopeMode.Spectrogram);
        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        ctx.imageSmoothingEnabled = false;
        const left = 50;
        const bottom = 20;
        const $0src = wrap($0fft, $f / fftBins, l);
        const $1src = $0src + $1fft - $0fft;
        if ($1src > l) {
            const split$ = l - $0src;
            ctx.drawImage(tempCtx.canvas, $0src, 0, split$, tempCtx.canvas.height, left, 0, split$ / ($1src - $0src) * (w - left), h - bottom);
            ctx.drawImage(tempCtx.canvas, 0, 0, $1src - l - 0.01, tempCtx.canvas.height, split$ / ($1src - $0src) * (w - left) + left, 0, (1 - split$ / ($1src - $0src)) * (w - left), h - bottom);
        } else {
            ctx.drawImage(tempCtx.canvas, $0src, 0, $1src - $0src, tempCtx.canvas.height, left, 0, w - left, h - bottom);
        }
        ctx.restore();
        eventsToDraw.forEach(params => this.drawEvent(...params));
        if (cursor && cursor.x > left && cursor.y < h - bottom) {
            const statsToDraw: TStatsToDraw = { values: [] };
            const gridX = (w - left) / ($1fft - $0fft);
            const gridY = (h - bottom) / f.length / fftBins;
            const $fft = $0fft + Math.floor((cursor.x - left) / gridX);
            const $ch = Math.floor(cursor.y / gridY / fftBins);
            const $bin = Math.floor((h - bottom - cursor.y) / gridY) % fftBins;
            const $cursor = $fft * fftBins + $bin;
            const $j = wrap($cursor, $f, f[0].length);
            const freq = ($j % fftBins) / fftBins * d.sampleRate / 2;
            const samp = f[$ch][$j];
            if (typeof samp === "number") statsToDraw.values = [samp];
            statsToDraw.x = ($fft - $0fft + 0.5) * gridX + left;
            statsToDraw.y = (($ch + 1) * fftBins - $bin) * gridY;
            statsToDraw.xLabel = $fft.toFixed(0);
            statsToDraw.yLabel = freq.toFixed(0);
            this.drawStats(ctx, w, h, statsToDraw);
        }
    }
    static drawOfflineSpectrogram(ctx: CanvasRenderingContext2D, d: TDrawOptions, last$: number) {
        if (!d) return last$;
        const { $, f, fftSize, fftOverlap } = d;
        if (!f || !f.length || !f[0].length) return last$;
        const fftBins = fftSize / 2;
        let $f = $ * fftOverlap / 2;
        $f -= $f % fftBins;
        const { width: canvasWidth, height: h } = ctx.canvas;
        const l = f[0].length;
        const $0 = wrap(last$, 0, l);
        const $1 = $0 >= $f ? $f + l : $f;
        if ($1 - $0 < 0) return last$;
        const $0fft = Math.floor($0 / fftBins);
        const $1fft = Math.ceil($1 / fftBins);
        const hCh = h / f.length;
        const w = l / fftBins;
        const $h = hCh / fftBins;
        if (canvasWidth !== w) ctx.canvas.width = w;
        const step = Math.max(1, Math.round(fftBins / hCh));
        for (let i = 0; i < f.length; i++) {
            for (let j = $0fft; j < $1fft; j++) {
                let maxInStep;
                ctx.fillStyle = "black";
                ctx.fillRect(j % w, i * hCh, 1, hCh);
                for (let k = 0; k < fftBins; k++) {
                    const samp = f[i][wrap(k, j * fftBins, l)];
                    const $step = k % step;
                    if ($step === 0) maxInStep = samp;
                    if ($step !== step - 1) {
                        if ($step !== 0 && samp > maxInStep) maxInStep = samp;
                        continue;
                    }
                    const normalized = Math.min(1, Math.max(0, (maxInStep + 10) / 100 + 1));
                    if (normalized === 0) continue;
                    const hue = (normalized * 180 + 240) % 360;
                    const lum = normalized * 50;
                    ctx.fillStyle = `hsl(${hue}, 100%, ${lum}%)`;
                    ctx.fillRect(j % w, (fftBins - k - 1) * $h + i * hCh, 1, Math.max(1, $h));
                }
            }
        }
        return wrap($1, 0, l);
    }
    static drawBackground(ctx: CanvasRenderingContext2D, w: number, h: number) {
        ctx.save();
        ctx.fillStyle = "#181818";
        ctx.fillRect(0, 0, w, h);
        ctx.restore();
    }
    static drawGrid(ctx: CanvasRenderingContext2D, w: number, h: number, $0: number, $1: number, yFactor: number, d: TDrawOptions, mode: EScopeMode) {
        ctx.save();
        ctx.setLineDash([]);
        ctx.lineWidth = 1;
        const { t, e, bufferSize, fftSize, fftOverlap, sampleRate } = d;
        const inFreqDomain = mode === EScopeMode.Spectrogram || mode === EScopeMode.Spectroscope;
        const fftBins = fftSize / 2;
        const channels = mode === EScopeMode.Oscilloscope ? 1 : t.length;
        const unit = mode === EScopeMode.Spectrogram ? "Hz/frame" : mode === EScopeMode.Spectroscope ? "dB/Hz" : "lvl/samp";
        const eventsToDraw: [CanvasRenderingContext2D, number, number, number, { type: string; data: any }[]][] = [];
        let $0buffer = $0 / bufferSize / (inFreqDomain ? fftOverlap / 2 : 1);
        let $1buffer = $1 / bufferSize / (inFreqDomain ? fftOverlap / 2 : 1);
        const hStep = 2 ** Math.ceil(Math.log2($1buffer - $0buffer)) / 8;
        $0buffer -= $0buffer % hStep;
        $1buffer -= $0buffer % hStep;
        let $buffer = d.$buffer || 0;
        if (inFreqDomain) $buffer -= $buffer % (fftBins / bufferSize / fftOverlap / 2);
        const left = 50;
        const bottom = 20;
        const eventStrokeStyle = "#ff8800";
        const bufferStrokeStyle = "#004000";
        const normalStrokeStyle = "#404040";
        ctx.fillStyle = "#DDDD99";
        ctx.font = "10px Consolas, monospace";
        ctx.textAlign = "right";
        ctx.textBaseline = "middle";
        ctx.fillText(unit, 45, h - 10, 40);
        ctx.textAlign = "center";
        ctx.strokeStyle = "white";
        ctx.beginPath();
        ctx.moveTo(left, 0);
        ctx.lineTo(left, h - bottom);
        ctx.lineTo(w, h - bottom);
        ctx.stroke();
        ctx.strokeStyle = bufferStrokeStyle;
        for (let j = $0buffer; j < $1buffer; j += hStep) {
            const $fft = j / (fftBins / bufferSize) * fftOverlap / 2;
            const x = (j * bufferSize * (inFreqDomain ? fftOverlap / 2 : 1) - $0) / ($1 - $0 - 1) * (w - left) + left;
            if (x < left) continue;
            ctx.strokeStyle = j % 1 === 0 ? bufferStrokeStyle : normalStrokeStyle;
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, h - bottom);
            ctx.stroke();
            if (mode === EScopeMode.Spectrogram) {
                if ($fft % 1 === 0) ctx.fillText($fft.toFixed(), Math.min(x, w - 20), h - 10);
            } else if (mode === EScopeMode.Spectroscope) {
                ctx.fillText((($fft % 1) * sampleRate / 2).toFixed(), Math.min(x, w - 20), h - 10);
            } else {
                ctx.fillText((j * bufferSize).toFixed(), Math.min(x, w - 20), h - 10);
            }
        }
        if (e) {
            for (let j = Math.ceil($0buffer); j < $1buffer; j++) {
                if (e[$buffer + j] && e[$buffer + j].length) {
                    const x = (j * bufferSize * (inFreqDomain ? fftOverlap / 2 : 1) - $0) / ($1 - $0 - 1) * (w - left) + left;
                    ctx.strokeStyle = eventStrokeStyle;
                    eventsToDraw.push([ctx, w, h, x, e[$buffer + j]]);
                    ctx.beginPath();
                    ctx.moveTo(x, 0);
                    ctx.lineTo(x, h - bottom);
                    ctx.stroke();
                }
            }
        }
        ctx.strokeStyle = normalStrokeStyle;
        const hCh = (h - bottom) / channels;
        let vStep = 0.25;
        while (yFactor / vStep > 2) vStep *= 2; // Maximum horizontal grids in channel one side = 2
        ctx.beginPath();
        ctx.textAlign = "right";
        const drawHLine = (y: number, yLabel: string) => {
            ctx.moveTo(left, y);
            ctx.lineTo(w, y);
            ctx.fillText(yLabel, 45, Math.max(y, 10));
        };
        for (let i = 0; i < channels; i++) {
            let y = (i + 0.5) * hCh;
            let $ = 0.5;
            const getYLabel = () => (mode === EScopeMode.Spectrogram ? indexToFreq(fftBins * $, fftBins, sampleRate).toFixed(0) : mode === EScopeMode.Spectroscope ? (-100 + 100 * $).toFixed(0) : (-yFactor + 2 * yFactor * $).toFixed(2));
            let yLabel = getYLabel();
            drawHLine(y, yLabel);
            for (let j = vStep; j < yFactor; j += vStep) {
                $ = 0.5 - j / yFactor / 2;
                y = (i + 0.5 + j / yFactor / 2) * hCh;
                yLabel = getYLabel();
                drawHLine(y, yLabel);
                $ = 0.5 + j / yFactor / 2;
                y = (i + 0.5 - j / yFactor / 2) * hCh;
                yLabel = getYLabel();
                drawHLine(y, yLabel);
            }
        }
        ctx.stroke();
        ctx.beginPath();
        ctx.setLineDash([4, 2]);
        ctx.strokeStyle = "white";
        for (let i = 1; i < channels; i++) {
            ctx.moveTo(0, i * hCh);
            ctx.lineTo(w, i * hCh);
        }
        ctx.stroke();
        ctx.restore();
        return eventsToDraw;
    }
    static drawEvent(ctx: CanvasRenderingContext2D, w: number, h: number, x: number, e: { type: string; data: any }[]) {
        ctx.save();
        ctx.font = "bold 12px Consolas, monospace";
        ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
        const eStrings = e.map(event => (event.data.path ? `${event.data.path}: ${event.data.value}` : `${event.type}: ${event.data.join(",")}`));
        const textWidth = Math.max(...eStrings.map(s => ctx.measureText(s).width)) + 5;
        if (w - x >= textWidth) {
            ctx.fillRect(x, 0, textWidth, e.length * 15 + 2);
            ctx.textAlign = "left";
        } else {
            ctx.fillRect(x - textWidth, 0, textWidth, e.length * 15 + 2);
            ctx.textAlign = "right";
        }
        ctx.fillStyle = "#DDDD99";
        eStrings.forEach((s, i) => ctx.fillText(s, x, (i + 1) * 15, textWidth));
        ctx.restore();
    }
    static drawStats(ctx: CanvasRenderingContext2D, w: number, h: number, statsToDraw: { x?: number; y?: number; xLabel?: string; yLabel?: string; values: number[] }) {
        const left = 50;
        const bottom = 20;
        ctx.save();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#b0b0b0";
        ctx.beginPath();
        const { x, y, xLabel, yLabel, values } = statsToDraw;
        if (x) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, h - bottom);
        }
        if (y) {
            ctx.moveTo(left, y);
            ctx.lineTo(w, y);
        }
        ctx.stroke();
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        if (xLabel) ctx.fillRect(Math.min(x - 20, w - 40), h - 18, 40, 16);
        if (yLabel) ctx.fillRect(5, Math.max(0, y - 8), 45, 16);
        ctx.fillStyle = "#DDDD99";
        ctx.font = "bold 12px Consolas, monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        if (xLabel) ctx.fillText(xLabel, Math.min(x, w - 20), h - 10, 40);
        ctx.textAlign = "right";
        if (yLabel) ctx.fillText(yLabel, 40, Math.max(10, y), 40);
        ctx.textBaseline = "bottom";
        const right: string[] = [];
        values.forEach(v => right.push(v.toFixed(3)));
        ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
        ctx.fillRect(w - 50, 0, 60, right.length * 15 + 5);
        ctx.fillStyle = "#DDDD99";
        right.forEach((s, i) => ctx.fillText(s, w - 2, (i + 1) * 15, 50));
        ctx.restore();
    }
    static fillDivData(container: HTMLDivElement, d: TDrawOptions) {
        container.innerHTML = "";
        if (!d) return;
        const { $, t, e } = d;
        if (!t || !t.length || !t[0].length) return;
        const l = t[0].length;
        for (let i = 0; i < t.length; i++) {
            const ch = t[i];
            const divCh = document.createElement("div");
            divCh.classList.add("static-scope-channel");
            divCh.style.backgroundColor = t.length === 1 ? "#181818" : `hsl(${i * 60}, 100%, 10%)`;
            for (let j = 0; j < Math.min(ch.length, 2048); j++) {
                const $j = wrap(j, $, l);
                const divCell = document.createElement("div");
                divCell.classList.add("static-scope-cell");
                const $buffer = (d.$buffer || 0) + Math.floor(j / d.bufferSize);
                if (e && e[$buffer] && e[$buffer].length && j % d.bufferSize === 0) divCell.classList.add("highlight");
                const spanIndex = document.createElement("span");
                spanIndex.innerText = j.toString();
                const spanSamp = document.createElement("span");
                spanSamp.innerText = ch[$j].toFixed(3);
                divCell.appendChild(spanIndex);
                divCell.appendChild(spanSamp);
                divCh.appendChild(divCell);
            }
            if (ch.length > 2048) {
                const divCell = document.createElement("div");
                divCell.classList.add("static-scope-cell");
                const spanIndex = document.createElement("span");
                spanIndex.innerText = "...";
                const spanSamp = document.createElement("span");
                spanSamp.innerText = "...";
                divCell.appendChild(spanIndex);
                divCell.appendChild(spanSamp);
                divCh.appendChild(divCell);
            }
            container.appendChild(divCh);
        }
    }
    static getIconClassName(typeIn: EScopeMode) {
        const prefix = "fas fa-sm ";
        if (typeIn === EScopeMode.Data) return prefix + "fa-table";
        if (typeIn === EScopeMode.Interleaved) return prefix + "fa-water";
        if (typeIn === EScopeMode.Oscilloscope) return prefix + "fa-wave-square";
        if (typeIn === EScopeMode.Spectroscope) return prefix + "fa-chart-bar";
        if (typeIn === EScopeMode.Spectrogram) return prefix + "fa-align-justify";
        return prefix;
    }
    static getModeName(typeIn: EScopeMode) {
        if (typeIn === EScopeMode.Data) return "Data";
        if (typeIn === EScopeMode.Interleaved) return "Interleaved";
        if (typeIn === EScopeMode.Oscilloscope) return "Oscilloscope";
        if (typeIn === EScopeMode.Spectroscope) return "Spectroscope";
        if (typeIn === EScopeMode.Spectrogram) return "Spectrogram";
        return "";
    }

    constructor(options: TOptions) {
        Object.assign(this, options);
        this.getChildren();
        this.bind();
        this.mode = EScopeMode.Oscilloscope;
    }
    getChildren() {
        this.spectTempCtx = document.createElement("canvas").getContext("2d");
        this.spectTempCtx.canvas.height = 1024;
        let ctrl: HTMLDivElement;
        for (let i = 0; i < this.container.children.length; i++) {
            const e = this.container.children[i];
            if (e.classList.contains("static-scope-ui-controller")) ctrl = e as HTMLDivElement;
            if (e.classList.contains("static-scope-canvas")) this.canvas = e as HTMLCanvasElement;
            if (e.classList.contains("static-scope-data")) this.divData = e as HTMLDivElement;
            if (e.classList.contains("static-scope-default")) this.divDefault = e as HTMLDivElement;
        }
        if (!ctrl) {
            ctrl = document.createElement("div");
            ctrl.classList.add("static-scope-ui-controller");
            this.container.appendChild(ctrl);
        }
        if (!this.canvas) {
            const canvas = document.createElement("canvas");
            canvas.classList.add("static-scope-canvas");
            this.container.appendChild(canvas);
            this.canvas = canvas;
        }
        if (!this.divData) {
            const divData = document.createElement("div");
            divData.classList.add("static-scope-data");
            this.container.appendChild(divData);
            this.divData = divData;
        }
        if (!this.divDefault) {
            const divDefault = document.createElement("div");
            divDefault.classList.add("static-scope-default", "alert", "alert-info");
            divDefault.setAttribute("role", "alert");
            divDefault.innerHTML = "<h5>No Data</h5>";
            this.container.appendChild(divDefault);
            this.divDefault = divDefault;
        }
        this.ctx = this.canvas.getContext("2d");
        for (let i = 0; i < ctrl.children.length; i++) {
            const e = ctrl.children[i];
            if (e.classList.contains("static-scope-ui-switch")) this.btnSwitch = e as HTMLButtonElement;
            if (e.classList.contains("static-scope-ui-zoomout")) this.btnZoomOut = e as HTMLButtonElement;
            if (e.classList.contains("static-scope-ui-zoom")) this.btnZoom = e as HTMLButtonElement;
            if (e.classList.contains("static-scope-ui-zoomin")) this.btnZoomIn = e as HTMLButtonElement;
        }
        if (!this.btnSwitch) {
            const btn = document.createElement("button");
            btn.className = "static-scope-ui-switch btn btn-outline-light btn-sm btn-overlay btn-overlay-icon";
            btn.setAttribute("data-toggle", "tooltip");
            btn.setAttribute("data-placement", "top");
            btn.setAttribute("title", "Interleaved Scope / Stacked Scope / Data");
            ctrl.appendChild(btn);
            try {
                $(btn).tooltip({ trigger: "hover", boundary: "viewport" });
            } catch (e) {} // eslint-disable-line no-empty
            this.btnSwitch = btn;
        }
        if (!this.btnZoomOut) {
            const btn = document.createElement("button");
            btn.className = "static-scope-ui-zoomout btn btn-outline-light btn-sm btn-overlay btn-overlay-icon";
            btn.setAttribute("data-toggle", "tooltip");
            btn.setAttribute("data-placement", "top");
            btn.setAttribute("title", "Zoom Out");
            btn.innerHTML = '<i class="fas fa-minus"></i>';
            ctrl.appendChild(btn);
            try {
                $(btn).tooltip({ trigger: "hover", boundary: "viewport" });
            } catch (e) {} // eslint-disable-line no-empty
            this.btnZoomOut = btn;
        }
        if (!this.btnZoom) {
            const btn = document.createElement("button");
            btn.className = "static-scope-ui-zoom btn btn-outline-light btn-sm btn-overlay";
            btn.setAttribute("data-toggle", "tooltip");
            btn.setAttribute("data-placement", "top");
            btn.setAttribute("title", "Reset Zoom");
            btn.innerText = "1.0x";
            ctrl.appendChild(btn);
            try {
                $(btn).tooltip({ trigger: "hover", boundary: "viewport" });
            } catch (e) {} // eslint-disable-line no-empty
            this.btnZoom = btn;
        }
        if (!this.btnZoomIn) {
            const btn = document.createElement("button");
            btn.className = "static-scope-ui-zoomin btn btn-outline-light btn-sm btn-overlay btn-overlay-icon";
            btn.setAttribute("data-toggle", "tooltip");
            btn.setAttribute("data-placement", "top");
            btn.setAttribute("title", "Zoom In");
            btn.innerHTML = '<i class="fas fa-plus"></i>';
            ctrl.appendChild(btn);
            try {
                $(btn).tooltip({ trigger: "hover", boundary: "viewport" });
            } catch (e) {} // eslint-disable-line no-empty
            this.btnZoomIn = btn;
        }
        for (let i = 0; i < this.btnSwitch.children.length; i++) {
            const e = this.btnSwitch.children[i];
            if (e.classList.contains("fas")) this.iSwitch = e as HTMLElement;
            if (e instanceof HTMLSpanElement) this.spanSwitch = e;
        }
        if (!this.iSwitch) {
            const i = document.createElement("i");
            i.className = "fas fa-sm fa-wave-square";
            this.btnSwitch.appendChild(i);
            this.iSwitch = i;
        }
        if (!this.spanSwitch) {
            const span = document.createElement("span");
            span.innerText = "Oscilloscope";
            this.btnSwitch.appendChild(span);
            this.spanSwitch = span;
        }
    }
    bind() {
        this.btnSwitch.addEventListener("click", () => {
            let newType = (this.mode + 1) % 5;
            if (newType === EScopeMode.Spectrogram && !this.drawSpectrogram) newType = (newType + 1) % 5;
            if (newType === EScopeMode.Data && this.data.drawMode === "continuous") newType = (newType + 1) % 5;
            if (newType === EScopeMode.Interleaved && this.data.t && this.data.t.length === 1) newType = (newType + 1) % 5;
            this.mode = newType;
        });
        this.canvas.addEventListener("click", () => {
        });
        this.canvas.addEventListener("wheel", (e) => {
            const left = 50;
            const bottom = 20;
            const multiplier = 1.5 ** (e.deltaY > 0 ? -1 : 1);
            if (e.offsetX < left && e.offsetY < this.canvas.height - bottom) {
                if (multiplier !== 1) this.vzoom *= 1 / multiplier;
                this.draw();
            } else {
                if (multiplier !== 1) this.zoom *= multiplier;
                if (e.deltaX !== 0) this.zoomOffset += (e.deltaX > 0 ? 1 : -1) * 0.1;
                this.handleMouseMove(e);
            }
        });
        this.btnZoomOut.addEventListener("click", () => {
            this.zoom /= 1.5;
            this.draw();
        });
        this.btnZoom.addEventListener("click", () => {
            this.zoom = 1;
            this.draw();
        });
        this.btnZoomIn.addEventListener("click", () => {
            this.zoom *= 1.5;
            this.draw();
        });
        this.canvas.addEventListener("mousedown", this.handleMouseDown);
        this.canvas.addEventListener("touchstart", this.handleMouseDown);
        this.canvas.addEventListener("mousemove", this.handleMouseMove);
        this.canvas.addEventListener("touchmove", this.handleMouseMove);
        this.canvas.addEventListener("mouseleave", this.handleMouseLeave);
        this.canvas.addEventListener("touchend", this.handleMouseLeave);
    }
    draw = (data?: TDrawOptions) => {
        if (data) this.data = data;
        if (this.raf) cancelAnimationFrame(this.raf);
        this.raf = requestAnimationFrame(() => {
            if (!this.data || !this.data.t || !this.data.t.length || !this.data.t[0].length) {
                if (this.divDefault.style.display === "none") {
                    this.divDefault.style.display = "block";
                    return;
                }
            } else if (this.divDefault.style.display !== "none") this.divDefault.style.display = "none";
            if (data && this.drawSpectrogram) this.lastSpect$ = StaticScope.drawOfflineSpectrogram(this.spectTempCtx, this.data, this.lastSpect$);
            if (this.data.drawMode === "continuous" && this.canvas.offsetParent === null) return; // not visible
            const w = this.container.clientWidth;
            const h = this.container.clientHeight;
            if (this.canvas.width !== w) this.canvas.width = w;
            if (this.canvas.height !== h) this.canvas.height = h;
            if (this.mode === EScopeMode.Data) StaticScope.fillDivData(this.divData, this.data);
            else if (this.mode === EScopeMode.Interleaved) StaticScope.drawInterleaved(this.ctx, w, h, this.data, this.zoom, this.zoomOffset, this.vzoom, this.cursor);
            else if (this.mode === EScopeMode.Oscilloscope) StaticScope.drawOscilloscope(this.ctx, w, h, this.data, this.zoom, this.zoomOffset, this.vzoom, this.cursor);
            else if (this.mode === EScopeMode.Spectroscope) StaticScope.drawSpectroscope(this.ctx, w, h, this.data, this.zoom, this.zoomOffset, this.cursor);
            else if (this.mode === EScopeMode.Spectrogram) StaticScope.drawSpectrogram(this.ctx, this.spectTempCtx, w, h, this.data, this.zoom, this.zoomOffset, this.cursor);
        });
    }
    get zoomType() {
        return this.mode === EScopeMode.Spectroscope
            ? "spectroscope"
            : this.mode === EScopeMode.Spectrogram
                ? "spectrogram"
                : "oscilloscope";
    }
    get vzoom() {
        return this._vzoom[this.zoomType];
    }
    set vzoom(zoomIn) {
        const maxZoom = 16;
        this._vzoom[this.zoomType] = Math.min(maxZoom, Math.max(1, zoomIn));
    }
    get zoom() {
        return this._zoom[this.zoomType];
    }
    set zoom(zoomIn) {
        const maxZoom = this.data && this.data.t && this.data.t[0] ? Math.max(16, this.mode === EScopeMode.Spectroscope ? 16 : this.data.t[0].length / (this.inFreqDomain ? this.data.fftSize / 2 : this.data.bufferSize)) : 16;
        const w = this.canvas.width;
        let cursorIn = 0.5;
        const left = 50;
        if (this.cursor) cursorIn = Math.max(0, this.cursor.x - left) / (w - left);
        const cursor = this.zoomOffset + cursorIn / this.zoom;
        this._zoom[this.zoomType] = Math.min(maxZoom, Math.max(1, zoomIn));
        this.zoomOffset = cursor - cursorIn / this.zoom;
        this.btnZoom.innerHTML = this.zoom.toFixed(1) + "x";
    }
    get zoomOffset() {
        return this._zoomOffset[this.zoomType];
    }
    set zoomOffset(zoomOffsetIn) {
        this._zoomOffset[this.zoomType] = Math.max(0, Math.min(1 - 1 / this.zoom, zoomOffsetIn));
    }
    resetZoom() {
        this._zoom = { oscilloscope: 1, spectroscope: 1, spectrogram: 1 };
        this._zoomOffset = { oscilloscope: 0, spectroscope: 0, spectrogram: 0 };
    }
    get mode() {
        return this._mode;
    }
    set mode(modeIn) {
        this.iSwitch.className = StaticScope.getIconClassName(modeIn);
        this.spanSwitch.innerText = StaticScope.getModeName(modeIn);
        this._mode = modeIn;
        if (modeIn === EScopeMode.Data) {
            this.divData.style.display = "";
            this.canvas.style.display = "none";
            this.btnZoom.style.display = "none";
            this.btnZoomIn.style.display = "none";
            this.btnZoomOut.style.display = "none";
        } else {
            this.divData.style.display = "none";
            this.canvas.style.display = "";
            this.btnZoom.style.display = "";
            this.btnZoomIn.style.display = "";
            this.btnZoomOut.style.display = "";
        }
        this.draw();
    }
    get inFreqDomain() {
        return this.mode === EScopeMode.Spectrogram || this.mode === EScopeMode.Spectroscope;
    }
}
