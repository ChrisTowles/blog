<script setup lang="ts">
import { extractErrorMessage } from '~~/shared/error-util'

const route = useRoute()
const toast = useToast()

// Fetch chatbot configuration
const { data: chatbot, error: chatbotError } = await useFetch(`/api/chatbots/${route.params.slug}`)

if (chatbotError.value || !chatbot.value) {
  throw createError({ statusCode: 404, statusMessage: 'Chatbot not found', fatal: true })
}

// Set page meta with chatbot name
useHead({
  title: chatbot.value.chatbot.name
})

const input = ref('')
const loading = ref(false)

// Theme-aware color
const themeColor = computed(() => chatbot.value?.chatbot.theme.primaryColor || 'blue')

async function createChat(prompt: string) {
  if (loading.value) return

  loading.value = true

  try {
    const chat = await $fetch('/api/chats', {
      method: 'POST',
      body: { input: prompt, personaSlug: chatbot.value?.chatbot.slug }
    })
    refreshNuxtData('chats')
    navigateTo(`/chat/${chat.id}`)
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
  if (input.value.trim()) {
    createChat(input.value)
  }
}
</script>

<template>
  <div class="min-h-screen bg-default">
    <!-- Header -->
    <header class="border-b border-default">
      <UContainer class="flex items-center justify-between h-16">
        <div class="flex items-center gap-3">
          <UIcon :name="chatbot.chatbot.icon" class="w-8 h-8" :class="`text-${themeColor}-500`" />
          <div>
            <h1 class="text-lg font-semibold">
              {{ chatbot.chatbot.name }}
            </h1>
            <p class="text-xs text-muted">
              {{ chatbot.chatbot.description }}
            </p>
          </div>
        </div>
        <UButton
          to="/chat"
          variant="ghost"
          icon="i-lucide-arrow-left"
          label="All Chats"
        />
      </UContainer>
    </header>

    <!-- Main Content -->
    <UContainer class="py-12">
      <div class="max-w-2xl mx-auto space-y-8">
        <!-- Welcome Section -->
        <div class="text-center space-y-4">
          <div
            class="w-20 h-20 rounded-full mx-auto flex items-center justify-center"
            :class="`bg-${themeColor}-100 dark:bg-${themeColor}-900/30`"
          >
            <UIcon :name="chatbot.chatbot.icon" class="w-10 h-10" :class="`text-${themeColor}-500`" />
          </div>
          <h2 class="text-2xl font-bold">
            {{ chatbot.chatbot.name }}
          </h2>
          <p class="text-muted max-w-md mx-auto">
            {{ chatbot.chatbot.description }}
          </p>
        </div>

        <!-- Capabilities -->
        <div class="flex flex-wrap justify-center gap-2">
          <UBadge
            v-for="cap in chatbot.capabilities"
            :key="cap.slug"
            :color="themeColor"
            variant="subtle"
          >
            {{ cap.name }}
          </UBadge>
        </div>

        <!-- Chat Input -->
        <UChatPrompt
          v-model="input"
          :status="loading ? 'streaming' : 'ready'"
          variant="subtle"
          :placeholder="`Ask ${chatbot.chatbot.name} anything...`"
          @submit="onSubmit"
        >
          <UChatPromptSubmit :color="themeColor" />
        </UChatPrompt>

        <!-- Tool Count -->
        <p class="text-center text-xs text-muted">
          {{ chatbot.toolCount }} tools available
        </p>
      </div>
    </UContainer>
  </div>
</template>
