/**
 * Comprehensive type definitions for Cloudflare AI API
 */

// Core message types
export interface AIMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
  name?: string
}

// Request configuration
export interface CloudflareAIRequest {
  messages: AIMessage[]
  max_tokens?: number
  temperature?: number
  top_p?: number
  top_k?: number
  seed?: number
  stream?: boolean
  raw?: boolean
}

// Response types
export interface CloudflareAIResponse {
  result: {
    response: string
    tool_calls?: ToolCall[]
  }
  success: boolean
  errors: CloudflareError[]
  messages: string[]
}

export interface CloudflareAIStreamResponse {
  result: {
    response: string
    p?: string
    tool_calls?: ToolCall[]
  }
  success: boolean
  errors?: CloudflareError[]
}

// Error handling
export interface CloudflareError {
  code: number
  message: string
  type?: string
}

export class CloudflareAIError extends Error {
  code?: number
  type?: string
  errors?: CloudflareError[]

  constructor(message: string, code?: number, type?: string, errors?: CloudflareError[]) {
    super(message)
    this.name = 'CloudflareAIError'
    this.code = code
    this.type = type
    this.errors = errors
  }
}

// Tool calling support
export interface ToolCall {
  id: string
  type: 'function'
  function: {
    name: string
    arguments: string
  }
}

export interface Tool {
  type: 'function'
  function: {
    name: string
    description: string
    parameters: Record<string, unknown>
  }
}

// Model configurations
export interface ModelConfig {
  name: string
  maxTokens: number
  supportsFunctions: boolean
  supportsStreaming: boolean
  contextWindow: number
}

// Popular Cloudflare AI models
export const CLOUDFLARE_MODELS: Record<string, ModelConfig> = {
  'llama-3.1-8b': {
    name: '@cf/meta/llama-3.1-8b-instruct',
    maxTokens: 8192,
    supportsFunctions: true,
    supportsStreaming: true,
    contextWindow: 131072
  },
  'llama-3.1-70b': {
    name: '@cf/meta/llama-3.1-70b-instruct',
    maxTokens: 8192,
    supportsFunctions: true,
    supportsStreaming: true,
    contextWindow: 131072
  },
  'deepseek-math': {
    name: '@cf/deepseek-ai/deepseek-math-7b-instruct',
    maxTokens: 4096,
    supportsFunctions: false,
    supportsStreaming: true,
    contextWindow: 32768
  },
  'qwen-1.5-14b': {
    name: '@cf/qwen/qwen1.5-14b-chat-awq',
    maxTokens: 8192,
    supportsFunctions: false,
    supportsStreaming: true,
    contextWindow: 32768
  },
  'phi-2': {
    name: '@cf/microsoft/phi-2',
    maxTokens: 2048,
    supportsFunctions: false,
    supportsStreaming: true,
    contextWindow: 2048
  }
} as const

// Authentication types
export interface CloudflareCredentials {
  apiToken: string
  accountId: string
  baseUrl?: string
}

// Configuration types
export interface AIClientConfig {
  credentials: CloudflareCredentials
  defaultModel?: string
  timeout?: number
  retries?: number
  rateLimitPerSecond?: number
}

// Streaming types
export interface StreamOptions {
  onChunk?: (chunk: string) => void
  onComplete?: (fullResponse: string) => void
  onError?: (error: Error) => void
}

// Validation schemas
export const validateAIRequest = (request: CloudflareAIRequest): string[] => {
  const errors: string[] = []

  if (!request.messages || request.messages.length === 0) {
    errors.push('Messages array is required and must not be empty')
  }

  if (request.messages) {
    request.messages.forEach((message, index) => {
      if (!message.role || !['user', 'assistant', 'system'].includes(message.role)) {
        errors.push(`Message ${index}: Invalid role. Must be 'user', 'assistant', or 'system'`)
      }
      if (!message.content || message.content.trim() === '') {
        errors.push(`Message ${index}: Content is required and must not be empty`)
      }
    })
  }

  if (request.max_tokens !== undefined) {
    if (request.max_tokens < 1 || request.max_tokens > 8192) {
      errors.push('max_tokens must be between 1 and 8192')
    }
  }

  if (request.temperature !== undefined) {
    if (request.temperature < 0 || request.temperature > 2) {
      errors.push('temperature must be between 0 and 2')
    }
  }

  if (request.top_p !== undefined) {
    if (request.top_p < 0 || request.top_p > 1) {
      errors.push('top_p must be between 0 and 1')
    }
  }

  return errors
}

// Utility types
export type ModelName = keyof typeof CLOUDFLARE_MODELS
export type MessageRole = AIMessage['role']

// All types are already exported above - no need for re-export
