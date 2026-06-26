/** Sub-directory inside the project root used for soft-deleted files. */
export const TRASH_DIR = "__trash__";

export type TFileSystem = {
    rename: (oldName: string, newName: string) => any;
    unlink: (name: string) => any;
    readdir: (path: string) => string[];
    mkdir: (path: string, mode?: number) => any;
    isDir: (mode: number) => boolean;
    isFile: (mode: number) => boolean;
    stat: (path: string) => { mode: number; [key: string]: any };
    writeFile: (path: string, data: string | ArrayBufferView, opt?: { flags: string }) => any;
    readFile: (path: string, opt?: { encoding?: string; flags?: string }) => any;
};

/**
 * Built-in fallback project used when no editable DSP file exists.
 */
export const DEFAULT_DSP_CODE = `import("stdfaust.lib");
process = ba.pulsen(1, 10000) : pm.djembe(60, 0.3, 0.4, 1) <: dm.freeverb_demo;`;

/**
 * Pure project/file rules used by FileManager.
 *
 * The model owns file list state, selected file, main DSP selection, filename
 * sanitization, audio-file guards, and reads/writes through the Faust virtual
 * filesystem. It intentionally does not render DOM or call UI callbacks.
 */
export class ProjectModel {
    fileList: string[] = [];
    selectedFile: string = null;
    mainFileIndex = 0;
    fs: TFileSystem;
    path: string;

    constructor(options: { fs: TFileSystem; path?: string }) {
        this.fs = options.fs;
        this.path = options.path || "./";
    }

    /**
     * Loads the filesystem-backed project and guarantees that at least one DSP
     * file exists.
     *
     * FileManager calls this during construction before rendering. Keeping the
     * fallback creation here means the UI layer does not need to know which
     * default source code should be inserted when a project is empty.
     */
    loadProjectFiles() {
        this.listFiles();
        const createdDefaultFile = this.fileList.length === 0;
        if (createdDefaultFile) this.createDefaultFile();
        return {
            fileList: this.fileList,
            createdDefaultFile
        };
    }

    /**
     * Keeps only the characters accepted by the legacy FileManager UI.
     */
    static sanitizeFileName(fileName: string, fallback = "untitled.dsp") {
        return fileName.replace(/[^a-zA-Z0-9_.]/g, "") || fallback;
    }

    /**
     * Audio files can be part of a project but are not editable code or main DSP.
     */
    static isAudioFile(fileName: string) {
        return !!fileName && !!fileName.match(/\.(wav|mp3|ogg|flac|aac)$/);
    }

    /**
     * Refreshes the model file list from the backing virtual filesystem.
     */
    listFiles() {
        this.fileList = this.fs.readdir(this.path).filter(fileName => fileName !== "." && fileName !== ".." && this.fs.isFile(this.fs.stat(this.path + fileName).mode));
        return this.fileList;
    }

    /**
     * Produces the next available `untitledN.ext` name.
     */
    uniqueUntitledName(extension: string | string[] = "dsp") {
        let i = 1;
        let fileName = `untitled${i}.${extension}`;
        while (this.fileList.indexOf(fileName) !== -1) {
            fileName = `untitled${++i}.${extension}`;
        }
        return fileName;
    }

    /**
     * Sanitizes a requested name and falls back to a unique untitled name when
     * the requested name is empty or already used.
     */
    defaultFileName(fileNameIn?: string) {
        let fileName: string;
        if (fileNameIn) fileName = ProjectModel.sanitizeFileName(fileNameIn, "");
        const extension = fileNameIn ? fileNameIn.split(".").slice(-1) || "lib" : "dsp";
        if (!fileName || this.fileList.indexOf(fileName) !== -1) return this.uniqueUntitledName(extension);
        return fileName;
    }

    /**
     * Creates a file in the backing filesystem and appends it to the model list.
     */
    createFile(fileNameIn?: string, content?: string | Uint8Array) {
        const fileName = this.defaultFileName(fileNameIn);
        this.fs.writeFile(this.path + fileName, content || "");
        this.fileList.push(fileName);
        return fileName;
    }

    /**
     * Creates the built-in fallback DSP file.
     */
    createDefaultFile() {
        return this.createFile("untitled.dsp", DEFAULT_DSP_CODE);
    }

    /**
     * Renames a file and keeps selected-file state coherent.
     */
    renameFile(oldName: string, newNameIn: string) {
        const newName = ProjectModel.sanitizeFileName(newNameIn);
        if (oldName === newName) return null;
        const index = this.fileList.indexOf(oldName);
        if (index === -1) return null;
        this.fs.rename(this.path + oldName, this.path + newName);
        this.fileList[index] = newName;
        if (this.selectedFile === oldName) this.selectedFile = newName;
        return newName;
    }

    /**
     * Deletes a file and clears selection when the deleted file was selected.
     */
    deleteFile(fileName: string) {
        const index = this.fileList.indexOf(fileName);
        if (index === -1) return false;
        this.fs.unlink(this.path + fileName);
        this.fileList.splice(index, 1);
        if (this.selectedFile === fileName) this.selectedFile = null;
        return true;
    }

