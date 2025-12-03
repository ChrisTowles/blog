import { ref } from 'vue'
import type Anthropic from '@anthropic-ai/sdk'

/**
 * Message type matching Anthropic SDK MessageParam
 */
export interface Message extends Anthropic.MessageParam {
  id: string
}

export type ChatStatus = 'idle' | 'streaming' | 'error'

export interface UseAnthropicChatOptions {
  id: string
  initialMessages?: Message[]
  model: Ref<string>
  onError?: (error: Error) => void
  onFinish?: (message: Message) => void
}

export interface SendMessageOptions {
  text: string
}

/**
 * Composable for managing Anthropic chat interactions
 * Handles streaming responses and message state management
 */
export function useAnthropicChat(options: UseAnthropicChatOptions) {
  const messages = ref<Message[]>(options.initialMessages ?? [])
  const status = ref<ChatStatus>('idle')
  const error = ref<Error | null>(null)
  const abortController = ref<AbortController | null>(null)

  async function sendMessage(opts: SendMessageOptions): Promise<void> {
    if (status.value === 'streaming') {
      throw new Error('Cannot send message while streaming')
    }

    // Add user message
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: opts.text
    }
    messages.value = [...messages.value, userMessage]

    await streamResponse()
  }

  async function regenerate(): Promise<void> {
    if (status.value === 'streaming') {
      throw new Error('Cannot regenerate while streaming')
    }

    // Remove last assistant message if present
    const lastMessage = messages.value[messages.value.length - 1]
    if (lastMessage?.role === 'assistant') {
      messages.value = messages.value.slice(0, -1)
    }

    await streamResponse()
  }

  async function streamResponse(): Promise<void> {
    status.value = 'streaming'
    error.value = null
    abortController.value = new AbortController()

    // Initialize assistant message
    const assistantMessage: Message = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: []
    }
    messages.value = [...messages.value, assistantMessage]

    try {
      const response = await fetch(`/api/chats/${options.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: options.model.value,
          messages: messages.value.map(m => ({
            role: m.role,
            content: m.content
          }))
        }),
        signal: abortController.value.signal
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const reader = response.body?.getReader()
      if (!reader) {
        throw new Error('Response body is null')
      }

      const decoder = new TextDecoder()
      let buffer = ''
      let contentBlocks: Anthropic.ContentBlock[] = []
      let currentTextBlock = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n\n')
        buffer = lines.pop() ?? ''

        for (const line of lines) {
          if (!line.trim() || !line.startsWith('data:')) continue

          const dataStr = line.slice(5).trim()
          if (!dataStr) continue

          try {
            const event = JSON.parse(dataStr) as StreamEvent

            if (event.type === 'content_block_delta' && event.delta?.type === 'text_delta') {
              currentTextBlock += event.delta.text

              const textBlock: Anthropic.TextBlock = {
                type: 'text',
                text: currentTextBlock
              }

              if (contentBlocks.length === 0 || contentBlocks[contentBlocks.length - 1]?.type !== 'text') {
                contentBlocks = [...contentBlocks, textBlock]
              } else {
                contentBlocks = [...contentBlocks.slice(0, -1), textBlock]
              }

              // Update message content reactively
              const currentMessage = messages.value[messages.value.length - 1]
              if (currentMessage) {
                messages.value = [
                  ...messages.value.slice(0, -1),
                  { ...currentMessage, content: contentBlocks }
                ]
              }
            } else if (event.type === 'message_stop') {
              const finalMessage = messages.value[messages.value.length - 1]
              if (finalMessage && options.onFinish) {
                options.onFinish(finalMessage)
              }
            } else if (event.type === 'error') {
              throw new Error(event.error?.message ?? 'Stream error')
            }
          } catch (parseError) {
            // Skip invalid JSON
            console.warn('Failed to parse stream event:', parseError)
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
      status.value = 'error'

      if (options.onError) {
        options.onError(errorObj)
      }

      throw errorObj
    } finally {
      abortController.value = null
    }
  }

  function stop(): void {
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

// Stream event types based on Anthropic SDK
interface StreamEvent {
  type: 'message_start' | 'content_block_start' | 'content_block_delta' | 'content_block_stop' | 'message_delta' | 'message_stop' | 'error'
  delta?: {
    type: 'text_delta'
    text: string
  }
  error?: {
    message: string
  }
}
