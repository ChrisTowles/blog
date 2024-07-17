<script setup lang="ts">
import type { AsideLink } from '@nuxt/ui-pro/types'
// import type { ParsedContent } from '@nuxt/content'
import { navbarData } from '../../utils/data'

// const { data: files } = useLazyFetch<ParsedContent[]>('/api/search.json', { default: () => [], server: false })

const links = computed(() => [{
  label: 'Blog List',
  to: '/blog',
}, {
  label: 'Public Apps',
  icon: 'i-heroicons-device-phone-mobile',
  to: '/apps',
},

] satisfies AsideLink[])
</script>

<template>
  <UHeader :links="links">
    <template #logo>
      {{ navbarData.homeTitle }}
      <!-- <UBadge
        label="New"
        variant="subtle"
        class="mb-0.5"
      /> -->
    </template>

    <template #right>
      <UColorModeButton size="lg" />

      <!-- <ClientOnly>
        <LazyUContentSearch :files="files" />
      </ClientOnly> -->
    </template>

    <template #panel>
      <UAsideLinks :links="links" />

      <UDivider class="my-6" />

      <UButton
        label="Sign in"
        color="white"
        block
        class="mb-3"
      />
      <UButton
        label="Get started"
        block
      />
    </template>
  </UHeader>
</template>
