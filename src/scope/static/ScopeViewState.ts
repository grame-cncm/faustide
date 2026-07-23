import { clampZoomOffset } from "../FrequencyScale";

/** Independent zoom contexts for each family of static scope modes. */
export type ScopeZoomType = "oscilloscope" | "spectroscope" | "spectrogram" | "phase";

const MIN_VERTICAL_ZOOM = 1 / 64;
const MAX_VERTICAL_ZOOM = 64;

/**
 * Per-mode horizontal/vertical zoom and pan state for the static scope, with the
 * numeric clamping rules. Extracted from StaticScope so the bounds and the
 * cursor-anchored zoom math are unit-testable; StaticScope keeps the
 * DOM/cursor/data orchestration around it.
 */
export class ScopeViewState {
    private zoomByType = { oscilloscope: 1, spectroscope: 1, spectrogram: 1, phase: 1 };
    private vzoomByType = { oscilloscope: 1, spectroscope: 1, spectrogram: 1, phase: 1 };
    private zoomOffsetByType = { oscilloscope: 0, spectroscope: 0, spectrogram: 0, phase: 0 };

    getVerticalZoom(type: ScopeZoomType): number {
        return this.vzoomByType[type];
    }

    /** Sets the vertical zoom, clamped to [1/64, 64]. */
    setVerticalZoom(type: ScopeZoomType, newZoom: number): void {
        this.vzoomByType[type] = Math.min(MAX_VERTICAL_ZOOM, Math.max(MIN_VERTICAL_ZOOM, newZoom));
    }

    getZoom(type: ScopeZoomType): number {
        return this.zoomByType[type];
    }

    getZoomOffset(type: ScopeZoomType): number {
        return this.zoomOffsetByType[type];
    }

    /** Sets the horizontal offset, clamped to [0, 1 - 1/zoom] for the active zoom. */
    setZoomOffset(type: ScopeZoomType, newOffset: number): void {
        this.zoomOffsetByType[type] = clampZoomOffset(this.zoomByType[type], newOffset);
    }

    /**
     * Sets the horizontal zoom for `type`, clamped to [1, maxZoom], adjusting the
     * offset so the data point under `cursorRatio` (0..1 across the viewport)
     * stays anchored. Returns the applied zoom (for the caller's label).
     */
    zoomTo(type: ScopeZoomType, newZoom: number, maxZoom: number, cursorRatio: number): number {
        const cursorPositionInData = this.zoomOffsetByType[type] + cursorRatio / this.zoomByType[type];
        const clamped = Math.min(maxZoom, Math.max(1, newZoom));
        this.zoomByType[type] = clamped;
        this.setZoomOffset(type, cursorPositionInData - cursorRatio / clamped);
        return clamped;
    }

    /** Resets horizontal zoom and offset for all modes (vertical zoom is kept). */
    reset(): void {
        this.zoomByType = { oscilloscope: 1, spectroscope: 1, spectrogram: 1, phase: 1 };
        this.zoomOffsetByType = { oscilloscope: 0, spectroscope: 0, spectrogram: 0, phase: 0 };
    }
}
