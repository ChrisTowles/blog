<script setup lang="ts">
import type { DefineComponent } from 'vue';
import { useClipboard } from '@vueuse/core';
import type { ChatMessage, ToolUsePart, ToolResultPart, ArtifactPart } from '~~/shared/chat-types';
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

function onFileSelect(e: Event) {
  const target = e.target as HTMLInputElement;
  if (target.files) {
    chat.pendingFiles.value = [...chat.pendingFiles.value, ...Array.from(target.files)];
    target.value = ''; // Reset input
  }
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
          :messages="chat.messages.value"
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
          <template #content="{ message }">
            <div class="*:first:mt-0 *:last:mb-0">
              <template
                v-for="(part, index) in message.parts"
                :key="getPartKey(message.id, part, index)"
              >
                <Reasoning
                  v-if="part.type === 'reasoning'"
                  :text="part.text"
                  :is-streaming="part.state !== 'done'"
                />
                <ToolWeather
                  v-else-if="part.type === 'tool-use' && part.toolName === 'getWeather'"
                  :tool-use="part"
                  :tool-result="getToolResult(message, part)"
                />
                <ToolDice
                  v-else-if="part.type === 'tool-use' && part.toolName === 'rollDice'"
                  :tool-use="part"
                  :tool-result="getToolResult(message, part)"
                />
                <ToolInvocation
                  v-else-if="part.type === 'tool-use'"
                  :tool-use="part"
                  :tool-result="getToolResult(message, part)"
                />
                <ArtifactPanel
                  v-else-if="part.type === 'artifact'"
                  :artifact="part as ArtifactPart"
                />
                <MDCCached
                  v-else-if="part.type === 'text'"
                  :value="part.text"
                  :cache-key="`${message.id}-${index}`"
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
              <input
                ref="fileInput"
                type="file"
                accept="image/*"
                multiple
                class="hidden"
                @change="onFileSelect"
              />
              <UButton
                icon="i-lucide-paperclip"
                size="xs"
                color="neutral"
                variant="ghost"
                title="Attach image"
                @click="($refs.fileInput as HTMLInputElement)?.click()"
              />
              <div
                v-if="chat.pendingFiles.value.length"
                class="flex items-center gap-1 text-xs text-[var(--ui-text-muted)]"
              >
                <UIcon name="i-lucide-image" />
                {{ chat.pendingFiles.value.length }} file(s)
                <UButton
                  icon="i-lucide-x"
                  size="xs"
                  color="neutral"
                  variant="ghost"
                  @click="chat.pendingFiles.value = []"
                />
              </div>
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
