import { ref } from 'vue'
import type Anthropic from '@anthropic-ai/sdk'

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: Anthropic.ContentBlock[]
}

export type ChatStatus = 'idle' | 'streaming' | 'awaiting-message'

export interface UseAnthropicChatOptions {
  id: string
  initialMessages: Message[]
  model: Ref<string>
  onError?: (error: Error) => void
  onData?: (data: unknown) => void
}

export function useAnthropicChat(options: UseAnthropicChatOptions) {
  const messages = ref<Message[]>(options.initialMessages)
  const status = ref<ChatStatus>('idle')
  const error = ref<Error | null>(null)
  const abortController = ref<AbortController | null>(null)

  let currentMessageId = ''
  let currentContent: Anthropic.ContentBlock[] = []
  let currentTextBlock = ''

  async function sendMessage(content: { text: string }) {
    if (status.value === 'streaming') return

    // Add user message
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: [{
        type: 'text',
        text: content.text,
        citations: null
      }]
    }
    messages.value.push(userMessage)

    // Start streaming assistant response
    await streamResponse()
  }

  async function regenerate() {
    if (status.value === 'streaming') return

    // Remove last assistant message if present
    if (messages.value[messages.value.length - 1]?.role === 'assistant') {
      messages.value.pop()
    }

    await streamResponse()
  }

  async function streamResponse() {
    status.value = 'streaming'
    error.value = null
    abortController.value = new AbortController()

    // Initialize new assistant message
    currentMessageId = crypto.randomUUID()
    currentContent = []
    currentTextBlock = ''

    const assistantMessage: Message = {
      id: currentMessageId,
      role: 'assistant',
      content: []
    }
    messages.value.push(assistantMessage)

    try {
      const response = await fetch(`/api/chats/${options.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: options.model.value,
          messages: messages.value
        }),
        signal: abortController.value.signal
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      if (!reader) {
        throw new Error('No response body')
      }

      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()

        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n\n')
        buffer = lines.pop() || ''

        for (const line of lines) {
          if (!line.trim() || !line.startsWith('data:')) continue

          const dataStr = line.slice(5).trim()
          try {
            const data = JSON.parse(dataStr)
            handleEvent(data)
          } catch (e) {
            // Skip invalid JSON
          }
        }
      }

      status.value = 'idle'
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        status.value = 'idle'
        return
      }

      const errorObj = err instanceof Error ? err : new Error('Unknown error')
      error.value = errorObj
      status.value = 'idle'

      if (options.onError) {
        options.onError(errorObj)
      }
    } finally {
      abortController.value = null
    }
  }

  function handleEvent(data: { type: string; text?: string; message?: string }) {
    const currentMessage = messages.value[messages.value.length - 1]
    if (!currentMessage) return

    if (data.type === 'text' && data.text) {
      // Accumulate text
      currentTextBlock += data.text

      // Update content with current text block
      const textBlock: Anthropic.TextBlock = {
        type: 'text',
        text: currentTextBlock,
        citations: null
      }

      if (currentContent.length === 0 || currentContent[currentContent.length - 1]?.type !== 'text') {
        currentContent.push(textBlock)
      } else {
        currentContent[currentContent.length - 1] = textBlock
      }

      currentMessage.content = [...currentContent]
    } else if (data.type === 'done') {
      if (options.onData) {
        options.onData({ type: 'done' })
      }
    } else if (data.type === 'error' && data.message) {
      error.value = new Error(data.message)
      if (options.onError) {
        options.onError(error.value)
      }
    }
  }

  function stop() {
    if (abortController.value) {
      abortController.value.abort()
      abortController.value = null
      status.value = 'idle'
    }
  }

  return {
    messages,
    status,
    error,
    sendMessage,
    regenerate,
    stop
  }
}
