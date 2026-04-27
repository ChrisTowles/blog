import { SpanStatusCode, type Span } from '@opentelemetry/api';

/**
 * Standard span-error recording dance. Used wherever a span wraps a try/catch.
 * Exists because `recordException` alone doesn't set status; both must fire to
 * make NR's error views light up, and `error.type` is the only stable attr in
 * the GenAI namespace.
 */
export function recordSpanError(span: Span, err: unknown): void {
  const error = err instanceof Error ? err : new Error(String(err));
  span.recordException(error);
  span.setAttribute('error.type', error.name || 'Error');
  span.setStatus({ code: SpanStatusCode.ERROR, message: error.message });
}
