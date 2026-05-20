// Honor the "no analytics" privacy promise shown on every cog-playground
// intro page: disable Google Analytics entirely for any /cog-playground/*
// route. Setting `ga-disable-<id>` before gtag.js evaluates prevents the
// initial config pageview; the route watch handles client-side navigation.
export default defineNuxtPlugin(() => {
  const id = useRuntimeConfig().public.gtag?.id as string | undefined;
  if (!id) return;

  const route = useRoute();
  const flag = `ga-disable-${id}`;

  const sync = (path: string) => {
    (window as unknown as Record<string, boolean>)[flag] = path.startsWith('/cog-playground');
  };

  sync(route.path);
  watch(() => route.path, sync);
});
