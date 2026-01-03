<script setup lang="ts">
import { TEST_IDS } from '~~/shared/test-ids'

const { data: page } = await useAsyncData('blog', () => queryCollection('blog').first())

const title = page.value?.title ?? 'Blog'
const description = page.value?.description ?? 'Blog posts and articles'

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
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
