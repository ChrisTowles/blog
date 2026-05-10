<script setup lang="ts">
import { TEST_IDS } from '~~/shared/test-ids';

definePageMeta({
  layout: 'typing',
});

useHead({
  title: 'Typing — Join',
  meta: [
    {
      name: 'description',
      content: 'Accept your typing-app invite to join a family or classroom.',
    },
  ],
});

const route = useRoute();
const token = computed(() => String(route.params.token ?? ''));

const status = ref<'idle' | 'joining' | 'done' | 'error'>('idle');
const error = ref<string | null>(null);
const joinedGroupId = ref<number | null>(null);

async function accept() {
  if (status.value === 'joining' || !token.value) return;
  status.value = 'joining';
  error.value = null;
  try {
    const result = await $fetch<{ ok: true; groupId: number }>(
      `/api/typing/groups/${token.value}/join`,
      { method: 'POST' },
    );
    joinedGroupId.value = result.groupId;
    status.value = 'done';
  } catch (e: unknown) {
    const err = e as { statusMessage?: string; message?: string };
    error.value = err.statusMessage ?? err.message ?? 'Failed to join group';
    status.value = 'error';
  }
}
</script>

<template>
  <div class="mx-auto max-w-md space-y-6">
    <header>
      <h1 class="text-2xl font-bold text-slate-900 dark:text-slate-100">Join a group</h1>
      <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
        You've been invited to be a guardian on a typing group. Accept the invite to switch to any
        learner in the group.
      </p>
    </header>

    <div
      v-if="status === 'done'"
      class="rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-emerald-900 dark:border-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-200"
    >
      <p>You're in! Group #{{ joinedGroupId }}.</p>
      <NuxtLink
        to="/typing/group"
        class="mt-3 inline-flex rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
      >
        Go to group
      </NuxtLink>
    </div>

    <div
      v-else-if="status === 'error'"
      class="rounded-xl border border-rose-300 bg-rose-50 p-4 text-rose-900 dark:border-rose-700 dark:bg-rose-950/40 dark:text-rose-200"
    >
      <p>Something went wrong: {{ error }}</p>
    </div>

    <button
      v-else
      type="button"
      :disabled="status === 'joining'"
      :data-testid="TEST_IDS.TYPING.GROUP_JOIN_BUTTON"
      class="rounded-lg bg-amber-700 px-4 py-2 text-sm font-medium text-white hover:bg-amber-800 disabled:opacity-50"
      @click="accept"
    >
      {{ status === 'joining' ? 'Joining…' : 'Accept invite' }}
    </button>
  </div>
</template>
