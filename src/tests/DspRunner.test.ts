import { beforeEach, describe, expect, it, vi } from "vitest";

// DspRunner owns faustwasm orchestration, so these tests replace the generator
// classes with small factories and assert only the browser graph effects.
const monoFactory = {
    getSoundfileList: vi.fn(() => [] as string[]),
    addSoundfiles: vi.fn(),
    createNode: vi.fn()
};
const polyFactory = {
    getSoundfileList: vi.fn(() => [] as string[]),
    addSoundfiles: vi.fn(),
    createNode: vi.fn()
};
const monoCompile = vi.fn(async () => monoFactory);
const polyCompile = vi.fn(async () => polyFactory);
const monoConstructor = vi.fn(function FaustMonoDspGenerator() {
    return { compile: monoCompile };
});
const polyConstructor = vi.fn(function FaustPolyDspGenerator() {
    return { compile: polyCompile };
});

vi.mock("@grame/faustwasm", () => ({
    FaustMonoDspGenerator: monoConstructor,
    FaustPolyDspGenerator: polyConstructor
}));

class AudioNodeMock {
    numberOfOutputs: number;
    channelCount = 0;
    maxChannelCount = 2;
    channelInterpretation = "speakers";
    connect = vi.fn(() => this);
    disconnect = vi.fn();

    constructor(outputs = 2) {
        this.numberOfOutputs = outputs;
    }
}

const createDspNode = (inputs = 1, outputs = 2) => ({
    getNumInputs: vi.fn(() => inputs),
    getNumOutputs: vi.fn(() => outputs),
    getParams: vi.fn(() => ["/gain"]),
    setParamValue: vi.fn(),
    setPlotHandler: vi.fn(),
    startSensors: vi.fn(),
    connect: vi.fn(),
    disconnect: vi.fn(),
    destroy: vi.fn(),
    getUI: vi.fn(() => [])
});

const createAudioContext = () => ({
    destination: new AudioNodeMock(),
    createChannelSplitter: vi.fn((channels: number) => new AudioNodeMock(channels)),
    decodeAudioData: vi.fn(),
    resume: vi.fn(async () => undefined)
});

const createLibFaust = (files: string[] = [], data = new Uint8Array([1, 2, 3])) => ({
    fs: () => ({
        readdir: vi.fn(() => files),
        readFile: vi.fn(() => data)
    })
});

