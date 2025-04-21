export function useLLM() {
  // to get list of models use the following line....
  //    npx wrangler  ai models --json | grep "name\": \"@cf" |    sed 's/\"name\": //g' | grep -E "micro|meta|openai|google|deep" |  sort
  const models = [
    '@cf/deepseek-ai/deepseek-math-7b-instruct',
    '@cf/deepseek-ai/deepseek-r1-distill-qwen-32b',
    '@cf/google/gemma-2b-it-lora',
    '@cf/google/gemma-3-12b-it',
    '@cf/google/gemma-7b-it-lora',
    '@cf/meta/llama-2-7b-chat-fp16',
    '@cf/meta/llama-2-7b-chat-int8',
    '@cf/meta/llama-3.1-8b-instruct',
    '@cf/meta/llama-3.1-8b-instruct-awq',
    '@cf/meta/llama-3.1-8b-instruct-fp8',
    '@cf/meta/llama-3.2-11b-vision-instruct',
    '@cf/meta/llama-3.2-1b-instruct',
    '@cf/meta/llama-3.2-3b-instruct',
    '@cf/meta/llama-3.3-70b-instruct-fp8-fast',
    '@cf/meta/llama-3-8b-instruct',
    '@cf/meta/llama-3-8b-instruct-awq',
    '@cf/meta/llama-4-scout-17b-16e-instruct',
    '@cf/meta/llama-guard-3-8b',
    '@cf/meta-llama/llama-2-7b-chat-hf-lora',
    '@cf/meta/m2m100-1.2b',
    '@cf/microsoft/phi-2',
    // '@cf/microsoft/resnet-50',
    '@cf/openai/whisper',
    '@cf/openai/whisper-large-v3-turbo',
    '@cf/openai/whisper-tiny-en'
  ]

  const model = useCookie<string>('llm-model', { default: () => '@cf/meta/llama-4-scout-17b-16e-instruct' })

  return {
    models,
    model
  }
}
