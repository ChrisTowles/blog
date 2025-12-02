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
