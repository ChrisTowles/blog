# Chris Towles Blog

![cicd badge](https://github.com/ChrisTowles/blog/actions/workflows/ci.yml/badge.svg?branch=main)

This is just my personal blog at <https://Chris.Towles.dev>

## Quick Links

- [Blog](https://chris.towles.dev)
- [NuxtHub Admin](https://admin.hub.nuxt.com/)
- [Cloudflare Dashboard](https://dash.cloudflare.com/)
- [Nuxt UI Components](https://ui.nuxt.com/components#element)
- [Google Search Console](https://search.google.com/search-console/)

## Blog Tech Stack

- [Nuxt](https://nuxtjs.org/)
  - using nuxt-content
- [Nuxt UI Pro](https://ui.nuxt.com/)
  - Paid for [Nuxt UI Pro](https://ui.nuxt.com/) ($249)
    - First, any time I spend doing CSS and even Tailwind is time wasted.
    - Happy to give back to NuxtLabs, I've used so much from [Anthfu](https://github.com/antfu), [Daniel Roe](https://github.com/danielroe) and Vue and Nuxt core members.
- Cloudflare
  - Paid for Cloudflare ($5 Monthly)
  - can likely go back to free but ran over the 1mb file limit.
- [NuxtHub](https://hub.nuxt.com/)
  - this switched hosting to cloudflare workers from cloudflare pages.
  - AI
    - hubAI() is disabled: link a project with `npx nuxthub link` to run AI models in development mode.
- [Nuxt Chat](https://github.com/nuxt-ui-pro/chat)
  - using the Nuxt UI Pro Chat Template
- Icons
  - <https://heroicons.com/>
  - <https://simpleicons.org/>


- [@ai-sdk/vue](https://sdk.vercel.ai/docs/getting-started/nuxt)

- GitHub OAuth client ID - Setup 
 - https://github.com/settings/developers
 - https://nuxt.com/modules/auth-utils


## Development

```bash
# Install dependencies
pnpm install

# Start dev server with remote storage
pnpm dev

# Run tests
pnpm test

# Build for production
pnpm build
```

## Content Management

Blog posts are stored in `packages/blog/content/2.blog/` using Markdown with frontmatter.

### Creating Blog Posts

File naming: `YYYYMMDD.post-title.md`

Use the blog-content-architect agent for creating focused, concise posts (800-1500 words).

## Great Examples of Nuxt UI Pro

- <https://github.com/nuxt-ui-pro/saas>
- <https://github.com/nuxt-ui-pro/landing>
