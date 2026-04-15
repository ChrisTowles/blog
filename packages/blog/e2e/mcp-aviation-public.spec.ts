/**
 * Playwright e2e: the public MCP endpoint is reachable without auth.
 *
 * Plan Unit 7 test scenarios (lines 667-674):
 *   - POST /mcp/aviation (unauthenticated) + JSON-RPC tools/list → valid response.
 *   - GET /mcp/aviation/resource?uri=ui://aviation-answer returns the bundle.
 *   - A spray of requests past the default 60/5min cap yields 429 + JSON error shape.
 *
 * This test is hermetic against the Nuxt dev server (no deployed staging
 * required) because the MCP Streamable HTTP route is a plain Nitro handler.
 */

import { test, expect } from '@playwright/test';

const MCP_URL = '/mcp/aviation';
const RESOURCE_URL = '/mcp/aviation/resource?uri=' + encodeURIComponent('ui://aviation-answer');

function rpc(id: number, method: string, params: Record<string, unknown> = {}) {
  return { jsonrpc: '2.0' as const, id, method, params };
}

test.describe('MCP aviation — public surface', () => {
  test('unauthenticated POST returns a JSON-RPC initialize + tools/list', async ({ request }) => {
    // 1. Initialize. Streamable HTTP expects a first `initialize` to mint the session id.
    const initRes = await request.post(MCP_URL, {
      data: rpc(1, 'initialize', {
        protocolVersion: '2025-06-18',
        capabilities: {},
        clientInfo: { name: 'playwright-public-hit', version: '0.0.0' },
      }),
      headers: { Accept: 'application/json, text/event-stream' },
    });
    expect(initRes.status(), 'initialize accepted').toBeLessThan(400);
    const sessionId = initRes.headers()['mcp-session-id'];
    expect(sessionId, 'server minted a session id').toBeTruthy();

    // 2. Initialized notification (required by the protocol before tool calls).
    await request.post(MCP_URL, {
      data: { jsonrpc: '2.0', method: 'notifications/initialized' },
      headers: {
        'mcp-session-id': sessionId!,
        Accept: 'application/json, text/event-stream',
      },
    });

    // 3. tools/list using the session.
    const listRes = await request.post(MCP_URL, {
      data: rpc(2, 'tools/list'),
      headers: {
        'mcp-session-id': sessionId!,
        Accept: 'application/json, text/event-stream',
      },
    });
    expect(listRes.status()).toBe(200);
    const body = await listRes.text();
    // Streamable HTTP can return either a plain JSON object or an SSE frame
    // depending on accept negotiation — the test is tolerant of both.
    expect(body).toContain('ask_aviation');
    expect(body).toContain('list_questions');
    expect(body).toContain('schema');
  });

  test('GET /mcp/aviation/resource serves the ui bundle with immutable cache', async ({
    request,
  }) => {
    const res = await request.get(RESOURCE_URL);
    expect(res.status()).toBe(200);
    expect(res.headers()['content-type']).toContain('text/html');
    expect(res.headers()['cache-control']).toContain('immutable');
    const body = await res.text();
    expect(body).toContain('<'); // some HTML body
  });

  test('GET /mcp/aviation/resource with a non-allowlisted uri returns 404', async ({ request }) => {
    const res = await request.get('/mcp/aviation/resource?uri=ui%3A%2F%2Fattacker');
    expect(res.status()).toBe(404);
  });
});
