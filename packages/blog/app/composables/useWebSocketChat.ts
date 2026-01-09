import type { ChatMessage, ChatStatus, MessagePart, ToolUsePart, ToolResultPart } from '~~/shared/chat-types'
import type { WSServerMessage, WSClientMessage } from '~~/server/utils/ai/ws-types'

interface UseWebSocketChatOptions {
    id: string
    initialMessages?: ChatMessage[]
    model: Ref<string>
    onError?: (error: Error) => void
    onTitleUpdate?: () => void
}

interface ToolInvocation {
    toolCallId: string
    toolName: string
    args: Record<string, unknown>
    state: 'pending' | 'complete'
    result?: unknown
}

interface QueueStatus {
    runningTaskId: string | null
    queuedTaskIds: string[]
}

export function useWebSocketChat(options: UseWebSocketChatOptions) {
    const messages = ref<ChatMessage[]>(options.initialMessages || [])
    const status = ref<ChatStatus>('ready')
    const error = ref<Error | null>(null)
    const queueStatus = ref<QueueStatus>({ runningTaskId: null, queuedTaskIds: [] })

    let ws: WebSocket | null = null
    let currentTaskId: string | null = null
    let currentAssistantMessageId: string | null = null
    let currentTextPart: { type: 'text', text: string } | null = null
    let currentReasoningPart: { type: 'reasoning', text: string, state: 'streaming' | 'done' } | null = null
    let toolInvocations: ToolInvocation[] = []

    function getWebSocketUrl(): string {
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
        return `${protocol}//${window.location.host}/_ws`
    }

    function connect(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (ws?.readyState === WebSocket.OPEN) {
                resolve()
                return
            }

            ws = new WebSocket(getWebSocketUrl())

            ws.onopen = () => {
                resolve()
            }

            ws.onerror = (event) => {
                console.error('WebSocket error:', event)
                const err = new Error('WebSocket connection error')
                error.value = err
                options.onError?.(err)
                reject(err)
            }

            ws.onclose = () => {
                ws = null
                if (status.value === 'streaming') {
                    status.value = 'ready'
                }
            }

            ws.onmessage = (event) => {
                handleMessage(event.data)
            }
        })
    }

    function send(msg: WSClientMessage) {
        if (ws?.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify(msg))
        }
    }

    function handleMessage(data: string) {
        try {
            const event: WSServerMessage = JSON.parse(data)

            // Filter messages by chatId (except pong which has no chatId)
            if ('chatId' in event && event.chatId !== options.id) {
                return
            }

            switch (event.type) {
                case 'pong':
                    break

                case 'task_queued':
                    queueStatus.value = {
                        runningTaskId: queueStatus.value.runningTaskId,
                        queuedTaskIds: [...queueStatus.value.queuedTaskIds, event.taskId]
                    }
                    break

                case 'task_started':
                    currentTaskId = event.taskId
                    status.value = 'streaming'
                    queueStatus.value = {
                        runningTaskId: event.taskId,
                        queuedTaskIds: queueStatus.value.queuedTaskIds.filter(id => id !== event.taskId)
                    }
                    break

                case 'text':
                    if (event.taskId !== currentTaskId) return
                    if (!currentTextPart) {
                        currentTextPart = { type: 'text', text: '' }
                    }
                    currentTextPart.text += event.text
                    updateAssistantMessage()
                    break

                case 'reasoning':
                    if (event.taskId !== currentTaskId) return
                    if (!currentReasoningPart) {
                        currentReasoningPart = { type: 'reasoning', text: '', state: 'streaming' }
                    }
                    currentReasoningPart.text += event.text
                    updateAssistantMessage()
                    break

                case 'tool_start':
                    if (event.taskId !== currentTaskId) return
                    toolInvocations.push({
                        toolCallId: event.toolCallId,
                        toolName: event.tool,
                        args: event.args,
                        state: 'pending'
                    })
                    updateAssistantMessage()
                    break

                case 'tool_end':
                    if (event.taskId !== currentTaskId) return
                    const invocation = toolInvocations.find(t => t.toolCallId === event.toolCallId)
                    if (invocation) {
                        invocation.state = 'complete'
                        invocation.result = event.result
                    }
                    updateAssistantMessage()
                    break

                case 'task_done':
                    if (event.taskId !== currentTaskId) return
                    if (currentReasoningPart) {
                        currentReasoningPart.state = 'done'
                    }
                    updateAssistantMessage()
                    finishTask()
                    break

                case 'task_stopped':
                    if (event.taskId !== currentTaskId) return
                    if (currentReasoningPart) {
                        currentReasoningPart.state = 'done'
                    }
                    updateAssistantMessage()
                    finishTask()
                    break

                case 'error':
                    const err = new Error(event.error)
                    error.value = err
                    status.value = 'error'
                    options.onError?.(err)
                    finishTask()
                    break

                case 'title':
                    options.onTitleUpdate?.()
                    break

                case 'queue_status':
                    queueStatus.value = {
                        runningTaskId: event.runningTaskId,
                        queuedTaskIds: event.queuedTaskIds
                    }
                    break
            }
        } catch (e) {
            console.error('Error parsing WebSocket message:', e, data)
        }
    }

    function finishTask() {
        currentTaskId = null
        currentAssistantMessageId = null
        currentTextPart = null
        currentReasoningPart = null
        toolInvocations = []
        status.value = 'ready'
        queueStatus.value = {
            runningTaskId: null,
            queuedTaskIds: queueStatus.value.queuedTaskIds
        }
    }

    function updateAssistantMessage() {
        if (!currentAssistantMessageId) return

        const parts: MessagePart[] = []
        if (currentReasoningPart) parts.push(currentReasoningPart)

        for (const tool of toolInvocations) {
            const toolUsePart: ToolUsePart = {
                type: 'tool-use',
                toolName: tool.toolName,
                toolCallId: tool.toolCallId,
                args: tool.args
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

        if (currentTextPart) parts.push(currentTextPart)

        messages.value = messages.value.map((msg) => {
            if (msg.id === currentAssistantMessageId) {
                return { ...msg, parts }
            }
            return msg
        })
    }

    async function sendMessage(text: string) {
        error.value = null

        // Add user message
        const userMessage: ChatMessage = {
            id: crypto.randomUUID(),
            role: 'user',
            parts: [{ type: 'text', text }]
        }
        messages.value = [...messages.value, userMessage]

        // Add placeholder assistant message
        const assistantMessageId = crypto.randomUUID()
        const assistantMessage: ChatMessage = {
            id: assistantMessageId,
            role: 'assistant',
            parts: []
        }
        messages.value = [...messages.value, assistantMessage]
        currentAssistantMessageId = assistantMessageId

        // Reset streaming state
        currentTextPart = null
        currentReasoningPart = null
        toolInvocations = []

        try {
            await connect()
            send({
                type: 'send',
                chatId: options.id,
                content: text,
                model: options.model.value
            })
        } catch (err) {
            console.error('Failed to send message:', err)
            error.value = err instanceof Error ? err : new Error('Failed to send message')
            status.value = 'error'
            options.onError?.(error.value)
        }
    }

    function stop() {
        if (currentTaskId) {
            send({
                type: 'stop',
                chatId: options.id,
                taskId: currentTaskId
            })
        }
    }

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

    function requestStatus() {
        send({
            type: 'status',
            chatId: options.id
        })
    }

    function disconnect() {
        ws?.close()
        ws = null
    }

    // Cleanup on unmount
    onUnmounted(() => {
        disconnect()
    })

    return {
        messages: computed(() => messages.value),
        status: computed(() => status.value),
        error: computed(() => error.value ?? undefined),
        queueStatus: computed(() => queueStatus.value),
        sendMessage,
        stop,
        regenerate,
        requestStatus,
        disconnect
    }
}
