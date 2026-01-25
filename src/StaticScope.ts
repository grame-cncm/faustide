import { wrap, indexToFreq } from "./utils";
import "./StaticScope.scss";

/**
 * Enumeration for the different display modes of the scope.
 */
enum EScopeMode {
    /** * Raw numerical data view.
     * This mode displays the raw sample values for each channel in a tabular format.
     * It's useful for inspecting precise numerical data without graphical interpretation.
     */
    Data = 0,
    /** * Interleaved multi-channel time-domain view.
     * This mode displays the waveform of each channel in a separate horizontal lane.
     * It is ideal for comparing the timing and shape of multiple signals simultaneously while keeping them visually distinct.
     */
    Interleaved = 1,
    /** * Overlaid multi-channel time-domain view.
     * This mode draws all channel waveforms overlaid in the same viewport, similar to a classic oscilloscope.
     * It is best suited for observing phase relationships and direct amplitude comparisons between signals.
     */
    Oscilloscope = 2,
    /** * Frequency-domain view.
     * This mode shows the frequency spectrum of the signal, plotting frequency against magnitude (in dB).
     * It helps in analyzing the harmonic content and frequency components of the signal.
     */
    Spectroscope = 3,
    /** * Time-frequency-domain view (waterfall).
     * This mode visualizes how the frequency spectrum changes over time. The x-axis represents time,
     * the y-axis represents frequency, and the color intensity represents the magnitude of the frequency component.
     */
    Spectrogram = 4
}

/**
 * Enumeration for the frequency scale modes.
 */
enum EFreqScaleMode {
    /** Linear frequency scale */
    Linear,
    /** Logarithmic frequency scale */
    Logarithmic
}

/**
 * Options for initializing the StaticScope instance.
 */
type TOptions = {
    /** The container element for the scope */
    container: HTMLDivElement;
    /** The initial display mode */
    type?: EScopeMode;
};

/**
 * Defines the structure for statistics to be drawn on the canvas, typically at the cursor's position.
 */
type TStatsToDraw = {
    /** The x-coordinate for the stat lines */
    x?: number;
    /** The y-coordinate for the stat lines */
    y?: number;
    /** The label for the x-axis value */
    xLabel?: string;
    /** The label for the y-axis value */
    yLabel?: string;
    /** The numerical values to display */
    values: number[];
};

/**
 * Defines the data and options required for a drawing operation.
 */
export type TDrawOptions = {
    /** The drawing mode */
    drawMode: "offline" | "continuous" | "onevent" | "manual";
    /** Start sample index in the circular buffer */
    $: number;
    /** Start buffer index */
    $buffer: number;
    /** Time domain data for each channel */
    t?: Float32Array[];
    /** Frequency domain data for each channel */
    f?: Float32Array[];
    /** Events associated with each buffer */
    e?: { type: string; data: any }[][];
    /** The size of each data buffer */
    bufferSize: number;
    /** The size of the FFT window */
    fftSize: number;
    /** The overlap factor for FFT calculations */
    fftOverlap: 1 | 2 | 4 | 8;
    /** Estimated fundamental frequency for stabilization */
    freqEstimated?: number;
    /** The sample rate of the audio data */
    sampleRate?: number;
}

const log = Math.log10;
const pow = Math.pow;

/**
 * The main class for the static scope, handling rendering and user interaction.
 */
export class StaticScope {
    /** ID of the current requestAnimationFrame */
    raf: number;
    /** 2D rendering context of the main canvas */
    ctx: CanvasRenderingContext2D;
    /** The container element for the scope */
    container: HTMLDivElement;
    /** The canvas element where the scope is drawn */
    canvas: HTMLCanvasElement;
    /** Button to switch between scope modes */
    btnSwitch: HTMLButtonElement;
    /** Button to zoom out */
    btnZoomOut: HTMLButtonElement;
    /** Button to display and reset zoom level */
    btnZoom: HTMLButtonElement;
    /** Button to zoom in */
    btnZoomIn: HTMLButtonElement;
    /** Button to switch between frequency scales (linear/log) */
    btnScale: HTMLButtonElement;
    /** Button to download the current data as a CSV file */
    btnDownload: HTMLButtonElement;
    /** Icon element within the switch button */
    iSwitch: HTMLElement;
    /** Span element for text within the switch button */
    spanSwitch: HTMLSpanElement;
    /** Icon element within the scale button */
    iScale: HTMLElement;
    /** Div element to display raw data */
    divData: HTMLDivElement;
    /** Div element to display a "No Data" message */
    divDefault: HTMLDivElement;
    /** The current display mode */
    private _mode = EScopeMode.Oscilloscope;
    /** The current frequency scale mode */
    private _freqScaleMode = EFreqScaleMode.Logarithmic;
    /** Horizontal zoom levels for different modes */
    private _zoom = { oscilloscope: 1, spectroscope: 1, spectrogram: 1 };
    /** Vertical zoom levels for different modes */
    private _vzoom = { oscilloscope: 1, spectroscope: 1, spectrogram: 1 };
    /** Horizontal zoom offsets for different modes */
    private _zoomOffset = { oscilloscope: 0, spectroscope: 0, spectrogram: 0 };
    /** The current data and options for drawing */
    data: TDrawOptions = { drawMode: "manual", t: undefined, $: 0, $buffer: 0, bufferSize: 128, fftSize: 256, fftOverlap: 2 };
    /** Current cursor position on the canvas */
    cursor: { x: number; y: number };
    /** Flag indicating if the user is currently dragging the mouse */
    dragging: boolean = false;
    /** Flag indicating if the user is currently zooming */
    zooming: boolean = false;
    /** A temporary 2D context for rendering the spectrogram offline */
    spectTempCtx: CanvasRenderingContext2D;
    /** The last sample index drawn for the spectrogram */
    lastSpect$: number = 0;
    /** Flag to enable/disable spectrogram drawing */
    drawSpectrogram: boolean = false;
    /** Flag to indicate if new data has arrived since the last draw call */
    newDataArrived: boolean = false;

