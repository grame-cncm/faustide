import { expect, test } from "@playwright/test";
import { openApp } from "./helpers";

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
});
