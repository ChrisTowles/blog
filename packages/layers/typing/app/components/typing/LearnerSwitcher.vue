<script setup lang="ts">
import { TEST_IDS } from '~~/shared/test-ids';

const { activeLearnerId, active, learners, setActive } = useActiveLearner();
const { loggedIn } = useUserSession();

const open = ref(false);

const label = computed(() => {
  const a = active.value;
  if (a) return a.displayName;
  return 'You (anonymous)';
});

function pick(id: number | 'anon') {
  setActive(id);
  open.value = false;
}

const wrapperRef = ref<HTMLElement | null>(null);
function onClickOutside(event: MouseEvent) {
  if (!wrapperRef.value) return;
  if (!wrapperRef.value.contains(event.target as Node)) {
    open.value = false;
  }
}

if (import.meta.client) {
  onMounted(() => {
    window.addEventListener('click', onClickOutside);
  });
  onBeforeUnmount(() => {
    window.removeEventListener('click', onClickOutside);
  });
}
</script>

<template>
  <div
    ref="wrapperRef"
    :data-testid="TEST_IDS.TYPING.LEARNER_SWITCHER"
    class="relative inline-block text-left"
  >
    <button
      type="button"
      class="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-800 shadow-sm hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
      @click="open = !open"
    >
      <span class="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400"
        >Acting as</span
      >
      <span class="font-semibold">{{ label }}</span>
      <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path
          fill-rule="evenodd"
          d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 011.08 1.04l-4.24 4.38a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
          clip-rule="evenodd"
        />
      </svg>
    </button>

    <div
      v-if="open"
      class="absolute right-0 z-10 mt-2 w-56 rounded-lg border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-800"
    >
      <ul class="py-1 text-sm">
        <li>
          <button
            type="button"
            :data-testid="TEST_IDS.TYPING.LEARNER_OPTION"
            class="flex w-full items-center justify-between px-3 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-700"
            :class="activeLearnerId === 'anon' ? 'font-semibold' : ''"
            @click="pick('anon')"
          >
            <span>You (anonymous)</span>
            <span v-if="activeLearnerId === 'anon'" class="text-amber-600">●</span>
          </button>
        </li>
        <li v-for="l in learners" :key="l.id">
          <button
            type="button"
            :data-testid="TEST_IDS.TYPING.LEARNER_OPTION"
            class="flex w-full items-center justify-between px-3 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-700"
            :class="activeLearnerId === l.id ? 'font-semibold' : ''"
            @click="pick(l.id)"
          >
            <span>{{ l.displayName }}</span>
            <span v-if="activeLearnerId === l.id" class="text-amber-600">●</span>
          </button>
        </li>
        <li v-if="!loggedIn" class="border-t border-slate-200 dark:border-slate-700">
          <NuxtLink
            to="/login?redirect=/typing"
            class="block px-3 py-2 text-amber-700 hover:bg-slate-100 dark:text-amber-300 dark:hover:bg-slate-700"
          >
            <div class="font-semibold">Sign in to save progress</div>
            <div class="mt-0.5 text-xs opacity-80">
              Track multiple kids and keep progress across devices.
            </div>
          </NuxtLink>
        </li>
        <li v-else class="border-t border-slate-200 dark:border-slate-700">
          <NuxtLink
            to="/typing/group"
            class="block px-3 py-2 text-amber-700 hover:bg-slate-100 dark:text-amber-300 dark:hover:bg-slate-700"
          >
            Manage learners…
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>
