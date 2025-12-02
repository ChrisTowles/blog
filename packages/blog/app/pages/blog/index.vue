<script setup lang="ts">
import { TEST_IDS } from '~~/shared/test-ids'

const { data: page } = await useAsyncData('blog', () => queryCollection('blog').first())

useSeoMeta({
  title: page.value!.title,
  ogTitle: page.value!.title,
  description: page.value!.description,
  ogDescription: page.value!.description
})
</script>

<template>
  <UContainer :data-testid="TEST_IDS.BLOG.PAGE">
    <UPageHeader
      v-bind="page"
      class="py-[50px]"
    />
    <UPageBody>
      <BlogPostList />
    </UPageBody>
  </UContainer>
</template>
