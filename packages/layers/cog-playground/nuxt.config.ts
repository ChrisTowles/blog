export default defineNuxtConfig({
  routeRules: {
    // The cog-playground screens use Canvas + Web Speech (mic/STT) +
    // ephemeral state only. Nothing is server-rendered or persisted.
    // Each page sets its own noindex meta tag (educational demos of
    // cognitive screening instruments).
    '/cog-playground/**': { ssr: false },
  },
});
