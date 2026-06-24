/**
 * Static endpoints and namespace map for the Faust documentation shortcuts.
 *
 * Used by the editor's "open docs" action and the hover provider to link into
 * the online Faust libraries / syntax manual from the symbol under the cursor.
 */

/** Base URL of the online Faust standard-library documentation. */
export const faustDocURL = "https://faustlibraries.grame.fr/libs";

/** URL of the Faust language syntax manual. */
export const faustSyntaxURL = "https://faustdoc.grame.fr/manual/syntax/";

/** Maps a library's two-letter namespace prefix (e.g. `os`) to its doc section slug. */
export const docSections: { [key: string]: string } = {
    aa: "aanl",
    an: "analyzers",
    ba: "basics",
    co: "compressors",
    db: "debug",
    de: "delays",
    dm: "demos",
    dx: "dx7",
    en: "envelopes",
    fd: "fds",
    fi: "filters",
    ho: "hoa",
    hy: "hysteresis",
    it: "interpolators",
    ma: "maths",
    mi: "mi",
    ef: "misceffects",
    mo: "motion",
    no: "noises",
    os: "oscillators",
    pf: "phaflangers",
    pm: "physmodels",
    qu: "quantizers",
    rm: "reducemaps",
    re: "reverbs",
    ro: "routes",
    si: "signals",
    so: "soundfiles",
    sp: "spats",
    sy: "synths",
    ve: "vaeffects",
    vl: "version",
    wa: "webaudio",
    wd: "wdmodels"
};
