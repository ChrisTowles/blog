export default defineNuxtConfig({
  routeRules: {
    '/typing/game/**': { ssr: false },
    '/typing/lesson/**': { ssr: false },
    '/typing/topics': { ssr: false },
    '/typing/spelling/new': { ssr: false },
  },
});
