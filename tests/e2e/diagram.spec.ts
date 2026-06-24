import { expect, test } from "@playwright/test";
import { openApp, runDsp, setEditorCode } from "./helpers";

test.describe("Block diagram", () => {
    test("activating the diagram tab after a run renders the SVG", async ({ page }) => {
        await openApp(page);
        await setEditorCode(page, "process = _;");
        await runDsp(page);

        // A successful run switches to the Faust UI tab; activating the diagram
        // tab triggers updateDiagram() for the current code and makes the pane
        // visible.
        await page.locator("#tab-diagram").click();

        const svg = page.locator("#diagram-svg svg");
        await expect(svg.first()).toBeVisible();
        await expect(page.locator("#diagram-default")).toBeHidden();
    });

    test("Ctrl+wheel zoom changes the rendered diagram width", async ({ page }) => {
        await openApp(page);
        await setEditorCode(page, "process = _;");
        await runDsp(page);
        await page.locator("#tab-diagram").click();

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

    test("a hierarchical process generates navigable sub-diagram links", async ({ page }) => {
        await openApp(page);
        // Library blocks make Faust emit separate sub-diagrams reachable through
        // SVG <a> links in the top-level process diagram.
        await setEditorCode(page, "import(\"stdfaust.lib\");\nprocess = os.osc(440) : fi.lowpass(3, 1000) <: dm.freeverb_demo;");
        await runDsp(page);
        await page.locator("#tab-diagram").click();

        const links = page.locator("#diagram-svg svg a");
        await expect(links.first()).toBeAttached();
        const before = await page.locator("#diagram-svg").innerHTML();

        // Clicking a link replaces the pane with the linked sub-diagram via
        // DiagramService.readGeneratedSvg.
        await links.first().dispatchEvent("click");
        await expect.poll(() => page.locator("#diagram-svg").innerHTML()).not.toBe(before);
        await expect(page.locator("#diagram-svg svg").first()).toBeVisible();
    });
});
