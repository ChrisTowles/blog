<script setup lang="ts">
import { TEST_IDS } from '~~/shared/test-ids';
import { experiments } from '~/utils/experiments';

const { data: page } = await useAsyncData('index', () => queryCollection('index').first());

useSeoMeta({
  titleTemplate: '',
  title: page.value?.title,
  ogTitle: page.value?.title,
  description: page.value?.description,
  ogDescription: page.value?.description,
});
</script>

<template>
  <div v-if="page" :data-testid="TEST_IDS.HOME.PAGE">
    <UPageHero :description="page.hero.description" :links="page.hero.links">
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

    <UPageSection
      title="Things I've built"
      description="Most of these run right here on this domain. Poke at any of them."
      :data-testid="TEST_IDS.HOME.EXPERIMENTS"
    >
      <UPageGrid>
        <!-- UPageGrid is 1/2/3 columns. `sm:col-span-2` gives the featured card
             the full row at sm and two of the three columns from lg up. -->
        <UPageCard
          v-for="item in experiments"
          :key="item.to"
          :title="item.title"
          :description="item.description"
          :icon="item.icon"
          :to="item.to"
          :target="item.external ? '_blank' : undefined"
          :data-testid="item.testId"
          :class="item.featured ? 'sm:col-span-2' : undefined"
          :ui="item.featured ? { title: 'text-xl', description: 'text-base' } : undefined"
          spotlight
        >
          <template #footer>
            <UBadge
              :label="item.language"
              color="neutral"
              variant="subtle"
              size="sm"
              :data-testid="TEST_IDS.HOME.EXPERIMENT_LANGUAGE"
            />
          </template>
        </UPageCard>
      </UPageGrid>
    </UPageSection>

    <USeparator />

    <UContainer>
      <UPageHeader
        class="py-[50px]"
        title="Blog Posts"
        :data-testid="TEST_IDS.BLOG.POST_LIST_SECTION"
      />
      <UPageBody>
        <BlogPostList />
      </UPageBody>
    </UContainer>
  </div>
</template>
