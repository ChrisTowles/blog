<script setup lang="ts">
import { TEST_IDS } from '~~/shared/test-ids';
import { experiments } from '~/utils/experiments';

const listed = experiments.filter((item) => item.testId !== TEST_IDS.HOME.EXPERIMENT_I_CANT_CLAP);
</script>

<template>
  <section aria-labelledby="experiments-title" :data-testid="TEST_IDS.HOME.EXPERIMENTS">
    <h2
      id="experiments-title"
      class="text-3xl font-bold tracking-tight text-highlighted sm:text-4xl"
    >
      Experiments
    </h2>
    <p class="mt-2 max-w-2xl text-lg/7 text-muted">
      Things I'm testing and learning from. Most of them run on this domain, so you can try them.
    </p>

    <ul class="mt-10 grid gap-x-12 gap-y-9 md:grid-cols-2">
      <li v-for="item in listed" :key="item.to" :class="item.featured && 'md:col-span-2'">
        <ULink
          :to="item.to"
          :external="item.staticPage || item.external"
          :target="item.external ? '_blank' : undefined"
          :data-testid="item.testId"
          class="group flex gap-4 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--ui-primary)"
          raw
        >
          <span
            class="grid shrink-0 place-items-center rounded-sm bg-primary/10 text-primary"
            :class="item.featured ? 'size-12' : 'size-10'"
          >
            <UIcon :name="item.icon" :class="item.featured ? 'size-6' : 'size-5'" />
          </span>
          <span class="grid min-w-0 gap-1.5" :class="item.featured && 'max-w-3xl'">
            <span
              class="flex items-center gap-1.5 font-semibold text-highlighted group-hover:text-primary"
              :class="item.featured ? 'text-xl sm:text-2xl' : 'text-lg'"
            >
              {{ item.title }}
              <UIcon
                v-if="item.external"
                name="i-lucide-arrow-up-right"
                class="size-4 text-dimmed"
                aria-label="opens on GitHub"
              />
            </span>
            <span class="text-muted" :class="item.featured && 'text-lg/7'">
              {{ item.description }}
            </span>
            <span class="text-sm text-dimmed" :data-testid="TEST_IDS.HOME.EXPERIMENT_LANGUAGE">
              {{ [item.language, ...item.stack].join(', ') }}
            </span>
          </span>
        </ULink>
      </li>
    </ul>
  </section>
</template>
