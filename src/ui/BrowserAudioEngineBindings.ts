type UnlockTarget = {
    add: (handler: () => any) => void;
    remove: (handler: () => any) => void;
};

type BrowserAudioEngineOptions = {
    gainContainer: HTMLDivElement;
    mediaElementProvider: () => HTMLMediaElement | null;
    unlockTarget: UnlockTarget;
    onStateChange: (state: AudioContextState) => void;
};

type BrowserAudioEngineBindingsOptions = {
    onStateChange: (state: AudioContextState) => void;
};

/**
 * Builds the browser DOM adapters required by AudioEngine.
 *
 * AudioEngine stays free of jQuery and concrete selectors. This binding class
 * is the small UI-side adapter that knows where the input gain container,
 * sample-player media element, and browser gesture unlock target live.
 */
export class BrowserAudioEngineBindings {
    private readonly onStateChange: (state: AudioContextState) => void;

    /**
     * Stores the state-change bridge used by AudioEngine.
     */
    constructor(options: BrowserAudioEngineBindingsOptions) {
        this.onStateChange = options.onStateChange;
    }

    /**
     * Returns the DOM bindings expected by AudioEngine's constructor.
     */
    createOptions(): BrowserAudioEngineOptions {
        return {
            gainContainer: $<HTMLDivElement>("#input-gain")[0],
            mediaElementProvider: () => $<HTMLAudioElement>("#source-waveform audio")[0] || null,
            unlockTarget: {
                add: handler => $("body").on("touchstart touchend mousedown keydown", handler),
                remove: handler => $("body").off("touchstart touchend mousedown keydown", handler)
            },
            onStateChange: this.onStateChange
        };
    }
}
