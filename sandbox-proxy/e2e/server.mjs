// Tiny test HTTP server for Playwright sandbox-proxy e2e.
//
// Serves two origins on two ports:
//   - SANDBOX_PORT (default 8081) serves this directory's static files +
//     emulates the Cloudflare Pages Function at /sandbox.html by applying a
//     Content-Security-Policy header computed from ?csp=.
//   - HOST_PORT (default 8080) serves a minimal "host" page that iframes the
//     sandbox — this gives Playwright two distinct origins (127.0.0.1:HOST vs
//     localhost:SANDBOX) so origin-isolation is testable.
//
// This is intentionally NOT the production code path; it mirrors the semantics
// of functions/sandbox.html.ts so that Playwright exercises the same CSP
// parsing + relay logic without needing wrangler installed.

import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, extname, join, resolve } from 'node:path';
import { buildCspHeader, DEFAULT_CSP_HEADER, parseCspParam } from '../csp.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const SANDBOX_PORT = Number(process.env.SANDBOX_PORT || 8081);
const HOST_PORT = Number(process.env.HOST_PORT || 8080);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
};

async function serveStatic(res, absPath) {
  try {
    const body = await readFile(absPath);
    const ext = extname(absPath);
    res.writeHead(200, {
      'Content-Type': MIME[ext] ?? 'application/octet-stream',
      'X-Content-Type-Options': 'nosniff',
    });
    res.end(body);
  } catch {
    res.writeHead(404);
    res.end('not found');
  }
}

// ---- Sandbox server (port 8081, origin http://localhost:8081) ----
const sandbox = createServer(async (req, res) => {
  const url = new URL(req.url ?? '/', `http://localhost:${SANDBOX_PORT}`);

  if (url.pathname === '/sandbox.html') {
    const cspRaw = url.searchParams.get('csp');
    const cspConfig = parseCspParam(cspRaw);
    const cspHeader = cspConfig ? buildCspHeader(cspConfig) : DEFAULT_CSP_HEADER;
    const body = await readFile(join(ROOT, 'sandbox.html'));
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
      'Content-Security-Policy': cspHeader,
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    });
    res.end(body);
    return;
  }

  // Everything else is a raw static file.
  const rel = url.pathname === '/' ? '/index.html' : url.pathname;
  await serveStatic(res, join(ROOT, rel));
});

// ---- Host server (port 8080, origin http://127.0.0.1:8080) ----
// Different hostname → different origin from the sandbox's localhost:8081.
const host = createServer((req, res) => {
  const url = new URL(req.url ?? '/', `http://127.0.0.1:${HOST_PORT}`);

  if (url.pathname === '/host.html') {
    const html = `<!doctype html>
<html>
<head><meta charset="utf-8"><title>Host</title></head>
<body>
  <h1>host</h1>
  <iframe id="sandbox" src="http://localhost:${SANDBOX_PORT}/sandbox.html"
    sandbox="allow-scripts allow-same-origin"
    style="width:400px;height:300px;border:1px solid #ccc"></iframe>
  <script>
    window.addEventListener('message', (event) => {
      if (event.origin !== 'http://localhost:${SANDBOX_PORT}') return;
      const data = event.data;
      // Record every message we receive for Playwright to read.
      window.__received = window.__received || [];
      window.__received.push({ method: data && data.method, origin: event.origin, ts: Date.now() });

      if (data && data.method === 'ui/notifications/sandbox-proxy-ready') {
        const iframe = document.getElementById('sandbox');
        iframe.contentWindow.postMessage({
          jsonrpc: '2.0',
          method: 'ui/notifications/sandbox-resource-ready',
          params: {
            html: '<!doctype html><html><body><p id="inner-rendered">hello inner</p><script>window.parent.postMessage({jsonrpc:"2.0",method:"ui/notifications/initialized"},"*")<\\/script></body></html>',
          },
        }, 'http://localhost:${SANDBOX_PORT}');
      }
    });
  </script>
</body></html>`;
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
    return;
  }

  res.writeHead(404);
  res.end('not found');
});

await new Promise((r) => sandbox.listen(SANDBOX_PORT, r));
await new Promise((r) => host.listen(HOST_PORT, '127.0.0.1', r));

// eslint-disable-next-line no-console
console.log(`[sandbox-proxy-test] sandbox: http://localhost:${SANDBOX_PORT}`);
// eslint-disable-next-line no-console
console.log(`[sandbox-proxy-test] host:    http://127.0.0.1:${HOST_PORT}`);
