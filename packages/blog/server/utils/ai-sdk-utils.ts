import { createWorkersAI, WorkersAI } from 'workers-ai-provider'
import { Ai } from '@cloudflare/workers-types/experimental'

export const generateChatTitle = async ({ content, gateway }: { content: string, gateway: GatewayOptions }): Promise<string> => {
  // @ts-expect-error - response is not typed
  const { response: title } = await hubAI().run('@cf/meta/llama-3.3-70b-instruct-fp8-fast', {
    stream: false,
    messages: [{
      role: 'system',
      content: `You are a title generator for a chat:
     - Generate a short title based on the first user's message
     - The title should be less than 30 characters long
     - The title should be a summary of the user's message
     - Do not use markdown, just plain text`
    }, {
      role: 'user',
      content: content
    }]
  }, {
    gateway: gateway
  })
  return title
}

export interface AiWorkersSetupResult {
  gateway: GatewayOptions
  workersAi: WorkersAI
  hubAi: any
}

export const setupAIWorkers = (): AiWorkersSetupResult => {
  // Enable AI Gateway if defined in environment variables
  if (!process.env.CLOUDFLARE_AI_GATEWAY_ID) {
    throw new Error('CLOUDFLARE_AI_GATEWAY_ID is not defined')
  }

  const gateway: GatewayOptions = {
    id: process.env.CLOUDFLARE_AI_GATEWAY_ID,
    cacheTtl: 60 * 60 * 24 // 24 hours
  }
  const hubAi = hubAI() as Ai

  const workersAI = createWorkersAI({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    binding: hubAi as any,
    gateway: gateway,
  })
  return { gateway, workersAi: workersAI, hubAi: hubAi }
}
