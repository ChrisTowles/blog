import type Anthropic from '@anthropic-ai/sdk'

/**
 * Message type extending Anthropic SDK with UI metadata
 */
export interface Message extends Anthropic.MessageParam {
  id: string
}

/**
 * Convert messages to Anthropic SDK format (strips out id)
 */
export function convertToAnthropicMessages(messages: Message[]): Anthropic.MessageParam[] {
  return messages.map(({ id, ...msg }) => msg)
}

/**
 * Generate a chat title from the first user message
 */
export async function generateChatTitle(
  client: Anthropic,
  firstMessage: string,
  model: string
): Promise<string> {
  const params: Anthropic.MessageCreateParams = {
    max_tokens: 1024,
    system: `You are a title generator for a chat:
        - Generate a short title based on the first user's message
        - The title should be less than 30 characters long
        - The title should be a summary of the user's message
        - Do not use quotes (' or ") or colons (:) or any other punctuation
        - Do not use markdown, just plain text`,
    messages: [{ role: 'user', content: firstMessage }],
    model
  }

  const response = await client.messages.create(params)

  // Extract text from content blocks
  const title = response.content
    .filter(block => block.type === 'text')
    .map(block => block.type === 'text' ? block.text : '')
    .join('')
    .trim()

  return title
}

/**
 * Format SSE event data
 */
export function formatSSEEvent(data: { type: string, text?: string, message?: string }): string {
  return `data: ${JSON.stringify(data)}\n\n`
}

/**
 * Process Anthropic stream chunk and return formatted SSE event if applicable
 */
export function processStreamChunk(chunk: Anthropic.MessageStreamEvent): string | null {
  if (chunk.type === 'content_block_delta') {
    if (chunk.delta.type === 'text_delta') {
      return formatSSEEvent({ type: 'text', text: chunk.delta.text })
    }
  }
  return null
}

/**
 * Extract text content from Anthropic content blocks or params
 */
export function extractTextFromContent(
  content: Anthropic.ContentBlock[] | Anthropic.ContentBlockParam[]
): string {
  return content
    .filter(block => block.type === 'text')
    .map(block => block.type === 'text' ? block.text : '')
    .join('')
}
