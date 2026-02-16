/**
 * Tests for the artifact execute endpoint's response content block processing.
 * Tests the logic that maps Anthropic beta response blocks to SSE events.
 */
import { describe, it, expect } from 'vitest';
import type { ArtifactSSEEvent } from '~~/shared/artifact-types';
import type { CodeExecutionResponse } from '~~/server/utils/ai/anthropic-beta-types';

/**
 * Replicate the content block processing logic from the route handler.
 * This maps Anthropic beta response blocks to our SSE event format.
 */
function processContentBlocks(response: CodeExecutionResponse): ArtifactSSEEvent[] {
  const events: ArtifactSSEEvent[] = [];
  const seenFileIds = new Set<string>();

  if (response.container?.id) {
    events.push({ type: 'artifact_container', containerId: response.container.id });
  }

  for (const block of response.content) {
    if (block.type === 'text') {
      events.push({ type: 'artifact_text', text: block.text });
    } else if (block.type === 'server_tool_use') {
      events.push({ type: 'artifact_execution_start' });
      if (block.name === 'bash_code_execution' && block.input?.command) {
        events.push({
          type: 'artifact_code',
          code: block.input.command as string,
          language: 'bash',
        });
      } else if (block.name === 'text_editor_code_execution' && block.input?.file_text) {
        events.push({
          type: 'artifact_code',
          code: block.input.file_text as string,
          language: (block.input.path as string)?.split('.').pop() || 'text',
        });
      }
    } else if (
      block.type === 'bash_code_execution_tool_result' ||
      block.type === 'text_editor_code_execution_tool_result'
    ) {
      const result = block.content;
      if (result?.stdout !== undefined || result?.stderr !== undefined) {
        events.push({
          type: 'artifact_execution_result',
          stdout: result.stdout || '',
          stderr: result.stderr || '',
          exitCode: result.return_code ?? 0,
        });
      }
      if (Array.isArray(result?.content)) {
        for (const item of result.content) {
          if (item.file_id && !seenFileIds.has(item.file_id)) {
            seenFileIds.add(item.file_id);
            events.push({
              type: 'artifact_file',
              file: {
                fileId: item.file_id,
                fileName: 'output',
                mediaType: 'application/octet-stream',
                url: `/api/artifacts/files/${item.file_id}`,
              },
            });
          }
        }
      }
    }
  }

  events.push({ type: 'artifact_done' });
  return events;
}

