<script setup lang="ts">
definePageMeta({
  layout: 'cog-playground',
});

// Mini-ACE-inspired educational demo. Under Hodges's explicit grant
// for non-commercial digital reimplementation; framed as a demo and
// kept out of search indexes.
useHead({
  title: 'Mini-ACE Style Brain Check — Educational Demo',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' },
    {
      name: 'description',
      content:
        'A Mini-ACE-inspired AI-administered cognitive check: registration, time orientation, fluency, clock, and address recall. Not a medical diagnosis.',
    },
  ],
});
</script>

<template>
  <MiniAceAssessment />
</template>
