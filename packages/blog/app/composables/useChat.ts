import { log } from 'evlog';
import type {
  ChatMessage,
  ChatStatus,
  CodeExecutionPart,
  FilePart,
  MessagePart,
  SSEEvent,
  ToolUsePart,
  ToolResultPart,
} from '~~/shared/chat-types';

interface UseChatOptions {
  id: string;
  initialMessages?: ChatMessage[];
  model: Ref<string>;
  onError?: (error: Error) => void;
  onTitleUpdate?: () => void;
}

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

export function useChat(options: UseChatOptions) {
  const messages = ref<ChatMessage[]>(options.initialMessages || []);
  const status = ref<ChatStatus>('ready');
  const error = ref<Error | null>(null);
  const abortController = ref<AbortController | null>(null);

  async function sendMessage(text: string): Promise<void> {
    if (status.value === 'streaming') return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      parts: [{ type: 'text', text }],
    };
    messages.value = [...messages.value, userMessage];

    const assistantMessageId = crypto.randomUUID();
    messages.value = [...messages.value, { id: assistantMessageId, role: 'assistant', parts: [] }];

    status.value = 'streaming';
    error.value = null;
    abortController.value = new AbortController();

    try {
      const response = await fetch(`/api/chats/${options.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: options.model.value,
          messages: messages.value.slice(0, -1), // Don't send the placeholder
        }),
        signal: abortController.value.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response body');

      const decoder = new TextDecoder();
      let buffer = '';
      let currentTextPart: { type: 'text'; text: string } | null = null;
      let currentReasoningPart: {
        type: 'reasoning';
        text: string;
        state: 'streaming' | 'done';
      } | null = null;
      const toolInvocations: ToolInvocation[] = [];
      const codeExecutions: CodeExecution[] = [];

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;

          try {
            const event: SSEEvent = JSON.parse(line.slice(6));
            let shouldUpdateMessage = true;

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
              options.onTitleUpdate?.();
              shouldUpdateMessage = false;
            } else if (event.type === 'container') {
              shouldUpdateMessage = false;
            } else if (event.type === 'error') {
              throw new Error(event.error);
            }

            if (shouldUpdateMessage) {
              updateAssistantMessage(
                assistantMessageId,
                currentReasoningPart,
                currentTextPart,
                toolInvocations,
                codeExecutions,
              );
            }
          } catch {
            log.error('chat', 'Error parsing SSE event');
          }
        }
      }

      status.value = 'ready';
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        status.value = 'ready';
        return;
      }
      log.error('chat', 'Chat streaming error');
      error.value = err instanceof Error ? err : new Error('Unknown error');
      status.value = 'error';
      options.onError?.(error.value);
    } finally {
      abortController.value = null;
    }
  }

  function updateAssistantMessage(
    messageId: string,
    reasoning: { type: 'reasoning'; text: string; state: 'streaming' | 'done' } | null,
    text: { type: 'text'; text: string } | null,
    tools: ToolInvocation[],
    executions: CodeExecution[],
  ): void {
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

    messages.value = messages.value.map((msg) => (msg.id === messageId ? { ...msg, parts } : msg));
  }

  function stop(): void {
    abortController.value?.abort();
    status.value = 'ready';
  }

  async function regenerate(): Promise<void> {
    if (messages.value.length === 0) return;

    if (messages.value[messages.value.length - 1]?.role === 'assistant') {
      messages.value = messages.value.slice(0, -1);
    }

    const lastUserMsg = messages.value.findLast((m) => m.role === 'user');
    if (!lastUserMsg) return;

    messages.value = messages.value.slice(0, -1);
    const textPart = lastUserMsg.parts.find((p) => p.type === 'text');
    if (textPart && 'text' in textPart) {
      await sendMessage(textPart.text);
    }
  }

  return {
    messages: computed(() => messages.value),
    status: computed(() => status.value),
    error: computed(() => error.value ?? undefined),
    sendMessage,
    stop,
    regenerate,
  };
}
