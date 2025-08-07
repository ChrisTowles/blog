/**
 * Cloudflare AI Service
 * Service layer for interacting with Cloudflare AI API
 */

import * as CloudflareTypes from '../cloudflare-ai-types.js'

type CloudflareAIRequest = CloudflareTypes.CloudflareAIRequest
type CloudflareAIResponse = CloudflareTypes.CloudflareAIResponse
type CloudflareAIStreamResponse = CloudflareTypes.CloudflareAIStreamResponse
type CloudflareCredentials = CloudflareTypes.CloudflareCredentials
const { CloudflareAIError, validateAIRequest } = CloudflareTypes

/**
 * Get Cloudflare credentials from environment variables
 */
export async function getCloudflareCredentials(): Promise<CloudflareCredentials> {
  const apiToken = process.env.CLOUDFLARE_API_TOKEN
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID

  if (!apiToken) {
    throw new CloudflareAIError(
      'CLOUDFLARE_API_TOKEN environment variable is required',
      400,
      'MISSING_TOKEN'
    )
  }

  if (!accountId) {
    throw new CloudflareAIError(
      'CLOUDFLARE_ACCOUNT_ID environment variable is required',
      400,
      'MISSING_ACCOUNT_ID'
    )
  }

  return {
    apiToken,
    accountId,
    baseUrl: process.env.CLOUDFLARE_API_BASE_URL || 'https://api.cloudflare.com/client/v4'
  }
}

/**
 * Invoke Cloudflare AI model using REST API
 */
export async function invokeCloudflareAI(
  credentials: CloudflareCredentials,
  modelName: string,
  request: CloudflareAIRequest
): Promise<CloudflareAIResponse> {
  // Validate request
  const validationErrors = validateAIRequest(request)
  if (validationErrors.length > 0) {
    throw new CloudflareAIError(
      `Request validation failed: ${validationErrors.join(', ')}`,
      400,
      'VALIDATION_ERROR'
    )
  }

  const url = `${credentials.baseUrl}/accounts/${credentials.accountId}/ai/run/${modelName}`

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${credentials.apiToken}`,
        'Content-Type': 'application/json',
        'User-Agent': 'Cloudflare-AI-Script/1.0'
      },
      body: JSON.stringify(request)
    })

    if (!response.ok) {
      let errorData: unknown = undefined
      try {
        errorData = await response.json()
      } catch {
        errorData = { message: await response.text() }
      }

      throw new CloudflareAIError(
        `API request failed: ${typeof errorData === 'object' && errorData && 'message' in errorData ? (errorData as { message?: string }).message : response.statusText}`,
        response.status,
        'API_ERROR',
        // @ts-expect-error - TypeScript doesn't know about the structure of errorData
        errorData.errors
      )
    }

    const result = await response.json() as CloudflareAIResponse

    if (!result.success && result.errors?.length > 0) {
      throw new CloudflareAIError(
        `API returned errors: ${result.errors.map(e => e.message).join(', ')}`,
        500,
        'API_ERROR',
        result.errors
      )
    }

    return result
  } catch (error) {
    if (error instanceof CloudflareAIError) {
      throw error
    }
    throw new CloudflareAIError(
      `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      500,
      'NETWORK_ERROR'
    )
  }
}

/**
 * Invoke Cloudflare AI model with streaming response
 */
export async function invokeCloudflareAIStream(
  credentials: CloudflareCredentials,
  modelName: string,
  request: CloudflareAIRequest,
  onChunk?: (chunk: string) => void
): Promise<string> {
  // Validate request
  const validationErrors = validateAIRequest(request)
  if (validationErrors.length > 0) {
    throw new CloudflareAIError(
      `Request validation failed: ${validationErrors.join(', ')}`,
      400,
      'VALIDATION_ERROR'
    )
  }

  const url = `${credentials.baseUrl}/accounts/${credentials.accountId}/ai/run/${modelName}`

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${credentials.apiToken}`,
        'Content-Type': 'application/json',
        'User-Agent': 'Cloudflare-AI-Script/1.0'
      },
      body: JSON.stringify({ ...request, stream: true })
    })

    if (!response.ok) {
      let errorData
      try {
        errorData = await response.json()
      } catch {
        errorData = { message: await response.text() }
      }

      throw new CloudflareAIError(

        // @ts-expect-error - TypeScript doesn't know about the structure of errorData
        `Streaming API request failed: ${errorData.message || response.statusText}`,
        response.status,
        'STREAMING_ERROR',
        // @ts-expect-error - TypeScript doesn't know about the structure of errorData
        errorData.errors
      )
    }

    if (!response.body) {
      throw new CloudflareAIError('No response body received for streaming', 500, 'NO_BODY')
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let fullResponse = ''

    try {
      while (true) {
        const { done, value } = await reader.read()

        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        const lines = chunk.split('\n').filter(line => line.trim())

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6)
            if (data === '[DONE]') continue

            try {
              const parsed = JSON.parse(data) as CloudflareAIStreamResponse

              if (!parsed.success && parsed.errors) {
                throw new CloudflareAIError(
                  `Streaming error: ${parsed.errors.map(e => e.message).join(', ')}`,
                  500,
                  'STREAMING_ERROR',
                  parsed.errors
                )
              }

              if (parsed.result?.response) {
                const responseChunk = parsed.result.response
                fullResponse += responseChunk
                if (onChunk) {
                  onChunk(responseChunk)
                } else {
                  process.stdout.write(responseChunk)
                }
              }
            } catch (error) {
              if (error instanceof CloudflareAIError) {
                throw error
              }
              console.error('Failed to parse streaming response:', error)
            }
          }
        }
      }

      return fullResponse
    } finally {
      reader.releaseLock()
    }
  } catch (error) {
    if (error instanceof CloudflareAIError) {
      throw error
    }
    throw new CloudflareAIError(
      `Streaming network error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      500,
      'STREAMING_NETWORK_ERROR'
    )
  }
}
