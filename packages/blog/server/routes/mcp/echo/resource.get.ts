import { defineEventHandler, getQuery, createError, setResponseHeader } from 'h3';
import { ECHO_UI_RESOURCE_URI } from '../../../../shared/mcp-echo-types';
import { readEchoBundle } from '../../../utils/mcp/echo/ui-resource';

const ALLOWED_URIS = new Set<string>([ECHO_UI_RESOURCE_URI]);

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
  return readEchoBundle();
});
