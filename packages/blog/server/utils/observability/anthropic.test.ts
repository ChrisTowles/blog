/**
 * Unit tests for the Anthropic span wrappers — verifies semconv attribute
 * shaping (especially the input-tokens sum-with-cache rule) and stream
 * lifecycle handling.
 */

import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { EventEmitter } from 'node:events';
import { trace, SpanStatusCode } from '@opentelemetry/api';
import {
  BasicTracerProvider,
  InMemorySpanExporter,
  SimpleSpanProcessor,
} from '@opentelemetry/sdk-trace-base';
import {
  applyUsageAttrs,
  captureContentIfEnabled,
  withAnthropicSpan,
  withAnthropicStreamSpan,
} from './anthropic';

let exporter: InMemorySpanExporter;

beforeEach(() => {
  exporter = new InMemorySpanExporter();

  trace.setGlobalTracerProvider(
    new BasicTracerProvider({ spanProcessors: [new SimpleSpanProcessor(exporter)] }),
  );
});

afterEach(() => {
  trace.disable();
  delete process.env.OTEL_GENAI_CAPTURE_CONTENT;
});

function finishedSpan() {
  const [span] = exporter.getFinishedSpans();

  if (!span) throw new Error('no span ended');

  return span;
}

function startTestSpan() {
  return trace.getTracer('test').startSpan('test');
}

describe('applyUsageAttrs', () => {
  it('sums input_tokens with cache fields per Anthropic spec note', () => {
    const span = startTestSpan();

    applyUsageAttrs(span, {
      input_tokens: 10,
      cache_read_input_tokens: 100,
      cache_creation_input_tokens: 5,
      output_tokens: 50,
    });

    span.end();
    const attrs = finishedSpan().attributes;
    expect(attrs['gen_ai.usage.input_tokens']).toBe(115);
    expect(attrs['gen_ai.usage.cache_read.input_tokens']).toBe(100);
    expect(attrs['gen_ai.usage.cache_creation.input_tokens']).toBe(5);
    expect(attrs['gen_ai.usage.output_tokens']).toBe(50);
  });

  it('skips usage attrs when usage is undefined', () => {
    const span = startTestSpan();
    applyUsageAttrs(span, undefined);
    span.end();
    expect(finishedSpan().attributes).toEqual({});
  });

  it('omits cache breakdowns when those fields are missing', () => {
    const span = startTestSpan();
    applyUsageAttrs(span, { input_tokens: 20, output_tokens: 30 });
    span.end();
    const attrs = finishedSpan().attributes;
    expect(attrs['gen_ai.usage.input_tokens']).toBe(20);
    expect(attrs['gen_ai.usage.cache_read.input_tokens']).toBeUndefined();
    expect(attrs['gen_ai.usage.cache_creation.input_tokens']).toBeUndefined();
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
    expect(finishedSpan().attributes).toMatchObject({
      'gen_ai.provider.name': 'anthropic',
      'gen_ai.operation.name': 'chat',
      'gen_ai.request.model': 'claude-haiku-4-5-20251001',
      'gen_ai.request.temperature': 0.7,
      'gen_ai.request.max_tokens': 50,
      'gen_ai.response.model': 'claude-haiku-4-5-20251001',
      'gen_ai.response.finish_reasons': ['end_turn'],
      'gen_ai.usage.input_tokens': 115,
      'chat.id': 'abc',
    });
  });

  it('records exception and re-throws on Anthropic error', async () => {
    const apiError = Object.assign(new Error('rate limited'), { name: 'RateLimitError' });
    await expect(
      withAnthropicSpan('chat', 'claude-sonnet-4', async () => {
        throw apiError;
      }),
    ).rejects.toThrow('rate limited');

    const span = finishedSpan();
    expect(span.attributes['error.type']).toBe('RateLimitError');
    expect(span.status.code).toBe(SpanStatusCode.ERROR);
    expect(span.events.map((event) => event.name)).toContain('exception');
  });

  it('overrides provider for non-Anthropic LLMs', async () => {
    await withAnthropicSpan(
      'chat',
      'gemini-2.5-flash-image',
      async () => ({ model: 'gemini-2.5-flash-image', stop_reason: null, usage: undefined }),
      { provider: 'google.gemini' },
    );
    expect(finishedSpan().attributes['gen_ai.provider.name']).toBe('google.gemini');
  });

  it('captures content only when OTEL_GENAI_CAPTURE_CONTENT=1', () => {
    const span = startTestSpan();

    // Capture disabled — no content attrs.
    delete process.env.OTEL_GENAI_CAPTURE_CONTENT;
    captureContentIfEnabled(span, 'prompt', 'hello world');

    // Enabled — content attached and truncation flag set when oversized.
    process.env.OTEL_GENAI_CAPTURE_CONTENT = '1';
    captureContentIfEnabled(span, 'completion', 'x'.repeat(5000));
    span.end();

    const attrs = finishedSpan().attributes;
    expect(attrs['gen_ai.prompt.0.content']).toBeUndefined();
    expect(attrs['gen_ai.completion.0.content']).toHaveLength(3500);
    expect(attrs['gen_ai.completion.0.truncated']).toBe(true);
  });
});

