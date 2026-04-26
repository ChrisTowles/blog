/**
 * OpenTelemetry span wrappers for Anthropic SDK calls.
 *
 * Implements the OTel GenAI semantic conventions for Anthropic
 * (`gen_ai.provider.name = "anthropic"`, span name `${op} ${model}`,
 * input-token sum across cache fields per the Anthropic spec note).
 *
 * Two helpers:
 *   - `withAnthropicSpan`        — non-streaming `.messages.create()` etc.
 *   - `withAnthropicStreamSpan`  — `.beta.messages.stream()` and friends;
 *                                  span lifetime ties to stream's
 *                                  `finalMessage` / `error` / `end` events.
 *
 * Why two wrappers: the non-streaming case can use `try/finally` in an async
 * function, but a stream's lifetime extends beyond the synchronous return
 * (the caller iterates events; `finalMessage()` resolves later). Trying to
 * unify them in one helper turns the call sites into a state machine.
 *
 * Content capture (prompts/completions on spans) is opt-in via
 * `OTEL_GENAI_CAPTURE_CONTENT=1`. Off by default to avoid PII drift and the
 * 4095-char attribute cap on the New Relic side.
 */

import { SpanKind, SpanStatusCode, trace, type Span, type Tracer } from '@opentelemetry/api';

const TRACER_NAME = 'blog.observability.anthropic';

function getTracer(): Tracer {
  return trace.getTracer(TRACER_NAME);
}

const ATTR_GEN_AI_PROVIDER_NAME = 'gen_ai.provider.name';
const ATTR_GEN_AI_OPERATION_NAME = 'gen_ai.operation.name';
const ATTR_GEN_AI_REQUEST_MODEL = 'gen_ai.request.model';
const ATTR_GEN_AI_REQUEST_TEMPERATURE = 'gen_ai.request.temperature';
const ATTR_GEN_AI_REQUEST_MAX_TOKENS = 'gen_ai.request.max_tokens';
const ATTR_GEN_AI_RESPONSE_MODEL = 'gen_ai.response.model';
const ATTR_GEN_AI_RESPONSE_FINISH_REASONS = 'gen_ai.response.finish_reasons';
const ATTR_GEN_AI_USAGE_INPUT_TOKENS = 'gen_ai.usage.input_tokens';
const ATTR_GEN_AI_USAGE_OUTPUT_TOKENS = 'gen_ai.usage.output_tokens';
const ATTR_GEN_AI_USAGE_CACHE_READ_INPUT_TOKENS = 'gen_ai.usage.cache_read.input_tokens';
const ATTR_GEN_AI_USAGE_CACHE_CREATION_INPUT_TOKENS = 'gen_ai.usage.cache_creation.input_tokens';
const ATTR_ERROR_TYPE = 'error.type';

const MAX_CONTENT_LEN = 3500;

export interface AnthropicSpanOptions {
  /** Maps to `gen_ai.request.temperature`. */
  temperature?: number;
  /** Maps to `gen_ai.request.max_tokens`. */
  max_tokens?: number;
  /** Optional extra attributes (e.g. `chat.id`, `tool.name`). */
  attributes?: Record<string, string | number | boolean>;
  /** Provider override — defaults to `"anthropic"`. */
  provider?: string;
}

interface AnthropicUsage {
  input_tokens?: number | null;
  output_tokens?: number | null;
  cache_read_input_tokens?: number | null;
  cache_creation_input_tokens?: number | null;
}

interface AnthropicMessageLike {
  model?: string;
  stop_reason?: string | null;
  usage?: AnthropicUsage | null;
}

/**
 * Permissive structural shape for the SDK's stream emitter. We attach by
 * duck-typing rather than constraining the generic so that
 * `BetaStreamResponse` (hand-rolled in `anthropic-beta-types.ts`) and
 * `MessageStream<null>` (real SDK type) both flow through the wrapper
 * without narrowing.
 */
interface StreamEmitterLike {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  on?: (event: string, listener: (arg?: any) => void) => unknown;
}

function shouldCaptureContent(): boolean {
  return process.env.OTEL_GENAI_CAPTURE_CONTENT === '1';
}

export function captureContentIfEnabled(
  span: Span,
  kind: 'prompt' | 'completion',
  text: string,
): void {
  if (!shouldCaptureContent()) return;
  const truncated = text.length > MAX_CONTENT_LEN;
  span.setAttribute(`gen_ai.${kind}.0.content`, text.slice(0, MAX_CONTENT_LEN));
  if (truncated) span.setAttribute(`gen_ai.${kind}.0.truncated`, true);
}

function applyRequestAttrs(
  span: Span,
  operation: string,
  model: string,
  opts?: AnthropicSpanOptions,
): void {
  span.setAttribute(ATTR_GEN_AI_PROVIDER_NAME, opts?.provider ?? 'anthropic');
  span.setAttribute(ATTR_GEN_AI_OPERATION_NAME, operation);
  span.setAttribute(ATTR_GEN_AI_REQUEST_MODEL, model);
  if (opts?.temperature !== undefined) {
    span.setAttribute(ATTR_GEN_AI_REQUEST_TEMPERATURE, opts.temperature);
  }
  if (opts?.max_tokens !== undefined) {
    span.setAttribute(ATTR_GEN_AI_REQUEST_MAX_TOKENS, opts.max_tokens);
  }
  if (opts?.attributes) {
    for (const [k, v] of Object.entries(opts.attributes)) {
      span.setAttribute(k, v);
    }
  }
}

