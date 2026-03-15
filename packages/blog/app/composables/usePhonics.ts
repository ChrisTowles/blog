export function usePhonics(childId: Ref<number | null>) {
  const progress = ref<any[]>([]);
  const isLoading = ref(false);

  const masteredUnits = computed(() => progress.value.filter((p) => p.status === 'mastered'));
  const activeUnits = computed(() => progress.value.filter((p) => p.status === 'active'));
  const lockedUnits = computed(() => progress.value.filter((p) => p.status === 'locked'));

  async function fetchProgress() {
    if (!childId.value) return;
    isLoading.value = true;
    try {
      const child = await $fetch(`/api/reading/children/${childId.value}`);
      // TODO: fetch phonics progress from dedicated endpoint
      // For now, return empty until phonics progress API is built
      void child;
    } finally {
      isLoading.value = false;
    }
  }

  watch(
    childId,
    () => {
      if (childId.value) fetchProgress();
    },
    { immediate: true },
  );

  return {
    progress: readonly(progress),
    masteredUnits,
    activeUnits,
    lockedUnits,
    isLoading: readonly(isLoading),
    fetchProgress,
  };
}
