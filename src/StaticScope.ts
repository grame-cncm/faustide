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
    startSampleIndex: number;
    /** Start buffer index */
    startBufferIndex: number;
    /** Time domain data for each channel */
    timeDomainData?: Float32Array[];
    /** Frequency domain data for each channel */
    freqDomainData?: Float32Array[];
    /** Events associated with each buffer */
    events?: { type: string; data: any }[][];
    /** The size of each data buffer */
    bufferSize: number;
    /** The size of the FFT window */
    fftSize: number;
    /** The overlap factor for FFT calculations */
    fftOverlap: 1 | 2 | 4 | 8;
    /** Estimated fundamental frequency for stabilization */
    estimatedFundamentalFrequency?: number;
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
    data: TDrawOptions = { drawMode: "manual", timeDomainData: undefined, startSampleIndex: 0, startBufferIndex: 0, bufferSize: 128, fftSize: 256, fftOverlap: 2 };
    /** Current cursor position on the canvas */
    cursor: { x: number; y: number };
    /** Flag indicating if the user is currently dragging the mouse */
    dragging: boolean = false;
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
     * @param {MouseEvent | TouchEvent} event The mouse or touch event.
     */
    handleMouseMove = (event: MouseEvent | TouchEvent) => {
        if (!this.data || !this.data.timeDomainData || !this.data.timeDomainData.length || !this.data.timeDomainData[0].length) return;
        if (this.mode === EScopeMode.Data) return;
        const canvasWidth = this.container.clientWidth;
        const canvasHeight = this.container.clientHeight;
        const rect = this.canvas.getBoundingClientRect();
        let x = event instanceof MouseEvent ? event.offsetX : event.touches[0].pageX - rect.left;
        x = Math.max(0, Math.min(canvasWidth, x));
        let y = event instanceof MouseEvent ? event.offsetY : event.touches[0].pageY - rect.top;
        y = Math.max(0, Math.min(canvasHeight, y));
        this.cursor = { x, y };
        // if (this.data.drawMode === "continuous") return;
        this.draw();
    }
    /**
     * Handles mouse down events for panning the view.
     * @param {MouseEvent | TouchEvent} eventDown The mouse or touch event.
     */
    handleMouseDown = (eventDown: MouseEvent | TouchEvent) => {
        if (!this.data || !this.data.timeDomainData || !this.data.timeDomainData.length || !this.data.timeDomainData[0].length) return;
        if (this.mode === EScopeMode.Data) return;
        eventDown.preventDefault();
        eventDown.stopPropagation();
        this.dragging = true;
        this.canvas.style.cursor = "grab";
        const originalZoom = this.zoom;
        const originalOffset = this.zoomOffset;
        let previousX = eventDown instanceof MouseEvent ? eventDown.pageX : eventDown.touches[0].pageX;
        // let previousY = eventDown instanceof MouseEvent ? eventDown.pageY : eventDown.touches[0].pageY;
        const handleMouseMove = (moveEvent: MouseEvent | TouchEvent) => {
            const currentX = moveEvent instanceof MouseEvent ? moveEvent.pageX : moveEvent.touches[0].pageX;
            // const currentY = moveEvent instanceof MouseEvent ? moveEvent.pageY : moveEvent.touches[0].pageY;
            const deltaX = currentX - previousX;
            // const deltaY = currentY - previousY;
            previousX = currentX;
            // previousY = currentY;
            // const multiplier = 1 / 1.015 ** deltaY;
            const offsetChange = -deltaX / this.zoom / this.canvas.width;
            // if (multiplier !== 1) this.zoom *= multiplier;
            if (offsetChange !== 0) this.zoomOffset += offsetChange;
            if (this.zoom !== originalZoom || this.zoomOffset !== originalOffset) this.draw();
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
        if (!this.data || !this.data.timeDomainData || !this.data.timeDomainData.length || !this.data.timeDomainData[0].length) return;
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
     * @param {number} canvasWidth The width of the canvas.
     * @param {number} canvasHeight The height of the canvas.
     * @param {TDrawOptions} drawOptions The data and options for drawing.
     * @param {number} horizontalZoom The horizontal zoom level.
     * @param {number} horizontalZoomOffset The horizontal zoom offset.
     * @param {number} verticalZoom The vertical zoom level.
     * @param {{ x: number; y: number }} [cursor] The current cursor position.
     */
    static drawInterleaved(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number, drawOptions: TDrawOptions, horizontalZoom: number, horizontalZoomOffset: number, verticalZoom: number, cursor?: { x: number; y: number }) {
        this.drawBackground(ctx, canvasWidth, canvasHeight);
        if (!drawOptions) return;
        const { startSampleIndex, timeDomainData, estimatedFundamentalFrequency, sampleRate, drawMode } = drawOptions;
        if (!timeDomainData || !timeDomainData.length || !timeDomainData[0].length) return;

        const bufferLength = timeDomainData[0].length;
        // Find the absolute maximum value for vertical scaling.
        let minSampleValue = timeDomainData[0][0];
        let maxSampleValue = timeDomainData[0][0];
        for (let channelIndex = 0; channelIndex < timeDomainData.length; channelIndex++) {
            for (let sampleIndex = 0; sampleIndex < bufferLength; sampleIndex++) {
                const sampleValue = timeDomainData[channelIndex][sampleIndex];
                if (sampleValue < minSampleValue) minSampleValue = sampleValue;
                else if (sampleValue > maxSampleValue) maxSampleValue = sampleValue;
            }
        }

        const verticalScaleFactor = Math.max(1, Math.abs(minSampleValue), Math.abs(maxSampleValue)) * verticalZoom;

        let drawStartIndex = 0;
        let drawEndIndex = bufferLength - 1;
        let stabilizationOffset = 0;

        // Stabilize waveform view by finding a zero-crossing if possible
        if (drawMode === "continuous" && bufferLength < sampleRate) {
            const zeroCrossingThreshold = (minSampleValue + maxSampleValue) * 0.5 + 0.001;
            const estimatedPeriod = sampleRate / estimatedFundamentalFrequency;
            const periodsToDisplay = Math.floor(bufferLength / estimatedPeriod) - 1;

            // Find first rising edge
            while (timeDomainData[0][wrap(stabilizationOffset++, startSampleIndex, bufferLength)] > zeroCrossingThreshold && stabilizationOffset < bufferLength);
            if (stabilizationOffset >= bufferLength - 1) {
                stabilizationOffset = 0;
            } else {
                // Find next falling edge
                while (timeDomainData[0][wrap(stabilizationOffset++, startSampleIndex, bufferLength)] < zeroCrossingThreshold && stabilizationOffset < bufferLength);
                if (stabilizationOffset >= bufferLength - 1) {
                    stabilizationOffset = 0;
                }
            }

            const drawableLength = periodsToDisplay > 0 && isFinite(estimatedPeriod) ? Math.min(estimatedPeriod * periodsToDisplay, bufferLength - stabilizationOffset) : bufferLength - stabilizationOffset;
            drawStartIndex = Math.round(stabilizationOffset + drawableLength * horizontalZoomOffset);
            drawEndIndex = Math.round(stabilizationOffset + drawableLength / horizontalZoom + drawableLength * horizontalZoomOffset);
        } else {
            drawStartIndex = Math.round(bufferLength * horizontalZoomOffset);
            drawEndIndex = Math.round(bufferLength / horizontalZoom + bufferLength * horizontalZoomOffset);
        }

        const leftMargin = 50;
        const bottomMargin = 20;
        const heightPerChannel = (canvasHeight - bottomMargin) / timeDomainData.length;
        const eventsToDraw = this.drawGrid(ctx, canvasWidth, canvasHeight, drawStartIndex - stabilizationOffset, drawEndIndex - stabilizationOffset, stabilizationOffset, verticalScaleFactor, drawOptions, EScopeMode.Interleaved);

        const pixelsPerSample = (canvasWidth - leftMargin) / (drawEndIndex - drawStartIndex - 1);
        const horizontalDrawStep = Math.max(1, Math.round(1 / pixelsPerSample)); // Optimization for drawing

        ctx.lineWidth = 2;
        ctx.lineJoin = "round";
        for (let channelIndex = 0; channelIndex < timeDomainData.length; channelIndex++) {
            ctx.beginPath();
            ctx.strokeStyle = `hsl(${channelIndex * 60}, 100%, 85%)`;
            let maxInStep: number;
            let minInStep: number;

            for (let sampleIndex = drawStartIndex; sampleIndex < drawEndIndex; sampleIndex++) {
                const wrappedSampleIndex = wrap(sampleIndex, startSampleIndex, bufferLength);
                const sampleValue = timeDomainData[channelIndex][wrappedSampleIndex];
                const stepCounter = (sampleIndex - drawStartIndex) % horizontalDrawStep;

                if (stepCounter === 0) {
                    maxInStep = sampleValue;
                    minInStep = sampleValue;
                } else {
                    if (sampleValue > maxInStep) maxInStep = sampleValue;
                    if (sampleValue < minInStep) minInStep = sampleValue;
                }

                if (stepCounter !== horizontalDrawStep - 1) continue;

                const x = (sampleIndex - drawStartIndex) * pixelsPerSample + leftMargin;
                let y = heightPerChannel * (channelIndex + 0.5 - maxInStep / verticalScaleFactor * 0.5);

                if (sampleIndex === drawStartIndex) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);

                if (minInStep !== maxInStep) {
                    y = heightPerChannel * (channelIndex + 0.5 - minInStep / verticalScaleFactor * 0.5);
                    ctx.lineTo(x, y);
                }
            }
            ctx.stroke();
        }

        eventsToDraw.forEach(params => this.drawEvent(ctx, canvasWidth, canvasHeight, ...params));

        if (cursor && cursor.x > leftMargin && cursor.y < canvasHeight - bottomMargin) {
            const statsToDraw: TStatsToDraw = { values: [] };
            const cursorSampleIndex = Math.round(drawStartIndex + (cursor.x - leftMargin) / pixelsPerSample);
            statsToDraw.values = [];
            statsToDraw.x = (cursorSampleIndex - drawStartIndex) * pixelsPerSample + leftMargin;
            statsToDraw.xLabel = (cursorSampleIndex - stabilizationOffset).toFixed(0);
            const wrappedCursorSampleIndex = wrap(cursorSampleIndex, startSampleIndex, bufferLength);
            for (let channelIndex = 0; channelIndex < timeDomainData.length; channelIndex++) {
                const sampleValue = timeDomainData[channelIndex][wrappedCursorSampleIndex];
                if (typeof sampleValue === "number") statsToDraw.values.push(sampleValue);
            }
            this.drawStats(ctx, canvasWidth, canvasHeight, statsToDraw);
        }
    }
    /**
     * Draws the scope in oscilloscope mode.
     * This function overlays all channel waveforms in a single view, much like a traditional oscilloscope.
     * The y-axis represents amplitude, and the x-axis represents time (in samples).
     * It shares the same stabilization and min/max drawing optimization logic as the interleaved mode.
     * @param {CanvasRenderingContext2D} ctx The canvas rendering context.
     * @param {number} canvasWidth The width of the canvas.
     * @param {number} canvasHeight The height of the canvas.
     * @param {TDrawOptions} drawOptions The data and options for drawing.
     * @param {number} horizontalZoom The horizontal zoom level.
     * @param {number} horizontalZoomOffset The horizontal zoom offset.
     * @param {number} verticalZoom The vertical zoom level.
     * @param {{ x: number; y: number }} [cursor] The current cursor position.
     */
    static drawOscilloscope(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number, drawOptions: TDrawOptions, horizontalZoom: number, horizontalZoomOffset: number, verticalZoom: number, cursor?: { x: number; y: number }) {
        this.drawBackground(ctx, canvasWidth, canvasHeight);
        if (!drawOptions) return;
        const { startSampleIndex, timeDomainData, estimatedFundamentalFrequency, sampleRate, drawMode } = drawOptions;
        if (!timeDomainData || !timeDomainData.length || !timeDomainData[0].length) return;

        const bufferLength = timeDomainData[0].length;
        // Find the absolute maximum value for vertical scaling.
        let minSampleValue = timeDomainData[0][0];
        let maxSampleValue = timeDomainData[0][0];
        for (let channelIndex = 0; channelIndex < timeDomainData.length; channelIndex++) {
            for (let sampleIndex = 0; sampleIndex < bufferLength; sampleIndex++) {
                const sampleValue = timeDomainData[channelIndex][sampleIndex];
                if (sampleValue < minSampleValue) minSampleValue = sampleValue;
                else if (sampleValue > maxSampleValue) maxSampleValue = sampleValue;
            }
        }
        const verticalScaleFactor = Math.max(1, Math.abs(minSampleValue), Math.abs(maxSampleValue)) * verticalZoom;

        let drawStartIndex = 0;
        let drawEndIndex = bufferLength - 1;
        let stabilizationOffset = 0;

        // Stabilize waveform view
        if (drawMode === "continuous" && bufferLength < sampleRate) {
            const zeroCrossingThreshold = (minSampleValue + maxSampleValue) * 0.5 + 0.001;
            const estimatedPeriod = sampleRate / estimatedFundamentalFrequency;
            const periodsToDisplay = Math.floor(bufferLength / estimatedPeriod) - 1;

            while (timeDomainData[0][wrap(stabilizationOffset++, startSampleIndex, bufferLength)] > zeroCrossingThreshold && stabilizationOffset < bufferLength);
            if (stabilizationOffset >= bufferLength - 1) {
                stabilizationOffset = 0;
            } else {
                while (timeDomainData[0][wrap(stabilizationOffset++, startSampleIndex, bufferLength)] < zeroCrossingThreshold && stabilizationOffset < bufferLength);
                if (stabilizationOffset >= bufferLength - 1) {
                    stabilizationOffset = 0;
                }
            }
            const drawableLength = periodsToDisplay > 0 && isFinite(estimatedPeriod) ? Math.min(estimatedPeriod * periodsToDisplay, bufferLength - stabilizationOffset) : bufferLength - stabilizationOffset;
            drawStartIndex = Math.round(stabilizationOffset + drawableLength * horizontalZoomOffset);
            drawEndIndex = Math.round(stabilizationOffset + drawableLength / horizontalZoom + drawableLength * horizontalZoomOffset);
        } else {
            drawStartIndex = Math.round(bufferLength * horizontalZoomOffset);
            drawEndIndex = Math.round(bufferLength / horizontalZoom + bufferLength * horizontalZoomOffset);
        }

        const leftMargin = 50;
        const bottomMargin = 20;
        const eventsToDraw = this.drawGrid(ctx, canvasWidth, canvasHeight, drawStartIndex - stabilizationOffset, drawEndIndex - stabilizationOffset, stabilizationOffset, verticalScaleFactor, drawOptions, EScopeMode.Oscilloscope);
        const pixelsPerSample = (canvasWidth - leftMargin) / (drawEndIndex - drawStartIndex - 1);
        const horizontalDrawStep = Math.max(1, Math.round(1 / pixelsPerSample));

        ctx.lineWidth = 2;
        ctx.lineJoin = "round";
        for (let channelIndex = 0; channelIndex < timeDomainData.length; channelIndex++) {
            ctx.beginPath();
            ctx.strokeStyle = timeDomainData.length === 1 ? "white" : `hsl(${channelIndex * 60}, 100%, 85%)`;
            let maxInStep: number;
            let minInStep: number;

            for (let sampleIndex = drawStartIndex; sampleIndex < drawEndIndex; sampleIndex++) {
                const wrappedSampleIndex = wrap(sampleIndex, startSampleIndex, bufferLength);
                const sampleValue = timeDomainData[channelIndex][wrappedSampleIndex];
                const stepCounter = (sampleIndex - drawStartIndex) % horizontalDrawStep;

                if (stepCounter === 0) {
                    maxInStep = sampleValue;
                    minInStep = sampleValue;
                } else {
                    if (sampleValue > maxInStep) maxInStep = sampleValue;
                    if (sampleValue < minInStep) minInStep = sampleValue;
                }

                if (stepCounter !== horizontalDrawStep - 1) continue;

                const x = (sampleIndex - drawStartIndex) * pixelsPerSample + leftMargin;
                let y = (canvasHeight - bottomMargin) * (0.5 - maxInStep / verticalScaleFactor * 0.5);

                if (sampleIndex === drawStartIndex) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);

                if (minInStep !== maxInStep) {
                    y = (canvasHeight - bottomMargin) * (0.5 - minInStep / verticalScaleFactor * 0.5);
                    ctx.lineTo(x, y);
                }
            }
            ctx.stroke();
        }

        eventsToDraw.forEach(params => this.drawEvent(ctx, canvasWidth, canvasHeight, ...params));

        if (cursor && cursor.x > leftMargin && cursor.y < canvasHeight - bottomMargin) {
            const statsToDraw: TStatsToDraw = { values: [] };
            const cursorSampleIndex = Math.round(drawStartIndex + (cursor.x - leftMargin) / pixelsPerSample);
            statsToDraw.values = [];
            statsToDraw.x = (cursorSampleIndex - drawStartIndex) * pixelsPerSample + leftMargin;
            statsToDraw.xLabel = (cursorSampleIndex - stabilizationOffset).toFixed(0);
            const wrappedCursorSampleIndex = wrap(cursorSampleIndex, startSampleIndex, bufferLength);
            for (let channelIndex = 0; channelIndex < timeDomainData.length; channelIndex++) {
                const sampleValue = timeDomainData[channelIndex][wrappedCursorSampleIndex];
                if (typeof sampleValue === "number") statsToDraw.values.push(sampleValue);
            }
            this.drawStats(ctx, canvasWidth, canvasHeight, statsToDraw);
        }
    }
    /**
     * Draws the scope in spectroscope mode.
     * This mode displays the frequency content (spectrum) of the signal. The x-axis represents
     * frequency (either on a linear or logarithmic scale), and the y-axis represents the magnitude
     * of the frequency components in decibels (dB). For each channel, it draws the spectrum of the most
     * recent FFT frame. When using a logarithmic scale, it carefully maps logarithmic frequency ranges to linear pixel space.
     * @param {CanvasRenderingContext2D} ctx The canvas rendering context.
     * @param {number} canvasWidth The width of the canvas.
     * @param {number} canvasHeight The height of the canvas.
     * @param {TDrawOptions} drawOptions The data and options for drawing.
     * @param {number} horizontalZoom The horizontal zoom level.
     * @param {number} horizontalZoomOffset The horizontal zoom offset.
     * @param {{ x: number; y: number }} cursor The current cursor position.
     * @param {EFreqScaleMode} freqScaleMode The frequency scale mode (linear or log).
     */
    static drawSpectroscope(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number, drawOptions: TDrawOptions, horizontalZoom: number, horizontalZoomOffset: number, cursor: { x: number; y: number }, freqScaleMode: EFreqScaleMode) {
        this.drawBackground(ctx, canvasWidth, canvasHeight);
        if (!drawOptions) return;
        const { startSampleIndex, freqDomainData, fftSize, fftOverlap, sampleRate } = drawOptions;
        if (!freqDomainData || !freqDomainData.length || !freqDomainData[0].length) return;

        const frequencyBinCount = fftSize / 2;
        let startFreqDataIndex = startSampleIndex * fftOverlap / 2;
        startFreqDataIndex -= startFreqDataIndex % frequencyBinCount;
        const freqBufferLength = freqDomainData[0].length;

        const leftMargin = 50;
        const bottomMargin = 20;
        const heightPerChannel = (canvasHeight - bottomMargin) / freqDomainData.length;

        if (freqScaleMode === EFreqScaleMode.Logarithmic) {
            const minFrequency = sampleRate / fftSize;
            const maxFrequency = sampleRate / 2;
            if (minFrequency <= 0) return;

            // Calculate the visible frequency range based on zoom and offset
            const fullLogRange = log(maxFrequency) - log(minFrequency);
            const viewLogRange = fullLogRange / horizontalZoom;
            const startLog = log(minFrequency) + horizontalZoomOffset * fullLogRange;
            const endLog = startLog + viewLogRange;
            const startFrequency = pow(10, startLog);
            const endFrequency = pow(10, endLog);

            // Helper functions for frequency/index conversion
            const freqToBinIndex = (freq: number) => freq / maxFrequency * frequencyBinCount;
            const binIndexToFreq = (idx: number) => idx / frequencyBinCount * maxFrequency;

            const startBinIndex = Math.max(1, Math.floor(freqToBinIndex(startFrequency)));
            const endBinIndex = Math.min(frequencyBinCount, Math.ceil(freqToBinIndex(endFrequency)));

            const eventsToDraw = this.drawGrid(ctx, canvasWidth, canvasHeight, startFrequency, endFrequency, 0, 1, drawOptions, EScopeMode.Spectroscope, freqScaleMode);

            for (let channelIndex = 0; channelIndex < freqDomainData.length; channelIndex++) {
                ctx.beginPath();
                ctx.fillStyle = freqDomainData.length === 1 ? "white" : `hsl(${channelIndex * 60}, 100%, 85%)`;

                const getX = (binIdx: number) => leftMargin + (canvasWidth - leftMargin) * (log(binIndexToFreq(binIdx)) - startLog) / viewLogRange;

                const startX = getX(startBinIndex);
                ctx.moveTo(startX, heightPerChannel * (channelIndex + 1));

                // Optimization: group values by pixel column and draw the max value.
                let lastPixelX = -1;
                let maxMagnitudeInStep = -Infinity;

                for (let binIndex = startBinIndex; binIndex < endBinIndex; binIndex++) {
                    const currentPixelX = Math.round(getX(binIndex));
                    const wrappedBinIndex = wrap(binIndex, startFreqDataIndex, freqBufferLength);
                    const magnitude = freqDomainData[channelIndex][wrappedBinIndex];

                    if (currentPixelX === lastPixelX) { // Still on the same pixel, find the max
                        if (magnitude > maxMagnitudeInStep) maxMagnitudeInStep = magnitude;
                    } else { // Moved to a new pixel
                        if (lastPixelX !== -1) { // Draw the max value of the previous pixel group
                            const y = heightPerChannel * (channelIndex + 1 - Math.min(1, Math.max(0, maxMagnitudeInStep / 100 + 1)));
                            ctx.lineTo(lastPixelX, y);
                        }
                        // Start a new group
                        lastPixelX = currentPixelX;
                        maxMagnitudeInStep = magnitude;
                    }
                }
                // Draw the last collected step
                if (lastPixelX !== -1) {
                    const y = heightPerChannel * (channelIndex + 1 - Math.min(1, Math.max(0, maxMagnitudeInStep / 100 + 1)));
                    ctx.lineTo(lastPixelX, y);
                }

                const endX = getX(endBinIndex - 1);
                ctx.lineTo(endX, heightPerChannel * (channelIndex + 1));
                ctx.closePath();
                ctx.fill();
            }
            eventsToDraw.forEach(params => this.drawEvent(ctx, canvasWidth, canvasHeight, ...params));
            if (cursor && cursor.x > leftMargin && cursor.y < canvasHeight - bottomMargin) {
                const statsToDraw: TStatsToDraw = { values: [] };
                const canvasDrawableWidth = canvasWidth - leftMargin;
                const logarithmicCursorFreq = startLog + (cursor.x - leftMargin) / canvasDrawableWidth * viewLogRange;
                const cursorFrequency = pow(10, logarithmicCursorFreq);
                const cursorBinIndex = Math.round(freqToBinIndex(cursorFrequency));
                if (cursorBinIndex >= 0 && cursorBinIndex < frequencyBinCount) {
                    statsToDraw.x = cursor.x;
                    statsToDraw.xLabel = cursorFrequency.toFixed(0);
                    const wrappedCursorBinIndex = wrap(cursorBinIndex, startFreqDataIndex, freqBufferLength);
                    for (let channelIndex = 0; channelIndex < freqDomainData.length; channelIndex++) {
                        const magnitude = freqDomainData[channelIndex][wrappedCursorBinIndex];
                        if (typeof magnitude === "number") statsToDraw.values.push(magnitude);
                    }
                    this.drawStats(ctx, canvasWidth, canvasHeight, statsToDraw);
                }
            }
        } else { // Linear Scale
            const startBinIndex = freqBufferLength - frequencyBinCount + Math.round(frequencyBinCount * horizontalZoomOffset);
            const endBinIndex = freqBufferLength - frequencyBinCount + Math.round(frequencyBinCount / horizontalZoom + frequencyBinCount * horizontalZoomOffset);
            const eventsToDraw = this.drawGrid(ctx, canvasWidth, canvasHeight, startBinIndex, endBinIndex, 0, 1, drawOptions, EScopeMode.Spectroscope, freqScaleMode);

            const pixelsPerBin = (canvasWidth - leftMargin) / (endBinIndex - startBinIndex - 1);
            const horizontalDrawStep = Math.max(1, Math.round(1 / pixelsPerBin));

            for (let channelIndex = 0; channelIndex < freqDomainData.length; channelIndex++) {
                ctx.beginPath();
                ctx.fillStyle = freqDomainData.length === 1 ? "white" : `hsl(${channelIndex * 60}, 100%, 85%)`;
                let maxMagnitudeInStep;
                for (let binIndex = startBinIndex; binIndex < endBinIndex; binIndex++) {
                    const wrappedBinIndex = wrap(binIndex, startFreqDataIndex, freqBufferLength);
                    const magnitude = freqDomainData[channelIndex][wrappedBinIndex];
                    const stepCounter = (binIndex - startBinIndex) % horizontalDrawStep;

                    if (stepCounter === 0) maxMagnitudeInStep = magnitude;
                    if (stepCounter !== horizontalDrawStep - 1) {
                        if (stepCounter !== 0 && magnitude > maxMagnitudeInStep) maxMagnitudeInStep = magnitude;
                        continue;
                    }

                    const x = (binIndex - startBinIndex) * pixelsPerBin + leftMargin;
                    const y = heightPerChannel * (channelIndex + 1 - Math.min(1, Math.max(0, maxMagnitudeInStep / 100 + 1)));
                    if (binIndex === startBinIndex) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.lineTo(canvasWidth, heightPerChannel * (channelIndex + 1));
                ctx.lineTo(leftMargin, heightPerChannel * (channelIndex + 1));
                ctx.closePath();
                ctx.fill();
            }
            eventsToDraw.forEach(params => this.drawEvent(ctx, canvasWidth, canvasHeight, ...params));
            if (cursor && cursor.x > leftMargin && cursor.y < canvasHeight - bottomMargin) {
                const statsToDraw: TStatsToDraw = { values: [] };
                const cursorBinIndex = startBinIndex + Math.round((cursor.x - leftMargin) / pixelsPerBin);
                statsToDraw.x = (cursorBinIndex - startBinIndex) * pixelsPerBin + leftMargin;
                statsToDraw.xLabel = indexToFreq(cursorBinIndex, frequencyBinCount, drawOptions.sampleRate).toFixed(0);
                const wrappedCursorBinIndex = wrap(cursorBinIndex, startFreqDataIndex, freqBufferLength);
                for (let channelIndex = 0; channelIndex < freqDomainData.length; channelIndex++) {
                    const magnitude = freqDomainData[channelIndex][wrappedCursorBinIndex];
                    if (typeof magnitude === "number") statsToDraw.values.push(magnitude);
                }
                this.drawStats(ctx, canvasWidth, canvasHeight, statsToDraw);
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
     * @param {CanvasRenderingContext2D} spectrogramCacheContext The temporary canvas context holding the full spectrogram.
     * @param {number} canvasWidth The width of the canvas.
     * @param {number} canvasHeight The height of the canvas.
     * @param {TDrawOptions} drawOptions The data and options for drawing.
     * @param {number} horizontalZoom The horizontal zoom level.
     * @param {number} horizontalZoomOffset The horizontal zoom offset.
     * @param {{ x: number; y: number }} cursor The current cursor position.
     * @param {EFreqScaleMode} freqScaleMode The frequency scale mode (linear or log).
     */
    static drawSpectrogram(ctx: CanvasRenderingContext2D, spectrogramCacheContext: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number, drawOptions: TDrawOptions, horizontalZoom: number, horizontalZoomOffset: number, cursor: { x: number; y: number }, freqScaleMode: EFreqScaleMode) {
        this.drawBackground(ctx, canvasWidth, canvasHeight);
        if (!drawOptions) return;
        const { startSampleIndex, freqDomainData, fftSize, fftOverlap, sampleRate } = drawOptions;
        if (!freqDomainData || !freqDomainData.length || !freqDomainData[0].length) return;

        const frequencyBinCount = fftSize / 2;
        let startFreqDataIndex = startSampleIndex * fftOverlap / 2;
        startFreqDataIndex -= startFreqDataIndex % frequencyBinCount; // Align to frame start

        const frameCount = freqDomainData[0].length / frequencyBinCount;
        const startFrameIndex = Math.floor(frameCount * horizontalZoomOffset);
        const endFrameIndex = Math.ceil(frameCount / horizontalZoom + frameCount * horizontalZoomOffset);

        const startDataIndex = startFrameIndex * frequencyBinCount;
        const endDataIndex = endFrameIndex * frequencyBinCount;

        const eventsToDraw = this.drawGrid(ctx, canvasWidth, canvasHeight, startDataIndex, endDataIndex, 0, 1, drawOptions, EScopeMode.Spectrogram, freqScaleMode);
        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        ctx.imageSmoothingEnabled = false;

        const leftMargin = 50;
        const bottomMargin = 20;

        // Calculate source region from the cache canvas, handling buffer wrap-around
        const sourceStartX = wrap(startFrameIndex, startFreqDataIndex / frequencyBinCount, frameCount);
        const sourceEndX = sourceStartX + (endFrameIndex - startFrameIndex);

        if (sourceEndX > frameCount) { // The selection wraps around the end of the cache canvas
            const splitPoint = frameCount - sourceStartX;
            const destWidth1 = splitPoint / (sourceEndX - sourceStartX) * (canvasWidth - leftMargin);
            const destWidth2 = (1 - splitPoint / (sourceEndX - sourceStartX)) * (canvasWidth - leftMargin);
            // Draw first part (from source start to end of cache)
            ctx.drawImage(spectrogramCacheContext.canvas, sourceStartX, 0, splitPoint, spectrogramCacheContext.canvas.height, leftMargin, 0, destWidth1, canvasHeight - bottomMargin);
            // Draw second part (from beginning of cache)
            ctx.drawImage(spectrogramCacheContext.canvas, 0, 0, sourceEndX - frameCount - 0.01, spectrogramCacheContext.canvas.height, destWidth1 + leftMargin, 0, destWidth2, canvasHeight - bottomMargin);
        } else { // The selection is contiguous
            ctx.drawImage(spectrogramCacheContext.canvas, sourceStartX, 0, sourceEndX - sourceStartX, spectrogramCacheContext.canvas.height, leftMargin, 0, canvasWidth - leftMargin, canvasHeight - bottomMargin);
        }

        ctx.restore();
        eventsToDraw.forEach(params => this.drawEvent(ctx, canvasWidth, canvasHeight, ...params));

        if (cursor && cursor.x > leftMargin && cursor.y < canvasHeight - bottomMargin) {
            const statsToDraw: TStatsToDraw = { values: [] };
            const pixelsPerFrame = (canvasWidth - leftMargin) / (endFrameIndex - startFrameIndex);
            const cursorFrameIndex = startFrameIndex + Math.floor((cursor.x - leftMargin) / pixelsPerFrame);
            const cursorChannelIndex = Math.floor(cursor.y / ((canvasHeight - bottomMargin) / freqDomainData.length));
            let cursorBinIndex: number;
            let cursorFrequency: number;

            if (freqScaleMode === EFreqScaleMode.Logarithmic) {
                const heightPerChannel = (canvasHeight - bottomMargin) / freqDomainData.length;
                const yInChannel = cursor.y - cursorChannelIndex * heightPerChannel;
                const minFrequency = sampleRate / fftSize;
                const maxFrequency = sampleRate / 2;
                if (minFrequency > 0) {
                    const logMinFreq = log(minFrequency);
                    const logMaxFreq = log(maxFrequency);
                    const logPosition = (heightPerChannel - yInChannel) / heightPerChannel;
                    cursorFrequency = pow(10, logMinFreq + logPosition * (logMaxFreq - logMinFreq));
                    cursorBinIndex = Math.floor(cursorFrequency / maxFrequency * frequencyBinCount);
                }
            } else { // Linear Scale
                const pixelsPerBin = (canvasHeight - bottomMargin) / freqDomainData.length / frequencyBinCount;
                const yInChannelView = (cursorChannelIndex + 1) * (canvasHeight - bottomMargin) / freqDomainData.length - cursor.y;
                cursorBinIndex = Math.floor(yInChannelView / pixelsPerBin);
                cursorFrequency = indexToFreq(cursorBinIndex, frequencyBinCount, sampleRate);
            }

            if (typeof cursorFrequency === "number") {
                const dataIndex = cursorFrameIndex * frequencyBinCount + cursorBinIndex;
                const wrappedDataIndex = wrap(dataIndex, startFreqDataIndex, freqDomainData[0].length);
                const magnitude = freqDomainData[cursorChannelIndex][wrappedDataIndex];
                if (typeof magnitude === "number") statsToDraw.values = [magnitude];
                statsToDraw.x = (cursorFrameIndex - startFrameIndex + 0.5) * pixelsPerFrame + leftMargin;
                statsToDraw.y = cursor.y;
                statsToDraw.xLabel = cursorFrameIndex.toFixed(0);
                statsToDraw.yLabel = cursorFrequency.toFixed(0);
                this.drawStats(ctx, canvasWidth, canvasHeight, statsToDraw);
            }
        }
    }
    /**
     * Renders new spectrogram data to the temporary cache canvas.
     * This is a helper function for the Spectrogram mode. It's responsible for rendering new frequency data
     * onto the off-screen cache canvas as it arrives. It iterates through the new FFT frames and draws them
     * as vertical lines of pixels, where each pixel's color and brightness correspond to the signal's power
     * at a specific frequency. This process happens "offline" from the main animation loop to avoid blocking rendering.
     * @param {CanvasRenderingContext2D} spectrogramCacheContext The temporary canvas rendering context.
     * @param {TDrawOptions} drawOptions The data and options for drawing.
     * @param {number} lastDrawnSampleIndex The last sample index that was drawn.
     * @param {EFreqScaleMode} freqScaleMode The frequency scale mode (linear or log).
     * @returns {number} The new last sample index.
     */
    static drawOfflineSpectrogram(spectrogramCacheContext: CanvasRenderingContext2D, drawOptions: TDrawOptions, lastDrawnSampleIndex: number, freqScaleMode: EFreqScaleMode) {
        if (!drawOptions) return lastDrawnSampleIndex;
        const { startSampleIndex, freqDomainData, fftSize, fftOverlap, sampleRate } = drawOptions;
        if (!freqDomainData || !freqDomainData.length || !freqDomainData[0].length) return lastDrawnSampleIndex;

        const frequencyBinCount = fftSize / 2;
        let startFreqDataIndex = startSampleIndex * fftOverlap / 2;
        startFreqDataIndex -= startFreqDataIndex % frequencyBinCount; // Align to frame boundary

        const { width: canvasWidth, height: canvasHeight } = spectrogramCacheContext.canvas;
        const freqBufferLength = freqDomainData[0].length;
        const startDrawIndex = wrap(lastDrawnSampleIndex, 0, freqBufferLength);
        const endDrawIndex = startDrawIndex >= startFreqDataIndex ? startFreqDataIndex + freqBufferLength : startFreqDataIndex;

        if (endDrawIndex - startDrawIndex < 0) return lastDrawnSampleIndex;

        const startFrameIndex = Math.floor(startDrawIndex / frequencyBinCount);
        const endFrameIndex = Math.ceil(endDrawIndex / frequencyBinCount);
        const heightPerChannel = canvasHeight / freqDomainData.length;
        const spectrogramWidthInFrames = freqBufferLength / frequencyBinCount;

        if (canvasWidth !== spectrogramWidthInFrames) spectrogramCacheContext.canvas.width = spectrogramWidthInFrames;

        if (freqScaleMode === EFreqScaleMode.Logarithmic) {
            const minFrequency = sampleRate / fftSize;
            const maxFrequency = sampleRate / 2;
            if (minFrequency <= 0) return lastDrawnSampleIndex;
            const logMinFreq = log(minFrequency);
            const logMaxFreq = log(maxFrequency);
            const logPosToFreq = (pos: number) => pow(10, logMinFreq + pos * (logMaxFreq - logMinFreq));
            const freqToBinIndex = (freq: number) => Math.floor(freq / maxFrequency * frequencyBinCount);

            for (let channelIndex = 0; channelIndex < freqDomainData.length; channelIndex++) {
                for (let frameIndex = startFrameIndex; frameIndex < endFrameIndex; frameIndex++) {
                    for (let yPixel = 0; yPixel < heightPerChannel; yPixel++) {
                        // For each vertical pixel, calculate the corresponding frequency on a log scale
                        const logPosition = (heightPerChannel - yPixel - 1) / heightPerChannel;
                        const frequency = logPosToFreq(logPosition);
                        const binIndex = freqToBinIndex(frequency);
                        if (binIndex >= frequencyBinCount || binIndex < 0) continue;

                        const magnitude = freqDomainData[channelIndex][wrap(binIndex, frameIndex * frequencyBinCount, freqBufferLength)];
                        const normalizedMagnitude = Math.min(1, Math.max(0, (magnitude + 10) / 100 + 1));
                        if (normalizedMagnitude === 0) continue;

                        // Map magnitude to a color (hue) and luminosity
                        const hue = (normalizedMagnitude * 180 + 240) % 360;
                        const luminosity = normalizedMagnitude * 50;
                        spectrogramCacheContext.fillStyle = `hsl(${hue}, 100%, ${luminosity}%)`;
                        spectrogramCacheContext.fillRect(frameIndex % spectrogramWidthInFrames, channelIndex * heightPerChannel + yPixel, 1, 1);
                    }
                }
            }
        } else { // Linear Scale
            const pixelsPerBin = heightPerChannel / frequencyBinCount;
            const step = Math.max(1, Math.round(frequencyBinCount / heightPerChannel));
            for (let channelIndex = 0; channelIndex < freqDomainData.length; channelIndex++) {
                for (let frameIndex = startFrameIndex; frameIndex < endFrameIndex; frameIndex++) {
                    let maxMagnitudeInStep;
                    spectrogramCacheContext.fillStyle = "black";
                    spectrogramCacheContext.fillRect(frameIndex % spectrogramWidthInFrames, channelIndex * heightPerChannel, 1, heightPerChannel); // Clear column
                    for (let binIndex = 0; binIndex < frequencyBinCount; binIndex++) {
                        const magnitude = freqDomainData[channelIndex][wrap(binIndex, frameIndex * frequencyBinCount, freqBufferLength)];
                        const stepCounter = binIndex % step;
                        if (stepCounter === 0) maxMagnitudeInStep = magnitude;
                        if (stepCounter !== step - 1) {
                            if (stepCounter !== 0 && magnitude > maxMagnitudeInStep) maxMagnitudeInStep = magnitude;
                            continue;
                        }

                        const normalizedMagnitude = Math.min(1, Math.max(0, (maxMagnitudeInStep + 10) / 100 + 1));
                        if (normalizedMagnitude === 0) continue;

                        const hue = (normalizedMagnitude * 180 + 240) % 360;
                        const luminosity = normalizedMagnitude * 50;
                        spectrogramCacheContext.fillStyle = `hsl(${hue}, 100%, ${luminosity}%)`;
                        spectrogramCacheContext.fillRect(frameIndex % spectrogramWidthInFrames, (frequencyBinCount - binIndex - 1) * pixelsPerBin + channelIndex * heightPerChannel, 1, Math.max(1, pixelsPerBin));
                    }
                }
            }
        }
        return wrap(endDrawIndex, 0, freqBufferLength);
    }
    /**
     * Draws the background of the canvas.
     * @param {CanvasRenderingContext2D} ctx The canvas rendering context.
     * @param {number} canvasWidth The width of the canvas.
     * @param {number} canvasHeight The height of the canvas.
     */
    static drawBackground(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number) {
        ctx.save();
        ctx.fillStyle = "#181818";
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        ctx.restore();
    }
    /**
     * Draws the grid lines and labels for axes.
     * @param {CanvasRenderingContext2D} ctx The canvas rendering context.
     * @param {number} canvasWidth The width of the canvas.
     * @param {number} canvasHeight The height of the canvas.
     * @param {number} drawStartValue The starting index (sample or frequency bin) for drawing.
     * @param {number} drawEndValue The ending index for drawing.
     * @param {number} stabilizationOffset The zero-crossing offset for stabilization.
     * @param {number} verticalScaleFactor The vertical scaling factor.
     * @param {TDrawOptions} drawOptions The data and options for drawing.
     * @param {EScopeMode} mode The current scope mode.
     * @param {EFreqScaleMode} [freqScaleMode] The frequency scale mode.
     * @returns {[number, { type: string; data: any }[]][]} An array of events to be drawn.
     */
    static drawGrid(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number, drawStartValue: number, drawEndValue: number, stabilizationOffset: number, verticalScaleFactor: number, drawOptions: TDrawOptions, mode: EScopeMode, freqScaleMode?: EFreqScaleMode) {
        ctx.save();
        ctx.setLineDash([]);
        ctx.lineWidth = 1;
        const { events, bufferSize, fftSize, fftOverlap, sampleRate } = drawOptions;
        const isFrequencyDomain = mode === EScopeMode.Spectrogram || mode === EScopeMode.Spectroscope;
        const frequencyBinCount = fftSize / 2;
        const channelCount = mode === EScopeMode.Oscilloscope ? 1 : isFrequencyDomain ? drawOptions.freqDomainData.length : drawOptions.timeDomainData.length;
        const unit = mode === EScopeMode.Spectrogram ? "Hz/frame" : mode === EScopeMode.Spectroscope ? "dB/Hz" : "lvl/samp";
        const eventsToDraw: [number, { type: string; data: any }[]][] = [];

        const leftMargin = 50;
        const bottomMargin = 20;
        const eventStrokeStyle = "#ff8800";
        const bufferStrokeStyle = "#004000";
        const normalStrokeStyle = "#404040";
        ctx.fillStyle = "#DDDD99";
        ctx.font = "10px Consolas, monospace";

        // Main axes
        ctx.textAlign = "right";
        ctx.textBaseline = "middle";
        ctx.fillText(unit, 45, canvasHeight - 10, 40);
        ctx.textAlign = "center";
        ctx.strokeStyle = "white";
        ctx.beginPath();
        ctx.moveTo(leftMargin, 0);
        ctx.lineTo(leftMargin, canvasHeight - bottomMargin);
        ctx.lineTo(canvasWidth, canvasHeight - bottomMargin);
        ctx.stroke();

        // X-Axis Grid
        if (mode === EScopeMode.Spectroscope && freqScaleMode === EFreqScaleMode.Logarithmic) {
            const startFreq = drawStartValue;
            const endFreq = drawEndValue;
            if (startFreq > 0) {
                const logStartFreq = log(startFreq);
                const logEndFreq = log(endFreq);
                const magnitude = Math.floor(logStartFreq);
                for (let powerOf10 = magnitude; powerOf10 < logEndFreq + 1; powerOf10++) {
                    for (let multiplier = 1; multiplier < 10; multiplier++) {
                        const freq = multiplier * pow(10, powerOf10);
                        if (freq < startFreq) continue;
                        if (freq > endFreq) break;
                        const x = leftMargin + (canvasWidth - leftMargin) * (log(freq) - logStartFreq) / (logEndFreq - logStartFreq);
                        const isMajor = multiplier === 1;
                        ctx.strokeStyle = (isMajor || multiplier === 5) ? bufferStrokeStyle : normalStrokeStyle;
                        ctx.beginPath();
                        ctx.moveTo(x, 0);
                        ctx.lineTo(x, canvasHeight - bottomMargin);
                        ctx.stroke();
                        if (isMajor || multiplier === 5 || (logEndFreq - logStartFreq < 3 && (multiplier === 2 || multiplier === 7))) {
                            ctx.fillText(freq >= 1000 ? `${(freq / 1000).toFixed(1)}k` : freq.toFixed(0), Math.min(x, canvasWidth - 20), canvasHeight - 10);
                        }
                    }
                }
            }
        } else { // Linear X-Axis (Time-based for Osc/Spectrogram, Freq-based for linear Spectroscope)
            let rangeStart = drawStartValue;
            let rangeEnd = drawEndValue;
            if (mode === EScopeMode.Spectroscope) { // linear spectroscope uses bin indices
                rangeStart = 0;
                rangeEnd = frequencyBinCount;
            }
            const samplesPerPixel = isFrequencyDomain ? fftOverlap / 2 : 1;
            let startBuffer = rangeStart / bufferSize / samplesPerPixel;
            let endBuffer = rangeEnd / bufferSize / samplesPerPixel;
            const horizontalGridStep = 2 ** Math.ceil(Math.log2(endBuffer - startBuffer)) / 8;
            startBuffer -= startBuffer % horizontalGridStep;
            endBuffer -= endBuffer % horizontalGridStep;
            let currentBufferIndex = (drawOptions.startBufferIndex || 0) + Math.round(stabilizationOffset / bufferSize / samplesPerPixel);
            if (isFrequencyDomain) currentBufferIndex -= currentBufferIndex % (frequencyBinCount / bufferSize / fftOverlap / 2);

            for (let gridLineIndex = startBuffer; gridLineIndex < endBuffer; gridLineIndex += horizontalGridStep) {
                const x = (gridLineIndex * bufferSize * samplesPerPixel - rangeStart) / (rangeEnd - rangeStart - 1) * (canvasWidth - leftMargin) + leftMargin;
                if (x < leftMargin) continue;
                ctx.strokeStyle = gridLineIndex % 1 === 0 ? bufferStrokeStyle : normalStrokeStyle;
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvasHeight - bottomMargin);
                ctx.stroke();
                if (mode === EScopeMode.Spectrogram) {
                    const fftFrameIndex = gridLineIndex / (frequencyBinCount / bufferSize) * fftOverlap / 2;
                    if (fftFrameIndex % 1 === 0) ctx.fillText(fftFrameIndex.toFixed(), Math.min(x, canvasWidth - 20), canvasHeight - 10);
                } else if (mode === EScopeMode.Spectroscope) {
                    const freq = indexToFreq(gridLineIndex * bufferSize, frequencyBinCount, sampleRate);
                    ctx.fillText(freq.toFixed(0), Math.min(x, canvasWidth - 20), canvasHeight - 10);
                } else {
                    ctx.fillText((gridLineIndex * bufferSize).toFixed(), Math.min(x, canvasWidth - 20), canvasHeight - 10);
                }
            }
            if (events && mode !== EScopeMode.Spectroscope) {
                ctx.strokeStyle = eventStrokeStyle;
                for (let j = Math.ceil(startBuffer); j < endBuffer; j++) {
                    if (events[currentBufferIndex + j] && events[currentBufferIndex + j].length) {
                        const x = (j * bufferSize * samplesPerPixel - rangeStart) / (rangeEnd - rangeStart - 1) * (canvasWidth - leftMargin) + leftMargin;
                        if (x < leftMargin) continue;
                        eventsToDraw.push([x, events[currentBufferIndex + j]]);
                        ctx.beginPath();
                        ctx.moveTo(x, 0);
                        ctx.lineTo(x, canvasHeight - bottomMargin);
                        ctx.stroke();
                    }
                }
            }
        }

        // Y-Axis Grid
        const heightPerChannel = (canvasHeight - bottomMargin) / channelCount;
        ctx.textAlign = "right";
        ctx.textBaseline = "middle";

        if (mode === EScopeMode.Spectrogram && freqScaleMode === EFreqScaleMode.Logarithmic) {
            const minFrequency = sampleRate / fftSize;
            const maxFrequency = sampleRate / 2;
            if (minFrequency > 0) {
                const logMinFreq = log(minFrequency);
                const logMaxFreq = log(maxFrequency);
                for (let i = 0; i < channelCount; i++) {
                    const magnitude = Math.floor(logMinFreq);
                    for (let powerOf10 = magnitude; powerOf10 < logMaxFreq + 1; powerOf10++) {
                        for (let multiplier = 1; multiplier < 10; multiplier++) {
                            const freq = multiplier * pow(10, powerOf10);
                            if (freq < minFrequency) continue;
                            if (freq > maxFrequency) break;
                            const logPosition = (log(freq) - logMinFreq) / (logMaxFreq - logMinFreq);
                            const y = i * heightPerChannel + (1 - logPosition) * heightPerChannel;
                            if (y < i * heightPerChannel || y > (i + 1) * heightPerChannel) continue;
                            const isMajor = multiplier === 1;
                            const isMedium = multiplier === 5;
                            ctx.strokeStyle = (isMajor || isMedium) ? bufferStrokeStyle : normalStrokeStyle;
                            ctx.beginPath();
                            ctx.moveTo(leftMargin, y);
                            ctx.lineTo(canvasWidth, y);
                            ctx.stroke();
                            if (isMajor || isMedium) {
                                ctx.fillText(freq.toFixed(0), 45, Math.max(y, 10));
                            }
                        }
                    }
                }
            }
        } else { // Linear Y-Axis
            ctx.strokeStyle = normalStrokeStyle;
            ctx.beginPath();
            let verticalGridStep = verticalScaleFactor === 1 && isFrequencyDomain ? frequencyBinCount / 4 : 0.25;
            if (!isFrequencyDomain) {
                while (verticalScaleFactor / verticalGridStep > 2) verticalGridStep *= 2;
            }
            const drawHLine = (y: number, yLabel: string) => {
                ctx.moveTo(leftMargin, y);
                ctx.lineTo(canvasWidth, y);
                ctx.fillText(yLabel, 45, Math.max(y, 10));
            };
            for (let i = 0; i < (mode === EScopeMode.Oscilloscope ? 1 : channelCount); i++) {
                let y = (i + 0.5) * heightPerChannel;
                let positionRatio = 0.5;
                const getYLabel = () => {
                    if (mode === EScopeMode.Spectrogram) return indexToFreq(frequencyBinCount * positionRatio, frequencyBinCount, sampleRate).toFixed(0);
                    if (mode === EScopeMode.Spectroscope) return (-100 + 100 * positionRatio).toFixed(0);
                    return (-verticalScaleFactor + 2 * verticalScaleFactor * positionRatio).toFixed(2);
                };
                let yLabel = getYLabel();
                drawHLine(y, yLabel);
                const verticalRange = isFrequencyDomain ? frequencyBinCount / 2 : verticalScaleFactor;
                for (let j = verticalGridStep; j < verticalRange; j += verticalGridStep) {
                    const vFactor = isFrequencyDomain ? frequencyBinCount / 2 : verticalScaleFactor;
                    positionRatio = 0.5 - j / vFactor / 2; // (isFrequencyDomain ? 1 : 2);
                    y = (i + 0.5 + j / vFactor / 2) * heightPerChannel;
                    yLabel = getYLabel();
                    drawHLine(y, yLabel);
                    // if (isFrequencyDomain) continue;
                    positionRatio = 0.5 + j / vFactor / 2;
                    y = (i + 0.5 - j / vFactor / 2) * heightPerChannel;
                    yLabel = getYLabel();
                    drawHLine(y, yLabel);
                }
            }
            ctx.stroke();
        }

        // Draw separators for interleaved channels
        ctx.beginPath();
        ctx.setLineDash([4, 2]);
        ctx.strokeStyle = "white";
        for (let i = 1; i < channelCount; i++) {
            ctx.moveTo(0, i * heightPerChannel);
            ctx.lineTo(canvasWidth, i * heightPerChannel);
        }
        ctx.stroke();
        ctx.restore();
        return eventsToDraw;
    }
    /**
     * Draws event information on the canvas.
     * @param {CanvasRenderingContext2D} ctx The canvas rendering context.
     * @param {number} canvasWidth The width of the canvas.
     * @param {number} canvasHeight The height of the canvas.
     * @param {number} x The x-coordinate for the event display.
     * @param {{ type: string; data: any }[]} eventData The array of events to display.
     */
    static drawEvent(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number, x: number, eventData: { type: string; data: any }[]) {
        ctx.save();
        ctx.font = "bold 12px Consolas, monospace";
        ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
        const eventStrings = eventData.map(event => (event.data.path ? `${event.data.path}: ${event.data.value}` : `${event.type}: ${event.data.join(",")}`));
        const textWidth = Math.max(...eventStrings.map(s => ctx.measureText(s).width)) + 5;
        if (canvasWidth - x >= textWidth) { // Draw on the right of the line
            ctx.fillRect(x, 0, textWidth, eventData.length * 15 + 2);
            ctx.textAlign = "left";
        } else { // Draw on the left
            ctx.fillRect(x - textWidth, 0, textWidth, eventData.length * 15 + 2);
            ctx.textAlign = "right";
        }
        ctx.fillStyle = "#DDDD99";
        eventStrings.forEach((s, i) => ctx.fillText(s, x, (i + 1) * 15, textWidth));
        ctx.restore();
    }
    /**
     * Draws statistics (cursor lines and values) on the canvas.
     * @param {CanvasRenderingContext2D} ctx The canvas rendering context.
     * @param {number} canvasWidth The width of the canvas.
     * @param {number} canvasHeight The height of the canvas.
     * @param {TStatsToDraw} statsToDraw The statistics data to draw.
     */
    static drawStats(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number, statsToDraw: TStatsToDraw) {
        const leftMargin = 50;
        const bottomMargin = 20;
        ctx.save();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#b0b0b0";
        ctx.beginPath();
        const { x, y, xLabel, yLabel, values } = statsToDraw;
        // Draw cursor lines
        if (x) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvasHeight - bottomMargin);
        }
        if (y) {
            ctx.moveTo(leftMargin, y);
            ctx.lineTo(canvasWidth, y);
        }
        ctx.stroke();

        // Draw labels with background
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        if (xLabel) ctx.fillRect(Math.min(x - 20, canvasWidth - 40), canvasHeight - 18, 40, 16);
        if (yLabel) ctx.fillRect(5, Math.max(0, y - 8), 45, 16);

        ctx.fillStyle = "#DDDD99";
        ctx.font = "bold 12px Consolas, monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        if (xLabel) ctx.fillText(xLabel, Math.min(x, canvasWidth - 20), canvasHeight - 10, 40);

        ctx.textAlign = "right";
        if (yLabel) ctx.fillText(yLabel, 40, Math.max(10, y), 40);

        // Draw values panel
        ctx.textBaseline = "bottom";
        const valueStrings: string[] = [];
        values.forEach(v => valueStrings.push(v.toFixed(7)));
        ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
        ctx.fillRect(canvasWidth - 70, 0, 80, valueStrings.length * 15 + 5);
        ctx.fillStyle = "#DDDD99";
        valueStrings.forEach((s, i) => ctx.fillText(s, canvasWidth - 2, (i + 1) * 15, 70));
        ctx.restore();
    }
    /**
     * Fills a div with a table-like view of the raw data.
     * @param {HTMLDivElement} container The div element to fill.
     * @param {TDrawOptions} drawOptions The data to display.
     */
    static fillDivData(container: HTMLDivElement, drawOptions: TDrawOptions) {
        container.innerHTML = "";
        if (!drawOptions) return;
        const { startSampleIndex, timeDomainData, events, startBufferIndex, bufferSize } = drawOptions;
        if (!timeDomainData || !timeDomainData.length || !timeDomainData[0].length) return;
        const bufferLength = timeDomainData[0].length;

        for (let channelIndex = 0; channelIndex < timeDomainData.length; channelIndex++) {
            const channelData = timeDomainData[channelIndex];
            const divChannel = document.createElement("div");
            divChannel.classList.add("static-scope-channel");
            divChannel.style.backgroundColor = timeDomainData.length === 1 ? "#181818" : `hsl(${channelIndex * 60}, 100%, 10%)`;

            for (let sampleIndex = 0; sampleIndex < Math.min(channelData.length, 2048); sampleIndex++) {
                const wrappedSampleIndex = wrap(sampleIndex, startSampleIndex, bufferLength);
                const divCell = document.createElement("div");
                divCell.classList.add("static-scope-cell");

                const bufferIndex = (startBufferIndex || 0) + Math.floor(sampleIndex / bufferSize);
                if (events && events[bufferIndex] && events[bufferIndex].length && sampleIndex % bufferSize === 0) {
                    divCell.classList.add("highlight");
                }

                const spanIndex = document.createElement("span");
                spanIndex.innerText = sampleIndex.toString();
                const spanSample = document.createElement("span");
                spanSample.innerText = channelData[wrappedSampleIndex].toFixed(7);

                divCell.appendChild(spanIndex);
                divCell.appendChild(spanSample);
                divChannel.appendChild(divCell);
            }

            if (channelData.length > 2048) {
                const divCell = document.createElement("div");
                divCell.classList.add("static-scope-cell");
                const spanIndex = document.createElement("span");
                spanIndex.innerText = "...";
                const spanSample = document.createElement("span");
                spanSample.innerText = "...";
                divCell.appendChild(spanIndex);
                divCell.appendChild(spanSample);
                divChannel.appendChild(divCell);
            }
            container.appendChild(divChannel);
        }
    }
    /**
     * Gets the Font Awesome icon class name for a given scope mode.
     * @param {EScopeMode} scopeMode The scope mode.
     * @returns {string} The corresponding class name.
     */
    static getIconClassName(scopeMode: EScopeMode) {
        const prefix = "fas fa-sm ";
        if (scopeMode === EScopeMode.Data) return prefix + "fa-table";
        if (scopeMode === EScopeMode.Interleaved) return prefix + "fa-water";
        if (scopeMode === EScopeMode.Oscilloscope) return prefix + "fa-wave-square";
        if (scopeMode === EScopeMode.Spectroscope) return prefix + "fa-chart-bar";
        if (scopeMode === EScopeMode.Spectrogram) return prefix + "fa-align-justify";
        return prefix;
    }
    /**
     * Gets the display name for a given scope mode.
     * @param {EScopeMode} scopeMode The scope mode.
     * @returns {string} The corresponding name.
     */
    static getModeName(scopeMode: EScopeMode) {
        if (scopeMode === EScopeMode.Data) return "Data";
        if (scopeMode === EScopeMode.Interleaved) return "Interleaved";
        if (scopeMode === EScopeMode.Oscilloscope) return "Oscilloscope";
        if (scopeMode === EScopeMode.Spectroscope) return "Spectroscope";
        if (scopeMode === EScopeMode.Spectrogram) return "Spectrogram";
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
        let controllerDiv: HTMLDivElement;
        for (let i = 0; i < this.container.children.length; i++) {
            const element = this.container.children[i];
            if (element.classList.contains("static-scope-ui-controller")) controllerDiv = element as HTMLDivElement;
            if (element.classList.contains("static-scope-canvas")) this.canvas = element as HTMLCanvasElement;
            if (element.classList.contains("static-scope-data")) this.divData = element as HTMLDivElement;
            if (element.classList.contains("static-scope-default")) this.divDefault = element as HTMLDivElement;
        }
        if (!controllerDiv) {
            controllerDiv = document.createElement("div");
            controllerDiv.classList.add("static-scope-ui-controller");
            this.container.appendChild(controllerDiv);
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
        for (let i = 0; i < controllerDiv.children.length; i++) {
            const element = controllerDiv.children[i];
            if (element.classList.contains("static-scope-ui-switch")) this.btnSwitch = element as HTMLButtonElement;
            if (element.classList.contains("static-scope-ui-zoomout")) this.btnZoomOut = element as HTMLButtonElement;
            if (element.classList.contains("static-scope-ui-zoom")) this.btnZoom = element as HTMLButtonElement;
            if (element.classList.contains("static-scope-ui-zoomin")) this.btnZoomIn = element as HTMLButtonElement;
            if (element.classList.contains("static-scope-ui-scale")) this.btnScale = element as HTMLButtonElement;
            if (element.classList.contains("static-scope-ui-download")) this.btnDownload = element as HTMLButtonElement;
        }
        if (!this.btnSwitch) {
            const btn = document.createElement("button");
            btn.className = "static-scope-ui-switch btn btn-outline-light btn-sm btn-overlay btn-overlay-icon";
            btn.setAttribute("data-toggle", "tooltip");
            btn.setAttribute("data-placement", "top");
            btn.setAttribute("title", "Interleaved Scope / Stacked Scope / Data");
            controllerDiv.appendChild(btn);
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
            controllerDiv.appendChild(btn);
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
            controllerDiv.appendChild(btn);
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
            controllerDiv.appendChild(btn);
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
            controllerDiv.appendChild(btn);
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
            controllerDiv.appendChild(btn);
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
            if (newType === EScopeMode.Interleaved && this.data.timeDomainData && this.data.timeDomainData.length === 1) newType = (newType + 1) % 5;
            this.mode = newType;
        });
        this.canvas.addEventListener("click", () => {
        });
        this.canvas.addEventListener("wheel", (e) => {
            const leftMargin = 50;
            const bottomMargin = 20;
            const multiplier = 1.5 ** (e.deltaY > 0 ? -1 : 1);
            // Vertical zoom on Y-Axis
            if (e.offsetX < leftMargin && e.offsetY < this.canvas.height - bottomMargin) {
                if (multiplier !== 1) this.vzoom *= 1 / multiplier;
                this.draw();
            } else { // Horizontal zoom elsewhere
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
        this.btnScale.addEventListener("click", () => {
            this.freqScaleMode = (this.freqScaleMode + 1) % 2;
        });
        this.btnDownload.addEventListener("click", () => {
            let data = "";
            if (this.mode === EScopeMode.Data || this.mode === EScopeMode.Interleaved || this.mode === EScopeMode.Oscilloscope) {
                if (this.data.timeDomainData) {
                    const { timeDomainData, startSampleIndex } = this.data;
                    if (!timeDomainData || !timeDomainData.length || !timeDomainData[0].length) return;
                    const bufferLength = timeDomainData[0].length;
                    data += new Array(timeDomainData.length).fill(null).map((v, i) => `channel${i + 1}`).join(",") + "\n";
                    for (let j = 0; j < bufferLength; j++) {
                        for (let i = 0; i < timeDomainData.length; i++) {
                            const wrappedSampleIndex = wrap(j, startSampleIndex, bufferLength);
                            const sampleValue = timeDomainData[i][wrappedSampleIndex];
                            data += sampleValue + (i === timeDomainData.length - 1 ? "\n" : ",");
                        }
                    }
                }
            } else if (this.mode === EScopeMode.Spectroscope) {
                const { startSampleIndex, freqDomainData, fftSize, fftOverlap } = this.data;
                if (!freqDomainData || !freqDomainData.length || !freqDomainData[0].length) return;
                const frequencyBinCount = fftSize / 2;
                let startFreqDataIndex = startSampleIndex * fftOverlap / 2;
                startFreqDataIndex -= startFreqDataIndex % frequencyBinCount;
                const freqBufferLength = freqDomainData[0].length;
                data += new Array(freqDomainData.length).fill(null).map((v, i) => `channel${i + 1}`).join(",") + "\n";
                for (let j = freqBufferLength - frequencyBinCount; j < freqBufferLength; j++) {
                    for (let i = 0; i < freqDomainData.length; i++) {
                        const wrappedBinIndex = wrap(j, startFreqDataIndex, freqBufferLength);
                        const magnitude = freqDomainData[i][wrappedBinIndex];
                        data += magnitude + (i === freqDomainData.length - 1 ? "\n" : ",");
                    }
                }
            } else if (this.mode === EScopeMode.Spectrogram) {
                const { startSampleIndex, freqDomainData, fftSize, fftOverlap } = this.data;
                if (!freqDomainData || !freqDomainData.length || !freqDomainData[0].length) return;
                const frequencyBinCount = fftSize / 2;
                let startFreqDataIndex = startSampleIndex * fftOverlap / 2;
                startFreqDataIndex -= startFreqDataIndex % frequencyBinCount;
                const freqBufferLength = freqDomainData[0].length;
                const frameCount = freqBufferLength / frequencyBinCount;
                data += new Array(frameCount).fill(null).map((v, i) => new Array(freqDomainData.length).fill(null).map((v, j) => `frame${i + 1}_channel${j + 1}`).join(",")).join(",") + "\n";
                for (let binIndex = 0; binIndex < frequencyBinCount; binIndex++) {
                    for (let frameIndex = 0; frameIndex < frameCount; frameIndex++) {
                        for (let channelIndex = 0; channelIndex < freqDomainData.length; channelIndex++) {
                            const dataIndex = wrap(frameIndex * frequencyBinCount + binIndex, startFreqDataIndex, freqBufferLength);
                            const magnitude = freqDomainData[channelIndex][dataIndex];
                            data += magnitude + (channelIndex === freqDomainData.length - 1 && frameIndex === frameCount - 1 ? "\n" : ",");
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
        const hasData = this.data && ((this.data.timeDomainData && this.data.timeDomainData.length) || (this.data.freqDomainData && this.data.freqDomainData.length));

        if (!hasData) {
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

        // Don't draw if canvas is not visible and in continuous mode
        if (this.data.drawMode === "continuous" && this.canvas.offsetParent === null) return;

        const canvasWidth = this.container.clientWidth;
        const canvasHeight = this.container.clientHeight;
        if (this.canvas.width !== canvasWidth) this.canvas.width = canvasWidth;
        if (this.canvas.height !== canvasHeight) this.canvas.height = canvasHeight;

        // eslint-disable-next-line default-case
        switch (this.mode) {
            case EScopeMode.Data:
                StaticScope.fillDivData(this.divData, this.data);
                break;
            case EScopeMode.Interleaved:
                StaticScope.drawInterleaved(this.ctx, canvasWidth, canvasHeight, this.data, this.zoom, this.zoomOffset, this.vzoom, this.cursor);
                break;
            case EScopeMode.Oscilloscope:
                StaticScope.drawOscilloscope(this.ctx, canvasWidth, canvasHeight, this.data, this.zoom, this.zoomOffset, this.vzoom, this.cursor);
                break;
            case EScopeMode.Spectroscope:
                StaticScope.drawSpectroscope(this.ctx, canvasWidth, canvasHeight, this.data, this.zoom, this.zoomOffset, this.cursor, this.freqScaleMode);
                break;
            case EScopeMode.Spectrogram:
                StaticScope.drawSpectrogram(this.ctx, this.spectTempCtx, canvasWidth, canvasHeight, this.data, this.zoom, this.zoomOffset, this.cursor, this.freqScaleMode);
                break;
        }

        this.newDataArrived = false;
    };
    /**
     * Triggers a redraw of the scope. If data is provided, it updates the scope's data.
     * @param {TDrawOptions} [data] The new data to draw.
     */
    draw = (data?: TDrawOptions) => {
        if (data) {
            if (data.freqDomainData && (!this.data.freqDomainData || this.data.freqDomainData[0].length !== data.freqDomainData[0].length)) {
                this.lastSpect$ = 0; // Reset spectrogram canvas if data structure changes
            }
            this.data = data;
            this.newDataArrived = true;
        }
        if (this.raf) return; // Don't queue up multiple frames
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
    set vzoom(newZoom: number) {
        const maxZoom = 16;
        this._vzoom[this.zoomType] = Math.min(maxZoom, Math.max(1, newZoom));
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
    set zoom(newZoom: number) {
        const dataArray = this.inFreqDomain ? this.data.freqDomainData : this.data.timeDomainData;
        const maxZoom = dataArray && dataArray[0] ? Math.max(16, this.mode === EScopeMode.Spectroscope ? 64 : dataArray[0].length / (this.inFreqDomain ? this.data.fftSize / 2 : this.data.bufferSize)) : 16;

        const canvasWidth = this.canvas.width;
        let cursorPositionRatio = 0.5;
        const leftMargin = 50;
        if (this.cursor) cursorPositionRatio = Math.max(0, this.cursor.x - leftMargin) / (canvasWidth - leftMargin);

        const cursorPositionInData = this.zoomOffset + cursorPositionRatio / this.zoom;
        this._zoom[this.zoomType] = Math.min(maxZoom, Math.max(1, newZoom));
        this.zoomOffset = cursorPositionInData - cursorPositionRatio / this.zoom;

        this.btnZoom.innerHTML = this.zoom.toFixed(1) + "x";
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
    set zoomOffset(newZoomOffset: number) {
        this._zoomOffset[this.zoomType] = Math.max(0, Math.min(1 - 1 / this.zoom, newZoomOffset));
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
    set freqScaleMode(newMode: EFreqScaleMode) {
        this._freqScaleMode = newMode;
        if (newMode === EFreqScaleMode.Linear) {
            this.iScale.className = "fas fa-ruler-horizontal";
            this.btnScale.setAttribute("title", "Switch to Logarithmic Scale");
        } else {
            this.iScale.className = "fas fa-chart-line";
            this.btnScale.setAttribute("title", "Switch to Linear Scale");
        }
        // Re-initialize tooltip to update title
        try {
            $(this.btnScale).tooltip("hide").tooltip("dispose").tooltip({ trigger: "hover", boundary: "viewport" });
        } catch (e) { } // eslint-disable-line no-empty

        // Reset and redraw spectrogram on scale change
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
    set mode(newMode: EScopeMode) {
        this.iSwitch.className = StaticScope.getIconClassName(newMode);
        this.spanSwitch.innerText = StaticScope.getModeName(newMode);
        this._mode = newMode;

        if (newMode === EScopeMode.Data) {
            this.divData.style.display = "block";
            this.canvas.style.display = "none";
            [this.btnZoom, this.btnZoomIn, this.btnZoomOut, this.btnScale].forEach(button => button.style.display = "none");
        } else {
            this.divData.style.display = "none";
            this.canvas.style.display = "block";
            [this.btnZoom, this.btnZoomIn, this.btnZoomOut].forEach(button => button.style.display = "");
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
