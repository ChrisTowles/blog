/**
 * evlog → OTel span event bridge.
 *
 * Boris-Tané pattern, paraphrased: "a log line is a wide event with no parent;
 * if there's a parent (an active span), it's an event on that span." So we
 * route every evlog drain entry into `span.addEvent(...)` when a span is
 * active, and fall back to stdout otherwise (so CLI scripts and startup logs
 * still get something visible).
 *
 * Truncation: New Relic caps OTLP attribute string values at 4095 chars.
 * We truncate to 2000 to leave headroom for combined attribute payloads.
 */

import { trace, type Attributes } from '@opentelemetry/api';

const MAX_ATTR_LEN = 2000;

interface DrainContextLite {
  event: Record<string, unknown> & { level?: string; service?: string };
}

export function truncate(value: unknown, max = MAX_ATTR_LEN): string {
  const s = typeof value === 'string' ? value : JSON.stringify(value);
  if (s.length <= max) return s;
  return s.slice(0, max);
}

interface EvlogErrorShape {
  name?: string;
  message?: string;
  stack?: string;
}

function isErrorShape(value: unknown): value is EvlogErrorShape {
  return (
    typeof value === 'object' &&
    value !== null &&
    ('message' in value || 'name' in value || 'stack' in value)
  );
}

/**
 * Build the OTel attribute payload for an evlog wide event. Pure — exported
 * for the unit test, called by the drain handler.
 */
export function evlogEventToAttributes(event: DrainContextLite['event']): {
  name: string;
  attributes: Attributes;
} {
  const tag = typeof event.tag === 'string' ? event.tag : null;
  const message = typeof event.message === 'string' ? event.message : null;
  const errorRaw = event.error;

  const attributes: Attributes = {};
  if (event.level) attributes['log.severity'] = String(event.level);
  if (message) attributes['log.message'] = truncate(message);
  if (tag) attributes['log.tag'] = tag;

  if (typeof errorRaw === 'string' && errorRaw.length > 0) {
    attributes['error.message'] = truncate(errorRaw);
  } else if (isErrorShape(errorRaw)) {
    if (errorRaw.name) attributes['error.type'] = errorRaw.name;
    if (errorRaw.message) attributes['error.message'] = truncate(errorRaw.message);
  }

  // Surface any extra business fields (e.g. ms, count) without recursion.
  for (const [key, value] of Object.entries(event)) {
    if (
      key === 'level' ||
      key === 'message' ||
      key === 'tag' ||
      key === 'error' ||
      key === 'timestamp' ||
      key === 'service' ||
      key === 'environment' ||
      key === 'version' ||
      key === 'commitHash' ||
      key === 'region'
    ) {
      continue;
    }
    if (value === null || value === undefined) continue;
    if (typeof value === 'object') {
      attributes[`log.${key}`] = truncate(value);
    } else {
      attributes[`log.${key}`] =
        typeof value === 'string' ? truncate(value) : (value as string | number | boolean);
    }
  }

  const name = tag ?? 'log';
  return { name, attributes };
}

/**
 * Drain handler: shape matches evlog's `evlog:drain` hook contract.
 * `(ctx: DrainContext) => void | Promise<void>`.
 */
export function bridgeDrainHandler(ctx: DrainContextLite): void {
  const span = trace.getActiveSpan();
  const { name, attributes } = evlogEventToAttributes(ctx.event);

  if (span) {
    span.addEvent(name, attributes);
    return;
  }

  // No active span — fall back to a structured stdout line so CLI scripts and
  // startup-time logs are still visible. evlog's own pretty-printer also
  // writes to console; this is a structured backup channel.
  const fallback = JSON.stringify({
    name,
    severity: attributes['log.severity'],
    message: attributes['log.message'],
    tag: attributes['log.tag'],
  });
  console.info(`[evlog-bridge] ${fallback}`);
}
