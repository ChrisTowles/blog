import { buildCspHeader, DEFAULT_CSP_HEADER, parseCspParam } from './csp.ts';

export type Env = {
  ASSETS: { fetch(request: Request): Promise<Response> };
};

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

const LANDING_HEADERS = {
  'Content-Type': 'text/html; charset=utf-8',
  'Cache-Control': 'public, max-age=300, must-revalidate',
  'X-Frame-Options': 'DENY',
  'Content-Security-Policy': LANDING_CSP,
};

// No X-Frame-Options here: SEP-1865 requires the sandbox to be framed
// cross-origin from the blog, so DENY or SAMEORIGIN would break the host.
// Framing limits come from the per-request CSP instead.
const SANDBOX_HEADERS = {
  'Content-Type': 'text/html; charset=utf-8',
  'Cache-Control': 'no-cache, no-store, must-revalidate',
  Pragma: 'no-cache',
  Expires: '0',
};

const SCRIPT_HEADERS = {
  'Content-Type': 'application/javascript; charset=utf-8',
  'Cache-Control': 'public, max-age=300, must-revalidate',
};

const TEXT_HEADERS = { 'Content-Type': 'text/plain' };

function respond(body: BodyInit | null, status: number, headers: Record<string, string>) {
  return new Response(body, { status, headers: { ...BASELINE_HEADERS, ...headers } });
}

async function serveAsset(
  env: Env,
  request: Request,
  path: string,
  headers: Record<string, string>,
) {
  const asset = await env.ASSETS.fetch(new Request(new URL(path, request.url)));

  if (!asset.ok) {
    return respond('not found', 404, TEXT_HEADERS);
  }

  return respond(request.method === 'HEAD' ? null : asset.body, 200, headers);
}

function sandboxCsp(url: URL) {
  const rawCsp = url.searchParams.getAll('csp');
  const cspConfig = rawCsp.length === 1 ? parseCspParam(rawCsp[0]) : undefined;

  return cspConfig ? buildCspHeader(cspConfig) : DEFAULT_CSP_HEADER;
}

export default {
  async fetch(request: Request, env: Env) {
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return respond('not found', 404, TEXT_HEADERS);
    }

    const url = new URL(request.url);

    try {
      switch (url.pathname) {
        case '/':
          return await serveAsset(env, request, '/index.html', LANDING_HEADERS);
        case '/sandbox.html':
          return await serveAsset(env, request, '/sandbox.html', {
            ...SANDBOX_HEADERS,
            'Content-Security-Policy': sandboxCsp(url),
          });
        case '/sandbox.js':
        case '/relay.js':
          return await serveAsset(env, request, url.pathname, SCRIPT_HEADERS);
        default:
          return respond('not found', 404, TEXT_HEADERS);
      }
    } catch (error) {
      console.error('mcp service error:', error);

      return respond('internal error', 500, TEXT_HEADERS);
    }
  },
};
