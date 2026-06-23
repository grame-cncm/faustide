import { beforeEach, describe, expect, it, vi } from "vitest";

// Characterizes the extracted base audio graph without touching the real
// browser audio stack. The mocks mirror only the Web Audio methods that the
// runtime service owns.
const createMeterNode = vi.fn(() => ({ connect: vi.fn() }));
const gainUiInstances: any[] = [];

vi.mock("../MeterNode", () => ({
    createMeterNode,
    GainUI: class GainUI {
        value = 0;
        channels = 2;

        constructor(container: HTMLDivElement, meterNode: any, gainNode: any) {
            gainUiInstances.push({ container, meterNode, gainNode, instance: this });
        }
    }
}));

class AudioNodeMock {
    channelCount = 0;
    maxChannelCount = 2;
    channelInterpretation = "speakers";
    connect = vi.fn(() => this);
    disconnect = vi.fn();
}

class AudioContextMock {
    state: AudioContextState = "suspended";
    destination = new AudioNodeMock();
    listeners: { [type: string]: () => void } = {};
    createGain = vi.fn(() => new AudioNodeMock());
    createChannelSplitter = vi.fn(() => new AudioNodeMock());
    createAnalyser = vi.fn(() => new AudioNodeMock());
    createMediaElementSource = vi.fn(() => new AudioNodeMock());
    createMediaStreamSource = vi.fn(() => new AudioNodeMock());
    addEventListener = vi.fn((type: string, listener: () => void) => {
        this.listeners[type] = listener;
    });
    resume = vi.fn(async () => {
        this.state = "running";
    });
}

describe("AudioEngine", () => {
    beforeEach(() => {
        createMeterNode.mockClear();
        gainUiInstances.length = 0;
    });

    it("creates the base audio graph and destination once", async () => {
        const { AudioEngine } = await import("../runtime/AudioEngine");
        const env = {
            dspConnectedToInput: false,
            dspConnectedToOutput: false,
            inputEnabled: false,
            outputEnabled: false
        };
        const context = new AudioContextMock();
        const AudioContextConstructor = vi.fn(function AudioContext() {
            return context;
        });
        (window as any).AudioContext = AudioContextConstructor;
        (window as any).webkitAudioContext = undefined;
        const unlockTarget = { add: vi.fn(), remove: vi.fn() };
        const onStateChange = vi.fn();

        const engine = new AudioEngine({
            env: env as any,
            gainContainer: document.createElement("div"),
            unlockTarget,
            onStateChange
        });

        await engine.initialize();
        context.listeners.statechange();
        await engine.initialize();

        expect(AudioContextConstructor).toHaveBeenCalledTimes(1);
        expect(context.resume).toHaveBeenCalledTimes(1);
        expect(createMeterNode).toHaveBeenCalledTimes(1);
        expect(gainUiInstances).toHaveLength(1);
        expect(env.outputEnabled).toBe(true);
        expect(env.destination).toBe(context.destination);
        expect(env.destination.channelInterpretation).toBe("discrete");
        expect(unlockTarget.add).toHaveBeenCalledTimes(1);
        expect(onStateChange).toHaveBeenCalledWith("running");
    });

    it("caches media element and device input sources", async () => {
        const { AudioEngine } = await import("../runtime/AudioEngine");
        const env = {
            dspConnectedToInput: false,
            dspConnectedToOutput: false,
            inputEnabled: false,
            outputEnabled: false
        };
        const context = new AudioContextMock();
        const AudioContextConstructor = vi.fn(function AudioContext() {
            return context;
        });
        (window as any).AudioContext = AudioContextConstructor;
        (window as any).webkitAudioContext = undefined;
        const mediaElement = document.createElement("audio");
        const stream = {} as MediaStream;
        const getUserMedia = vi.fn(async () => stream);
        Object.assign(navigator, {
            mediaDevices: { getUserMedia }
        });

        const engine = new AudioEngine({
            env: env as any,
            gainContainer: document.createElement("div"),
            mediaElementProvider: () => mediaElement
        });

        await engine.initialize("-1");
        await engine.initialize("device-a");
        await engine.initialize("device-a");

        expect(context.createMediaElementSource).toHaveBeenCalledWith(mediaElement);
        expect(getUserMedia).toHaveBeenCalledTimes(1);
        expect(getUserMedia).toHaveBeenCalledWith({ audio: { deviceId: "device-a", echoCancellation: false, noiseSuppression: false, autoGainControl: false } });
        expect(context.createMediaStreamSource).toHaveBeenCalledWith(stream);
    });
});
