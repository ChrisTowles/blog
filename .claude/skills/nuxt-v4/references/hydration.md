# Hydration - Best Practices

Comprehensive guide to understanding and fixing hydration issues in Nuxt 4.

## Table of Contents

- [What is Hydration?](#what-is-hydration)
- [Common Causes](#common-causes)
- [Solutions](#solutions)
- [ClientOnly Component](#clientonly-component)
- [Environment Checks](#environment-checks)
- [Debugging Tips](#debugging-tips)

## What is Hydration?

Hydration is the process of making server-rendered HTML interactive on the client by attaching Vue's reactivity system and event listeners.

**The Problem**: If the HTML rendered on the server doesn't match what Vue expects to render on the client, you get a "hydration mismatch" error.

```
[Vue warn]: Hydration node mismatch:
- Server rendered: <div>Server Content</div>
- Client rendered: <div>Client Content</div>
```

## Common Causes

### 1. Browser APIs on Server

```typescript
// ❌ WRONG: window doesn't exist on server
const width = window.innerWidth

// ❌ WRONG: document doesn't exist on server
const element = document.getElementById('app')

// ❌ WRONG: localStorage doesn't exist on server
const token = localStorage.getItem('token')
```

### 2. Non-Deterministic Values

```typescript
// ❌ WRONG: Different value on server vs client
const id = Math.random()

// ❌ WRONG: Different timestamp on server vs client
const now = Date.now()

// ❌ WRONG: Different date string on server vs client
const date = new Date().toLocaleDateString()
```

### 3. Third-Party Libraries

```typescript
// ❌ WRONG: Library depends on browser APIs
import SomeLibrary from 'some-browser-library'

// This will fail on server
const instance = new SomeLibrary()
```

### 4. Structural Differences

```vue
<!-- ❌ WRONG: Different structure server vs client -->
<template>
  <div v-if="isClient">
    <span>Client Only</span>
  </div>
  <div v-else>
    <p>Server Only</p>
  </div>
</template>
```

## Solutions

### For Browser APIs

```typescript
// ✅ Solution 1: onMounted hook
const width = ref(0)

onMounted(() => {
  width.value = window.innerWidth

  window.addEventListener('resize', () => {
    width.value = window.innerWidth
  })
})
```

```typescript
// ✅ Solution 2: import.meta.client check
const width = ref(0)

if (import.meta.client) {
  width.value = window.innerWidth
}
```

```typescript
// ✅ Solution 3: useState with client check
const token = useState('auth-token', () => {
  if (import.meta.client) {
    return localStorage.getItem('token')
  }
  return null
})
```

### For Non-Deterministic Values

```typescript
// ✅ Use useState to ensure same value server & client
const randomId = useState('random-id', () => Math.random())

// ✅ For dates, use a fixed reference or format consistently
const timestamp = useState('timestamp', () => Date.now())
```

### For Third-Party Libraries

```typescript
// ✅ Dynamic import in onMounted
let library: any = null

onMounted(async () => {
  const { default: SomeLibrary } = await import('some-browser-library')
  library = new SomeLibrary()
})
```

```vue
<!-- ✅ Or use ClientOnly component -->
<template>
  <ClientOnly>
    <ThirdPartyComponent />
  </ClientOnly>
</template>
```

### For Structural Differences

```vue
<!-- ✅ Use v-show instead of v-if for style changes -->
<template>
  <div>
    <span v-show="isClient">Client Only Content</span>
  </div>
</template>
```

```vue
<!-- ✅ Or use ClientOnly with fallback -->
<template>
  <ClientOnly fallback-tag="div" fallback="Loading...">
    <ClientSpecificContent />
  </ClientOnly>
</template>
```

## ClientOnly Component

Wrap client-only content to prevent hydration mismatches.

### Basic Usage

```vue
<template>
  <ClientOnly>
    <BrowserOnlyComponent />
  </ClientOnly>
</template>
```

### With Fallback

```vue
<template>
  <ClientOnly fallback-tag="div" fallback="Loading chart...">
    <HeavyChart :data="chartData" />
  </ClientOnly>
</template>
```

### With Named Slot Fallback

```vue
<template>
  <ClientOnly>
    <template #default>
      <ComplexClientComponent />
    </template>
    <template #fallback>
      <div class="skeleton-loader">
        <div class="skeleton-line"></div>
        <div class="skeleton-line"></div>
      </div>
    </template>
  </ClientOnly>
</template>
```

### Common Use Cases

```vue
<template>
  <!-- Date/time display (timezone dependent) -->
  <ClientOnly>
    <span>{{ new Date().toLocaleString() }}</span>
    <template #fallback>Loading time...</template>
  </ClientOnly>

  <!-- Browser-dependent components -->
  <ClientOnly>
    <GoogleMaps :location="location" />
  </ClientOnly>

  <!-- User-specific content -->
  <ClientOnly>
    <UserPreferences />
  </ClientOnly>

  <!-- Animated content -->
  <ClientOnly>
    <LottieAnimation />
  </ClientOnly>
</template>
```

## Environment Checks

### Available Checks

```typescript
// In script setup
if (import.meta.client) {
  // Client-side only code
}

if (import.meta.server) {
  // Server-side only code
}

// Legacy (still works)
if (process.client) {
  // Client-side only code
}

if (process.server) {
  // Server-side only code
}
```

### In Composables

```typescript
export const useLocalStorage = <T>(key: string, defaultValue: T) => {
  const data = useState<T>(key, () => {
    // Only access localStorage on client
    if (import.meta.client) {
      const stored = localStorage.getItem(key)
      return stored ? JSON.parse(stored) : defaultValue
    }
    return defaultValue
  })

  // Watch for changes (client-side only)
  if (import.meta.client) {
    watch(data, (newValue) => {
      localStorage.setItem(key, JSON.stringify(newValue))
    }, { deep: true })
  }

  return data
}
```

### In Templates (via computed)

```vue
<script setup>
const isClient = computed(() => import.meta.client)
</script>

<template>
  <!-- Use v-show to avoid structural differences -->
  <div v-show="isClient">
    Client-only content
  </div>
</template>
```

## Debugging Tips

### 1. Check Browser Console

Look for specific hydration warnings:
```
[Vue warn]: Hydration node mismatch
[Vue warn]: Hydration text content mismatch
[Vue warn]: Hydration children mismatch
```

### 2. Compare Server vs Client HTML

```typescript
// In a component
onMounted(() => {
  console.log('Server HTML:', document.body.innerHTML)
})

// During SSR (in server middleware)
export default defineEventHandler((event) => {
  console.log('Rendering on server')
})
```

### 3. Isolate the Problem

```vue
<template>
  <!-- Comment out sections to find the culprit -->
  <div>
    <SuspectedComponent />
    <!-- <AnotherComponent /> -->
  </div>
</template>
```

### 4. Check for Common Patterns

- **Random IDs**: `Math.random()`, `crypto.randomUUID()`
- **Timestamps**: `Date.now()`, `new Date()`
- **Browser dimensions**: `window.innerWidth`, `screen.width`
- **User agent**: `navigator.userAgent`
- **Local storage**: `localStorage.getItem()`
- **Cookies** (if accessed differently): `document.cookie`

### 5. Use Development Mode

Nuxt provides better error messages in development:

```bash
npm run dev  # More detailed hydration warnings
```

## Quick Reference

| Problem | Solution |
|---------|----------|
| `window`/`document` access | Use `onMounted()` or `import.meta.client` |
| `Math.random()` | Use `useState()` |
| `Date.now()` | Use `useState()` |
| `localStorage` | Guard with `import.meta.client` |
| Third-party browser lib | Dynamic import in `onMounted()` |
| Different HTML structure | Use `v-show` or `<ClientOnly>` |
| Timezone differences | Use `<ClientOnly>` for date display |

## Best Practices

1. **Use `useState` for non-deterministic values** - Ensures same value on server and client
2. **Guard browser APIs** - Always check `import.meta.client`
3. **Use `onMounted` for side effects** - DOM manipulation, event listeners
4. **Wrap client-only components** - Use `<ClientOnly>` with fallback
5. **Prefer `v-show` over `v-if`** - When structure must match
6. **Test SSR** - Run `npm run build && npm run preview` to catch issues
7. **Check third-party libraries** - Verify SSR compatibility

## Common Pitfalls

- Using browser APIs without guards
- Non-deterministic values in render
- Different HTML structure server vs client
- Third-party libraries that require browser
- Timezone/locale differences in date formatting
- Dynamic imports without proper handling

---

**Last Updated**: 2025-11-09
