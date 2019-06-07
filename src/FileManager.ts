import "./FileManager.scss";

type TOptions = {
    container: HTMLDivElement;
    fs: TFileSystem;
    path?: string;
    selectHandler?: (name: string, content: string) => any;
    saveHandler?: (name: string, content: string) => any;
    deleteHandler?: (name: string) => any;
};
type TFileSystem = {
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

export class FileManager {
    divLabel: HTMLDivElement;
    divBtnNewFile: HTMLButtonElement;
    divFiles: HTMLDivElement;
    container: HTMLDivElement;
    path: string = "./";
    _fileList: string[];
    private _fs: TFileSystem;
    selectHandler: (name: string, content: string) => any = () => undefined;
    saveHandler: (name: string, content: string) => any = () => undefined;
    deleteHandler?: (name: string) => any = () => undefined;

    constructor(options: TOptions) {
        Object.assign(this, options);
        this.getChildren();
        this.getFiles();
        this.bind();
    }
    getChildren() {
        for (let i = 0; i < this.container.children.length; i++) {
            const e = this.container.children[i];
            if (e.classList.contains("filemanager-label")) this.divLabel = e as HTMLDivElement;
            if (e.classList.contains("filemanager-btn-new-file")) this.divBtnNewFile = e as HTMLButtonElement;
            if (e.classList.contains("filemanager-files")) this.divFiles = e as HTMLDivElement;
        }
        if (!this.divLabel) {
            const divLabel = document.createElement("div");
            divLabel.classList.add("filemanager-label");
            divLabel.innerText = "File Manager";
            this.container.appendChild(divLabel);
            this.divLabel = divLabel;
        }
        for (let i = 0; i < this.divLabel.children.length; i++) {
            const e = this.divLabel.children[i];
            if (e.classList.contains("filemanager-btn-new-file")) this.divBtnNewFile = e as HTMLButtonElement;
        }
        if (!this.divBtnNewFile) {
            const divBtnNewFile = document.createElement("button");
            divBtnNewFile.classList.add("filemanager-btn-new-file", "filemanager-btn-icon");
            this.divLabel.appendChild(divBtnNewFile);
            this.divBtnNewFile = divBtnNewFile;
        }
        if (!this.divFiles) {
            const divFiles = document.createElement("div");
            divFiles.classList.add("filemanager-files");
            this.container.appendChild(divFiles);
            this.divFiles = divFiles;
        }
    }
    bind() {
        this.divBtnNewFile.addEventListener("click", () => {
            let i = 1;
            let fileName = "untitled" + i + ".dsp";
            while (this._fileList.indexOf(fileName) !== -1) {
                fileName = "untitled" + (++i) + ".dsp";
            }
            this.fs.writeFile(this.path + fileName, "");
            this._fileList.push(fileName);
            const divFile = this.createFileDiv(fileName, true);
            this.divFiles.appendChild(divFile);
            const spanName = divFile.getElementsByClassName("filemanager-filename")[0] as HTMLSpanElement;
            spanName.focus();
            const range = document.createRange();
            range.selectNodeContents(spanName);
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        });
    }
    createFileDiv(name: string, editing?: boolean) {
        const divFile = document.createElement("div");
        divFile.classList.add("filemanager-file");
        const spanName = document.createElement("span");
        spanName.classList.add("filemanager-filename");
        spanName.innerText = name;
        divFile.dataset.filename = name;
        if (editing) spanName.contentEditable = "true";
        const btnRename = document.createElement("button");
        btnRename.classList.add("filemanager-btn-rename", "filemanager-btn-icon");
        const btnDelete = document.createElement("button");
        btnDelete.classList.add("filemanager-btn-delete", "filemanager-btn-icon");
        divFile.appendChild(spanName);
        divFile.appendChild(btnRename);
        divFile.appendChild(btnDelete);
        let fileName = spanName.innerText;
        btnRename.addEventListener("click", (e) => {
            e.stopPropagation();
            spanName.contentEditable = "true";
            spanName.focus();
            const range = document.createRange();
            range.selectNodeContents(spanName);
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        });
        spanName.addEventListener("blur", (e) => {
            const newName = (e.currentTarget as HTMLSpanElement).innerText.replace(/[^a-zA-Z0-9_.]/g, "") || "untitled.dsp";
            (e.currentTarget as HTMLSpanElement).innerText = newName;
            if (this.rename(fileName, newName)) fileName = newName;
            else e.preventDefault();
        });
        spanName.addEventListener("keydown", (e) => {
            if (e.key === "Enter") (e.currentTarget as HTMLSpanElement).blur();
            if (e.key.match(/[^a-zA-Z0-9_]/)) e.preventDefault();
        });
        btnDelete.addEventListener("click", (e) => {
            e.stopPropagation();
            const i = this._fileList.indexOf(fileName);
            this.fs.unlink(this.path + fileName);
            delete this._fileList[i];
            divFile.remove();
            if (this.deleteHandler) this.deleteHandler(fileName);
            if (this.divFiles.children.length === 0) {
                const fileName = "untitled.dsp";
                this.fs.writeFile(this.path + fileName, "");
                this._fileList.push(fileName);
                const divFile = this.createFileDiv(fileName, false);
                this.divFiles.appendChild(divFile);
                this.select(fileName);
                this.setValue(`import("stdfaust.lib");
process = ba.pulsen(1, 10000) : pm.djembe(60, 0.3, 0.4, 1) <: dm.freeverb_demo;`);
            } else {
                (this.divFiles.children[0] as HTMLDivElement).click();
            }
        });
        const handlePointerDown = () => this.select(fileName);
        divFile.addEventListener("mousedown", handlePointerDown);
        divFile.addEventListener("touchstart", handlePointerDown);
        return divFile;
    }
    getFiles() {
        this.divFiles.innerHTML = "";
        this._fileList = this.fs.readdir(this.path).filter(fileName => fileName !== "." && fileName !== ".." && this.fs.isFile(this.fs.stat(this.path + fileName).mode));
        this._fileList.forEach((fileName) => {
            const divFile = this.createFileDiv(fileName, false);
            this.divFiles.appendChild(divFile);
        });
        if (this._fileList.length === 0) {
            let i = 1;
            let fileName = "untitled" + i + ".dsp";
            while (this._fileList.indexOf(fileName) !== -1) {
                fileName = "untitled" + (++i) + ".dsp";
            }
            this.fs.writeFile(this.path + fileName, "");
            this._fileList.push(fileName);
            const divFile = this.createFileDiv(fileName, false);
            this.divFiles.appendChild(divFile);
            this.select(fileName);
            this.setValue(`import("stdfaust.lib");
process = ba.pulsen(1, 10000) : pm.djembe(60, 0.3, 0.4, 1) <: dm.freeverb_demo;`);
        } else {
            this.select(this._fileList[0]);
        }
    }
    rename(oldName: string, newName: string) {
        const i = this._fileList.indexOf(oldName);
        let spanName: HTMLSpanElement;
        let divFile: HTMLDivElement;
        for (let i = 0; i < this.divFiles.children.length; i++) {
            const file = this.divFiles.children[i] as HTMLDivElement;
            if (file.dataset.filename === oldName) {
                divFile = file;
                spanName = file.getElementsByClassName("filemanager-filename")[0] as HTMLSpanElement;
                break;
            }
        }
        if (!divFile || !spanName) return false;
        try {
            this.fs.rename(this.path + oldName, this.path + newName);
        } catch (e) {
            spanName.focus();
            return false;
        }
        this._fileList[i] = newName;
        spanName.innerText = newName;
        spanName.contentEditable = "false";
        divFile.dataset.filename = newName;
        this.select(newName);
        return true;
    }
    select(fileName: string) {
        for (let i = 0; i < this.divFiles.children.length; i++) {
            const divFile = this.divFiles.children[i] as HTMLDivElement;
            if (divFile.dataset.filename === fileName) divFile.classList.add("selected");
            else divFile.classList.remove("selected");
        }
        if (this.selectHandler) this.selectHandler(fileName, this.fs.readFile(this.path + fileName, { encoding: "utf8" }));
    }
    save(fileName: string, content: string) {
        this.fs.writeFile(this.path + fileName, content);
        if (this.saveHandler) this.saveHandler(fileName, content);
    }
    saveAll() {
        if (!this.saveHandler) return;
        this._fileList.forEach((fileName) => {
            const content = this.getValue(fileName);
            if (this.selectHandler && content) this.saveHandler(fileName, content);
        });
    }
    setValue(value: string, useSelectHandler?: boolean) {
        const fileName = this.selected;
        if (fileName) {
            if (this.selectHandler && useSelectHandler !== false) this.selectHandler(fileName, value);
            this.save(fileName, value);
        }
    }
    getValue(fileNameIn?: string) {
        const fileName = fileNameIn || this.selected;
        if (fileName.endsWith(".dsp")) return this.fs.readFile(this.path + fileName, { encoding: "utf8" });
        return null;
    }
    get selected() {
        for (let i = 0; i < this.divFiles.children.length; i++) {
            const divFile = this.divFiles.children[i] as HTMLDivElement;
            if (divFile.classList.contains("selected")) return divFile.dataset.filename;
        }
        return null;
    }
    get allCodes() {
        let codes = "";
        this._fileList.forEach(fileName => codes += (this.getValue(fileName) || "") + "\n");
        return codes;
    }
    get fs() {
        return this._fs;
    }
    set fs(fsIn) {
        this._fs = fsIn;
    }
}
