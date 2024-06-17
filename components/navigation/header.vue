<script setup lang="ts">
import type { AsideLink } from '@nuxt/ui-pro/types'
import { navbarData } from './../../data'

const links = computed(() => [{
  label: 'Blog List',
  to: '/blog',
}, {
  label: 'Mobile Apps',
  icon: 'i-heroicons-device-phone-mobile',
  to: '/apps',
},

] satisfies AsideLink[])
</script>

<template>
  <UHeader :links="links">
    <template #logo>
      {{ navbarData.homeTitle }} <UBadge
        label="Landing"
        variant="subtle"
        class="mb-0.5"
      />
    </template>

    <template #right>
      <UColorModeButton size="lg" />
      <!-- <UButton
        label="Sign in"
        color="white"
        variant="ghost"
        trailing-icon="i-heroicons-arrow-right-20-solid"
        class="hidden lg:flex"
      /> -->
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
