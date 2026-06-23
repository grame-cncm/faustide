import "./FileManager.scss";
import { DEFAULT_DSP_CODE, ProjectModel } from "./model/ProjectModel";
import type { TFileSystem } from "./model/ProjectModel";

type TOptions = {
    container: HTMLDivElement;
    fs: TFileSystem;
    path?: string;
    mainFile?: string;
    selectHandler?: (name: string, content: string, mainCode: string) => any;
    saveHandler?: (name: string, content: string | Uint8Array, mainCode: string) => any;
    deleteHandler?: (name: string, mainCode: string) => any;
    mainFileChangeHandler?: (name: string, mainCode: string) => any;
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
     * File System reference
     *
     * @private
     * @type {TFileSystem}
     * @memberof FileManager
     */
    private _fs: TFileSystem;
    private project: ProjectModel;
    selectHandler: (name: string, content: string, mainCode: string) => any = () => undefined;
    saveHandler: (name: string, content: string | Uint8Array, mainCode: string) => any = () => undefined;
    deleteHandler?: (name: string, mainCode: string) => any = () => undefined;
    mainFileChangeHandler?: (name: string, mainCode: string) => any = () => undefined;

    constructor(options: TOptions) {
        this.container = options.container;
        this.project = new ProjectModel({ fs: options.fs, path: options.path });
        this._fs = options.fs;
        this.path = this.project.path;
        this.selectHandler = options.selectHandler;
        this.saveHandler = options.saveHandler;
        this.deleteHandler = options.deleteHandler;
        this.mainFileChangeHandler = options.mainFileChangeHandler;
        this.getChildren();
        this.getFiles();
        this.bind();
        this.$mainFile = Math.max(0, this._fileList.indexOf(options.mainFile));
        this.setMain(this.$mainFile);
        this.select(this._fileList[this.$mainFile]);
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
            const fileName = this.project.uniqueUntitledName("dsp");
            this.project.createFile(fileName, "");
            const divFile = this.createFileDiv(fileName, true);
            this.divFiles.appendChild(divFile);
            if (this.saveHandler) this.saveHandler(fileName, "", this.mainCode);
            this.select(fileName);
            if (fileName.endsWith(".dsp")) this.setMain(this._fileList.length - 1);
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
                    const content = typeof reader.result === "string" ? reader.result.toString() : new Uint8Array(reader.result);
                    const fileName = this.newFile(file.name, content);
                    this.select(fileName);
                };
                reader.onerror = () => undefined;
                if (file.name.match(/\.(wav|mp3|ogg|flac|aac)$/)) reader.readAsArrayBuffer(file);
                else reader.readAsText(file);
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
            const newName = ProjectModel.sanitizeFileName((e.currentTarget as HTMLSpanElement).innerText);
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
            this.project.deleteFile(fileName);
            divFile.remove();
            if (this.deleteHandler) this.deleteHandler(fileName, this.mainCode);
            if (this._fileList.length === 0) {
                const fileName = this.newFile("untitled.dsp", DEFAULT_DSP_CODE);
                this.select(fileName);
            } else {
                this.select(this._fileList[0]);
            }
            if (this.$mainFile >= this._fileList.length) this.setMain(this._fileList.length - 1);
            else this.setMain(this.$mainFile);
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
        if (!this.project.setMainFile($)) return;
        for (let i = 0; i < this.divFiles.children.length; i++) {
            const e = this.divFiles.children[i];
            const btnMain = e.querySelector(".filemanager-btn-main");
            if (btnMain) {
                if (i === $) btnMain.classList.add("active");
                else btnMain.classList.remove("active");
            }
        }
        if (this.mainFileChangeHandler) this.mainFileChangeHandler(this._fileList[$], this.mainCode);
    }
    /**
     * Get files from Emscripten Virtual File System.
     *
     * @memberof FileManager
     */
    getFiles() {
        this.divFiles.innerHTML = "";
        this.project.listFiles();
        this._fileList.forEach((fileName) => {
            const divFile = this.createFileDiv(fileName, false);
            this.divFiles.appendChild(divFile);
        });
        if (this._fileList.length === 0) {
            const fileName = this.newFile("untitled.dsp", DEFAULT_DSP_CODE);
            this.select(fileName);
        } else {
            this.select(this._fileList[0]);
        }
        if (this.$mainFile >= this._fileList.length) this.setMain(this._fileList.length - 1);
        else this.setMain(this.$mainFile);
    }
    rename(oldName: string, newNameIn: string) {
        const newName = ProjectModel.sanitizeFileName(newNameIn);
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
        let renamedName: string;
        try {
            renamedName = this.project.renameFile(oldName, newName);
        } catch (e) {
            spanName.focus();
            return false;
        }
        if (!renamedName) return false;
        spanName.innerText = renamedName;
        spanName.contentEditable = "false";
        divFile.dataset.filename = renamedName;
        if (this.saveHandler) this.saveHandler(renamedName, this.getValue(renamedName), this.mainCode);
        this.select(renamedName);
        this.deleteHandler(oldName, this.mainCode);
        return true;
    }
    renameSelected(newName: string) {
        this.rename(this.selected, newName);
    }
    newFile(fileNameIn?: string, content?: string | Uint8Array) {
        const fileName = this.project.createFile(fileNameIn, content);
        const divFile = this.createFileDiv(fileName, false);
        this.divFiles.appendChild(divFile);
        if (this.saveHandler) this.saveHandler(fileName, content || "", this.mainCode);
        this.select(fileName);
        if (fileName.endsWith(".dsp")) this.setMain(this._fileList.length - 1);
        return fileName;
    }
    select(fileName: string) {
        if (!this.project.selectFile(fileName)) return;
        for (let i = 0; i < this.divFiles.children.length; i++) {
            const divFile = this.divFiles.children[i] as HTMLDivElement;
            if (divFile.dataset.filename === fileName) divFile.classList.add("selected");
            else divFile.classList.remove("selected");
        }
        if (this.selectHandler) this.selectHandler(fileName, this.fs.readFile(this.path + fileName, { encoding: "utf8" }), this.mainCode);
    }
    save(fileName: string, content: string) {
        if (!this.project.saveFile(fileName, content)) return;
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
        return this.project.getValue(fileName);
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
        return fileName ? this.project.mainCode : "";
    }
    get mainFileName() {
        return this.project.mainFileName;
    }
    get mainFileNameWithoutSuffix() {
        return this.project.mainFileNameWithoutSuffix;
    }
    get allCodes() {
        return this.project.allCodes;
    }
    get selectedCode() {
        return this.project.selectedCode;
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
    get $mainFile() {
        return this.project.mainFileIndex;
    }
    set $mainFile($: number) {
        this.project.mainFileIndex = $;
    }
    get _fileList() {
        return this.project.fileList;
    }
    set _fileList(fileList: string[]) {
        this.project.fileList = fileList;
    }
    get fs() {
        return this._fs;
    }
    set fs(fsIn) {
        this._fs = fsIn;
        if (this.project) this.project.fs = fsIn;
    }
}
