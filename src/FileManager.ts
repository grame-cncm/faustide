import "./FileManager.scss";

type TOptions = {
    container: HTMLDivElement;
    fs: TFileSystem;
    path?: string;
    $mainFile?: number;
    selectHandler?: (name: string, content: string, mainCode: string) => any;
    saveHandler?: (name: string, content: string, mainCode: string) => any;
    deleteHandler?: (name: string, mainCode: string) => any;
    mainFileChangeHandler?: (index: number, mainCode: string) => any;
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

/**
 * FileManager UI, interactive with Emscripten Virtual File System
 *
 * @export
 * @class FileManager
 */
export class FileManager {
    divLabel: HTMLDivElement;
    btnExpand: HTMLButtonElement;
    spanLabel: HTMLSpanElement;
    btnNewFile: HTMLButtonElement;
    divFiles: HTMLDivElement;
    divOverlay: HTMLDivElement;
    container: HTMLDivElement;
    /**
     * Root path in Emscripten FS
     *
     * @type {string}
     * @memberof FileManager
     */
    path: string = "./";
    /**
     * Index of main DSP to execute
     *
     * @type {number}
     * @memberof FileManager
     */
    $mainFile: number = 0;
    /**
     * Project files list
     *
     * @type {string[]}
     * @memberof FileManager
     */
    _fileList: string[];
    /**
     * File System reference
     *
     * @private
     * @type {TFileSystem}
     * @memberof FileManager
     */
    private _fs: TFileSystem;
    selectHandler: (name: string, content: string, mainCode: string) => any = () => undefined;
    saveHandler: (name: string, content: string, mainCode: string) => any = () => undefined;
    deleteHandler?: (name: string, mainCode: string) => any = () => undefined;
    mainFileChangeHandler?: (index: number, mainCode: string) => any = () => undefined;

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
            if (e.classList.contains("filemanager-files")) this.divFiles = e as HTMLDivElement;
            if (e.classList.contains("filemanager-overlay")) this.divOverlay = e as HTMLDivElement;
        }
        if (!this.divLabel) {
            const divLabel = document.createElement("div");
            divLabel.classList.add("filemanager-label");
            this.container.appendChild(divLabel);
            this.divLabel = divLabel;
        }
        for (let i = 0; i < this.divLabel.children.length; i++) {
            const e = this.divLabel.children[i];
            if (e.classList.contains("filemanager-btn-expand")) this.btnExpand = e as HTMLButtonElement;
            if (e.classList.contains("filemanager-span-label")) this.btnNewFile = e as HTMLButtonElement;
            if (e.classList.contains("filemanager-btn-new-file")) this.btnNewFile = e as HTMLButtonElement;
        }
        if (!this.btnExpand) {
            const btnExpand = document.createElement("button");
            btnExpand.classList.add("filemanager-btn-expand", "filemanager-btn-icon", "expanded");
            this.divLabel.appendChild(btnExpand);
            this.btnExpand = btnExpand;
        }
        if (!this.spanLabel) {
            const spanLabel = document.createElement("span");
            spanLabel.classList.add("filemanager-span-label");
            spanLabel.innerText = "Project Files";
            this.divLabel.appendChild(spanLabel);
            this.spanLabel = spanLabel;
        }
        if (!this.btnNewFile) {
            const btnNewFile = document.createElement("button");
            btnNewFile.classList.add("filemanager-btn-new-file", "filemanager-btn-icon");
            btnNewFile.title = "New File";
            this.divLabel.appendChild(btnNewFile);
            this.btnNewFile = btnNewFile;
        }
        if (!this.divFiles) {
            const divFiles = document.createElement("div");
            divFiles.classList.add("filemanager-files");
            this.container.appendChild(divFiles);
            this.divFiles = divFiles;
        }
        if (!this.divOverlay) {
            const divOverlap = document.createElement("div");
            divOverlap.classList.add("filemanager-overlay");
            this.container.appendChild(divOverlap);
            this.divOverlay = divOverlap;
        }
    }
    bind() {
        this.divLabel.addEventListener("click", () => {
            this.expanded = !this.expanded; // File Manager UI can be folded.
        });
        /**
         * create a new file with name `untitled\d*.dsp`,
         * Select the filename as editing
         *
         * @param {MouseEvent} e
         */
        const newFileHandler: (this: HTMLButtonElement, ev: MouseEvent) => any = (e: MouseEvent) => {
            e.stopPropagation();
            e.preventDefault();
            let i = 1;
            let fileName = `untitled${i}.dsp`;
            while (this._fileList.indexOf(fileName) !== -1) {
                fileName = `untitled${++i}.dsp`;
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
        };
        this.btnNewFile.addEventListener("click", newFileHandler);
        // File drag and drop
        const dragenterHandler = (e: DragEvent) => {
            if (e.dataTransfer && e.dataTransfer.items.length && e.dataTransfer.items[0].kind === "file") {
                e.preventDefault();
                e.stopPropagation();
                this.divOverlay.style.display = "block";
            }
        };
        const dragendHandler = (e: DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
            this.divOverlay.style.display = "";
        };
        const dragoverHandler = (e: DragEvent) => {
            e.preventDefault();
            e.stopPropagation();
        };
        /**
         * Drop a new file into file manager
         * if the filename exists or has illegal name, replace it by `untitled\d*.dsp`
         *
         * @param {DragEvent} e
         */
        const dropHandler = (e: DragEvent) => {
            this.divOverlay.style.display = "";
            if (e.dataTransfer && e.dataTransfer.files.length) {
                e.preventDefault();
                e.stopPropagation();
                const file = e.dataTransfer.files[0];
                const reader = new FileReader();
                reader.onload = () => {
                    const fileName = this.newFile(file.name, reader.result.toString());
                    this.select(fileName);
                };
                reader.onerror = () => undefined;
                reader.readAsText(file);
            }
        };
        this.container.addEventListener("dragenter", dragenterHandler);
        this.container.addEventListener("dragover", dragenterHandler);
        this.divOverlay.addEventListener("dragenter", dragoverHandler);
        this.divOverlay.addEventListener("dragover", dragoverHandler);
        this.divOverlay.addEventListener("dragleave", dragendHandler);
        this.divOverlay.addEventListener("dragend", dragendHandler);
        this.divOverlay.addEventListener("drop", dropHandler);
    }
    /**
     * create a new file container with buttons
     *
     * @param {string} name
     * @param {boolean} [editing]
     * @returns
     * @memberof FileManager
     */
    createFileDiv(name: string, editing?: boolean) {
        const divFile = document.createElement("div");
        divFile.classList.add("filemanager-file");
        const spanName = document.createElement("span");
        spanName.classList.add("filemanager-filename");
        spanName.innerText = name;
        divFile.dataset.filename = name;
        if (editing) spanName.contentEditable = "true";
        const btnMain = document.createElement("button");
        btnMain.classList.add("filemanager-btn-main", "filemanager-btn-icon");
        btnMain.title = "Set as main DSP";
        const btnRename = document.createElement("button");
        btnRename.classList.add("filemanager-btn-rename", "filemanager-btn-icon");
        btnRename.title = "Rename";
        const btnDelete = document.createElement("button");
        btnDelete.classList.add("filemanager-btn-delete", "filemanager-btn-icon");
        btnDelete.title = "Delete";
        divFile.appendChild(btnMain);
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
            (e.currentTarget as HTMLSpanElement).contentEditable = "false";
        });
        spanName.addEventListener("keydown", (e) => {
            e.stopPropagation();
            if (e.key === "Enter") (e.currentTarget as HTMLSpanElement).blur();
            if (e.key.match(/[^a-zA-Z0-9_.]/)) e.preventDefault();
        });
        btnMain.addEventListener("mousedown", () => this.setMain(this._fileList.indexOf(fileName)));
        btnMain.addEventListener("touchstart", () => this.setMain(this._fileList.indexOf(fileName)));
        btnDelete.addEventListener("click", (e) => {
            e.stopPropagation();
            const i = this._fileList.indexOf(fileName);
            this.fs.unlink(this.path + fileName);
            this._fileList.splice(i, 1);
            divFile.remove();
            if (this._fileList.length === 0) {
                const fileName = this.newFile("untitled.dsp", `import("stdfaust.lib");
process = ba.pulsen(1, 10000) : pm.djembe(60, 0.3, 0.4, 1) <: dm.freeverb_demo;`);
                this.select(fileName);
            } else {
                this.select(this._fileList[0]);
            }
            if (this.$mainFile >= this._fileList.length) this.setMain(this._fileList.length - 1);
            else this.setMain(this.$mainFile);
            if (this.deleteHandler) this.deleteHandler(fileName, this.mainCode);
        });
        const handlePointerDown = () => this.select(fileName);
        divFile.addEventListener("mousedown", handlePointerDown);
        divFile.addEventListener("touchstart", handlePointerDown);
        return divFile;
    }
    /**
     * Change main DSP file with index in file list.
     *
     * @param {number} $
     * @returns
     * @memberof FileManager
     */
    setMain($: number) {
        if ($ >= this._fileList.length) return;
        this.$mainFile = $;
        for (let i = 0; i < this.divFiles.children.length; i++) {
            const e = this.divFiles.children[i];
            const btnMain = e.querySelector(".filemanager-btn-main");
            if (btnMain) {
                if (i === $) btnMain.classList.add("active");
                else btnMain.classList.remove("active");
            }
        }
        if (this.mainFileChangeHandler) this.mainFileChangeHandler($, this.mainCode);
    }
    /**
     * Get files from Emscripten Virtual File System.
     *
     * @memberof FileManager
     */
    getFiles() {
        this.divFiles.innerHTML = "";
        this._fileList = this.fs.readdir(this.path).filter(fileName => fileName !== "." && fileName !== ".." && this.fs.isFile(this.fs.stat(this.path + fileName).mode));
        this._fileList.forEach((fileName) => {
            const divFile = this.createFileDiv(fileName, false);
            this.divFiles.appendChild(divFile);
        });
        if (this._fileList.length === 0) {
            const fileName = this.newFile("untitled.dsp", `import("stdfaust.lib");
process = ba.pulsen(1, 10000) : pm.djembe(60, 0.3, 0.4, 1) <: dm.freeverb_demo;`);
            this.select(fileName);
        } else {
            this.select(this._fileList[0]);
        }
        if (this.$mainFile >= this._fileList.length) this.setMain(this._fileList.length - 1);
        else this.setMain(this.$mainFile);
    }
    rename(oldName: string, newName: string) {
        if (oldName === newName) return false;
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
        this.deleteHandler(oldName, this.mainCode);
        return true;
    }
    renameSelected(newName: string) {
        this.rename(this.selected, newName);
    }
    newFile(fileNameIn?: string, content?: string) {
        let fileName = fileNameIn.replace(/[^a-zA-Z0-9_.]/g, "");
        const extension = fileNameIn.split(".").slice(-1) || "lib";
        if (!fileName || this._fileList.indexOf(fileName) !== -1) {
            let i = 1;
            fileName = `untitled${i}.${extension}`;
            while (this._fileList.indexOf(fileName) !== -1) {
                fileName = `untitled${++i}.${extension}`;
            }
        }
        this.fs.writeFile(this.path + fileName, content || "");
        this._fileList.push(fileName);
        const divFile = this.createFileDiv(fileName, false);
        this.divFiles.appendChild(divFile);
        if (this.saveHandler) this.saveHandler(fileName, content || "", this.mainCode);
        this.select(fileName);
        if (fileName.endsWith(".dsp")) this.setMain(this._fileList.length - 1);
        return fileName;
    }
    select(fileName: string) {
        for (let i = 0; i < this.divFiles.children.length; i++) {
            const divFile = this.divFiles.children[i] as HTMLDivElement;
            if (divFile.dataset.filename === fileName) divFile.classList.add("selected");
            else divFile.classList.remove("selected");
        }
        if (this.selectHandler) this.selectHandler(fileName, this.fs.readFile(this.path + fileName, { encoding: "utf8" }), this.mainCode);
    }
    save(fileName: string, content: string) {
        if (this.getValue(fileName) === content) return;
        this.fs.writeFile(this.path + fileName, content);
        if (this.saveHandler) this.saveHandler(fileName, content, this.mainCode);
    }
    saveAll() {
        if (!this.saveHandler) return;
        this._fileList.forEach((fileName) => {
            const content = this.getValue(fileName);
            if (this.selectHandler && content) this.saveHandler(fileName, content, this.mainCode);
        });
    }
    setValue(value: string, useSelectHandler?: boolean) {
        const fileName = this.selected;
        if (fileName) {
            if (this.selectHandler && useSelectHandler !== false) this.selectHandler(fileName, value, this.mainCode);
            this.save(fileName, value);
        }
    }
    getValue(fileNameIn?: string) {
        const fileName = fileNameIn || this.selected;
        return this.fs.readFile(this.path + fileName, { encoding: "utf8" });
    }
    get selected() {
        for (let i = 0; i < this.divFiles.children.length; i++) {
            const divFile = this.divFiles.children[i] as HTMLDivElement;
            if (divFile.classList.contains("selected")) return divFile.dataset.filename;
        }
        return null;
    }
    get mainCode() {
        const fileName = this._fileList[this.$mainFile];
        return fileName ? this.getValue(fileName) || "" : "";
    }
    get mainFileName() {
        return this._fileList[this.$mainFile];
    }
    get mainFileNameWithoutSuffix() {
        return this._fileList[this.$mainFile].split(".").slice(0, -1).join(".");
    }
    get allCodes() {
        let codes = "";
        this._fileList.forEach(fileName => codes += (this.getValue(fileName) || "") + "\n");
        return codes;
    }
    get selectedCode() {
        const selected = this.selected;
        if (selected) return this.getValue(selected);
        return this.mainCode;
    }
    set expanded(expanded: boolean) {
        if (expanded) {
            if (!this.btnExpand.classList.contains("expanded")) {
                this.btnExpand.classList.add("expanded");
                this.divFiles.style.display = "";
            }
        } else if (this.btnExpand.classList.contains("expanded")) {
            this.btnExpand.classList.remove("expanded");
            this.divFiles.style.display = "none";
        }
    }
    get expanded() {
        return this.btnExpand.classList.contains("expanded");
    }
    get fs() {
        return this._fs;
    }
    set fs(fsIn) {
        this._fs = fsIn;
    }
}
