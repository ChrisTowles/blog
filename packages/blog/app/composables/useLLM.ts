import { modelsList } from '~~/shared/models-list'

export function useLLM() {
  const model = useCookie<string>('llm-model', { default: () => modelsList.default_model })

  const modelNames = modelsList.models.map(model => model.name)
  // ensure the selected model is in the list of models
  if (modelNames.indexOf(model.value) == -1) {
    model.value = modelsList.default_model
  }

  return {
    models: modelNames,
    model
  }
}
