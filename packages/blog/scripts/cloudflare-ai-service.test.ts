import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import * as CloudflareTypes from './cloudflare-ai-types.js'
import { getCloudflareCredentials, invokeCloudflareAI, invokeCloudflareAIStream } from './service/cloudflare-ai-service.js'

type CloudflareAIRequest = CloudflareTypes.CloudflareAIRequest
const { CLOUDFLARE_MODELS, validateAIRequest, CloudflareAIError } = CloudflareTypes

describe('Cloudflare AI Service', () => {
  describe('Credential Validation', () => {
    let originalToken: string | undefined
    let originalAccountId: string | undefined

    beforeEach(() => {
      originalToken = process.env.CLOUDFLARE_API_TOKEN
      originalAccountId = process.env.CLOUDFLARE_ACCOUNT_ID
    })

    afterEach(() => {
      if (originalToken) {
        process.env.CLOUDFLARE_API_TOKEN = originalToken
      } else {
        delete process.env.CLOUDFLARE_API_TOKEN
      }

      if (originalAccountId) {
        process.env.CLOUDFLARE_ACCOUNT_ID = originalAccountId
      } else {
        delete process.env.CLOUDFLARE_ACCOUNT_ID
      }
    })

    it('should throw MISSING_TOKEN error when API token is missing', async () => {
      delete process.env.CLOUDFLARE_API_TOKEN
      process.env.CLOUDFLARE_ACCOUNT_ID = 'test-account-id'

      await expect(getCloudflareCredentials()).rejects.toThrow(CloudflareAIError)
      await expect(getCloudflareCredentials()).rejects.toMatchObject({
        type: 'MISSING_TOKEN',
        message: 'CLOUDFLARE_API_TOKEN environment variable is required'
      })
    })

    it('should throw MISSING_ACCOUNT_ID error when account ID is missing', async () => {
      process.env.CLOUDFLARE_API_TOKEN = 'test-token'
      delete process.env.CLOUDFLARE_ACCOUNT_ID

      await expect(getCloudflareCredentials()).rejects.toThrow(CloudflareAIError)
      await expect(getCloudflareCredentials()).rejects.toMatchObject({
        type: 'MISSING_ACCOUNT_ID',
        message: 'CLOUDFLARE_ACCOUNT_ID environment variable is required'
      })
    })

    it('should return credentials when both environment variables are set', async () => {
      process.env.CLOUDFLARE_API_TOKEN = 'test-token'
      process.env.CLOUDFLARE_ACCOUNT_ID = 'test-account-id'

      const credentials = await getCloudflareCredentials()

      expect(credentials).toEqual({
        apiToken: 'test-token',
        accountId: 'test-account-id',
        baseUrl: 'https://api.cloudflare.com/client/v4'
      })
    })

    it('should use custom base URL when provided', async () => {
      process.env.CLOUDFLARE_API_TOKEN = 'test-token'
      process.env.CLOUDFLARE_ACCOUNT_ID = 'test-account-id'
      process.env.CLOUDFLARE_API_BASE_URL = 'https://custom-api.example.com'

      const credentials = await getCloudflareCredentials()

      expect(credentials.baseUrl).toBe('https://custom-api.example.com')
    })
  })

  describe('Request Validation', () => {
    it('should pass validation for valid request', () => {
      const validRequest: CloudflareAIRequest = {
        messages: [
          { role: 'user', content: 'Hello world' }
        ],
        max_tokens: 100,
        temperature: 0.7
      }

      const errors = validateAIRequest(validRequest)
      expect(errors).toHaveLength(0)
    })

    it('should fail validation for empty messages array', () => {
      const invalidRequest: CloudflareAIRequest = {
        messages: []
      }

      const errors = validateAIRequest(invalidRequest)
      expect(errors).not.toHaveLength(0)
      expect(errors.some(e => e.includes('empty'))).toBe(true)
    })

    it('should fail validation for invalid temperature', () => {
      const invalidRequest: CloudflareAIRequest = {
        messages: [{ role: 'user', content: 'test' }],
        temperature: 5.0
      }

      const errors = validateAIRequest(invalidRequest)
      expect(errors).not.toHaveLength(0)
      expect(errors.some(e => e.includes('temperature'))).toBe(true)
    })

    it('should fail validation for temperature below 0', () => {
      const invalidRequest: CloudflareAIRequest = {
        messages: [{ role: 'user', content: 'test' }],
        temperature: -0.1
      }

      const errors = validateAIRequest(invalidRequest)
      expect(errors).not.toHaveLength(0)
      expect(errors.some(e => e.includes('temperature'))).toBe(true)
    })

    it('should pass validation for valid temperature range', () => {
      const validRequest1: CloudflareAIRequest = {
        messages: [{ role: 'user', content: 'test' }],
        temperature: 0
      }

      const validRequest2: CloudflareAIRequest = {
        messages: [{ role: 'user', content: 'test' }],
        temperature: 2.0
      }

      expect(validateAIRequest(validRequest1)).toHaveLength(0)
      expect(validateAIRequest(validRequest2)).toHaveLength(0)
    })
  })

  describe('Model Configuration', () => {
    it('should have models defined', () => {
      const modelNames = Object.keys(CLOUDFLARE_MODELS)
      expect(modelNames.length).toBeGreaterThan(0)
    })

    it('should have Llama 3.1 8B model correctly configured', () => {
      const llamaModel = CLOUDFLARE_MODELS['llama-3.1-8b']!
      expect(llamaModel).toBeDefined()
      expect(llamaModel.name).toBe('@cf/meta/llama-3.1-8b-instruct')
    })

    it('should have correct capabilities for Llama 3.1 8B model', () => {
      const llamaModel = CLOUDFLARE_MODELS['llama-3.1-8b']!
      expect(llamaModel.supportsFunctions).toBe(true)
      expect(llamaModel.supportsStreaming).toBe(true)
    })

    it('should have all required properties for each model', () => {
      const modelEntries = Object.entries(CLOUDFLARE_MODELS)

      modelEntries.forEach(([, model]) => {
        expect(model).toHaveProperty('name')
        expect(model).toHaveProperty('supportsFunctions')
        expect(model).toHaveProperty('supportsStreaming')
        expect(typeof model.name).toBe('string')
        expect(typeof model.supportsFunctions).toBe('boolean')
        expect(typeof model.supportsStreaming).toBe('boolean')
      })
    })
  })

  describe('Error Handling', () => {
    it('should extend Error class correctly', () => {
      const testError = new CloudflareAIError(
        'Test error',
        400,
        'TEST_ERROR',
        [{ code: 1001, message: 'Test sub-error' }]
      )

      expect(testError).toBeInstanceOf(Error)
      expect(testError).toBeInstanceOf(CloudflareAIError)
    })

    it('should set error properties correctly', () => {
      const testError = new CloudflareAIError(
        'Test error',
        400,
        'TEST_ERROR',
        [{ code: 1001, message: 'Test sub-error' }]
      )

      expect(testError.message).toBe('Test error')
      expect(testError.code).toBe(400)
      expect(testError.type).toBe('TEST_ERROR')
      expect(testError.errors).toEqual([{ code: 1001, message: 'Test sub-error' }])
    })

    it('should work without optional parameters', () => {
      const simpleError = new CloudflareAIError('Simple error', 500, 'SIMPLE_ERROR')

      expect(simpleError.message).toBe('Simple error')
      expect(simpleError.code).toBe(500)
      expect(simpleError.type).toBe('SIMPLE_ERROR')
      expect(simpleError.errors).toBeUndefined()
    })

    it('should have correct name property', () => {
      const testError = new CloudflareAIError('Test', 400, 'TEST')
      expect(testError.name).toBe('CloudflareAIError')
    })
  })

  describe('API Integration', () => {
    const mockCredentials = {
      apiToken: 'test-token',
      accountId: 'test-account',
      baseUrl: 'https://api.cloudflare.com/client/v4'
    }

    const validRequest: CloudflareAIRequest = {
      messages: [{ role: 'user', content: 'test message' }],
      max_tokens: 100,
      temperature: 0.7
    }

    beforeEach(() => {
      // Mock fetch globally
      global.fetch = vi.fn()
    })

    afterEach(() => {
      vi.resetAllMocks()
    })

    it('should make successful API call', async () => {
      const mockResponse = {
        success: true,
        result: { response: 'Test response' }
      }

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      } as Response)

      const result = await invokeCloudflareAI(mockCredentials, 'test-model', validRequest)

      expect(result).toEqual(mockResponse)
      expect(fetch).toHaveBeenCalledWith(
        'https://api.cloudflare.com/client/v4/accounts/test-account/ai/run/test-model',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Authorization': 'Bearer test-token',
            'Content-Type': 'application/json'
          }),
          body: JSON.stringify(validRequest)
        })
      )
    })

    it('should handle API errors', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        status: 400,
        statusText: 'Bad Request',
        json: () => Promise.resolve({ message: 'Invalid request' })
      } as Response)

      await expect(
        invokeCloudflareAI(mockCredentials, 'test-model', validRequest)
      ).rejects.toThrow(CloudflareAIError)
    })

    it('should handle validation errors before API call', async () => {
      const invalidRequest: CloudflareAIRequest = {
        messages: [],
        temperature: 5.0
      }

      await expect(
        invokeCloudflareAI(mockCredentials, 'test-model', invalidRequest)
      ).rejects.toThrow(CloudflareAIError)

      expect(fetch).not.toHaveBeenCalled()
    })
  })

  describe('Streaming API Integration', () => {
    const mockCredentials = {
      apiToken: 'test-token',
      accountId: 'test-account',
      baseUrl: 'https://api.cloudflare.com/client/v4'
    }

    const validRequest: CloudflareAIRequest = {
      messages: [{ role: 'user', content: 'test message' }],
      max_tokens: 100,
      temperature: 0.7
    }

    beforeEach(() => {
      global.fetch = vi.fn()
    })

    afterEach(() => {
      vi.resetAllMocks()
    })

    it('should handle streaming response', async () => {
      const mockStreamData = 'data: {"success": true, "result": {"response": "Test chunk"}}\n\n'

      const mockReader = {
        read: vi.fn()
          .mockResolvedValueOnce({ done: false, value: new TextEncoder().encode(mockStreamData) })
          .mockResolvedValueOnce({ done: true, value: undefined }),
        releaseLock: vi.fn()
      }

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        body: { getReader: () => mockReader }
      } as unknown as Response)

      const chunks: string[] = []
      const result = await invokeCloudflareAIStream(
        mockCredentials,
        'test-model',
        validRequest,
        chunk => chunks.push(chunk)
      )

      expect(result).toBe('Test chunk')
      expect(chunks).toEqual(['Test chunk'])
      expect(fetch).toHaveBeenCalledWith(
        'https://api.cloudflare.com/client/v4/accounts/test-account/ai/run/test-model',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ ...validRequest, stream: true })
        })
      )
    })

    it('should handle streaming errors', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: false,
        status: 400,
        statusText: 'Bad Request',
        json: () => Promise.resolve({ message: 'Streaming error' })
      } as Response)

      await expect(
        invokeCloudflareAIStream(mockCredentials, 'test-model', validRequest)
      ).rejects.toThrow(CloudflareAIError)
    })

    it('should handle missing response body', async () => {
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        body: null
      } as Response)

      await expect(
        invokeCloudflareAIStream(mockCredentials, 'test-model', validRequest)
      ).rejects.toThrow(CloudflareAIError)
    })
  })
})
