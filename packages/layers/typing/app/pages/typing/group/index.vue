<script setup lang="ts">
import { TEST_IDS } from '~~/shared/test-ids';
import type { Learner, TypingGroup } from '~~/shared/typing-types';

definePageMeta({
  layout: 'typing',
});

useHead({ title: 'Typing — Group' });

const { data, refresh, error } = await useFetch<{
  groups: Array<{ group: TypingGroup; learners: Learner[] }>;
}>('/api/typing/groups', {
  default: () => ({ groups: [] }),
  ignoreResponseError: true,
});

const isUnauthed = computed(() => {
  const status = error.value && 'statusCode' in error.value ? error.value.statusCode : null;
  return status === 401;
});

const groups = computed(() => data.value?.groups ?? []);

const newGroupName = ref('');
const newLearnerName = ref('');
const inviteLink = ref<string | null>(null);
const inviteExpires = ref<string | null>(null);
const creating = ref(false);

async function createFamily() {
  if (!newGroupName.value || creating.value) return;
  creating.value = true;
  try {
    await $fetch('/api/typing/groups', {
      method: 'POST',
      body: {
        name: newGroupName.value,
        kind: 'family',
        initialLearnerName: newLearnerName.value || undefined,
      },
    });
    newGroupName.value = '';
    newLearnerName.value = '';
    await refresh();
  } finally {
    creating.value = false;
  }
}

async function generateInvite(groupId: number) {
  const result = await $fetch<{ url: string; expiresAt: string }>(
    `/api/typing/groups/${groupId}/invite`,
    { method: 'POST' },
  );
  inviteLink.value = result.url;
  inviteExpires.value = result.expiresAt;
}
</script>

<template>
  <div :data-testid="TEST_IDS.TYPING.GROUP_PAGE" class="space-y-8">
    <header>
      <h1 class="text-3xl font-bold text-slate-900 dark:text-slate-100">Group</h1>
      <p class="mt-2 text-slate-600 dark:text-slate-300">
        Families and classrooms — manage learners and invite other guardians.
      </p>
    </header>

    <section
      v-if="isUnauthed"
      class="rounded-xl border border-amber-300 bg-amber-50 p-5 text-amber-900 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-200"
    >
      <p class="text-sm">Sign in to create a family or join one via an invite link.</p>
      <NuxtLink
        to="/typing/sign-in"
        class="mt-3 inline-flex rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700"
      >
        Sign in
      </NuxtLink>
    </section>

    <section v-else-if="groups.length === 0" class="space-y-3">
      <h2 class="text-xl font-semibold text-slate-900 dark:text-slate-100">Create your family</h2>
      <p class="text-sm text-slate-600 dark:text-slate-300">
        You'll be the first guardian. Add an initial learner now or do it later.
      </p>
      <form class="space-y-3" @submit.prevent="createFamily">
        <input
          v-model="newGroupName"
          required
          placeholder="Family name (e.g. The Towles)"
          class="w-full rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
        />
        <input
          v-model="newLearnerName"
          placeholder="First learner name (optional)"
          class="w-full rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
        />
        <button
          :disabled="creating"
          class="rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700 disabled:opacity-50"
          type="submit"
        >
          {{ creating ? 'Creating…' : 'Create family' }}
        </button>
      </form>
    </section>

    <section v-else class="space-y-6">
      <article
        v-for="entry in groups"
        :key="entry.group.id"
        class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800"
      >
        <header class="mb-3 flex items-baseline justify-between gap-3">
          <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-100">
            {{ entry.group.name }}
          </h2>
          <span
            class="rounded-full bg-slate-100 px-2 py-0.5 text-xs uppercase tracking-wide text-slate-600 dark:bg-slate-700 dark:text-slate-300"
          >
            {{ entry.group.kind }}
          </span>
        </header>

        <h3 class="mb-2 text-sm font-semibold text-slate-700 dark:text-slate-200">Learners</h3>
        <ul v-if="entry.learners.length > 0" class="mb-4 space-y-1 text-sm">
          <li v-for="learner in entry.learners" :key="learner.id">
            {{ learner.displayName }} · stage {{ learner.currentStage }}
          </li>
        </ul>
        <p v-else class="mb-4 text-sm text-slate-500">No learners yet.</p>

        <div class="flex flex-wrap items-center gap-2">
          <NuxtLink
            :to="`/typing/group/learners?groupId=${entry.group.id}`"
            class="rounded-lg border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-50 dark:border-slate-600 dark:hover:bg-slate-700"
          >
            Manage learners
          </NuxtLink>
          <button
            type="button"
            :data-testid="TEST_IDS.TYPING.GROUP_INVITE_LINK"
            class="rounded-lg bg-amber-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-amber-700"
            @click="generateInvite(entry.group.id)"
          >
            Generate invite link
          </button>
        </div>
      </article>

      <div
        v-if="inviteLink"
        class="rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-sm text-emerald-900 dark:border-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-200"
      >
        <p class="mb-2 font-semibold">Invite link generated</p>
        <p class="font-mono text-xs">{{ inviteLink }}</p>
        <p class="mt-1 text-xs">Expires {{ inviteExpires }}</p>
      </div>
    </section>
  </div>
</template>
