import { expect, test } from "@playwright/test";
import { openApp } from "./helpers";

// A representative sample spanning every top-level example category (the full
// index has ~180 DSPs). Each name is unique across the index so the menu
// locator is unambiguous. These exercise the load-example path end to end
// (fetch -> import -> compile -> run).
const EXAMPLES = [
    "oneSourceToStereo.dsp", "fourSourcesToOcto.dsp", // ambisonics
    "spectralLevel.dsp", "vumeter.dsp",               // analysis
    "AdditiveSynth.dsp", "AdditiveSynth_Analog.dsp",  // generator
    "echo.dsp", "stereoEcho.dsp",                     // delayEcho
    "noiseGate.dsp", "distortion.dsp",                // dynamic
    "moogVCF.dsp", "cryBaby.dsp",                     // filtering
    "wind.dsp", "rain.dsp",                           // gameaudio
    "dx7.dsp", "filterOsc.dsp",                       // misc
    "matrix.dsp", "switcher.dsp",                     // bela
    "phaser.dsp", "flanger.dsp",                      // phasing
    "vocalFOF.dsp", "churchBell.dsp",                 // physicalModeling
    "pitchShifter.dsp",                               // pitchShifting
    "harmonicExciter.dsp",                            // psychoacoustic
    "reverbTank.dsp",                                 // reverb (jprev omitted: ~30s compile, too close to timeout)
    "myEffect.dsp", "reverb.dsp",                     // smartKeyboard
    "spcap.dsp", "panpot.dsp"                         // spat
];

test.describe("Examples menu", () => {
    for (const name of EXAMPLES) {
        test(`loading and running "${name}" compiles without error`, async ({ page }) => {
            await openApp(page);

            // The example items are rendered at startup (inside collapsed
            // submenus). Dispatch the click directly so the delegated loader
            // handler runs without needing the dropdown to be visible.
            const item = page.locator("#tab-examples .faust-example", { hasText: name }).first();
            await expect(item).toHaveCount(1);
            await item.dispatchEvent("click");

            // The example is imported as the new main file.
            await expect.poll(() => page.evaluate(() => window.faustEnv.uiEnv.fileManager.mainFileName))
                .toContain(name.replace(/[^a-zA-Z0-9_.]/g, ""));

            await page.locator("#btn-run").click();
            await expect.poll(() => page.evaluate(() => Boolean(window.faustEnv.audioEnv.dsp)), { timeout: 30000 }).toBe(true);
            await expect(page.locator("#alert-faust-code")).toBeHidden();
        });
    }
});
