export default defineNuxtConfig({
  routeRules: {
    // Games are PixiJS-only; keep SSR off for them.
    '/typing/game/**': { ssr: false },
    // Spelling-image upload uses the FileReader API; skip SSR.
    '/typing/spelling/new': { ssr: false },
  },
});
