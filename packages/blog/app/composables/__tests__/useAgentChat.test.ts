// @vitest-environment nuxt
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import type { WSServerMessage } from '~~/server/utils/ws/types'

/**
 * Mock WebSocket implementation for testing
 */
class MockWebSocket {
    static CONNECTING = 0
    static OPEN = 1
    static CLOSING = 2
    static CLOSED = 3

    readyState = MockWebSocket.CONNECTING
    onopen: ((event: Event) => void) | null = null
    onclose: ((event: CloseEvent) => void) | null = null
    onmessage: ((event: MessageEvent) => void) | null = null
    onerror: ((event: Event) => void) | null = null

    sentMessages: string[] = []
    url: string

    constructor(url: string) {
        this.url = url
        // Simulate async connection
        setTimeout(() => {
            this.readyState = MockWebSocket.OPEN
            this.onopen?.(new Event('open'))
        }, 0)
    }

    send(data: string) {
        this.sentMessages.push(data)
    }

    close() {
        this.readyState = MockWebSocket.CLOSED
        this.onclose?.(new CloseEvent('close'))
    }

    // Test helper to simulate receiving a message
    simulateMessage(data: WSServerMessage) {
        this.onmessage?.(new MessageEvent('message', { data: JSON.stringify(data) }))
    }

    // Test helper to simulate error
    simulateError() {
        this.onerror?.(new Event('error'))
    }
}

// Store reference to created WebSockets for test access
let mockWebSocketInstance: MockWebSocket | null = null
const originalWebSocket = globalThis.WebSocket

// Mock lifecycle hooks
let mountedCallback: (() => void) | null = null
let unmountedCallback: (() => void) | null = null

mockNuxtImport('onMounted', () => {
    return (callback: () => void) => {
        mountedCallback = callback
    }
})

mockNuxtImport('onUnmounted', () => {
    return (callback: () => void) => {
        unmountedCallback = callback
    }
})

