#!/usr/bin/env tsx

/**
 * Test script to validate Cloudflare AI setup without making actual API calls
 */

import * as CloudflareTypes from './cloudflare-ai-types.js'
import { getCloudflareCredentials } from './cloudflare-ai-example.js'

type CloudflareAIRequest = CloudflareTypes.CloudflareAIRequest
// type CloudflareCredentials = CloudflareTypes.CloudflareCredentials
const { CLOUDFLARE_MODELS, validateAIRequest, CloudflareAIError } = CloudflareTypes

/**
 * Test credential validation
 */
async function testCredentialValidation() {
  console.log('🧪 Testing credential validation...')

  // Test missing environment variables
  const originalToken = process.env.CLOUDFLARE_API_TOKEN
  const originalAccountId = process.env.CLOUDFLARE_ACCOUNT_ID

  // Clear environment variables
  delete process.env.CLOUDFLARE_API_TOKEN
  delete process.env.CLOUDFLARE_ACCOUNT_ID

  try {
    await getCloudflareCredentials()
    console.error('❌ Should have thrown error for missing credentials')
    process.exit(1)
  } catch (error) {
    if (error instanceof CloudflareAIError && error.type === 'MISSING_TOKEN') {
      console.log('✅ Correctly validates missing API token')
    } else {
      console.error('❌ Unexpected error type:', error)
      process.exit(1)
    }
  }

  // Restore environment variables
  if (originalToken) process.env.CLOUDFLARE_API_TOKEN = originalToken
  if (originalAccountId) process.env.CLOUDFLARE_ACCOUNT_ID = originalAccountId
}

/**
 * Test request validation
 */
function testRequestValidation() {
  console.log('\n🧪 Testing request validation...')

  // Test valid request
  const validRequest: CloudflareAIRequest = {
    messages: [
      { role: 'user', content: 'Hello world' }
    ],
    max_tokens: 100,
    temperature: 0.7
  }

  const validErrors = validateAIRequest(validRequest)
  if (validErrors.length === 0) {
    console.log('✅ Valid request passes validation')
  } else {
    console.error('❌ Valid request failed validation:', validErrors)
    process.exit(1)
  }

  // Test invalid request - empty messages
  const invalidRequest1: CloudflareAIRequest = {
    messages: []
  }

  const invalid1Errors = validateAIRequest(invalidRequest1)
  if (invalid1Errors.length > 0 && invalid1Errors.some(e => e.includes('empty'))) {
    console.log('✅ Correctly validates empty messages array')
  } else {
    console.error('❌ Failed to validate empty messages array')
    process.exit(1)
  }

  // Test invalid request - bad temperature
  const invalidRequest2: CloudflareAIRequest = {
    messages: [{ role: 'user', content: 'test' }],
    temperature: 5.0 // Invalid - too high
  }

  const invalid2Errors = validateAIRequest(invalidRequest2)
  if (invalid2Errors.length > 0 && invalid2Errors.some(e => e.includes('temperature'))) {
    console.log('✅ Correctly validates invalid temperature')
  } else {
    console.error('❌ Failed to validate invalid temperature')
    process.exit(1)
  }
}

/**
 * Test model configuration
 */
function testModelConfiguration() {
  console.log('\n🧪 Testing model configuration...')

  // Test that models are defined
  const modelNames = Object.keys(CLOUDFLARE_MODELS)
  if (modelNames.length > 0) {
    console.log(`✅ Found ${modelNames.length} available models`)
  } else {
    console.error('❌ No models defined')
    process.exit(1)
  }

  // Test specific model
  const llamaModel = CLOUDFLARE_MODELS['llama-3.1-8b']
  if (llamaModel && llamaModel.name === '@cf/meta/llama-3.1-8b-instruct') {
    console.log('✅ Llama 3.1 8B model correctly configured')
  } else {
    console.error('❌ Llama 3.1 8B model misconfigured')
    process.exit(1)
  }

  // Test model capabilities
  if (llamaModel.supportsFunctions && llamaModel.supportsStreaming) {
    console.log('✅ Model capabilities correctly defined')
  } else {
    console.error('❌ Model capabilities incorrectly defined')
    process.exit(1)
  }
}

/**
 * Test error handling classes
 */
function testErrorHandling() {
  console.log('\n🧪 Testing error handling...')

  const testError = new CloudflareAIError(
    'Test error',
    400,
    'TEST_ERROR',
    [{ code: 1001, message: 'Test sub-error' }]
  )

  if (testError instanceof Error && testError instanceof CloudflareAIError) {
    console.log('✅ CloudflareAIError extends Error correctly')
  } else {
    console.error('❌ CloudflareAIError inheritance incorrect')
    process.exit(1)
  }

  if (testError.code === 400 && testError.type === 'TEST_ERROR') {
    console.log('✅ Error properties set correctly')
  } else {
    console.error('❌ Error properties incorrect')
    process.exit(1)
  }
}

/**
 * Main test function
 */
async function main() {
  try {
    console.log('🚀 Running Cloudflare AI script tests...\n')

    await testCredentialValidation()
    testRequestValidation()
    testModelConfiguration()
    testErrorHandling()

    console.log('\n🎉 All tests passed! The script is ready to use.')
    console.log('\nTo run the actual script, set these environment variables:')
    console.log('  export CLOUDFLARE_API_TOKEN="your-token-here"')
    console.log('  export CLOUDFLARE_ACCOUNT_ID="your-account-id-here"')
    console.log('\nThen run: pnpm ai-example')
  } catch (error) {
    console.error('❌ Test failed:', error instanceof Error ? error.message : error)
    process.exit(1)
  }
}

// Run tests if script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main()
}
