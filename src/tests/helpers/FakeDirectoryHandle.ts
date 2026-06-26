/**
 * Minimal fake FileSystemDirectoryHandle for unit tests.
 *
 * Implements only the surface used by MountRegistry (isSameEntry).
 * Two handles created with the same `identity` string are considered the
 * same entry; different strings are different entries.
 */
export class FakeDirectoryHandle {
    readonly kind = "directory" as const;

    readonly name: string;

    private identity: string;

    constructor(name: string, identity?: string) {
        this.name = name;
        this.identity = identity ?? name;
    }

    isSameEntry(other: FakeDirectoryHandle): Promise<boolean> {
        return Promise.resolve(this.identity === other.identity);
    }
}
