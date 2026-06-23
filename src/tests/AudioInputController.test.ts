import { beforeEach, describe, expect, it, vi } from "vitest";
import { AudioInputController } from "../ui/AudioInputController";

type WaveSurferHandler = () => void;

const createWaveSurfer = () => {
    const handlers: Record<string, WaveSurferHandler> = {};
    return {
        handlers,
        isReady: true,
        backend: { buffer: { numberOfChannels: 1 } },
        on: vi.fn((event: string, handler: WaveSurferHandler) => {
            handlers[event] = handler;
        }),
        load: vi.fn(),
        play: vi.fn(),
        pause: vi.fn(),
        seekTo: vi.fn(),
        isPlaying: vi.fn(() => false)
    };
};

const setupDom = () => {
    document.body.innerHTML = `
        <select id="select-audio-input">
            <option value="-1">File</option>
            <option value="mic">Mic</option>
        </select>
        <div id="source-ui"></div>
        <div id="input-analyser-ui"></div>
        <button id="btn-source-play"><i class="fa-play"></i></button>
        <button id="btn-source-rewind"></button>
        <button id="btn-source-loop"></button>
        <div id="source-waveform"><audio></audio></div>
        <div id="source-overlay"></div>
    `;
};

describe("AudioInputController", () => {
    beforeEach(() => {
        vi.restoreAllMocks();
        vi.stubGlobal("URL", {
            createObjectURL: vi.fn(() => "blob:source"),
            revokeObjectURL: vi.fn()
        });
        setupDom();
    });

    it("creates WaveSurfer lazily and connects the selected file input", async () => {
        const input = { connect: vi.fn(), disconnect: vi.fn() };
        const audioEnv = {
            inputs: { "-1": input },
            gainInput: {},
            gainUIInput: { channels: 0 },
            dspConnectedToInput: false,
            dspConnectedToOutput: false,
            inputEnabled: false,
            outputEnabled: false
        };
        const wavesurfer = createWaveSurfer();
        const initAudioCtx = vi.fn(async () => audioEnv as any);
        const onWaveSurferCreated = vi.fn();
        new AudioInputController({
            audioEnv: audioEnv as any,
            uiEnv: { inputScope: { disabled: false } } as any,
            waveSurferFactory: { create: vi.fn(() => wavesurfer as any) },
            initAudioCtx,
            showError: vi.fn(),
            onWaveSurferCreated
        }).bind();

        $("#select-audio-input").val("-1").trigger("change");
        await Promise.resolve();

        expect(wavesurfer.load).toHaveBeenCalledWith("./02-XYLO1.mp3");
        expect(onWaveSurferCreated).toHaveBeenCalledWith(wavesurfer);
        expect($("#source-ui").css("display")).not.toBe("none");
        expect($("#input-analyser-ui").css("display")).toBe("none");
        expect(audioEnv.gainUIInput.channels).toBe(1);
        expect(initAudioCtx).toHaveBeenCalledWith("-1");
        expect(audioEnv.currentInput).toBe("-1");
        expect(audioEnv.inputEnabled).toBe(true);
        expect(input.connect).toHaveBeenCalledWith(audioEnv.gainInput);
    });

    it("switches to a hardware input and disconnects the previous source", async () => {
        const fileInput = { connect: vi.fn(), disconnect: vi.fn() };
        const micInput = { connect: vi.fn(), disconnect: vi.fn() };
        const audioEnv = {
            audioCtx: {},
            inputs: { "-1": fileInput, mic: micInput },
            currentInput: "-1",
            gainInput: {},
            gainUIInput: { channels: 0 },
            dspConnectedToInput: false,
            dspConnectedToOutput: false,
            inputEnabled: true,
            outputEnabled: false
        };
        const wavesurfer = createWaveSurfer();
        new AudioInputController({
            audioEnv: audioEnv as any,
            uiEnv: { inputScope: { disabled: true } } as any,
            waveSurferFactory: { create: vi.fn(() => wavesurfer as any) },
            initAudioCtx: vi.fn(async () => audioEnv as any),
            showError: vi.fn()
        }).bind();

        $("#select-audio-input").val("mic").trigger("change");
        await Promise.resolve();

        expect(fileInput.disconnect).toHaveBeenCalledWith(audioEnv.gainInput);
        expect($("#source-ui").css("display")).toBe("none");
        expect($("#input-analyser-ui").css("display")).not.toBe("none");
        expect(audioEnv.gainUIInput.channels).toBe(2);
        expect(audioEnv.currentInput).toBe("mic");
        expect(micInput.connect).toHaveBeenCalledWith(audioEnv.gainInput);
    });

    it("updates analyser UI state from WaveSurfer events", async () => {
        const audioEnv = {
            inputs: { "-1": { connect: vi.fn() } },
            gainInput: {},
            gainUIInput: { channels: 0 },
            dspConnectedToInput: false,
            dspConnectedToOutput: false,
            inputEnabled: false,
            outputEnabled: false
        };
        const inputScope = { disabled: true };
        const wavesurfer = createWaveSurfer();
        new AudioInputController({
            audioEnv: audioEnv as any,
            uiEnv: { inputScope } as any,
            waveSurferFactory: { create: vi.fn(() => wavesurfer as any) },
            initAudioCtx: vi.fn(async () => audioEnv as any),
            showError: vi.fn()
        }).bind();
        $("#select-audio-input").val("-1").trigger("change");
        await Promise.resolve();

        wavesurfer.handlers.play();
        expect($("#btn-source-play .fa-pause").length).toBe(1);
        expect($("#input-analyser-ui").css("display")).not.toBe("none");
        expect(inputScope.disabled).toBe(false);

        wavesurfer.handlers.pause();
        expect($("#btn-source-play .fa-play").length).toBe(1);
        expect($("#input-analyser-ui").css("display")).toBe("none");
        expect(inputScope.disabled).toBe(true);
    });

    it("toggles playback and rewinds the source waveform", async () => {
        const audioEnv = {
            inputs: { "-1": { connect: vi.fn() } },
            gainInput: {},
            gainUIInput: { channels: 0 },
            dspConnectedToInput: false,
            dspConnectedToOutput: false,
            inputEnabled: false,
            outputEnabled: false
        };
        const wavesurfer = createWaveSurfer();
        new AudioInputController({
            audioEnv: audioEnv as any,
            uiEnv: { inputScope: { disabled: true } } as any,
            waveSurferFactory: { create: vi.fn(() => wavesurfer as any) },
            initAudioCtx: vi.fn(async () => audioEnv as any),
            showError: vi.fn()
        }).bind();
        $("#select-audio-input").val("-1").trigger("change");
        await Promise.resolve();

        $("#btn-source-play").trigger("click");
        expect(wavesurfer.play).toHaveBeenCalledTimes(1);

        wavesurfer.isPlaying.mockReturnValue(true);
        $("#btn-source-play").trigger("click");
        expect(wavesurfer.pause).toHaveBeenCalledTimes(1);

        $("#btn-source-rewind").trigger("click");
        expect(wavesurfer.seekTo).toHaveBeenCalledWith(0);
    });
});
