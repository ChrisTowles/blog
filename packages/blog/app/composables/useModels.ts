export function useModels() {
  const models = [
    // Anthropic Claude Models
    'claude-sonnet-4',
    'claude-sonnet-3.7',
    'claude-sonnet-3.5',
    'claude-haiku-3.5',
    'claude-opus-4'
  ]

  const model = useCookie<string>('model', { default: () => 'claude-sonnet-3.5' })

  return {
    models,
    model
  }
}
