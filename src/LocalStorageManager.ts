export class LocalStorageManager {
    localStorage = window.localStorage;
    $dspTable = "faust_editor_dsp_table";
    $compileOptions = "faust_editor_compile_options";
    $dspParams = "faust_editor_dsp_params";
    $project = "faust_editor_project";
    $version = "faust_editor_version";
    set dspTable(dspTableIn: string) {
        this.localStorage.setItem(this.$dspTable, dspTableIn);
    }
    get dspTable(): string | null {
        return this.localStorage.getItem(this.$dspTable);
    }
    set compileOptions(compileOptionsIn: FaustEditorCompileOptions) {
        this.localStorage.setItem(this.$compileOptions, JSON.stringify(compileOptionsIn));
    }
    get compileOptions(): FaustEditorCompileOptions | null {
        const str = this.localStorage.getItem(this.$compileOptions);
        if (!str) return null;
        try {
            return JSON.parse(str) as FaustEditorCompileOptions;
        } catch (e) {
            console.error(e); // eslint-disable-line no-console
            return null;
        }
    }
    set dspParams(dspParamsIn: { [path: string]: number }) {
        this.localStorage.setItem(this.$dspParams, JSON.stringify(dspParamsIn));
    }
    get dspParams(): { [path: string]: number } {
        const str = this.localStorage.getItem(this.$dspParams);
        if (!str) return {};
        try {
            return JSON.parse(str) as { [path: string]: number };
        } catch (e) {
            console.error(e); // eslint-disable-line no-console
            return {};
        }
    }
    changeDspParam(path: string, value: number) {
        const dspParams = this.dspParams;
        dspParams[path] = value;
        this.dspParams = dspParams;
    }
    changeDspParams(dspParamsIn: { [path: string]: number }) {
        this.dspParams = { ...this.dspParams, ...dspParamsIn };
    }
    set project(projectIn: { [path: string]: string }) {
        this.localStorage.setItem(this.$project, JSON.stringify(projectIn));
    }
    get project(): { [path: string]: string } {
        const str = this.localStorage.getItem(this.$project);
        if (!str) return {};
        try {
            return JSON.parse(str) as { [path: string]: string };
        } catch (e) {
            console.error(e); // eslint-disable-line no-console
            return {};
        }
    }
    changeProject(fileName: string, content: string) {
        const project = this.project;
        this.project[fileName] = content;
        this.project = project;
    }
    set version(versionIn: string) {
        this.localStorage.setItem(this.$version, versionIn);
    }
    get version(): string | null {
        return this.localStorage.getItem(this.$version);
    }
}
