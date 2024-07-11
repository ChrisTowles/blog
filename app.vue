<script setup>
import { joinURL } from 'ufo'

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

const site = useSiteConfig()
const imageUrl = joinURL(site.url, 'images/ctowles-profile-512x512.png')

useSeoMeta({
  ogImage: imageUrl,
  twitterImage: imageUrl,
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
