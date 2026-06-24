import { expect, test } from "@playwright/test";
import { openApp, runDsp, setEditorCode } from "./helpers";

test.describe("DSP compile and run", () => {
    test("running the default DSP instantiates a node and reveals the Faust UI", async ({ page }) => {
        await openApp(page);
        await runDsp(page);

        await expect(page.locator("#nav-item-faust-ui")).toBeVisible();
        await expect(page.locator("#faust-ui-default")).toBeHidden();
        await expect(page.locator("#alert-faust-code")).toBeHidden();
    });

    test("running a trivial DSP reports the expected I/O counts", async ({ page }) => {
        await openApp(page);
        await setEditorCode(page, "process = _;");
        await runDsp(page);

        const io = await page.evaluate(() => ({
            inputs: window.faustEnv.audioEnv.dsp.getNumInputs(),
            outputs: window.faustEnv.audioEnv.dsp.getNumOutputs()
        }));
        expect(io).toEqual({ inputs: 1, outputs: 1 });
    });

    test("a syntax error surfaces the Faust code alert and instantiates no DSP", async ({ page }) => {
        await openApp(page);
        await setEditorCode(page, "process = this is not faust;");
        await page.locator("#btn-run").click();

        await expect(page.locator("#alert-faust-code")).toBeVisible();
        await expect(page.locator(".alert-faust-code>span")).not.toBeEmpty();
        expect(await page.evaluate(() => Boolean(window.faustEnv.audioEnv.dsp))).toBe(false);
    });

    test("recompiling replaces the previous DSP node", async ({ page }) => {
        await openApp(page);
        await setEditorCode(page, "process = _;");
        await runDsp(page);

        await setEditorCode(page, "process = _, _;");
        await page.locator("#btn-run").click();
        await expect.poll(() => page.evaluate(() => window.faustEnv.audioEnv.dsp.getNumOutputs()), { timeout: 30000 }).toBe(2);
    });
});
