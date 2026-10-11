import { describe, expect, it } from 'vitest';
import worker, { type Env } from './worker.ts';

const ORIGIN = 'https://sandbox.example.com';

const ASSET_BODIES = new Map([
  ['/index.html', '<h1>landing</h1>'],
  ['/sandbox.html', '<h1>sandbox</h1>'],
  ['/sandbox.js', 'export {};'],
  ['/relay.js', 'export {};'],
]);

const env: Env = {
  ASSETS: {
    async fetch(request) {
      const body = ASSET_BODIES.get(new URL(request.url).pathname);

      return body === undefined ? new Response('missing', { status: 404 }) : new Response(body);
    },
  },
};

function get(path: string, method = 'GET') {
  return worker.fetch(new Request(`${ORIGIN}${path}`, { method }), env);
}

describe('baseline headers', () => {
  it.each(['/', '/sandbox.html', '/sandbox.js', '/relay.js', '/missing', '/csp.ts'])(
    'are set on %s',
    async (path) => {
      const res = await get(path);

      expect(res.headers.get('x-content-type-options')).toBe('nosniff');
      expect(res.headers.get('strict-transport-security')).toBe(
        'max-age=31536000; includeSubDomains',
      );
      expect(res.headers.get('cross-origin-opener-policy')).toBe('same-origin');
      expect(res.headers.get('cross-origin-resource-policy')).toBe('cross-origin');
      expect(res.headers.get('referrer-policy')).toBe('strict-origin-when-cross-origin');
      expect(res.headers.get('permissions-policy')).toBe('interest-cohort=()');
    },
  );
});

describe('routes', () => {
  it('serves the landing page with a strict CSP and X-Frame-Options', async () => {
    const res = await get('/');

    expect(res.status).toBe(200);
    expect(await res.text()).toBe('<h1>landing</h1>');
    expect(res.headers.get('x-frame-options')).toBe('DENY');
    expect(res.headers.get('content-security-policy')).toContain("frame-ancestors 'none'");
    expect(res.headers.get('cache-control')).toBe('public, max-age=300, must-revalidate');
  });

  it('serves sandbox.html uncached and frameable', async () => {
    const res = await get('/sandbox.html');

    expect(res.status).toBe(200);
    expect(await res.text()).toBe('<h1>sandbox</h1>');
    expect(res.headers.get('x-frame-options')).toBeNull();
    expect(res.headers.get('cache-control')).toBe('no-cache, no-store, must-revalidate');
    expect(res.headers.get('pragma')).toBe('no-cache');
    expect(res.headers.get('expires')).toBe('0');
  });

  it.each(['/sandbox.js', '/relay.js'])('serves %s as cacheable JavaScript', async (path) => {
    const res = await get(path);

    expect(res.status).toBe(200);
    expect(res.headers.get('content-type')).toBe('application/javascript; charset=utf-8');
    expect(res.headers.get('cache-control')).toBe('public, max-age=300, must-revalidate');
  });

  it.each(['/missing', '/csp.ts', '/index.html', '/package.json'])('404s on %s', async (path) => {
    const res = await get(path);

    expect(res.status).toBe(404);
    expect(res.headers.get('content-type')).toBe('text/plain');
  });

  it('404s on non-GET methods', async () => {
    const res = await get('/sandbox.html', 'POST');

    expect(res.status).toBe(404);
  });

  it('answers HEAD with headers and no body', async () => {
    const res = await get('/sandbox.html', 'HEAD');

    expect(res.status).toBe(200);
    expect(res.headers.get('content-security-policy')).toBeTruthy();
    expect(await res.text()).toBe('');
  });

  it('returns 500 with baseline headers when the asset binding throws', async () => {
    const broken: Env = {
      ASSETS: {
        async fetch() {
          throw new Error('boom');
        },
      },
    };

    const res = await worker.fetch(new Request(`${ORIGIN}/sandbox.js`), broken);

    expect(res.status).toBe(500);
    expect(res.headers.get('x-content-type-options')).toBe('nosniff');
  });
});

describe('sandbox.html CSP', () => {
  async function cspFor(query: string) {
    const res = await get(`/sandbox.html${query}`);

    return res.headers.get('content-security-policy');
  }

  it('uses the default CSP without a csp param', async () => {
    expect(await cspFor('')).toContain("connect-src 'self';");
  });

  it('honors a valid csp param', async () => {
    const csp = encodeURIComponent(JSON.stringify({ connectDomains: ['https://api.example.com'] }));

    expect(await cspFor(`?csp=${csp}`)).toContain("connect-src 'self' https://api.example.com;");
  });

  it('drops injected directives', async () => {
    const csp = encodeURIComponent(
      JSON.stringify({ connectDomains: ["https://evil.com; script-src 'unsafe-eval'"] }),
    );

    expect(await cspFor(`?csp=${csp}`)).toContain("connect-src 'self';");
  });

  it('falls back to the default CSP when csp is repeated', async () => {
    const csp = encodeURIComponent(JSON.stringify({ connectDomains: ['https://api.example.com'] }));

    expect(await cspFor(`?csp=${csp}&csp=${csp}`)).not.toContain('api.example.com');
  });
});