describe("DspRunner", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        monoFactory.getSoundfileList.mockReturnValue([]);
        polyFactory.getSoundfileList.mockReturnValue([]);
    });

    it("compiles a mono DSP and reconnects the runtime graph", async () => {
        const { DspRunner } = await import("../runtime/DspRunner");
        const audioCtx = createAudioContext();
        const gainInput = new AudioNodeMock();
        const analyserOutput = new AudioNodeMock();
        const destination = new AudioNodeMock();
        const node = createDspNode(1, 2);
        monoFactory.createNode.mockResolvedValue(node);
        const onOutputSplitterChanged = vi.fn();
        const plotHandler = vi.fn();
        const env = {
            audioCtx,
            gainInput,
            analyserOutput,
            destination,
            outputEnabled: true,
            inputEnabled: false,
            dspConnectedToInput: false,
            dspConnectedToOutput: false
        };

        const runner = new DspRunner({
            audioEnv: env as any,
            faustCompiler: {} as any,
            libFaust: createLibFaust() as any,
            projectDir: "/usr/share/project/"
        });

        const result = await runner.run({
            code: "process = _;",
            compilerArgs: ["-I", "/usr/share/project/"],
            useDouble: true,
            useWorklet: false,
            bufferSize: 1024,
            voices: 0,
            saveParams: true,
            dspParams: { "/gain": 0.5 },
            plotHandler,
            onOutputSplitterChanged
        });

        expect(result.success).toBe(true);
        expect(monoCompile).toHaveBeenCalledWith({}, "main", "process = _;", "-I /usr/share/project/ -double");
        expect(monoFactory.createNode).toHaveBeenCalledWith(audioCtx, "main", undefined, true, 1024);
        expect(node.setPlotHandler).toHaveBeenCalledWith(plotHandler);
        expect(node.startSensors).toHaveBeenCalledTimes(1);
        expect(node.setParamValue).toHaveBeenCalledWith("/gain", 0.5);
        expect(gainInput.connect).toHaveBeenCalledWith(node);
        expect(node.connect).toHaveBeenCalledWith(env.splitterOutput);
        expect(node.connect).toHaveBeenCalledWith(destination);
        expect(onOutputSplitterChanged).toHaveBeenCalledWith(env.splitterOutput, 2);
        expect(env.dspConnectedToInput).toBe(true);
        expect(env.dspConnectedToOutput).toBe(true);
        expect(audioCtx.resume).toHaveBeenCalledTimes(1);
    });

    it("destroys the previous DSP before installing a polyphonic node", async () => {
        const { DspRunner } = await import("../runtime/DspRunner");
        const audioCtx = createAudioContext();
        const gainInput = new AudioNodeMock();
        const previous = createDspNode();
        const next = createDspNode(0, 1);
        polyFactory.createNode.mockResolvedValue(next);
        const existingSplitter = new AudioNodeMock(2);
        const env = {
            audioCtx,
            gainInput,
            analyserOutput: new AudioNodeMock(),
            splitterOutput: existingSplitter,
            destination: new AudioNodeMock(),
            dsp: previous,
            outputEnabled: false,
            inputEnabled: false,
            dspConnectedToInput: true,
            dspConnectedToOutput: true
        };

        const runner = new DspRunner({
            audioEnv: env as any,
            faustCompiler: {} as any,
            libFaust: createLibFaust() as any,
            projectDir: "/usr/share/project/"
        });

        const result = await runner.run({
            code: "process = _;",
            compilerArgs: [],
            useDouble: false,
            useWorklet: true,
            bufferSize: 128,
            voices: 4,
            saveParams: false,
            dspParams: {},
            plotHandler: vi.fn()
        });

        expect(result.success).toBe(true);
        expect(polyCompile).toHaveBeenCalledWith({}, "main", "process = _;", "");
        expect(polyFactory.createNode).toHaveBeenCalledWith(audioCtx, 4, "main", undefined, undefined, undefined, false, 128);
        expect(gainInput.disconnect).toHaveBeenCalledWith(previous);
        expect(previous.disconnect).toHaveBeenCalledTimes(1);
        expect(previous.destroy).toHaveBeenCalledTimes(1);
        expect(existingSplitter.disconnect).toHaveBeenCalledTimes(1);
        expect(next.connect).not.toHaveBeenCalledWith(env.destination);
        expect(env.dsp).toBe(next);
        expect(env.dspConnectedToOutput).toBe(false);
    });

    it("loads requested soundfiles from the Faust project filesystem", async () => {
        const { DspRunner } = await import("../runtime/DspRunner");
        const audioCtx = createAudioContext();
        const audioBuffer = {
            numberOfChannels: 2,
            sampleRate: 48000,
            getChannelData: vi.fn((channel: number) => new Float32Array([channel]))
        };
        audioCtx.decodeAudioData.mockResolvedValue(audioBuffer);
        const runner = new DspRunner({
            audioEnv: { audioCtx, dspConnectedToInput: false, dspConnectedToOutput: false, inputEnabled: false, outputEnabled: false } as any,
            faustCompiler: {} as any,
            libFaust: createLibFaust(["kick.wav", "ignored.wav"]) as any,
            projectDir: "/usr/share/project/"
        });

        const soundfiles = await runner.loadSoundfiles(audioCtx as any, ["kick.wav"]);

        expect(Object.keys(soundfiles)).toEqual(["kick.wav"]);
        expect(soundfiles["kick.wav"].sampleRate).toBe(48000);
        expect(soundfiles["kick.wav"].audioBuffer).toHaveLength(2);
        expect(audioBuffer.getChannelData).toHaveBeenCalledWith(0);
        expect(audioBuffer.getChannelData).toHaveBeenCalledWith(1);
    });
});
