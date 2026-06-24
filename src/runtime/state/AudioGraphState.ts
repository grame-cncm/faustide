import type { FaustAudioWorkletNode, FaustScriptProcessorNode } from "@grame/faustwasm";
import type { FaustEditorAudioEnv } from "../types";

type DspNode = FaustScriptProcessorNode<any> | FaustAudioWorkletNode<any>;

/**
 * Single-owner accessor over the mutable audio runtime state (Phase 12).
 *
 * Historically the fields of {@link FaustEditorAudioEnv} were written by
 * reference from several controllers and services; the DSP connection flags in
 * particular were assigned from five different sites and could drift out of
 * sync with the real audio graph. This class wraps the *same* underlying record
 * (so `window.faustEnv.audioEnv` identity and the e2e contract are preserved)
 * and exposes intent-named setters so every mutation funnels through one place.
 *
 * As of Phase 12.3 it also owns the DSP node graph connections (input gain,
 * destination, teardown), so the `connect()`/`disconnect()` calls travel
 * together with the flags they update instead of being duplicated across
 * `DspRunner`, `FaustUiController`, and `AudioOutputController`. Splitter
 * (re)creation stays in `DspRunner` because it is tied to node channel counts.
 */
export class AudioGraphState {
    constructor(private readonly env: FaustEditorAudioEnv) {}

    /** The current DSP node, or undefined when none is running. */
    get currentDsp(): DspNode | undefined {
        return this.env.dsp;
    }

    /** Records a freshly created DSP node as the current one. */
    setCurrentDsp(node: DspNode): void {
        this.env.dsp = node;
    }

    /** Clears the current DSP node (after it has been disconnected/destroyed). */
    clearCurrentDsp(): void {
        delete this.env.dsp;
    }

    /** Whether the current DSP is wired to the input gain node. */
    get connectedToInput(): boolean {
        return this.env.dspConnectedToInput;
    }

    /** Whether the current DSP is wired to the audio destination. */
    get connectedToOutput(): boolean {
        return this.env.dspConnectedToOutput;
    }

    /** Single writer for the input connection flag. */
    markConnectedToInput(connected: boolean): void {
        this.env.dspConnectedToInput = connected;
    }

    /** Single writer for the output connection flag. */
    markConnectedToOutput(connected: boolean): void {
        this.env.dspConnectedToOutput = connected;
    }

    /** Whether an input source is currently feeding the graph. */
    get inputEnabled(): boolean {
        return this.env.inputEnabled;
    }

    setInputEnabled(enabled: boolean): void {
        this.env.inputEnabled = enabled;
    }

    /** Whether DSP output is routed to the destination. */
    get outputEnabled(): boolean {
        return this.env.outputEnabled;
    }

    setOutputEnabled(enabled: boolean): void {
        this.env.outputEnabled = enabled;
    }

    /** Identifier of the currently selected input source. */
    get currentInput(): string | undefined {
        return this.env.currentInput;
    }

    setCurrentInput(id: string): void {
        this.env.currentInput = id;
    }

    /** Output channel splitter feeding the analyser. */
    get splitterOutput(): ChannelSplitterNode | undefined {
        return this.env.splitterOutput;
    }

    setSplitterOutput(splitter: ChannelSplitterNode): void {
        this.env.splitterOutput = splitter;
    }

    /** Audio graph destination node. */
    get destination(): MediaStreamAudioDestinationNode | AudioDestinationNode | undefined {
        return this.env.destination;
    }

    setDestination(destination: MediaStreamAudioDestinationNode | AudioDestinationNode): void {
        this.env.destination = destination;
    }

    /**
     * Tears down the current DSP node: detaches it from the input gain and the
     * destination, destroys it, and clears the slot. Single owner of the DSP
     * teardown sequence previously duplicated in DspRunner and FaustUiController.
     */
    disconnectCurrentDsp(): void {
        const dsp = this.env.dsp;
        if (!dsp) return;
        const gain = this.env.gainInput;
        if (this.connectedToInput && gain) {
            gain.disconnect(dsp);
            this.markConnectedToInput(false);
        }
        dsp.disconnect();
        this.markConnectedToOutput(false);
        dsp.destroy();
        this.clearCurrentDsp();
    }

    /** Connects the input gain to a node that declares inputs, recording the flag. */
    connectInput(node: DspNode): void {
        const gain = this.env.gainInput;
        if (gain && node.getNumInputs()) {
            gain.connect(node);
            this.markConnectedToInput(true);
        }
    }

    /** Connects a node to the audio destination and records the flag. */
    connectToOutput(node: DspNode): void {
        node.connect(this.env.destination);
        this.markConnectedToOutput(true);
    }

    /** Disconnects the current DSP from the destination if currently connected. */
    disconnectFromOutput(): void {
        const dsp = this.env.dsp;
        if (dsp && this.connectedToOutput) {
            dsp.disconnect(this.env.destination);
            this.markConnectedToOutput(false);
        }
    }
}
