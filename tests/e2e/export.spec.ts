import { expect, test } from "@playwright/test";
import { openApp } from "./helpers";

test.describe("Export modal", () => {
    test("opening the export modal seeds the project name and default target", async ({ page }) => {
        await openApp(page);
        await page.locator("#btn-export").click();

        await expect(page.locator("#modal-export")).toBeVisible();
        await expect(page.locator("#export-name")).toHaveValue("untitled");
        await expect(page.locator("#export-platform")).toHaveValue("source");
        await expect(page.locator("#export-arch")).toHaveValue("cplusplus");
    });

    test("changing the platform repopulates the architecture options", async ({ page }) => {
        await openApp(page);
        await page.locator("#btn-export").click();
        await expect(page.locator("#modal-export")).toBeVisible();

        await page.locator("#export-platform").selectOption("web");

        await expect(page.locator("#export-arch option")).toHaveCount(2);
        await expect(page.locator("#export-arch option", { hasText: "wasm" })).toHaveCount(1);
        await expect(page.locator("#export-arch option", { hasText: "wap" })).toHaveCount(1);
        await expect.poll(() => page.evaluate(() => window.faustEnv.compileOptions.exportPlatform)).toBe("web");
    });
});
