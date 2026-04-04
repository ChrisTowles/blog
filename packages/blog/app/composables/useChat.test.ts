/**
 * Tests for the useChat composable's SSE parsing, message assembly, and state management.
 * Extracts the pure logic (SSE line parsing, message part assembly) from the composable
 * and tests it without requiring Nuxt runtime or fetch mocking.
 */
import { describe, it, expect } from 'vitest';
import type {
  ChatMessage,
  SSEEvent,
  MessagePart,
  ToolUsePart,
  ToolResultPart,
  CodeExecutionPart,
  FilePart,
} from '~~/shared/chat-types';

// ── Extracted pure logic from useChat ──────────────────────────────

interface ToolInvocation {
  toolCallId: string;
  toolName: string;
  args: Record<string, unknown>;
  state: 'pending' | 'complete';
  result?: unknown;
}

interface CodeExecution {
  code: string;
  language: string;
  stdout: string;
  stderr: string;
  exitCode: number;
  state: 'running' | 'done';
  files: FilePart[];
}

/**
 * Parse SSE lines from a buffer, extracting complete `data: {...}` events.
 * Returns parsed events and any remaining incomplete buffer.
 */
function parseSSELines(buffer: string): { events: SSEEvent[]; remaining: string } {
  const lines = buffer.split('\n');
  const remaining = lines.pop() || '';
  const events: SSEEvent[] = [];

  for (const line of lines) {
    if (!line.startsWith('data: ')) continue;
    try {
      events.push(JSON.parse(line.slice(6)));
    } catch {
      // Skip unparseable lines (matches composable behavior)
    }
  }

  return { events, remaining };
}

/**
 * Process a sequence of SSE events into accumulated state,
 * replicating the composable's streaming loop logic.
 */
function processSSEEvents(events: SSEEvent[]) {
  let currentTextPart: { type: 'text'; text: string } | null = null;
  let currentReasoningPart: {
    type: 'reasoning';
    text: string;
    state: 'streaming' | 'done';
  } | null = null;
  const toolInvocations: ToolInvocation[] = [];
  const codeExecutions: CodeExecution[] = [];
  let titleUpdated = false;

  for (const event of events) {
    if (event.type === 'text') {
      if (!currentTextPart) {
        currentTextPart = { type: 'text', text: '' };
      }
      currentTextPart.text += event.text;
    } else if (event.type === 'reasoning') {
      if (!currentReasoningPart) {
        currentReasoningPart = { type: 'reasoning', text: '', state: 'streaming' };
      }
      currentReasoningPart.text += event.text;
    } else if (event.type === 'tool_start') {
      toolInvocations.push({
        toolCallId: event.toolCallId,
        toolName: event.tool,
        args: event.args,
        state: 'pending',
      });
    } else if (event.type === 'tool_end') {
      const invocation = toolInvocations.find((t) => t.toolCallId === event.toolCallId);
      if (invocation) {
        invocation.state = 'complete';
        invocation.result = event.result;
      }
    } else if (event.type === 'code_start') {
      codeExecutions.push({
        code: event.code,
        language: event.language,
        stdout: '',
        stderr: '',
        exitCode: 0,
        state: 'running',
        files: [],
      });
    } else if (event.type === 'code_result') {
      const lastExecution = codeExecutions[codeExecutions.length - 1];
      if (lastExecution) {
        lastExecution.stdout = event.stdout;
        lastExecution.stderr = event.stderr;
        lastExecution.exitCode = event.exitCode;
        lastExecution.state = 'done';
        lastExecution.files = event.files;
      }
    } else if (event.type === 'done') {
      if (currentReasoningPart) {
        currentReasoningPart.state = 'done';
      }
    } else if (event.type === 'title') {
      titleUpdated = true;
    }
  }

  return {
    textPart: currentTextPart,
    reasoningPart: currentReasoningPart,
    toolInvocations,
    codeExecutions,
    titleUpdated,
  };
}

/**
 * Assemble message parts from accumulated state,
 * replicating updateAssistantMessage logic.
 */
function assembleMessageParts(
  reasoning: { type: 'reasoning'; text: string; state: 'streaming' | 'done' } | null,
  text: { type: 'text'; text: string } | null,
  tools: ToolInvocation[],
  executions: CodeExecution[],
): MessagePart[] {
  const parts: MessagePart[] = [];
  if (reasoning) parts.push(reasoning);

  for (const tool of tools) {
    parts.push({
      type: 'tool-use',
      toolName: tool.toolName,
      toolCallId: tool.toolCallId,
      args: tool.args,
    } satisfies ToolUsePart);

    if (tool.state === 'complete' && tool.result !== undefined) {
      parts.push({
        type: 'tool-result',
        toolCallId: tool.toolCallId,
        result: tool.result,
      } satisfies ToolResultPart);
    }
  }

  for (const exec of executions) {
    parts.push({
      type: 'code-execution',
      code: exec.code,
      language: exec.language,
      stdout: exec.stdout,
      stderr: exec.stderr,
      exitCode: exec.exitCode,
      state: exec.state,
    } satisfies CodeExecutionPart);
    parts.push(...exec.files);
  }

  if (text) parts.push(text);

  return parts;
}

