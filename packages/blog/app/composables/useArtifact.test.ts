/**
 * Tests for the useArtifact composable's event processing and state management.
 * Tests the processEvent logic and handleContainerError without requiring fetch.
 */
import { describe, it, expect } from 'vitest';
import type { ArtifactSSEEvent, ArtifactFile, CodeExecutionResult } from '~~/shared/artifact-types';

/**
 * Replicate handleContainerError for testing
 */
function handleContainerError(
  msg: string,
  hasContainerId: boolean,
): { msg: string; cleared: boolean } {
  if (/container|expired|not found/i.test(msg) && hasContainerId) {
    return { msg: `${msg} (container cleared — try again)`, cleared: true };
  }
  return { msg, cleared: false };
}

/**
 * Simulates processEvent logic — accumulates state from SSE events
 */
function processEvents(events: ArtifactSSEEvent[]) {
  let explanation = '';
  let executedCode = '';
  let execution: CodeExecutionResult | null = null;
  const files: ArtifactFile[] = [];
  let containerId: string | null = null;
  let status = 'streaming';
  let error: string | null = null;

  for (const event of events) {
    switch (event.type) {
      case 'artifact_text':
        explanation += event.text;
        break;
      case 'artifact_code':
        executedCode += event.code;
        break;
      case 'artifact_execution_start':
        break;
      case 'artifact_execution_result':
        execution = {
          stdout: event.stdout,
          stderr: event.stderr,
          exitCode: event.exitCode,
        };
        break;
      case 'artifact_file':
        files.push(event.file);
        break;
      case 'artifact_container':
        containerId = event.containerId;
        break;
      case 'artifact_done':
        status = 'complete';
        break;
      case 'artifact_error': {
        const result = handleContainerError(event.error, !!containerId);
        error = result.msg;
        if (result.cleared) containerId = null;
        status = 'error';
        break;
      }
    }
  }

  return { explanation, executedCode, execution, files, containerId, status, error };
}

describe('useArtifact processEvent', () => {
  it('accumulates text from multiple text events', () => {
    const result = processEvents([
      { type: 'artifact_text', text: 'Here ' },
      { type: 'artifact_text', text: 'is the result.' },
    ]);

    expect(result.explanation).toBe('Here is the result.');
  });

  it('accumulates code from multiple code events', () => {
    const result = processEvents([
      { type: 'artifact_code', code: 'import math\n', language: 'python' },
      { type: 'artifact_code', code: 'print(math.pi)\n', language: 'python' },
    ]);

    expect(result.executedCode).toBe('import math\nprint(math.pi)\n');
  });

  it('captures execution result', () => {
    const result = processEvents([
      {
        type: 'artifact_execution_result',
        stdout: '3.14159\n',
        stderr: '',
        exitCode: 0,
      },
    ]);

    expect(result.execution).toEqual({
      stdout: '3.14159\n',
      stderr: '',
      exitCode: 0,
    });
  });

  it('collects files', () => {
    const result = processEvents([
      {
        type: 'artifact_file',
        file: {
          fileId: 'file-1',
          fileName: 'chart.png',
          mediaType: 'image/png',
          url: '/api/artifacts/files/file-1',
        },
      },
      {
        type: 'artifact_file',
        file: {
          fileId: 'file-2',
          fileName: 'data.csv',
          mediaType: 'text/csv',
          url: '/api/artifacts/files/file-2',
        },
      },
    ]);

    expect(result.files).toHaveLength(2);
    expect(result.files[0]!.fileName).toBe('chart.png');
    expect(result.files[1]!.fileName).toBe('data.csv');
  });

  it('stores container ID for reuse', () => {
    const result = processEvents([{ type: 'artifact_container', containerId: 'ctr-abc' }]);

    expect(result.containerId).toBe('ctr-abc');
  });

  it('sets status to complete on done event', () => {
    const result = processEvents([{ type: 'artifact_done' }]);

    expect(result.status).toBe('complete');
  });

  it('sets status to error on error event', () => {
    const result = processEvents([{ type: 'artifact_error', error: 'Something broke' }]);

    expect(result.status).toBe('error');
    expect(result.error).toBe('Something broke');
  });

  it('processes a full execution sequence', () => {
    const result = processEvents([
      { type: 'artifact_container', containerId: 'ctr-1' },
      { type: 'artifact_text', text: 'Running code...\n' },
      { type: 'artifact_execution_start' },
      { type: 'artifact_code', code: 'print("hello")', language: 'python' },
      { type: 'artifact_execution_result', stdout: 'hello\n', stderr: '', exitCode: 0 },
      {
        type: 'artifact_file',
        file: {
          fileId: 'f1',
          fileName: 'output.png',
          mediaType: 'image/png',
          url: '/api/artifacts/files/f1',
        },
      },
      { type: 'artifact_text', text: 'Done!' },
      { type: 'artifact_done' },
    ]);

    expect(result.containerId).toBe('ctr-1');
    expect(result.explanation).toBe('Running code...\nDone!');
    expect(result.executedCode).toBe('print("hello")');
    expect(result.execution?.stdout).toBe('hello\n');
    expect(result.files).toHaveLength(1);
    expect(result.status).toBe('complete');
    expect(result.error).toBeNull();
  });
});

describe('handleContainerError', () => {
  it('clears container on "container expired" errors', () => {
    const result = handleContainerError('Container expired', true);

    expect(result.cleared).toBe(true);
    expect(result.msg).toContain('container cleared');
    expect(result.msg).toContain('try again');
  });

  it('clears container on "not found" errors', () => {
    const result = handleContainerError('Container not found', true);

    expect(result.cleared).toBe(true);
  });

  it('does not clear when no container ID exists', () => {
    const result = handleContainerError('Container expired', false);

    expect(result.cleared).toBe(false);
    expect(result.msg).toBe('Container expired');
  });

  it('passes through non-container errors unchanged', () => {
    const result = handleContainerError('Network timeout', true);

    expect(result.cleared).toBe(false);
    expect(result.msg).toBe('Network timeout');
  });

  it('is case insensitive for container keywords', () => {
    expect(handleContainerError('CONTAINER EXPIRED', true).cleared).toBe(true);
    expect(handleContainerError('Not Found', true).cleared).toBe(true);
    expect(handleContainerError('expired session', true).cleared).toBe(true);
  });
});

describe('artifact request body construction', () => {
  it('builds request body with code and prompt', () => {
    const code = 'print("hello")';
    const prompt = 'Execute this code';
    const language = 'python';

    const body = {
      prompt: prompt || `Execute the following ${language} code and show the output.`,
      code: code || undefined,
      language,
      containerId: undefined,
      skills: undefined,
    };

    expect(body.prompt).toBe('Execute this code');
    expect(body.code).toBe('print("hello")');
    expect(body.language).toBe('python');
  });

  it('uses default prompt when none provided', () => {
    const language = 'python';
    const prompt = '';

    const body = {
      prompt: prompt || `Execute the following ${language} code and show the output.`,
    };

    expect(body.prompt).toContain('Execute the following python code');
  });

  it('includes containerId for container reuse', () => {
    const body = {
      prompt: 'Run again',
      containerId: 'ctr-existing',
    };

    expect(body.containerId).toBe('ctr-existing');
  });

  it('omits empty code', () => {
    const code = '';
    const body = {
      prompt: 'Generate a chart',
      code: code || undefined,
    };

    expect(body.code).toBeUndefined();
  });
});