    // ── Trash helpers ──────────────────────────────────────────────────────

    private trashDir(): string { return `${this.path}${TRASH_DIR}`; }

    private trashFilePath(name: string): string { return `${this.trashDir()}/${name}`; }

    private ensureTrashDir(): void {
        try { this.fs.mkdir(this.trashDir()); } catch { /* already exists */ }
    }

    private trashHas(name: string): boolean {
        try { this.fs.stat(this.trashFilePath(name)); return true; } catch { return false; }
    }

    // ── Trash public API ───────────────────────────────────────────────────

    /**
     * Moves a file into the __trash__ sub-directory (soft delete).
     * If a file with the same name is already in the trash, it is overwritten.
     * Returns false when the file is not in the project.
     */
    softDeleteFile(fileName: string): boolean {
        const index = this.fileList.indexOf(fileName);
        if (index === -1) return false;
        this.ensureTrashDir();
        if (this.trashHas(fileName)) this.fs.unlink(this.trashFilePath(fileName));
        this.fs.rename(this.path + fileName, this.trashFilePath(fileName));
        this.fileList.splice(index, 1);
        if (this.selectedFile === fileName) this.selectedFile = null;
        return true;
    }

    /** Returns the names of files currently in the trash. */
    listTrash(): string[] {
        try {
            return this.fs.readdir(this.trashDir()).filter(
                name => name !== "." && name !== ".." && this.fs.isFile(this.fs.stat(this.trashFilePath(name)).mode)
            );
        } catch { return []; }
    }

    /**
     * Moves a trashed file back into the project.
     * Returns false when the file is not in trash, or when the same name
     * already exists in the project (caller should rename first).
     */
    restoreFile(name: string): boolean {
        if (!this.trashHas(name)) return false;
        if (this.fileList.includes(name)) return false;
        this.fs.rename(this.trashFilePath(name), this.path + name);
        this.fileList.push(name);
        return true;
    }

    /** Permanently deletes one file from the trash. Returns false when not found. */
    purgeFile(name: string): boolean {
        if (!this.trashHas(name)) return false;
        this.fs.unlink(this.trashFilePath(name));
        return true;
    }

    /** Permanently deletes all files in the trash. */
    emptyTrash(): void {
        this.listTrash().forEach((name) => { this.purgeFile(name); });
    }

    // ──────────────────────────────────────────────────────────────────────

    /**
     * Selects an editable non-audio project file.
     */
    selectFile(fileName: string) {
        if (ProjectModel.isAudioFile(fileName)) return false;
        if (this.fileList.indexOf(fileName) === -1) return false;
        this.selectedFile = fileName;
        return true;
    }

    /**
     * Sets the main DSP file by index, ignoring audio files.
     */
    setMainFile(index: number) {
        if (index >= this.fileList.length) return false;
        if (ProjectModel.isAudioFile(this.fileList[index])) return false;
        this.mainFileIndex = index;
        return true;
    }

    /**
     * Sets the main file from a stored filename, falling back to the first file.
     *
     * The persisted compile option can refer to a missing file after imports or
     * deletes. This helper centralizes the legacy fallback to index 0.
     */
    setMainFileByName(fileName?: string) {
        const index = Math.max(0, this.fileList.indexOf(fileName));
        return this.setMainFile(index);
    }

    /**
     * Returns the file that should become selected after a deletion.
     *
     * If the deletion emptied the project, a new default DSP file is created
     * first. Otherwise the legacy behavior selects the first remaining file.
     */
    ensureSelectionAfterDelete() {
        const createdDefaultFile = this.fileList.length === 0;
        const fileName = createdDefaultFile ? this.createDefaultFile() : this.fileList[0];
        return {
            fileName,
            createdDefaultFile
        };
    }

    /**
     * Replaces a file only when content changed.
     */
    saveFile(fileName: string, content: string) {
        if (this.getValue(fileName) === content) return false;
        this.fs.unlink(this.path + fileName);
        this.fs.writeFile(this.path + fileName, content);
        return true;
    }

    /**
     * Reads text files as UTF-8 and audio files as raw bytes.
     */
    getValue(fileName: string) {
        if (ProjectModel.isAudioFile(fileName)) return this.fs.readFile(this.path + fileName) as Uint8Array;
        return this.fs.readFile(this.path + fileName, { encoding: "utf8" }) as string;
    }

    get mainFileName() {
        return this.fileList[this.mainFileIndex];
    }

    get mainFileNameWithoutSuffix() {
        return this.mainFileName.split(".").slice(0, -1).join(".");
    }

    get mainCode() {
        const fileName = this.mainFileName;
        return fileName ? this.getValue(fileName) as string || "" : "";
    }

    get allCodes() {
        let codes = "";
        this.fileList.forEach(fileName => codes += (this.getValue(fileName) || "") + "\n");
        return codes;
    }

    get selectedCode() {
        if (this.selectedFile) return this.getValue(this.selectedFile);
        return this.mainCode;
    }
}
