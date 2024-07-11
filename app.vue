<script setup>
// import { siteMetaData } from './data'

// useHead({
//   htmlAttrs: {
//     lang: 'en',
//   },
//   meta: () => siteMetaData,
// })

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' },
  ],
  htmlAttrs: {
    lang: 'en',
  },
  scripts: [
    //  { async: 'async', src: `https://platform.twitter.com/widgets.js` },
  ],
})

// TODO: fix up
useSeoMeta({
  ogImage: '/images/ctowles-profile-512x512',
  twitterImage: '/images/ctowles-profile-512x512',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <UNotifications />
</template>
