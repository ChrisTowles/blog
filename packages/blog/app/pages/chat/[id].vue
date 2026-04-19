<script setup lang="ts">
import type { DefineComponent } from 'vue';
import { useClipboard } from '@vueuse/core';
import type {
  ChatMessage,
  CodeExecutionPart,
  FilePart,
  ToolUsePart,
  ToolResultPart,
  UiResourcePart,
} from '~~/shared/chat-types';
import ProsePre from '../../components/prose/ProsePre.vue';

definePageMeta({
  layout: 'chat-side-nav',
});

const components: Record<string, DefineComponent> = {
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

/** Hide starter questions once the chat has any turn. */
const showStarterQuestions = computed(() => (chat.messages.value?.length ?? 0) === 0);

const copied = ref(false);

function copy(
  e: MouseEvent,
  message: { id: string; parts?: Array<{ type: string; text?: string }> },
) {
  const text = (message.parts ?? [])
    .filter((p) => p.type === 'text')
    .map((p) => p.text ?? '')
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

function asChatMessage(msg: unknown): ChatMessage {
  return msg as ChatMessage;
}

function getToolResult(message: ChatMessage, toolUse: ToolUsePart): ToolResultPart | undefined {
  return message.parts.find(
    (p): p is ToolResultPart => p.type === 'tool-result' && p.toolCallId === toolUse.toolCallId,
  );
}

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
          :messages="chat.messages.value as ChatMessage[]"
          :status="chat.status.value"
          :assistant="
            chat.status.value !== 'streaming'
              ? {
                  actions: [
                    {
                      label: 'Copy',
                      icon: copied ? 'i-lucide-copy-check' : 'i-lucide-copy',
                      onClick: copy,
                    },
                  ],
                }
              : { actions: [] }
          "
          class="lg:pt-(--ui-header-height) pb-4 sm:pb-6"
          :spacing-offset="160"
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
                v-for="(part, index) in asChatMessage(rawMessage).parts"
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
                  :tool-result="getToolResult(asChatMessage(rawMessage), part)"
                />
                <ToolDice
                  v-else-if="part.type === 'tool-use' && part.toolName === 'rollDice'"
                  :tool-use="part"
                  :tool-result="getToolResult(asChatMessage(rawMessage), part)"
                />
                <ToolInvocation
                  v-else-if="part.type === 'tool-use'"
                  :tool-use="part"
                  :tool-result="getToolResult(asChatMessage(rawMessage), part)"
                />
                <ChatCodeExecution
                  v-else-if="part.type === 'code-execution'"
                  :execution="part as CodeExecutionPart"
                />
                <ChatFile v-else-if="part.type === 'file'" :file="part as FilePart" />
                <ToolUiResource
                  v-else-if="part.type === 'ui-resource'"
                  :part="part as UiResourcePart"
                  :html="chat.streamedUiResourceHtml.value[(part as UiResourcePart).toolCallId]"
                  :streaming="chat.status.value === 'streaming'"
                  @followup="(question: string) => chat.sendMessage(question)"
                />
                <MDCCached
                  v-else-if="part.type === 'text'"
                  :value="part.text"
                  :cache-key="`${rawMessage.id}-${index}`"
                  :components="components"
                  :parser-options="{ highlight: false }"
                  class="*:first:mt-0 *:last:mb-0"
                />
              </template>
            </div>
          </template>
        </UChatMessages>

        <AviationStarterQuestions
          v-if="showStarterQuestions"
          class="mb-3 px-2"
          @click="(question: string) => chat.sendMessage(question)"
        />

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
