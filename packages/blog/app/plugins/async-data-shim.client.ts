/**
 * Guard against `Cannot read properties of undefined (reading '<key>')` crashes
 * on `ssr: false` prerendered routes (e.g. /chat, /loan).
 *
 * Nuxt 4's default `getCachedData` reads `nuxtApp.payload.data[key]` during
 * hydration. For SPA-mode prerendered pages, the devalue payload is
 * `[{"data":-1,...}]` — `data: -1` is a devalue self-reference that resolves
 * to `undefined`, so any useAsyncData/useFetch call on such a page crashes
 * before it even fires its handler.
 *
 * Pre-seeding both maps as empty objects makes the default lookup return
 * `undefined` cleanly (a cache miss), letting Nuxt fall through to executing
 * the handler as intended.
 */
export default defineNuxtPlugin({
  name: 'async-data-shim',
  enforce: 'pre',
  setup(nuxtApp) {
    nuxtApp.payload.data ??= {};
    nuxtApp.static.data ??= {};
  },
});
