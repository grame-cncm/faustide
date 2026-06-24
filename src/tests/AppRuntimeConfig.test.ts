import { describe, expect, it } from "vitest";
import {
    AppRuntimeConfig,
    DEFAULT_FAUST_SERVICE_URL,
    detectAudioFeatureSupport
} from "../runtime/AppRuntimeConfig";

describe("AppRuntimeConfig", () => {
    it("keeps mutable server and media stream support values", () => {
        const config = new AppRuntimeConfig({
            server: DEFAULT_FAUST_SERVICE_URL,
            supportAudioWorklet: true,
            supportMediaStreamDestination: true
        });

        expect(config.supportAudioWorklet).toBe(true);
        expect(config.getServer()).toBe(DEFAULT_FAUST_SERVICE_URL);
        expect(config.getSupportMediaStreamDestination()).toBe(true);

        config.setServer("https://example.test/faust");
        config.setSupportMediaStreamDestination(false);

        expect(config.getServer()).toBe("https://example.test/faust");
        expect(config.getSupportMediaStreamDestination()).toBe(false);
    });

    it("detects audio worklet and routed output support from a browser window", () => {
        class MockAudioContext {
            createMediaStreamDestination() {
                return {};
            }
        }
        class MockAudioElement {}
        Object.assign(MockAudioElement.prototype, { setSinkId: () => undefined });
        const browserWindow = {
            AudioContext: MockAudioContext,
            HTMLAudioElement: MockAudioElement,
            AudioWorklet: function AudioWorklet() {}
        };

        expect(detectAudioFeatureSupport(browserWindow as any)).toEqual({
            supportAudioWorklet: true,
            supportMediaStreamDestination: true
        });
    });

    it("reports missing media stream destination support when either browser API is absent", () => {
        class MockAudioContext {}
        class MockAudioElement {}

        expect(detectAudioFeatureSupport({
            AudioContext: MockAudioContext,
            HTMLAudioElement: MockAudioElement
        } as any)).toEqual({
            supportAudioWorklet: false,
            supportMediaStreamDestination: false
        });
    });
});
