type AudioFeatureWindow = Window & typeof globalThis & {
    AudioWorklet?: unknown;
    webkitAudioContext?: typeof AudioContext;
};

export interface AudioFeatureSupport {
    supportAudioWorklet: boolean;
    supportMediaStreamDestination: boolean;
}

export interface AppRuntimeConfigOptions extends AudioFeatureSupport {
    server: string;
}

/**
 * Default Faust remote compilation service used when the URL does not override it.
 */
export const DEFAULT_FAUST_SERVICE_URL = "https://faustservice.inria.fr";

/**
 * Detects browser audio capabilities that are consumed by the runtime bootstrap.
 *
 * The checks stay in one function so tests can provide a small fake window and
 * `index.ts` does not have to know the exact feature-detection details.
 */
export function detectAudioFeatureSupport(browserWindow: AudioFeatureWindow = window as AudioFeatureWindow): AudioFeatureSupport {
    const audioContext = browserWindow.AudioContext || browserWindow.webkitAudioContext;
    const audioElementPrototype = browserWindow.HTMLAudioElement?.prototype;

    return {
        supportAudioWorklet: !!browserWindow.AudioWorklet,
        supportMediaStreamDestination: !!audioContext?.prototype.createMediaStreamDestination
            && !!audioElementPrototype?.setSinkId
    };
}

/**
 * Mutable runtime options shared by the composition root and UI controllers.
 *
 * Most application state belongs to dedicated services/controllers. This class
 * only owns small cross-cutting settings whose values can be changed by more
 * than one controller during startup or URL import.
 */
export class AppRuntimeConfig {
    readonly supportAudioWorklet: boolean;
    private supportMediaStreamDestination: boolean;
    private server: string;

    constructor(options: AppRuntimeConfigOptions) {
        this.server = options.server;
        this.supportAudioWorklet = options.supportAudioWorklet;
        this.supportMediaStreamDestination = options.supportMediaStreamDestination;
    }

    /**
     * Returns the active Faust service URL for export and URL-parameter flows.
     */
    getServer(): string {
        return this.server;
    }

    /**
     * Updates the Faust service URL after URL parameters or export discovery change it.
     */
    setServer(server: string) {
        this.server = server;
    }

    /**
     * Returns whether the browser currently supports MediaStream audio output routing.
     */
    getSupportMediaStreamDestination(): boolean {
        return this.supportMediaStreamDestination;
    }

    /**
     * Stores the effective MediaStream output support after device enumeration probes.
     */
    setSupportMediaStreamDestination(supported: boolean) {
        this.supportMediaStreamDestination = supported;
    }
}
