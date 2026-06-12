<script setup lang="ts">
import { TEST_IDS } from '~~/shared/test-ids';
import type { Learner, TypingGroup } from '~~/shared/typing-types';

definePageMeta({
  layout: 'typing',
});

useHead({
  title: 'Typing — Group',
  meta: [
    {
      name: 'description',
      content: 'Manage your typing-app family or classroom — guardians, learners, invites.',
    },
  ],
});

// Auth-required endpoint — load client-side only so the session cookie is
// always attached. Without server:false, SSR runs the request with no
// session cookie and the page renders the empty-state even when the
// user has groups. Key is shared with the layout so a refresh from any
// mutating action also refreshes the header switcher.
const { data, refresh, error, pending } = await useFetch<{
  groups: Array<{ group: TypingGroup; learners: Learner[] }>;
}>('/api/typing/groups', {
  key: 'typing:groups',
  default: () => ({ groups: [] }),
  ignoreResponseError: true,
  server: false,
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
const formError = ref<string | null>(null);

async function createFamily() {
  if (!newGroupName.value || creating.value) return;
  creating.value = true;
  formError.value = null;
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
    // refresh() updates this page's data; the layout shares the same
    // 'typing:groups' key so the header switcher picks up the new
    // group + learner immediately too.
    await refresh();
  } catch (e: unknown) {
    const err = e as { statusMessage?: string; message?: string };
    formError.value = err.statusMessage ?? err.message ?? 'Failed to create family';
  } finally {
    creating.value = false;
  }
}

const invitePending = ref<number | null>(null);
async function generateInvite(group: TypingGroup) {
  if (invitePending.value === group.id) return;
  invitePending.value = group.id;
  formError.value = null;
  try {
    const result = await $fetch<{ url: string; expiresAt: string }>(
      `/api/typing/groups/${group.slug}/invite`,
      { method: 'POST', body: {} },
    );
    // Make the link copy-able with the full origin baked in.
    const origin =
      typeof window !== 'undefined' && window.location?.origin ? window.location.origin : '';
    inviteLink.value = origin ? `${origin}${result.url}` : result.url;
    inviteExpires.value = result.expiresAt;
  } catch (e: unknown) {
    const err = e as { statusMessage?: string; message?: string };
    formError.value = err.statusMessage ?? err.message ?? 'Failed to generate invite';
  } finally {
    invitePending.value = null;
  }
}

async function copyInvite() {
  if (!inviteLink.value) return;
  try {
    await navigator.clipboard.writeText(inviteLink.value);
  } catch {
    // Clipboard may be blocked; user can still copy by selecting.
  }
}

// --- Delete-group with type-the-name confirm --------------------------

const deletingGroup = ref<TypingGroup | null>(null);
const deleteTyped = ref('');
const deletePending = ref(false);
const deleteMatches = computed(() => {
  if (!deletingGroup.value) return false;
  const expected = `delete ${deletingGroup.value.name.trim().toLowerCase()}`;
  return deleteTyped.value.trim().toLowerCase() === expected;
});

function openDeleteGroup(group: TypingGroup) {
  deletingGroup.value = group;
  deleteTyped.value = '';
  formError.value = null;
}

function cancelDeleteGroup() {
  deletingGroup.value = null;
  deleteTyped.value = '';
}

async function confirmDeleteGroup() {
  if (!deletingGroup.value || !deleteMatches.value || deletePending.value) return;
  deletePending.value = true;
  formError.value = null;
  try {
    await $fetch(`/api/typing/groups/${deletingGroup.value.slug}`, { method: 'DELETE' });
    cancelDeleteGroup();
    inviteLink.value = null;
    inviteExpires.value = null;
    await refresh();
  } catch (e: unknown) {
    const err = e as { statusMessage?: string; message?: string };
    formError.value = err.statusMessage ?? err.message ?? 'Failed to delete group';
  } finally {
    deletePending.value = false;
  }
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

    <p
      v-if="formError"
      class="rounded-lg border border-rose-300 bg-rose-50 px-4 py-2 text-sm text-rose-800 dark:border-rose-700 dark:bg-rose-950/40 dark:text-rose-200"
      role="alert"
    >
      {{ formError }}
    </p>

    <section
      v-if="isUnauthed"
      class="rounded-xl border border-amber-300 bg-amber-50 p-5 text-amber-900 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-200"
    >
      <p class="text-sm">Sign in to create a family or join one via an invite link.</p>
      <NuxtLink
        to="/login?redirect=/typing/group"
        class="mt-3 inline-flex rounded-lg bg-amber-700 px-4 py-2 text-sm font-medium text-white hover:bg-amber-800"
      >
        Sign in
      </NuxtLink>
    </section>

    <p v-else-if="pending" class="text-sm text-slate-500">Loading your groups…</p>

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
          class="rounded-lg bg-amber-700 px-4 py-2 text-sm font-medium text-white hover:bg-amber-800 disabled:opacity-50"
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
            :to="`/typing/group/learners?groupSlug=${entry.group.slug}`"
            class="rounded-lg border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-50 dark:border-slate-600 dark:hover:bg-slate-700"
          >
            Manage learners
          </NuxtLink>
          <button
            type="button"
            :data-testid="TEST_IDS.TYPING.GROUP_INVITE_LINK"
            :disabled="invitePending === entry.group.id"
            class="rounded-lg bg-amber-700 px-3 py-1.5 text-sm font-medium text-white hover:bg-amber-800 disabled:opacity-50"
            @click="generateInvite(entry.group)"
          >
            {{ invitePending === entry.group.id ? 'Generating…' : 'Generate invite link' }}
          </button>
          <button
            type="button"
            class="rounded-lg border border-rose-300 px-3 py-1.5 text-sm text-rose-700 hover:bg-rose-50 dark:border-rose-700 dark:text-rose-300 dark:hover:bg-rose-950/40"
            @click="openDeleteGroup(entry.group)"
          >
            Delete group
          </button>
        </div>
      </article>

      <div
        v-if="inviteLink"
        class="rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-sm text-emerald-900 dark:border-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-200"
      >
        <p class="mb-2 font-semibold">Invite link generated</p>
        <p class="break-all font-mono text-xs">{{ inviteLink }}</p>
        <p class="mt-1 text-xs">Expires {{ inviteExpires }}</p>
        <button
          type="button"
          class="mt-2 rounded-lg bg-emerald-700 px-3 py-1.5 text-xs font-medium text-white hover:bg-emerald-800"
          @click="copyInvite"
        >
          Copy link
        </button>
      </div>
    </section>

    <!-- Delete-group confirm dialog (type the name) -->
    <div
      v-if="deletingGroup"
      class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4"
      role="dialog"
      aria-modal="true"
      :aria-labelledby="`delete-group-${deletingGroup.id}-title`"
      @click.self="cancelDeleteGroup"
    >
      <div
        class="w-full max-w-md space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-900"
      >
        <header>
          <h3
            :id="`delete-group-${deletingGroup.id}-title`"
            class="text-lg font-semibold text-slate-900 dark:text-slate-100"
          >
            Delete this group?
          </h3>
          <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">
            This permanently removes
            <strong class="text-slate-900 dark:text-slate-100">{{ deletingGroup.name }}</strong>
            along with every learner, attempt, invite, and guardian membership in it. Type the group
            name to confirm.
          </p>
        </header>

        <label class="block">
          <span
            class="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400"
          >
            Type: delete {{ deletingGroup.name.toLowerCase() }}
          </span>
          <input
            v-model="deleteTyped"
            type="text"
            autocomplete="off"
            :placeholder="`delete ${deletingGroup.name.toLowerCase()}`"
            class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
            @keydown.enter="confirmDeleteGroup"
          />
        </label>

        <div class="flex justify-end gap-2">
          <button
            type="button"
            class="rounded-lg border border-slate-300 px-4 py-2 text-sm hover:bg-slate-50 dark:border-slate-600 dark:hover:bg-slate-800"
            @click="cancelDeleteGroup"
          >
            Cancel
          </button>
          <button
            type="button"
            :disabled="!deleteMatches || deletePending"
            class="rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-50"
            @click="confirmDeleteGroup"
          >
            {{ deletePending ? 'Deleting…' : 'Delete group' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
