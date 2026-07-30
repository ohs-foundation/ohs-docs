import fs from "node:fs";
import http from "node:http";
import path from "node:path";

const root = path.dirname(new URL(import.meta.url).pathname);
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".svg": "image/svg+xml", ".ttf": "font/ttf" };

const server = http.createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
  let target = path.join(root, pathname);
  if (pathname.endsWith("/")) target = path.join(target, "index.html");
  if (!path.extname(target)) target = path.join(target, "index.html");
  if (!target.startsWith(root)) { response.writeHead(403); response.end("Forbidden"); return; }
  fs.readFile(target, (error, data) => {
    if (error) { response.writeHead(404); response.end("Not found"); return; }
    response.writeHead(200, { "Content-Type": types[path.extname(target)] || "application/octet-stream", "Cache-Control": "no-store" });
    response.end(data);
  });
});

server.listen(8080, "127.0.0.1", () => console.log("OHS documentation designs: http://localhost:8080/compare/"));
