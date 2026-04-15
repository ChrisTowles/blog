<script setup lang="ts">
// Note: it took me way to long to figure, out that this file needed to be a index in the chat folder to work correctly.
import { extractErrorMessage } from '~~/shared/error-util';
import { TEST_IDS } from '~~/shared/test-ids';

definePageMeta({
  layout: 'chat-side-nav',
});

const toast = useToast();
const runtimeConfig = useRuntimeConfig();
const mcpDemoEnabled = computed(() => Boolean(runtimeConfig.public.mcpDemoEnabled));

const input = ref('');
const loading = ref(false);
const { model } = useModels();

async function setPrompt(prompt: string) {
  input.value = prompt;
}

async function createChat(prompt: string) {
  input.value = prompt;

  loading.value = true;

  try {
    const chat = await $fetch('/api/chats', {
      method: 'POST',
      body: { input: prompt },
    });
    console.log('chat', chat);
    refreshNuxtData('chats');
    const { gtag } = useGtag();
    gtag('event', 'chat_started');
    await navigateTo(`/chat/${chat.id}`);
    // no loading state to reset, because we are navigating away.
  } catch (error) {
    console.error('error', error);

    loading.value = false;
    toast.add({
      description: extractErrorMessage(error),
      icon: 'i-lucide-alert-circle',
      color: 'error',
    });
  }
}

function onSubmit() {
  createChat(input.value);
}

async function onAviationStarter(question: string) {
  // Create the chat with the question as the first user-turn message, then
  // navigate to the chat page with ?aviation=1 — [id].vue's onMounted
  // dispatches the MCP call directly instead of invoking the agent.
  loading.value = true;
  try {
    const chat = await $fetch('/api/chats', {
      method: 'POST',
      body: { input: question },
    });
    refreshNuxtData('chats');
    await navigateTo(`/chat/${chat.id}?aviation=1`);
  } catch (error) {
    loading.value = false;
    console.error(error);
    toast.add({
      description: extractErrorMessage(error),
      icon: 'i-lucide-alert-circle',
      color: 'error',
    });
  }
}

const quickChats = [
  {
    label: 'What posts do you have about dark matter developer?',
    icon: 'i-heroicons-outline-light-bulb',
  },
  {
    label: "What's the weather in Cincinnati?",
    icon: 'i-lucide-cloud-sun',
  },
  {
    label: 'Roll 4d6 drop lowest for stats',
    icon: 'i-lucide-dice-5',
  },
  {
    label: 'write a script in python to sort a list.',
    icon: 'i-heroicons-command-line',
  },
  {
    label: 'write a script in typescript to sort a list.',
    icon: 'i-heroicons-command-line',
  },
  {
    label: 'Make a markdown table with 5 jokes.',
    icon: 'i-heroicons-command-line',
  },
  {
    label: 'Why use Nuxt UI?',
    icon: 'i-logos-nuxt-icon',
  },
];
</script>

<template>
  <UDashboardPanel id="home" :ui="{ body: 'p-0 sm:p-0' }">
    <template #header>
      <DashboardNavbar />
    </template>

    <template #body>
      <UContainer class="flex-1 flex flex-col justify-center gap-4 sm:gap-6 py-8">
        <h1 class="text-3xl sm:text-4xl text-highlighted font-bold">
          My public sandbox for breaking AI things so you don't have to.
        </h1>
        <p class="text-muted text-sm">
          Where half-baked ideas meet fully-baked AI agents. Side effects may include learning.
        </p>

        <UChatPrompt
          v-model="input"
          :status="loading ? 'streaming' : 'ready'"
          class="[view-transition-name:chat-prompt]"
          variant="subtle"
          :data-testid="TEST_IDS.CHAT.INPUT"
          @submit="onSubmit"
        >
          <UChatPromptSubmit color="neutral" :data-testid="TEST_IDS.CHAT.SUBMIT" />

          <template #footer>
            <div class="flex items-center gap-4 w-full">
              <ModelSelect v-model="model" />
            </div>
          </template>
        </UChatPrompt>

        <div class="flex flex-wrap gap-2" :data-testid="TEST_IDS.CHAT.QUICK_ACTIONS">
          <UButton
            v-for="quickChat in quickChats"
            :key="quickChat.label"
            :icon="quickChat.icon"
            :label="quickChat.label"
            size="sm"
            color="neutral"
            variant="outline"
            class="rounded-full"
            :disabled="loading"
            :data-testid="TEST_IDS.CHAT.QUICK_ACTION_BUTTON"
            @click="setPrompt(quickChat.label)"
          />
        </div>

        <!-- Aviation MCP starter questions (plan Unit 6): visible on zero-turn
             homepage; click creates a new chat with ?aviation=1 and runs
             the MCP call directly (bypasses Anthropic agent loop).
             Gated on NUXT_PUBLIC_MCP_DEMO_ENABLED feature flag per plan
             line 851 (prod hides until launch day). -->
        <div v-if="mcpDemoEnabled" class="mt-2">
          <div class="text-sm text-muted mb-2">Ask about US commercial aviation:</div>
          <AviationStarterQuestions :disabled="loading" @click="onAviationStarter" />
        </div>
      </UContainer>
    </template>
  </UDashboardPanel>
</template>
