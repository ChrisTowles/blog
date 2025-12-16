import Anthropic from '@anthropic-ai/sdk'

let _client: Anthropic | null = null

export function getAnthropicClient(): Anthropic {
  if (!_client) {
    // const config = useRuntimeConfig()
    // had issues with useRuntimeConfig in this file, so parse from env directly
    const result = envSchema.parse(process.env)
    _client = new Anthropic({
      apiKey: result.ANTHROPIC_API_KEY
    })
  }
  return _client
}
