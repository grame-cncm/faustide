import { test, expect } from "@playwright/test";

const FAUST_SERVICE_HOST = "https://faustservice.inria.fr";
const HEX_RESPONSE = "abcdef";

test.beforeEach(async ({ page }) => {
    await page.route(`${FAUST_SERVICE_HOST}/targets`, async (route) => {
        await route.fulfill({
            status: 200,
            contentType: "application/json",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
                "Access-Control-Allow-Headers": "*"
            },
            body: JSON.stringify({
                linux: ["x64"],
                web: ["pwa"]
            })
        });
    });

    await page.route(`${FAUST_SERVICE_HOST}/**`, async (route) => {
        if (route.request().method() === "OPTIONS") {
            await route.fulfill({
                status: 204,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
                    "Access-Control-Allow-Headers": "*"
                }
            });
            return;
        }
        await route.fallback();
    });

    await page.route(`${FAUST_SERVICE_HOST}/filepost`, async (route) => {
        await route.fulfill({
            status: 200,
            contentType: "text/plain",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
                "Access-Control-Allow-Headers": "*"
            },
            body: HEX_RESPONSE
        });
    });

    await page.route(
        new RegExp(`${FAUST_SERVICE_HOST.replace(/\./g, "\\.")}/${HEX_RESPONSE}/[^/]+/[^/]+/precompile$`),
        async (route) => {
            await route.fulfill({
                status: 200,
                contentType: "text/plain",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
                    "Access-Control-Allow-Headers": "*",
                    Location: "https://downloads.example/binary.zip"
                },
                body: "DONE"
            });
        }
    );
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

test.skip("completes export flow with mocked Faust service", async ({ page }) => {
    await page.goto("/");

    await page.locator("#btn-export").click();
    const modal = page.locator("#modal-export.show");
    await expect(modal).toBeVisible();

    const nameInput = page.locator("#export-name");
    await nameInput.waitFor();
    await nameInput.fill("playwrighttest");

    await page.waitForSelector('#export-platform option[value="web"]', { state: "attached" });
    await page.selectOption("#export-platform", "web");
    await page.waitForSelector('#export-arch option', { state: "attached" });
    await page.selectOption("#export-platform", "web");
    await page.waitForSelector('#export-arch option', { state: "attached" });

    const submitButton = page.locator("#export-submit");
    await expect(submitButton).toBeEnabled({ timeout: 10_000 });
    await submitButton.click();

    const downloadButton = page.locator("#export-download");
    await expect(downloadButton).toBeVisible();
    await expect(downloadButton.locator("a, #a-export-download")).toHaveAttribute("href", new RegExp(HEX_RESPONSE));

    await expect(page.locator("#qr-code")).toBeVisible();
});

test("creates a new DSP file in the file manager", async ({ page }) => {
    await page.goto("/");

    const newFileButton = page.locator(".filemanager-btn-new-file");
    await newFileButton.click();

    const files = page.locator("#filemanager .filemanager-file");
    await expect(files).toHaveCount(2);
    await expect(files.last()).toContainText("untitled1.dsp");
    await expect(files.last()).toHaveClass(/selected/);
});

test("opens and closes the Share modal", async ({ page }) => {
    await page.goto("/");

    await page.locator("#btn-share").click();
    const shareModal = page.locator("#modal-share.show");
    await expect(shareModal).toBeVisible();

    const closeBtn = page.locator("#modal-share button.close, #modal-share button[data-dismiss=\"modal\"]").first();
    await closeBtn.click();
    await expect(shareModal).toBeHidden();
});

test("toggles left and right panels", async ({ page }) => {
    await page.goto("/");

    const leftPanel = page.locator("#left");
    const rightPanel = page.locator("#right");

    const toggleLeft = page.locator(".btn-show-left");
    const toggleRight = page.locator(".btn-show-right");

    await toggleLeft.click();
    await expect(leftPanel).toBeHidden();
    await toggleLeft.click();
    await expect(leftPanel).toBeVisible();

    await toggleRight.click();
    await expect(rightPanel).toBeHidden();
    await toggleRight.click();
    await expect(rightPanel).toBeVisible();
});

test("renames the main DSP file", async ({ page }) => {
    await page.goto("/");

    const firstFile = page.locator("#filemanager .filemanager-file").first();
    await firstFile.locator(".filemanager-btn-rename").click();

    const nameSpan = firstFile.locator(".filemanager-filename");
    await nameSpan.click();
    await nameSpan.fill("testrename.dsp");
    await page.keyboard.press("Enter");

    await expect(firstFile).toContainText("testrename.dsp");
    await expect(firstFile).toHaveClass(/selected/);
});
