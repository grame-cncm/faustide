import { expect, Page, test } from "@playwright/test";
import { openApp, runDsp, setEditorCode } from "./helpers";

// Records the running DSP for ~1s, encodes the WAV, and returns header info,
// the estimated channel-0 frequency (via zero crossings) and how many distinct
// underlying buffers were captured. A correct recording of a 441 Hz sine yields
// ~441 Hz and many distinct buffers; the reused-buffer bug collapsed every
// block to a single shared array.
const recordAndAnalyze = (page: Page) => page.evaluate(async () => {
    const rec: any = window.faustEnv.recorder;
    const uniqueBuffers = new Set((rec.data as Float32Array[][]).map(b => b[0])).size;
    const arr: ArrayBuffer = await rec.encode();
    const dv = new DataView(arr);
    const audioFormat = dv.getUint16(20, true);
    const numChannels = dv.getUint16(22, true);
    const sampleRate = dv.getUint32(24, true);
    const bytesPerSample = audioFormat === 3 ? 4 : 2;
    const totalFrames = (arr.byteLength - 44) / (bytesPerSample * numChannels);
    const sample = (f: number) => (audioFormat === 3
        ? dv.getFloat32(44 + f * numChannels * 4, true)
        : dv.getInt16(44 + f * numChannels * 2, true) / 32768);
    let crossings = 0; let prev = 0; let sumSq = 0;
    for (let f = 0; f < totalFrames; f++) {
        const v = sample(f);
        sumSq += v * v;
        if (f > 0 && ((prev < 0 && v >= 0) || (prev >= 0 && v < 0))) crossings++;
        prev = v;
    }
    return {
        uniqueBuffers,
        bufferCount: rec.data.length,
        numChannels,
        sampleRate,
        rms: Math.sqrt(sumSq / totalFrames),
        estFreqHz: (crossings / 2) / (totalFrames / sampleRate)
    };
});

const recordOscillator = async (page: Page) => {
    await setEditorCode(page, "import(\"stdfaust.lib\");\nprocess = os.osc(441) <: _, _;");
    await runDsp(page);
    await page.evaluate(() => { window.faustEnv.recorder.enabled = true; });
    await page.waitForTimeout(1000);
    await page.evaluate(() => { window.faustEnv.recorder.enabled = false; });
};

test.describe("Audio recording", () => {
    test("records a faithful WAV of a 441 Hz sine (AudioWorklet)", async ({ page }) => {
        await openApp(page);
        await recordOscillator(page);

        const r = await recordAndAnalyze(page);
        expect(r.bufferCount).toBeGreaterThan(10);
        expect(r.uniqueBuffers).toBe(r.bufferCount); // every block is its own copy
        expect(r.numChannels).toBe(2);
        expect(r.rms).toBeGreaterThan(0.5); // full-scale sine ~0.707
        expect(r.estFreqHz).toBeGreaterThan(420);
        expect(r.estFreqHz).toBeLessThan(462);
    });

    test("records a faithful WAV in ScriptProcessor mode (reused-buffer regression)", async ({ page }) => {
        await openApp(page);
        await page.evaluate(() => { window.faustEnv.compileOptions.useWorklet = false; });
        await recordOscillator(page);

        const r = await recordAndAnalyze(page);
        // The bug made every block share one Float32Array (uniqueBuffers === 1).
        expect(r.uniqueBuffers).toBe(r.bufferCount);
        expect(r.estFreqHz).toBeGreaterThan(420);
        expect(r.estFreqHz).toBeLessThan(462);
    });
});
