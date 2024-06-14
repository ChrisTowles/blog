// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-16',
      viewport: 'width=device-width,initial-scale=1',
      title: 'Chris\'s Blog',
      titleTemplate: '%s - Chris Towles\'s Blog',
      meta: [{ name: 'description', content: 'Chris Towles Blog' }],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
  },
   modules: [
    // 'nuxt-icon',
    '@nuxt/image',
     '@vueuse/nuxt',
     // ['@nuxtjs/eslint-module', { /* module options */ }],
  
    // 'nuxt-og-image',
     '@nuxt/content',
    // '@nuxtjs/robots',
    // '@nuxtjs/fontaine',
     '@nuxtjs/color-mode',
    // 'nuxt-simple-sitemap',
      '@nuxtjs/tailwindcss',
    // '@stefanobartoletti/nuxt-social-share',
  ],
  
   
  typescript: {
    strict: true,
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: [
        '/',
      ],
    },
  },

  devtools: { enabled: true }
  
})
