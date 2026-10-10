/**
 * Unit tests for evlog → span event bridge.
 */

import { describe, expect, it, vi, beforeEach } from 'vitest';
import { trace } from '@opentelemetry/api';
import {
  BasicTracerProvider,
  InMemorySpanExporter,
  SimpleSpanProcessor,
} from '@opentelemetry/sdk-trace-base';
import { bridgeDrainHandler, evlogEventToAttributes, truncate } from './evlog-bridge';

describe('truncate', () => {
  it('returns the input unchanged when under the cap', () => {
    expect(truncate('hello')).toBe('hello');
  });

  it('cuts strings longer than the cap', () => {
    expect(truncate('x'.repeat(2500))).toHaveLength(2000);
  });

  it('honors a custom cap', () => {
    expect(truncate('hello', 3)).toBe('hel');
  });
});

describe('evlogEventToAttributes', () => {
  it('extracts severity, message, and tag from a tagged log', () => {
    const result = evlogEventToAttributes({
      level: 'info',
      tag: 'chat',
      message: 'streaming start',
    });

    expect(result.name).toBe('chat');
    expect(result.attributes['log.severity']).toBe('info');
    expect(result.attributes['log.message']).toBe('streaming start');
    expect(result.attributes['log.tag']).toBe('chat');
  });

  it('uses "log" as event name when no tag is present', () => {
    const result = evlogEventToAttributes({
      level: 'info',
      message: 'untagged message',
    });

    expect(result.name).toBe('log');
  });

  it('captures error.type and error.message from an Error-shaped value', () => {
    const result = evlogEventToAttributes({
      level: 'error',
      tag: 'rag',
      message: 'embedding failed',
      error: { name: 'BedrockError', message: 'throttled' },
    });

    expect(result.attributes['error.type']).toBe('BedrockError');
    expect(result.attributes['error.message']).toBe('throttled');
  });

  it('captures string error directly under error.message', () => {
    const result = evlogEventToAttributes({
      level: 'error',
      tag: 'auth',
      message: 'oauth flow failed',
      error: 'state mismatch',
    });

    expect(result.attributes['error.message']).toBe('state mismatch');
    expect(result.attributes['error.type']).toBeUndefined();
  });

  it('truncates oversized log.message to 2000 chars', () => {
    const result = evlogEventToAttributes({
      level: 'info',
      tag: 'chat',
      message: 'x'.repeat(5000),
    });

    expect(result.attributes['log.message']).toHaveLength(2000);
  });

  it('forwards extra business fields as log.* attrs without recursion', () => {
    const result = evlogEventToAttributes({
      level: 'info',
      tag: 'mcp-aviation',
      message: 'prewarm complete',
      ms: 1234,
      skipped: false,
    });

    expect(result.attributes['log.ms']).toBe(1234);
    expect(result.attributes['log.skipped']).toBe(false);
  });

  it('JSON-stringifies object-valued extra fields', () => {
    const result = evlogEventToAttributes({
      level: 'info',
      message: 'with payload',
      payload: { a: 1 },
      list: [1, 2],
    });

    expect(result.attributes['log.payload']).toBe('{"a":1}');
    expect(result.attributes['log.list']).toBe('[1,2]');
  });

  it('strips evlog internal fields (timestamp, service, environment, etc.) from extras', () => {
    const result = evlogEventToAttributes({
      level: 'info',
      tag: 'chat',
      message: 'msg',
      timestamp: '2026-04-26T10:00:00Z',
      service: 'blog',
      environment: 'development',
      version: '0.1.0',
      commitHash: 'abc',
      region: 'us-central1',
    });

    expect(result.attributes['log.timestamp']).toBeUndefined();
    expect(result.attributes['log.service']).toBeUndefined();
    expect(result.attributes['log.environment']).toBeUndefined();
    expect(result.attributes['log.version']).toBeUndefined();
  });
});

describe('bridgeDrainHandler', () => {
  let consoleSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleSpy = vi.spyOn(console, 'info').mockImplementation(() => undefined);
  });

  it('calls span.addEvent when an active span is present', () => {
    const exporter = new InMemorySpanExporter();

    const provider = new BasicTracerProvider({
      spanProcessors: [new SimpleSpanProcessor(exporter)],
    });

    const span = provider.getTracer('test').startSpan('drain');
    const getActiveSpan = vi.spyOn(trace, 'getActiveSpan').mockReturnValue(span);
    bridgeDrainHandler({
      event: { level: 'info', tag: 'chat', message: 'streaming start' },
    });
    span.end();
    const events = exporter.getFinishedSpans()[0]!.events;
    expect(events).toHaveLength(1);
    expect(events[0]).toMatchObject({ name: 'chat', attributes: { 'log.severity': 'info' } });
    expect(consoleSpy).not.toHaveBeenCalled();
    getActiveSpan.mockRestore();
  });

  it('falls back to stdout when no active span is present', () => {
    const getActiveSpan = vi.spyOn(trace, 'getActiveSpan').mockReturnValue(undefined);
    bridgeDrainHandler({
      event: { level: 'warn', tag: 'mcp', message: 'hot' },
    });
    expect(consoleSpy).toHaveBeenCalledTimes(1);
    expect(consoleSpy.mock.calls[0][0]).toContain('mcp');
    expect(consoleSpy.mock.calls[0][0]).toContain('warn');
    getActiveSpan.mockRestore();
  });
});