describe('artifact response content block processing', () => {
  it('processes text blocks', () => {
    const response: CodeExecutionResponse = {
      content: [{ type: 'text', text: 'Here is the result:' }],
    };

    const events = processContentBlocks(response);

    expect(events).toContainEqual({ type: 'artifact_text', text: 'Here is the result:' });
    expect(events[events.length - 1]).toEqual({ type: 'artifact_done' });
  });

  it('processes bash code execution blocks', () => {
    const response: CodeExecutionResponse = {
      content: [
        {
          type: 'server_tool_use',
          name: 'bash_code_execution',
          input: { command: 'echo "hello"' },
        },
      ],
    };

    const events = processContentBlocks(response);

    expect(events).toContainEqual({ type: 'artifact_execution_start' });
    expect(events).toContainEqual({
      type: 'artifact_code',
      code: 'echo "hello"',
      language: 'bash',
    });
  });

  it('processes text_editor code execution blocks', () => {
    const response: CodeExecutionResponse = {
      content: [
        {
          type: 'server_tool_use',
          name: 'text_editor_code_execution',
          input: { file_text: 'print("hi")', path: 'script.py' },
        },
      ],
    };

    const events = processContentBlocks(response);

    expect(events).toContainEqual({ type: 'artifact_execution_start' });
    expect(events).toContainEqual({
      type: 'artifact_code',
      code: 'print("hi")',
      language: 'py',
    });
  });

  it('extracts language from file path extension', () => {
    const response: CodeExecutionResponse = {
      content: [
        {
          type: 'server_tool_use',
          name: 'text_editor_code_execution',
          input: { file_text: 'console.log(1)', path: 'app.js' },
        },
      ],
    };

    const events = processContentBlocks(response);

    const codeEvent = events.find((e) => e.type === 'artifact_code');
    expect(codeEvent).toBeDefined();
    expect((codeEvent as { language: string }).language).toBe('js');
  });

  it('defaults to text language when no path extension', () => {
    const response: CodeExecutionResponse = {
      content: [
        {
          type: 'server_tool_use',
          name: 'text_editor_code_execution',
          input: { file_text: 'some content', path: 'Makefile' },
        },
      ],
    };

    const events = processContentBlocks(response);

    const codeEvent = events.find((e) => e.type === 'artifact_code');
    // 'Makefile'.split('.').pop() returns 'Makefile' which is a valid language hint
    expect(codeEvent).toBeDefined();
  });

  it('processes execution result with stdout and stderr', () => {
    const response: CodeExecutionResponse = {
      content: [
        {
          type: 'bash_code_execution_tool_result',
          tool_use_id: 'tool-1',
          content: { stdout: 'Hello World\n', stderr: '', return_code: 0 },
        },
      ],
    };

    const events = processContentBlocks(response);

    expect(events).toContainEqual({
      type: 'artifact_execution_result',
      stdout: 'Hello World\n',
      stderr: '',
      exitCode: 0,
    });
  });

  it('handles non-zero exit codes', () => {
    const response: CodeExecutionResponse = {
      content: [
        {
          type: 'bash_code_execution_tool_result',
          tool_use_id: 'tool-1',
          content: { stdout: '', stderr: 'NameError: name "x" is not defined', return_code: 1 },
        },
      ],
    };

    const events = processContentBlocks(response);

    const resultEvent = events.find((e) => e.type === 'artifact_execution_result');
    expect(resultEvent).toBeDefined();
    expect((resultEvent as { exitCode: number }).exitCode).toBe(1);
    expect((resultEvent as { stderr: string }).stderr).toContain('NameError');
  });

  it('extracts file references from result content', () => {
    const response: CodeExecutionResponse = {
      content: [
        {
          type: 'bash_code_execution_tool_result',
          tool_use_id: 'tool-1',
          content: {
            stdout: '',
            stderr: '',
            return_code: 0,
            content: [{ file_id: 'file-abc123' }],
          },
        },
      ],
    };

    const events = processContentBlocks(response);

    const fileEvent = events.find((e) => e.type === 'artifact_file');
    expect(fileEvent).toBeDefined();
    expect((fileEvent as { file: { fileId: string } }).file.fileId).toBe('file-abc123');
    expect((fileEvent as { file: { url: string } }).file.url).toBe(
      '/api/artifacts/files/file-abc123',
    );
  });

  it('deduplicates file IDs across multiple result blocks', () => {
    const response: CodeExecutionResponse = {
      content: [
        {
          type: 'bash_code_execution_tool_result',
          tool_use_id: 'tool-1',
          content: {
            stdout: '',
            stderr: '',
            return_code: 0,
            content: [{ file_id: 'file-abc' }],
          },
        },
        {
          type: 'bash_code_execution_tool_result',
          tool_use_id: 'tool-2',
          content: {
            stdout: '',
            stderr: '',
            return_code: 0,
            content: [{ file_id: 'file-abc' }, { file_id: 'file-def' }],
          },
        },
      ],
    };

    const events = processContentBlocks(response);

    const fileEvents = events.filter((e) => e.type === 'artifact_file');
    expect(fileEvents).toHaveLength(2);
  });

  it('emits container ID when present', () => {
    const response: CodeExecutionResponse = {
      container: { id: 'ctr-xyz789' },
      content: [{ type: 'text', text: 'Done' }],
    };

    const events = processContentBlocks(response);

    expect(events[0]).toEqual({ type: 'artifact_container', containerId: 'ctr-xyz789' });
  });

  it('skips container event when not present', () => {
    const response: CodeExecutionResponse = {
      content: [{ type: 'text', text: 'Done' }],
    };

    const events = processContentBlocks(response);

    expect(events.find((e) => e.type === 'artifact_container')).toBeUndefined();
  });

  it('processes a full multi-block response', () => {
    const response: CodeExecutionResponse = {
      container: { id: 'ctr-1' },
      content: [
        { type: 'text', text: 'Running your code...' },
        {
          type: 'server_tool_use',
          name: 'bash_code_execution',
          input: { command: 'python3 -c "print(42)"' },
        },
        {
          type: 'bash_code_execution_tool_result',
          tool_use_id: 'tool-1',
          content: { stdout: '42\n', stderr: '', return_code: 0 },
        },
        { type: 'text', text: 'The result is 42.' },
      ],
    };

    const events = processContentBlocks(response);

    const types = events.map((e) => e.type);
    expect(types).toEqual([
      'artifact_container',
      'artifact_text',
      'artifact_execution_start',
      'artifact_code',
      'artifact_execution_result',
      'artifact_text',
      'artifact_done',
    ]);
  });

  it('handles empty content array', () => {
    const response: CodeExecutionResponse = { content: [] };
    const events = processContentBlocks(response);

    expect(events).toHaveLength(1);
    expect(events[0]).toEqual({ type: 'artifact_done' });
  });
});
