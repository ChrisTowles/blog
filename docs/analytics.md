# Google Analytics

GA4 via [nuxt-gtag](https://github.com/johannschopplich/nuxt-gtag) with Consent Mode v2 (all denied by default).

## GA4 Properties

| Property                           | ID        | Purpose             |
| ---------------------------------- | --------- | ------------------- |
| chris.towles.dev                   | 449163216 | Production          |
| chris.towles.dev - Stage and Local | 321994447 | Staging + local dev |

Both properties live under the **Chris Towles** GA account (19124393).

## Measurement IDs

| Environment | Stream  | Measurement ID | URL                              |
| ----------- | ------- | -------------- | -------------------------------- |
| Production  | Prod    | `G-PH525YF11W` | https://chris.towles.dev         |
| Staging     | Staging | `G-KNKR69G927` | https://staging-chris.towles.dev |
| Local       | Local   | `G-57YWQXB9F0` | http://local.chris.towles.dev    |

## Configuration

### How it works

`nuxt-gtag` is configured in `packages/blog/nuxt.config.ts`:

```ts
gtag: {
  id: process.env.NUXT_PUBLIC_GTAG_ID,
  initCommands: [
    ['consent', 'default', {
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      ad_storage: 'denied',
      analytics_storage: 'denied',
    }],
  ],
},
```

The module is always enabled (default `true`) so it registers its runtime config and plugin at build time. Consent Mode v2 defaults all consent categories to `denied` — no cookies until the user opts in.

**Important:** `NUXT_PUBLIC_GTAG_ID` must be set at **build time** (not just runtime) because Nuxt prerenderers bake runtime config into static HTML.

### Per-environment wiring

| Environment | Where the ID is set                                                |
| ----------- | ------------------------------------------------------------------ |
| Local       | `.env` → `NUXT_PUBLIC_GTAG_ID=G-57YWQXB9F0`                        |
| Staging     | `vars` in `wrangler.jsonc` (`env.staging`) for SSR pages           |
| Production  | `deploy.yml` build env, plus `vars` in `wrangler.jsonc` at runtime |

The ID flows through two paths:

1. **Build time** — the `Build` job in `deploy.yml` sets it so prerendered pages include the gtag script. CI builds once for both environments, so prerendered pages on staging carry the production ID.
2. **Runtime** — the Worker's `vars` set it for SSR pages.

## Custom Events

| Event                 | Fired from                  | Data                                  |
| --------------------- | --------------------------- | ------------------------------------- |
| `blog_post_read`      | `pages/blog/[slug].vue`     | `post_slug`, `post_title`             |
| `chat_started`        | `pages/chat/index.vue`      | —                                     |
| `code_runner_execute` | `components/CodeRunner.vue` | `language`, `source` (prompt vs code) |

## GA Console Links

- [Prod property](https://analytics.google.com/analytics/web/#/a19124393p449163216)
- [Stage + Local property](https://analytics.google.com/analytics/web/#/a19124393p321994447)
