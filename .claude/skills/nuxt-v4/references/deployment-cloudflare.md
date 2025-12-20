# Cloudflare Deployment - Complete Guide

Comprehensive guide to deploying Nuxt 4 applications on Cloudflare Pages and Workers.

## Table of Contents

- [Cloudflare Pages](#cloudflare-pages)
- [Cloudflare Workers](#cloudflare-workers)
- [NuxtHub Integration](#nuxthub-integration)
- [Bindings](#bindings)
- [Environment Variables](#environment-variables)
- [WebSocket Support](#websocket-support)
- [CI/CD Setup](#cicd-setup)
- [Troubleshooting](#troubleshooting)

## Cloudflare Pages

### Automatic Deployment (Recommended)

1. Push your Nuxt project to GitHub
2. Go to Cloudflare Dashboard → Pages
3. Create new project → Connect to Git
4. Select your repository
5. Cloudflare auto-detects Nuxt:
   - Build command: `npm run build`
   - Output directory: `.output/public`
6. Deploy!

### Manual Deployment

```bash
# Build for Pages
npm run build

# Deploy with wrangler
npx wrangler pages deploy .output/public --project-name my-nuxt-app
```

### Configuration

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  nitro: {
    preset: 'cloudflare-pages'
  }
})
```

## Cloudflare Workers

**Requirements**: Compatibility date `2024-09-19` or later

### Setup

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  nitro: {
    preset: 'cloudflare-module'
  }
})
```

### Build & Deploy

```bash
npm run build
npx wrangler deploy
```

### wrangler.toml

```toml
name = "my-nuxt-app"
main = ".output/server/index.mjs"
compatibility_date = "2024-09-19"
compatibility_flags = ["nodejs_compat"]

[site]
bucket = ".output/public"

[vars]
PUBLIC_API_URL = "https://api.example.com"

[[d1_databases]]
binding = "DB"
database_name = "my-database"
database_id = "your-database-id"

[[kv_namespaces]]
binding = "KV"
id = "your-kv-id"

[[r2_buckets]]
binding = "R2"
bucket_name = "my-bucket"

[[queues.producers]]
binding = "QUEUE"
queue = "my-queue"
```

## NuxtHub Integration

Zero-config Cloudflare bindings for Nuxt.

### Installation

```bash
npm install @nuxthub/core
```

### Configuration

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxthub/core'],

  hub: {
    database: true,  // D1 database
    kv: true,        // KV storage
    blob: true,      // R2 blob storage
    cache: true,     // Cache API
    ai: true         // Workers AI
  }
})
```

### Usage

```typescript
// server/api/users.get.ts
export default defineEventHandler(async (event) => {
  // Database
  const db = hubDatabase()
  const users = await db.select().from(tables.users)

  // KV
  const kv = hubKV()
  await kv.set('users-count', users.length)

  // Blob
  const blob = hubBlob()
  const avatar = await blob.get('avatars/user-1.jpg')

  return { users }
})
```

## Bindings

### D1 Database

```bash
# Create database
npx wrangler d1 create my-database

# Add to wrangler.toml
[[d1_databases]]
binding = "DB"
database_name = "my-database"
database_id = "your-database-id"
```

```typescript
// server/utils/db.ts
import { drizzle } from 'drizzle-orm/d1'
import * as schema from '../database/schema'

export const useDB = (event: H3Event) => {
  const { cloudflare } = event.context

  if (!cloudflare?.env?.DB) {
    throw createError({
      statusCode: 500,
      message: 'Database not configured'
    })
  }

  return drizzle(cloudflare.env.DB, { schema })
}
```

### KV Storage

```bash
npx wrangler kv:namespace create MY_KV

[[kv_namespaces]]
binding = "KV"
id = "your-kv-id"
```

```typescript
// server/utils/kv.ts
export const useKV = (event: H3Event) => {
  const { cloudflare } = event.context

  if (!cloudflare?.env?.KV) {
    throw createError({
      statusCode: 500,
      message: 'KV not configured'
    })
  }

  return cloudflare.env.KV
}

// Usage
const kv = useKV(event)
await kv.put('key', 'value', { expirationTtl: 3600 })
const value = await kv.get('key')
```

### R2 Storage

```bash
npx wrangler r2 bucket create my-bucket

[[r2_buckets]]
binding = "R2"
bucket_name = "my-bucket"
```

```typescript
// server/api/upload.post.ts
export default defineEventHandler(async (event) => {
  const formData = await readMultipartFormData(event)
  const file = formData?.find((item) => item.name === 'file')

  if (!file) {
    throw createError({ statusCode: 400, message: 'No file' })
  }

  const { cloudflare } = event.context
  await cloudflare.env.R2.put(file.filename, file.data, {
    httpMetadata: { contentType: file.type }
  })

  return { success: true, filename: file.filename }
})
```

### Workers AI

```toml
[ai]
binding = "AI"
```

```typescript
// server/api/ai/generate.post.ts
export default defineEventHandler(async (event) => {
  const { prompt } = await readBody(event)
  const { cloudflare } = event.context

  const response = await cloudflare.env.AI.run(
    '@cf/meta/llama-2-7b-chat-int8',
    { prompt }
  )

  return response
})
```

## Environment Variables

### Development (.dev.vars)

```bash
API_SECRET=your-secret
DATABASE_URL=your-db-url
```

### Production

```bash
npx wrangler secret put API_SECRET
npx wrangler secret put DATABASE_URL
```

### Usage

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  runtimeConfig: {
    apiSecret: process.env.API_SECRET,
    public: {
      apiUrl: process.env.PUBLIC_API_URL
    }
  }
})

// In server routes
export default defineEventHandler((event) => {
  const config = useRuntimeConfig()
  const secret = config.apiSecret
})
```

## WebSocket Support

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  nitro: {
    experimental: {
      websocket: true
    }
  }
})
```

```typescript
// server/api/ws.ts
export default defineWebSocketHandler({
  open(peer) {
    peer.send({ type: 'connected' })
  },
  message(peer, message) {
    peer.send({ type: 'echo', data: message })
  },
  close(peer) {
    console.log('Disconnected:', peer.id)
  }
})
```

## CI/CD Setup

### GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy to Cloudflare Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - run: npm install
      - run: npm run build

      - uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: my-nuxt-app
          directory: .output/public
```

## Troubleshooting

### Build Fails

```toml
# wrangler.toml
[build]
command = "npm run build"
```

### Missing Bindings

Install `nitro-cloudflare-dev` for local development:

```bash
npm install -D nitro-cloudflare-dev
```

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['nitro-cloudflare-dev']
})
```

### WebSocket Not Working

1. Ensure `websocket: true` in config
2. Use `wss://` protocol
3. Check compatibility date >= `2024-09-19`

### Environment Variables Undefined

1. Use `wrangler secret put` for sensitive values
2. Use `[vars]` in `wrangler.toml` for public values
3. Access via `useRuntimeConfig()`

## Best Practices

1. **Use NuxtHub** for zero-config bindings
2. **Enable compression** in Nitro config
3. **Use route rules** for caching
4. **Set up CI/CD** for automatic deployments
5. **Use secrets** for sensitive data
6. **Enable WebSockets** for real-time features
7. **Monitor performance** with Analytics
8. **Use custom domains** for production
9. **Test locally** with nitro-cloudflare-dev
10. **Keep compatibility date** current

---

**Last Updated**: 2025-11-09
