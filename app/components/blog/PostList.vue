<script setup lang="ts">
const route = useRoute()

const { data: posts } = await useAsyncData(route.path, () => queryCollection('posts').order('date', 'DESC').all())
</script>

<template>
  <UBlogPosts>
    <UBlogPost
      v-for="(post, index) in posts"
      :key="index"
      :to="post.path"
      :title="post.title"
      :description="post.description"
      :image="post.image"
      :date="new Date(post.date).toLocaleDateString('en', { year: 'numeric', month: 'short', day: 'numeric' })"
      :authors="post.authors"

      :badge="{
        label: post.badge ? post.badge.label : '',
        color: 'primary'

      }"
      :orientation="index === 0 ? 'horizontal' : 'vertical'"
      :class="[index === 0 && 'col-span-full']"
      variant="naked"
      :ui="{
        description: 'line-clamp-2'
      }"
    />
  </UBlogPosts>
</template>
