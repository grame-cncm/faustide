interface AudioData {
    sampleRate: number;
    channelData: Float32Array[];
}
type TOptions = {
    bitDepth?: number;
    float?: boolean;
    symmetric?: number;
};
export const encode: {
    (audioData: AudioData, opts?: TOptions): Promise<ArrayBuffer>;
    sync(audioData: AudioData, opts?: TOptions): Promise<ArrayBuffer>;
};
