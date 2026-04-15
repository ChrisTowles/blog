/**
 * Tests for the replay-fetch endpoint GET `/mcp/aviation/resource`.
 *
 * The handler is a thin h3 wrapper around a fixed allowlist + a bundle read.
 * We drive it with a minimal IncomingMessage/ServerResponse pair built from
 * scratch. This avoids pulling in a mocks-http dep and keeps the surface
 * (allowlist, cache headers, body) exercised end-to-end.
 */

import { describe, it, expect } from 'vitest';
import { EventEmitter } from 'node:events';
import type { IncomingMessage, ServerResponse } from 'node:http';
import { createEvent } from 'h3';
import resourceHandler from './resource.get';
import { readAviationBundle } from '../../../utils/mcp/aviation/ui-resource';
import { AVIATION_UI_RESOURCE_URI } from '../../../../shared/mcp-aviation-types';

function makeReq(url: string): IncomingMessage {
  const req = new EventEmitter() as unknown as IncomingMessage;
  Object.assign(req, {
    method: 'GET',
    url,
    headers: {} as Record<string, string>,
    socket: { remoteAddress: '127.0.0.1' },
  });
  return req;
}

function makeRes(): ServerResponse {
  const headers: Record<string, string | number | string[]> = {};
  let statusCode = 200;
  let ended = false;
  // Pull in the h3 contract we actually use.
  const res: Partial<ServerResponse> & {
    _data?: unknown;
    getHeaders: () => Record<string, unknown>;
    _ended: () => boolean;
  } = {
    setHeader(name: string, value: string | number | string[]) {
      headers[name.toLowerCase()] = value;
      return this as ServerResponse;
    },
    getHeader(name: string) {
      return headers[name.toLowerCase()];
    },
    getHeaders: () => ({ ...headers }),
    removeHeader(name: string) {
      delete headers[name.toLowerCase()];
    },
    hasHeader(name: string) {
      return name.toLowerCase() in headers;
    },
    set statusCode(v: number) {
      statusCode = v;
    },
    get statusCode() {
      return statusCode;
    },
    writeHead(_status: number) {
      return this as ServerResponse;
    },
    write() {
      return true;
    },
    end(..._args: unknown[]) {
      ended = true;
      return this as ServerResponse;
    },
    _ended: () => ended,
    get headersSent() {
      return false;
    },
  };
  return res as unknown as ServerResponse;
}

describe('GET /mcp/aviation/resource', () => {
  it('serves the bundle when uri matches the allowlist', async () => {
    const req = makeReq(
      `/mcp/aviation/resource?uri=${encodeURIComponent(AVIATION_UI_RESOURCE_URI)}`,
    );
    const res = makeRes();
    const event = createEvent(req, res);
    const body = await resourceHandler(event);
    expect(typeof body).toBe('string');
    expect(body).toBe(readAviationBundle());

    const headers = (res as unknown as { getHeaders: () => Record<string, unknown> }).getHeaders();
    expect(String(headers['content-type'])).toContain('text/html');
    expect(String(headers['cache-control'])).toContain('max-age=31536000');
    expect(String(headers['cache-control'])).toContain('immutable');
  });

  it('rejects a non-allowlisted uri with 404', async () => {
    const event = createEvent(makeReq('/mcp/aviation/resource?uri=ui%3A%2F%2Fattacker'), makeRes());
    await expect(resourceHandler(event)).rejects.toMatchObject({ statusCode: 404 });
  });

  it('rejects a missing uri with 404', async () => {
    const event = createEvent(makeReq('/mcp/aviation/resource'), makeRes());
    await expect(resourceHandler(event)).rejects.toMatchObject({ statusCode: 404 });
  });
});