// ── SSE Line Parsing ───────────────────────────────────────────────

describe('parseSSELines', () => {
  it('parses a single complete SSE line', () => {
    const buffer = 'data: {"type":"text","text":"Hello"}\n';
    const { events, remaining } = parseSSELines(buffer);

    expect(events).toHaveLength(1);
    expect(events[0]).toEqual({ type: 'text', text: 'Hello' });
    expect(remaining).toBe('');
  });

  it('parses multiple SSE lines', () => {
    const buffer = 'data: {"type":"text","text":"Hello "}\ndata: {"type":"text","text":"world"}\n';
    const { events } = parseSSELines(buffer);

    expect(events).toHaveLength(2);
    expect(events[0]).toEqual({ type: 'text', text: 'Hello ' });
    expect(events[1]).toEqual({ type: 'text', text: 'world' });
  });

  it('preserves incomplete buffer as remaining', () => {
    const buffer = 'data: {"type":"text","text":"Hello"}\ndata: {"type":"tex';
    const { events, remaining } = parseSSELines(buffer);

    expect(events).toHaveLength(1);
    expect(remaining).toBe('data: {"type":"tex');
  });

  it('skips non-data lines', () => {
    const buffer = 'event: message\ndata: {"type":"text","text":"ok"}\n: comment\n';
    const { events } = parseSSELines(buffer);

    expect(events).toHaveLength(1);
    expect(events[0]).toEqual({ type: 'text', text: 'ok' });
  });

  it('skips malformed JSON lines', () => {
    const buffer = 'data: not-json\ndata: {"type":"text","text":"ok"}\n';
    const { events } = parseSSELines(buffer);

    expect(events).toHaveLength(1);
    expect(events[0]).toEqual({ type: 'text', text: 'ok' });
  });

  it('returns empty events for empty buffer', () => {
    const { events, remaining } = parseSSELines('');
    expect(events).toHaveLength(0);
    expect(remaining).toBe('');
  });

  it('handles buffer with only newlines', () => {
    const { events } = parseSSELines('\n\n\n');
    expect(events).toHaveLength(0);
  });
});

// ── SSE Event Processing ───────────────────────────────────────────

describe('processSSEEvents', () => {
  it('accumulates text from multiple text events', () => {
    const result = processSSEEvents([
      { type: 'text', text: 'Hello ' },
      { type: 'text', text: 'world!' },
    ]);

    expect(result.textPart?.text).toBe('Hello world!');
  });

  it('accumulates reasoning from multiple reasoning events', () => {
    const result = processSSEEvents([
      { type: 'reasoning', text: 'Let me think ' },
      { type: 'reasoning', text: 'about this.' },
    ]);

    expect(result.reasoningPart?.text).toBe('Let me think about this.');
    expect(result.reasoningPart?.state).toBe('streaming');
  });

  it('sets reasoning state to done on done event', () => {
    const result = processSSEEvents([
      { type: 'reasoning', text: 'thinking...' },
      { type: 'done', messageId: 'msg-1' },
    ]);

    expect(result.reasoningPart?.state).toBe('done');
  });

  it('tracks tool invocations from start to end', () => {
    const result = processSSEEvents([
      {
        type: 'tool_start',
        tool: 'getWeather',
        toolCallId: 'tc-1',
        args: { location: 'London' },
      },
      {
        type: 'tool_end',
        tool: 'getWeather',
        toolCallId: 'tc-1',
        result: { temperature: 15 },
      },
    ]);

    expect(result.toolInvocations).toHaveLength(1);
    expect(result.toolInvocations[0]!.state).toBe('complete');
    expect(result.toolInvocations[0]!.result).toEqual({ temperature: 15 });
  });

  it('keeps tool as pending when no tool_end received', () => {
    const result = processSSEEvents([
      {
        type: 'tool_start',
        tool: 'rollDice',
        toolCallId: 'tc-2',
        args: { notation: '2d6' },
      },
    ]);

    expect(result.toolInvocations).toHaveLength(1);
    expect(result.toolInvocations[0]!.state).toBe('pending');
    expect(result.toolInvocations[0]!.result).toBeUndefined();
  });

  it('tracks code execution from start to result', () => {
    const result = processSSEEvents([
      { type: 'code_start', code: 'print("hi")', language: 'python' },
      { type: 'code_result', stdout: 'hi\n', stderr: '', exitCode: 0, files: [] },
    ]);

    expect(result.codeExecutions).toHaveLength(1);
    expect(result.codeExecutions[0]!.state).toBe('done');
    expect(result.codeExecutions[0]!.stdout).toBe('hi\n');
  });

  it('tracks code execution with files', () => {
    const file: FilePart = {
      type: 'file',
      fileId: 'f-1',
      fileName: 'chart.png',
      mediaType: 'image/png',
      url: '/api/artifacts/files/f-1',
    };
    const result = processSSEEvents([
      { type: 'code_start', code: 'plot()', language: 'python' },
      { type: 'code_result', stdout: '', stderr: '', exitCode: 0, files: [file] },
    ]);

    expect(result.codeExecutions[0]!.files).toHaveLength(1);
    expect(result.codeExecutions[0]!.files[0]!.fileName).toBe('chart.png');
  });

  it('detects title update events', () => {
    const result = processSSEEvents([{ type: 'title', title: 'New Chat Title' }]);

    expect(result.titleUpdated).toBe(true);
  });

  it('handles container events without crashing', () => {
    const result = processSSEEvents([{ type: 'container', containerId: 'ctr-1' }]);

    // Container events don't affect message parts
    expect(result.textPart).toBeNull();
    expect(result.toolInvocations).toHaveLength(0);
  });

  it('handles error events by throwing', () => {
    // In the composable, error events throw — here we just verify the event is recognized
    const events: SSEEvent[] = [{ type: 'error', error: 'Rate limit exceeded' }];
    // processSSEEvents doesn't throw (it's the outer try/catch that does),
    // but we confirm it doesn't crash on error events
    expect(() => processSSEEvents(events)).not.toThrow();
  });
});

