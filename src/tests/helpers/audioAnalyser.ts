import { vi } from "vitest";

type MockAnalyserOptions = {
    fftSize?: number;
    frequencyBinCount?: number;
    frequencyData?: number[];
    floatTimeDomainData?: number[];
    byteTimeDomainData?: number[];
};

const copyInto = <T extends Float32Array | Uint8Array>(target: T, values: number[]) => {
    for (let i = 0; i < target.length; i++) target[i] = values[i % values.length] || 0;
};

/**
 * Creates the analyser subset used by `Scope`.
 */
export const createMockAnalyserNode = (options: MockAnalyserOptions = {}) => {
    const analyser = {
        fftSize: options.fftSize || 2048,
        frequencyBinCount: options.frequencyBinCount || Math.floor((options.fftSize || 2048) / 2),
        minDecibels: -100,
        maxDecibels: -10,
        getFloatFrequencyData: vi.fn((target: Float32Array) => copyInto(target, options.frequencyData || [-90, -60, -30])),
        getFloatTimeDomainData: vi.fn((target: Float32Array) => copyInto(target, options.floatTimeDomainData || [0, 0.5, 0, -0.5])),
        getByteTimeDomainData: vi.fn((target: Uint8Array) => copyInto(target, options.byteTimeDomainData || [128, 255, 128, 0]))
    };
    return analyser as unknown as AnalyserNode & typeof analyser;
};

/**
 * Creates the splitter subset used by `Scope` channel routing.
 */
export const createMockChannelSplitter = () => ({
    connect: vi.fn(),
    disconnect: vi.fn()
} as unknown as ChannelSplitterNode & { connect: ReturnType<typeof vi.fn>; disconnect: ReturnType<typeof vi.fn> });
