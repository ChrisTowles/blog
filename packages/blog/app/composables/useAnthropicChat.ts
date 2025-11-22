import { ref } from 'vue'

export interface MessagePart {
  type: 'text' | 'tool-call' | 'tool-result'
  text?: string
  toolCallId?: string
  toolName?: string
  args?: Record<string, unknown>
  result?: unknown
  isError?: boolean
}

export interface Message {
  id: string
  role: 'user' | 'assistant'
  parts: MessagePart[]
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
  let currentParts: MessagePart[] = []
  let currentTextPart = ''
  let currentToolCall: Partial<MessagePart> | null = null
  let currentToolJson = ''

  async function sendMessage(content: { text: string }) {
    if (status.value === 'streaming') return

    // Add user message
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      parts: [{ type: 'text', text: content.text }]
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
    currentParts = []
    currentTextPart = ''
    currentToolCall = null
    currentToolJson = ''

    const assistantMessage: Message = {
      id: currentMessageId,
      role: 'assistant',
      parts: []
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
          if (!line.trim()) continue

          const eventMatch = line.match(/^event: (.+)\ndata: (.+)$/)
          if (eventMatch && eventMatch[1] && eventMatch[2]) {
            const [, eventType, dataStr] = eventMatch
            const data = JSON.parse(dataStr)

            handleEvent(eventType, data)
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

  function handleEvent(eventType: string, data: unknown) {
    const currentMessage = messages.value[messages.value.length - 1]
    if (!currentMessage) return

    switch (eventType) {
      case 'text-delta': {
        const { delta } = data as { delta: string }
        currentTextPart += delta

        // Update current text part in real-time
        const textPartIndex = currentParts.findIndex(p => p.type === 'text' && !p.text)
        if (textPartIndex >= 0) {
          currentParts[textPartIndex] = { type: 'text', text: currentTextPart }
        } else {
          currentParts.push({ type: 'text', text: currentTextPart })
        }

        currentMessage.parts = [...currentParts]
        break
      }

      case 'tool-call-start': {
        const { toolCallId, toolName } = data as { toolCallId: string, toolName: string }

        // Finalize current text part if any
        if (currentTextPart) {
          currentTextPart = ''
        }

        currentToolCall = {
          type: 'tool-call',
          toolCallId,
          toolName,
          args: {}
        }
        currentToolJson = ''
        break
      }

      case 'tool-call-delta': {
        const { delta } = data as { delta: string }
        currentToolJson += delta
        break
      }

      case 'tool-execute': {
        const { toolName } = data as { toolCallId: string, toolName: string }

        // Finalize tool call
        if (currentToolCall && currentToolJson) {
          try {
            currentToolCall.args = JSON.parse(currentToolJson)
          } catch {
            currentToolCall.args = {}
          }

          currentParts.push(currentToolCall as MessagePart)
          currentMessage.parts = [...currentParts]
        }

        // Show tool execution status
        currentParts.push({
          type: 'text',
          text: `\n\n_Using tool: ${toolName}_\n\n`
        })
        currentMessage.parts = [...currentParts]

        currentToolCall = null
        currentToolJson = ''
        break
      }

      case 'tool-result': {
        const { toolCallId, toolName, result } = data as { toolCallId: string, toolName: string, result: string }

        currentParts.push({
          type: 'tool-result',
          toolCallId,
          toolName,
          result
        })

        // Show result to user
        currentParts.push({
          type: 'text',
          text: `**Result:** ${result}\n\n`
        })

        currentMessage.parts = [...currentParts]
        break
      }

      case 'done': {
        if (currentTextPart) {
          currentTextPart = ''
        }
        if (options.onData) {
          options.onData({ type: 'data-chat-title' })
        }
        break
      }

      case 'error': {
        const { message } = data as { message: string }
        error.value = new Error(message)
        if (options.onError) {
          options.onError(error.value)
        }
        break
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
