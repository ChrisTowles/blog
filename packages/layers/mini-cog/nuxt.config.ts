export default defineNuxtConfig({
  routeRules: {
    // The assessment uses Canvas + Web Speech (mic/STT) + ephemeral
    // state only. Nothing is server-rendered or persisted. The page
    // sets a noindex meta tag itself (educational demo of a
    // proprietary screening instrument).
    '/mini-cog': { ssr: false },
  },
});
