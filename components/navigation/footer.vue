<script setup lang="ts">

import type { FooterLink } from '@nuxt/ui-pro/types'
const links: { label: string; children: FooterLink[]; }[] = [{

  label: 'Social',
  children: [{
    label: 'GitHub',
    to: 'https://github.com/ChrisTowles'
  },
    {
      label: 'X / Twitter',
      to: 'https://x.com/Chris_Towles'
    }]
}]


</script>

<template>
  <UFooter>
    <template #top>
      <UFooterColumns :links="links">
       
      </UFooterColumns>
    </template>

    <template #left>
      <p class="text-gray-500 dark:text-gray-400 text-sm">
        Copyright © {{ new Date().getFullYear() }}. All rights reserved.
      </p>
    </template>

    <template #right>


      <UButton
        to="https://github.com/ChrisTowles/blog"
        target="_blank"
        icon="i-simple-icons-github"
        aria-label="GitHub"
        color="gray"
        variant="ghost"
      />
    </template>
  </UFooter>
</template>