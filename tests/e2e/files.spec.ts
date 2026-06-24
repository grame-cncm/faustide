import { expect, test } from "@playwright/test";
import { openApp } from "./helpers";

test.describe("File manager", () => {
    test("creating files generates unique untitled names", async ({ page }) => {
        await openApp(page);
        const files = page.locator("#filemanager .filemanager-file");
        await expect(files).toHaveCount(1);

        await page.locator("#filemanager .filemanager-btn-new-file").click();
        await expect(files).toHaveCount(2);
        await expect(page.locator("#filemanager .filemanager-filename")).toContainText(["untitled.dsp", "untitled1.dsp"]);

        // The freshly created name span is focused for editing; commit it as-is.
        await page.locator("#filemanager .filemanager-btn-new-file").click();
        await expect(files).toHaveCount(3);
        await expect(page.locator("#filemanager .filemanager-filename")).toContainText(["untitled.dsp", "untitled1.dsp", "untitled2.dsp"]);
    });

    test("the project file names are exposed through FileManager", async ({ page }) => {
        await openApp(page);
        await page.locator("#filemanager .filemanager-btn-new-file").click();

        const names = await page.evaluate(() => window.faustEnv.uiEnv.fileManager.fileNames);
        expect(names).toContain("untitled.dsp");
        expect(names).toContain("untitled1.dsp");
    });
});
