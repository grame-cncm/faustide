import { expect, test } from "@playwright/test";
import { openApp } from "./helpers";

test.describe("Panel layout", () => {
    test.use({ viewport: { width: 1280, height: 800 } });

    test("toggling the left panel hides and shows it", async ({ page }) => {
        await openApp(page);
        const left = page.locator("#left");
        await expect(left).toBeVisible();

        await page.locator(".btn-show-left").first().click();
        await expect(left).toBeHidden();

        await page.locator(".btn-show-left").first().click();
        await expect(left).toBeVisible();
    });

    test("toggling the right panel hides and shows it", async ({ page }) => {
        await openApp(page);
        const right = page.locator("#right");
        await expect(right).toBeVisible();

        await page.locator(".btn-show-right").first().click();
        await expect(right).toBeHidden();

        await page.locator(".btn-show-right").first().click();
        await expect(right).toBeVisible();
    });

    test("narrowing the window below 900px collapses both panels", async ({ page }) => {
        await openApp(page);
        await page.setViewportSize({ width: 800, height: 800 });

        await expect(page.locator("#left")).toBeHidden();
        await expect(page.locator("#right")).toBeHidden();
    });
});
