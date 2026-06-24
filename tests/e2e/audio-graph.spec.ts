import { expect, Page, test } from "@playwright/test";
import { openApp, runDsp, setEditorCode } from "./helpers";

// Reads the absolute energy currently flowing through the output analyser. A
// non-zero value means the DSP is actually wired through to the destination
// (the graph is being pulled); ~0 means the branch is silent/disconnected.
const outputEnergy = (page: Page) => page.evaluate(() => {
    const analyser = window.faustEnv.audioEnv.analyserOutput;
    if (!analyser) return 0;
    const data = new Float32Array(analyser.fftSize);
    analyser.getFloatTimeDomainData(data);
    let sum = 0;
    for (let i = 0; i < data.length; i++) sum += Math.abs(data[i]);
    return sum;
});

const connectedToOutput = (page: Page) => page.evaluate(() => window.faustEnv.audioEnv.dspConnectedToOutput);
const connectedToInput = (page: Page) => page.evaluate(() => window.faustEnv.audioEnv.dspConnectedToInput);

test.describe("Audio graph wiring", () => {
    test("a running oscillator produces signal at the output analyser", async ({ page }) => {
        await openApp(page);
        await setEditorCode(page, "import(\"stdfaust.lib\");\nprocess = os.osc(440) <: _, _;");
        await runDsp(page);

        expect(await connectedToOutput(page)).toBe(true);
        await expect.poll(() => outputEnergy(page), { timeout: 15000 }).toBeGreaterThan(0);
    });

    test("toggling the DAC disconnects and reconnects the DSP from the destination", async ({ page }) => {
        await openApp(page);
        await setEditorCode(page, "import(\"stdfaust.lib\");\nprocess = os.osc(440) <: _, _;");
        await runDsp(page);
        expect(await connectedToOutput(page)).toBe(true);

        // Disable output: the DSP is detached from the destination. (The output
        // analyser is fed from the splitter branch, not the destination, so the
        // connection flag — not analyser energy — is the destination indicator.)
        await page.locator(".btn-dac").first().click();
        await expect.poll(() => connectedToOutput(page)).toBe(false);

        // Re-enable output.
        await page.locator(".btn-dac").first().click();
        await expect.poll(() => connectedToOutput(page)).toBe(true);
    });

    test("the input connection flag tracks whether the DSP has inputs", async ({ page }) => {
        await openApp(page);
        await setEditorCode(page, "process = _;"); // 1 input
        await runDsp(page);
        expect(await connectedToInput(page)).toBe(true);

        await setEditorCode(page, "import(\"stdfaust.lib\");\nprocess = os.osc(440);"); // 0 inputs
        await page.locator("#btn-run").click();
        await expect.poll(() => connectedToInput(page)).toBe(false);
    });

    test("recompiling keeps the new DSP connected to the output", async ({ page }) => {
        await openApp(page);
        await setEditorCode(page, "import(\"stdfaust.lib\");\nprocess = os.osc(440) <: _, _;");
        await runDsp(page);
        expect(await connectedToOutput(page)).toBe(true);

        await setEditorCode(page, "import(\"stdfaust.lib\");\nprocess = os.osc(220) <: _, _;");
        await page.locator("#btn-run").click();
        await expect.poll(() => connectedToOutput(page)).toBe(true);
        await expect.poll(() => outputEnergy(page)).toBeGreaterThan(0);
    });
});
