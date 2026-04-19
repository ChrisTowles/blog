import { readFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { resolve } from 'node:path';
import {
  createApp,
  createRouter,
  defineEventHandler,
  getQuery,
  setResponseHeaders,
  setResponseStatus,
  toNodeListener,
} from 'h3';
import { buildCspHeader, DEFAULT_CSP_HEADER, parseCspParam } from './csp.ts';

const ROOT = resolve(import.meta.dirname);
const PORT = Number(process.env.PORT ?? 8080);

const BASELINE_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'interest-cohort=()',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Resource-Policy': 'cross-origin',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
};

const LANDING_CSP =
  "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'none'; object-src 'none'";

// Static assets baked into the container — read once at startup, served
// from memory so the hot path is pure header assembly.
const ASSETS = {
  index: readFileSync(resolve(ROOT, 'index.html')),
  sandbox: readFileSync(resolve(ROOT, 'sandbox.html')),
  sandboxJs: readFileSync(resolve(ROOT, 'sandbox.js')),
  relayJs: readFileSync(resolve(ROOT, 'relay.js')),
} as const;

const app = createApp({
  onError: (error, event) => {
    console.error('mcp service error:', error);
    setResponseStatus(event, 500);
    setResponseHeaders(event, { ...BASELINE_HEADERS, 'Content-Type': 'text/plain' });
    return 'internal error';
  },
});

const router = createRouter();

router.get(
  '/',
  defineEventHandler((event) => {
    setResponseHeaders(event, {
      ...BASELINE_HEADERS,
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=300, must-revalidate',
      'X-Frame-Options': 'DENY',
      'Content-Security-Policy': LANDING_CSP,
    });
    return ASSETS.index;
  }),
);

router.get(
  '/sandbox.html',
  defineEventHandler((event) => {
    const raw = getQuery(event).csp;
    const cspConfig = typeof raw === 'string' ? parseCspParam(raw) : undefined;
    const cspHeader = cspConfig ? buildCspHeader(cspConfig) : DEFAULT_CSP_HEADER;

    setResponseHeaders(event, {
      ...BASELINE_HEADERS,
      'Content-Type': 'text/html; charset=utf-8',
      'Content-Security-Policy': cspHeader,
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      Pragma: 'no-cache',
      Expires: '0',
      // No X-Frame-Options here: SEP-1865 requires the sandbox to be framed
      // cross-origin from the blog, so SAMEORIGIN would break the entire host.
      // Framing restrictions come from the per-request CSP (frame-ancestors
      // can be added via the ?csp= channel when we want to whitelist origins).
    });
    return ASSETS.sandbox;
  }),
);

function scriptHandler(body: Buffer) {
  return defineEventHandler((event) => {
    setResponseHeaders(event, {
      ...BASELINE_HEADERS,
      'Content-Type': 'application/javascript; charset=utf-8',
      'Cache-Control': 'public, max-age=300, must-revalidate',
    });
    return body;
  });
}

router.get('/sandbox.js', scriptHandler(ASSETS.sandboxJs));
router.get('/relay.js', scriptHandler(ASSETS.relayJs));

app.use(router);

app.use(
  defineEventHandler((event) => {
    setResponseStatus(event, 404);
    setResponseHeaders(event, { ...BASELINE_HEADERS, 'Content-Type': 'text/plain' });
    return 'not found';
  }),
);

createServer(toNodeListener(app)).listen(PORT, () => {
  console.log(`mcp service listening on :${PORT}`);
});
