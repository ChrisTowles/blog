<script setup lang="ts">
definePageMeta({
  layout: 'typing',
});

useHead({
  title: 'Typing — Sign in',
  meta: [{ name: 'description', content: 'Sign in to save your typing progress across devices.' }],
});

// The blog uses nuxt-auth-utils with GitHub OAuth — sign-in is handled by
// the existing /api/auth/github endpoint. This page is just a friendly
// landing for unauthed users.
</script>

<template>
  <div class="mx-auto max-w-md space-y-6">
    <header>
      <h1 class="text-2xl font-bold text-slate-900 dark:text-slate-100">Sign in</h1>
      <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
        Sign in to create a family group, invite other guardians, and save progress for each learner
        across devices.
      </p>
    </header>

    <a
      href="/api/auth/github"
      class="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
    >
      Continue with GitHub
    </a>

    <p class="text-xs text-slate-500">
      Anonymous typing also works — pick a stage on the home page and your progress stays in this
      browser.
    </p>
  </div>
</template>
