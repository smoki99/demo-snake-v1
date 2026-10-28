import { serve, file } from "bun";

// Tiny static server for previewing (accepts any Host header, unlike bun --serve).
const root = import.meta.dir;
const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json" };

serve({
  port: 3456,
  fetch(req) {
    const url = new URL(req.url);
    const path = url.pathname === "/" ? "/index.html" : url.pathname;
    if (path.includes("..")) return new Response("Forbidden", { status: 403 });
    const f = file(root + path);
    if (!f.size) {
      // SPA fallback: unknown paths serve index.html (still blocks path traversal above).
      return new Response(file(root + "/index.html"), { headers: { "content-type": "text/html" } });
    }
    const ext = path.slice(path.lastIndexOf("."));
    return new Response(f, { headers: { "content-type": TYPES[ext] ?? "application/octet-stream" } });
  },
});
console.log("serving on http://localhost:3456");
