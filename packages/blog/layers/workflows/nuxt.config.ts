export default defineNuxtConfig({
  routeRules: {
    '/workflows': { ssr: false, prerender: false },
    '/workflows/**': { ssr: false, prerender: false },
  },
});
