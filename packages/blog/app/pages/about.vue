<script setup lang="ts">
import { TEST_IDS } from '~~/shared/test-ids';
import { hostedExperiments } from '~/utils/experiments';

const appConfig = useAppConfig() as {
  author: { name: string; github: string; twitter: string; bluesky: string };
};

const title = 'About';
const description =
  "I'm Chris Towles — Principal Architect for Cloud AI at GE Aerospace, and a full stack developer who never stopped shipping side projects.";

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description,
});
</script>

<template>
  <UContainer :data-testid="TEST_IDS.ABOUT.PAGE">
    <UPageHeader
      :title="title"
      description="Principal Architect for Cloud AI at GE Aerospace. Twenty-plus years in, still building things on nights and weekends."
      class="py-[50px]"
    />

    <UPageBody>
      <div class="max-w-3xl space-y-5 text-base/7 text-(--ui-text-muted)">
        <p>
          I've been writing software for over twenty years. Most of that time has been spent in the
          unglamorous middle — the integration seams, the deploy pipelines, the places where a clean
          architecture diagram meets a legacy system that disagrees with it.
        </p>
        <p>
          These days my focus is Cloud AI at GE Aerospace. Outside of that, I build on AWS and GCP,
          mostly in TypeScript and Python, and I write here about what actually worked and what
          didn't. The failures are usually the more useful half.
        </p>
        <p>
          Lately that's meant Rust. Towles Tool began as a Bun CLI driving tmux — one pane per
          agent, which stopped scaling about the time I started hunting for the pane that was stuck.
          It's now a Tauri desktop app in Rust. The borrow checker rejects the sloppy version of the
          design before it reaches runtime, and I keep finding the argument was right.
        </p>
        <p>
          This site is also where I test things. Everything listed below runs in production on this
          domain — the chat, the MCP server, the search, the typing app. If something here looks
          interesting,
          <NuxtLink
            :to="appConfig.author.github"
            target="_blank"
            class="text-(--ui-primary) hover:underline"
            >the source is public</NuxtLink
          >.
        </p>
      </div>

      <USeparator class="my-10" />

      <UPageHeader
        title="What's running here"
        description="Built and deployed on this site — Nuxt 4 on Cloud Run, Postgres with pgvector, Terraform for the infrastructure."
        :ui="{ title: 'text-2xl' }"
      />

      <UPageGrid class="mt-8">
        <UPageCard
          v-for="item in hostedExperiments"
          :key="item.to"
          :title="item.title"
          :description="item.description"
          :icon="item.icon"
          :to="item.to"
          spotlight
        >
          <template #footer>
            <div class="flex flex-wrap gap-1.5" :data-testid="TEST_IDS.ABOUT.EXPERIMENT_LANGUAGE">
              <UBadge :label="item.language" color="primary" variant="subtle" size="sm" />
              <UBadge
                v-for="tech in item.stack"
                :key="tech"
                :label="tech"
                color="neutral"
                variant="subtle"
                size="sm"
              />
            </div>
          </template>
        </UPageCard>
      </UPageGrid>

      <USeparator class="my-10" />

      <UPageHeader title="Elsewhere" :ui="{ title: 'text-2xl' }" />

      <div class="mt-6 flex flex-wrap gap-3">
        <UButton
          :to="appConfig.author.github"
          target="_blank"
          icon="i-simple-icons-github"
          label="GitHub"
          color="neutral"
          variant="outline"
        />
        <UButton
          :to="appConfig.author.twitter"
          target="_blank"
          icon="i-simple-icons-x"
          label="X / Twitter"
          color="neutral"
          variant="outline"
        />
        <UButton
          :to="appConfig.author.bluesky"
          target="_blank"
          icon="i-simple-icons-bluesky"
          label="Bluesky"
          color="neutral"
          variant="outline"
        />
        <UButton to="/blog" icon="i-lucide-notebook-text" label="Read the blog" variant="solid" />
      </div>
    </UPageBody>
  </UContainer>
</template>
