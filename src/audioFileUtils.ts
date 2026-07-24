const AUDIO_EXTENSIONS = /\.(wav|mp3|ogg|flac|aac)$/i; //case insensitive

export function isAudioFile(filename: string): boolean {
    return AUDIO_EXTENSIONS.test(filename);
}

export function readFileContent(file: File): Promise<string | Uint8Array> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (typeof reader.result === "string") resolve(reader.result);
            else resolve(new Uint8Array(reader.result));
        };
        reader.onerror = () => reject(new Error(`Failed to read file: ${file.name}`));
        if (isAudioFile(file.name)) reader.readAsArrayBuffer(file);
        else reader.readAsText(file);
    });
}
