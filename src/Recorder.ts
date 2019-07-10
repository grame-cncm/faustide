import { encode } from "wav-encoder";

export class Recorder {
    $start: number;
    $last: number;
    data: Float32Array[][];
    sampleRate: number;
    enabled: boolean;
    constructor(sampleRate?: number) {
        this.enabled = false;
        this.sampleRate = sampleRate || 44100;
    }
    reset($start: number) {
        this.$start = $start;
        this.$last = $start;
        this.data = [];
    }
    append(buffer: Float32Array[], index: number) {
        if (!this.enabled) return this.totalSec;
        if (index === 0 || !this.data || this.data.length === 0 || index !== ++this.$last) this.reset(index);
        this.data.push(buffer);
        return this.totalSec;
    }
    get totalSec() {
        if (!this.data || !this.data.length || !this.data[0].length) return 0;
        const sampleRate = this.sampleRate;
        const buffers = this.data.length;
        const bufferSize = this.data[0][0].length;
        return bufferSize * buffers / sampleRate;
    }
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
