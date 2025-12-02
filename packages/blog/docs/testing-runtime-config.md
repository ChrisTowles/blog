# Testing with useRuntimeConfig in Vitest

This guide explains how to test Nuxt code that uses `useRuntimeConfig()` in Vitest unit tests.

## Overview

Your project is already configured for Nuxt testing with:
- ✅ `@nuxt/test-utils` installed (v3.19.2)
- ✅ Vitest configured with `environment: 'nuxt'`
- ✅ Environment variables loaded from `.env`

## Basic Usage

### 1. Mock useRuntimeConfig

Use `mockNuxtImport` from `@nuxt/test-utils/runtime` to mock the runtime config:

```typescript
// @vitest-environment nuxt
import { mockNuxtImport } from '@nuxt/test-utils/runtime'

// Mock BEFORE importing code that uses useRuntimeConfig
mockNuxtImport('useRuntimeConfig', () => {
  return () => ({
    anthropicApiKey: 'test-api-key',
    model_fast: 'claude-haiku-4-5',
    model: 'claude-sonnet-4-5',
    public: {
      // Add any public config here
    }
  })
})
```

### 2. Write Your Tests

```typescript
import { describe, it, expect } from 'vitest'

describe('your feature', () => {
  it('should use runtime config', () => {
    const config = useRuntimeConfig()
    expect(config.anthropicApiKey).toBe('test-api-key')
  })
})
```

## Testing Server-Side Code

When testing server routes or utilities that use `useRuntimeConfig`:

```typescript
// @vitest-environment nuxt
import { describe, it, expect } from 'vitest'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'

mockNuxtImport('useRuntimeConfig', () => {
  return () => ({
    anthropicApiKey: process.env.ANTHROPIC_API_KEY || 'test-key',
    model_fast: 'claude-haiku-4-5',
    model: 'claude-sonnet-4-5'
  })
})

// Import your server utils AFTER mocking
import { myServerFunction } from './my-server-util'

describe('server function', () => {
  it('should work with runtime config', () => {
    const result = myServerFunction()
    expect(result).toBeDefined()
  })
})
```

## Environment-Specific Mocking

You can use environment variables in your mocks:

```typescript
mockNuxtImport('useRuntimeConfig', () => {
  return () => ({
    // Use real env vars if available, fallback to test values
    anthropicApiKey: process.env.ANTHROPIC_API_KEY || 'mock-key',
    model_fast: process.env.MODEL_FAST || 'claude-haiku-4-5',
    model: process.env.MODEL || 'claude-sonnet-4-5',
    public: {
      version: '1.0.0'
    }
  })
})
```

## File Naming Options

Three ways to enable Nuxt environment:

1. **Comment directive** (recommended for individual files):
   ```typescript
   // @vitest-environment nuxt
   ```

2. **File naming convention**:
   - `*.nuxt.test.ts`
   - `*.nuxt.spec.ts`

3. **Global config** (already set in your `vitest.config.ts`):
   ```typescript
   export default defineVitestConfig({
     test: {
       environment: 'nuxt'
     }
   })
   ```

## Common Patterns

### Pattern 1: Testing Composables

```typescript
// @vitest-environment nuxt
import { mockNuxtImport } from '@nuxt/test-utils/runtime'

mockNuxtImport('useRuntimeConfig', () => {
  return () => ({
    public: {
      apiUrl: 'https://test.api.com'
    }
  })
})

describe('useMyComposable', () => {
  it('should use runtime config', () => {
    const { data } = useMyComposable()
    expect(data).toBeDefined()
  })
})
```

### Pattern 2: Testing API Routes

```typescript
// @vitest-environment nuxt
import { mockNuxtImport } from '@nuxt/test-utils/runtime'

mockNuxtImport('useRuntimeConfig', () => {
  return () => ({
    anthropicApiKey: 'test-key',
    model: 'claude-sonnet-4-5'
  })
})

describe('API route', () => {
  it('should handle request', async () => {
    // Your API route test
  })
})
```

### Pattern 3: Per-Test Config

```typescript
import { mockNuxtImport } from '@nuxt/test-utils/runtime'

describe('feature with different configs', () => {
  it('test with config A', () => {
    mockNuxtImport('useRuntimeConfig', () => {
      return () => ({ feature: 'enabled' })
    })
    // test code
  })

  it('test with config B', () => {
    mockNuxtImport('useRuntimeConfig', () => {
      return () => ({ feature: 'disabled' })
    })
    // test code
  })
})
```

## Troubleshooting

### "useRuntimeConfig is not defined"

**Solution**: Add `// @vitest-environment nuxt` at the top of your test file, or ensure `mockNuxtImport` is called BEFORE any imports that use it.

### Mock not taking effect

**Solution**: Ensure `mockNuxtImport` is called at the TOP of your test file, before any other imports that might use `useRuntimeConfig`.

### Different config per test

**Solution**: Use `beforeEach` to set up fresh mocks for each test:

```typescript
import { beforeEach } from 'vitest'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'

describe('tests', () => {
  beforeEach(() => {
    mockNuxtImport('useRuntimeConfig', () => {
      return () => ({ /* your config */ })
    })
  })

  it('test 1', () => { /* ... */ })
  it('test 2', () => { /* ... */ })
})
```

## Resources

- [Nuxt Testing Documentation](https://nuxt.com/docs/getting-started/testing)
- [nuxt-vitest GitHub](https://github.com/danielroe/nuxt-vitest)
- [Testing Composables Guide](https://dev.jeromeabel.net/blog/testing-a-simple-nuxt-feature/07-unit-testing-the-composable/)
- [Stack Overflow: Testing Pinia with useRuntimeConfig](https://stackoverflow.com/questions/72192874/testing-pinia-store-inside-nuxt3-with-vitest-throws-useruntimeconfig-not-defin)
- [Unit Testing Nuxt 3 Server Routes](https://dev.to/doantrongnam/a-developers-guide-to-unit-testing-nuxt-3-server-routes-4f55)

## Example Test File

See `server/utils/config.test.ts` for a complete working example.
