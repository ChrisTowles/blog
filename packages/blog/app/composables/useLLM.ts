export function useLLM() {
  // to get list of models use the following line....
  //    npx wrangler  ai models --json | grep "name\": \"@cf" |    sed 's/\"name\": //g' | grep -E "micro|meta|openai|google|deep" |  sort

//    npx wrangler  ai models --json | grep "name\": \"@cf" |    sed 's/\"name\": //g' | grep -E "micro|meta|openai|google|deep|qwen" |  sort
const models = [
  '@cf/deepseek-ai/deepseek-math-7b-instruct',
  '@cf/deepseek-ai/deepseek-r1-distill-qwen-32b',
  '@cf/meta/llama-3.2-1b-instruct',
  '@cf/meta/llama-3.2-3b-instruct',
  '@cf/meta/llama-3.3-70b-instruct-fp8-fast',
  '@cf/meta/llama-3-8b-instruct',
  '@cf/meta/llama-3-8b-instruct-awq',
  '@cf/meta/llama-4-scout-17b-16e-instruct',
  '@cf/meta/llama-guard-3-8b',
  '@cf/meta-llama/llama-2-7b-chat-hf-lora',
  // "@cf/microsoft/resnet-50",
  // "@cf/openai/whisper-tiny-en",
  // "@cf/qwen/qwen1.5-0.5b-chat",
  // "@cf/qwen/qwen1.5-14b-chat-awq",
  // "@cf/qwen/qwen1.5-1.8b-chat",
  '@cf/qwen/qwen1.5-7b-chat-awq',
  '@cf/qwen/qwen2.5-coder-32b-instruct',
  '@cf/qwen/qwq-32b',
  '@cf/unum/uform-gen2-qwen-500m'

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
