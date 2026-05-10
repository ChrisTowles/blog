<script setup lang="ts">
import { TEST_IDS } from '~~/shared/test-ids';
import type { Learner } from '~~/shared/typing-types';

definePageMeta({
  layout: 'typing',
});

useHead({
  title: 'Typing — Learners',
  meta: [{ name: 'description', content: 'Add and manage learners in your typing-app group.' }],
});

const route = useRoute();
const groupId = computed(() => Number(route.query.groupId ?? 0));

const learners = ref<Learner[]>([]);
const loading = ref(false);
const newName = ref('');
const newBirthYear = ref<number | null>(null);

async function load() {
  if (!groupId.value) return;
  loading.value = true;
  try {
    const result = await $fetch<{ learners: Learner[] }>(
      `/api/typing/groups/${groupId.value}/learners`,
    );
    learners.value = result.learners;
  } finally {
    loading.value = false;
  }
}

async function add() {
  if (!newName.value || !groupId.value) return;
  await $fetch(`/api/typing/groups/${groupId.value}/learners`, {
    method: 'POST',
    body: {
      displayName: newName.value,
      birthYear: newBirthYear.value ?? undefined,
    },
  });
  newName.value = '';
  newBirthYear.value = null;
  await load();
}

async function bumpStage(learner: Learner, delta: number) {
  const nextStage = Math.max(1, Math.min(20, learner.currentStage + delta));
  if (nextStage === learner.currentStage) return;
  await $fetch(`/api/typing/groups/${groupId.value}/learners/${learner.id}`, {
    method: 'PUT',
    body: { currentStage: nextStage },
  });
  await load();
}

await load();
</script>

<template>
  <div :data-testid="TEST_IDS.TYPING.GROUP_LEARNERS_PAGE" class="space-y-8">
    <header>
      <NuxtLink
        to="/typing/group"
        class="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
      >
        &larr; Back to group
      </NuxtLink>
      <h1 class="mt-2 text-3xl font-bold text-slate-900 dark:text-slate-100">Learners</h1>
    </header>

    <section class="space-y-3">
      <h2 class="text-xl font-semibold text-slate-900 dark:text-slate-100">Add learner</h2>
      <form class="flex flex-wrap items-end gap-3" @submit.prevent="add">
        <label class="flex-1">
          <span class="block text-sm text-slate-700 dark:text-slate-200">Name</span>
          <input
            v-model="newName"
            required
            class="w-full rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
          />
        </label>
        <label>
          <span class="block text-sm text-slate-700 dark:text-slate-200">Birth year</span>
          <input
            v-model.number="newBirthYear"
            type="number"
            min="1900"
            max="2100"
            class="w-32 rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
          />
        </label>
        <button
          class="rounded-lg bg-amber-700 px-4 py-2 text-sm font-medium text-white hover:bg-amber-800"
          type="submit"
        >
          Add
        </button>
      </form>
    </section>

    <section class="space-y-3">
      <h2 class="text-xl font-semibold text-slate-900 dark:text-slate-100">Learners</h2>
      <ul v-if="learners.length > 0" class="space-y-2">
        <li
          v-for="learner in learners"
          :key="learner.id"
          class="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-800"
        >
          <div>
            <div class="font-semibold text-slate-900 dark:text-slate-100">
              {{ learner.displayName }}
            </div>
            <div class="text-sm text-slate-600 dark:text-slate-300">
              Stage {{ learner.currentStage }}
            </div>
          </div>
          <div class="flex gap-2">
            <button
              type="button"
              class="rounded border border-slate-300 px-2 py-1 text-sm hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-700"
              @click="bumpStage(learner, -1)"
            >
              −
            </button>
            <button
              type="button"
              class="rounded border border-slate-300 px-2 py-1 text-sm hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-700"
              @click="bumpStage(learner, 1)"
            >
              +
            </button>
          </div>
        </li>
      </ul>
      <p v-else-if="loading" class="text-sm text-slate-500">Loading…</p>
      <p v-else class="text-sm text-slate-500">No learners yet — add one above.</p>
    </section>
  </div>
</template>
