import { beforeEach, describe, expect, it, vi } from "vitest";
import { BrowserAudioEngineBindings } from "../ui/BrowserAudioEngineBindings";

const setupDom = () => {
    document.body.innerHTML = `
        <div id="input-gain"></div>
        <div id="source-waveform"><audio></audio></div>
    `;
};

describe("BrowserAudioEngineBindings", () => {
    beforeEach(() => {
        setupDom();
    });

    it("returns the DOM elements used by AudioEngine", () => {
        const onStateChange = vi.fn();
        const options = new BrowserAudioEngineBindings({ onStateChange }).createOptions();

        expect(options.gainContainer).toBe($("#input-gain")[0]);
        expect(options.mediaElementProvider()).toBe($("#source-waveform audio")[0]);

        options.onStateChange("running");
        expect(onStateChange).toHaveBeenCalledWith("running");
    });

    it("binds and unbinds the audio unlock handler on body gestures", () => {
        const handler = vi.fn();
        const options = new BrowserAudioEngineBindings({ onStateChange: vi.fn() }).createOptions();

        options.unlockTarget.add(handler);
        $("body").trigger("mousedown");
        expect(handler).toHaveBeenCalledTimes(1);

        options.unlockTarget.remove(handler);
        $("body").trigger("mousedown");
        expect(handler).toHaveBeenCalledTimes(1);
    });
});
