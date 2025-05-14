import { anthropic } from '@ai-sdk/anthropic'
import { generateText } from 'ai'
import { modelsList } from '~~/shared/models-list'

export const generateChatTitle = async ({ content }: { content: string }): Promise<string> => {
  const { text: title } = await generateText({

    model: anthropic(modelsList.default_model),
    messages: [
      {
        role: 'system',
        content: `You are a title generator for a chat:
        - Generate a short title based on the first user's message
        - The title should be less than 30 characters long
        - The title should be a summary of the user's message
        - Do not use markdown, just plain text`
      },
      {
        role: 'user',
        content: content
      }
    ]
  })

  return title
}
