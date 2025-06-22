import { FFTR } from "kissfft-js";
import { TDrawOptions } from "./StaticScope";
import { sliceWrap, getFrequencyDomainData, setWrap, estimateFreq } from "./utils";

/**
 * This class provides a default handler for a buffer given by Faust2WebAudio.
 * The handler analyses the buffer with FFT, then saves both time-domain and frequency-domain data.
 * After each buffer is analysed, a drawHandler is called to display data.
 *
 * @export
 * @class Analyser
 */
export class Analyser {
    /**
     * Time Domain Data for all channels.
     * @type {Float32Array[]}
     * @memberof Analyser
     */
    timeDomainData: Float32Array[];
    /**
     * Frequency Domain Data for all channels.
     * The array has a size proportional to the time-domain data, adjusted by the FFT overlap factor.
     * @type {Float32Array[]}
     * @memberof Analyser
     */
    freqDomainData: Float32Array[];
    /**
     * Events stored for each buffer.
     * @type {{ type: string; data: any }[][]}
     * @memberof Analyser
     */
    events: { type: string; data: any }[][];
    /**
     * The total number of buffers to cache in the time and frequency domain data arrays.
     * @type {number}
     * @memberof Analyser
     */
    buffers: number;
    /**
     * The index of the current buffer being processed, used for tracking events.
     * @type {number}
     * @memberof Analyser
     */
    currentBufferIndex: number;
    /**
     * The write pointer for the current sample in the circular time and frequency data buffers.
     * @type {number}
     * @memberof Analyser
     */
    currentSampleIndex: number;
    /**
     * The current drawing mode.
     * @private
     * @type {("offline" | "continuous" | "onevent" | "manual")}
     * @memberof Analyser
     */
    private _drawMode: "offline" | "continuous" | "onevent" | "manual";
    /**
     * In 'onevent' mode, this is a countdown of remaining buffers to draw after an event is triggered.
     * @type {number}
     * @memberof Analyser
     */
    capturing: number;
    /**
     * The KissFFT instance for performing Fast Fourier Transforms.
     * @private
     * @type {FFTR}
     * @memberof Analyser
     */
    private _fft: FFTR;
    /**
     * The size of the FFT window.
     * @private
     * @type {(256 | 512 | 1024 | 2048 | 4096 | 8192 | 16384 | 32768 | 65536)}
     * @memberof Analyser
     */
    private _fftSize: 256 | 512 | 1024 | 2048 | 4096 | 8192 | 16384 | 32768 | 65536;
    /**
     * The overlap factor for successive FFT windows.
     * @private
     * @type {(1 | 2 | 4 | 8)}
     * @memberof Analyser
     */
    private _fftOverlap: 1 | 2 | 4 | 8;
    /**
     * A callback function that will be executed after each buffer is processed, typically to draw the data.
     * @memberof Analyser
     */
    drawHandler: (options: TDrawOptions) => any;
    /**
     * The estimated fundamental frequency of the signal from the last FFT analysis.
     * @type {number}
     * @memberof Analyser
     */
    estimatedFrequency: number;

    constructor(buffers?: number, drawMode?: "offline" | "continuous" | "onevent" | "manual", drawHandler?: (options: TDrawOptions) => any) {
        this.buffers = buffers || 0;
        this.drawMode = drawMode || "manual";
        this.drawHandler = drawHandler;
        this._fftOverlap = 2;
        this.capturing = -1;
        this.fftSize = 256;
    }

    initCache(bufferSize: number, channels: number) {
        const buffers = this.drawMode === "offline" ? 1 : this.buffers;
        if (this.timeDomainData && this.timeDomainData.length === channels && this.timeDomainData[0].length === bufferSize * buffers) return;
        this.timeDomainData = new Array(channels).fill(null).map(() => new Float32Array(bufferSize * buffers));
        this.freqDomainData = new Array(channels).fill(null).map(() => new Float32Array(bufferSize * buffers * this.fftOverlap / 2).fill(-Infinity));
        this.currentSampleIndex = 0;
        this.events = [];
    }

