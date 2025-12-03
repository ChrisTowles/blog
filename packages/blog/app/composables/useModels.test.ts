// @vitest-environment nuxt
import { describe, it, expect, beforeEach } from 'vitest'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'

// Mock useCookie
let mockCookieValue = 'claude-haiku-4-5'
mockNuxtImport('useCookie', () => {
  return () => {
    return {
      value: mockCookieValue
    }
  }
})

describe('useModels', () => {
  beforeEach(() => {
    // Reset cookie value before each test
    mockCookieValue = 'claude-haiku-4-5'
  })

  it('should return available models from runtime config', () => {
    const { models } = useModels()

    expect(models).toEqual([
      'claude-haiku-4-5',
      'claude-sonnet-4-5'
    ])
  })
})

describe('useModels - when invalid cookie', () => {
  beforeEach(() => {
    // Reset cookie value before each test
    mockCookieValue = 'claude-INVALID-4-5'
  })

  it('should force user to valid model', () => {
    const modelConfig = useModels()

    expect(modelConfig.models).toEqual([
      'claude-haiku-4-5',
      'claude-sonnet-4-5'
    ])
    expect(modelConfig.model.value).toBe('claude-haiku-4-5')
  })
})
