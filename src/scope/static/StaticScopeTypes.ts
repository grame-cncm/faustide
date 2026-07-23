import type { StaticScopeMode as EScopeMode } from "../ScopeModes";

/**
 * Options for initializing the StaticScope instance.
 */
export type TOptions = {
    /** The container element for the scope */
    container: HTMLDivElement;
    /** The initial display mode */
    type?: EScopeMode;
};

/**
 * Defines the structure for statistics to be drawn on the canvas, typically at
 * the cursor's position.
 */
export type TStatsToDraw = {
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
    /** Wrapped FFT phase data in radians for each channel */
    phaseDomainData?: Float32Array[];
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
};
