/**
 * Initializes Bootstrap tooltip behavior used by the shell controls.
 *
 * Most controllers own their own event handlers, but tooltip setup is a
 * cross-cutting bootstrap concern. This controller keeps those jQuery/Bootstrap
 * calls out of the composition root.
 */
export class TooltipController {
    /**
     * Enables hover-only tooltips constrained to the viewport.
     */
    bind() {
        $('[data-toggle="tooltip"]').tooltip({ trigger: "hover", boundary: "viewport" });
        $("#btn-export").tooltip({ trigger: "hover", boundary: "viewport" });
        $("#btn-share").tooltip({ trigger: "hover", boundary: "viewport" });
        $("#btn-tab-setting").tooltip({ trigger: "hover", boundary: "viewport" });
    }
}
