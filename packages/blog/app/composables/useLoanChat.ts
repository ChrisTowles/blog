import type { ChatMessage, ChatStatus, MessagePart } from '~~/shared/chat-types';
import type { LoanApplicationData } from '~~/shared/loan-types';

interface UseLoanChatOptions {
  id: string;
  model: Ref<string>;
  onError?: (error: Error) => void;
  onApplicationUpdate?: (data: LoanApplicationData) => void;
}

export function useLoanChat(options: UseLoanChatOptions) {
  const welcomeMessage: ChatMessage = {
    id: 'welcome',
    role: 'assistant',
    parts: [
      {
        type: 'text',
        text: "Welcome! I'm your AI loan officer. I'll walk you through your home loan application step by step.\n\nLet's start — **what's your full name?**",
      },
    ],
  };
  const messages = ref<ChatMessage[]>([welcomeMessage]);
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
      const response = await fetch(`/api/loan/${options.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: options.model.value,
          messages: messages.value.slice(0, -1),
        }),
        signal: abortController.value.signal,
      });

      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response body');

      const decoder = new TextDecoder();
      let buffer = '';
      let currentTextPart: { type: 'text'; text: string } | null = null;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          try {
            const event = JSON.parse(line.slice(6));

            if (event.type === 'text') {
              if (!currentTextPart) currentTextPart = { type: 'text', text: '' };
              currentTextPart.text += event.text;
              updateAssistantMessage(assistantMessageId, currentTextPart);
            } else if (event.type === 'application_update') {
              options.onApplicationUpdate?.(event.data);
            } else if (event.type === 'error') {
              throw new Error(event.error);
            }
          } catch (e) {
            if (e instanceof Error && e.message.startsWith('HTTP')) throw e;
            // Ignore malformed SSE lines (partial chunks, keep-alive)
          }
        }
      }

      status.value = 'ready';
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        status.value = 'ready';
        return;
      }
      error.value = err instanceof Error ? err : new Error('Unknown error');
      status.value = 'error';
      options.onError?.(error.value);
    } finally {
      abortController.value = null;
    }
  }

  function updateAssistantMessage(
    messageId: string,
    text: { type: 'text'; text: string } | null,
  ): void {
    const parts: MessagePart[] = [];
    if (text) parts.push(text);
    messages.value = messages.value.map((msg) => (msg.id === messageId ? { ...msg, parts } : msg));
  }

  function stop(): void {
    abortController.value?.abort();
    status.value = 'ready';
  }

  return {
    messages: computed(() => messages.value),
    status: computed(() => status.value),
    error: computed(() => error.value ?? undefined),
    sendMessage,
    stop,
  };
}
