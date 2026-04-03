import type { PhonicsMapUnit } from '../../shared/reading-types';

export function usePhonics(childId: Ref<number | null>) {
  const progress = ref<PhonicsMapUnit[]>([]);
  const isLoading = ref(false);

  const masteredUnits = computed(() => progress.value.filter((p) => p.status === 'mastered'));
  const activeUnits = computed(() => progress.value.filter((p) => p.status === 'active'));
  const lockedUnits = computed(() => progress.value.filter((p) => p.status === 'locked'));

  async function fetchProgress() {
    if (!childId.value) return;
    isLoading.value = true;
    try {
      const data = await $fetch('/api/reading/phonics/progress', {
        params: { childId: childId.value },
      });
      progress.value = data as PhonicsMapUnit[];
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
