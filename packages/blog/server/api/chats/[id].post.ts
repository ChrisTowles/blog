import type { MessageParam } from '@anthropic-ai/sdk/resources/messages'
import { z } from 'zod'
import type { ChatMessage, MessagePart, SSEEvent } from '~~/shared/chat-types'

defineRouteMeta({
  openAPI: {
    description: 'Chat with AI.',
    tags: ['ai']
  }
})

const BASE_SYSTEM_PROMPT = `
**FORMATTING RULES (CRITICAL):**
- ABSOLUTELY NO MARKDOWN HEADINGS: Never use #, ##, ###, ####, #####, or ######
- NO underline-style headings with === or ---
- Use **bold text** for emphasis and section labels instead
- Start all responses with content, never with a heading

**RESPONSE QUALITY:**
- Be concise yet comprehensive
- Use examples when helpful
- Break down complex topics into digestible parts
- Maintain a friendly, professional tone`

function convertToAnthropicMessages(messages: ChatMessage[]): MessageParam[] {
  return messages.map((msg) => {
    const textContent = msg.parts
      .filter((p): p is { type: 'text', text: string } => p.type === 'text')
      .map(p => p.text)
      .join('\n')

    return {
      role: msg.role,
      content: textContent || ' '
    }
  })
}

function sendSSE(controller: ReadableStreamDefaultController, event: SSEEvent) {
  const encoder = new TextEncoder()
  controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`))
}

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)

  const config = useRuntimeConfig()
  const { id } = await getValidatedRouterParams(event, z.object({
    id: z.string()
  }).parse)

  const { model, messages, personaSlug, chatbotSlug } = await readValidatedBody(event, z.object({
    model: z.string(),
    messages: z.array(z.custom<ChatMessage>()),
    personaSlug: z.string().optional(),
    chatbotSlug: z.string().optional()
  }).parse)

  const db = useDrizzle()

  const chat = await db.query.chats.findFirst({
    where: (chat, { eq }) => and(eq(chat.id, id as string), eq(chat.userId, session.user?.id || session.id)),
    with: {
      messages: true
    }
  })

  if (!chat) {
    throw createError({ statusCode: 404, statusMessage: 'Chat not found' })
  }

  // Load persona and capabilities
  let loadedPersona
  try {
    loadedPersona = capabilityRegistry.loadPersona(personaSlug)
  } catch (error) {
    if (error instanceof Error && error.message.startsWith('Persona not found')) {
      throw createError({
        statusCode: 400,
        statusMessage: `Invalid persona: ${personaSlug}`
      })
    }
    throw error
  }

  let systemPrompt = loadedPersona.systemPrompt + '\n\n' + BASE_SYSTEM_PROMPT

  // Inject skills and custom system prompt when chatbot context available
  let enabledTools = loadedPersona.tools
  const knowledgeBaseFilters = loadedPersona.knowledgeBaseFilters

  if (chatbotSlug) {
    try {
      const chatbotConfig = await loadChatbotConfig(chatbotSlug)

      // Append skills to system prompt after capabilities
      if (chatbotConfig.skills.length > 0) {
        systemPrompt += '\n\n## Skills\n\n'
        for (const skill of chatbotConfig.skills) {
          systemPrompt += `### ${skill.name}\n${skill.content}\n\n`
        }
      }

      // Append custom system prompt if present
      if (chatbotConfig.customSystemPrompt) {
        systemPrompt += '\n\n' + chatbotConfig.customSystemPrompt
      }

      // Use tools from chatbot config if available
      if (chatbotConfig.tools.length > 0) {
        enabledTools = getToolsByNames(chatbotConfig.tools)
      }
    } catch (error) {
      console.warn(`Failed to load chatbot config for "${chatbotSlug}":`, error instanceof Error ? error.message : String(error))
      // Continue with default persona tools if chatbot config fails to load
    }
  }

  // Generate title if needed
  let generatedTitle: string | null = null
  if (!chat.title && messages.length > 0) {
    const client = getAnthropicClient()
    const titleResponse = await client.messages.create({
      model: config.public.model_fast as string,
      max_tokens: 50,
      system: `You are a title generator for a chat:
- Generate a short title based on the first user's message
- The title should be less than 30 characters long
- The title should be a summary of the user's message
- Do not use quotes (' or ") or colons (:) or any other punctuation
- Do not use markdown, just plain text`,
      messages: [{ role: 'user', content: JSON.stringify(messages[0]?.parts ?? '') }]
    })

    const titleContent = titleResponse.content[0]
    if (titleContent?.type === 'text') {
      generatedTitle = titleContent.text.slice(0, 30)
      await db.update(tables.chats).set({ title: generatedTitle }).where(eq(tables.chats.id, id as string))
    }
  }

  // Save the last user message
  const lastMessage = messages[messages.length - 1]
  if (lastMessage?.role === 'user' && messages.length > 1) {
    await db.insert(tables.messages).values({
      chatId: id as string,
      role: 'user',
      parts: lastMessage.parts
    })
  }

  // Create SSE stream
  const stream = new ReadableStream({
    async start(controller) {
      try {
        if (generatedTitle) {
          sendSSE(controller, { type: 'title', title: generatedTitle })
        }

        const client = getAnthropicClient()
        const anthropicMessages = convertToAnthropicMessages(messages)

        let fullText = ''
        let reasoningText = ''
        const messageId = crypto.randomUUID()
        let currentToolUseId: string | null = null
        let currentToolName: string | null = null
        let _toolInputJson = ''

        // Run up to 5 turns for tool use
        let turnCount = 0
        const maxTurns = 5
        let currentMessages = [...anthropicMessages]

        while (turnCount < maxTurns) {
          turnCount++

          const streamResponse = await client.messages.stream({
            model,
            max_tokens: 16000,
            system: systemPrompt,
            messages: currentMessages,
            tools: enabledTools,
            thinking: {
              type: 'enabled',
              budget_tokens: 4096
            }
          })

          let hasToolUse = false
          let turnThinking = '' // Track thinking for this turn only
          let turnThinkingSignature = '' // Track signature for this turn's thinking
          const toolResults: { type: 'tool_result', tool_use_id: string, content: string }[] = []
          const toolUses: { id: string, name: string, input: Record<string, unknown> }[] = []

          for await (const event of streamResponse) {
            if (event.type === 'content_block_start') {
              if (event.content_block.type === 'thinking') {
                // Extended thinking block starting
              } else if (event.content_block.type === 'tool_use') {
                currentToolUseId = event.content_block.id
                currentToolName = event.content_block.name
                _toolInputJson = ''
                hasToolUse = true
                // Will send tool_start after we have full args
              }
            } else if (event.type === 'content_block_delta') {
              if (event.delta.type === 'thinking_delta') {
                reasoningText += event.delta.thinking
                turnThinking += event.delta.thinking
                sendSSE(controller, { type: 'reasoning', text: event.delta.thinking })
              } else if (event.delta.type === 'signature_delta') {
                // Capture signature for thinking block (required when passing back to API)
                turnThinkingSignature += event.delta.signature
              } else if (event.delta.type === 'text_delta') {
                fullText += event.delta.text
                sendSSE(controller, { type: 'text', text: event.delta.text })
              } else if (event.delta.type === 'input_json_delta') {
                _toolInputJson += event.delta.partial_json
              }
            } else if (event.type === 'content_block_stop') {
              if (currentToolUseId && currentToolName) {
                // Parse tool input and execute tool
                let toolArgs: Record<string, unknown> = {}
                try {
                  if (_toolInputJson) {
                    toolArgs = JSON.parse(_toolInputJson)
                  }
                } catch (parseError) {
                  console.error('Failed to parse tool input JSON:', {
                    toolName: currentToolName,
                    toolUseId: currentToolUseId,
                    rawInput: _toolInputJson?.substring(0, 200),
                    error: parseError
                  })
                  toolResults.push({
                    type: 'tool_result',
                    tool_use_id: currentToolUseId!,
                    content: `Error: Failed to parse tool arguments`
                  })
                  currentToolUseId = null
                  currentToolName = null
                  _toolInputJson = ''
                  continue
                }

                // Track the tool use for message history
                toolUses.push({
                  id: currentToolUseId,
                  name: currentToolName,
                  input: toolArgs
                })

                // Notify client tool is starting with full args
                sendSSE(controller, {
                  type: 'tool_start',
                  tool: currentToolName,
                  toolCallId: currentToolUseId,
                  args: toolArgs
                })

                // Execute the tool
                const toolResult = await executeTool(currentToolName, toolArgs, knowledgeBaseFilters)
                toolResults.push({
                  type: 'tool_result',
                  tool_use_id: currentToolUseId,
                  content: JSON.stringify(toolResult)
                })

                // Notify client of tool result
                sendSSE(controller, {
                  type: 'tool_end',
                  tool: currentToolName,
                  toolCallId: currentToolUseId,
                  result: toolResult
                })

                currentToolUseId = null
                currentToolName = null
                _toolInputJson = ''
              }
            }
          }

          // If tool was used, continue the conversation
          if (hasToolUse && toolResults.length > 0) {
            // Add assistant's response to messages - must include thinking block with signature when extended thinking is enabled
            const assistantContent: Array<{ type: 'thinking', thinking: string, signature: string } | { type: 'text', text: string } | { type: 'tool_use', id: string, name: string, input: Record<string, unknown> }> = []
            // Thinking must come first in the content array (with signature for API verification)
            if (turnThinking && turnThinkingSignature) {
              assistantContent.push({ type: 'thinking', thinking: turnThinking, signature: turnThinkingSignature })
            }
            if (fullText) {
              assistantContent.push({ type: 'text', text: fullText })
            }
            // Add actual tool uses with correct names and inputs
            for (const toolUse of toolUses) {
              assistantContent.push({
                type: 'tool_use',
                id: toolUse.id,
                name: toolUse.name,
                input: toolUse.input
              })
            }

            currentMessages = [
              ...currentMessages,
              { role: 'assistant' as const, content: assistantContent.length > 0 ? assistantContent : [{ type: 'text' as const, text: ' ' }] },
              { role: 'user' as const, content: toolResults }
            ]

            // Reset for next turn
            fullText = ''
          } else {
            // No tool use, we're done
            break
          }
        }

        // Save assistant message to database
        const messageParts: MessagePart[] = []
        if (reasoningText) {
          messageParts.push({ type: 'reasoning', text: reasoningText, state: 'done' })
        }
        if (fullText) {
          messageParts.push({ type: 'text', text: fullText })
        }

        await db.insert(tables.messages).values({
          chatId: chat.id,
          role: 'assistant',
          parts: messageParts
        })

        sendSSE(controller, { type: 'done', messageId })
        controller.close()
      } catch (error) {
        console.error('Stream error:', error)
        const errorMessage = error instanceof Error ? error.message : 'Unknown error'
        sendSSE(controller, { type: 'error', error: errorMessage })
        controller.close()
      }
    }
  })

  setHeader(event, 'Content-Type', 'text/event-stream')
  setHeader(event, 'Cache-Control', 'no-cache')
  setHeader(event, 'Connection', 'keep-alive')

  return stream
})