describe('withAnthropicStreamSpan', () => {
  it('returns the original stream and ends span on finalMessage', () => {
    const stream = new EventEmitter();
    const result = withAnthropicStreamSpan('chat', 'claude-opus-4-7', () => stream);
    expect(result).toBe(stream);

    stream.emit('finalMessage', {
      model: 'claude-opus-4-7',
      stop_reason: 'end_turn',
      usage: { input_tokens: 5, output_tokens: 10 },
    });

    expect(finishedSpan().attributes).toMatchObject({
      'gen_ai.response.finish_reasons': ['end_turn'],
      'gen_ai.usage.input_tokens': 5,
    });
  });

  it('records error and ends span on stream error', () => {
    const stream = new EventEmitter();
    withAnthropicStreamSpan('chat', 'claude-opus-4-7', () => stream);
    const apiError = Object.assign(new Error('overloaded'), { name: 'OverloadedError' });
    stream.emit('error', apiError);
    const span = finishedSpan();
    expect(span.attributes['error.type']).toBe('OverloadedError');
    expect(span.status.code).toBe(SpanStatusCode.ERROR);
  });

  it('finishes (without error) on stream end if neither finalMessage nor error fired', () => {
    const stream = new EventEmitter();
    withAnthropicStreamSpan('chat', 'claude-opus-4-7', () => stream);
    stream.emit('end');
    expect(finishedSpan().status.code).toBe(SpanStatusCode.UNSET);
  });

  it('does not double-end when end fires after finalMessage', () => {
    const stream = new EventEmitter();
    withAnthropicStreamSpan('chat', 'claude-opus-4-7', () => stream);
    stream.emit('finalMessage', { model: 'claude-opus-4-7', stop_reason: 'end_turn' });
    stream.emit('end');
    expect(exporter.getFinishedSpans()).toHaveLength(1);
  });

  it('records exception when factory throws synchronously', () => {
    const boom = Object.assign(new Error('bad request'), { name: 'BadRequestError' });
    expect(() =>
      withAnthropicStreamSpan('chat', 'claude-opus-4-7', () => {
        throw boom;
      }),
    ).toThrow('bad request');
    expect(finishedSpan().attributes['error.type']).toBe('BadRequestError');
  });

  it('throws StreamShapeError when stream lacks .on emitter', () => {
    // Catches SDK shape regressions — silent close would mask the bug.
    expect(() => withAnthropicStreamSpan('chat', 'claude-opus-4-7', () => ({}))).toThrow(
      /lacks \.on emitter/,
    );
    expect(finishedSpan().attributes['error.type']).toBe('StreamShapeError');
  });
});
