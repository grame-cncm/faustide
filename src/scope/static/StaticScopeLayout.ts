/**
 * Shared canvas layout measurements for the static scope renderers.
 *
 * The renderers, grid overlay, pointer math, and zoom calculations all need to
 * agree on the drawable graph rectangle. Keeping the margins centralized avoids
 * subtle cursor/axis drift when one renderer is adjusted independently.
 */

/** Left gutter reserved for y-axis labels and the static scope unit marker. */
export const STATIC_SCOPE_LEFT_MARGIN = 50;

/** Bottom gutter reserved for x-axis labels and cursor frequency/sample values. */
export const STATIC_SCOPE_BOTTOM_MARGIN = 20;
