<script setup lang="ts">
definePageMeta({
  layout: 'cog-playground',
});

// Educational demo of a custom AI-administered cognitive screen.
// Not a validated clinical instrument — keep it out of search indexes.
useHead({
  title: 'AI Cognitive Check (Composed) — Educational Demo',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' },
    {
      name: 'description',
      content:
        'An AI-administered cognitive check inspired by standard public-domain neuropsychology tasks. Not a medical diagnosis.',
    },
  ],
});
</script>

<template>
  <ComposedAssessment />
</template>
