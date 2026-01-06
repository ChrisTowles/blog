/**
 * WebSocket-based chat composable for Agent SDK integration.
 *
 * Replaces useChat with real-time bidirectional communication.
 */
import type { ChatMessage, ChatStatus, MessagePart, ToolUsePart, ToolResultPart } from '~~/shared/chat-types'
import type { WSClientMessage, WSServerMessage } from '~~/server/utils/ws/types'

interface UseAgentChatOptions {
    id: string
    initialMessages?: ChatMessage[]
    initialPrompt?: string
    onError?: (error: Error) => void
    onTitleUpdate?: (title: string) => void
    showToolInvocations?: Ref<boolean>
}

interface ToolInvocation {
    toolCallId: string
    toolName: string
    args: unknown
    state: 'pending' | 'complete'
    result?: unknown
    isError?: boolean
}

export function useAgentChat(options: UseAgentChatOptions) {
    const messages = ref<ChatMessage[]>(options.initialMessages || [])
    const status = ref<ChatStatus>('ready')
    const error = ref<Error | null>(null)
    const isConnected = ref(false)
    const sessionId = ref<string | null>(null)

    // WebSocket connection
    const wsUrl = computed(() => {
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
        return `${protocol}//${window.location.host}/_ws/chat`
    })

    let ws: WebSocket | null = null
    let reconnectTimeout: ReturnType<typeof setTimeout> | null = null
    let reconnectAttempts = 0
    const maxReconnectAttempts = 5

    // Current streaming state
    let currentAssistantMessageId: string | null = null
    let currentTextContent = ''
    let currentReasoningContent = ''
    let currentReasoningState: 'streaming' | 'done' = 'streaming'
    const toolInvocations: ToolInvocation[] = []

    // Track if initial prompt has been sent
    let initialPromptSent = false

    /**
     * Connect to WebSocket
     */
    function connect() {
        if (ws?.readyState === WebSocket.OPEN) return

        ws = new WebSocket(wsUrl.value)

        ws.onopen = () => {
            console.log('[useAgentChat] Connected')
            isConnected.value = true
            reconnectAttempts = 0

            // Subscribe to the chat
            send({ type: 'subscribe', chatId: options.id })

            // Send initial prompt if provided (after small delay to ensure subscription)
            if (options.initialPrompt && !initialPromptSent) {
                initialPromptSent = true
                setTimeout(() => {
                    sendMessage(options.initialPrompt!, true)
                }, 100)
            }
        }

        ws.onmessage = (event) => {
            try {
                const message: WSServerMessage = JSON.parse(event.data)
                handleMessage(message)
            }
            catch (e) {
                console.error('[useAgentChat] Error parsing message:', e)
            }
        }

        ws.onclose = () => {
            console.log('[useAgentChat] Disconnected')
            isConnected.value = false

            // Reconnect with exponential backoff
            if (reconnectAttempts < maxReconnectAttempts) {
                const delay = Math.min(1000 * Math.pow(2, reconnectAttempts), 30000)
                reconnectTimeout = setTimeout(() => {
                    reconnectAttempts++
                    connect()
                }, delay)
            }
        }

        ws.onerror = (event) => {
            console.error('[useAgentChat] WebSocket error:', event)
            error.value = new Error('WebSocket connection error')
            options.onError?.(error.value)
        }
    }

    /**
     * Disconnect from WebSocket
     */
    function disconnect() {
        if (reconnectTimeout) {
            clearTimeout(reconnectTimeout)
            reconnectTimeout = null
        }

        if (ws) {
            // Unsubscribe before closing
            if (ws.readyState === WebSocket.OPEN) {
                send({ type: 'unsubscribe', chatId: options.id })
            }
            ws.close()
            ws = null
        }

        isConnected.value = false
    }

    /**
     * Send a message to the WebSocket
     */
    function send(message: WSClientMessage) {
        if (ws?.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify(message))
        }
        else {
            console.warn('[useAgentChat] WebSocket not connected')
        }
    }

    /**
     * Handle incoming WebSocket message
     */
    function handleMessage(message: WSServerMessage) {
        // Ignore messages for other chats
        if ('chatId' in message && message.chatId !== options.id) return

        switch (message.type) {
            case 'pong':
                // Connection confirmed
                break

            case 'session_init':
                sessionId.value = message.sessionId
                break

            case 'text':
                ensureAssistantMessage()
                if (message.delta) {
                    currentTextContent += message.delta
                }
                else if (message.content) {
                    currentTextContent = message.content
                }
                updateAssistantMessage()
                break

            case 'reasoning':
                ensureAssistantMessage()
                if (message.delta) {
                    currentReasoningContent += message.delta
                }
                else if (message.content) {
                    currentReasoningContent = message.content
                }
                updateAssistantMessage()
                break

            case 'tool_use':
                ensureAssistantMessage()
                toolInvocations.push({
                    toolCallId: message.toolId,
                    toolName: message.toolName,
                    args: message.toolInput,
                    state: 'pending'
                })
                updateAssistantMessage()
                break

            case 'tool_result':
                ensureAssistantMessage()
                const invocation = toolInvocations.find(t => t.toolCallId === message.toolId)
                if (invocation) {
                    invocation.state = 'complete'
                    invocation.result = message.toolResult
                    invocation.isError = message.isError
                }
                updateAssistantMessage()
                break

            case 'title':
                options.onTitleUpdate?.(message.suggestedTitle)
                break

            case 'done':
                currentReasoningState = 'done'
                updateAssistantMessage()
                // Reset streaming state
                currentAssistantMessageId = null
                currentTextContent = ''
                currentReasoningContent = ''
                currentReasoningState = 'streaming'
                toolInvocations.length = 0
                status.value = 'ready'
                break

            case 'error':
                error.value = new Error(message.content)
                options.onError?.(error.value)
                status.value = 'error'
                break
        }
    }

    /**
     * Ensure an assistant message exists for streaming
     */
    function ensureAssistantMessage() {
        if (currentAssistantMessageId) return

        currentAssistantMessageId = crypto.randomUUID()
        const assistantMessage: ChatMessage = {
            id: currentAssistantMessageId,
            role: 'assistant',
            parts: []
        }
        messages.value = [...messages.value, assistantMessage]
    }

    /**
     * Update the current assistant message with accumulated content
     */
    function updateAssistantMessage() {
        if (!currentAssistantMessageId) return

        const parts: MessagePart[] = []
        const showTools = options.showToolInvocations?.value ?? true

        // Add reasoning part
        if (currentReasoningContent) {
            parts.push({
                type: 'reasoning',
                text: currentReasoningContent,
                state: currentReasoningState
            })
        }

        // Add tool use and result parts (if enabled)
        if (showTools) {
            for (const tool of toolInvocations) {
                const toolUsePart: ToolUsePart = {
                    type: 'tool-use',
                    toolName: tool.toolName,
                    toolCallId: tool.toolCallId,
                    args: tool.args as Record<string, unknown>
                }
                parts.push(toolUsePart)

                if (tool.state === 'complete' && tool.result !== undefined) {
                    const toolResultPart: ToolResultPart = {
                        type: 'tool-result',
                        toolCallId: tool.toolCallId,
                        result: tool.result
                    }
                    parts.push(toolResultPart)
                }
            }
        }

        // Add text part
        if (currentTextContent) {
            parts.push({
                type: 'text',
                text: currentTextContent
            })
        }

        messages.value = messages.value.map((msg) => {
            if (msg.id === currentAssistantMessageId) {
                return { ...msg, parts }
            }
            return msg
        })
    }

    /**
     * Send a chat message
     */
    async function sendMessage(text: string, newConversation = false) {
        if (status.value === 'streaming') return
        if (!isConnected.value) {
            error.value = new Error('Not connected to chat server')
            options.onError?.(error.value)
            return
        }

        // Add user message
        const userMessage: ChatMessage = {
            id: crypto.randomUUID(),
            role: 'user',
            parts: [{ type: 'text', text }]
        }
        messages.value = [...messages.value, userMessage]

        status.value = 'streaming'
        error.value = null

        // Send to WebSocket
        send({
            type: 'chat',
            chatId: options.id,
            content: text,
            newConversation
        })
    }

    /**
     * Stop the current response
     */
    function stop() {
        // TODO: Implement cancel message support in WebSocket handler
        status.value = 'ready'
    }

    /**
     * Regenerate the last response
     */
    async function regenerate() {
        if (messages.value.length === 0) return

        // If last message is from assistant, remove it
        if (messages.value[messages.value.length - 1]?.role === 'assistant') {
            messages.value = messages.value.slice(0, -1)
        }

        // Get the last user message
        const lastUserMsg = messages.value.findLast(m => m.role === 'user')
        if (!lastUserMsg) return

        // Remove the last user message and re-send it
        messages.value = messages.value.slice(0, -1)
        const textPart = lastUserMsg.parts.find(p => p.type === 'text')
        if (textPart && 'text' in textPart) {
            await sendMessage(textPart.text)
        }
    }

    // Auto-connect on mount
    onMounted(() => {
        connect()
    })

    // Auto-disconnect on unmount
    onUnmounted(() => {
        disconnect()
    })

    return {
        messages: computed(() => messages.value),
        status: computed(() => status.value),
        error: computed(() => error.value ?? undefined),
        isConnected: computed(() => isConnected.value),
        sessionId: computed(() => sessionId.value),
        sendMessage,
        stop,
        regenerate,
        connect,
        disconnect
    }
}
