/**
 * GET `/mcp/aviation/resource?uri=ui://aviation-answer`
 *
 * HTTP-fetchable surface for the aviation UI bundle. Closes Unit 6's
 * persisted-replay gap: when the chat page reloads, `<ToolUiResource>` can
 * rehydrate the iframe without a full MCP `resources/read` round-trip.
 *
 * **Allowlist**: only `ui://aviation-answer` is served. Any other URI (or a
 * missing `uri` param) returns 404. The allowlist is explicit rather than
 * scheme-based so a future second ui resource has to be opted in here.
 *
 * **Caching**: the bundle is immutable per deploy (plan Key Decision, line
 * 125) — each Cloud Run revision re-reads the file at module import. We
 * serve it with `Cache-Control: public, max-age=31536000, immutable` so
 * browsers cache forever. The `Vary: Accept-Encoding` is defensive: Nitro /
 * Cloud Run's edge may gzip conditionally.
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
