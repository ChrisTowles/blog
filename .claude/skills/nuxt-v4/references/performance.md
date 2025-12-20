# Performance Optimization Guide for Nuxt 4

Comprehensive guide to optimizing Nuxt 4 application performance.

## Table of Contents

- [Built-in Optimizations](#built-in-optimizations)
- [Lazy Loading](#lazy-loading)
- [Lazy Hydration](#lazy-hydration)
- [Image Optimization](#image-optimization)
- [Font Optimization](#font-optimization)
- [Route Rules & Caching](#route-rules--caching)
- [Bundle Optimization](#bundle-optimization)
- [Database Optimization](#database-optimization)
- [Monitoring](#monitoring)
- [Checklist](#checklist)

## Built-in Optimizations

Nuxt 4 includes automatic optimizations:

- **Automatic code splitting** by route
- **Tree shaking** of unused code
- **Minification** of JS and CSS
- **Preloading** of critical resources
- **Async data handler extraction** (v4.2) - 39% smaller bundles
- **Import maps** (v4.1) - improved chunk stability

## Lazy Loading

### Lazy Components

```vue
<script setup>
// Method 1: defineAsyncComponent
const HeavyChart = defineAsyncComponent(() =>
  import('~/components/HeavyChart.vue')
)

// Method 2: Lazy prefix (auto-magic)
// Just name your component LazyHeavyChart.vue
// Or use it with Lazy prefix
</script>

<template>
  <!-- Auto-lazy with Lazy prefix -->
  <LazyHeavyChart v-if="showChart" :data="chartData" />

  <!-- Manual async component -->
  <Suspense>
    <HeavyChart :data="chartData" />
    <template #fallback>Loading chart...</template>
  </Suspense>
</template>
```

### Lazy Loading with Conditions

```vue
<script setup>
const showHeavyComponent = ref(false)
</script>

<template>
  <button @click="showHeavyComponent = true">Load Component</button>

  <!-- Only loads when showHeavyComponent is true -->
  <LazyHeavyComponent v-if="showHeavyComponent" />
</template>
```

### Dynamic Imports

```typescript
// Lazy load a module
const handleExport = async () => {
  const { exportToPDF } = await import('~/utils/export')
  await exportToPDF(data)
}

// Lazy load a library
const initChart = async () => {
  const { Chart } = await import('chart.js')
  new Chart(canvas, config)
}
```

## Lazy Hydration

Delay hydration until needed for better initial load performance.

### Visibility-Based

```vue
<template>
  <!-- Hydrate when element enters viewport -->
  <LazyHeavyComponent lazy-hydrate="visible" />

  <!-- With options -->
  <LazyHeavyComponent
    lazy-hydrate="visible"
    :hydrate-on-visible="{ rootMargin: '100px' }"
  />
</template>
```

### Interaction-Based

```vue
<template>
  <!-- Hydrate on user interaction (click, focus, etc.) -->
  <LazyCommentSection lazy-hydrate="interaction" />

  <!-- Specific events -->
  <LazyCommentSection
    lazy-hydrate="interaction"
    :hydrate-on-interaction="['click', 'focus']"
  />
</template>
```

### Idle-Based

```vue
<template>
  <!-- Hydrate when browser is idle -->
  <LazyFooter lazy-hydrate="idle" />

  <!-- With timeout -->
  <LazyFooter
    lazy-hydrate="idle"
    :hydrate-on-idle="{ timeout: 3000 }"
  />
</template>
```

### Manual Hydration (v4.1)

```vue
<script setup>
const LazyComponent = defineLazyHydrationComponent(() =>
  import('./HeavyComponent.vue')
)
</script>

<template>
  <LazyComponent />
</template>
```

## Image Optimization

### Setup

```bash
npm install @nuxt/image
```

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxt/image']
})
```

### NuxtImg

```vue
<template>
  <!-- Basic usage -->
  <NuxtImg src="/hero.jpg" alt="Hero image" />

  <!-- With optimization -->
  <NuxtImg
    src="/hero.jpg"
    alt="Hero"
    width="800"
    height="600"
    loading="lazy"
    format="webp"
    quality="80"
  />

  <!-- Responsive -->
  <NuxtImg
    src="/hero.jpg"
    sizes="sm:100vw md:50vw lg:400px"
    :modifiers="{ fit: 'cover' }"
  />
</template>
```

### NuxtPicture

```vue
<template>
  <!-- Auto format selection (WebP, AVIF) -->
  <NuxtPicture
    src="/hero.jpg"
    alt="Hero"
    sizes="sm:100vw md:50vw lg:400px"
    format="avif,webp"
  />
</template>
```

### Provider Configuration

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  image: {
    provider: 'cloudflare',  // or 'ipx', 'cloudinary', 'imgix', etc.
    cloudflare: {
      baseURL: 'https://example.com'
    },
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280
    }
  }
})
```

## Font Optimization

### Setup

```bash
npm install @nuxt/fonts
```

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxt/fonts']
})
```

### Features

- **Automatic font subsetting** - only includes characters you use
- **Preloading** of critical fonts
- **Local caching** - fonts served from your domain
- **Fallback fonts** - prevents layout shift

### Configuration

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  fonts: {
    families: [
      { name: 'Inter', provider: 'google' },
      { name: 'Roboto Mono', provider: 'google', weights: [400, 700] }
    ],
    defaults: {
      weights: [400, 500, 700],
      styles: ['normal', 'italic']
    }
  }
})
```

## Route Rules & Caching

### Configuration

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  routeRules: {
    // Static page - pre-render at build time
    '/': { prerender: true },
    '/about': { prerender: true },

    // SWR - cache with background revalidation
    '/api/products': { swr: 3600 },  // 1 hour
    '/api/users/**': { swr: 300 },   // 5 minutes

    // ISR - Incremental Static Regeneration
    '/blog/**': { isr: 60 },  // Regenerate every 60 seconds

    // SPA mode - client-side only (no SSR)
    '/dashboard/**': { ssr: false },

    // Custom cache headers
    '/api/static-data': {
      headers: { 'cache-control': 'max-age=86400' }
    },

    // Redirect
    '/old-page': { redirect: '/new-page' },

    // CORS headers
    '/api/**': {
      cors: true,
      headers: { 'Access-Control-Allow-Origin': '*' }
    }
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
  staleMaxAge: 60 * 60 * 24,  // 24 hours stale-while-revalidate
  swr: true,
  getKey: (event) => getRequestURL(event).pathname
})
```

### Data Fetching Cache

```typescript
const { data } = await useFetch('/api/products', {
  key: 'products',  // Cache key
  getCachedData(key, nuxtApp) {
    // Custom cache retrieval logic
    return nuxtApp.payload.data[key]
  }
})
```

## Bundle Optimization

### Analyze Bundle

```bash
# Generate bundle analysis
npx nuxi analyze

# Or in nuxt.config.ts
export default defineNuxtConfig({
  build: {
    analyze: true
  }
})
```

### Optimize Dependencies

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  vite: {
    optimizeDeps: {
      include: ['lodash-es', 'axios']  // Pre-bundle heavy deps
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor': ['vue', 'vue-router'],
            'utils': ['lodash-es', 'date-fns']
          }
        }
      }
    }
  }
})
```

### Tree Shaking

```typescript
// ✅ Good - tree shakeable
import { debounce } from 'lodash-es'

// ❌ Bad - imports entire library
import _ from 'lodash'
```

### External Dependencies

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  vite: {
    build: {
      rollupOptions: {
        external: ['heavy-lib-only-needed-server-side']
      }
    }
  }
})
```

## Database Optimization

### Avoid N+1 Queries

```typescript
// ❌ Bad - N+1 problem
const users = await db.users.findMany()
for (const user of users) {
  user.posts = await db.posts.findMany({ where: { userId: user.id } })
}

// ✅ Good - single query with include
const users = await db.users.findMany({
  include: { posts: true }
})

// ✅ Good - separate optimized queries
const users = await db.users.findMany()
const userIds = users.map(u => u.id)
const posts = await db.posts.findMany({
  where: { userId: { in: userIds } }
})
```

### Pagination

```typescript
// server/api/users.get.ts
export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const page = Number(query.page) || 1
  const limit = Math.min(Number(query.limit) || 20, 100)
  const offset = (page - 1) * limit

  const [users, total] = await Promise.all([
    db.users.findMany({ skip: offset, take: limit }),
    db.users.count()
  ])

  return {
    data: users,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  }
})
```

### Select Only Needed Fields

```typescript
// ✅ Select specific fields
const users = await db.users.findMany({
  select: {
    id: true,
    name: true,
    email: true
    // Excludes large fields like bio, avatar, etc.
  }
})
```

## Monitoring

### Web Vitals

```typescript
// plugins/web-vitals.client.ts
export default defineNuxtPlugin(() => {
  if (import.meta.client) {
    import('web-vitals').then(({ onCLS, onFID, onLCP, onFCP, onTTFB }) => {
      onCLS(console.log)
      onFID(console.log)
      onLCP(console.log)
      onFCP(console.log)
      onTTFB(console.log)
    })
  }
})
```

### Custom Performance Marks

```typescript
// Measure component render time
onMounted(() => {
  performance.mark('component-mounted')
  performance.measure('component-render', 'component-start', 'component-mounted')
})

onBeforeMount(() => {
  performance.mark('component-start')
})
```

## Checklist

### Build Time

- [ ] Enable prerendering for static pages
- [ ] Configure appropriate route rules
- [ ] Analyze and optimize bundle size
- [ ] Tree shake unused code

### Images

- [ ] Use `<NuxtImg>` or `<NuxtPicture>`
- [ ] Enable lazy loading
- [ ] Serve WebP/AVIF formats
- [ ] Specify dimensions to prevent CLS

### Fonts

- [ ] Use `@nuxt/fonts` module
- [ ] Preload critical fonts
- [ ] Use font-display: swap

### Components

- [ ] Lazy load heavy components
- [ ] Use lazy hydration for below-fold content
- [ ] Implement code splitting

### Data

- [ ] Cache API responses appropriately
- [ ] Use pagination for large datasets
- [ ] Avoid N+1 queries

### Monitoring

- [ ] Track Core Web Vitals
- [ ] Monitor bundle size in CI
- [ ] Set up performance budgets

## Common Pitfalls

- Not lazy loading heavy components
- Missing image optimization
- Not using route rules for caching
- N+1 database queries
- Importing entire libraries instead of specific functions
- Missing font optimization
- Not using lazy hydration for below-fold content

---

**Last Updated**: 2025-11-09
