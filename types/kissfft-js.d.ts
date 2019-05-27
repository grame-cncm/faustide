export class FFT {
    constructor(size: number);
    forward(input: ArrayLike<number>): Float32Array;
    inverse(input: ArrayLike<number>): Float32Array;
    dispose(): void;
}

export class FFTR {
    constructor(size: number);
    forward(input: ArrayLike<number>): Float32Array;
    inverse(input: ArrayLike<number>): Float32Array;
    dispose(): void;
}
