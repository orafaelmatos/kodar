import { createReadStream } from "node:fs";
import { access, stat } from "node:fs/promises";
import { createServer } from "node:http";
import { dirname, extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { createGzip } from "node:zlib";

const directory = resolve(dirname(fileURLToPath(import.meta.url)), "../out");
const port = Number(process.env.PORT || 3000);
const host = process.env.HOST || "127.0.0.1";
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".ico": "image/x-icon",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".vtt": "text/vtt; charset=utf-8",
};

try {
  await access(resolve(directory, "index.html"));
} catch {
  console.error("Build não encontrada. Execute npm run build antes de npm start.");
  process.exit(1);
}

/** Next exports /demo/name as name.html beside a directory of route payloads. */
async function findStaticFile(path) {
  const candidates = [path];
  if (path !== directory) candidates.push(`${path}.html`);
  candidates.push(resolve(path, "index.html"));

  for (const candidate of candidates) {
    try {
      if ((await stat(candidate)).isFile()) return candidate;
    } catch {
      // Try the next form of the exported route.
    }
  }
}

const server = createServer(async (request, response) => {
  if (request.method !== "GET" && request.method !== "HEAD") {
    response.writeHead(405, { Allow: "GET, HEAD" }).end();
    return;
  }

  try {
    const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    const path = resolve(directory, `.${pathname.replace(/\/+$/, "") || "/"}`);
    if (path !== directory && !path.startsWith(`${directory}${sep}`)) {
      response.writeHead(403).end();
      return;
    }
    let file = await findStaticFile(path);
    if (!file) {
      file = resolve(directory, "404.html");
      response.statusCode = 404;
    }
    const contentType = types[extname(file)] || "application/octet-stream";
    response.setHeader("Content-Type", contentType);
    response.setHeader("X-Content-Type-Options", "nosniff");
    response.setHeader(
      "Cache-Control",
      pathname.startsWith("/_next/static/") ? "public, max-age=31536000, immutable" : "no-cache",
    );
    const acceptsGzip = request.headers["accept-encoding"]
      ?.split(",")
      .some((value) => value.trim() === "gzip");
    const compressed = acceptsGzip && /^(text\/|application\/(json|xml)|image\/svg)/.test(contentType);
    response.setHeader("Vary", "Accept-Encoding");
    if (compressed) response.setHeader("Content-Encoding", "gzip");
    if (request.method === "HEAD") response.end();
    else {
      const stream = createReadStream(file).on("error", () => response.destroy());
      if (compressed) stream.pipe(createGzip().on("error", () => response.destroy())).pipe(response);
      else stream.pipe(response);
    }
  } catch {
    response.writeHead(400).end();
  }
});

server.listen(port, host, () => console.log(`Kodar: http://${host}:${server.address().port}`));
for (const signal of ["SIGINT", "SIGTERM"]) process.on(signal, () => server.close());
