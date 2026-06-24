import { beforeEach, describe, expect, it } from "vitest";
import { AudioOutputStateView } from "../ui/AudioOutputStateView";

const setupDom = () => {
    document.body.innerHTML = `
        <button class="btn-dac btn-light"><span>Output is Off</span></button>
        <button class="btn-dac btn-light"><span>Output is Off</span></button>
    `;
};

describe("AudioOutputStateView", () => {
    beforeEach(() => {
        setupDom();
    });

    it("marks all DAC buttons active when the audio context is running", () => {
        new AudioOutputStateView().updateAudioContextState("running");

        expect($(".btn-dac").toArray().every(button => $(button).hasClass("btn-primary"))).toBe(true);
        expect($(".btn-dac").toArray().every(button => !$(button).hasClass("btn-light"))).toBe(true);
        expect($(".btn-dac span").toArray().map(span => $(span).html())).toEqual(["Output is On", "Output is On"]);
    });

    it("marks all DAC buttons inactive when the audio context is not running", () => {
        const view = new AudioOutputStateView();

        view.updateAudioContextState("running");
        view.updateAudioContextState("suspended");

        expect($(".btn-dac").toArray().every(button => $(button).hasClass("btn-light"))).toBe(true);
        expect($(".btn-dac").toArray().every(button => !$(button).hasClass("btn-primary"))).toBe(true);
        expect($(".btn-dac span").toArray().map(span => $(span).html())).toEqual(["Output is Off", "Output is Off"]);
    });
});
