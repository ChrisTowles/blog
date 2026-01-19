import type {
  ChatMessage,
  ChatStatus,
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

export function useChat(options: UseChatOptions) {
  const messages = ref<ChatMessage[]>(options.initialMessages || []);
  const status = ref<ChatStatus>('ready');
  const error = ref<Error | null>(null);
  const abortController = ref<AbortController | null>(null);

  async function sendMessage(text: string) {
    if (status.value === 'streaming') return;

    // Add user message
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      parts: [{ type: 'text', text }],
    };
    messages.value = [...messages.value, userMessage];

    // Add placeholder assistant message
    const assistantMessageId = crypto.randomUUID();
    const assistantMessage: ChatMessage = {
      id: assistantMessageId,
      role: 'assistant',
      parts: [],
    };
    messages.value = [...messages.value, assistantMessage];

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

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const event: SSEEvent = JSON.parse(line.slice(6));

              if (event.type === 'text') {
                if (!currentTextPart) {
                  currentTextPart = { type: 'text', text: '' };
                }
                currentTextPart.text += event.text;

                // Update message parts
                updateAssistantMessage(
                  assistantMessageId,
                  currentReasoningPart,
                  currentTextPart,
                  toolInvocations,
                );
              } else if (event.type === 'reasoning') {
                if (!currentReasoningPart) {
                  currentReasoningPart = { type: 'reasoning', text: '', state: 'streaming' };
                }
                currentReasoningPart.text += event.text;

                // Update message parts
                updateAssistantMessage(
                  assistantMessageId,
                  currentReasoningPart,
                  currentTextPart,
                  toolInvocations,
                );
              } else if (event.type === 'tool_start') {
                toolInvocations.push({
                  toolCallId: event.toolCallId,
                  toolName: event.tool,
                  args: event.args,
                  state: 'pending',
                });
                updateAssistantMessage(
                  assistantMessageId,
                  currentReasoningPart,
                  currentTextPart,
                  toolInvocations,
                );
              } else if (event.type === 'tool_end') {
                const invocation = toolInvocations.find((t) => t.toolCallId === event.toolCallId);
                if (invocation) {
                  invocation.state = 'complete';
                  invocation.result = event.result;
                }
                updateAssistantMessage(
                  assistantMessageId,
                  currentReasoningPart,
                  currentTextPart,
                  toolInvocations,
                );
              } else if (event.type === 'title') {
                options.onTitleUpdate?.();
              } else if (event.type === 'done') {
                if (currentReasoningPart) {
                  currentReasoningPart.state = 'done';
                }
                updateAssistantMessage(
                  assistantMessageId,
                  currentReasoningPart,
                  currentTextPart,
                  toolInvocations,
                );
              } else if (event.type === 'error') {
                throw new Error(event.error);
              }
            } catch (e) {
              console.error('Error parsing SSE event:', e, line);
            }
          }
        }
      }

      status.value = 'ready';
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        status.value = 'ready';
        return;
      }
      console.error('Chat error:', err);
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
    tools: ToolInvocation[] = [],
  ) {
    const parts: MessagePart[] = [];
    if (reasoning) parts.push(reasoning);

    // Add tool use and result parts
    for (const tool of tools) {
      const toolUsePart: ToolUsePart = {
        type: 'tool-use',
        toolName: tool.toolName,
        toolCallId: tool.toolCallId,
        args: tool.args,
      };
      parts.push(toolUsePart);

      if (tool.state === 'complete' && tool.result !== undefined) {
        const toolResultPart: ToolResultPart = {
          type: 'tool-result',
          toolCallId: tool.toolCallId,
          result: tool.result,
        };
        parts.push(toolResultPart);
      }
    }

    if (text) parts.push(text);

    messages.value = messages.value.map((msg) => {
      if (msg.id === messageId) {
        return { ...msg, parts };
      }
      return msg;
    });
  }

  function stop() {
    abortController.value?.abort();
    status.value = 'ready';
  }

  async function regenerate() {
    if (messages.value.length === 0) return;

    // If last message is from assistant, remove it
    if (messages.value[messages.value.length - 1]?.role === 'assistant') {
      messages.value = messages.value.slice(0, -1);
    }

    // Get the last user message
    const lastUserMsg = messages.value.findLast((m) => m.role === 'user');
    if (!lastUserMsg) return;

    // Remove the last user message and re-send it
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
