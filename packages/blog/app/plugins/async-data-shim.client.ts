/**
 * Guards `Cannot read properties of undefined` crashes on `ssr: false`
 * prerendered routes (/chat, /loan): Nuxt 4's `getCachedData` reads
 * `nuxtApp.payload.data[key]` during hydration, but a SPA-mode payload encodes
 * `data: -1` — a devalue self-reference that resolves to `undefined`, so every
 * useAsyncData/useFetch on the page crashes before its handler fires.
 */
export default defineNuxtPlugin({
  name: 'async-data-shim',
  enforce: 'pre',
  setup(nuxtApp) {
    nuxtApp.payload.data ??= {};
    nuxtApp.static.data ??= {};
  },
});
