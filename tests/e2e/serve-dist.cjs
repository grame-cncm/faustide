const http = require("http");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "../../dist");
const port = Number(process.env.PORT || 4173);
const mimeTypes = {
    ".css": "text/css; charset=utf-8",
    ".html": "text/html; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".map": "application/json; charset=utf-8",
    ".mp3": "audio/mpeg",
    ".png": "image/png",
    ".svg": "image/svg+xml",
    ".wasm": "application/wasm",
    ".woff": "font/woff",
    ".woff2": "font/woff2"
};

const server = http.createServer((request, response) => {
    const url = new URL(request.url || "/", `http://${request.headers.host}`);
    const decodedPath = decodeURIComponent(url.pathname);
    const requestedPath = decodedPath === "/" ? "/index.html" : decodedPath;
    const filePath = path.normalize(path.join(root, requestedPath));

    if (!filePath.startsWith(root)) {
        response.writeHead(403);
        response.end("Forbidden");
        return;
    }

    fs.readFile(filePath, (error, data) => {
        if (error) {
            response.writeHead(404);
            response.end("Not found");
            return;
        }
        response.writeHead(200, {
            "Content-Type": mimeTypes[path.extname(filePath)] || "application/octet-stream",
            "Cache-Control": "no-store"
        });
        response.end(data);
    });
});

server.listen(port, "127.0.0.1", () => {
    process.stdout.write(`Serving ${root} at http://127.0.0.1:${port}\n`);
});
