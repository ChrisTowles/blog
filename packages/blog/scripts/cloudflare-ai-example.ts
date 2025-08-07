#!/usr/bin/env tsx

/**
 * TypeScript script that demonstrates using the Cloudflare AI API
 * to invoke AI models using the REST API endpoint
 */

import { config } from 'dotenv'
import * as CloudflareTypes from './cloudflare-ai-types.js'
import { getCloudflareCredentials, invokeCloudflareAI, invokeCloudflareAIStream } from './service/cloudflare-ai-service.js'

type CloudflareAIRequest = CloudflareTypes.CloudflareAIRequest
const { CloudflareAIError, CLOUDFLARE_MODELS } = CloudflareTypes

config({ path: '.env' })

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
    const streamRequest: CloudflareAIRequest = {
      messages: [
        {
          role: 'user',
          content: 'Write a haiku about TypeScript programming.'
        }
      ],
      max_tokens: 150,
      temperature: 0.8
    }

    console.log('Streaming response:')
    const fullStreamResponse = await invokeCloudflareAIStream(credentials, modelName, streamRequest)

    console.log('Streaming response:')
    console.log(fullStreamResponse)

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
    let chunkCount = 0
    const customStreamRequest: CloudflareAIRequest = {
      messages: [
        {
          role: 'user',
          content: 'List 3 benefits of using TypeScript.'
        }
      ],
      max_tokens: 200,
      temperature: 0.5
    }

    const customResponse = await invokeCloudflareAIStream(
      credentials,
      modelName,
      customStreamRequest,
      (chunk) => {
        chunkCount++
        console.log(`[Chunk ${chunkCount}]: ${chunk}`)
      }
    )
    console.log('Custom streaming response:')
    console.log(customResponse)
    console.log(`\n✅ Custom streaming completed with ${chunkCount} chunks`)

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

// Re-export service functions for backward compatibility
export {
  getCloudflareCredentials,
  invokeCloudflareAI,
  invokeCloudflareAIStream
} from './service/cloudflare-ai-service.js'

// Run main function if script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main()
}
