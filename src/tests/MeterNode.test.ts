import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { GainUI, createMeterNode } from "../MeterNode";
import { installMockCanvasContext } from "./helpers/canvasContext";
import { installAnimationFrameMock } from "./helpers/animationFrame";

const makeBuffer = (channels: Float32Array[]) => ({
    numberOfChannels: channels.length,
    getChannelData: (i: number) => channels[i]
});

const makeAudioContext = () => {
    const node: any = {};
    return {
        createScriptProcessor: vi.fn((bufferSize: number, inputs: number, outputs: number) => {
            node.bufferSize = bufferSize;
            node.numberOfInputs = inputs;
            node.numberOfOutputs = outputs;
            return node;
        })
    } as unknown as AudioContext;
};

describe("createMeterNode", () => {
    it("creates a 512-frame 8x8 ScriptProcessor with default gain/averaging", () => {
        const audioCtx = makeAudioContext();
        const node = createMeterNode(audioCtx);

        expect(audioCtx.createScriptProcessor).toHaveBeenCalledWith(512, 8, 8);
        expect(node.gain).toBe(1);
        expect(node.averaging).toBe(0.95);
        expect(node.levelHandler).toBeUndefined();
    });

    it("uses the provided gain, averaging, and level handler", () => {
        const handler = vi.fn();
        const node = createMeterNode(makeAudioContext(), 0.5, 0.8, handler);
        expect(node.gain).toBe(0.5);
        expect(node.averaging).toBe(0.8);
        expect(node.levelHandler).toBe(handler);
    });

    it("computes per-channel RMS, copies input to output, and reports levels", () => {
        const levels: number[][] = [];
        const node = createMeterNode(makeAudioContext(), 1, 0.95, l => levels.push(l));

        const inCh0 = new Float32Array([3, 4]); // rms = sqrt((9+16)/2) = 3.5355
        const inCh1 = new Float32Array([0, 0]); // rms = 0
        const outCh0 = new Float32Array(2);
        const outCh1 = new Float32Array(2);
        node.onaudioprocess({
            inputBuffer: makeBuffer([inCh0, inCh1]),
            outputBuffer: makeBuffer([outCh0, outCh1])
        } as unknown as AudioProcessingEvent);

        expect(Array.from(outCh0)).toEqual([3, 4]); // pass-through copy
        expect(levels).toHaveLength(1);
        expect(levels[0][0]).toBeCloseTo(Math.sqrt(12.5), 5);
        expect(levels[0][1]).toBe(0);
    });

    it("does not throw when no level handler is set", () => {
        const node = createMeterNode(makeAudioContext());
        const ch = new Float32Array([1]);
        const out = new Float32Array(1);
        expect(() => node.onaudioprocess({
            inputBuffer: makeBuffer([ch]),
            outputBuffer: makeBuffer([out])
        } as unknown as AudioProcessingEvent)).not.toThrow();
    });
});

describe("GainUI", () => {
    let canvasMock: ReturnType<typeof installMockCanvasContext>;
    let rafMock: ReturnType<typeof installAnimationFrameMock>;

    const makeGainUI = () => {
        const container = document.createElement("div");
        document.body.appendChild(container);
        const meterNode: any = {};
        const setValueAtTime = vi.fn();
        const gainNode = { gain: { setValueAtTime } } as unknown as GainNode;
        const ui = new GainUI(container, meterNode, gainNode);
        return { ui, setValueAtTime };
    };

    beforeEach(() => {
        canvasMock = installMockCanvasContext({ width: 120, height: 40 });
        rafMock = installAnimationFrameMock();
    });

    afterEach(() => {
        canvasMock.restore();
        rafMock.restore();
        vi.restoreAllMocks();
    });

    it("maps the dB value to a linear gain (and mutes at -70 dB)", () => {
        const { ui, setValueAtTime } = makeGainUI();

        ui.value = 0;
        expect(setValueAtTime).toHaveBeenLastCalledWith(1, 0);

        ui.value = -6;
        expect(setValueAtTime.mock.calls.at(-1)![0]).toBeCloseTo(10 ** (-6 / 20), 5);

        ui.value = -70;
        expect(setValueAtTime).toHaveBeenLastCalledWith(0, 0);
    });

    it("reports the normalized fader distance", () => {
        const { ui } = makeGainUI();
        ui.value = 0; // min -70, max 10 -> (0 - -70) / 80
        expect(ui.distance).toBeCloseTo(70 / 80, 5);
    });

    it("converts meter levels to dB and ignores unchanged updates", () => {
        const { ui } = makeGainUI();
        ui.levelHandler([1, 0.5]);
        expect(ui.state.levels[0]).toBeCloseTo(0, 5);
        expect(ui.state.levels[1]).toBeCloseTo(20 * Math.log10(0.5), 5);

        const previous = ui.state.levels;
        ui.levelHandler([1, 0.5]); // identical -> early return, same reference
        expect(ui.state.levels).toBe(previous);
    });

    it("maps a pointer position to a stepped dB value, clamped to range", () => {
        const { ui } = makeGainUI();
        ui.interactionRect = [0, 0, 100, 40]; // as set during paint()

        expect(ui.trueSteps).toBe(100);
        expect(ui.stepRange).toBe(1);
        expect(ui.getValueFromPos({ x: 50, y: 0 })).toBeCloseTo(-30, 5); // mid -> -30 dB
        expect(ui.getValueFromPos({ x: 1000, y: 0 })).toBe(10); // clamp to max
        expect(ui.getValueFromPos({ x: -50, y: 0 })).toBe(-70); // clamp to min
    });

    it("sets the value when a pointer lands inside the fader", () => {
        const { ui, setValueAtTime } = makeGainUI();
        ui.interactionRect = [0, 0, 100, 40];
        setValueAtTime.mockClear();

        ui.handlePointerDown({ x: 50, y: 20, originalEvent: {} as MouseEvent });
        expect(ui.value).toBeCloseTo(-30, 5);
        expect(setValueAtTime).toHaveBeenCalled();
    });
});
