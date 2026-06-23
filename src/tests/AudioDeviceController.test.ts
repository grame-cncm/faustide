import { beforeEach, describe, expect, it, vi } from "vitest";
import { AudioDeviceController } from "../ui/AudioDeviceController";

const device = (deviceId: string, kind: MediaDeviceKind, label = deviceId) => ({
    deviceId,
    kind,
    label,
    groupId: "",
    toJSON: () => ({})
}) as MediaDeviceInfo;

const setupDom = () => {
    document.body.innerHTML = `
        <div id="input-ui-default"></div>
        <div id="output-ui-default"></div>
        <select id="select-audio-input" disabled>
            <option value="-1">File</option>
        </select>
        <select id="select-audio-output" disabled>
            <option value="-1">Default</option>
        </select>
    `;
};

describe("AudioDeviceController", () => {
    beforeEach(() => {
        vi.restoreAllMocks();
        setupDom();
    });

    it("does nothing when mediaDevices is unavailable", async () => {
        const setSupport = vi.fn();
        await new AudioDeviceController({
            audioEnv: { dspConnectedToInput: false, dspConnectedToOutput: false, inputEnabled: false, outputEnabled: false } as any,
            mediaDevices: undefined,
            getSupportMediaStreamDestination: () => true,
            setSupportMediaStreamDestination: setSupport
        }).bind();

        expect($("#select-audio-input").prop("disabled")).toBe(true);
        expect(setSupport).not.toHaveBeenCalled();
    });

    it("enables selectors and appends discovered input and output devices", async () => {
        const mediaDevices = {
            getUserMedia: vi.fn(async () => ({})),
            enumerateDevices: vi.fn(async () => [
                device("mic", "audioinput", "Mic"),
                device("speaker", "audiooutput", "Speaker")
            ]),
            ondevicechange: null
        };
        await new AudioDeviceController({
            audioEnv: { dspConnectedToInput: false, dspConnectedToOutput: false, inputEnabled: false, outputEnabled: false } as any,
            mediaDevices: mediaDevices as any,
            getSupportMediaStreamDestination: () => true,
            setSupportMediaStreamDestination: vi.fn()
        }).bind();

        expect(mediaDevices.getUserMedia).toHaveBeenCalledWith({ audio: true });
        expect($("#input-ui-default").css("display")).toBe("none");
        expect($("#output-ui-default").css("display")).toBe("none");
        expect($("#select-audio-input").prop("disabled")).toBe(false);
        expect($("#select-audio-output").prop("disabled")).toBe(false);
        expect($("#select-audio-input option[value=mic]").text()).toBe("Mic");
        expect($("#select-audio-output option[value=speaker]").text()).toBe("Speaker");
        expect(mediaDevices.ondevicechange).toEqual(expect.any(Function));
    });

    it("falls back to the AudioContext destination when no output device exists", async () => {
        const audioCtxDestination = {};
        const audioEnv = {
            audioCtx: { destination: audioCtxDestination },
            destination: {},
            dspConnectedToInput: false,
            dspConnectedToOutput: false,
            inputEnabled: false,
            outputEnabled: false
        };
        const setSupport = vi.fn();
        await new AudioDeviceController({
            audioEnv: audioEnv as any,
            mediaDevices: {
                getUserMedia: vi.fn(async () => ({})),
                enumerateDevices: vi.fn(async () => [device("mic", "audioinput")]),
                ondevicechange: null
            } as any,
            getSupportMediaStreamDestination: () => true,
            setSupportMediaStreamDestination: setSupport
        }).bind();

        expect(audioEnv.destination).toBe(audioCtxDestination);
        expect(setSupport).toHaveBeenCalledWith(false);
        expect($("#select-audio-output").prop("disabled")).toBe(true);
    });

    it("refreshes options on device changes", async () => {
        const changeHandler = vi.fn();
        $("#select-audio-input").append(new Option("Old", "old"));
        $("#select-audio-input").val("old").on("change", changeHandler);
        const snapshots = [
            [device("old", "audioinput"), device("speaker", "audiooutput")],
            [device("mic", "audioinput"), device("speaker", "audiooutput")]
        ];
        const mediaDevices = {
            getUserMedia: vi.fn(async () => ({})),
            enumerateDevices: vi.fn(async () => snapshots.shift()),
            ondevicechange: null as (() => Promise<void>) | null
        };
        await new AudioDeviceController({
            audioEnv: { dspConnectedToInput: false, dspConnectedToOutput: false, inputEnabled: false, outputEnabled: false } as any,
            mediaDevices: mediaDevices as any,
            getSupportMediaStreamDestination: () => true,
            setSupportMediaStreamDestination: vi.fn()
        }).bind();

        await mediaDevices.ondevicechange();

        expect($("#select-audio-input option[value=old]").length).toBe(0);
        expect($("#select-audio-input option[value=mic]").length).toBe(1);
        expect($("#select-audio-input").val()).toBe("-1");
        expect(changeHandler).toHaveBeenCalled();
    });
});
