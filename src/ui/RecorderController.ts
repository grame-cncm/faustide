import type { Recorder } from "../Recorder";

type RecorderControllerOptions = {
    recorder: Recorder;
    fileNameProvider: () => string;
};

/**
 * Binds recorder arm/disarm and WAV download controls.
 *
 * Recording data collection remains in the DSP plot handler; this controller
 * only owns the buttons that toggle recorder state and export the accumulated
 * WAV buffer.
 */
export class RecorderController {
    private readonly recorder: Recorder;
    private readonly fileNameProvider: () => string;

    constructor(options: RecorderControllerOptions) {
        this.recorder = options.recorder;
        this.fileNameProvider = options.fileNameProvider;
    }

    bind() {
        $("#recorder-aim").on("click", (e) => this.toggleRecording($(e.currentTarget)));
        $("#recorder-save").on("click", () => this.save());
        $("#a-recorder-save").on("click", e => e.stopPropagation());
    }

    private toggleRecording($button: JQuery<HTMLElement>) {
        if ($button.hasClass("btn-light")) {
            $button.removeClass("btn-light").addClass("btn-danger");
            this.recorder.enabled = true;
        } else {
            $button.addClass("btn-light").removeClass("btn-danger");
            this.recorder.enabled = false;
        }
    }

    private async save() {
        if (this.recorder.totalSec === 0) return;
        const blob = new Blob([await this.recorder.encode()], { type: "audio/wav" });
        const url = URL.createObjectURL(blob);
        $("#a-recorder-save").attr({ href: url, download: `${this.fileNameProvider()}.wav` })[0].click();
        setTimeout(() => URL.revokeObjectURL(url), 5000);
    }
}
