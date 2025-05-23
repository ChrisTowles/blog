export interface ModelListResult {
  models: string[]
  default_model: string
}

//    npx wrangler  ai models --json | grep "name\": \"@cf" |    sed 's/\"name\": //g' | grep -E "micro|meta|openai|google|deep|qwen" |  sort
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
  // "@cf/microsoft/resnet-50",
  '@cf/openai/whisper',
  '@cf/openai/whisper-large-v3-turbo',
  // "@cf/openai/whisper-tiny-en",
  // "@cf/qwen/qwen1.5-0.5b-chat",
  // "@cf/qwen/qwen1.5-14b-chat-awq",
  // "@cf/qwen/qwen1.5-1.8b-chat",
  '@cf/qwen/qwen1.5-7b-chat-awq',
  '@cf/qwen/qwen2.5-coder-32b-instruct',
  '@cf/qwen/qwq-32b',
  '@cf/unum/uform-gen2-qwen-500m'

]

export const default_model = '@cf/meta/llama-4-scout-17b-16e-instruct'

export default defineEventHandler((): ModelListResult => {
  return {
    models: models,
    default_model: default_model
  }
})
