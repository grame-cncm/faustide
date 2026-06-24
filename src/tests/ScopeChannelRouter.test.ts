import { afterEach, describe, expect, it, vi } from "vitest";
import { routeScopeChannel } from "../scope/realtime/ScopeChannelRouter";
import { createMockAnalyserNode, createMockChannelSplitter } from "./helpers/audioAnalyser";

describe("ScopeChannelRouter", () => {
    afterEach(() => {
        vi.useRealTimers();
    });

    it("ignores channels outside the available range", () => {
        const splitter = createMockChannelSplitter();
        const analyser = createMockAnalyserNode();

        const routed = routeScopeChannel({
            splitter: splitter as unknown as ChannelSplitterNode,
            analyser: analyser as unknown as AnalyserNode,
            channels: 2,
            currentChannel: 0,
            nextChannel: 2
        });

        expect(routed).toBeUndefined();
        expect(splitter.connect).not.toHaveBeenCalled();
    });

    it("returns the existing channel without reconnecting when unchanged", () => {
        const splitter = createMockChannelSplitter();
        const analyser = createMockAnalyserNode();

        const routed = routeScopeChannel({
            splitter: splitter as unknown as ChannelSplitterNode,
            analyser: analyser as unknown as AnalyserNode,
            channels: 2,
            currentChannel: 1,
            nextChannel: 1
        });

        expect(routed).toBe(1);
        expect(splitter.connect).not.toHaveBeenCalled();
        expect(splitter.disconnect).not.toHaveBeenCalled();
    });

    it("connects the new channel before disconnecting the old channel", () => {
        vi.useFakeTimers();
        const splitter = createMockChannelSplitter();
        const analyser = createMockAnalyserNode();

        const routed = routeScopeChannel({
            splitter: splitter as unknown as ChannelSplitterNode,
            analyser: analyser as unknown as AnalyserNode,
            channels: 2,
            currentChannel: 0,
            nextChannel: 1
        });

        expect(routed).toBe(1);
        expect(splitter.connect).toHaveBeenCalledWith(analyser, 1, 0);
        expect(splitter.disconnect).not.toHaveBeenCalled();

        vi.advanceTimersByTime(10);
        expect(splitter.disconnect).toHaveBeenCalledWith(analyser, 0, 0);
    });
});
