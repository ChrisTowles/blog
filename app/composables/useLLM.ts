export function useLLM() {
  // to get list of models use the following line....
  //    npx wrangler  ai models --json | grep "name\": \"@cf" |    sed 's/\"name\": //g' | grep -E "micro|meta|openai|google|deep" |  sort
  const models = [
    '@cf/deepseek-ai/deepseek-math-7b-instruct',
    '@cf/deepseek-ai/deepseek-r1-distill-qwen-32b',
    '@cf/google/gemma-3-12b-it',
    '@cf/google/gemma-7b-it-lora',
    '@cf/meta/llama-3.2-11b-vision-instruct',
    '@cf/meta/llama-3.2-1b-instruct',
    '@cf/meta/llama-3.2-3b-instruct',
    '@cf/meta/llama-3.3-70b-instruct-fp8-fast',
    '@cf/meta/llama-4-scout-17b-16e-instruct',
    '@cf/meta/llama-guard-3-8b',
    '@cf/meta-llama/llama-2-7b-chat-hf-lora',
    '@cf/meta/m2m100-1.2b',
    '@cf/microsoft/phi-2',
    '@cf/defog/sqlcoder-7b-2',
    // '@cf/microsoft/resnet-50',
    '@cf/openai/whisper',
    '@cf/openai/whisper-large-v3-turbo',
    '@cf/openai/whisper-tiny-en'
  ]

  const default_model = '@cf/meta/llama-4-scout-17b-16e-instruct' 

  const model = useCookie<string>('llm-model', { default: () => default_model })

  // ensure the selected model is in the list of models
  if (models.indexOf(model.value) == -1) {
    model.value = default_model
  }

  return {
    models,
    model
  }
}
