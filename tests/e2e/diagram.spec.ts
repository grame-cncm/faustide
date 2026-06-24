import { expect, test } from "@playwright/test";
import { openApp, runDsp, setEditorCode } from "./helpers";

test.describe("Block diagram", () => {
    test("running a DSP with the diagram tab active renders the SVG", async ({ page }) => {
        await openApp(page);
        // The diagram tab is the default active tab, so a successful run schedules
        // an updateDiagram() for the current code.
        await setEditorCode(page, "process = _;");
        await runDsp(page);

        const svg = page.locator("#diagram-svg svg");
        await expect(svg.first()).toBeVisible();
        await expect(page.locator("#diagram-default")).toBeHidden();
    });

    test("Ctrl+wheel zoom changes the rendered diagram width", async ({ page }) => {
        await openApp(page);
        await setEditorCode(page, "process = _;");
        await runDsp(page);

        const svg = page.locator("#diagram-svg svg").first();
        await expect(svg).toBeVisible();
        const before = await svg.evaluate((el: SVGElement) => el.getBoundingClientRect().width);

        // The controller only reacts to wheel events carrying ctrlKey, which
        // Playwright's mouse.wheel cannot express, so dispatch one directly.
        await page.locator("#diagram").evaluate(el => {
            el.dispatchEvent(new WheelEvent("wheel", { deltaY: -100, ctrlKey: true, bubbles: true, cancelable: true }));
        });

        await expect.poll(() => svg.evaluate((el: SVGElement) => el.getBoundingClientRect().width)).not.toBe(before);
    });
});
