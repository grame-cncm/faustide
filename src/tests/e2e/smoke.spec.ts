import { test, expect } from "@playwright/test";

const FAUST_SERVICE_HOST = "https://faustservice.inria.fr";

test.beforeEach(async ({ page }) => {
    await page.route(`${FAUST_SERVICE_HOST}/targets`, async (route) => {
        await route.fulfill({
            contentType: "application/json",
            body: JSON.stringify({
                linux: ["x64"],
                web: ["pwa"]
            })
        });
    });

    await page.route(new RegExp(`${FAUST_SERVICE_HOST.replace(/\./g, "\\.")}/.*`), async (route) => {
        const url = route.request().url();
        if (url.endsWith("/precompile")) {
            await route.fulfill({ status: 200, body: "DONE" });
            return;
        }
        await route.fulfill({ status: 200, body: "OK" });
    });
});

test("renders core IDE panels", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("#filemanager")).toBeVisible();
    await expect(page.locator("#filemanager .filemanager-file").first()).toBeVisible();

    const runButton = page.locator("#btn-run");
    await expect(runButton).toBeVisible();
    await expect(runButton).toBeDisabled();

    await expect(page.locator("#btn-export")).toBeVisible();
    await expect(page.locator("#btn-share")).toBeVisible();
});
