import { test, expect } from "@playwright/test";

const FAUST_SERVICE_HOST = "https://faustservice.inria.fr";

const stubFaustRoutes = async (page: import("@playwright/test").Page) => {
    await page.route(`${FAUST_SERVICE_HOST}/targets`, async (route) => {
        await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({ linux: ["x64"], web: ["pwa"] })
        });
    });
    await page.route(`${FAUST_SERVICE_HOST}/**`, route => route.fallback());
};

test.describe("Responsive layout", () => {
    test.beforeEach(async ({ page }) => {
        await stubFaustRoutes(page);
    });

    test("collapses panels under mobile width", async ({ page }) => {
        await page.goto("/");
        await expect(page.locator("#left")).toBeVisible();
        await expect(page.locator("#right")).toBeVisible();

        await page.setViewportSize({ width: 800, height: 900 });
        await page.waitForFunction(() => {
            const left = document.getElementById("left");
            const right = document.getElementById("right");
            return !!left && !!right && getComputedStyle(left).display === "none" && getComputedStyle(right).display === "none";
        });

        await expect(page.locator(".btn-show-left").first()).not.toHaveClass(/active/);
        await expect(page.locator(".btn-show-right").first()).not.toHaveClass(/active/);

        await page.setViewportSize({ width: 1280, height: 900 });
        await page.waitForFunction(() => {
            const left = document.getElementById("left");
            const right = document.getElementById("right");
            return !!left && !!right && getComputedStyle(left).display !== "none" && getComputedStyle(right).display !== "none";
        });
    });
});
