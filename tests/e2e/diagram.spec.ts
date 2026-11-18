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

    test("a polyphonic effect gets its own navigable diagram", async ({ page }) => {
        await openApp(page);
        await setEditorCode(page, "import(\"stdfaust.lib\");\nprocess = os.osc(hslider(\"freq\", 440, 50, 1000, 1)) * button(\"gate\") <: _,_;\neffect = dm.zita_light;");
        await runDsp(page);
        await page.locator("#tab-diagram").click();

        const selector = page.locator("#diagram-selector");
        await expect(selector).toBeVisible();
        await expect(page.locator("#diagram-svg")).toHaveAttribute("data-diagram", "main");
        const processSvg = await page.locator("#diagram-svg").innerHTML();

        await selector.locator("button[data-diagram=effect]").dispatchEvent("click");
        await expect(page.locator("#diagram-svg")).toHaveAttribute("data-diagram", "effect");
        await expect.poll(() => page.locator("#diagram-svg").innerHTML()).not.toBe(processSvg);

        // Effect sub-diagram links are read from the effect diagram directory.
        const effectSvg = await page.locator("#diagram-svg").innerHTML();
        await page.locator("#diagram-svg svg a").first().dispatchEvent("click");
        await expect.poll(() => page.locator("#diagram-svg").innerHTML()).not.toBe(effectSvg);
        await expect(page.locator("#diagram-svg svg").first()).toBeVisible();

        await selector.locator("button[data-diagram=main]").dispatchEvent("click");
        await expect.poll(() => page.locator("#diagram-svg").innerHTML()).toBe(processSvg);
    });

    test("no diagram selector without an effect", async ({ page }) => {
        await openApp(page);
        await setEditorCode(page, "process = _;");
        await runDsp(page);
        await page.locator("#tab-diagram").click();

        await expect(page.locator("#diagram-svg svg").first()).toBeVisible();
        await expect(page.locator("#diagram-selector")).toBeHidden();
    });
    test("Step makes a diagram that steps sample by sample and keeps the sample across links", async ({ page }) => {
        await openApp(page);
        // A counter fed by a step: the wire after the recursion counts 1, 2, 3...
        // The library filter is a folded block, so the diagram links to its own file.
        await setEditorCode(page, "import(\"stdfaust.lib\");\nprocess = + ~ _ : fi.lowpass(3, 1000);");
        await runDsp(page);
        // The run switches to the Faust UI tab once the DSP exists: wait for it
        // before showing the diagram, which real clicks below must reach.
        await expect(page.locator("#faust-ui")).toHaveClass(/active/);
        await page.locator("#tab-diagram").click();
        await expect(page.locator("#diagram")).toHaveClass(/show/);
        await expect(page.locator("#diagram-svg svg").first()).toBeVisible();
        await expect(page.locator("#diagram-svg svg script.faust-svg-step")).toHaveCount(0);

        // The sample count and test signal are enabled with Step.
        await expect(page.locator("#diagram-step-samples")).toBeDisabled();
        await page.locator("#check-diagram-step").check();
        await page.locator("#diagram-step-samples").fill("16");
        await page.locator("#diagram-step-input").fill("1");
        await page.locator("#diagram-step-input").blur();

        // The player of the inserted SVG is started on it, at sample 0.
        const svg = page.locator("#diagram-svg svg").first();
        await expect(page.locator("#diagram-svg svg script.faust-svg-step")).toHaveCount(1);
        const state = () => svg.evaluate(el => (el as any).__faustSvgStep?.state());
        await expect.poll(state).toEqual({ use: 0, n: 0 });

        // A click gives the diagram the keys; arrows step, End goes to the last sample.
        await svg.click({ position: { x: 5, y: 5 } });
        await page.keyboard.press("ArrowRight");
        await page.keyboard.press("ArrowRight");
        await expect.poll(state).toEqual({ use: 0, n: 2 });
        await page.keyboard.press("End");
        await expect.poll(state).toEqual({ use: 0, n: 15 });
        await page.keyboard.press("ArrowLeft");
        await expect.poll(state).toEqual({ use: 0, n: 14 });

        // The link to the folded filter opens its diagram, stepped at the same sample.
        const before = await page.locator("#diagram-svg").innerHTML();
        await page.locator("#diagram-svg svg a").first().dispatchEvent("click");
        await expect.poll(() => page.locator("#diagram-svg").innerHTML()).not.toBe(before);
        await expect(page.locator("#diagram-svg svg script.faust-svg-step")).toHaveCount(1);
        await expect.poll(state).toEqual({ use: 0, n: 14 });

        // Step off: plain diagrams again.
        await page.locator("#check-diagram-step").uncheck();
        await expect(page.locator("#diagram-svg svg script.faust-svg-step")).toHaveCount(0);
        await expect(page.locator("#diagram-step-samples")).toBeDisabled();
    });
});
