/**
 * Triggers a browser download of `content` under `filename` via a transient
 * anchor element. DOM-only side effect, extracted from StaticScope's CSV export
 * so the serialization stays pure and unit-testable.
 */
export function downloadTextFile(content: string, filename: string): void {
    const blob = new Blob([content]);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.target = "_blank";
    a.click();
}
