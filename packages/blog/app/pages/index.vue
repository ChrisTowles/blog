<script setup lang="ts">
import { TEST_IDS } from '~~/shared/test-ids';

const appConfig = useAppConfig();

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
    <UContainer class="space-y-20 pt-10 pb-24 sm:space-y-28 sm:pt-16">
      <header class="max-w-4xl">
        <h1
          class="text-[1.75rem]/tight font-bold tracking-tight text-pretty text-highlighted sm:text-4xl/tight"
        >
          {{ page.intro.headline }}
        </h1>
        <div class="mt-5 max-w-3xl space-y-4 text-lg/7 text-pretty text-muted sm:text-xl/8">
          <p>{{ page.intro.body }}</p>
          <p>
            Two places to start:
            <template v-for="(link, index) in page.intro.start" :key="link.to">
              <span v-if="index > 0"> and </span>
              <NuxtLink
                :to="link.to"
                class="font-medium text-highlighted underline decoration-(--ui-primary) decoration-2 underline-offset-4 hover:text-primary"
                >{{ link.label }}</NuxtLink
              > </template
            >.
          </p>
        </div>
        <div class="mt-8">
          <UButton
            :to="appConfig.author.github"
            target="_blank"
            icon="i-simple-icons-github"
            label="GitHub"
            color="neutral"
            variant="outline"
          />
        </div>
      </header>

      <HomeWriting />
      <HomeExperiments />
    </UContainer>
  </div>
</template>
