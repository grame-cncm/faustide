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

export const DEFAULT_DSP_CODE = `import("stdfaust.lib");
process = ba.pulsen(1, 10000) : pm.djembe(60, 0.3, 0.4, 1) <: dm.freeverb_demo;`;

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

    static sanitizeFileName(fileName: string, fallback = "untitled.dsp") {
        return fileName.replace(/[^a-zA-Z0-9_.]/g, "") || fallback;
    }

    static isAudioFile(fileName: string) {
        return !!fileName && !!fileName.match(/\.(wav|mp3|ogg|flac|aac)$/);
    }

    listFiles() {
        this.fileList = this.fs.readdir(this.path).filter(fileName => fileName !== "." && fileName !== ".." && this.fs.isFile(this.fs.stat(this.path + fileName).mode));
        return this.fileList;
    }

    uniqueUntitledName(extension: string | string[] = "dsp") {
        let i = 1;
        let fileName = `untitled${i}.${extension}`;
        while (this.fileList.indexOf(fileName) !== -1) {
            fileName = `untitled${++i}.${extension}`;
        }
        return fileName;
    }

    defaultFileName(fileNameIn?: string) {
        let fileName: string;
        if (fileNameIn) fileName = ProjectModel.sanitizeFileName(fileNameIn, "");
        const extension = fileNameIn ? fileNameIn.split(".").slice(-1) || "lib" : "dsp";
        if (!fileName || this.fileList.indexOf(fileName) !== -1) return this.uniqueUntitledName(extension);
        return fileName;
    }

    createFile(fileNameIn?: string, content?: string | Uint8Array) {
        const fileName = this.defaultFileName(fileNameIn);
        this.fs.writeFile(this.path + fileName, content || "");
        this.fileList.push(fileName);
        return fileName;
    }

    createDefaultFile() {
        return this.createFile("untitled.dsp", DEFAULT_DSP_CODE);
    }

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

    deleteFile(fileName: string) {
        const index = this.fileList.indexOf(fileName);
        if (index === -1) return false;
        this.fs.unlink(this.path + fileName);
        this.fileList.splice(index, 1);
        if (this.selectedFile === fileName) this.selectedFile = null;
        return true;
    }

    selectFile(fileName: string) {
        if (ProjectModel.isAudioFile(fileName)) return false;
        if (this.fileList.indexOf(fileName) === -1) return false;
        this.selectedFile = fileName;
        return true;
    }

    setMainFile(index: number) {
        if (index >= this.fileList.length) return false;
        if (ProjectModel.isAudioFile(this.fileList[index])) return false;
        this.mainFileIndex = index;
        return true;
    }

    saveFile(fileName: string, content: string) {
        if (this.getValue(fileName) === content) return false;
        this.fs.unlink(this.path + fileName);
        this.fs.writeFile(this.path + fileName, content);
        return true;
    }

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
