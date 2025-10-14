<script setup lang="ts">
// Note: it took me way to long to figure, out that this file needed to be a index in the chat folder to work correctly.
import { extractErrorMessage } from '~~/shared/error-util'

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
    label: 'Tell me a joke about programming.',
    icon: 'i-heroicons-outline-light-bulb'
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
          @submit="onSubmit"
        >
          <UChatPromptSubmit color="neutral" />

          <template #footer>
            <ModelSelect v-model="model" />
          </template>
        </UChatPrompt>

        <div class="flex flex-wrap gap-2">
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
            @click="setPrompt(quickChat.label)"
          />
        </div>
      </UContainer>
    </template>
  </UDashboardPanel>
</template>
