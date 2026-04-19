/**
 * Minimal Playwright test harness for the aviation-answer iframe bundle.
 *
 * Serves the built single-file bundle on a local HTTP port. The Playwright
 * test navigates to it directly and drives the exposed test hook
 * `window.__AVIATION_ANSWER__.handleToolResult(...)` — which is the same
 * function the real App transport calls when `ui/notifications/tool-result`
 * arrives. This tests the rendering pipeline (answer-first layout, ECharts,
 * chips, SQL toggle, truncation) against the actual production bundle.
 *
 * What we intentionally DO NOT test here (Unit 6's job, gated on the live
 * mcp service): the full SEP-1865 handshake (sandbox-proxy-ready → resource-
 * ready → initialize → tool-input → tool-result). The mcp/e2e/ harness in
 * this repo exercises that contract separately.
 */

import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BUNDLE = resolve(__dirname, '..', 'dist', 'index.html');

const PORT = Number(process.env.AVIATION_E2E_PORT || 8182);

const server = createServer(async (req, res) => {
  const url = new URL(req.url ?? '/', `http://localhost:${PORT}`);
  if (url.pathname === '/' || url.pathname === '/bundle.html') {
    try {
      const body = await readFile(BUNDLE);
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-cache',
      });
      res.end(body);
    } catch (err) {
      res.writeHead(500);
      res.end(`bundle not built — run 'pnpm build:ui-bundle' first\n${err.message}`);
    }
    return;
  }
  res.writeHead(404);
  res.end('not found');
});

await new Promise((r) => server.listen(PORT, '127.0.0.1', r));
// eslint-disable-next-line no-console
console.log(`[aviation-answer-e2e] http://127.0.0.1:${PORT}/bundle.html`);
