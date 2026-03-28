declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: (el?: HTMLElement) => void;
        createTweet: (
          id: string,
          el: HTMLElement,
          options?: Record<string, string>,
        ) => Promise<HTMLElement>;
      };
    };
  }
}

export default defineNuxtPlugin(() => {
  const router = useRouter();
  router.afterEach(() => {
    nextTick(() => {
      window.twttr?.widgets.load();
    });
  });
});
