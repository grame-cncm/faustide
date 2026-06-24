import type { WebMidiEventConnected, WebMidiEventDisconnected } from "webmidi";
import { Key2Midi } from "../Key2Midi";
import type { FaustEditorMIDIEnv } from "../runtime/types";

type MidiInput = {
    addListener: (type: "midimessage", channel: "all", listener: (event: { data: number[] | Uint8Array }) => void) => void;
};

type WebMidiAdapter = {
    enable: (callback: (error?: Error) => void) => void;
    addListener: (type: "connected" | "disconnected", listener: (event: WebMidiEventConnected | WebMidiEventDisconnected) => void) => void;
    getInputById: (id: string) => MidiInput | undefined;
};

type MidiControllerOptions = {
    midiEnv: FaustEditorMIDIEnv;
    webmidi: WebMidiAdapter;
    keyMap: typeof Key2Midi.KEY_MAP;
    hasEditorFocus: () => boolean;
    sendToDsp: (data: number[] | Uint8Array) => void;
};

/**
 * Owns MIDI input selection, keyboard-as-MIDI routing, and active-note display.
 *
 * The controller does not know how DSP nodes are compiled; it receives a
 * `sendToDsp` callback and only forwards MIDI byte messages to it.
 */
export class MidiController {
    static KEY_MAP = Key2Midi.KEY_MAP;
    static KEY_MAP_FR = Key2Midi.KEY_MAP_FR;

    private readonly midiEnv: FaustEditorMIDIEnv;
    private readonly webmidi: WebMidiAdapter;
    private readonly hasEditorFocus: () => boolean;
    private readonly sendToDsp: (data: number[] | Uint8Array) => void;
    private readonly key2Midi: Key2Midi;
    private activeKeys: number[] = [];

    constructor(options: MidiControllerOptions) {
        this.midiEnv = options.midiEnv;
        this.webmidi = options.webmidi;
        this.hasEditorFocus = options.hasEditorFocus;
        this.sendToDsp = options.sendToDsp;
        this.key2Midi = new Key2Midi({ keyMap: options.keyMap, enabled: false });
    }

    /**
     * Wires keyboard listeners, the input selector, and Web MIDI device
     * hotplug. Enables the selector only once Web MIDI access is granted.
     */
    bind() {
        $(document).on("keydown", (e) => {
            if (this.hasEditorFocus()) return;
            this.handleKeyDown(e.key);
        });
        $(document).on("keyup", (e) => {
            if (this.hasEditorFocus()) return;
            this.handleKeyUp(e.key);
        });
        $<HTMLSelectElement>("#select-midi-input").on("change", (e) => this.selectInput(e.currentTarget.value));
        $("#select-midi-input").children("option").eq(1).prop("selected", true).change();
        this.webmidi.enable((error) => {
            if (error) return;
            $("#midi-ui-default").hide();
            $("#select-midi-input").prop("disabled", false);
            this.webmidi.addListener("connected", e => this.handleMIDIConnect(e as WebMidiEventConnected));
            this.webmidi.addListener("disconnected", e => this.handleMIDIDisconnect(e as WebMidiEventDisconnected));
        });
    }

    /** Forwards a physical key press to the computer-keyboard MIDI mapper. */
    handleKeyDown(key: string) {
        this.key2Midi.handleKeyDown(key);
    }

    /** Forwards a physical key release to the computer-keyboard MIDI mapper. */
    handleKeyUp(key: string) {
        this.key2Midi.handleKeyUp(key);
    }

    /**
     * Switches the active MIDI source. The sentinel ids `-2` (computer
     * keyboard) and `-1` (none) bypass Web MIDI; any other id selects a
     * hardware input. Detaches the previous listener and clears held notes.
     */
    private selectInput(id: string) {
        if (this.midiEnv.input) this.midiEnv.input.removeListener("midimessage", "all");
        this.activeKeys = [];
        const listener = (data: number[] | Uint8Array) => {
            this.sendToDsp(data);
            this.updateActiveNote(data);
        };
        if (id === "-2") {
            this.key2Midi.handler = listener;
            this.key2Midi.enabled = true;
            return;
        }
        this.key2Midi.enabled = false;
        if (id === "-1") return;
        const input = this.webmidi.getInputById(id);
        if (!input) return;
        this.midiEnv.input = input as any;
        input.addListener("midimessage", "all", e => listener(e.data));
    }

    /**
     * Tracks held notes from raw MIDI bytes and shows the most recent one.
     * Note-on (status 144, velocity > 0) pushes; note-off (128, or 144 with
     * velocity 0) removes and hides the display once nothing is held.
     */
    private updateActiveNote(data: number[] | Uint8Array) {
        if (data[0] === 144 && data[2]) {
            if (this.activeKeys.indexOf(data[1]) === -1) this.activeKeys.push(data[1]);
            $("#midi-ui-note").text(data[1]).show();
        } else if (data[0] === 128 || (data[0] === 144 && !data[2])) {
            this.activeKeys.splice(this.activeKeys.indexOf(data[1]), 1);
            if (this.activeKeys.length === 0) $("#midi-ui-note").hide();
            else $("#midi-ui-note").text(this.activeKeys[this.activeKeys.length - 1]);
        }
    }

    /** Adds a newly connected hardware input to the selector and selects it. */
    private handleMIDIConnect(e: WebMidiEventConnected) {
        if (e.port.type !== "input") return;
        const $select = $("#select-midi-input");
        if ($select.find(`option[value="${e.port.id}"]`).length) return;
        const $option = $(new Option(e.port.name, e.port.id));
        $select.append($option);
        $option.prop("selected", true).change();
    }

    /** Removes a disconnected input from the selector and falls back to the last option. */
    private handleMIDIDisconnect(e: WebMidiEventDisconnected) {
        if (e.port.type !== "input") return;
        const $select = $("#select-midi-input");
        const $find = $select.find(`option[value="${e.port.id}"]`);
        if (!$find.length) return;
        $find.remove();
        $select.children("option").last().prop("selected", true).change();
    }
}
