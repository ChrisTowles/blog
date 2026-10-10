// Stand-in for the blog in Playwright runs: serves a page on 127.0.0.1:HOST_PORT
// that iframes the real sandbox Worker (wrangler dev on localhost:SANDBOX_PORT).
// The two hostnames differ, which gives the two distinct origins that the
// origin-isolation test needs.

import { createServer } from 'node:http';

const SANDBOX_PORT = Number(process.env.SANDBOX_PORT || 8081);

const HOST_PORT = Number(process.env.HOST_PORT || 8080);

const HOST_PAGE = `<!doctype html>
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

const host = createServer((req, res) => {
  const url = new URL(req.url ?? '/', `http://127.0.0.1:${HOST_PORT}`);

  if (url.pathname === '/host.html') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(HOST_PAGE);

    return;
  }

  res.writeHead(404);
  res.end('not found');
});

await new Promise((resolve) => host.listen(HOST_PORT, '127.0.0.1', resolve));

console.log(`[mcp-e2e] host: http://127.0.0.1:${HOST_PORT}`);
