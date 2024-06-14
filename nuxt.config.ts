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

   ui: {
    global: true,
    icons: ['mdi', 'simple-icons']
  },
   modules: [// 'nuxt-icon',
     '@nuxt/image',
     '@vueuse/nuxt', // ['@nuxtjs/eslint-module', { /* module options */ }],

   // 'nuxt-og-image',
   '@nuxt/content', // '@nuxtjs/robots',
   // '@nuxtjs/fontaine',
    // 'nuxt-simple-sitemap',
   // '@stefanobartoletti/nuxt-social-share',
    
    "@nuxt/ui"],
  
   
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