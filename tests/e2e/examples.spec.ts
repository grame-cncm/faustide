import { expect, test } from "@playwright/test";
import { openApp } from "./helpers";

// A representative sample across categories. The full index has ~180 DSPs;
// these exercise the load-example path end to end (fetch -> import -> compile).
const EXAMPLES = [
    "freeverb.dsp",
    "moogVCF.dsp",
    "noiseGate.dsp",
    "cryBaby.dsp"
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
