import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.resolve(__dirname, "..", "dist");
const port = process.env.PORT ? Number(process.env.PORT) : 4173;

const mimeTypes = new Map([
    [".html", "text/html; charset=utf-8"],
    [".js", "application/javascript; charset=utf-8"],
    [".css", "text/css; charset=utf-8"],
    [".json", "application/json; charset=utf-8"],
    [".wasm", "application/wasm"],
    [".svg", "image/svg+xml"],
    [".png", "image/png"],
    [".jpg", "image/jpeg"],
    [".jpeg", "image/jpeg"],
    [".ico", "image/x-icon"],
    [".webmanifest", "application/manifest+json"],
    [".map", "application/json"]
]);

const server = http.createServer((req, res) => {
    if (!req.url) {
        res.writeHead(400);
        res.end("Bad Request");
        return;
    }

    const decodedPath = decodeURIComponent(req.url.split("?")[0]);
    let filePath = path.join(distDir, decodedPath);

    if (fs.statSync(distDir, { throwIfNoEntry: false }) === undefined) {
        res.writeHead(500);
        res.end("dist directory not found. Run `npm run build` first.");
        return;
    }

    if (decodedPath.endsWith("/") || fs.statSync(filePath, { throwIfNoEntry: false })?.isDirectory()) {
        filePath = path.join(filePath, "index.html");
    }

    const fileStat = fs.statSync(filePath, { throwIfNoEntry: false });
    if (!fileStat || !fileStat.isFile()) {
        res.writeHead(404);
        res.end("Not found");
        return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const mimeType = mimeTypes.get(ext) || "application/octet-stream";

    res.writeHead(200, {
        "Content-Type": mimeType,
        "Cache-Control": "no-store"
    });

    const stream = fs.createReadStream(filePath);
    stream.on("error", (err) => {
        res.writeHead(500);
        res.end(err.message);
    });
    stream.pipe(res);
});

server.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`[e2e-server] Listening on http://127.0.0.1:${port}`);
});

process.on("SIGTERM", () => server.close());
process.on("SIGINT", () => server.close());
