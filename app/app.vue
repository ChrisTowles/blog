<script setup>

const colorMode = useColorMode()

const color = computed(() => colorMode.value === 'dark' ? '#020618' : 'white')


useHead({
    meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color }
    ],
    link: [
        { rel: 'icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
    ],
    htmlAttrs: {
        lang: 'en',
    },
    scripts: [
    //  { async: 'async', src: `https://platform.twitter.com/widgets.js` },
    ],
})

useSeoMeta({
    ogImage: 'images/ctowles-profile-512x512.png',
    twitterImage: 'images/ctowles-profile-512x512.png',
    twitterCard: 'summary_large_image',
})


 const { data: navigation } = await useAsyncData('navigation', () => queryCollectionNavigation('posts'), {
   transform: data => data.find(item => item.path === '/blog')?.children || []
 })
const { data: files } = useLazyAsyncData('search', () => queryCollectionSearchSections('posts'), {
  server: false
})


const links = [{
  label: 'Blog',
  icon: 'i-lucide-pencil',
  to: '/blog'
},
{
  label: 'Apps',
  icon: 'i-lucide-book',
  to: '/apps'
}
]


// provide('navigation', navigation)

</script>

<template>
<UApp>
    <NuxtLoadingIndicator />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        shortcut="meta_k"
        :navigation="navigation"
        :links="links"
        :fuse="{ resultLimit: 42 }"
      />
    </ClientOnly>
  </UApp>
</template>