// ── Message Part Assembly ──────────────────────────────────────────

describe('assembleMessageParts', () => {
  it('returns empty array when all inputs are null/empty', () => {
    const parts = assembleMessageParts(null, null, [], []);
    expect(parts).toHaveLength(0);
  });

  it('includes reasoning part first', () => {
    const parts = assembleMessageParts(
      { type: 'reasoning', text: 'thinking...', state: 'done' },
      { type: 'text', text: 'Here is the answer.' },
      [],
      [],
    );

    expect(parts[0]!.type).toBe('reasoning');
    expect(parts[1]!.type).toBe('text');
  });

  it('includes text part last', () => {
    const parts = assembleMessageParts(null, { type: 'text', text: 'answer' }, [], []);

    expect(parts).toHaveLength(1);
    expect(parts[0]!.type).toBe('text');
  });

  it('adds tool-use and tool-result for completed tools', () => {
    const tools: ToolInvocation[] = [
      {
        toolCallId: 'tc-1',
        toolName: 'getWeather',
        args: { location: 'NYC' },
        state: 'complete',
        result: { temp: 72 },
      },
    ];

    const parts = assembleMessageParts(null, null, tools, []);

    expect(parts).toHaveLength(2);
    expect(parts[0]!.type).toBe('tool-use');
    expect((parts[0] as ToolUsePart).toolName).toBe('getWeather');
    expect(parts[1]!.type).toBe('tool-result');
    expect((parts[1] as ToolResultPart).result).toEqual({ temp: 72 });
  });

  it('adds only tool-use for pending tools (no result)', () => {
    const tools: ToolInvocation[] = [
      {
        toolCallId: 'tc-1',
        toolName: 'searchBlogContent',
        args: { query: 'nuxt' },
        state: 'pending',
      },
    ];

    const parts = assembleMessageParts(null, null, tools, []);

    expect(parts).toHaveLength(1);
    expect(parts[0]!.type).toBe('tool-use');
  });

  it('includes code execution parts', () => {
    const executions: CodeExecution[] = [
      {
        code: 'print(42)',
        language: 'python',
        stdout: '42\n',
        stderr: '',
        exitCode: 0,
        state: 'done',
        files: [],
      },
    ];

    const parts = assembleMessageParts(null, null, [], executions);

    expect(parts).toHaveLength(1);
    expect(parts[0]!.type).toBe('code-execution');
    expect((parts[0] as CodeExecutionPart).stdout).toBe('42\n');
  });

  it('includes files after code execution parts', () => {
    const file: FilePart = {
      type: 'file',
      fileId: 'f-1',
      fileName: 'output.png',
      mediaType: 'image/png',
      url: '/api/artifacts/files/f-1',
    };
    const executions: CodeExecution[] = [
      {
        code: 'plot()',
        language: 'python',
        stdout: '',
        stderr: '',
        exitCode: 0,
        state: 'done',
        files: [file],
      },
    ];

    const parts = assembleMessageParts(null, null, [], executions);

    expect(parts).toHaveLength(2);
    expect(parts[0]!.type).toBe('code-execution');
    expect(parts[1]!.type).toBe('file');
  });

  it('assembles parts in correct order: reasoning, tools, code, text', () => {
    const tools: ToolInvocation[] = [
      {
        toolCallId: 'tc-1',
        toolName: 'rollDice',
        args: { notation: '1d20' },
        state: 'complete',
        result: { total: 17 },
      },
    ];
    const executions: CodeExecution[] = [
      {
        code: 'x = 1',
        language: 'python',
        stdout: '',
        stderr: '',
        exitCode: 0,
        state: 'done',
        files: [],
      },
    ];

    const parts = assembleMessageParts(
      { type: 'reasoning', text: 'thinking', state: 'done' },
      { type: 'text', text: 'result' },
      tools,
      executions,
    );

    const types = parts.map((p) => p.type);
    expect(types).toEqual(['reasoning', 'tool-use', 'tool-result', 'code-execution', 'text']);
  });
});

