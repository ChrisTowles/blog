/**
 * A real IncomingMessage/ServerResponse pair, so allowlist, cache headers and body are
 * exercised through the real handler.
 */

import { describe, it, expect } from 'vitest';
import { IncomingMessage, ServerResponse } from 'node:http';
import { Socket } from 'node:net';
import { createEvent } from 'h3';
import resourceHandler from './resource.get';
import { readAviationBundle } from '../../../utils/mcp/aviation/ui-resource';
import { AVIATION_UI_RESOURCE_URI } from '../../../../shared/mcp-aviation-types';

function makeEvent(url: string) {
  const req = new IncomingMessage(new Socket());
  req.method = 'GET';
  req.url = url;
  const res = new ServerResponse(req);

  return { event: createEvent(req, res), res };
}

describe('GET /mcp/aviation/resource', () => {
  it('serves the bundle when uri matches the allowlist', async () => {
    const { event, res } = makeEvent(
      `/mcp/aviation/resource?uri=${encodeURIComponent(AVIATION_UI_RESOURCE_URI)}`,
    );

    const body = await resourceHandler(event);
    expect(body).toBe(readAviationBundle());

    const headers = res.getHeaders();
    expect(String(headers['content-type'])).toContain('text/html');
    expect(String(headers['cache-control'])).toContain('max-age=31536000');
    expect(String(headers['cache-control'])).toContain('immutable');
  });

  it('rejects a non-allowlisted uri with 404', async () => {
    const { event } = makeEvent('/mcp/aviation/resource?uri=ui%3A%2F%2Fattacker');
    await expect(resourceHandler(event)).rejects.toMatchObject({ statusCode: 404 });
  });

  it('rejects a missing uri with 404', async () => {
    const { event } = makeEvent('/mcp/aviation/resource');
    await expect(resourceHandler(event)).rejects.toMatchObject({ statusCode: 404 });
  });
});
