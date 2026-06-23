import type { FaustEditorAudioEnv } from "../runtime/types";

type AudioDeviceControllerOptions = {
    audioEnv: FaustEditorAudioEnv;
    mediaDevices?: MediaDevices;
    getSupportMediaStreamDestination: () => boolean;
    setSupportMediaStreamDestination: (supported: boolean) => void;
};

/**
 * Owns audio device discovery and select-option synchronization.
 *
 * Browser permission prompts and devicechange events are kept here so the
 * composition root only provides the audio environment and the current output
 * routing capability flag.
 */
export class AudioDeviceController {
    private readonly audioEnv: FaustEditorAudioEnv;
    private readonly mediaDevices?: MediaDevices;
    private readonly getSupportMediaStreamDestination: () => boolean;
    private readonly setSupportMediaStreamDestination: (supported: boolean) => void;

    constructor(options: AudioDeviceControllerOptions) {
        this.audioEnv = options.audioEnv;
        this.mediaDevices = options.mediaDevices;
        this.getSupportMediaStreamDestination = options.getSupportMediaStreamDestination;
        this.setSupportMediaStreamDestination = options.setSupportMediaStreamDestination;
    }

    async bind() {
        if (!this.mediaDevices) return;
        await this.requestAudioPermission();
        const devices = await this.mediaDevices.enumerateDevices();
        $("#input-ui-default").hide();
        const $selectInput = $("#select-audio-input").prop("disabled", false);
        let $selectOutput: JQuery<HTMLElement>;
        if (this.getSupportMediaStreamDestination()) {
            if (devices.find(device => device.kind === "audiooutput")) {
                $("#output-ui-default").hide();
                $selectOutput = $("#select-audio-output").prop("disabled", false);
            } else {
                if (this.audioEnv.audioCtx && this.audioEnv.destination) this.audioEnv.destination = this.audioEnv.audioCtx.destination;
                this.setSupportMediaStreamDestination(false);
            }
        }
        this.mediaDevices.ondevicechange = () => this.handleMediaDeviceChange();
        this.appendDevices(devices, $selectInput, $selectOutput);
    }

    private async handleMediaDeviceChange() {
        await this.requestAudioPermission();
        const devices = await this.mediaDevices.enumerateDevices();
        const $selectInput = $("#select-audio-input");
        const $selectOutput = $("#select-audio-output");
        this.removeMissingOptions($selectInput, devices, "audioinput");
        this.removeMissingOptions($selectOutput, devices, "audiooutput");
        this.appendDevices(devices, $selectInput, $selectOutput);
    }

    private async requestAudioPermission() {
        try {
            await this.mediaDevices.getUserMedia({ audio: true });
        } catch (e) { } // eslint-disable-line no-empty
    }

    private removeMissingOptions($select: JQuery<HTMLElement>, devices: MediaDeviceInfo[], kind: MediaDeviceKind) {
        $select.children("option").each((i, e: HTMLOptionElement) => {
            if (e.value === "-1") return;
            if (!devices.find(device => device.deviceId === e.value && device.kind === kind)) {
                e.remove();
                if (e.selected) $select.find("option").eq(0).prop("selected", true).change();
            }
        });
    }

    private appendDevices(devices: MediaDeviceInfo[], $selectInput: JQuery<HTMLElement>, $selectOutput?: JQuery<HTMLElement>) {
        devices.forEach((device) => {
            if (!device.deviceId) return;
            if (device.kind === "audioinput") {
                if ($selectInput.find(`option[value=${device.deviceId}]`).length) return;
                $selectInput.append(new Option(device.label || device.deviceId, device.deviceId));
            }
            if (this.getSupportMediaStreamDestination() && device.kind === "audiooutput") {
                if ($selectOutput.find(`option[value=${device.deviceId}]`).length) return;
                $selectOutput.append(new Option(device.label || device.deviceId, device.deviceId));
            }
        });
    }
}
