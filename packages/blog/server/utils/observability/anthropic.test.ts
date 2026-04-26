/**
 * Unit tests for the Anthropic span wrappers — verifies semconv attribute
 * shaping (especially the input-tokens sum-with-cache rule) and stream
 * lifecycle handling.
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { trace, SpanStatusCode, type Span, type Tracer } from '@opentelemetry/api';
import { applyUsageAttrs, withAnthropicSpan, withAnthropicStreamSpan } from './anthropic';

interface FakeSpan {
  attrs: Record<string, unknown>;
  ended: boolean;
  status?: { code: SpanStatusCode; message?: string };
  exceptions: unknown[];
}

// Construct a stand-in for `Span` that the wrappers can call against. We
// `as unknown as Span` it at the boundary so the spy plumbing doesn't have
// to satisfy the full `Span` interface (`addLink`, time-input overloads, …).
function makeFakeSpan(): FakeSpan & Span {
  const attrs: Record<string, unknown> = {};
  const exceptions: unknown[] = [];
  const fake = {
    attrs,
    ended: false as boolean,
    exceptions,
    status: undefined as { code: SpanStatusCode; message?: string } | undefined,
    setAttribute(key: string, value: unknown) {
      attrs[key] = value;
      return this;
    },
    setAttributes(values: Record<string, unknown>) {
      Object.assign(attrs, values);
      return this;
    },
    setStatus(status: { code: SpanStatusCode; message?: string }) {
      this.status = status;
      return this;
    },
    recordException(err: unknown) {
      exceptions.push(err);
    },
    end() {
      this.ended = true;
    },
    addEvent() {
      return this;
    },
    isRecording() {
      return true;
    },
    spanContext() {
      return { traceId: 'x', spanId: 'y', traceFlags: 1 };
    },
    updateName() {
      return this;
    },
  };
  return fake as unknown as FakeSpan & Span;
}

function makeFakeTracer(span: Span): Tracer {
  return {
    startSpan: vi.fn(() => span),
    startActiveSpan: vi.fn(
      // Simpler signature is enough for tests.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (...args: any[]) => {
        const fn = args[args.length - 1];
        return fn(span);
      },
    ),
  } as unknown as Tracer;
}

let fakeSpan: FakeSpan & Span;
let getTracerSpy: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
  fakeSpan = makeFakeSpan();
  getTracerSpy = vi.spyOn(trace, 'getTracer').mockReturnValue(makeFakeTracer(fakeSpan));
});

afterEach(() => {
  getTracerSpy.mockRestore();
  delete process.env.OTEL_GENAI_CAPTURE_CONTENT;
});

describe('applyUsageAttrs', () => {
  it('sums input_tokens with cache fields per Anthropic spec note', () => {
    applyUsageAttrs(fakeSpan, {
      input_tokens: 10,
      cache_read_input_tokens: 100,
      cache_creation_input_tokens: 5,
      output_tokens: 50,
    });
    expect(fakeSpan.attrs['gen_ai.usage.input_tokens']).toBe(115);
    expect(fakeSpan.attrs['gen_ai.usage.cache_read.input_tokens']).toBe(100);
    expect(fakeSpan.attrs['gen_ai.usage.cache_creation.input_tokens']).toBe(5);
    expect(fakeSpan.attrs['gen_ai.usage.output_tokens']).toBe(50);
  });

  it('skips usage attrs when usage is undefined', () => {
    applyUsageAttrs(fakeSpan, undefined);
    expect(fakeSpan.attrs).toEqual({});
  });

  it('omits cache breakdowns when those fields are missing', () => {
    applyUsageAttrs(fakeSpan, { input_tokens: 20, output_tokens: 30 });
    expect(fakeSpan.attrs['gen_ai.usage.input_tokens']).toBe(20);
    expect(fakeSpan.attrs['gen_ai.usage.cache_read.input_tokens']).toBeUndefined();
    expect(fakeSpan.attrs['gen_ai.usage.cache_creation.input_tokens']).toBeUndefined();
  });
});

describe('withAnthropicSpan (non-streaming)', () => {
  it('sets request attrs, response attrs, and ends the span on success', async () => {
    const result = await withAnthropicSpan(
      'chat',
      'claude-haiku-4-5-20251001',
      async () => ({
        model: 'claude-haiku-4-5-20251001',
        stop_reason: 'end_turn',
        usage: {
          input_tokens: 10,
          cache_read_input_tokens: 100,
          cache_creation_input_tokens: 5,
          output_tokens: 50,
        },
      }),
      { max_tokens: 50, temperature: 0.7, attributes: { 'chat.id': 'abc' } },
    );

    expect(result.stop_reason).toBe('end_turn');
    expect(fakeSpan.attrs['gen_ai.provider.name']).toBe('anthropic');
    expect(fakeSpan.attrs['gen_ai.operation.name']).toBe('chat');
    expect(fakeSpan.attrs['gen_ai.request.model']).toBe('claude-haiku-4-5-20251001');
    expect(fakeSpan.attrs['gen_ai.request.temperature']).toBe(0.7);
    expect(fakeSpan.attrs['gen_ai.request.max_tokens']).toBe(50);
    expect(fakeSpan.attrs['gen_ai.response.model']).toBe('claude-haiku-4-5-20251001');
    expect(fakeSpan.attrs['gen_ai.response.finish_reasons']).toEqual(['end_turn']);
    expect(fakeSpan.attrs['gen_ai.usage.input_tokens']).toBe(115);
    expect(fakeSpan.attrs['chat.id']).toBe('abc');
    expect(fakeSpan.ended).toBe(true);
  });

  it('records exception and re-throws on Anthropic error', async () => {
    const apiError = Object.assign(new Error('rate limited'), { name: 'RateLimitError' });
    await expect(
      withAnthropicSpan('chat', 'claude-sonnet-4', async () => {
        throw apiError;
      }),
    ).rejects.toThrow('rate limited');

    expect(fakeSpan.attrs['error.type']).toBe('RateLimitError');
    expect(fakeSpan.status?.code).toBe(SpanStatusCode.ERROR);
    expect(fakeSpan.exceptions).toContain(apiError);
    expect(fakeSpan.ended).toBe(true);
  });

  it('overrides provider for non-Anthropic LLMs', async () => {
    await withAnthropicSpan(
      'chat',
      'gemini-2.5-flash-image',
      async () => ({ model: 'gemini-2.5-flash-image', stop_reason: null, usage: undefined }),
      { provider: 'google.gemini' },
    );
    expect(fakeSpan.attrs['gen_ai.provider.name']).toBe('google.gemini');
  });

  it('captures content only when OTEL_GENAI_CAPTURE_CONTENT=1', async () => {
    // Capture disabled — no content attrs.
    delete process.env.OTEL_GENAI_CAPTURE_CONTENT;
    const { captureContentIfEnabled } = await import('./anthropic');
    captureContentIfEnabled(fakeSpan, 'prompt', 'hello world');
    expect(fakeSpan.attrs['gen_ai.prompt.0.content']).toBeUndefined();

    // Enabled — content attached and truncation flag set when oversized.
    process.env.OTEL_GENAI_CAPTURE_CONTENT = '1';
    captureContentIfEnabled(fakeSpan, 'prompt', 'x'.repeat(5000));
    expect((fakeSpan.attrs['gen_ai.prompt.0.content'] as string).length).toBe(3500);
    expect(fakeSpan.attrs['gen_ai.prompt.0.truncated']).toBe(true);
  });
});

describe('withAnthropicStreamSpan', () => {
  function makeFakeStream() {
    const listeners: Record<string, ((arg?: unknown) => void)[]> = {};
    return {
      on(event: string, listener: (arg?: unknown) => void) {
        (listeners[event] ??= []).push(listener);
        return this;
      },
      [Symbol.asyncIterator]: async function* () {
        // Test doesn't iterate.
      },
      emit(event: string, arg?: unknown) {
        (listeners[event] ?? []).forEach((l) => l(arg));
      },
    };
  }

  it('returns the original stream and ends span on finalMessage', () => {
    const stream = makeFakeStream();
    const result = withAnthropicStreamSpan('chat', 'claude-opus-4-7', () => stream as never);
    expect(result).toBe(stream);

    stream.emit('finalMessage', {
      model: 'claude-opus-4-7',
      stop_reason: 'end_turn',
      usage: { input_tokens: 5, output_tokens: 10 },
    });
    expect(fakeSpan.attrs['gen_ai.response.finish_reasons']).toEqual(['end_turn']);
    expect(fakeSpan.attrs['gen_ai.usage.input_tokens']).toBe(5);
    expect(fakeSpan.ended).toBe(true);
  });

  it('records error and ends span on stream error', () => {
    const stream = makeFakeStream();
    withAnthropicStreamSpan('chat', 'claude-opus-4-7', () => stream as never);
    const apiError = Object.assign(new Error('overloaded'), { name: 'OverloadedError' });
    stream.emit('error', apiError);
    expect(fakeSpan.attrs['error.type']).toBe('OverloadedError');
    expect(fakeSpan.status?.code).toBe(SpanStatusCode.ERROR);
    expect(fakeSpan.ended).toBe(true);
  });

  it('finishes (without error) on stream end if neither finalMessage nor error fired', () => {
    const stream = makeFakeStream();
    withAnthropicStreamSpan('chat', 'claude-opus-4-7', () => stream as never);
    stream.emit('end');
    expect(fakeSpan.ended).toBe(true);
    expect(fakeSpan.status?.code).toBeUndefined();
  });

  it('does not double-end when end fires after finalMessage', () => {
    const stream = makeFakeStream();
    withAnthropicStreamSpan('chat', 'claude-opus-4-7', () => stream as never);
    stream.emit('finalMessage', { model: 'claude-opus-4-7', stop_reason: 'end_turn' });
    expect(fakeSpan.ended).toBe(true);

    // Re-end should be guarded by the wrapper's `ended` flag (we count
    // by ensuring no exception thrown when end fires after finalMessage).
    expect(() => stream.emit('end')).not.toThrow();
  });

  it('records exception when factory throws synchronously', () => {
    const boom = Object.assign(new Error('bad request'), { name: 'BadRequestError' });
    expect(() =>
      withAnthropicStreamSpan('chat', 'claude-opus-4-7', () => {
        throw boom;
      }),
    ).toThrow('bad request');
    expect(fakeSpan.attrs['error.type']).toBe('BadRequestError');
    expect(fakeSpan.ended).toBe(true);
  });

  it('throws StreamShapeError when stream lacks .on emitter', () => {
    // Catches SDK shape regressions — silent close would mask the bug.
    expect(() => withAnthropicStreamSpan('chat', 'claude-opus-4-7', () => ({}) as never)).toThrow(
      /lacks \.on emitter/,
    );
    expect(fakeSpan.attrs['error.type']).toBe('StreamShapeError');
    expect(fakeSpan.ended).toBe(true);
  });
});
