<script setup lang="ts">
const { loggedIn } = useUserSession();
const route = useRoute();

const redirectTo = computed(() => (route.query.redirect as string) || '/');

// If already logged in, redirect away
if (loggedIn.value) {
  navigateTo(redirectTo.value);
}

watch(loggedIn, (isLoggedIn) => {
  if (isLoggedIn) {
    navigateTo(redirectTo.value);
  }
});

useSeoMeta({
  title: 'Sign in',
  description: 'Sign in to access AI chat, admin tools, and more.',
});

function authUrl(provider: string) {
  const params = new URLSearchParams();
  if (route.query.redirect) {
    params.set('redirect', route.query.redirect as string);
  }
  const qs = params.toString();
  return `/auth/${provider}${qs ? `?${qs}` : ''}`;
}
</script>

<template>
  <UContainer class="flex min-h-[70vh] items-center justify-center">
    <UCard class="w-full max-w-sm">
      <div class="space-y-6">
        <div class="text-center">
          <h1 class="text-2xl font-bold">Sign in</h1>
          <p class="text-dimmed mt-1 text-sm">Sign in to access AI chat, admin tools, and more.</p>
        </div>

        <div class="space-y-3">
          <UButton
            :to="authUrl('github')"
            icon="i-simple-icons-github"
            label="Continue with GitHub"
            color="neutral"
            variant="soft"
            size="lg"
            block
            external
          />
          <UButton
            :to="authUrl('google')"
            icon="i-simple-icons-google"
            label="Continue with Google"
            color="neutral"
            variant="soft"
            size="lg"
            block
            external
          />
        </div>

        <p class="text-dimmed text-center text-xs">
          By signing in you agree to have your name and avatar stored for your account.
        </p>
      </div>
    </UCard>
  </UContainer>
</template>
