# Data Fetching in Nuxt 4 - Complete Guide

Comprehensive guide to data fetching in Nuxt 4 using `useFetch`, `useAsyncData`, and `$fetch`.

## Table of Contents

- [Overview](#overview)
- [Nuxt v4 Breaking Changes](#nuxt-v4-breaking-changes)
- [useFetch](#usefetch)
- [useAsyncData](#useasyncdata)
- [$fetch](#fetch)
- [Reactive Parameters](#reactive-parameters)
- [Caching Strategies](#caching-strategies)
- [Error Handling](#error-handling)
- [Transform Functions](#transform-functions)
- [Best Practices](#best-practices)

## Overview

| Method | Use Case | SSR | Caching | Reactive |
|--------|----------|-----|---------|----------|
| `useFetch` | Simple API calls | ✅ | ✅ | ✅ |
| `useAsyncData` | Custom async logic | ✅ | ✅ | ✅ |
| `$fetch` | Client-side only | ❌ | ❌ | ❌ |

## Nuxt v4 Breaking Changes

### 1. Shallow Reactivity by Default

```typescript
// v3 behavior (deep: true by default)
const { data } = await useFetch('/api/users')
data.value.users[0].name = 'Updated'  // Triggers reactivity

// v4 behavior (deep: false by default)
const { data } = await useFetch('/api/users')
data.value.users[0].name = 'Updated'  // Does NOT trigger reactivity!

// v4 fix: Enable deep reactivity explicitly
const { data } = await useFetch('/api/users', { deep: true })
```

### 2. Default Values Changed

```typescript
// v3: data starts as null
const { data } = await useFetch('/api/users')
console.log(data.value)  // null

// v4: data starts as undefined
const { data } = await useFetch('/api/users')
console.log(data.value)  // undefined

// Best practice: Provide default
const { data } = await useFetch('/api/users', {
  default: () => []
})
```

### 3. Reactive Keys (Same key shares data!)

```typescript
// Multiple components using same key share data
const { data: usersA } = await useFetch('/api/users', { key: 'users' })
const { data: usersB } = await useFetch('/api/users', { key: 'users' })

// usersA and usersB reference the SAME data!
// Useful for singleton patterns
```

## useFetch

### Basic Usage

```typescript
// Simple GET request
const { data, pending, error, refresh } = await useFetch('/api/users')

// With type safety
interface User {
  id: string
  name: string
  email: string
}

const { data } = await useFetch<User[]>('/api/users')
```

### All Options

```typescript
const { data, pending, error, status, refresh, execute } = await useFetch('/api/users', {
  // Request options
  method: 'GET',                    // HTTP method
  query: { page: 1, limit: 10 },    // Query parameters
  params: { page: 1 },              // Alias for query
  body: { name: 'John' },           // Request body (POST/PUT/PATCH)
  headers: { 'X-Custom': 'value' }, // Custom headers

  // Behavior options
  key: 'users',                     // Cache key (auto-generated if not provided)
  server: true,                     // Fetch on server (default: true)
  lazy: false,                      // Defer fetching to client (default: false)
  immediate: true,                  // Fetch immediately (default: true)
  default: () => [],                // Default value before data loads
  deep: false,                      // Deep reactivity (default: false in v4)

  // Transform & pick
  transform: (data) => data.items,  // Transform response (must be deterministic!)
  pick: ['id', 'name'],             // Pick specific fields

  // Caching
  getCachedData: (key, nuxt) => nuxt.payload.data[key],  // Custom cache retrieval
  dedupe: 'cancel',                 // Deduplication: 'cancel' | 'defer'

  // Callbacks
  onRequest: ({ request, options }) => { },
  onRequestError: ({ request, error }) => { },
  onResponse: ({ response }) => { },
  onResponseError: ({ response }) => { },

  // Watch & refresh
  watch: [someRef],                 // Re-fetch when refs change
})
```

### Return Values

```typescript
const {
  data,      // Ref<T | null> - The response data
  pending,   // Ref<boolean> - Loading state
  error,     // Ref<Error | null> - Error if request failed
  status,    // Ref<'idle' | 'pending' | 'success' | 'error'>
  refresh,   // () => Promise<void> - Re-fetch data (uses cache)
  execute,   // () => Promise<void> - Re-fetch data (bypasses cache)
  clear,     // () => void - Clear data and error
} = await useFetch('/api/users')
```

## useAsyncData

Use when you need custom async logic or multiple API calls.

### Basic Usage

```typescript
// Custom async logic
const { data } = await useAsyncData('dashboard', async () => {
  const [users, posts, stats] = await Promise.all([
    $fetch('/api/users'),
    $fetch('/api/posts'),
    $fetch('/api/stats')
  ])
  return { users, posts, stats }
})
```

### With Dependencies

```typescript
const userId = ref('123')

const { data: user } = await useAsyncData(
  () => `user-${userId.value}`,  // Dynamic key
  () => $fetch(`/api/users/${userId.value}`),
  { watch: [userId] }  // Re-fetch when userId changes
)
```

### Lazy Loading

```typescript
// Don't block navigation, fetch in background
const { data, pending } = await useAsyncData(
  'heavy-data',
  () => $fetch('/api/heavy-computation'),
  { lazy: true }
)

// In template
<template>
  <div v-if="pending">Loading...</div>
  <div v-else>{{ data }}</div>
</template>
```

## $fetch

Use for client-side only requests (event handlers, mutations).

```typescript
// In event handler
const handleSubmit = async () => {
  try {
    const result = await $fetch('/api/users', {
      method: 'POST',
      body: { name: 'John', email: 'john@example.com' }
    })
    console.log('Created:', result)
  } catch (error) {
    console.error('Failed:', error)
  }
}

// With type safety
interface CreateUserResponse {
  id: string
  name: string
}

const result = await $fetch<CreateUserResponse>('/api/users', {
  method: 'POST',
  body: formData
})
```

## Reactive Parameters

### Auto-Refetch with Reactive Query

```typescript
const page = ref(1)
const search = ref('')
const filters = reactive({ status: 'active', role: 'user' })

// Auto-refetch when page, search, or filters change
const { data } = await useFetch('/api/users', {
  query: {
    page,
    search,
    ...toRefs(filters)
  }
})

// Changing page triggers re-fetch
page.value = 2
```

### Manual Watch

```typescript
const category = ref('all')

const { data, refresh } = await useFetch('/api/products', {
  query: { category },
  watch: false  // Disable auto-watch
})

// Manual refresh when needed
watch(category, () => {
  refresh()
})
```

### Computed Query Parameters

```typescript
const selectedFilters = ref<string[]>([])

const { data } = await useFetch('/api/products', {
  query: computed(() => ({
    filters: selectedFilters.value.join(','),
    count: selectedFilters.value.length
  }))
})
```

## Caching Strategies

### SWR (Stale-While-Revalidate)

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  routeRules: {
    '/api/products': { swr: 3600 },  // Cache 1 hour
    '/api/users/**': { swr: 300 },   // Cache 5 minutes
  }
})
```

### Custom Cache Control

```typescript
const { data } = await useFetch('/api/data', {
  getCachedData(key, nuxtApp) {
    const cached = nuxtApp.payload.data[key] || nuxtApp.static.data[key]

    if (!cached) return null

    // Check expiration
    const expirationDate = new Date(cached.fetchedAt)
    expirationDate.setMinutes(expirationDate.getMinutes() + 5)

    if (expirationDate < new Date()) {
      return null  // Cache expired
    }

    return cached
  }
})
```

### Server-Side Caching

```typescript
// server/api/products.get.ts
import { defineCachedEventHandler } from 'nitropack/runtime'

export default defineCachedEventHandler(async (event) => {
  const products = await db.products.findMany()
  return products
}, {
  maxAge: 60 * 60,  // 1 hour
  staleMaxAge: 60 * 60 * 24,  // 24 hours stale
  swr: true
})
```

## Error Handling

### Basic Error Handling

```typescript
const { data, error, status } = await useFetch('/api/users')

// In template
<template>
  <div v-if="error">
    <p>Error: {{ error.message }}</p>
    <button @click="refresh">Retry</button>
  </div>
  <div v-else-if="status === 'pending'">Loading...</div>
  <div v-else>{{ data }}</div>
</template>
```

### With onResponseError

```typescript
const { data } = await useFetch('/api/users', {
  onResponseError({ response }) {
    if (response.status === 401) {
      navigateTo('/login')
    } else if (response.status === 404) {
      showError({ statusCode: 404, message: 'Not found' })
    }
  }
})
```

### Global Error Handler

```typescript
// plugins/api.ts
export default defineNuxtPlugin(() => {
  const { $fetch } = useNuxtApp()

  // Intercept all $fetch calls
  globalThis.$fetch = $fetch.create({
    onResponseError({ response }) {
      if (response.status === 401) {
        navigateTo('/login')
      }
    }
  })
})
```

### Retry Logic

```typescript
const { data, error, refresh } = await useFetch('/api/unreliable', {
  retry: 3,
  retryDelay: 1000,  // 1 second between retries
  onRequestError({ error }) {
    console.log('Request failed, retrying...', error)
  }
})
```

## Transform Functions

### Basic Transform

```typescript
interface ApiResponse {
  data: User[]
  meta: { total: number }
}

const { data } = await useFetch<ApiResponse>('/api/users', {
  transform: (response) => response.data  // Extract just the data array
})

// data.value is User[], not ApiResponse
```

### Deterministic Transform (IMPORTANT!)

```typescript
// ❌ WRONG: Non-deterministic (causes hydration mismatch)
const { data } = await useFetch('/api/users', {
  transform: (users) => users.sort(() => Math.random() - 0.5)
})

// ❌ WRONG: Non-deterministic
const { data } = await useFetch('/api/items', {
  transform: (items) => items.map(item => ({
    ...item,
    id: Math.random()  // Different on server vs client!
  }))
})

// ✅ RIGHT: Deterministic
const { data } = await useFetch('/api/users', {
  transform: (users) => users.sort((a, b) => a.name.localeCompare(b.name))
})

// ✅ RIGHT: Deterministic
const { data } = await useFetch('/api/items', {
  transform: (items) => items.map(item => ({
    ...item,
    formattedDate: new Date(item.createdAt).toISOString()
  }))
})
```

### Pick Specific Fields

```typescript
// Only include specified fields (reduces payload size)
const { data } = await useFetch('/api/users', {
  pick: ['id', 'name', 'email']
})

// data.value will only have { id, name, email } for each user
```

## Best Practices

### 1. Always Handle Loading and Error States

```vue
<script setup>
const { data, pending, error } = await useFetch('/api/users')
</script>

<template>
  <div>
    <div v-if="error" class="error">
      {{ error.message }}
    </div>
    <div v-else-if="pending" class="loading">
      Loading...
    </div>
    <ul v-else>
      <li v-for="user in data" :key="user.id">
        {{ user.name }}
      </li>
    </ul>
  </div>
</template>
```

### 2. Use TypeScript

```typescript
interface User {
  id: string
  name: string
  email: string
}

// Typed response
const { data } = await useFetch<User[]>('/api/users')

// data.value is User[] | null
```

### 3. Provide Default Values

```typescript
const { data } = await useFetch('/api/users', {
  default: () => []
})

// data.value is never null/undefined
// Safe to use: data.value.length, data.value.map(), etc.
```

### 4. Use Appropriate Method for the Task

```typescript
// Page data loading → useFetch/useAsyncData
const { data } = await useFetch('/api/page-data')

// Form submission → $fetch
const handleSubmit = async () => {
  await $fetch('/api/submit', { method: 'POST', body: formData })
}

// Multiple related calls → useAsyncData
const { data } = await useAsyncData('dashboard', async () => {
  const [a, b, c] = await Promise.all([
    $fetch('/api/a'),
    $fetch('/api/b'),
    $fetch('/api/c')
  ])
  return { a, b, c }
})
```

### 5. Invalidate Cache Appropriately

```typescript
// After mutation, refresh related data
const handleDelete = async (id: string) => {
  await $fetch(`/api/users/${id}`, { method: 'DELETE' })

  // Refresh the users list
  await refreshNuxtData('users')

  // Or refresh all data
  await refreshNuxtData()
}
```

## Common Pitfalls

- Not handling error states
- Using `$fetch` instead of `useFetch` for SSR data
- Non-deterministic transform functions
- Missing TypeScript types
- Not providing default values
- Using deep reactivity when not needed (v4)
- Forgetting that `useState` keys share data

---

**Last Updated**: 2025-11-09
