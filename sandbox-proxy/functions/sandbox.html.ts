/**
 * Cloudflare Pages Function for /sandbox.html.
 *
 * Reads the `?csp=<url-encoded-json>` query param, sanitises it, and responds
 * with the static sandbox.html body plus a per-request Content-Security-Policy
 * header. Static _headers apply baseline hardening; this function adds the
 * dynamic CSP directive.
 *
 * The inner iframe inherits this CSP because sandbox.js populates it via
 * document.write() (same-document inheritance).
 */

import { buildCspHeader, DEFAULT_CSP_HEADER, parseCspParam } from '../csp';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const onRequestGet: (ctx: any) => Promise<Response> = async (ctx) => {
  const url = new URL(ctx.request.url);
  const cspRaw = url.searchParams.get('csp');
  const cspConfig = parseCspParam(cspRaw);
  const cspHeader = cspConfig ? buildCspHeader(cspConfig) : DEFAULT_CSP_HEADER;

  // Fetch the static sandbox.html asset from the Pages bundle.
  const assetResponse = await ctx.env.ASSETS.fetch(new URL('/sandbox.html', url.origin).toString());

  const headers = new Headers(assetResponse.headers);
  headers.set('Content-Security-Policy', cspHeader);
  // Must re-compute per request since CSP is derived from the query string.
  headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  headers.set('Pragma', 'no-cache');
  headers.set('Expires', '0');
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('X-Frame-Options', 'SAMEORIGIN'); // inner frame is same-document; parent is cross-origin via iframe
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  headers.set('Content-Type', 'text/html; charset=utf-8');

  return new Response(assetResponse.body, {
    status: 200,
    headers,
  });
};
