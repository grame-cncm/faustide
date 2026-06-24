import { expect, test } from "@playwright/test";
import { openApp } from "./helpers";

test.describe("Plot controls", () => {
    test("plot mode drives the plot button label and visibility", async ({ page }) => {
        await openApp(page);
        const btn = page.locator("#btn-plot");

        await page.locator("#select-plot-mode").selectOption("offline");
        await expect(btn).toBeVisible();
        await expect(btn.locator("span")).toHaveText("Plot First Samples");

        await page.locator("#select-plot-mode").selectOption("manual");
        await expect(btn).toBeVisible();
        await expect(btn.locator("span")).toHaveText("Plot (Snapshot)");

        await page.locator("#select-plot-mode").selectOption("continuous");
        await expect(btn).toBeHidden();
    });

    test("offline plot renders samples into the plot scope", async ({ page }) => {
        await openApp(page);
        await page.evaluate(() => window.faustEnv.editor.setValue("import(\"stdfaust.lib\");\nprocess = os.osc(440) <: _, _;"));
        await page.locator("#select-plot-mode").selectOption("offline");
        await page.locator("#btn-plot").click();

        // A successful offline plot renders the samples and activates the plot tab.
        await expect(page.locator("#tab-plot-ui")).toHaveClass(/active/, { timeout: 30000 });
    });
});
