export function useModels() {
  const config = useRuntimeConfig()
  const models = [
    // Anthropic Claude Models
    config.public.model,
    config.public.model_fast
  ]

  const defaultModel = config.public.model_fast
  const model = useCookie<string>('model', { default: () => defaultModel })

  // if model not valid, use the default model
  if (!models.includes(model.value)) {
    model.value = defaultModel
  }

  return {
    models,
    model
  }
}
