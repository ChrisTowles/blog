export function useModels() {
  const config = useRuntimeConfig()
  const models = [
    // Anthropic Claude Models
    config.model_fast,
    config.model
  ]

  const model = useCookie<string>('model', { default: () => config.model_fast })

  return {
    models,
    model
  }
}
