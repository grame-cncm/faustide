/**
 * Reflects AudioContext state changes on the DAC button.
 *
 * AudioEngine reports low-level `AudioContext.state` changes. This view keeps
 * the legacy button class and label updates out of the composition root while
 * preserving the existing DOM contract used by the toolbar and output panel.
 */
export class AudioOutputStateView {
    /**
     * Applies the visible DAC button state for the current AudioContext state.
     *
     * Only the `running` state is displayed as active. Suspended, interrupted,
     * and closed contexts all keep the output button in its inactive state.
     */
    updateAudioContextState(state: AudioContextState): void {
        if (state === "running") {
            $(".btn-dac").removeClass("btn-light").addClass("btn-primary")
                .children("span").html("Output is On");
            return;
        }
        $(".btn-dac").removeClass("btn-primary").addClass("btn-light")
            .children("span").html("Output is Off");
    }
}
