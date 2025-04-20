<script setup lang="ts">
// const { data: navigation } = await useAsyncData('navigation', () => queryCollectionNavigation('docs'))

const { data: page } = await useAsyncData('index', () => queryCollection('index').first())

useSeoMeta({
  titleTemplate: '',
  title: page.value?.title,
  ogTitle: page.value?.title,
  description: page.value?.description,
  ogDescription: page.value?.description
})

// const posts = await getBlogPosts({ limit: 10 })
</script>

<template>
  <div v-if="page">
    <UPageHero
      :description="page.hero.description"
      :links="page.hero.links"
    >
      <template #title>
        <span class="font-bold text-(--ui-text-highlighted)">
          Chris Towles's
          <span style="color: var(--ui-primary)">Blog</span>
        </span>
      </template>
      <template #top>
        <div
          class="absolute rounded-full dark:bg-(--ui-primary) blur-[300px] size-60 sm:size-80 transform -translate-x-1/2 left-1/2 -translate-y-80"
        />
      </template>
    </UPageHero>

    <USeparator />

    <UContainer>
      <UPageHeader
        class="py-[50px]"
        title="Blog Posts"
      />
      <UPageBody>
        <BlogPostList />
      </UPageBody>
    </UContainer>

    <USeparator />

    <UPageSection
      :title="page.features.title"
      :description="page.features.description"
    >
      <UPageGrid>
        <UPageCard
          v-for="(item, index) in page.features.items"
          :key="index"
          v-bind="item"
          spotlight
        />
      </UPageGrid>
    </UPageSection>

    <USeparator />

    <UPageSection :title="page.logos.title" />
    <UPageMarquee
      :repeat="6"
      pause-on-hover
      class="pb-8"
    >
      <ULink
        v-for="x in page.logos.links"
        :key="x.label"
        as="button"
        :to="x.to"
      >
        <UIcon
          :to="x.to"
          :name="x.icon"
          class="size-10 shrink-0"
        />
      </ULink>
    </UPageMarquee>
  </div>
</template>
