/**
 * Tests for timeout utilities
 */
import { describe, it, expect } from 'vitest'
import {
    withTimeout,
    ToolTimeoutError,
    isTimeoutError,
    DEFAULT_TOOL_TIMEOUT_MS,
    API_TIMEOUT_MS
} from './timeout'

describe('timeout utilities', () => {
    describe('withTimeout', () => {
        it('resolves when promise completes within timeout', async () => {
            const result = await withTimeout(
                Promise.resolve('success'),
                1000,
                'testTool'
            )
            expect(result).toBe('success')
        })

        it('rejects with ToolTimeoutError when promise exceeds timeout', async () => {
            const slowPromise = new Promise((resolve) => {
                setTimeout(() => resolve('too late'), 200)
            })

            await expect(
                withTimeout(slowPromise, 50, 'testTool')
            ).rejects.toThrow(ToolTimeoutError)
        })

        it('includes tool name and timeout in error message', async () => {
            const slowPromise = new Promise((resolve) => {
                setTimeout(() => resolve('too late'), 200)
            })

            try {
                await withTimeout(slowPromise, 50, 'myTool')
                expect.fail('Should have thrown')
            } catch (error) {
                expect(error).toBeInstanceOf(ToolTimeoutError)
                expect((error as Error).message).toContain('myTool')
                expect((error as Error).message).toContain('50ms')
            }
        })

        it('propagates errors from the original promise', async () => {
            const failingPromise = Promise.reject(new Error('Original error'))

            await expect(
                withTimeout(failingPromise, 1000, 'testTool')
            ).rejects.toThrow('Original error')
        })
    })

    describe('isTimeoutError', () => {
        it('returns true for ToolTimeoutError', () => {
            const error = new ToolTimeoutError('test', 1000)
            expect(isTimeoutError(error)).toBe(true)
        })

        it('returns true for AbortError DOMException', () => {
            const error = new DOMException('Aborted', 'AbortError')
            expect(isTimeoutError(error)).toBe(true)
        })

        it('returns true for errors with "timeout" in message', () => {
            const error = new Error('Connection timeout occurred')
            expect(isTimeoutError(error)).toBe(true)
        })

        it('returns false for other errors', () => {
            expect(isTimeoutError(new Error('Network error'))).toBe(false)
            expect(isTimeoutError(new Error('Failed'))).toBe(false)
            expect(isTimeoutError(null)).toBe(false)
            expect(isTimeoutError(undefined)).toBe(false)
        })
    })

    describe('constants', () => {
        it('DEFAULT_TOOL_TIMEOUT_MS is 30 seconds', () => {
            expect(DEFAULT_TOOL_TIMEOUT_MS).toBe(30000)
        })

        it('API_TIMEOUT_MS is 5 seconds', () => {
            expect(API_TIMEOUT_MS).toBe(5000)
        })
    })
})
