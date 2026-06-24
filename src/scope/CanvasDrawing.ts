/**
 * Canvas drawing primitives shared by the real-time and static scope widgets.
 *
 * These helpers intentionally stay small and mechanical. Higher-level renderers
 * keep their own grid, event, and statistics logic until those paths are
 * characterized and extracted in later Phase 11 steps.
 */

/**
 * Fills the complete canvas viewport with a solid background color.
 *
 * The function preserves the caller's drawing state because both historical
 * scope implementations wrapped their background fill in `save()`/`restore()`.
 */
export const drawCanvasBackground = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    fillStyle: string
) => {
    ctx.save();
    ctx.fillStyle = fillStyle;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
};