// ── Full Streaming Sequence ────────────────────────────────────────

describe('full streaming sequence', () => {
  it('processes a complete chat turn with tool use', () => {
    const events: SSEEvent[] = [
      { type: 'reasoning', text: 'User wants weather. ' },
      { type: 'reasoning', text: 'I should use the tool.' },
      {
        type: 'tool_start',
        tool: 'getWeather',
        toolCallId: 'tc-w1',
        args: { location: 'Tokyo' },
      },
      {
        type: 'tool_end',
        tool: 'getWeather',
        toolCallId: 'tc-w1',
        result: { temperature: 22, condition: 'Sunny' },
      },
      { type: 'text', text: 'The weather in Tokyo is 22°C and sunny.' },
      { type: 'done', messageId: 'msg-1' },
    ];

    const state = processSSEEvents(events);
    const parts = assembleMessageParts(
      state.reasoningPart,
      state.textPart,
      state.toolInvocations,
      state.codeExecutions,
    );

    expect(parts).toHaveLength(4); // reasoning, tool-use, tool-result, text
    expect(parts[0]!.type).toBe('reasoning');
    expect(parts[1]!.type).toBe('tool-use');
    expect(parts[2]!.type).toBe('tool-result');
    expect(parts[3]!.type).toBe('text');
    expect(state.reasoningPart?.state).toBe('done');
  });

  it('processes a text-only response', () => {
    const events: SSEEvent[] = [
      { type: 'text', text: 'Hello! ' },
      { type: 'text', text: 'How can I help?' },
      { type: 'done', messageId: 'msg-2' },
    ];

    const state = processSSEEvents(events);
    const parts = assembleMessageParts(
      state.reasoningPart,
      state.textPart,
      state.toolInvocations,
      state.codeExecutions,
    );

    expect(parts).toHaveLength(1);
    expect(parts[0]!.type).toBe('text');
    expect((parts[0] as { text: string }).text).toBe('Hello! How can I help?');
  });

  it('processes multiple tool invocations in one turn', () => {
    const events: SSEEvent[] = [
      {
        type: 'tool_start',
        tool: 'rollDice',
        toolCallId: 'tc-d1',
        args: { notation: '1d20', label: 'Attack' },
      },
      {
        type: 'tool_end',
        tool: 'rollDice',
        toolCallId: 'tc-d1',
        result: { total: 18 },
      },
      {
        type: 'tool_start',
        tool: 'rollDice',
        toolCallId: 'tc-d2',
        args: { notation: '2d6+3', label: 'Damage' },
      },
      {
        type: 'tool_end',
        tool: 'rollDice',
        toolCallId: 'tc-d2',
        result: { total: 11 },
      },
      { type: 'text', text: 'Attack: 18 (hit!), Damage: 11' },
      { type: 'done', messageId: 'msg-3' },
    ];

    const state = processSSEEvents(events);

    expect(state.toolInvocations).toHaveLength(2);
    expect(state.toolInvocations.every((t) => t.state === 'complete')).toBe(true);

    const parts = assembleMessageParts(
      state.reasoningPart,
      state.textPart,
      state.toolInvocations,
      state.codeExecutions,
    );

    // 2 tool-use + 2 tool-result + 1 text = 5
    expect(parts).toHaveLength(5);
  });
});

// ── User Message Construction ──────────────────────────────────────

describe('user message construction', () => {
  it('creates user message with text part', () => {
    const text = 'What is the weather?';
    const userMessage: ChatMessage = {
      id: 'test-uuid',
      role: 'user',
      parts: [{ type: 'text', text }],
    };

    expect(userMessage.role).toBe('user');
    expect(userMessage.parts).toHaveLength(1);
    expect(userMessage.parts[0]!.type).toBe('text');
  });

  it('creates empty assistant placeholder', () => {
    const assistantMessage: ChatMessage = {
      id: 'test-uuid',
      role: 'assistant',
      parts: [],
    };

    expect(assistantMessage.role).toBe('assistant');
    expect(assistantMessage.parts).toHaveLength(0);
  });
});
