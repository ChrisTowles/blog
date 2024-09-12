// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    extends: ['@nuxt/ui-pro'],

    modules: [
        '@nuxt/content',
        '@nuxt/image',
        '@vueuse/nuxt',
        '@nuxt/eslint',
        '@nuxt/fonts',
        // '@nuxtjs/eslint-module', { /* module options */ }],
        // 'nuxt-icon',
        // 'nuxt-og-image',
        // '@nuxtjs/robots',
        // '@nuxtjs/fontaine',
        // 'nuxt-simple-sitemap',
        // '@stefanobartoletti/nuxt-social-share',
        '@nuxt/ui',
        '@nuxtjs/seo',
        'nuxt-gtag',
        '@nuxtjs/sitemap',
    ],

    app: {
        head: {
            charset: 'utf-16',
            viewport: 'width=device-width,initial-scale=1',
            title: 'Chris\'s Towles Blog',
            titleTemplate: '%s - Software, Development and Technology Architecture',
            meta: [{ name: 'description', content: 'Chris Towles Blog' }],
        },
        pageTransition: { name: 'page', mode: 'out-in' },
        layoutTransition: { name: 'layout', mode: 'out-in' },
    },

    site: {
        url: 'https://chris.towles.dev',

    },

    ui: {
        icons: ['heroicons', 'simple-icons'],
    },

    routeRules: {
        '/': { prerender: true },
    },

    typescript: {
    // typeCheck: true,
        strict: true,
    },

    // nitro: {
    //   prerender: {
    //     autoSubfolderIndex: false, // https://nuxt.com/deploy/cloudflare
    //     crawlLinks: true,
    //     routes: [
    //       '/',
    //     ],
    //   },
    // },

    // set in .env with NUXT_PUBLIC_GTAG_ID
    gtag: {
        id: 'G-X0H34W6PGC', // set correct here, but over ridden locally G-XXXXXXXXX
        config: { anonymize_ip: false },
    },

    devtools: { enabled: true },
    compatibilityDate: '2024-09-12',

    future: {
        compatibilityVersion: 4,
    },
})
