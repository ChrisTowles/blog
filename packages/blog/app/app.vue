<script setup>
const colorMode = useColorMode();

const color = computed(() => (colorMode.value === 'dark' ? '#020618' : 'white'));

useHead({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color },
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
  script: [{ async: true, src: 'https://platform.twitter.com/widgets.js' }],
});

useSeoMeta({
  ogImage: 'images/ctowles-profile-512x512.png',
  twitterImage: 'images/ctowles-profile-512x512.png',
  twitterCard: 'summary_large_image',
});

const { data: navigation } = await useAsyncData(
  'navigation',
  () => queryCollectionNavigation('posts'),
  {
    transform: (data) => data?.find?.((item) => item.path === '/blog')?.children || [],
    // Nuxt 4's default getCachedData reads `payload.data[key]`, which throws on
    // ssr:false prerendered routes (like /chat) where `payload.data` is undefined
    // after revivification. Return undefined to force a fresh fetch on hydration.
    getCachedData: (key, nuxtApp) => nuxtApp.payload?.data?.[key] ?? nuxtApp.static?.data?.[key],
  },
);
const { data: files } = useLazyAsyncData('search', () => queryCollectionSearchSections('posts'), {
  server: false,
  // See note on the navigation useAsyncData above: same payload.data undefined
  // issue on ssr:false prerendered routes.
  getCachedData: (key, nuxtApp) => nuxtApp.payload?.data?.[key] ?? nuxtApp.static?.data?.[key],
});

const links = [
  {
    label: 'Blog',
    icon: 'i-lucide-pencil',
    to: '/blog',
  },
  {
    label: 'Workflows',
    icon: 'i-lucide-workflow',
    to: '/workflows',
  },
];

// provide('navigation', navigation)
</script>

<template>
  <UApp :toaster="{ position: 'top-right' }">
    <NuxtLoadingIndicator color="var(--ui-primary)" />
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
