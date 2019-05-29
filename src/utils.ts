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
 * Calcute FFT power, result array is half sized
 *
 * @param {Float32Array} t
 * @param {FFT} fft
 * @returns
 */
export const getFrequencyDomainData = (t: Float32Array, fft: FFT) => { // eslint-disable-line arrow-body-style
    return fft.forward(apply(t, blackman)).reduce((acc: Float32Array, cur: number, idx: number) => {
        if (idx >= t.length) return acc;
        if (idx % 2 === 0) acc[idx / 2] = cur;
        else acc[(idx - 1) / 2] = 20 * Math.log10((acc[(idx - 1) / 2] ** 2 + cur ** 2) ** 0.5 / t.length);
        return acc;
    }, new Float32Array(t.length / 2));
};
