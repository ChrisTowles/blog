/**
 * Decorate the auto-generated HTTP server span with business attributes.
 * Numbered `01-` so it runs ahead of `mcp-rate-limit.ts` (alphabetical).
 *
 * `request.id` resolution: x-cloud-trace-context (Cloud Run/GCP) → inbound
 * x-request-id → fresh uuid. Echoed in the x-request-id response header.
 */

import { defineEventHandler, getRequestHeader, setResponseHeader } from 'h3';
import { trace } from '@opentelemetry/api';

const CLOUD_TRACE_HEADER = 'x-cloud-trace-context';
const REQUEST_ID_HEADER = 'x-request-id';

export function deriveRequestId(headers: { cloudTrace?: string; requestId?: string }): string {
  if (headers.cloudTrace) {
    // Format: "TRACE_ID/SPAN_ID;o=TRACE_TRUE". Take the trace portion.
    const tracePart = headers.cloudTrace.split('/')[0];
    if (tracePart) return tracePart;
  }
  if (headers.requestId) return headers.requestId;
  return crypto.randomUUID();
}

export default defineEventHandler(async (event) => {
  const cloudTrace = getRequestHeader(event, CLOUD_TRACE_HEADER);
  const inboundRequestId = getRequestHeader(event, REQUEST_ID_HEADER);
  const requestId = deriveRequestId({
    cloudTrace,
    requestId: inboundRequestId,
  });

  setResponseHeader(event, REQUEST_ID_HEADER, requestId);

  const span = trace.getActiveSpan();
  if (!span) return;

  span.setAttribute('request.id', requestId);
  span.setAttribute('route.name', event.path ?? '');

  // Best-effort user/session lookup. Public routes (blog reads, RSS, etc.)
  // have no session — that's fine, we just don't attach those attrs.
  try {
    const session = await getUserSession(event);
    if (session?.user?.id) span.setAttribute('user.id', session.user.id);
    if (session?.id) span.setAttribute('session.id', session.id);
  } catch {
    // session helpers fail on routes without auth context — non-fatal.
  }
});
