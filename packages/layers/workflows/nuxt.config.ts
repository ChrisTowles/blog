export default defineNuxtConfig({
  routeRules: {
    '/workflows': { ssr: false },
    '/workflows/**': { ssr: false },
  },
});
