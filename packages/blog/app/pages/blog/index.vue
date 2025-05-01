<script setup lang="ts">
const { data: page } = await useAsyncData('blog', () => queryCollection('blog').first())

useSeoMeta({
  title: page.value!.title,
  ogTitle: page.value!.title,
  description: page.value!.description,
  ogDescription: page.value!.description
})
</script>

<template>
  <UContainer>
    <UPageHeader
      v-bind="page"
      class="py-[50px]"
    />
    <UPageBody>
      <BlogPostList />
    </UPageBody>
  </UContainer>
</template>
