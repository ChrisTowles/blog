<script setup lang="ts">
definePageMeta({
  layout: 'mini-cog',
});

// Educational demo of a proprietary screening instrument — keep it out
// of search indexes.
useHead({
  title: 'Mini-Cog AI Screener — Educational Demo',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' },
    {
      name: 'description',
      content:
        'An educational demonstration of the Mini-Cog cognitive screen, administered and scored by Claude. Not a medical diagnosis.',
    },
  ],
});
</script>

<template>
  <MiniCogAssessment />
</template>
