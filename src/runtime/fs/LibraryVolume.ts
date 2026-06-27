import type { ProjectModel } from "../../model/ProjectModel";
import type { Volume, VolumeEntry, VolumeState } from "./Volume";
import { isNativeFaustFile, sortEntries } from "./Volume";

/**
 * The always-present private-filesystem volume.
 *
 * Wraps today's single implicit BrowserFS project (via ProjectModel) as a
 * Volume adapter.  State is always "ready"; there are no permissions to request.
 *
 * Decision #5 (plan §9): v1 lists this one project's files.  Multi-project
 * Library (each project a named bundle) is deferred behind the same interface.
 */
export class LibraryVolume implements Volume {
    readonly id = "library";

    readonly kind = "library" as const;

    readonly label = "Library";

    private model: ProjectModel;

    constructor(model: ProjectModel) {
        this.model = model;
    }

    // The library is always available — no permission lifecycle.
    state(): Promise<VolumeState> {
        return Promise.resolve("ready");
    }

    /**
     * List the project's files.
     *
     * path="" returns project root files.
     * Any other path returns [].
     *
     * listFiles() is called on every root list() to pick up changes made via
     * ProjectModel since the last call.
     */
    list(path: string): Promise<VolumeEntry[]> {
        if (path !== "") return Promise.resolve([]);
        this.model.listFiles();
        const entries: VolumeEntry[] = this.model.fileList.map(name => ({
            name,
            path: name,
            type: "file" as const,
            isNative: isNativeFaustFile(name)
        }));
        return Promise.resolve(sortEntries(entries));
    }

    /**
     * Read a text file from the project by its filename (path relative to
     * the project root — same as the filename in the flat namespace).
     */
    readText(filePath: string): Promise<string> {
        const text = this.model.getValue(filePath);
        if (typeof text !== "string") {
            return Promise.reject(new Error(`LibraryVolume: ${filePath} is not a text file`));
        }
        return Promise.resolve(text);
    }
}
