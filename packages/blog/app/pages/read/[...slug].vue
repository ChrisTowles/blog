<script setup lang="ts">
definePageMeta({
  layout: 'default',
});

const route = useRoute();

const slug = computed(() => {
  const params = route.params.slug;
  if (Array.isArray(params)) return params.join('/');
  return params ?? '';
});

useSeoMeta({
  title: `Reading: ${slug.value}`,
});
</script>

<template>
  <ReaderSplitPanelContainer :slug="slug" />
</template>
