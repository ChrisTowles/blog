/**
 * GET `/mcp/aviation/resource?uri=ui://aviation-answer` — lets `<ToolUiResource>`
 * rehydrate the iframe on chat reload without an MCP `resources/read` round-trip.
 * The URI allowlist is explicit rather than scheme-based so a second ui resource
 * has to opt in. The bundle is immutable per revision, hence the year-long cache.
 */

import { defineEventHandler, getQuery, createError, setResponseHeader } from 'h3';
import { AVIATION_UI_RESOURCE_URI } from '../../../../shared/mcp-aviation-types';
import { readAviationBundle } from '../../../utils/mcp/aviation/ui-resource';

const ALLOWED_URIS = new Set<string>([AVIATION_UI_RESOURCE_URI]);

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const uri = typeof query.uri === 'string' ? query.uri : '';
  if (!uri || !ALLOWED_URIS.has(uri)) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Not Found',
      data: { error: { code: 'not_found', message: `uri not allowlisted: ${uri || '(missing)'}` } },
    });
  }

  setResponseHeader(event, 'Content-Type', 'text/html; charset=utf-8');
  setResponseHeader(event, 'Cache-Control', 'public, max-age=31536000, immutable');
  setResponseHeader(event, 'Vary', 'Accept-Encoding');
  return readAviationBundle();
});
