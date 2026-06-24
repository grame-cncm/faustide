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
 * It owns no graph logic: callers still perform the actual node connect/
 * disconnect; this type only owns *when the recorded state changes*.
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
}
