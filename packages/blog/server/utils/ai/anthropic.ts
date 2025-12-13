import Anthropic from '@anthropic-ai/sdk'

let _client: Anthropic | null = null

export function getAnthropicClient(): Anthropic {
  if (!_client) {
    const config = useRuntimeConfig()
    _client = new Anthropic({
      apiKey: config.anthropicApiKey as string
    })
  }
  return _client
}