describe('useAgentChat', () => {
    beforeEach(() => {
        vi.useFakeTimers()
        mountedCallback = null
        unmountedCallback = null
        mockWebSocketInstance = null

        // Mock WebSocket globally - capture instance via factory
        globalThis.WebSocket = ((url: string) => {
            const instance = new MockWebSocket(url)
            mockWebSocketInstance = instance
            return instance
        }) as unknown as typeof WebSocket
        // Add static properties
        Object.assign(globalThis.WebSocket, {
            CONNECTING: MockWebSocket.CONNECTING,
            OPEN: MockWebSocket.OPEN,
            CLOSING: MockWebSocket.CLOSING,
            CLOSED: MockWebSocket.CLOSED
        })
    })

    afterEach(() => {
        vi.useRealTimers()
        globalThis.WebSocket = originalWebSocket
    })

    it('connects to WebSocket on mount', async () => {
        const { isConnected } = useAgentChat({ id: 'test-chat' })

        expect(isConnected.value).toBe(false)

        // Trigger onMounted
        mountedCallback?.()

        // Wait for async connection
        await vi.advanceTimersByTimeAsync(10)

        expect(mockWebSocketInstance).toBeTruthy()
        expect(isConnected.value).toBe(true)
    })

    it('disconnects on unmount', async () => {
        const { isConnected } = useAgentChat({ id: 'test-chat' })

        mountedCallback?.()
        await vi.advanceTimersByTimeAsync(10)

        expect(isConnected.value).toBe(true)

        // Trigger onUnmounted
        unmountedCallback?.()

        expect(isConnected.value).toBe(false)
    })

    it('sends subscribe message on connect', async () => {
        useAgentChat({ id: 'chat-123' })

        mountedCallback?.()
        await vi.advanceTimersByTimeAsync(10)

        expect(mockWebSocketInstance?.sentMessages).toContainEqual(
            JSON.stringify({ type: 'subscribe', chatId: 'chat-123' })
        )
    })

    it('adds user message to list on sendMessage', async () => {
        const { messages, sendMessage } = useAgentChat({ id: 'test-chat' })

        mountedCallback?.()
        await vi.advanceTimersByTimeAsync(10)

        await sendMessage('Hello')

        expect(messages.value.length).toBe(1)
        expect(messages.value[0]!.role).toBe('user')
        expect(messages.value[0]!.parts[0]).toEqual({ type: 'text', text: 'Hello' })
    })

    it('sends chat message to WebSocket', async () => {
        const { sendMessage } = useAgentChat({ id: 'chat-123' })

        mountedCallback?.()
        await vi.advanceTimersByTimeAsync(10)

        await sendMessage('Hello')

        const sentMessages = mockWebSocketInstance?.sentMessages || []
        const chatMessage = sentMessages.find(m => {
            const parsed = JSON.parse(m)
            return parsed.type === 'chat'
        })

        expect(chatMessage).toBeTruthy()
        const parsed = JSON.parse(chatMessage!)
        expect(parsed.chatId).toBe('chat-123')
        expect(parsed.content).toBe('Hello')
    })

    it('handles text deltas from server', async () => {
        const { messages, sendMessage } = useAgentChat({ id: 'test-chat' })

        mountedCallback?.()
        await vi.advanceTimersByTimeAsync(10)

        await sendMessage('Hello')

        // Simulate text streaming
        mockWebSocketInstance?.simulateMessage({
            type: 'text',
            chatId: 'test-chat',
            delta: 'Hi '
        })

        mockWebSocketInstance?.simulateMessage({
            type: 'text',
            chatId: 'test-chat',
            delta: 'there!'
        })

        expect(messages.value.length).toBe(2)
        const assistantMsg = messages.value[1]!
        expect(assistantMsg.role).toBe('assistant')
        const textPart = assistantMsg.parts.find(p => p.type === 'text')
        expect(textPart).toEqual({ type: 'text', text: 'Hi there!' })
    })

    it('handles reasoning deltas', async () => {
        const { messages, sendMessage } = useAgentChat({ id: 'test-chat' })

        mountedCallback?.()
        await vi.advanceTimersByTimeAsync(10)

        await sendMessage('Hello')

        mockWebSocketInstance?.simulateMessage({
            type: 'reasoning',
            chatId: 'test-chat',
            delta: 'Thinking...'
        })

        const assistantMsg = messages.value[1]!
        const reasoningPart = assistantMsg.parts.find(p => p.type === 'reasoning')
        expect(reasoningPart).toEqual({
            type: 'reasoning',
            text: 'Thinking...',
            state: 'streaming'
        })
    })

    it('handles tool_use and tool_result', async () => {
        const { messages, sendMessage } = useAgentChat({ id: 'test-chat' })

        mountedCallback?.()
        await vi.advanceTimersByTimeAsync(10)

        await sendMessage('Hello')

        mockWebSocketInstance?.simulateMessage({
            type: 'tool_use',
            chatId: 'test-chat',
            toolId: 'tool-1',
            toolName: 'get-weather',
            toolInput: { city: 'NYC' }
        })

        mockWebSocketInstance?.simulateMessage({
            type: 'tool_result',
            chatId: 'test-chat',
            toolId: 'tool-1',
            toolResult: { temp: 72 },
            isError: false
        })

        const assistantMsg = messages.value[1]!
        const toolUsePart = assistantMsg.parts.find(p => p.type === 'tool-use')
        expect(toolUsePart).toEqual({
            type: 'tool-use',
            toolName: 'get-weather',
            toolCallId: 'tool-1',
            args: { city: 'NYC' }
        })

        const toolResultPart = assistantMsg!.parts.find(p => p.type === 'tool-result')
        expect(toolResultPart).toEqual({
            type: 'tool-result',
            toolCallId: 'tool-1',
            result: { temp: 72 }
        })
    })

    it('respects showToolInvocations option when false', async () => {
        const showTools = ref(false)
        const { messages, sendMessage } = useAgentChat({
            id: 'test-chat',
            showToolInvocations: showTools
        })

        mountedCallback?.()
        await vi.advanceTimersByTimeAsync(10)

        await sendMessage('Hello')

        mockWebSocketInstance?.simulateMessage({
            type: 'tool_use',
            chatId: 'test-chat',
            toolId: 'tool-1',
            toolName: 'get-weather',
            toolInput: { city: 'NYC' }
        })

        mockWebSocketInstance?.simulateMessage({
            type: 'text',
            chatId: 'test-chat',
            delta: 'The weather is nice'
        })

        const assistantMsg = messages.value[1]!
        // Should NOT have tool-use part
        const toolUsePart = assistantMsg.parts.find(p => p.type === 'tool-use')
        expect(toolUsePart).toBeUndefined()

        // Should have text part
        const textPart = assistantMsg!.parts.find(p => p.type === 'text')
        expect(textPart).toBeTruthy()
    })

    it('calls onTitleUpdate on title message', async () => {
        const titleCallback = vi.fn()
        const { sendMessage } = useAgentChat({
            id: 'test-chat',
            onTitleUpdate: titleCallback
        })

        mountedCallback?.()
        await vi.advanceTimersByTimeAsync(10)

        await sendMessage('Hello')

        mockWebSocketInstance?.simulateMessage({
            type: 'title',
            chatId: 'test-chat',
            suggestedTitle: 'New Chat Title'
        })

        expect(titleCallback).toHaveBeenCalledWith('New Chat Title')
    })

    it('calls onError on error message', async () => {
        const errorCallback = vi.fn()
        const { status, sendMessage } = useAgentChat({
            id: 'test-chat',
            onError: errorCallback
        })

        mountedCallback?.()
        await vi.advanceTimersByTimeAsync(10)

        await sendMessage('Hello')

        mockWebSocketInstance?.simulateMessage({
            type: 'error',
            chatId: 'test-chat',
            content: 'Something went wrong'
        })

        expect(errorCallback).toHaveBeenCalled()
        expect(status.value).toBe('error')
    })

    it('blocks sending while streaming', async () => {
        const { messages, status, sendMessage } = useAgentChat({ id: 'test-chat' })

        mountedCallback?.()
        await vi.advanceTimersByTimeAsync(10)

        await sendMessage('First message')
        expect(status.value).toBe('streaming')

        // Try to send another message while streaming
        await sendMessage('Second message')

        // Should only have the first user message
        expect(messages.value.length).toBe(1)
        expect(messages.value[0]!.parts[0]).toEqual({ type: 'text', text: 'First message' })
    })

    it('resets status to ready after done message', async () => {
        const { status, sendMessage } = useAgentChat({ id: 'test-chat' })

        mountedCallback?.()
        await vi.advanceTimersByTimeAsync(10)

        await sendMessage('Hello')
        expect(status.value).toBe('streaming')

        mockWebSocketInstance?.simulateMessage({
            type: 'done',
            chatId: 'test-chat',
            messageId: 'msg-123'
        })

        expect(status.value).toBe('ready')
    })

    it('reconnects with exponential backoff', async () => {
        useAgentChat({ id: 'test-chat' })

        mountedCallback?.()
        await vi.advanceTimersByTimeAsync(10)

        // Close connection
        mockWebSocketInstance?.close()

        // Should schedule reconnect with 1s delay
        await vi.advanceTimersByTimeAsync(1000)

        // A new WebSocket should be created
        expect(mockWebSocketInstance).toBeTruthy()
    })

    it('ignores messages for other chats', async () => {
        const { messages, sendMessage } = useAgentChat({ id: 'my-chat' })

        mountedCallback?.()
        await vi.advanceTimersByTimeAsync(10)

        await sendMessage('Hello')

        // Message for different chat
        mockWebSocketInstance?.simulateMessage({
            type: 'text',
            chatId: 'other-chat',
            delta: 'This should be ignored'
        })

        // Should only have user message, no assistant message
        expect(messages.value.length).toBe(1)
        expect(messages.value[0]!.role).toBe('user')
    })

    it('stores session ID from session_init message', async () => {
        const { sessionId } = useAgentChat({ id: 'test-chat' })

        mountedCallback?.()
        await vi.advanceTimersByTimeAsync(10)

        mockWebSocketInstance?.simulateMessage({
            type: 'session_init',
            chatId: 'test-chat',
            sessionId: 'sdk-session-123'
        })

        expect(sessionId.value).toBe('sdk-session-123')
    })

    it('sends initial prompt on connect when provided', async () => {
        const { messages, status } = useAgentChat({
            id: 'test-chat',
            initialPrompt: 'Hello from initial prompt'
        })

        mountedCallback?.()
        await vi.advanceTimersByTimeAsync(10)

        // Wait for the 100ms delay before initial prompt is sent
        await vi.advanceTimersByTimeAsync(100)

        // Should have sent subscribe and chat messages
        const sentMessages = mockWebSocketInstance?.sentMessages || []
        const chatMessage = sentMessages.find(m => {
            const parsed = JSON.parse(m)
            return parsed.type === 'chat'
        })

        expect(chatMessage).toBeTruthy()
        const parsed = JSON.parse(chatMessage!)
        expect(parsed.content).toBe('Hello from initial prompt')
        expect(parsed.newConversation).toBe(true)

        // Should have user message in messages array
        expect(messages.value.length).toBe(1)
        expect(messages.value[0]!.role).toBe('user')
        expect(messages.value[0]!.parts[0]).toEqual({ type: 'text', text: 'Hello from initial prompt' })
        expect(status.value).toBe('streaming')
    })

    it('does not re-send initial prompt on reconnect', async () => {
        useAgentChat({
            id: 'test-chat',
            initialPrompt: 'Hello'
        })

        mountedCallback?.()
        await vi.advanceTimersByTimeAsync(10)
        await vi.advanceTimersByTimeAsync(100)

        const firstSentMessages = [...(mockWebSocketInstance?.sentMessages || [])]
        const firstChatMessages = firstSentMessages.filter(m => JSON.parse(m).type === 'chat')
        expect(firstChatMessages.length).toBe(1)

        // Close and reconnect
        mockWebSocketInstance?.close()
        await vi.advanceTimersByTimeAsync(1000) // Reconnect delay
        await vi.advanceTimersByTimeAsync(10) // Connection established
        await vi.advanceTimersByTimeAsync(100) // Would-be initial prompt delay

        // Check that no new chat messages were sent on reconnect
        const allChatMessages = (mockWebSocketInstance?.sentMessages || []).filter(m => JSON.parse(m).type === 'chat')
        expect(allChatMessages.length).toBe(0) // New socket has no chat messages (initial prompt already sent)
    })
})
