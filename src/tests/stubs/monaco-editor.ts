/**
 * Minimal `monaco-editor` stub for unit tests.
 *
 * The real package is a browser-only bundle that Vite cannot resolve in the
 * node test environment, which is why modules statically importing it were
 * previously untestable. This stub provides just the runtime values our code
 * constructs (`Position`, `Range`) plus empty `languages`/`editor` namespaces
 * for the type-only imports. It is wired in through `test.alias` in
 * `vitest.config.ts`.
 */
export class Position {
    constructor(public readonly lineNumber: number, public readonly column: number) {}
}

export class Range {
    constructor(
        public readonly startLineNumber: number,
        public readonly startColumn: number,
        public readonly endLineNumber: number,
        public readonly endColumn: number
    ) {}
}

export const languages = {} as any;
export const editor = {} as any;
