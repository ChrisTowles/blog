<script setup lang="ts">
// Note: it took me way to long to figure, out that this file needed to be a index in the chat folder to work correctly.
import { extractErrorMessage } from '~~/shared/error-util'
import { TEST_IDS } from '~~/shared/test-ids'

definePageMeta({
  layout: 'chat-side-nav'
})

const toast = useToast()

const input = ref('')
const loading = ref(false)
const { model } = useModels()

async function setPrompt(prompt: string) {
  input.value = prompt
}

async function createChat(prompt: string) {
  input.value = prompt

  // if (loading.value) {
  //   console.log('loading already so canceling')
  //   return
  // }

  loading.value = true

  try {
    const chat = await $fetch('/api/chats', {
      method: 'POST',
      body: { input: prompt }
    })
    console.log('chat', chat)
    refreshNuxtData('chats')
    navigateTo(`/chat/${chat.id}`)
    // no loading state to reset, because we are navigating away.
  } catch (error) {
    console.error('error', error)

    loading.value = false
    toast.add({
      description: extractErrorMessage(error),
      icon: 'i-lucide-alert-circle',
      color: 'error'
    })
  }
}

function onSubmit() {
  createChat(input.value)
}

const quickChats = [
  {
    label: 'What posts do you have about dark matter developer?',
    icon: 'i-heroicons-outline-light-bulb'
  },
  {
    label: 'What\'s the weather in Cincinnati?',
    icon: 'i-lucide-cloud-sun'
  },
  {
    label: 'Roll 4d6 drop lowest for stats',
    icon: 'i-lucide-dice-5'
  },
  {
    label: 'write a script in python to sort a list.',
    icon: 'i-heroicons-command-line'
  },
  {
    label: 'write a script in typescript to sort a list.',
    icon: 'i-heroicons-command-line'
  },
  {
    label: 'Make a markdown table with 5 jokes.',
    icon: 'i-heroicons-command-line'
  },
  {
    label: 'Why use Nuxt UI?',
    icon: 'i-logos-nuxt-icon'
  }
]
</script>

<template>
  <UDashboardPanel id="home" :ui="{ body: 'p-0 sm:p-0' }">
    <template #header>
      <DashboardNavbar />
    </template>

    <template #body>
      <UContainer class="flex-1 flex flex-col justify-center gap-4 sm:gap-6 py-8">
        <h1 class="text-3xl sm:text-4xl text-highlighted font-bold">
          Playground for me to test AI agents and other tooling.
        </h1>

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
            <ModelSelect v-model="model" />
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
      </UContainer>
    </template>
  </UDashboardPanel>
</template>
