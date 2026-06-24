import { encode } from "wav-encoder";

/**
 * Accumulates DSP output blocks while armed and encodes them to a WAV.
 *
 * Blocks arrive from the DSP plot handler as `[channel][sample]` arrays with a
 * monotonic block index; a gap in the index resets the buffer so only a
 * continuous run is kept. Data is copied on append (see {@link append}) so the
 * recording is independent of buffer reuse by the DSP backend.
 */
export class Recorder {
    /** Block index at which the current continuous recording started. */
    $start: number;
    /** Block index of the most recently appended block. */
    $last: number;
    /** Recorded blocks: `data[block][channel]` sample buffers. */
    data: Float32Array[][];
    /** Sample rate written into the WAV header; set from the AudioContext. */
    sampleRate: number;
    /** Whether incoming blocks are being recorded. */
    enabled: boolean;
    constructor(sampleRate?: number) {
        this.enabled = false;
        this.sampleRate = sampleRate || 44100;
    }
    /** Starts a fresh continuous recording at the given block index. */
    reset($start: number) {
        this.$start = $start;
        this.$last = $start;
        this.data = [];
    }
    /**
     * Appends one DSP output block when armed, resetting first if the index is
     * discontinuous. Returns the current recorded duration in seconds.
     */
    append(buffer: Float32Array[], index: number) {
        if (!this.enabled) return this.totalSec;
        if (index === 0 || !this.data || this.data.length === 0 || index !== ++this.$last) this.reset(index);
        // Copy each channel: some DSP node backends (e.g. ScriptProcessor) reuse
        // the same output Float32Array across blocks, so storing the reference
        // would make the whole recording the last block repeated.
        this.data.push(buffer.map(channel => channel.slice()));
        return this.totalSec;
    }
    /** Recorded duration in seconds (block count × block size ÷ sample rate). */
    get totalSec() {
        if (!this.data || !this.data.length || !this.data[0].length) return 0;
        const sampleRate = this.sampleRate;
        const buffers = this.data.length;
        const bufferSize = this.data[0][0].length;
        return bufferSize * buffers / sampleRate;
    }
    /** Concatenates the recorded blocks per channel and encodes them to a WAV ArrayBuffer (null if empty). */
    async encode() {
        if (!this.data || !this.data.length || !this.data[0].length) return null;
        const sampleRate = this.sampleRate;
        const buffers = this.data.length;
        const channels = this.data[0].length;
        const bufferSize = this.data[0][0].length;
        const l = buffers * bufferSize;
        const channelData = [];
        for (let j = 0; j < channels; j++) {
            const channel = new Float32Array(l);
            for (let i = 0; i < buffers; i++) {
                const bufferData = this.data[i][j];
                channel.set(bufferData, i * bufferSize);
            }
            channelData.push(channel);
        }
        return encode({ sampleRate, channelData });
    }
}
