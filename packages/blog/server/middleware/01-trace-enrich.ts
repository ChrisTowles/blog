/**
 * Stamps every request with an id and, when an OTel span is active, decorates it with business
 * attributes (`@opentelemetry/api` is a no-op without an SDK, which is the case on Workers).
 *
 * `request.id` resolution: inbound x-request-id -> Cloudflare `cf-ray` -> fresh uuid. Echoed in
 * the x-request-id response header.
 */

import { defineEventHandler, getRequestHeader, setResponseHeader } from 'h3';
import { trace } from '@opentelemetry/api';

const REQUEST_ID_HEADER = 'x-request-id';

export function deriveRequestId(headers: { requestId?: string; cfRay?: string }): string {
  return headers.requestId || headers.cfRay || crypto.randomUUID();
}

export default defineEventHandler(async (event) => {
  const requestId = deriveRequestId({
    requestId: getRequestHeader(event, REQUEST_ID_HEADER),
    cfRay: getRequestHeader(event, 'cf-ray'),
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
