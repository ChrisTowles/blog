# Nuxt Studio

Self-hosted WYSIWYG editor for blog content. Uses TipTap/ProseMirror for visual editing with Git-based publishing.

## Docs

- [Setup Guide](https://content.nuxt.com/docs/studio/setup)
- [Introduction](https://content.nuxt.com/docs/studio/introduction)
- [Content Editing](https://content.nuxt.com/docs/studio/content)
- [GitHub Repo](https://github.com/nuxt-content/studio)

## Config

`packages/blog/nuxt.config.ts`:
```ts
studio: {
  route: '/_studio',
  repository: {
    provider: 'github',
    owner: 'christowles',
    repo: 'blog',
    branch: 'main'
  }
}
```

## Environment Variables

Required in `.env`:
```
STUDIO_GITHUB_CLIENT_ID=xxx
STUDIO_GITHUB_CLIENT_SECRET=xxx
STUDIO_GITHUB_MODERATORS=email@example.com  # optional, comma-separated
```

## GitHub OAuth Setup

1. Go to https://github.com/settings/developers
2. Create new OAuth App
3. Set callback URLs:
   - Dev: `http://localhost:3000/_studio/auth/github/callback`
   - Prod: `https://chris.towles.dev/_studio/auth/github/callback`

## Access

Studio UI available at `/_studio` route after authentication.

## Features

- Visual editor (Notion-like)
- Code editor (Monaco)
- Real-time preview
- Direct Git commits
- Media management
- Form-based frontmatter editing
