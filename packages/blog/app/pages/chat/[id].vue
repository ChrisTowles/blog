<script setup lang="ts">
import type { DefineComponent } from 'vue'
import { useClipboard } from '@vueuse/core'
import type { ChatMessage } from '~~/shared/chat-types'
import ProseStreamPre from '../../components/prose/PreStream.vue'

definePageMeta({
  layout: 'chat-side-nav'
})

const components = {
  pre: ProseStreamPre as unknown as DefineComponent
}

const route = useRoute()
const toast = useToast()
const clipboard = useClipboard()
const { model } = useModels()

const { data } = await useFetch(`/api/chats/${route.params.id}`, { cache: 'force-cache' })

if (!data.value) {
  throw createError({ statusCode: 404, statusMessage: 'Chat not found', fatal: true })
}

const input = ref('')

// Convert API messages to ChatMessage format (dates are serialized)
const initialMessages: ChatMessage[] = (data.value.messages || []).map(msg => ({
  id: msg.id,
  role: msg.role as 'user' | 'assistant',
  parts: msg.parts as ChatMessage['parts'],
  createdAt: msg.createdAt ? new Date(msg.createdAt) : undefined
}))

const chat = useChat({
  id: data.value.id,
  initialMessages,
  model,
  onError(error) {
    console.error('Chat error:', error.message)
    toast.add({
      description: error.message,
      icon: 'i-lucide-alert-circle',
      color: 'error',
      duration: 0
    })
  },
  onTitleUpdate() {
    refreshNuxtData('chats')
  }
})

function handleSubmit(e: Event) {
  e.preventDefault()
  if (input.value.trim()) {
    console.log('Sending message:', input.value)
    chat.sendMessage(input.value)
    input.value = ''
  }
}

const copied = ref(false)

function getTextFromMessage(message: ChatMessage): string {
  return message.parts
    .filter(p => p.type === 'text')
    .map(p => 'text' in p ? p.text : '')
    .join('\n')
}

function copy(e: MouseEvent, message: ChatMessage) {
  clipboard.copy(getTextFromMessage(message))
  copied.value = true

  setTimeout(() => {
    copied.value = false
  }, 2000)
}

function getPartKey(messageId: string, part: unknown, index: number) {
  const hasState = part && typeof part === 'object' && 'state' in part
  return `${messageId}-${part && typeof part === 'object' && 'type' in part ? part.type : 'unknown'}-${index}${hasState ? `-${(part as { state: string }).state}` : ''}`
}

onMounted(() => {
  if (data.value?.messages?.length === 1) {
    chat.regenerate()
  }
})
</script>

<template>
  <UDashboardPanel id="chat" class="relative" :ui="{ body: 'p-0 sm:p-0' }">
    <template #header>
      <DashboardNavbar />
    </template>

    <template #body>
      <!-- https://ui.nuxt.com/docs/components/chat-messages -->

      <UContainer>
        <!-- {{ chat.messages }} -->
        <UChatMessages
          should-auto-scroll
          :messages="chat.messages.value"
          :status="chat.status.value"
          :assistant="chat.status.value !== 'streaming' ? { actions: [{ label: 'Copy', icon: copied ? 'i-lucide-copy-check' : 'i-lucide-copy', onClick: copy }] } : { actions: [] }"
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
            <ModelSelect v-model="model" />
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
