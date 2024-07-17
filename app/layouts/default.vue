<script setup>
// import { UMain } from '@nuxt/ui'
</script>

<template>
  <div>
    <NavigationHeader />

    <UMain>
      <slot />
    </UMain>

    <NavigationFooter />
  </div>
</template>
