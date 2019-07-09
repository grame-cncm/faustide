import { FFT } from "kissfft-js";
import apply from "window-function/apply";
import { blackman } from "window-function";

/* eslint-disable no-param-reassign */
/**
 * Mod support wrapping with negative numbers
 *
 * @param {number} x
 * @param {number} y
 */
export const mod = (x: number, y: number) => (x % y + y) % y;

export const wrap = (i: number, $: number, l: number) => mod(i + $, l);

/**
 * Copy a Float32Array by given offset and length,
 * support negative pointer, will be wrapped correctly
 *
 * @param {Float32Array} src
 * @param {number} [$begin]
 * @param {number} [length]
 * @returns
 */
export const sliceWrap = (src: Float32Array, $begin?: number, length?: number) => {
    if (typeof $begin === "undefined") $begin = 0;
    if (typeof length === "undefined") length = src.length - $begin;
    const dest = new Float32Array(length);
    length = Math.min(src.length, length);
    let $dest = 0;
    while (length) {
        $begin = mod($begin, src.length);
        const amount = Math.min(length, src.length - $begin);
        if ($begin === 0 && amount === src.length) dest.set(src, $dest);
        else dest.set(src.subarray($begin, $begin + amount), $dest);
        $begin += amount;
        length -= amount;
        $dest += amount;
    }
    return dest;
};

/**
 * Set a Float32Array with another by given offset,
 * support negative pointer, will be wrapped correctly
 *
 * @param {Float32Array} dest
 * @param {Float32Array} src
 * @param {number} [$dest]
 * @returns
 */
export const setWrap = (dest: Float32Array, src: Float32Array, $dest?: number) => {
    if (typeof $dest === "undefined") $dest = 0;
    let $src = 0;
    let length = Math.min(dest.length, src.length);
    while (length) {
        $dest = mod($dest, dest.length);
        const amount = Math.min(length, dest.length - $dest);
        if ($src === 0 && amount === src.length) dest.set(src, $dest);
        dest.set(sliceWrap(src, $src, amount), $dest);
        $src += amount;
        $dest += amount;
        length -= amount;
    }
    return dest;
};

/**
 * CanvasRenderingContext2D.fillRect with wrap
 *
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} x
 * @param {number} y
 * @param {number} w
 * @param {number} h
 */
export const fillRectWrap = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, canvasWidth?: number, canvasHeight?: number) => {
    let width = canvasWidth;
    let height = canvasHeight;
    if (!width && !height) ({ width, height } = ctx.canvas);
    else if (!width) width = ctx.canvas.width;
    else if (!height) height = ctx.canvas.height;
    let $x = 0;
    while ($x < w) {
        let $y = 0;
        const startX = wrap($x + x, 0, width);
        const drawW = startX + w < width ? w : width - startX;
        while ($y < h) {
            const startY = wrap($y + y, 0, height);
            const drawH = startY + h < height ? h : height - startY;
            ctx.fillRect(startX, startY, drawW, drawH);
            $y += drawH;
        }
        $x += drawW;
    }
};

/**
 * Calcute FFT power, result array is half sized
 *
 * @param {Float32Array} t
 * @param {FFT} fft
 * @returns
 */
export const getFrequencyDomainData = (t: Float32Array, fft: FFT) => { // eslint-disable-line arrow-body-style
    const ffted = fft.forward(apply(t, blackman));
    const f = new Float32Array(t.length / 2);
    for (let i = 0; i < f.length; i++) {
        f[i] = 20 * Math.log10((ffted[i * 2] ** 2 + ffted[i * 2 + 1] ** 2) ** 0.5 / f.length * 2.38328);
    }
    return f;
};

export const estimateFreq = (fft: Float32Array, sampleRate: number) => {
    const i = fft.reduce((acc, cur, idx, arr) => {
        if (cur > arr[acc]) acc = idx;
        return acc;
    }, 0);
    return sampleRate / 2 * i / fft.length;
};

export const indexToFreq = (i: number, fftBins: number, sampleRate: number) => (i % fftBins) / fftBins * sampleRate / 2;