    plotHandler = (timeDomainData: Float32Array[], index: number, events?: { type: string; data: any }[], drawOffline?: boolean) => {
        if (!timeDomainData.length) return;
        if (this.drawMode === "offline" && !drawOffline) return;
        if (drawOffline) {
            this.currentSampleIndex = 0;
            this.events = [];
        }
        const channels = timeDomainData.length;
        const bufferSize = timeDomainData[0].length;
        this.initCache(bufferSize, channels);
        this.currentSampleIndex = (index % this.buffers) * bufferSize;
        this.currentBufferIndex = index;
        const { currentSampleIndex, fftSize, fftOverlap, fftHopSize, fftBins, fft } = this;

        timeDomainData.forEach((channelData, i) => {
            this.timeDomainData[i].set(channelData, currentSampleIndex);
            let latestFreqData: Float32Array;
            // Perform FFT on overlapping windows within the new buffer
            for (let fftEndSample = (currentSampleIndex + bufferSize) - (currentSampleIndex + bufferSize) % fftHopSize; fftEndSample > currentSampleIndex; fftEndSample -= fftHopSize) {
                const fftStartSample = fftEndSample - fftSize;
                const timeDataForFFT = sliceWrap(this.timeDomainData[i], fftStartSample, fftSize);
                latestFreqData = getFrequencyDomainData(timeDataForFFT, fft);
                setWrap(this.freqDomainData[i], latestFreqData, fftEndSample * fftOverlap / 2 - fftBins);
            }
            if (latestFreqData) this.estimatedFrequency = estimateFreq(latestFreqData, this.sampleRate);
        });

        this.events[index] = events || [];
        delete this.events[index - this.buffers - 1]; // Clean up old events

        if (this.drawMode === "onevent") {
            if (events && events.length && this.capturing === -1) this.capturing = this.buffers - 1;
            if (this.capturing >= 0) this.capturing--;
            if (this.capturing !== -1 || (events && events.length)) this.draw();
        } else if (this.drawMode === "manual") {
            if (index === this.buffers - 1) this.draw();
        } else {
            this.draw();
        }
    }

    draw() {
        const { timeDomainData, freqDomainData, events, drawHandler, drawMode, fftSize, fftOverlap, estimatedFrequency, sampleRate } = this;
        if (!drawHandler) return;
        if (!timeDomainData || !timeDomainData.length) return;

        if (drawMode === "offline") {
            drawHandler({
                startSampleIndex: 0,
                startBufferIndex: 0,
                bufferSize: timeDomainData[0].length,
                drawMode,
                fftSize,
                fftOverlap,
                estimatedFundamentalFrequency: estimatedFrequency,
                sampleRate,
                timeDomainData,
                freqDomainData,
                events
            });
            return;
        }

        const bufferSize = this.timeDomainData[0].length / this.buffers;
        const startSampleIndex = (this.currentSampleIndex + bufferSize) % this.timeDomainData[0].length;
        const startBufferIndex = this.currentBufferIndex + 1 - this.buffers;

        const options: TDrawOptions = {
            startSampleIndex,
            startBufferIndex,
            bufferSize,
            drawMode,
            fftSize,
            fftOverlap,
            estimatedFundamentalFrequency: estimatedFrequency,
            sampleRate,
            timeDomainData,
            freqDomainData,
            events
        };

        if (this.drawMode === "continuous" || this.capturing > 0) {
            this.drawHandler(options);
        } else {
            // For other modes, pass a copy to prevent modifications to the analyser's internal state
            this.drawHandler({
                ...options,
                timeDomainData: this.timeDomainData.map(a => a.slice()),
                freqDomainData: this.freqDomainData.map(a => a.slice()),
                events: this.events.slice()
            });
        }
    }

    /**
     * The function property can be overwritten to get the sampleRate differently.
     *
     * @memberof Analyser
     */
    getSampleRate = () => 48000;

    get sampleRate() {
        return this.getSampleRate();
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
        this._fft = new FFTR(fftSizeIn);
    }

    get fftOverlap() {
        return this._fftOverlap;
    }

    set fftOverlap(fftOverlapIn) {
        if (this._fftOverlap === fftOverlapIn) return;
        this._fftOverlap = fftOverlapIn;
        if (!this.timeDomainData || !this.timeDomainData.length || !this.timeDomainData[0].length) return;
        // Re-initialize frequency domain data array with new size
        this.freqDomainData = new Array(this.timeDomainData.length).fill(null).map(() => new Float32Array(this.timeDomainData[0].length * this.fftOverlap / 2).fill(-Infinity));
    }

    get fftHopSize() {
        return this.fftSize / this.fftOverlap;
    }

    get fftBins() {
        return this.fftSize / 2;
    }
}