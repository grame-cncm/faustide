import { wrap } from "./utils";
import {
    FrequencyScaleMode as EFreqScaleMode,
    StaticScopeMode as EScopeMode,
    getStaticScopeIconClassName,
    getStaticScopeModeName
} from "./scope/ScopeModes";
import { drawCanvasBackground } from "./scope/CanvasDrawing";
import { clampZoomOffset } from "./scope/FrequencyScale";
import { fillStaticScopeDataTable } from "./scope/static/DataTableRenderer";
import { drawStaticInterleaved, drawStaticOscilloscope } from "./scope/static/TimeDomainRenderer";
import { drawStaticSpectroscope } from "./scope/static/FrequencyRenderer";
import { drawStaticOfflineSpectrogram, drawStaticSpectrogram } from "./scope/static/SpectrogramRenderer";
import {
    createStaticScopeControls,
    updateStaticScopeModeControls,
    updateStaticScopeScaleButton
} from "./scope/static/StaticScopeControls";
import {
    handleStaticScopePointerDown,
    handleStaticScopePointerLeave,
    handleStaticScopePointerMove,
    handleStaticScopeWheel
} from "./scope/static/StaticScopeInteractions";
import { STATIC_SCOPE_LEFT_MARGIN } from "./scope/static/StaticScopeLayout";
import {
    drawStaticScopeEvent,
    drawStaticScopeGrid,
    drawStaticScopeStats
} from "./scope/static/StaticScopeOverlays";
import "./StaticScope.scss";

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
        handleStaticScopePointerMove(this, event);
    }
    /**
     * Handles mouse down events for panning the view.
     * @param {MouseEvent | TouchEvent} eventDown The mouse or touch event.
     */
    handleMouseDown = (eventDown: MouseEvent | TouchEvent) => {
        handleStaticScopePointerDown(this, eventDown);
    }
    /**
     * Handles the mouse leaving the canvas area.
     */
    handleMouseLeave = () => {
        handleStaticScopePointerLeave(this);
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
        drawStaticInterleaved({
            drawBackground: this.drawBackground.bind(this),
            drawGrid: this.drawGrid.bind(this),
            drawEvent: this.drawEvent.bind(this),
            drawStats: this.drawStats.bind(this)
        }, ctx, canvasWidth, canvasHeight, drawOptions, horizontalZoom, horizontalZoomOffset, verticalZoom, cursor);
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
        drawStaticOscilloscope({
            drawBackground: this.drawBackground.bind(this),
            drawGrid: this.drawGrid.bind(this),
            drawEvent: this.drawEvent.bind(this),
            drawStats: this.drawStats.bind(this)
        }, ctx, canvasWidth, canvasHeight, drawOptions, horizontalZoom, horizontalZoomOffset, verticalZoom, cursor);
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
        drawStaticSpectroscope({
            drawBackground: this.drawBackground.bind(this),
            drawGrid: this.drawGrid.bind(this),
            drawEvent: this.drawEvent.bind(this),
            drawStats: this.drawStats.bind(this)
        }, ctx, canvasWidth, canvasHeight, drawOptions, horizontalZoom, horizontalZoomOffset, cursor, freqScaleMode);
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
        drawStaticSpectrogram({
            drawBackground: this.drawBackground.bind(this),
            drawGrid: this.drawGrid.bind(this),
            drawEvent: this.drawEvent.bind(this),
            drawStats: this.drawStats.bind(this)
        }, ctx, spectrogramCacheContext, canvasWidth, canvasHeight, drawOptions, horizontalZoom, horizontalZoomOffset, cursor, freqScaleMode);
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
        return drawStaticOfflineSpectrogram(spectrogramCacheContext, drawOptions, lastDrawnSampleIndex, freqScaleMode);
    }
    /**
     * Draws the background of the canvas.
     * @param {CanvasRenderingContext2D} ctx The canvas rendering context.
     * @param {number} canvasWidth The width of the canvas.
     * @param {number} canvasHeight The height of the canvas.
     */
    static drawBackground(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number) {
        drawCanvasBackground(ctx, canvasWidth, canvasHeight, "#181818");
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
        return drawStaticScopeGrid(ctx, canvasWidth, canvasHeight, drawStartValue, drawEndValue, stabilizationOffset, verticalScaleFactor, drawOptions, mode, freqScaleMode);
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
        drawStaticScopeEvent(ctx, canvasWidth, canvasHeight, x, eventData);
    }
    /**
     * Draws statistics (cursor lines and values) on the canvas.
     * @param {CanvasRenderingContext2D} ctx The canvas rendering context.
     * @param {number} canvasWidth The width of the canvas.
     * @param {number} canvasHeight The height of the canvas.
     * @param {TStatsToDraw} statsToDraw The statistics data to draw.
     */
    static drawStats(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number, statsToDraw: TStatsToDraw) {
        drawStaticScopeStats(ctx, canvasWidth, canvasHeight, statsToDraw);
    }
    /**
     * Fills a div with a table-like view of the raw data.
     * @param {HTMLDivElement} container The div element to fill.
     * @param {TDrawOptions} drawOptions The data to display.
     */
    static fillDivData(container: HTMLDivElement, drawOptions: TDrawOptions) {
        fillStaticScopeDataTable(container, drawOptions);
    }
    /**
     * Gets the Font Awesome icon class name for a given scope mode.
     * @param {EScopeMode} scopeMode The scope mode.
     * @returns {string} The corresponding class name.
     */
    static getIconClassName(scopeMode: EScopeMode) {
        return getStaticScopeIconClassName(scopeMode);
    }
    /**
     * Gets the display name for a given scope mode.
     * @param {EScopeMode} scopeMode The scope mode.
     * @returns {string} The corresponding name.
     */
    static getModeName(scopeMode: EScopeMode) {
        return getStaticScopeModeName(scopeMode);
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
        Object.assign(this, createStaticScopeControls(this.container));
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
            handleStaticScopeWheel(this, e);
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
        const leftMargin = STATIC_SCOPE_LEFT_MARGIN;
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
        this._zoomOffset[this.zoomType] = clampZoomOffset(this.zoom, newZoomOffset);
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
        updateStaticScopeScaleButton(this.btnScale, this.iScale, newMode);
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
        this._mode = newMode;
        updateStaticScopeModeControls({
            mode: newMode,
            inFrequencyDomain: this.inFreqDomain,
            iSwitch: this.iSwitch,
            spanSwitch: this.spanSwitch,
            divData: this.divData,
            canvas: this.canvas,
            btnZoom: this.btnZoom,
            btnZoomIn: this.btnZoomIn,
            btnZoomOut: this.btnZoomOut,
            btnScale: this.btnScale
        });
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
