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
import ProsePre from '../../components/prose/ProsePre.vue';

definePageMeta({
  layout: 'chat-side-nav',
});

const components = {
  pre: ProsePre as unknown as DefineComponent,
};

const route = useRoute();
const toast = useToast();
const clipboard = useClipboard();
const { model } = useModels();

const { data } = await useFetch(`/api/chats/${route.params.id}`, { cache: 'force-cache' });

if (!data.value) {
  throw createError({ statusCode: 404, statusMessage: 'Chat not found', fatal: true });
}

const input = ref('');

const initialMessages: ChatMessage[] = (data.value.messages || []).map((msg) => ({
  id: msg.id,
  role: msg.role as 'user' | 'assistant',
  parts: msg.parts as ChatMessage['parts'],
  createdAt: msg.createdAt ? new Date(msg.createdAt) : undefined,
}));

const chat = useChat({
  id: data.value.id,
  initialMessages,
  model,
  onError(error) {
    console.error('Chat error:', error.message);
    toast.add({
      description: error.message,
      icon: 'i-lucide-alert-circle',
      color: 'error',
      duration: 0,
    });
  },
  onTitleUpdate() {
    refreshNuxtData('chats');
  },
});

function handleSubmit(e: Event) {
  e.preventDefault();
  if (input.value.trim()) {
    chat.sendMessage(input.value);
    input.value = '';
  }
}

const copied = ref(false);

function copy(e: MouseEvent, message: ChatMessage) {
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

// UChatMessages expects UIMessage[] but we use our own ChatMessage type — runtime-compatible
const chatMessages = computed(() => chat.messages.value as unknown as ChatMessage[]);
const chatAssistantProps = computed(() =>
  chat.status.value !== 'streaming'
    ? {
        actions: [
          {
            label: 'Copy',
            icon: copied.value ? 'i-lucide-copy-check' : 'i-lucide-copy',
            onClick: copy as (...args: unknown[]) => void,
          },
        ],
      }
    : { actions: [] },
);

onMounted(() => {
  if (data.value?.messages?.length === 1) {
    chat.regenerate();
  }
});
</script>

<template>
  <UDashboardPanel id="chat" class="relative" :ui="{ body: 'p-0 sm:p-0' }">
    <template #header>
      <DashboardNavbar />
    </template>

    <template #body>
      <!-- https://ui.nuxt.com/docs/components/chat-messages -->

      <UContainer>
        <UChatMessages
          should-auto-scroll
          :messages="chatMessages as any"
          :status="chat.status.value"
          :assistant="chatAssistantProps as any"
          class="lg:pt-(--ui-header-height) pb-4 sm:pb-6"
          :spacing-offset="160"
        >
          <template #indicator>
            <div class="flex items-center gap-2 p-3 text-sm text-muted">
              <UIcon name="i-lucide-brain" class="animate-pulse" />
              <span>Thinking...</span>
            </div>
          </template>
          <template #content="{ message: _msg }">
            <div class="*:first:mt-0 *:last:mb-0">
              <template
                v-for="(part, index) in (_msg as unknown as ChatMessage).parts"
                :key="getPartKey(_msg.id, part, index)"
              >
                <Reasoning
                  v-if="part.type === 'reasoning'"
                  :text="part.text"
                  :is-streaming="part.state !== 'done'"
                />
                <ToolWeather
                  v-else-if="part.type === 'tool-use' && part.toolName === 'getWeather'"
                  :tool-use="part"
                  :tool-result="getToolResult(_msg as unknown as ChatMessage, part)"
                />
                <ToolDice
                  v-else-if="part.type === 'tool-use' && part.toolName === 'rollDice'"
                  :tool-use="part"
                  :tool-result="getToolResult(_msg as unknown as ChatMessage, part)"
                />
                <ToolInvocation
                  v-else-if="part.type === 'tool-use'"
                  :tool-use="part"
                  :tool-result="getToolResult(_msg as unknown as ChatMessage, part)"
                />
                <ChatCodeExecution
                  v-else-if="part.type === 'code-execution'"
                  :execution="part as CodeExecutionPart"
                />
                <ChatFile v-else-if="part.type === 'file'" :file="part as FilePart" />
                <MDCCached
                  v-else-if="part.type === 'text'"
                  :value="part.text"
                  :cache-key="`${_msg.id}-${index}`"
                  :components="components"
                  :parser-options="{ highlight: false }"
                  class="*:first:mt-0 *:last:mb-0"
                />
              </template>
            </div>
          </template>
        </UChatMessages>

        <UChatPrompt
          v-model="input"
          :error="chat.error.value"
          variant="subtle"
          class="sticky bottom-0 [view-transition-name:chat-prompt] rounded-b-none z-10"
          @submit="handleSubmit"
        >
          <template #footer>
            <div class="flex items-center gap-4 w-full">
              <ModelSelect v-model="model" />
            </div>
            <UChatPromptSubmit
              :status="chat.status.value"
              color="neutral"
              @stop="chat.stop()"
              @reload="chat.regenerate()"
            />
          </template>
        </UChatPrompt>
      </UContainer>
    </template>
  </UDashboardPanel>
</template>
