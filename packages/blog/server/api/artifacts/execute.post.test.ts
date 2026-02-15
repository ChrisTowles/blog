/**
 * Tests for the artifact sendSSE helper and SSE format.
 * Pattern follows stream-adapter.test.ts.
 */
import { describe, it, expect } from 'vitest';
import type { ArtifactSSEEvent } from '~~/shared/artifact-types';

/**
 * Inline sendSSE for unit testing (same logic as the route handler).
 * We test the encoding format rather than importing from the route file
 * because Nitro route handlers aren't directly importable.
 */
const encoder = new TextEncoder();

function sendSSE(controller: ReadableStreamDefaultController, event: ArtifactSSEEvent) {
  controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));
}

function createMockController() {
  const chunks: Uint8Array[] = [];
  return {
    controller: {
      enqueue: (chunk: Uint8Array) => chunks.push(chunk),
    } as unknown as ReadableStreamDefaultController,
    chunks,
    decode: () => new TextDecoder().decode(chunks[0]),
  };
}

describe('artifact execute.post sendSSE', () => {
  it('should format text events as SSE', () => {
    const { controller, decode } = createMockController();

    sendSSE(controller, { type: 'artifact_text', text: 'Hello from container' });

    const result = decode();
    expect(result).toBe('data: {"type":"artifact_text","text":"Hello from container"}\n\n');
  });

  it('should format code events with language', () => {
    const { controller, decode } = createMockController();

    sendSSE(controller, { type: 'artifact_code', code: 'print("hi")', language: 'python' });

    const result = decode();
    expect(result).toContain('"type":"artifact_code"');
    expect(result).toContain('"code":"print(\\"hi\\")"');
    expect(result).toContain('"language":"python"');
  });

  it('should format execution result events', () => {
    const { controller, decode } = createMockController();

    sendSSE(controller, {
      type: 'artifact_execution_result',
      stdout: 'output line',
      stderr: '',
      exitCode: 0,
    });

    const result = decode();
    expect(result).toContain('"type":"artifact_execution_result"');
    expect(result).toContain('"stdout":"output line"');
    expect(result).toContain('"exitCode":0');
  });

  it('should format file events', () => {
    const { controller, decode } = createMockController();

    sendSSE(controller, {
      type: 'artifact_file',
      file: {
        fileId: 'file-123',
        fileName: 'chart.png',
        mediaType: 'image/png',
        url: '/api/artifacts/files/file-123',
      },
    });

    const result = decode();
    expect(result).toContain('"type":"artifact_file"');
    expect(result).toContain('"fileId":"file-123"');
    expect(result).toContain('"fileName":"chart.png"');
  });

  it('should format container events', () => {
    const { controller, decode } = createMockController();

    sendSSE(controller, { type: 'artifact_container', containerId: 'ctr-abc' });

    const result = decode();
    expect(result).toBe('data: {"type":"artifact_container","containerId":"ctr-abc"}\n\n');
  });

  it('should format error events', () => {
    const { controller, decode } = createMockController();

    sendSSE(controller, { type: 'artifact_error', error: 'Container expired' });

    const result = decode();
    expect(result).toBe('data: {"type":"artifact_error","error":"Container expired"}\n\n');
  });

  it('should format done events', () => {
    const { controller, decode } = createMockController();

    sendSSE(controller, { type: 'artifact_done' });

    const result = decode();
    expect(result).toBe('data: {"type":"artifact_done"}\n\n');
  });

  it('should handle special characters in text', () => {
    const { controller, decode } = createMockController();

    sendSSE(controller, { type: 'artifact_text', text: 'Line 1\nLine 2\t"quoted"' });

    const result = decode();
    const parsed = JSON.parse(result.replace('data: ', '').trim());
    expect(parsed.text).toBe('Line 1\nLine 2\t"quoted"');
  });
});
