import type { SSEEvent } from '~~/shared/chat-types'

// TODO: all of this file is likely a mistake and there are better ways to do this.
//       but for now, this works to adapt the Agent SDK streams to SSE for the blog chatbot.

/**
 * Agent SDK Message Types (simplified for our needs)
 */
export interface AgentSystemMessage {
  type: 'system'
  subtype: 'init'
  session_id: string
  tools: string[]
  model: string
}

export interface AgentAssistantMessage {
  type: 'assistant'
  uuid: string
  session_id: string
  message: {
    content: Array<{
      type: 'text' | 'tool_use' | 'thinking'
      text?: string
      thinking?: string
      id?: string
      name?: string
      input?: unknown
    }>
    stop_reason: 'end_turn' | 'tool_use' | 'max_tokens'
  }
}

export interface AgentUserMessage {
  type: 'user'
  session_id: string
  message: {
    role: 'user'
    content: string | Array<{ type: 'text', text: string }>
  }
}

export interface AgentResultMessage {
  type: 'result'
  subtype: 'success' | 'error_max_turns' | 'error_during_execution' | 'error_max_budget_usd'
  session_id: string
  is_error: boolean
  result: string
  total_cost_usd: number
  num_turns: number
}

export interface AgentStreamEvent {
  type: 'stream_event'
  event: {
    type: string
    index?: number
    delta?: {
      type: string
      text?: string
      thinking?: string
      partial_json?: string
    }
    content_block?: {
      type: string
      id?: string
      name?: string
    }
  }
}

export type AgentMessage
  = | AgentSystemMessage
    | AgentAssistantMessage
    | AgentUserMessage
    | AgentResultMessage
    | AgentStreamEvent

/**
 * State for tracking tool calls during streaming
 */
interface StreamState {
  currentToolId: string | null
  currentToolName: string | null
  toolInputJson: string
  reasoningText: string
  fullText: string
}

/**
 * Callbacks for stream processing
 */
export interface StreamCallbacks {
  onComplete?: (result: { text: string, reasoning: string }) => void
  onSessionId?: (sessionId: string) => void
}

/**
 * Convert Agent SDK messages to SSE events
 * Returns an async generator that yields SSE events
 */
export async function* adaptAgentToSSE(
  agentStream: AsyncIterable<AgentMessage>,
  callbacks?: StreamCallbacks
): AsyncGenerator<SSEEvent> {
  const state: StreamState = {
    currentToolId: null,
    currentToolName: null,
    toolInputJson: '',
    reasoningText: '',
    fullText: ''
  }

  let sessionIdCaptured = false

  for await (const message of agentStream) {
    // Capture session ID from the first message
    if (!sessionIdCaptured && 'session_id' in message && message.session_id) {
      callbacks?.onSessionId?.(message.session_id)
      sessionIdCaptured = true
    }

    const events = processMessage(message, state)
    for (const event of events) {
      yield event
    }
  }

  // Call completion callback with final text
  if (callbacks?.onComplete) {
    callbacks.onComplete({
      text: state.fullText,
      reasoning: state.reasoningText
    })
  }

  // Final done event
  yield { type: 'done', messageId: crypto.randomUUID() }
}

/**
 * Process a single Agent SDK message into SSE events
 */
function processMessage(message: AgentMessage, state: StreamState): SSEEvent[] {
  const events: SSEEvent[] = []

  switch (message.type) {
    case 'system':
      // System init - no SSE event needed
      break

    case 'assistant':
      // Process assistant response content blocks
      for (const block of message.message.content) {
        if (block.type === 'text' && block.text) {
          state.fullText += block.text
          events.push({ type: 'text', text: block.text })
        } else if (block.type === 'thinking' && block.thinking) {
          state.reasoningText += block.thinking
          events.push({ type: 'reasoning', text: block.thinking })
        } else if (block.type === 'tool_use' && block.id && block.name) {
          events.push({
            type: 'tool_start',
            tool: block.name,
            toolCallId: block.id,
            args: block.input as Record<string, unknown>
          })
        }
      }
      break

    case 'user':
      // User messages with tool results - extract tool results
      if (Array.isArray(message.message.content)) {
        for (const part of message.message.content) {
          const partObj = part as unknown as Record<string, unknown>
          if (partObj.type === 'tool_result' && typeof partObj.tool_use_id === 'string') {
            const toolUseId = partObj.tool_use_id
            const content = typeof partObj.content === 'string' ? partObj.content : JSON.stringify(partObj.content)
            // Parse the result if it's JSON
            let result: unknown
            try {
              result = JSON.parse(content)
            } catch {
              result = content
            }
            events.push({
              type: 'tool_end',
              tool: state.currentToolName || 'unknown',
              toolCallId: toolUseId,
              result
            })
          }
        }
      }
      break

    case 'stream_event':
      // Handle streaming events for incremental updates
      if (message.event.type === 'content_block_start') {
        const block = message.event.content_block
        if (block?.type === 'tool_use') {
          state.currentToolId = block.id || null
          state.currentToolName = block.name || null
          state.toolInputJson = ''
        }
      } else if (message.event.type === 'content_block_delta') {
        const delta = message.event.delta
        if (delta?.type === 'text_delta' && delta.text) {
          state.fullText += delta.text
          events.push({ type: 'text', text: delta.text })
        } else if (delta?.type === 'thinking_delta' && delta.thinking) {
          state.reasoningText += delta.thinking
          events.push({ type: 'reasoning', text: delta.thinking })
        } else if (delta?.type === 'input_json_delta' && delta.partial_json) {
          state.toolInputJson += delta.partial_json
        }
      } else if (message.event.type === 'content_block_stop') {
        if (state.currentToolId && state.currentToolName) {
          // Parse accumulated tool input
          let toolArgs: Record<string, unknown> = {}
          try {
            if (state.toolInputJson) {
              toolArgs = JSON.parse(state.toolInputJson)
            }
          } catch {
            // Invalid JSON, use empty args
          }
          events.push({
            type: 'tool_start',
            tool: state.currentToolName,
            toolCallId: state.currentToolId,
            args: toolArgs
          })
          state.currentToolId = null
          state.currentToolName = null
          state.toolInputJson = ''
        }
      }
      break

    case 'result':
      // Result message - check for errors
      if (message.is_error) {
        events.push({ type: 'error', error: message.result })
      }
      break
  }

  return events
}

/**
 * Send SSE event to stream controller
 */
export function sendSSE(controller: ReadableStreamDefaultController, event: SSEEvent) {
  const encoder = new TextEncoder()
  controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`))
}