    /**
     * Handles mouse movement over the canvas to display cursor information.
     * @param {MouseEvent | TouchEvent} e The mouse or touch event.
     */
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
    /**
     * Handles mouse down events for panning the view.
     * @param {MouseEvent | TouchEvent} eDown The mouse or touch event.
     */
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
        // let prevY = eDown instanceof MouseEvent ? eDown.pageY : eDown.touches[0].pageY;
        const handleMouseMove = (eMove: MouseEvent | TouchEvent) => {
            // Don't allow panning while zooming
            if (this.zooming) return;
            
            const x = eMove instanceof MouseEvent ? eMove.pageX : eMove.touches[0].pageX;
            // const y = eMove instanceof MouseEvent ? eMove.pageY : eMove.touches[0].pageY;
            const dX = x - prevX;
            // const dY = y - prevY;
            prevX = x;
            // prevY = y;
            // const multiplier = 1 / 1.015 ** dY;
            const offset = -dX / this.zoom / this.canvas.width;
            // if (multiplier !== 1) this.zoom *= multiplier;
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
    /**
     * Handles the mouse leaving the canvas area.
     */
    handleMouseLeave = () => {
        if (!this.data || !this.data.t || !this.data.t.length || !this.data.t[0].length) return;
        if (this.mode === EScopeMode.Data) return;
        this.cursor = undefined;
        this.draw();
    }
    /**
     * Draws the scope in interleaved mode.
     * The core principle is to display each channel's waveform in its own horizontal strip.
     * The y-axis within each strip represents amplitude, and the x-axis represents time (in samples).
     * The view can be stabilized for periodic signals by finding a consistent zero-crossing point.
     * It also includes an optimization to draw min/max values for each horizontal pixel to represent the signal envelope accurately when zoomed out.
     * @param {CanvasRenderingContext2D} ctx The canvas rendering context.
     * @param {number} w The width of the canvas.
     * @param {number} h The height of the canvas.
     * @param {TDrawOptions} d The data and options for drawing.
     * @param {number} zoom The horizontal zoom level.
     * @param {number} zoomOffset The horizontal zoom offset.
     * @param {number} vzoom The vertical zoom level.
     * @param {{ x: number; y: number }} [cursor] The current cursor position.
     */
    static drawInterleaved(ctx: CanvasRenderingContext2D, w: number, h: number, d: TDrawOptions, zoom: number, zoomOffset: number, vzoom: number, cursor?: { x: number; y: number }) {
        this.drawBackground(ctx, w, h);
        if (!d) return;
        const { $, t, freqEstimated, sampleRate, drawMode } = d;
        if (!t || !t.length || !t[0].length) return;
        const l = t[0].length;
        // Fastest way to get min and max to have: 1. max abs value for y scaling, 2. mean value for zero-crossing
        let min = t[0][0];
        let max = t[0][0];
        let i = t.length;
        let samp: number;
        while (i--) {
            let j = l;
            while (j--) {
                samp = t[i][j];
                if (samp < min) min = samp;
                else if (samp > max) max = samp;
            }
        }
        const maxAbs = Math.max(Math.abs(min), Math.abs(max));
        const yFactor = (maxAbs === 0 ? 1 : maxAbs) * vzoom;
        let $0 = 0; // Draw start
        let $1 = l - 1; // Draw End
        let $zerox = 0;
        if (drawMode === "continuous" && l < sampleRate) { // Stablize when window size < 1 sec
            const thresh = (min + max) * 0.5 + 0.001; // the zero-crossing with "offset"
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
        const eventsToDraw = this.drawGrid(ctx, w, h, $0 - $zerox, $1 - $zerox, $zerox, yFactor, d, EScopeMode.Interleaved);
        const gridX = (w - left) / ($1 - $0 - 1);
        const step = Math.max(1, Math.round(1 / gridX)); // horizontal draw step for optimization
        ctx.lineWidth = 2;
        ctx.lineJoin = "round";
        for (let i = 0; i < t.length; i++) {
            ctx.beginPath();
            ctx.strokeStyle = `hsl(${i * 60}, 100%, 85%)`;
            let maxInStep: number;
            let minInStep: number;
            let $j: number;
            let $step: number;
            let x: number;
            let y: number;
            for (let j = $0; j < $1; j++) {
                $j = wrap(j, $, l); // True index
                samp = t[i][$j];
                $step = (j - $0) % step;
                if ($step === 0) {
                    maxInStep = samp;
                    minInStep = samp;
                } else {
                    if (samp > maxInStep) maxInStep = samp;
                    if (samp < minInStep) minInStep = samp;
                }
                if ($step !== step - 1) continue;
                x = (j - $0) * gridX + left;
                y = hCh * (i + 0.5 - maxInStep / yFactor * 0.5);
                if (j === $0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
                if (minInStep !== maxInStep) {
                    y = hCh * (i + 0.5 - minInStep / yFactor * 0.5);
                    ctx.lineTo(x, y);
                }
            }
            ctx.stroke();
        }
        eventsToDraw.forEach(params => this.drawEvent(ctx, w, h, ...params));
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
    /**
     * Draws the scope in oscilloscope mode.
     * This function overlays all channel waveforms in a single view, much like a traditional oscilloscope.
     * The y-axis represents amplitude, and the x-axis represents time (in samples).
     * It shares the same stabilization and min/max drawing optimization logic as the interleaved mode.
     * @param {CanvasRenderingContext2D} ctx The canvas rendering context.
     * @param {number} w The width of the canvas.
     * @param {number} h The height of the canvas.
     * @param {TDrawOptions} d The data and options for drawing.
     * @param {number} zoom The horizontal zoom level.
     * @param {number} zoomOffset The horizontal zoom offset.
     * @param {number} vzoom The vertical zoom level.
     * @param {{ x: number; y: number }} [cursor] The current cursor position.
     */
    static drawOscilloscope(ctx: CanvasRenderingContext2D, w: number, h: number, d: TDrawOptions, zoom: number, zoomOffset: number, vzoom: number, cursor?: { x: number; y: number }) {
        this.drawBackground(ctx, w, h);
        if (!d) return;
        const { $, t, freqEstimated, sampleRate, drawMode } = d;
        if (!t || !t.length || !t[0].length) return;
        const l = t[0].length;
        // Fastest way to get min and max to have: 1. max abs value for y scaling, 2. mean value for zero-crossing
        let min = t[0][0];
        let max = t[0][0];
        let i = t.length;
        let samp: number;
        while (i--) {
            let j = l;
            while (j--) {
                samp = t[i][j];
                if (samp < min) min = samp;
                else if (samp > max) max = samp;
            }
        }
        const maxAbs = Math.max(Math.abs(min), Math.abs(max));
        const yFactor = (maxAbs === 0 ? 1 : maxAbs) * vzoom;
        let $0 = 0; // Draw start
        let $1 = l - 1; // Draw End
        let $zerox = 0;
        if (drawMode === "continuous" && l < sampleRate) { // Stablize when window size < 1 sec
            const thresh = (min + max) * 0.5 + 0.001; // the zero-crossing with "offset"
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
        const eventsToDraw = this.drawGrid(ctx, w, h, $0 - $zerox, $1 - $zerox, $zerox, yFactor, d, EScopeMode.Oscilloscope);
        const gridX = (w - left) / ($1 - $0 - 1);
        const step = Math.max(1, Math.round(1 / gridX));
        ctx.lineWidth = 2;
        ctx.lineJoin = "round";
        for (let i = 0; i < t.length; i++) {
            ctx.beginPath();
            ctx.strokeStyle = t.length === 1 ? "white" : `hsl(${i * 60}, 100%, 85%)`;
            let maxInStep: number;
            let minInStep: number;
            let $j: number;
            let $step: number;
            let x: number;
            let y: number;
            for (let j = $0; j < $1; j++) {
                $j = wrap(j, $, l);
                samp = t[i][$j];
                $step = (j - $0) % step;
                if ($step === 0) {
                    maxInStep = samp;
                    minInStep = samp;
                } else {
                    if (samp > maxInStep) maxInStep = samp;
                    if (samp < minInStep) minInStep = samp;
                }
                if ($step !== step - 1) continue;
                x = (j - $0) * gridX + left;
                y = (h - bottom) * (0.5 - maxInStep / yFactor * 0.5);
                if (j === $0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
                if (minInStep !== maxInStep) {
                    y = (h - bottom) * (0.5 - minInStep / yFactor * 0.5);
                    ctx.lineTo(x, y);
                }
            }
            ctx.stroke();
        }
        eventsToDraw.forEach(params => this.drawEvent(ctx, w, h, ...params));
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
    /**
     * Draws the scope in spectroscope mode.
     * This mode displays the frequency content (spectrum) of the signal. The x-axis represents
     * frequency (either on a linear or logarithmic scale), and the y-axis represents the magnitude
     * of the frequency components in decibels (dB). For each channel, it draws the spectrum of the most
     * recent FFT frame. When using a logarithmic scale, it carefully maps logarithmic frequency ranges to linear pixel space.
     * @param {CanvasRenderingContext2D} ctx The canvas rendering context.
     * @param {number} w The width of the canvas.
     * @param {number} h The height of the canvas.
     * @param {TDrawOptions} d The data and options for drawing.
     * @param {number} zoom The horizontal zoom level.
     * @param {number} zoomOffset The horizontal zoom offset.
     * @param {{ x: number; y: number }} cursor The current cursor position.
     * @param {EFreqScaleMode} scale The frequency scale mode (linear or log).
     */
    static drawSpectroscope(ctx: CanvasRenderingContext2D, w: number, h: number, d: TDrawOptions, zoom: number, zoomOffset: number, cursor: { x: number; y: number }, scale: EFreqScaleMode) {
        this.drawBackground(ctx, w, h);
        if (!d) return;
        const { $, f, fftSize, fftOverlap, sampleRate } = d;
        if (!f || !f.length || !f[0].length) return;
        const fftBins = fftSize / 2;
        let $f = $ * fftOverlap / 2;
        $f -= $f % fftBins;
        const l = f[0].length;
        const left = 50;
        const bottom = 20;
        const hCh = (h - bottom) / f.length;

        if (scale === EFreqScaleMode.Logarithmic) {
            const fMin = sampleRate / fftSize;
            const fMax = sampleRate / 2;
            if (fMin <= 0) return;
            const fullLogRange = log(fMax) - log(fMin);
            const viewLogRange = fullLogRange / zoom;
            const startLog = log(fMin) + zoomOffset * fullLogRange;
            
            const freqToIndex = (freq: number) => freq / fMax * fftBins;
            
            // Invert the X-coordinate calculation to find frequency from a pixel
            const xToLogFreq = (x: number) => startLog + (x - left) / (w - left) * viewLogRange;
            
            const fStart = pow(10, startLog);
            const fEnd = pow(10, startLog + viewLogRange);
            const eventsToDraw = this.drawGrid(ctx, w, h, fStart, fEnd, 0, 1, d, EScopeMode.Spectroscope, scale);

            for (let i = 0; i < f.length; i++) {
                ctx.beginPath();
                ctx.fillStyle = f.length === 1 ? "white" : `hsl(${i * 60}, 100%, 85%)`;

                ctx.moveTo(left, hCh * (i + 1));
                
                // OPTIMIZATION: Instead of iterating over every data bin (slow),
                // we iterate over every horizontal pixel on the screen (fast).
                let j_current = Math.ceil(freqToIndex(pow(10, xToLogFreq(left))));

                for (let x = left; x < w; x++) {
                    // For each pixel, find the range of data bins that fall into it.
                    const logFreq_next = xToLogFreq(x + 1);
                    const j_next = Math.ceil(freqToIndex(pow(10, logFreq_next)));
                    
                    let maxInStep = -Infinity;
                    
                    // Now, find the maximum value ONLY within that small range of bins.
                    if (j_current < j_next) { // More than one bin in this pixel
                        for (let j = j_current; j < j_next; j++) {
                            if (j >= fftBins) break;
                            const samp = f[i][wrap(j, $f, l)];
                            if (samp > maxInStep) maxInStep = samp;
                        }
                    } else { // One or zero bins in this pixel, just take the current one
                        if (j_current < fftBins) maxInStep = f[i][wrap(j_current, $f, l)];
                    }

                    // Plot the single max value found for this pixel.
                    if (isFinite(maxInStep)) {
                        const y = hCh * (i + 1 - Math.min(1, Math.max(0, maxInStep / 100 + 1)));
                        ctx.lineTo(x, y);
                    }
                    j_current = j_next;
                }

                ctx.lineTo(w, hCh * (i + 1));
                ctx.closePath();
                ctx.fill();
            }
            eventsToDraw.forEach(params => this.drawEvent(ctx, w, h, ...params));
            if (cursor && cursor.x > left && cursor.y < h - bottom) {
                const statsToDraw: TStatsToDraw = { values: [] };
                const logCursor = startLog + (cursor.x - left) / (w - left) * viewLogRange;
                const fCursor = pow(10, logCursor);
                const $cursor = Math.round(freqToIndex(fCursor));
                if ($cursor >= 0 && $cursor < fftBins) {
                    statsToDraw.x = cursor.x;
                    statsToDraw.xLabel = fCursor.toFixed(0);
                    const $j = wrap($cursor, $f, l);
                    for (let i = 0; i < f.length; i++) {
                        const samp = f[i][$j];
                        if (typeof samp === "number") statsToDraw.values.push(samp);
                    }
                    this.drawStats(ctx, w, h, statsToDraw);
                }
            }
        } else { // Linear Scale (remains unchanged)
            const $0 = l - fftBins + Math.round(fftBins * zoomOffset);
            const $1 = l - fftBins + Math.round(fftBins / zoom + fftBins * zoomOffset);
            const eventsToDraw = this.drawGrid(ctx, w, h, $0, $1, 0, 1, d, EScopeMode.Spectroscope, scale);
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
            eventsToDraw.forEach(params => this.drawEvent(ctx, w, h, ...params));
            if (cursor && cursor.x > left && cursor.y < h - bottom) {
                const statsToDraw: TStatsToDraw = { values: [] };
                const $cursor = $0 + Math.round((cursor.x - left) / gridX);
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
    }
    /**
     * Draws the scope in spectrogram mode.
     * This creates a "waterfall" plot, showing how the frequency spectrum of a signal changes over time.
     * The x-axis represents time (in FFT frames), the y-axis represents frequency (linear or logarithmic),
     * and the color of each point represents the magnitude (in dB) of that frequency at that point in time.
     * It uses a temporary canvas (`spectrogramCacheContext`) to store the entire spectrogram history, and only
     * draws the visible portion to the main canvas, allowing for efficient panning and zooming through time.
     * @param {CanvasRenderingContext2D} ctx The main canvas rendering context.
     * @param {CanvasRenderingContext2D} tempCtx The temporary canvas context holding the full spectrogram.
     * @param {number} w The width of the canvas.
     * @param {number} h The height of the canvas.
     * @param {TDrawOptions} d The data and options for drawing.
     * @param {number} zoom The horizontal zoom level.
     * @param {number} zoomOffset The horizontal zoom offset.
     * @param {{ x: number; y: number }} cursor The current cursor position.
     * @param {EFreqScaleMode} scale The frequency scale mode (linear or log).
     */
    static drawSpectrogram(ctx: CanvasRenderingContext2D, tempCtx: CanvasRenderingContext2D, w: number, h: number, d: TDrawOptions, zoom: number, zoomOffset: number, cursor: { x: number; y: number }, scale: EFreqScaleMode) {
        this.drawBackground(ctx, w, h);
        if (!d) return;
        const { $, f, fftSize, fftOverlap, sampleRate } = d;
        if (!f || !f.length || !f[0].length) return;
        const fftBins = fftSize / 2;
        let $f = $ * fftOverlap / 2;
        $f -= $f % fftBins;
        const l = f[0].length / fftBins;
        const $0fft = Math.floor(l * zoomOffset);
        const $1fft = Math.ceil(l / zoom + l * zoomOffset);
        const $0 = $0fft * fftBins;
        const $1 = $1fft * fftBins;
        const eventsToDraw = this.drawGrid(ctx, w, h, $0, $1, 0, 1, d, EScopeMode.Spectrogram, scale);
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
        eventsToDraw.forEach(params => this.drawEvent(ctx, w, h, ...params));
        if (cursor && cursor.x > left && cursor.y < h - bottom) {
            const statsToDraw: TStatsToDraw = { values: [] };
            const gridX = (w - left) / ($1fft - $0fft);
            const $fft = $0fft + Math.floor((cursor.x - left) / gridX);
            const $ch = Math.floor(cursor.y / ((h - bottom) / f.length));
            let $bin: number;
            let freq: number;
            if (scale === EFreqScaleMode.Logarithmic) {
                const hCh = (h - bottom) / f.length;
                const yInCh = cursor.y - $ch * hCh;
                const fMin = sampleRate / fftSize;
                const fMax = sampleRate / 2;
                if (fMin > 0) {
                    const logFMin = log(fMin);
                    const logFMax = log(fMax);
                    const logPos = (hCh - yInCh) / hCh;
                    freq = pow(10, logFMin + logPos * (logFMax - logFMin));
                    $bin = Math.floor(freq / fMax * fftBins);
                }
            } else {
                const gridY = (h - bottom) / f.length / fftBins;
                $bin = Math.floor((($ch + 1) * (h - bottom) / f.length - cursor.y) / gridY);
                freq = indexToFreq($bin, fftBins, sampleRate);
            }
            if (typeof freq === "number") {
                const $cursor = $fft * fftBins + $bin;
                const $j = wrap($cursor, $f, f[0].length);
                const samp = f[$ch][$j];
                if (typeof samp === "number") statsToDraw.values = [samp];
                statsToDraw.x = ($fft - $0fft + 0.5) * gridX + left;
                statsToDraw.y = cursor.y;
                statsToDraw.xLabel = $fft.toFixed(0);
                statsToDraw.yLabel = freq.toFixed(0);
                this.drawStats(ctx, w, h, statsToDraw);
            }
        }
    }
    /**
     * Renders new spectrogram data to the temporary cache canvas.
     * This is a helper function for the Spectrogram mode. It's responsible for rendering new frequency data
     * onto the off-screen cache canvas as it arrives. It iterates through the new FFT frames and draws them
     * as vertical lines of pixels, where each pixel's color and brightness correspond to the signal's power
     * at a specific frequency. This process happens "offline" from the main animation loop to avoid blocking rendering.
     * @param {CanvasRenderingContext2D} ctx The temporary canvas rendering context.
     * @param {TDrawOptions} d The data and options for drawing.
     * @param {number} last$ The last sample index that was drawn.
     * @param {EFreqScaleMode} scale The frequency scale mode (linear or log).
     * @returns {number} The new last sample index.
     */
    static drawOfflineSpectrogram(ctx: CanvasRenderingContext2D, d: TDrawOptions, last$: number, scale: EFreqScaleMode) {
        if (!d) return last$;
        const { $, f, fftSize, fftOverlap, sampleRate } = d;
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
        if (canvasWidth !== w) ctx.canvas.width = w;

        if (scale === EFreqScaleMode.Logarithmic) {
            const fMin = sampleRate / fftSize;
            const fMax = sampleRate / 2;
            if (fMin <= 0) return last$;
            const logFMin = log(fMin);
            const logFMax = log(fMax);
            const logPosToFreq = (pos: number) => pow(10, logFMin + pos * (logFMax - logFMin));
            const freqToIndex = (freq: number) => Math.floor(freq / fMax * fftBins);

            for (let i = 0; i < f.length; i++) {
                for (let j = $0fft; j < $1fft; j++) {
                    for (let yPixel = 0; yPixel < hCh; yPixel++) {
                        const logPos = (hCh - yPixel - 1) / hCh;
                        const freq = logPosToFreq(logPos);
                        const k = freqToIndex(freq);
                        if (k >= fftBins || k < 0) continue;
                        const samp = f[i][wrap(k, j * fftBins, l)];
                        const normalized = Math.min(1, Math.max(0, (samp + 10) / 100 + 1));
                        if (normalized === 0) continue;
                        const hue = (normalized * 180 + 240) % 360;
                        const lum = normalized * 50;
                        ctx.fillStyle = `hsl(${hue}, 100%, ${lum}%)`;
                        ctx.fillRect(j % w, i * hCh + yPixel, 1, 1);
                    }
                }
            }
        } else { // Linear Scale
            const $h = hCh / fftBins;
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
        }
        return wrap($1, 0, l);
    }
    /**
     * Draws the background of the canvas.
     * @param {CanvasRenderingContext2D} ctx The canvas rendering context.
     * @param {number} w The width of the canvas.
     * @param {number} h The height of the canvas.
     */
    static drawBackground(ctx: CanvasRenderingContext2D, w: number, h: number) {
        ctx.save();
        ctx.fillStyle = "#181818";
        ctx.fillRect(0, 0, w, h);
        ctx.restore();
    }
    /**
     * Draws the grid lines and labels for axes.
     * @param {CanvasRenderingContext2D} ctx The canvas rendering context.
     * @param {number} w The width of the canvas.
     * @param {number} h The height of the canvas.
     * @param {number} $0 The starting index (sample or frequency bin) for drawing.
     * @param {number} $1 The ending index for drawing.
     * @param {number} $zerox The zero-crossing offset for stabilization.
     * @param {number} yFactor The vertical scaling factor.
     * @param {TDrawOptions} d The data and options for drawing.
     * @param {EScopeMode} mode The current scope mode.
     * @param {EFreqScaleMode} [scale] The frequency scale mode.
     * @returns {[number, { type: string; data: any }[]][]} An array of events to be drawn.
     */
    static drawGrid(ctx: CanvasRenderingContext2D, w: number, h: number, $0: number, $1: number, $zerox: number, yFactor: number, d: TDrawOptions, mode: EScopeMode, scale?: EFreqScaleMode) {
        ctx.save();
        ctx.setLineDash([]);
        ctx.lineWidth = 1;
        const { e, bufferSize, fftSize, fftOverlap, sampleRate } = d;
        const inFreqDomain = mode === EScopeMode.Spectrogram || mode === EScopeMode.Spectroscope;
        const fftBins = fftSize / 2;
        const channels = inFreqDomain ? d.f.length : d.t.length;
        const unit = mode === EScopeMode.Spectrogram ? "Hz/frame" : mode === EScopeMode.Spectroscope ? "dB/Hz" : "lvl/samp";
        const eventsToDraw: [number, { type: string; data: any }[]][] = [];

        const left = 50;
        const bottom = 20;
        const eventStrokeStyle = "#ff8800";
        const bufferStrokeStyle = "#004000";
        const normalStrokeStyle = "#404040";
        ctx.fillStyle = "#DDDD99";
        ctx.font = "10px Consolas, monospace";

        // Main axes
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

        // X-Axis Grid
        if (mode === EScopeMode.Spectroscope && scale === EFreqScaleMode.Logarithmic) {
            const fStart = $0;
            const fEnd = $1;
            if (fStart > 0) {
                const logFStart = log(fStart);
                const logFEnd = log(fEnd);
                const startMag = Math.floor(logFStart);
                const endMag = Math.ceil(logFEnd);

                for (let p = startMag; p < endMag; p++) {
                    for (let m = 1; m < 10; m++) {
                        const freq = m * pow(10, p);
                        if (freq < fStart || freq > fEnd) continue;
                        const x = left + (w - left) * (log(freq) - logFStart) / (logFEnd - logFStart);
                        const isMajor = m === 1;
                        ctx.strokeStyle = (isMajor || m === 5) ? bufferStrokeStyle : normalStrokeStyle;
                        ctx.beginPath();
                        ctx.moveTo(x, 0);
                        ctx.lineTo(x, h - bottom);
                        ctx.stroke();
                        if (isMajor || m === 5 || (logFEnd - logFStart < 3 && (m === 2 || m === 7))) {
                            ctx.fillText(freq >= 1000 ? `${(freq / 1000).toFixed(1)}k` : freq.toFixed(0), Math.min(x, w - 20), h - 10);
                        }
                    }
                }
            }
        } else { // Linear X-Axis (Time-based for Osc/Spectrogram, Freq-based for linear Spectroscope)
            if (mode === EScopeMode.Spectroscope) {
                // Map buffer indices to bin indices within the last FFT frame
                // The last fftBins elements of the buffer contain indices (l-fftBins) to (l-1)
                // which correspond to FFT bins 0 to (fftBins-1)
                
                const lastFFTStart = d.f[0].length - fftBins;
                
                // Clamp to valid range
                const binStart = Math.max(0, Math.min(fftBins - 1, $0 - lastFFTStart));
                const binEnd = Math.max(0, Math.min(fftBins, $1 - lastFFTStart));

                const fStart = indexToFreq(binStart, fftBins, sampleRate);
                const fEnd = indexToFreq(Math.min(binEnd, fftBins - 1), fftBins, sampleRate);
                const fRange = fEnd - fStart;

                if (fRange <= 0) {
                    ctx.restore();
                    return eventsToDraw;
                }
                // Aim for a reasonable number of ticks
                const numTicks = 8;
                const roughStep = fRange / numTicks;
                const magnitude = Math.pow(10, Math.floor(Math.log10(roughStep)));
                const residual = roughStep / magnitude;
                let fStep;

                if (residual > 5) fStep = 10 * magnitude;
                else if (residual > 2) fStep = 5 * magnitude;
                else if (residual > 1) fStep = 2 * magnitude;
                else fStep = magnitude;

                if (fStep > 0) {
                    const firstTick = Math.ceil(fStart / fStep) * fStep;
                    for (let f = firstTick; f < fEnd; f += fStep) {
                        const x = left + (w - left) * (f - fStart) / fRange;
                        if (x < left) continue;

                        ctx.strokeStyle = bufferStrokeStyle;
                        ctx.beginPath();
                        ctx.moveTo(x, 0);
                        ctx.lineTo(x, h - bottom);
                        ctx.stroke();
                        const label = f >= 1000 ? `${(f / 1000).toFixed(1)}k` : f.toFixed(0);
                        ctx.fillText(label, Math.min(x, w - 20), h - 10);
                    }
                }
            } else {
                // Original logic for Time-based plots (Oscilloscope, Interleaved, Spectrogram)
                const $0ranged = $0;
                const $1ranged = $1;
                let $0buffer = $0ranged / bufferSize / (inFreqDomain ? fftOverlap / 2 : 1);
                let $1buffer = $1ranged / bufferSize / (inFreqDomain ? fftOverlap / 2 : 1);
                const hStep = ($1buffer - $0buffer <= 0) ? 0.125 : 2 ** Math.ceil(Math.log2($1buffer - $0buffer)) / 8;
                $0buffer -= $0buffer % hStep;
                $1buffer -= $0buffer % hStep;
                let $buffer = (d.$buffer || 0) + Math.round($zerox / bufferSize / (inFreqDomain ? fftOverlap / 2 : 1));
                if (inFreqDomain) $buffer -= $buffer % (fftBins / bufferSize / fftOverlap / 2);

                if ($1ranged - $0ranged - 1 > 0) { // Avoid division by zero
                    for (let j = $0buffer; j < $1buffer; j += hStep) {
                        const x = (j * bufferSize * (inFreqDomain ? fftOverlap / 2 : 1) - $0ranged) / ($1ranged - $0ranged - 1) * (w - left) + left;
                        if (x < left) continue;
                        ctx.strokeStyle = j % 1 === 0 ? bufferStrokeStyle : normalStrokeStyle;
                        ctx.beginPath();
                        ctx.moveTo(x, 0);
                        ctx.lineTo(x, h - bottom);
                        ctx.stroke();
                        if (mode === EScopeMode.Spectrogram) {
                            const $fft = j / (fftBins / bufferSize) * fftOverlap / 2;
                            if ($fft % 1 === 0) ctx.fillText($fft.toFixed(), Math.min(x, w - 20), h - 10);
                        } else {
                            ctx.fillText((j * bufferSize).toFixed(), Math.min(x, w - 20), h - 10);
                        }
                    }
                }
                if (e && mode !== EScopeMode.Spectroscope) {
                    ctx.strokeStyle = eventStrokeStyle;
                    if ($1ranged - $0ranged - 1 > 0) { // Avoid division by zero
                        for (let j = Math.ceil($0buffer); j < $1buffer; j++) {
                            if (e[$buffer + j] && e[$buffer + j].length) {
                                const x = (j * bufferSize * (inFreqDomain ? fftOverlap / 2 : 1) - $0ranged) / ($1ranged - $0ranged - 1) * (w - left) + left;
                                if (x < left) continue;
                                eventsToDraw.push([x, e[$buffer + j]]);
                                ctx.beginPath();
                                ctx.moveTo(x, 0);
                                ctx.lineTo(x, h - bottom);
                                ctx.stroke();
                            }
                        }
                    }
                }
            }
        }

        // Y-Axis Grid
        const hCh = (h - bottom) / channels;
        ctx.textAlign = "right";
        ctx.textBaseline = "middle";

        if (mode === EScopeMode.Spectrogram && scale === EFreqScaleMode.Logarithmic) {
            const fMin = sampleRate / fftSize;
            const fMax = sampleRate / 2;
            if (fMin > 0) {
                const logFMin = log(fMin);
                const logFMax = log(fMax);
                for (let i = 0; i < channels; i++) {
                    const mag = Math.floor(logFMin);
                    for (let p = mag; p < logFMax + 1; p++) {
                        for (let m = 1; m < 10; m++) {
                            const freq = m * pow(10, p);
                            if (freq < fMin) continue;
                            if (freq > fMax) break;
                            const logPos = (log(freq) - logFMin) / (logFMax - logFMin);
                            const y = i * hCh + (1 - logPos) * hCh;
                            if (y < i * hCh || y > (i + 1) * hCh) continue;
                            const isMajor = m === 1;
                            const isMedium = m === 5;
                            ctx.strokeStyle = (isMajor || isMedium) ? bufferStrokeStyle : normalStrokeStyle;
                            ctx.beginPath();
                            ctx.moveTo(left, y);
                            ctx.lineTo(w, y);
                            ctx.stroke();
                            if (isMajor || isMedium) {
                                ctx.fillText(freq >= 1000 ? `${(freq / 1000).toFixed(1)}k` : freq.toFixed(0), 45, Math.max(y, 10));
                            }
                        }
                    }
                }
            }
        } else { // Linear Y-Axis
            ctx.strokeStyle = normalStrokeStyle;
            ctx.beginPath();
            const drawHLine = (y: number, yLabel: string) => {
                ctx.moveTo(left, y);
                ctx.lineTo(w, y);
                ctx.fillText(yLabel, 45, Math.max(y, 10));
            };
            if (mode === EScopeMode.Spectroscope) {
                // Draw dB ticks for Spectroscope.
                // The plot is scaled for a 100dB range, from 0dB (top) to -100dB (bottom).
                for (let i = 0; i < channels; i++) {
                    const chTop = i * hCh;
                    // Draw ticks every 20 dB from 0 down to -100.
                    for (let db = 0; db >= -100; db -= 20) {
                        const y = chTop + (-db / 100) * hCh;
                        drawHLine(y, db.toFixed(0));
                    }
                }
            } else {
                for (let i = 0; i < (mode === EScopeMode.Oscilloscope ? 1 : channels); i++) {
                    const chCenterY = mode === EScopeMode.Oscilloscope ? (h - bottom) / 2 : hCh * (i + 0.5);
                    const chHalfHeight = mode === EScopeMode.Oscilloscope ? (h - bottom) / 2 : hCh / 2;
                    
                    const precision = yFactor > 0 && yFactor < 1 ? Math.ceil(-Math.log10(yFactor)) + 1 : 2;
                    
                    // Draw top, center, and bottom lines to define the Y-axis range
                    drawHLine(chCenterY - chHalfHeight, yFactor.toFixed(precision));
                    drawHLine(chCenterY, (0).toFixed(2));
                    drawHLine(chCenterY + chHalfHeight, (-yFactor).toFixed(precision));

                    // Calculate and draw intermediate grid lines for better readability
                    if (yFactor > 0) {
                        const numIntermediateLines = 3; // Aim for this many lines between center and top/bottom
                        const roughStep = yFactor / (numIntermediateLines + 1);
                        const magnitude = Math.pow(10, Math.floor(Math.log10(roughStep)));
                        const residual = roughStep / magnitude;
                        let vStep;

                        if (residual > 5) vStep = 10 * magnitude;
                        else if (residual > 2) vStep = 5 * magnitude;
                        else if (residual > 1) vStep = 2 * magnitude;
                        else vStep = magnitude;

                        if (vStep > 0) {
                            // Use a small tolerance to avoid drawing a line that overlaps with the top/bottom boundary
                            for (let val = vStep; val < yFactor * 0.999; val += vStep) {
                                // Positive Ticks
                                const yPos = chCenterY - (val / yFactor) * chHalfHeight;
                                drawHLine(yPos, val.toFixed(precision));

                                // Negative Ticks
                                const yNeg = chCenterY + (val / yFactor) * chHalfHeight;
                                drawHLine(yNeg, (-val).toFixed(precision));
                            }
                        }
                    }
                }
            }
            ctx.stroke();
        }

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
    /**
     * Draws event information on the canvas.
     * @param {CanvasRenderingContext2D} ctx The canvas rendering context.
     * @param {number} w The width of the canvas.
     * @param {number} h The height of the canvas.
     * @param {number} x The x-coordinate for the event display.
     * @param {{ type: string; data: any }[]} e The array of events to display.
     */
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
    /**
     * Draws statistics (cursor lines and values) on the canvas.
     * @param {CanvasRenderingContext2D} ctx The canvas rendering context.
     * @param {number} w The width of the canvas.
     * @param {number} h The height of the canvas.
     * @param {TStatsToDraw} statsToDraw The statistics data to draw.
     */
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
        values.forEach(v => right.push(v.toFixed(7)));
        ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
        ctx.fillRect(w - 70, 0, 80, right.length * 15 + 5);
        ctx.fillStyle = "#DDDD99";
        right.forEach((s, i) => ctx.fillText(s, w - 2, (i + 1) * 15, 70));
        ctx.restore();
    }
    /**
     * Fills a div with a table-like view of the raw data.
     * @param {HTMLDivElement} container The div element to fill.
     * @param {TDrawOptions} d The data to display.
     */
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
                spanSamp.innerText = ch[$j].toFixed(7);
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
    /**
     * Gets the Font Awesome icon class name for a given scope mode.
     * @param {EScopeMode} typeIn The scope mode.
     * @returns {string} The corresponding class name.
     */
    static getIconClassName(typeIn: EScopeMode) {
        const prefix = "fas fa-sm ";
        if (typeIn === EScopeMode.Data) return prefix + "fa-table";
        if (typeIn === EScopeMode.Interleaved) return prefix + "fa-water";
        if (typeIn === EScopeMode.Oscilloscope) return prefix + "fa-wave-square";
        if (typeIn === EScopeMode.Spectroscope) return prefix + "fa-chart-bar";
        if (typeIn === EScopeMode.Spectrogram) return prefix + "fa-align-justify";
        return prefix;
    }
    /**
     * Gets the display name for a given scope mode.
     * @param {EScopeMode} typeIn The scope mode.
     * @returns {string} The corresponding name.
     */
    static getModeName(typeIn: EScopeMode) {
        if (typeIn === EScopeMode.Data) return "Data";
        if (typeIn === EScopeMode.Interleaved) return "Interleaved";
        if (typeIn === EScopeMode.Oscilloscope) return "Oscilloscope";
        if (typeIn === EScopeMode.Spectroscope) return "Spectroscope";
        if (typeIn === EScopeMode.Spectrogram) return "Spectrogram";
        return "";
    }

    /**
     * Creates an instance of StaticScope.
     * @param {TOptions} options The initialization options.
     */
    constructor(options: TOptions) {
        Object.assign(this, options);
        this.getChildren();
        this.bind();
        this.mode = EScopeMode.Oscilloscope;
        this.freqScaleMode = EFreqScaleMode.Logarithmic;
    }
    /**
     * Finds or creates the necessary child DOM elements for the scope.
     */
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
            if (e.classList.contains("static-scope-ui-scale")) this.btnScale = e as HTMLButtonElement;
            if (e.classList.contains("static-scope-ui-download")) this.btnDownload = e as HTMLButtonElement;
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
            } catch (e) { } // eslint-disable-line no-empty
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
            } catch (e) { } // eslint-disable-line no-empty
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
            } catch (e) { } // eslint-disable-line no-empty
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
            } catch (e) { } // eslint-disable-line no-empty
            this.btnZoomIn = btn;
        }
        if (!this.btnScale) {
            const btn = document.createElement("button");
            btn.className = "static-scope-ui-scale btn btn-outline-light btn-sm btn-overlay btn-overlay-icon";
            btn.setAttribute("data-toggle", "tooltip");
            btn.setAttribute("data-placement", "top");
            ctrl.appendChild(btn);
            try {
                $(btn).tooltip({ trigger: "hover", boundary: "viewport" });
            } catch (e) { } // eslint-disable-line no-empty
            this.btnScale = btn;
        }
        if (!this.btnDownload) {
            const btn = document.createElement("button");
            btn.className = "static-scope-ui-download btn btn-outline-light btn-sm btn-overlay btn-overlay-icon";
            btn.setAttribute("data-toggle", "tooltip");
            btn.setAttribute("data-placement", "top");
            btn.setAttribute("title", "Download Data");
            btn.innerHTML = '<i class="fas fa-download"></i>';
            ctrl.appendChild(btn);
            try {
                $(btn).tooltip({ trigger: "hover", boundary: "viewport" });
            } catch (e) { } // eslint-disable-line no-empty
            this.btnDownload = btn;
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
        for (let i = 0; i < this.btnScale.children.length; i++) {
            const e = this.btnScale.children[i];
            if (e.classList.contains("fas")) this.iScale = e as HTMLElement;
        }
        if (!this.iScale) {
            const i = document.createElement("i");
            this.btnScale.appendChild(i);
            this.iScale = i;
        }
    }
    /**
     * Binds all event listeners for the UI elements.
     */
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
            e.preventDefault(); // Prevent default scrolling behavior
            
            const left = 50;
            const bottom = 20;
            const multiplier = 1.5 ** (e.deltaY > 0 ? -1 : 1);
            
            if (e.offsetX < left && e.offsetY < this.canvas.height - bottom) {
                // Vertical zoom on the Y-axis area
                if (multiplier !== 1) this.vzoom *= 1 / multiplier;
                this.draw();
            } else {
                // Horizontal zoom on the main canvas area
                if (multiplier !== 1) {
                    // Set zooming flag to prevent panning interference
                    this.zooming = true;
                    
                    // Store the current cursor position for accurate zoom center
                    const tempCursor = { x: e.offsetX, y: e.offsetY };
                    this.cursor = tempCursor;
                    
                    // Apply zoom
                    this.zoom *= multiplier;
                    
                    // Clear zooming flag after a short delay
                    setTimeout(() => {
                        this.zooming = false;
                    }, 10);
                }
                
                // Only apply horizontal scrolling if not zooming and deltaX is significant
                if (!this.zooming && Math.abs(e.deltaX) > Math.abs(e.deltaY) && e.deltaX !== 0) {
                    this.zoomOffset += (e.deltaX > 0 ? 1 : -1) * 0.1;
                    this.draw();
                } else {
                    this.handleMouseMove(e);
                }
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
        this.btnScale.addEventListener("click", () => {
            this.freqScaleMode = (this.freqScaleMode + 1) % 2;
        });
        this.btnDownload.addEventListener("click", () => {
            let data = "";
            if (this.mode === EScopeMode.Data || this.mode === EScopeMode.Interleaved || this.mode === EScopeMode.Oscilloscope) {
                if (this.data.t) {
                    const { t, $ } = this.data;
                    if (!t || !t.length || !t[0].length) return;
                    const l = t[0].length;
                    data += new Array(t.length).fill(null).map((v, i) => `channel${i + 1}`).join(",") + "\n";
                    for (let j = 0; j < l; j++) {
                        for (let i = 0; i < t.length; i++) {
                            const $j = wrap(j, $, l);
                            const samp = t[i][$j];
                            data += samp + (i === t.length - 1 ? "\n" : ",");
                        }
                    }
                }
            } else if (this.mode === EScopeMode.Spectroscope) {
                const { $, f, fftSize, fftOverlap } = this.data;
                if (!f || !f.length || !f[0].length) return;
                const fftBins = fftSize / 2;
                let $f = $ * fftOverlap / 2;
                $f -= $f % fftBins;
                const l = f[0].length;
                data += new Array(f.length).fill(null).map((v, i) => `channel${i + 1}`).join(",") + "\n";
                for (let j = l - fftBins; j < l; j++) {
                    for (let i = 0; i < f.length; i++) {
                        const $j = wrap(j, $f, l);
                        const samp = f[i][$j];
                        data += samp + (i === f.length - 1 ? "\n" : ",");
                    }
                }
            } else if (this.mode === EScopeMode.Spectrogram) {
                const { $, f, fftSize, fftOverlap } = this.data;
                if (!f || !f.length || !f[0].length) return;
                const fftBins = fftSize / 2;
                let $f = $ * fftOverlap / 2;
                $f -= $f % fftBins;
                const l = f[0].length;
                data += new Array(l / fftBins).fill(null).map((v, i) => new Array(f.length).fill(null).map((v, j) => `frame${i + 1}_channel${j + 1}`).join(",")).join(",") + "\n";
                for (let j = 0; j < fftBins; j++) {
                    for (let h = 0; h < l / fftBins; h++) {
                        for (let i = 0; i < f.length; i++) {
                            const $j = wrap(h * fftBins + j, $f, l);
                            const samp = f[i][$j];
                            data += samp + (i === f.length - 1 && h === l / fftBins - 1 ? "\n" : ",");
                        }
                    }
                }
            }
            if (!data) return;
            const blob = new Blob([data]);
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "data.csv";
            a.target = "_blank";
            a.click();
        });
        this.canvas.addEventListener("mousedown", this.handleMouseDown);
        this.canvas.addEventListener("touchstart", this.handleMouseDown);
        this.canvas.addEventListener("mousemove", this.handleMouseMove);
        this.canvas.addEventListener("touchmove", this.handleMouseMove);
        this.canvas.addEventListener("mouseleave", this.handleMouseLeave);
        this.canvas.addEventListener("touchend", this.handleMouseLeave);
    }
    /**
     * The callback function that is executed on each animation frame to draw the scope.
     */
    drawCallback = () => {
        this.raf = undefined;
        if (!this.data || (!this.data.t && !this.data.f) || (this.data.t && !this.data.t.length) || (this.data.f && !this.data.f.length)) {
            if (this.divDefault.style.display === "none") {
                this.divDefault.style.display = "block";
                this.canvas.style.display = "none";
                this.divData.style.display = "none";
            }
            return;
        }
        if (this.divDefault.style.display !== "none") this.divDefault.style.display = "none";

        if (this.data && this.newDataArrived && this.drawSpectrogram) {
            this.lastSpect$ = StaticScope.drawOfflineSpectrogram(this.spectTempCtx, this.data, this.lastSpect$, this.freqScaleMode);
        }
        if (this.data.drawMode === "continuous" && this.canvas.offsetParent === null) return; // not visible
        const w = this.container.clientWidth;
        const h = this.container.clientHeight;
        if (this.canvas.width !== w) this.canvas.width = w;
        if (this.canvas.height !== h) this.canvas.height = h;

        if (this.mode === EScopeMode.Data) {
            StaticScope.fillDivData(this.divData, this.data);
        } else if (this.mode === EScopeMode.Interleaved) {
            StaticScope.drawInterleaved(this.ctx, w, h, this.data, this.zoom, this.zoomOffset, this.vzoom, this.cursor);
        } else if (this.mode === EScopeMode.Oscilloscope) {
            StaticScope.drawOscilloscope(this.ctx, w, h, this.data, this.zoom, this.zoomOffset, this.vzoom, this.cursor);
        } else if (this.mode === EScopeMode.Spectroscope) {
            StaticScope.drawSpectroscope(this.ctx, w, h, this.data, this.zoom, this.zoomOffset, this.cursor, this.freqScaleMode);
        } else if (this.mode === EScopeMode.Spectrogram) {
            StaticScope.drawSpectrogram(this.ctx, this.spectTempCtx, w, h, this.data, this.zoom, this.zoomOffset, this.cursor, this.freqScaleMode);
        }
        this.newDataArrived = false;
    };
    /**
     * Triggers a redraw of the scope. If data is provided, it updates the scope's data.
     * @param {TDrawOptions} [data] The new data to draw.
     */
    draw = (data?: TDrawOptions) => {
        if (data) {
            if (data.f && (!this.data.f || this.data.f[0].length !== data.f[0].length)) {
                this.lastSpect$ = 0; // Reset spectrogram canvas
            }
            this.data = data;
            this.newDataArrived = true;
        }
        if (this.raf) return;
        this.raf = requestAnimationFrame(this.drawCallback);
    }
    /**
     * Gets the zoom type string based on the current mode.
     * @type {("spectroscope" | "spectrogram" | "oscilloscope")}
     */
    get zoomType() {
        return this.mode === EScopeMode.Spectroscope
            ? "spectroscope"
            : this.mode === EScopeMode.Spectrogram
                ? "spectrogram"
                : "oscilloscope";
    }
    /**
     * Gets the current vertical zoom level for the active mode.
     * @type {number}
     */
    get vzoom() {
        return this._vzoom[this.zoomType];
    }
    /**
     * Sets the vertical zoom level for the active mode.
     * @type {number}
     */
    set vzoom(zoomIn) {
        const maxZoom = 16;
        this._vzoom[this.zoomType] = Math.min(maxZoom, Math.max(1/maxZoom, zoomIn));
    }
    /**
     * Gets the current horizontal zoom level for the active mode.
     * @type {number}
     */
    get zoom() {
        return this._zoom[this.zoomType];
    }
    /**
     * Sets the horizontal zoom level, adjusting the offset to zoom towards the cursor.
     * @type {number}
     */
    set zoom(zoomIn) {
        const dataArray = this.inFreqDomain ? this.data.f : this.data.t;
        const maxZoom = dataArray && dataArray[0] ? Math.max(16, this.mode === EScopeMode.Spectroscope ? 64 : dataArray[0].length / (this.inFreqDomain ? this.data.fftSize / 2 : this.data.bufferSize)) : 16;
        const w = this.canvas.width;
        const left = 50;
        
        // Calculate cursor position in normalized coordinates (0 to 1)
        let cursorNormalized = 0.5; // Default to center if no cursor
        if (this.cursor && this.cursor.x > left) {
            cursorNormalized = Math.max(0, Math.min(1, (this.cursor.x - left) / (w - left)));
        }
        
        // Calculate the data position under the cursor before zoom
        const dataPositionAtCursor = this.zoomOffset + cursorNormalized / this.zoom;
        
        // Apply the new zoom level
        const oldZoom = this._zoom[this.zoomType];
        this._zoom[this.zoomType] = Math.min(maxZoom, Math.max(1, zoomIn));
        
        // Calculate the new offset to keep the same data position under the cursor
        const newOffset = dataPositionAtCursor - cursorNormalized / this._zoom[this.zoomType];
        
        // Clamp the offset to valid range
        this._zoomOffset[this.zoomType] = Math.max(0, Math.min(1 - 1 / this._zoom[this.zoomType], newOffset));
        
        // Update UI
        this.btnZoom.innerHTML = this._zoom[this.zoomType].toFixed(1) + "x";
        
        // Trigger redraw if zoom actually changed
        if (oldZoom !== this._zoom[this.zoomType]) {
            this.draw();
        }
    }
    /**
     * Gets the current horizontal zoom offset for the active mode.
     * @type {number}
     */
    get zoomOffset() {
        return this._zoomOffset[this.zoomType];
    }
    /**
     * Sets the horizontal zoom offset, clamped between 0 and `1 - 1/zoom`.
     * @type {number}
     */
    set zoomOffset(zoomOffsetIn) {
        this._zoomOffset[this.zoomType] = Math.max(0, Math.min(1 - 1 / this.zoom, zoomOffsetIn));
    }
    /**
     * Resets zoom and offset for all modes to their default values.
     */
    resetZoom() {
        this._zoom = { oscilloscope: 1, spectroscope: 1, spectrogram: 1 };
        this._zoomOffset = { oscilloscope: 0, spectroscope: 0, spectrogram: 0 };
    }
    /**
     * Gets the current frequency scale mode.
     * @type {EFreqScaleMode}
     */
    get freqScaleMode() {
        return this._freqScaleMode;
    }
    /**
     * Sets the frequency scale mode and updates the UI and drawing.
     * @type {EFreqScaleMode}
     */
    set freqScaleMode(modeIn: EFreqScaleMode) {
        this._freqScaleMode = modeIn;
        if (modeIn === EFreqScaleMode.Linear) {
            this.iScale.className = "fas fa-ruler-horizontal";
            this.btnScale.setAttribute("title", "Switch to Logarithmic Scale");
        } else {
            this.iScale.className = "fas fa-chart-line";
            this.btnScale.setAttribute("title", "Switch to Linear Scale");
        }
        try {
            $(this.btnScale).tooltip("hide").tooltip("dispose").tooltip({ trigger: "hover", boundary: "viewport" });
        } catch (e) { } // eslint-disable-line no-empty
        this.lastSpect$ = 0;
        this.spectTempCtx.clearRect(0, 0, this.spectTempCtx.canvas.width, this.spectTempCtx.canvas.height);
        this.draw();
    }
    /**
     * Gets the current scope display mode.
     * @type {EScopeMode}
     */
    get mode() {
        return this._mode;
    }
    /**
     * Sets the scope display mode and updates the UI accordingly.
     * @type {EScopeMode}
     */
    set mode(modeIn) {
        this.iSwitch.className = StaticScope.getIconClassName(modeIn);
        this.spanSwitch.innerText = StaticScope.getModeName(modeIn);
        this._mode = modeIn;
        if (modeIn === EScopeMode.Data) {
            this.divData.style.display = "block";
            this.canvas.style.display = "none";
            [this.btnZoom, this.btnZoomIn, this.btnZoomOut, this.btnScale].forEach(b => b.style.display = "none");
        } else {
            this.divData.style.display = "none";
            this.canvas.style.display = "block";
            [this.btnZoom, this.btnZoomIn, this.btnZoomOut].forEach(b => b.style.display = "");
            this.btnScale.style.display = this.inFreqDomain ? "" : "none";
        }
        this.draw();
    }
    /**
     * Checks if the current mode is frequency-domain based.
     * @readonly
     * @type {boolean}
     */
    get inFreqDomain() {
        return this.mode === EScopeMode.Spectrogram || this.mode === EScopeMode.Spectroscope;
    }
}
