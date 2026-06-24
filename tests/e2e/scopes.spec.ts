import { expect, test } from "@playwright/test";
import { openApp, runDsp, setEditorCode } from "./helpers";

test.describe("Analyser scopes", () => {
    test("the offline plot scope is created at startup", async ({ page }) => {
        await openApp(page);

        expect(await page.evaluate(() => Boolean(window.faustEnv.uiEnv.plotScope))).toBe(true);
        await expect(page.locator("#plot-ui .static-scope-canvas")).toHaveCount(1);
    });

    test("running a DSP initializes the input and output scopes with canvases", async ({ page }) => {
        await openApp(page);
        await setEditorCode(page, "process = _;");
        await runDsp(page);

        expect(await page.evaluate(() => Boolean(window.faustEnv.uiEnv.inputScope))).toBe(true);
        expect(await page.evaluate(() => Boolean(window.faustEnv.uiEnv.outputScope))).toBe(true);
        await expect(page.locator("#input-analyser-ui .scope-canvas")).toHaveCount(1);
        await expect(page.locator("#output-analyser-ui .scope-canvas")).toHaveCount(1);
    });

    test("the output scope tracks the DSP output channel count", async ({ page }) => {
        await openApp(page);
        await setEditorCode(page, "process = _, _;");
        await runDsp(page);

        await expect.poll(() => page.evaluate(() => window.faustEnv.uiEnv.outputScope.channels)).toBe(2);
    });

    test("cycling the input scope switches its visualization type", async ({ page }) => {
        await openApp(page);
        await setEditorCode(page, "process = _;");
        await runDsp(page);

        // Oscilloscope (0) -> Spectroscope (1). The overlay button reacts to a
        // direct click event regardless of hover state.
        expect(await page.evaluate(() => window.faustEnv.uiEnv.inputScope.type)).toBe(0);
        await page.locator("#input-analyser-ui .scope-btn-switch").dispatchEvent("click");
        await expect.poll(() => page.evaluate(() => window.faustEnv.uiEnv.inputScope.type)).toBe(1);
    });

    test("an offline plot renders data into the plot scope", async ({ page }) => {
        await openApp(page);
        await setEditorCode(page, "import(\"stdfaust.lib\");\nprocess = os.osc(440) <: _, _;");
        await page.locator("#select-plot-mode").selectOption("offline");
        await page.locator("#btn-plot").click();

        // The "no data" placeholder is hidden once samples are drawn.
        await expect(page.locator("#tab-plot-ui")).toHaveClass(/active/, { timeout: 30000 });
        await expect(page.locator("#plot-ui .static-scope-default")).toBeHidden();
    });
});
