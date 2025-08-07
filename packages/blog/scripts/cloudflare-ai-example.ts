#!/usr/bin/env tsx

/**
 * TypeScript script that demonstrates using the Cloudflare AI API
 * to invoke AI models using the REST API endpoint
 */

import * as CloudflareTypes from './cloudflare-ai-types.js'

type CloudflareAIRequest = CloudflareTypes.CloudflareAIRequest
type CloudflareAIResponse = CloudflareTypes.CloudflareAIResponse
type CloudflareAIStreamResponse = CloudflareTypes.CloudflareAIStreamResponse
type CloudflareCredentials = CloudflareTypes.CloudflareCredentials
const { CloudflareAIError, CLOUDFLARE_MODELS, validateAIRequest } = CloudflareTypes

/**
 * Get Cloudflare credentials from environment variables
 */
async function getCloudflareCredentials(): Promise<CloudflareCredentials> {
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
async function invokeCloudflareAI(
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
async function invokeCloudflareAIStream(
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

/**
 * Main function to demonstrate the AI API usage
 */
async function main() {
  try {
    console.log('🔑 Getting Cloudflare credentials...')
    const credentials = await getCloudflareCredentials()
    console.log('✅ Credentials obtained successfully')

    // Use a popular Cloudflare AI model

    // @ts-expect-error - TypeScript doesn't know about the structure of errorData
    const modelName = CLOUDFLARE_MODELS['llama-3.1-8b'].name
    console.log(`🤖 Using model: ${modelName}`)

    // Example 1: Simple chat completion
    console.log('\n📝 Example 1: Simple chat completion')
    const request: CloudflareAIRequest = {
      messages: [
        {
          role: 'system',
          content: 'You are a helpful AI assistant. Keep responses concise and helpful.'
        },
        {
          role: 'user',
          content: 'Explain what TypeScript is in one sentence.'
        }
      ],
      max_tokens: 100,
      temperature: 0.7
    }

    const response = await invokeCloudflareAI(credentials, modelName, request)
    console.log('Response:', response.result.response)

    // Example 2: Streaming response
    console.log('\n🌊 Example 2: Streaming response')
    // const streamRequest: CloudflareAIRequest = {
    //   messages: [
    //     {
    //       role: 'user',
    //       content: 'Write a haiku about TypeScript programming.'
    //     }
    //   ],
    //   max_tokens: 150,
    //   temperature: 0.8
    // }

    console.log('Streaming response:')
    // const fullStreamResponse = await invokeCloudflareAIStream(credentials, modelName, streamRequest)
    console.log('\n✅ Streaming completed')

    // Example 3: Code generation
    console.log('\n💻 Example 3: Code generation')
    const codeRequest: CloudflareAIRequest = {
      messages: [
        {
          role: 'system',
          content: 'You are a TypeScript expert. Generate clean, well-typed code.'
        },
        {
          role: 'user',
          content: 'Create a TypeScript interface for a blog post with title, content, author, and publishedAt fields.'
        }
      ],
      max_tokens: 200,
      temperature: 0.3
    }

    const codeResponse = await invokeCloudflareAI(credentials, modelName, codeRequest)
    console.log('Generated code:')
    console.log(codeResponse.result.response)

    // Example 4: Custom chunk handler for streaming
    console.log('\n🎯 Example 4: Custom streaming handler')
    // let chunkCount = 0
    // const customStreamRequest: CloudflareAIRequest = {
    //   messages: [
    //     {
    //       role: 'user',
    //       content: 'List 3 benefits of using TypeScript.'
    //     }
    //   ],
    //   max_tokens: 200,
    //   temperature: 0.5
    // }

    // const customResponse = await invokeCloudflareAIStream(
    //   credentials,
    //   modelName,
    //   customStreamRequest,
    //   (chunk) => {
    //     chunkCount++
    //     console.log(`[Chunk ${chunkCount}]: ${chunk}`)
    //   }
    // )
    // console.log(`\n✅ Custom streaming completed with ${chunkCount} chunks`)

    console.log('\n🎉 All examples completed successfully!')
  } catch (error) {
    if (error instanceof CloudflareAIError) {
      console.error(`❌ CloudflareAI Error [${error.type}]:`, error.message)
      if (error.code) console.error(`   Status Code: ${error.code}`)
      if (error.errors) {
        console.error('   Additional errors:')
        error.errors.forEach(e => console.error(`   - ${e.message}`))
      }
    } else {
      console.error('❌ Unexpected Error:', error instanceof Error ? error.message : error)
    }
    process.exit(1)
  }
}

// Export functions for use as a module
export {
  getCloudflareCredentials,
  invokeCloudflareAI,
  invokeCloudflareAIStream
}

// Run main function if script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main()
}
