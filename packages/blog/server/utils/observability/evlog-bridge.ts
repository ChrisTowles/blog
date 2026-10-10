/**
 * evlog → OTel span event bridge. Routes drain entries into
 * `span.addEvent(...)` when a span is active; stdout fallback for CLI
 * scripts and startup logs.
 *
 * NR caps OTLP attribute strings at 4095 chars; we truncate to 2000 to
 * leave headroom for combined attribute payloads.
 */

import { trace, type Attributes } from '@opentelemetry/api';
import { z } from 'zod';

const MAX_ATTR_LEN = 2000;

const evlogEventSchema = z.looseObject({
  level: z.string().optional().catch(undefined),
  tag: z.string().optional().catch(undefined),
  message: z.string().optional().catch(undefined),
  error: z
    .union([
      z
        .string()
        .min(1)
        .transform((message) => ({ name: undefined, message })),
      z.looseObject({
        name: z.string().optional().catch(undefined),
        message: z.string().optional().catch(undefined),
      }),
    ])
    .optional()
    .catch(undefined),
});

const attributeScalarSchema = z.union([
  z.string().transform((value) => truncate(value)),
  z.number(),
  z.boolean(),
]);

const attributeObjectSchema = z.union([z.array(z.unknown()), z.looseObject({})]);

type EvlogEvent = z.input<typeof evlogEventSchema>;

interface DrainContextLite {
  event: EvlogEvent;
}

const EVLOG_INTERNAL_KEYS: ReadonlySet<string> = new Set([
  'level',
  'message',
  'tag',
  'error',
  'timestamp',
  'service',
  'environment',
  'version',
  'commitHash',
  'region',
]);

export function truncate(value: string, max = MAX_ATTR_LEN): string {
  if (value.length <= max) return value;

  return value.slice(0, max);
}

interface EvlogSpanEvent {
  name: string;
  attributes: Attributes;
}

/**
 * Build the OTel attribute payload for an evlog wide event. Pure — exported
 * for the unit test, called by the drain handler.
 */
export function evlogEventToAttributes(event: EvlogEvent): EvlogSpanEvent {
  const { level, tag, message, error } = evlogEventSchema.parse(event);

  const attributes: Attributes = {};

  if (level) attributes['log.severity'] = level;

  if (message) attributes['log.message'] = truncate(message);

  if (tag) attributes['log.tag'] = tag;

  if (error?.name) attributes['error.type'] = error.name;

  if (error?.message) attributes['error.message'] = truncate(error.message);

  // Surface any extra business fields (e.g. ms, count) without recursion.
  for (const [key, value] of Object.entries(event)) {
    if (EVLOG_INTERNAL_KEYS.has(key)) continue;

    const scalar = attributeScalarSchema.safeParse(value);

    if (scalar.success) {
      attributes[`log.${key}`] = scalar.data;
    } else if (attributeObjectSchema.safeParse(value).success) {
      attributes[`log.${key}`] = truncate(JSON.stringify(value));
    }
  }

  return { name: tag ?? 'log', attributes };
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
