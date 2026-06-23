import { beforeEach, describe, expect, it, vi } from "vitest";
import { MidiController } from "../ui/MidiController";

// MidiController tests use a tiny WebMIDI adapter so the UI behavior is covered
// without requiring real MIDI hardware in CI.
const setupDom = () => {
    document.body.innerHTML = `
        <div id="midi-ui-default"></div>
        <span id="midi-ui-note" style="display: none;"></span>
        <select id="select-midi-input" disabled>
            <option value="-1">None</option>
            <option value="-2">Keyboard</option>
        </select>
    `;
};

const createWebMidi = () => {
    const listeners: Record<string, Function> = {};
    const inputListeners: Function[] = [];
    const input = {
        addListener: vi.fn((type, channel, listener) => inputListeners.push(listener)),
        removeListener: vi.fn()
    };
    return {
        listeners,
        inputListeners,
        input,
        adapter: {
            enable: vi.fn((callback) => callback()),
            addListener: vi.fn((type, listener) => {
                listeners[type] = listener;
            }),
            getInputById: vi.fn((id) => id === "device-a" ? input : undefined)
        }
    };
};

describe("MidiController", () => {
    beforeEach(() => {
        $(document).off();
        setupDom();
    });

    it("enables keyboard MIDI and forwards key messages unless the editor is focused", () => {
        const webmidi = createWebMidi();
        const sendToDsp = vi.fn();
        let focused = false;
        const controller = new MidiController({
            midiEnv: { input: null },
            webmidi: webmidi.adapter,
            keyMap: MidiController.KEY_MAP,
            hasEditorFocus: () => focused,
            sendToDsp
        });

        controller.bind();
        $(document).trigger($.Event("keydown", { key: "a" }));
        expect(sendToDsp).toHaveBeenCalledWith([144, 36, 60]);
        expect($("#midi-ui-note").text()).toBe("36");
        expect($("#midi-ui-note").css("display")).not.toBe("none");

        $(document).trigger($.Event("keyup", { key: "a" }));
        expect(sendToDsp).toHaveBeenCalledWith([144, 36, 0]);
        expect($("#midi-ui-note").css("display")).toBe("none");

        focused = true;
        $(document).trigger($.Event("keydown", { key: "s" }));
        expect(sendToDsp).toHaveBeenCalledTimes(2);
    });

    it("selects hardware MIDI inputs and updates active note display", () => {
        const webmidi = createWebMidi();
        const sendToDsp = vi.fn();
        const midiEnv = { input: null };
        const controller = new MidiController({
            midiEnv,
            webmidi: webmidi.adapter,
            keyMap: MidiController.KEY_MAP,
            hasEditorFocus: () => false,
            sendToDsp
        });

        controller.bind();
        $("#select-midi-input").append(new Option("Device A", "device-a")).val("device-a").trigger("change");
        webmidi.inputListeners[0]({ data: new Uint8Array([144, 64, 100]) });
        webmidi.inputListeners[0]({ data: new Uint8Array([128, 64, 0]) });

        expect(webmidi.adapter.getInputById).toHaveBeenCalledWith("device-a");
        expect(midiEnv.input).toBe(webmidi.input);
        expect(sendToDsp).toHaveBeenCalledWith(new Uint8Array([144, 64, 100]));
        expect($("#midi-ui-note").css("display")).toBe("none");
    });

    it("adds and removes connected MIDI input options", () => {
        const webmidi = createWebMidi();
        const controller = new MidiController({
            midiEnv: { input: null },
            webmidi: webmidi.adapter,
            keyMap: MidiController.KEY_MAP,
            hasEditorFocus: () => false,
            sendToDsp: vi.fn()
        });

        controller.bind();
        webmidi.listeners.connected({ port: { type: "input", id: "device-a", name: "Device A" } });
        expect($("#select-midi-input option[value='device-a']")).toHaveLength(1);
        expect($("#select-midi-input").val()).toBe("device-a");

        webmidi.listeners.disconnected({ port: { type: "input", id: "device-a", name: "Device A" } });
        expect($("#select-midi-input option[value='device-a']")).toHaveLength(0);
        expect($("#select-midi-input").val()).toBe("-2");
    });
});
