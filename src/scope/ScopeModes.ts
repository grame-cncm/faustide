/**
 * Shared display metadata for real-time and offline analyser scope widgets.
 *
 * `Scope` and `StaticScope` historically kept separate private enums with
 * overlapping meanings. This module centralizes the stable numeric values,
 * user-facing labels, and Font Awesome icon classes while the public widget
 * classes keep compatibility wrapper methods.
 */

/** Display modes supported by the offline/static plot scope. */
export enum StaticScopeMode {
    /** Raw numerical data table. */
    Data = 0,
    /** Multi-channel time-domain signals drawn in separate lanes. */
    Interleaved = 1,
    /** Time-domain signals overlaid in a single oscilloscope viewport. */
    Oscilloscope = 2,
    /** Frequency-domain magnitude spectrum. */
    Spectroscope = 3,
    /** Time-frequency waterfall rendered from cached FFT frames. */
    Spectrogram = 4,
    /** Wrapped FFT phase spectrum in radians. */
    Phase = 5
}

/** Frequency axis mapping used by frequency-domain static scope modes. */
export enum FrequencyScaleMode {
    /** Equal spacing per frequency/bin step. */
    Linear = 0,
    /** Logarithmic spacing for perceptual frequency inspection. */
    Logarithmic = 1
}

/** Vertical magnitude mapping for static frequency spectra. */
export enum MagnitudeScaleMode {
    /** Linear amplitude normalized to full scale. */
    Linear = 0,
    /** Decibels relative to full scale. */
    Decibels = 1
}

/** Display modes supported by the real-time analyser scope. */
export enum RealtimeScopeType {
    /** Time-domain analyser waveform. */
    Oscilloscope = 0,
    /** Frequency-domain magnitude spectrum. */
    Spectroscope = 1,
    /** Scrolling time-frequency waterfall. */
    Spectrogram = 2
}

const iconPrefix = "fas fa-sm ";

/**
 * Returns the current Font Awesome classes for a static/offline scope mode.
 */
export const getStaticScopeIconClassName = (scopeMode: StaticScopeMode) => {
    if (scopeMode === StaticScopeMode.Data) return iconPrefix + "fa-table";
    if (scopeMode === StaticScopeMode.Interleaved) return iconPrefix + "fa-water";
    if (scopeMode === StaticScopeMode.Oscilloscope) return iconPrefix + "fa-wave-square";
    if (scopeMode === StaticScopeMode.Spectroscope) return iconPrefix + "fa-chart-bar";
    if (scopeMode === StaticScopeMode.Spectrogram) return iconPrefix + "fa-align-justify";
    if (scopeMode === StaticScopeMode.Phase) return iconPrefix + "fa-chart-line";
    return iconPrefix;
};

/**
 * Returns the current button label for a static/offline scope mode.
 */
export const getStaticScopeModeName = (scopeMode: StaticScopeMode) => {
    if (scopeMode === StaticScopeMode.Data) return "Data";
    if (scopeMode === StaticScopeMode.Interleaved) return "Interleaved";
    if (scopeMode === StaticScopeMode.Oscilloscope) return "Oscilloscope";
    if (scopeMode === StaticScopeMode.Spectroscope) return "Spectroscope";
    if (scopeMode === StaticScopeMode.Spectrogram) return "Spectrogram";
    if (scopeMode === StaticScopeMode.Phase) return "Phase";
    return "";
};

/**
 * Returns the current Font Awesome classes for a real-time analyser scope mode.
 */
export const getRealtimeScopeIconClassName = (scopeType: RealtimeScopeType) => {
    if (scopeType === RealtimeScopeType.Oscilloscope) return iconPrefix + "fa-wave-square";
    if (scopeType === RealtimeScopeType.Spectroscope) return iconPrefix + "fa-chart-bar";
    if (scopeType === RealtimeScopeType.Spectrogram) return iconPrefix + "fa-water";
    return iconPrefix;
};
