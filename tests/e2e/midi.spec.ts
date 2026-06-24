import { expect, test } from "@playwright/test";
import { openApp } from "./helpers";

test.describe("Computer-keyboard MIDI", () => {
    test("the computer keyboard is the default MIDI source", async ({ page }) => {
        await openApp(page);
        await expect(page.locator("#select-midi-input")).toHaveValue("-2");
    });

    test("holding a mapped key shows the active note", async ({ page }) => {
        await openApp(page);
        // The keydown handler is ignored while the Monaco editor has focus.
        await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur());
        await page.locator("#filemanager").click();

        await page.keyboard.down("a"); // 'a' maps to a MIDI note in the QWERTY key map
        await expect(page.locator("#midi-ui-note")).toBeVisible();
        await expect(page.locator("#midi-ui-note")).not.toBeEmpty();
        await page.keyboard.up("a");
    });

    test("releasing the only held key hides the active note", async ({ page }) => {
        await openApp(page);
        await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur());
        await page.locator("#filemanager").click();

        await page.keyboard.down("a");
        await expect(page.locator("#midi-ui-note")).toBeVisible();
        await page.keyboard.up("a");
        await expect(page.locator("#midi-ui-note")).toBeHidden();
    });
});
