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
const groupSlug = computed(() => String(route.query.groupSlug ?? ''));

const newName = ref('');
const newBirthYear = ref<number | null>(null);

// useFetch keyed by slug, client-only — auth cookie isn't forwarded
// during SSR for $fetch/useFetch internal calls in this setup. Tying
// `key` to the slug means switching groups re-runs the fetch.
const {
  data: learnersData,
  refresh: refreshLearners,
  pending: loading,
} = await useFetch<{ learners: Learner[] }>(
  () => `/api/typing/groups/${groupSlug.value}/learners`,
  {
    key: () => `typing:learners:${groupSlug.value}`,
    default: () => ({ learners: [] as Learner[] }),
    ignoreResponseError: true,
    server: false,
    watch: [groupSlug],
    immediate: true,
  },
);
const learners = computed(() => learnersData.value?.learners ?? []);

async function add() {
  if (!newName.value || !groupSlug.value) return;
  await $fetch(`/api/typing/groups/${groupSlug.value}/learners`, {
    method: 'POST',
    body: {
      displayName: newName.value,
      birthYear: newBirthYear.value ?? undefined,
    },
  });
  newName.value = '';
  newBirthYear.value = null;
  await Promise.all([refreshLearners(), refreshNuxtData('typing:groups')]);
}

async function bumpStage(learner: Learner, delta: number) {
  const nextStage = Math.max(1, Math.min(20, learner.currentStage + delta));
  if (nextStage === learner.currentStage) return;
  await $fetch(`/api/typing/groups/${groupSlug.value}/learners/${learner.id}`, {
    method: 'PUT',
    body: { currentStage: nextStage },
  });
  await Promise.all([refreshLearners(), refreshNuxtData('typing:groups')]);
}

// --- Delete with type-the-name confirm ---------------------------------

const deleting = ref<Learner | null>(null);
const deleteTyped = ref('');
const deletePending = ref(false);
const deleteMatches = computed(() => {
  if (!deleting.value) return false;
  const expected = `delete ${deleting.value.displayName.trim().toLowerCase()}`;
  return deleteTyped.value.trim().toLowerCase() === expected;
});

function openDelete(learner: Learner) {
  deleting.value = learner;
  deleteTyped.value = '';
}

function cancelDelete() {
  deleting.value = null;
  deleteTyped.value = '';
}

async function confirmDelete() {
  if (!deleting.value || !deleteMatches.value || deletePending.value) return;
  deletePending.value = true;
  try {
    await $fetch(`/api/typing/groups/${groupSlug.value}/learners/${deleting.value.id}`, {
      method: 'DELETE',
    });
    cancelDelete();
    await Promise.all([refreshLearners(), refreshNuxtData('typing:groups')]);
  } finally {
    deletePending.value = false;
  }
}
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
            <button
              type="button"
              class="rounded border border-rose-300 px-2 py-1 text-sm text-rose-700 hover:bg-rose-50 dark:border-rose-700 dark:text-rose-300 dark:hover:bg-rose-950/40"
              @click="openDelete(learner)"
            >
              Delete
            </button>
          </div>
        </li>
      </ul>
      <p v-else-if="loading" class="text-sm text-slate-500">Loading…</p>
      <p v-else class="text-sm text-slate-500">No learners yet — add one above.</p>
    </section>

    <!-- Type-the-name confirm dialog -->
    <div
      v-if="deleting"
      class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4"
      role="dialog"
      aria-modal="true"
      @click.self="cancelDelete"
    >
      <div
        class="w-full max-w-md space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-900"
      >
        <header>
          <h3 class="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Delete this learner?
          </h3>
          <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">
            This permanently removes
            <strong class="text-slate-900 dark:text-slate-100">{{ deleting.displayName }}</strong>
            and all of their typing progress. Type the name to confirm.
          </p>
        </header>

        <label class="block">
          <span
            class="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400"
          >
            Type: delete {{ deleting.displayName.toLowerCase() }}
          </span>
          <input
            v-model="deleteTyped"
            type="text"
            autocomplete="off"
            :placeholder="`delete ${deleting.displayName.toLowerCase()}`"
            class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
            @keydown.enter="confirmDelete"
          />
        </label>

        <div class="flex justify-end gap-2">
          <button
            type="button"
            class="rounded-lg border border-slate-300 px-4 py-2 text-sm hover:bg-slate-50 dark:border-slate-600 dark:hover:bg-slate-800"
            @click="cancelDelete"
          >
            Cancel
          </button>
          <button
            type="button"
            :disabled="!deleteMatches || deletePending"
            class="rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-50"
            @click="confirmDelete"
          >
            {{ deletePending ? 'Deleting…' : 'Delete' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
