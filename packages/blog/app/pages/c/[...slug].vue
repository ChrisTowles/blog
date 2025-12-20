<script setup lang="ts">
import { extractErrorMessage } from '~~/shared/error-util'

const route = useRoute()
const toast = useToast()

// Extract slug from dynamic route
const slug = Array.isArray(route.params.slug)
  ? route.params.slug.join('/')
  : route.params.slug

// Fetch chatbot configuration
const { data: chatbotConfig, error: configError } = await useFetch(`/api/chatbots/${slug}`)

// Handle errors
if (configError.value || !chatbotConfig.value) {
  throw createError({ statusCode: 404, statusMessage: 'Chatbot not found', fatal: true })
}

const chatbot = chatbotConfig.value

// Redirect if chatbot is inactive
if (!chatbot.chatbot.isActive) {
  navigateTo('/chat')
}

// Set page meta with chatbot name
useHead({
  title: chatbot.chatbot.name,
  meta: [
    {
      name: 'description',
      content: chatbot.chatbot.description
    }
  ]
})

const input = ref('')
const loading = ref(false)

// Use chatbot's persona slug
const personaSlug = ref(chatbot.persona.slug)

// Fetch persona system prompt for display
const { data: personaData } = await useFetch(
  () => `/api/personas/${personaSlug.value}`,
  { immediate: true }
)

const showSystemPrompt = ref(false)

// Theme colors - use fixed set to avoid Nuxt UI color validation issues
const themeColor = computed(() => {
  const color = chatbot.chatbot.theme.primaryColor || 'blue'
  // Map to valid Nuxt UI colors, fallback to blue
  const validColors = ['slate', 'gray', 'zinc', 'neutral', 'stone', 'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose']
  return validColors.includes(color) ? color : 'blue'
})

async function createChat(prompt: string) {
  if (loading.value) return
  if (!prompt.trim()) return

  loading.value = true

  try {
    const chat = await $fetch('/api/chats', {
      method: 'POST',
      body: {
        input: prompt,
        personaSlug: personaSlug.value
      }
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

// Suggested prompts based on chatbot
const suggestedPrompts = [
  `Tell me about ${chatbot.chatbot.name}`,
  `What can you help me with?`,
  `Show me an example of what you can do`,
  `What are your capabilities?`
]
</script>

<template>
  <div class="min-h-screen bg-default">
    <!-- Header -->
    <header class="border-b border-default sticky top-0 z-50">
      <UContainer class="flex items-center justify-between h-16">
        <div class="flex items-center gap-3">
          <div
            class="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
            :class="`bg-${themeColor}-100 dark:bg-${themeColor}-900/30`"
          >
            <UIcon
              :name="chatbot.persona.icon || 'i-lucide-message-circle'"
              class="w-6 h-6"
              :class="`text-${themeColor}-500`"
            />
          </div>
          <div>
            <h1 class="text-lg font-semibold">
              {{ chatbot.chatbot.name }}
            </h1>
            <p class="text-xs text-muted line-clamp-1">
              {{ chatbot.chatbot.description }}
            </p>
          </div>
        </div>
        <UButton
          to="/chat"
          variant="ghost"
          icon="i-lucide-arrow-left"
          label="Back"
          size="sm"
        />
      </UContainer>
    </header>

    <!-- Main Content -->
    <UContainer class="py-8 sm:py-12">
      <div class="max-w-3xl mx-auto space-y-8">
        <!-- Welcome Section -->
        <div class="text-center space-y-4">
          <div
            class="w-20 h-20 rounded-full mx-auto flex items-center justify-center"
            :class="`bg-${themeColor}-100 dark:bg-${themeColor}-900/30`"
          >
            <UIcon
              :name="chatbot.persona.icon || 'i-lucide-message-circle'"
              class="w-10 h-10"
              :class="`text-${themeColor}-500`"
            />
          </div>
          <div>
            <h2 class="text-2xl sm:text-3xl font-bold">
              {{ chatbot.chatbot.name }}
            </h2>
            <p class="text-muted max-w-md mx-auto">
              {{ chatbot.chatbot.description }}
            </p>
          </div>
        </div>

        <!-- Capabilities -->
        <div v-if="chatbot.capabilities.length > 0" class="flex flex-wrap justify-center gap-2">
          <UBadge
            v-for="cap in chatbot.capabilities"
            :key="cap.slug"
            color="primary"
            variant="subtle"
          >
            {{ cap.name }}
          </UBadge>
        </div>

        <!-- System Prompt (collapsible) -->
        <div v-if="personaData?.systemPrompt" class="space-y-2">
          <UButton
            :icon="showSystemPrompt ? 'i-lucide-chevron-down' : 'i-lucide-chevron-right'"
            variant="ghost"
            color="neutral"
            size="sm"
            @click="showSystemPrompt = !showSystemPrompt"
          >
            View System Prompt
          </UButton>
          <UCard v-if="showSystemPrompt" :ui="{ body: 'p-3 sm:p-4' }">
            <pre class="text-xs text-gray-600 dark:text-gray-400 whitespace-pre-wrap font-mono overflow-auto max-h-96">{{ personaData.systemPrompt }}</pre>
          </UCard>
        </div>

        <!-- Chat Input -->
        <div class="space-y-4">
          <UChatPrompt
            v-model="input"
            :status="loading ? 'streaming' : 'ready'"
            variant="subtle"
            :placeholder="`Ask ${chatbot.chatbot.name}...`"
            @submit="onSubmit"
          >
            <UChatPromptSubmit color="primary" />
          </UChatPrompt>

          <!-- Suggested Prompts -->
          <div class="flex flex-wrap gap-2 justify-center">
            <UButton
              v-for="prompt in suggestedPrompts"
              :key="prompt"
              :label="prompt"
              size="sm"
              color="primary"
              variant="outline"
              class="rounded-full text-xs"
              :disabled="loading"
              @click="input = prompt"
            />
          </div>
        </div>

        <!-- Info Footer -->
        <div class="text-center space-y-2 text-xs text-muted">
          <p>
            {{ chatbot.capabilities.length }} {{ chatbot.capabilities.length === 1 ? 'capability' : 'capabilities' }} available
          </p>
          <p v-if="!chatbot.chatbot.isPublic" class="text-warning-600 dark:text-warning-400">
            This chatbot is not publicly listed
          </p>
        </div>
      </div>
    </UContainer>
  </div>
</template>