/**
 * Apply `gen_ai.usage.*` attributes per the Anthropic OTel GenAI spec note:
 * `gen_ai.usage.input_tokens` is the SUM of base input + cache reads + cache
 * creation. Cache fields are also emitted separately for breakdown queries.
 */
export function applyUsageAttrs(span: Span, usage?: AnthropicUsage | null): void {
  if (!usage) return;
  const baseInput = usage.input_tokens ?? 0;
  const cacheRead = usage.cache_read_input_tokens ?? 0;
  const cacheCreate = usage.cache_creation_input_tokens ?? 0;
  const totalInput = baseInput + cacheRead + cacheCreate;

  if (totalInput > 0) {
    span.setAttribute(ATTR_GEN_AI_USAGE_INPUT_TOKENS, totalInput);
  }
  if (usage.cache_read_input_tokens !== undefined) {
    span.setAttribute(ATTR_GEN_AI_USAGE_CACHE_READ_INPUT_TOKENS, cacheRead);
  }
  if (usage.cache_creation_input_tokens !== undefined) {
    span.setAttribute(ATTR_GEN_AI_USAGE_CACHE_CREATION_INPUT_TOKENS, cacheCreate);
  }
  if (usage.output_tokens !== undefined && usage.output_tokens !== null) {
    span.setAttribute(ATTR_GEN_AI_USAGE_OUTPUT_TOKENS, usage.output_tokens);
  }
}

function applyResponseAttrs(span: Span, message: AnthropicMessageLike): void {
  if (message.model) span.setAttribute(ATTR_GEN_AI_RESPONSE_MODEL, message.model);
  if (message.stop_reason) {
    span.setAttribute(ATTR_GEN_AI_RESPONSE_FINISH_REASONS, [message.stop_reason]);
  }
  applyUsageAttrs(span, message.usage);
}

function recordError(span: Span, err: unknown): void {
  const error = err instanceof Error ? err : new Error(String(err));
  span.recordException(error);
  span.setAttribute(ATTR_ERROR_TYPE, error.name || 'Error');
  span.setStatus({ code: SpanStatusCode.ERROR, message: error.message });
}

/**
 * Wrap a non-streaming Anthropic SDK call (e.g. `.messages.create()`).
 *
 * @example
 * const response = await withAnthropicSpan('chat', model, () =>
 *   client.messages.create({ model, max_tokens: 50, ... }),
 *   { max_tokens: 50, attributes: { 'chat.id': chatId } });
 */
export async function withAnthropicSpan<T extends AnthropicMessageLike | unknown>(
  operation: string,
  model: string,
  fn: () => Promise<T>,
  opts?: AnthropicSpanOptions,
): Promise<T> {
  const tracer = getTracer();
  return tracer.startActiveSpan(
    `${operation} ${model}`,
    { kind: SpanKind.CLIENT },
    async (span) => {
      applyRequestAttrs(span, operation, model, opts);
      try {
        const result = await fn();
        if (result && typeof result === 'object') {
          applyResponseAttrs(span, result as AnthropicMessageLike);
        }
        return result;
      } catch (err) {
        recordError(span, err);
        throw err;
      } finally {
        span.end();
      }
    },
  );
}

/**
 * Wrap a streaming Anthropic SDK call (e.g. `.beta.messages.stream()`).
 *
 * Returns the original stream unchanged. The wrapper attaches listeners so
 * the span ends when:
 *   - the stream emits `finalMessage` (success — usage extracted from final),
 *   - the stream emits `error` (span marked ERROR with `error.type`), or
 *   - the stream emits `end` without either of the above (e.g. client abort —
 *     span closes OK with no `finish_reasons`).
 *
 * Span lifetime therefore matches the stream lifetime, not the synchronous
 * return — critical for SSE chats where the response is open for many seconds.
 */
export function withAnthropicStreamSpan<T>(
  operation: string,
  model: string,
  factory: () => T,
  opts?: AnthropicSpanOptions,
): T {
  const tracer = getTracer();
  const span = tracer.startSpan(`${operation} ${model}`, { kind: SpanKind.CLIENT });
  applyRequestAttrs(span, operation, model, opts);

  let stream: T;
  try {
    stream = factory();
  } catch (err) {
    recordError(span, err);
    span.end();
    throw err;
  }

  let ended = false;
  const finish = () => {
    if (ended) return;
    ended = true;
    span.end();
  };

  // Duck-type listener attachment. Both Anthropic's hand-rolled
  // `BetaStreamResponse` and the SDK's real `MessageStream<T>` expose `.on`
  // at runtime; only the type declarations differ.
  const emitter = stream as unknown as StreamEmitterLike;
  if (typeof emitter.on === 'function') {
    emitter.on('finalMessage', (msg) => {
      applyResponseAttrs(span, msg as AnthropicMessageLike);
      finish();
    });
    emitter.on('error', (err) => {
      recordError(span, err);
      finish();
    });
    emitter.on('end', () => {
      // Fires after finalMessage/error in the happy paths — finish() is a no-op
      // then. If the stream ended without either (e.g. abort), close OK.
      finish();
    });
  } else {
    // No listener API → close span eagerly so it doesn't leak.
    finish();
  }

  return stream;
}
