/**
 * Owns the Faust code alert banner and its detail modal.
 *
 * The rest of the runtime reports errors as strings or Error objects; this
 * controller is the single DOM boundary that formats those values for the
 * bottom alert, hides it on demand, and copies the current message to the
 * modal detail view.
 */
export class AlertController {
    /**
     * Binds close buttons and detail links for all alert elements.
     */
    bind() {
        $(".alert>.close").on("click", e => $(e.currentTarget).parent().css("visibility", "hidden"));
        $(".a-alert-faust-code-detail").on("click", e => {
            $("#modal-alert-faust-code-detail .modal-body").text($(e.currentTarget).siblings("span").text());
        });
    }

    /**
     * Displays a Faust error in the main code alert and mirrors it to the
     * browser console for developer diagnostics.
     *
     * @param error error object or already formatted message
     */
    show(error: Error | string) {
        // eslint-disable-next-line no-console
        console.error(error);
        $(".alert-faust-code>span").text(error instanceof Error ? error.message : error);
        $("#alert-faust-code").css("visibility", "visible");
    }

    /**
     * Hides the main Faust code alert without changing its last message.
     */
    clear() {
        $("#alert-faust-code").css("visibility", "hidden");
    }
}
