<script setup lang="ts">
import type { DefineComponent } from 'vue';
import { useClipboard } from '@vueuse/core';
import type {
  ChatMessage,
  CodeExecutionPart,
  FilePart,
  ToolUsePart,
  ToolResultPart,
} from '~~/shared/chat-types';
import ProsePre from '../prose/ProsePre.vue';

const components = {
  pre: ProsePre as unknown as DefineComponent,
};

const toast = useToast();
const clipboard = useClipboard();
const { model } = useModels();
const { chatContext } = useReaderSync();

const chatId = ref('');
const chatReady = ref(false);
const input = ref('');
const loading = ref(false);

async function ensureChat() {
  if (chatId.value) return;

  loading.value = true;
  try {
    const result = await $fetch('/api/chats', {
      method: 'POST',
      body: { input: '__reader_init__' },
    });
    chatId.value = result.id;
    chatReady.value = true;
  } catch (err) {
    console.error('Failed to create chat:', err);
    toast.add({
      description: 'Failed to start chat session',
      icon: 'i-lucide-alert-circle',
      color: 'error',
    });
  } finally {
    loading.value = false;
  }
}

const chat = computed(() => {
  if (!chatReady.value || !chatId.value) return null;
  return useChat({
    id: chatId.value,
    model,
    onError(error) {
      toast.add({
        description: error.message,
        icon: 'i-lucide-alert-circle',
        color: 'error',
        duration: 0,
      });
    },
  });
});

async function handleSubmit(e: Event) {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  if (!chatReady.value) {
    await ensureChat();
  }

  if (chat.value) {
    const contextPrefix = chatContext.value ? `[Context: ${chatContext.value}]\n\n` : '';
    chat.value.sendMessage(contextPrefix + text);
    input.value = '';
  }
}

const copied = ref(false);

function copy(_e: MouseEvent, message: ChatMessage) {
  const text = message.parts
    .filter((p) => p.type === 'text')
    .map((p) => ('text' in p ? p.text : ''))
    .join('\n');

  clipboard.copy(text);
  copied.value = true;
  setTimeout(() => (copied.value = false), 2000);
}

function getPartKey(messageId: string, part: unknown, index: number) {
  if (!part || typeof part !== 'object') return `${messageId}-unknown-${index}`;

  const type = 'type' in part ? part.type : 'unknown';
  const state = 'state' in part ? `-${(part as { state: string }).state}` : '';

  return `${messageId}-${type}-${index}${state}`;
}

function getToolResult(message: ChatMessage, toolUse: ToolUsePart): ToolResultPart | undefined {
  return message.parts.find(
    (p): p is ToolResultPart => p.type === 'tool-result' && p.toolCallId === toolUse.toolCallId,
  );
}
</script>

<template>
  <div class="h-full flex flex-col">
    <!-- Chat messages area -->
    <div class="flex-1 overflow-y-auto min-h-0">
      <div v-if="!chat" class="flex flex-col items-center justify-center h-full gap-4 p-6">
        <UIcon name="i-lucide-message-circle" class="text-4xl text-muted" />
        <p class="text-sm text-muted text-center">
          Ask questions about the article or search the blog.
        </p>
      </div>

      <UChatMessages
        v-else
        should-auto-scroll
        :messages="chat.messages.value as any"
        :status="chat.status.value"
        :assistant="
          chat.status.value !== 'streaming'
            ? {
                actions: [
                  {
                    label: 'Copy',
                    icon: copied ? 'i-lucide-copy-check' : 'i-lucide-copy',
                    onClick: copy as any,
                  },
                ],
              }
            : { actions: [] }
        "
        class="p-4"
      >
        <template #indicator>
          <div class="flex items-center gap-2 p-3 text-sm text-muted">
            <UIcon name="i-lucide-brain" class="animate-pulse" />
            <span>Thinking...</span>
          </div>
        </template>
        <template #content="{ message: rawMessage }">
          <div class="*:first:mt-0 *:last:mb-0">
            <template
              v-for="(part, index) in (rawMessage as unknown as ChatMessage).parts"
              :key="getPartKey(rawMessage.id, part, index)"
            >
              <Reasoning
                v-if="part.type === 'reasoning'"
                :text="part.text"
                :is-streaming="part.state !== 'done'"
              />
              <ToolWeather
                v-else-if="part.type === 'tool-use' && part.toolName === 'getWeather'"
                :tool-use="part"
                :tool-result="getToolResult(rawMessage as unknown as ChatMessage, part)"
              />
              <ToolDice
                v-else-if="part.type === 'tool-use' && part.toolName === 'rollDice'"
                :tool-use="part"
                :tool-result="getToolResult(rawMessage as unknown as ChatMessage, part)"
              />
              <ToolInvocation
                v-else-if="part.type === 'tool-use'"
                :tool-use="part"
                :tool-result="getToolResult(rawMessage as unknown as ChatMessage, part)"
              />
              <ChatCodeExecution
                v-else-if="part.type === 'code-execution'"
                :execution="part as CodeExecutionPart"
              />
              <ChatFile v-else-if="part.type === 'file'" :file="part as FilePart" />
              <MDCCached
                v-else-if="part.type === 'text'"
                :value="part.text"
                :cache-key="`reader-${rawMessage.id}-${index}`"
                :components="components"
                :parser-options="{ highlight: false }"
                class="*:first:mt-0 *:last:mb-0"
              />
            </template>
          </div>
        </template>
      </UChatMessages>
    </div>

    <!-- Chat input -->
    <div class="border-t border-(--ui-border) p-3">
      <UChatPrompt
        v-model="input"
        :error="chat?.error.value"
        :status="loading ? 'streaming' : (chat?.status.value ?? 'ready')"
        variant="subtle"
        placeholder="Ask about this article..."
        @submit="handleSubmit"
      >
        <template #footer>
          <div class="flex items-center gap-4 w-full">
            <ModelSelect v-model="model" />
          </div>
          <UChatPromptSubmit
            :status="loading ? 'streaming' : (chat?.status.value ?? 'ready')"
            color="neutral"
            @stop="chat?.stop()"
          />
        </template>
      </UChatPrompt>
    </div>
  </div>
</template>
