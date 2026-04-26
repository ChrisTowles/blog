/**
 * Request enrichment middleware — promote the auto-generated HTTP server span
 * from "skinny" to "wide" by attaching business attributes onto it.
 *
 * Boris-Tané pattern: the active span IS the wide event. Don't create a new
 * one — auto-instrumentation already gave us a parent. Just decorate it.
 *
 * Numbered `01-` so it runs ahead of `mcp-rate-limit.ts` (alphabetical).
 *
 * `request.id` resolution order:
 *   1. inbound `x-cloud-trace-context: TRACE_ID/SPAN_ID;o=1` (Cloud Run/GCP)
 *   2. inbound `x-request-id` (caller-provided)
 *   3. fresh `crypto.randomUUID()`
 *
 * Echoed back in the `x-request-id` response header so callers can correlate.
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
