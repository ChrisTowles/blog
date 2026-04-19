/**
 * CORS preflight for POST /mcp/aviation/query.
 *
 * The iframe runs cross-origin (sandbox host) and sends `content-type:
 * application/json`, so browsers send an OPTIONS preflight before the POST.
 * We reply with `*` since the endpoint is anonymous and cookie-free.
 */

import { defineEventHandler, setResponseHeader, setResponseStatus } from 'h3';

export default defineEventHandler((event) => {
  setResponseHeader(event, 'Access-Control-Allow-Origin', '*');
  setResponseHeader(event, 'Access-Control-Allow-Methods', 'POST, OPTIONS');
  setResponseHeader(event, 'Access-Control-Allow-Headers', 'Content-Type');
  setResponseHeader(event, 'Access-Control-Max-Age', 600);
  setResponseHeader(event, 'Vary', 'Origin');
  setResponseStatus(event, 204);
  return '';
});
