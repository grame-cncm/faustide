import { expect, test } from "@playwright/test";
import { openApp, runDsp, setEditorCode } from "./helpers";

type FaustUiWindow = Window & {
    faustUI: {
        componentMap: Record<string, { setValue: (value: number) => void; state: { value: number } }[]>;
    };
};

test.describe("Compile option controls", () => {
    test("selecting a voice count updates the compile options", async ({ page }) => {
        await openApp(page);
        await page.locator("#select-voices").selectOption("8");

        await expect.poll(() => page.evaluate(() => window.faustEnv.compileOptions.voices)).toBe(8);
    });

    test("Mono restores polyphony to zero", async ({ page }) => {
        await openApp(page);
        await page.locator("#select-voices").selectOption("4");
        await expect.poll(() => page.evaluate(() => window.faustEnv.compileOptions.voices)).toBe(4);

        await page.locator("#select-voices").selectOption("0");
        await expect.poll(() => page.evaluate(() => window.faustEnv.compileOptions.voices)).toBe(0);
    });

    test("the buffer-size selector is disabled under AudioWorklet", async ({ page }) => {
        await openApp(page);
        // Chromium supports AudioWorklet, which is the default DSP mode; the
        // buffer size is then fixed at 128 and its selector must be disabled.
        expect(await page.evaluate(() => window.faustEnv.compileOptions.useWorklet)).toBe(true);
        await expect(page.locator("#select-buffer-size")).toBeDisabled();
    });

    test("remembered parameter state matches the DSP and generated UI after recompiling", async ({ page }) => {
        await openApp(page);
        await setEditorCode(page, 'gain = hslider("gain", 0.2, 0, 1, 0.01); process = gain;');
        await page.locator("#check-save-params").check();
        await page.evaluate(() => {
            // ScriptProcessor exposes parameter reads synchronously; AudioParam
            // automation does not advance while headless Web Audio is suspended.
            window.faustEnv.compileOptions.useWorklet = false;
            window.faustEnv.compileOptions.bufferSize = 1024;
        });
        await runDsp(page);

        const paramPath = await page.evaluate(() => window.faustEnv.audioEnv.dsp.getParams()[0]);
        const uiFrame = page.frame({ url: /faust-ui\/index\.html/ });
        if (!uiFrame) throw new Error("Generated Faust UI frame was not created");
        await uiFrame.evaluate((path) => {
            const faustUI = (window as FaustUiWindow).faustUI;
            faustUI.componentMap[path][0].setValue(0.75);
        }, paramPath);
        await expect.poll(() => page.evaluate(path => window.faustEnv.audioEnv.dsp.getParamValue(path), paramPath)).toBeCloseTo(0.75);
        await page.evaluate(() => {
            (window as Window & { __previousDsp?: unknown }).__previousDsp = window.faustEnv.audioEnv.dsp;
        });
        await page.locator("#btn-run").click();
        await expect.poll(() => page.evaluate(() => (
            window.faustEnv.audioEnv.dsp !== (window as Window & { __previousDsp?: unknown }).__previousDsp
        )), { timeout: 30000 }).toBe(true);

        await expect.poll(() => page.evaluate(path => window.faustEnv.audioEnv.dsp.getParamValue(path), paramPath)).toBeCloseTo(0.75);
        await expect.poll(() => uiFrame.evaluate((path) => {
            const faustUI = (window as FaustUiWindow).faustUI;
            return faustUI.componentMap[path][0].state.value;
        }, paramPath)).toBeCloseTo(0.75);
    });
});
