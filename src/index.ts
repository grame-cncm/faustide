// import { Faust } from "faust2webaudio";
import * as $ from "jquery";
import * as monaco from "monaco-editor";
import "@fortawesome/fontawesome-free/css/all.css";
import "bootstrap/scss/bootstrap.scss";
import "./index.scss";
declare global {
    interface Window {
        AudioContext: typeof AudioContext;
        webkitAudioContext: typeof AudioContext;
        AudioWorklet?: typeof AudioWorklet;
    }
}
const code = `
import("stdfaust.lib");
process = ba.pulsen(1, 10000) : pm.djembe(60, 0.3, 0.4, 1) <: dm.freeverb_demo;`;
const polycode = `
import("stdfaust.lib");
process = ba.pulsen(1, 10000) : pm.djembe(ba.hz2midikey(freq), 0.3, 0.4, 1) * gate * gain with {
    freq = hslider("freq", 440, 40, 8000, 1);
    gain = hslider("gain", 0.5, 0, 1, 0.01);
    gate = button("gate");
};
effect = dm.freeverb_demo;`;
$(document).ready(async () => {
    const editor = monaco.editor.create($("#editor")[0], {
        value: "function hello() {\n\talert('Hello world!');\n}",
        language: "javascript",
        theme: "vs-dark"
    });
    $(window).on("resize", () => editor.layout());
    // $(window).on("resize", console.log);
    const { Faust } = await import("faust2webaudio");
    const faust = new Faust();
    await faust.ready;
    // const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

});
