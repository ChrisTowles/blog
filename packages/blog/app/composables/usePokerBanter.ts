import { ref } from 'vue';
import type { BanterEvent } from '~~/shared/poker/personas';

/**
 * Calls /api/poker/banter for one-line in-character lines from the AI opponent.
 *
 * The latest line is exposed as `currentLine`; UI can show it as a speech
 * bubble until the next event replaces it. We deliberately drop overlapping
 * requests (only the most recent event's response wins) so old lines never
 * land on top of newer game state.
 */
export function usePokerBanter(personaId: () => string) {
  const currentLine = ref<{ text: string; event: BanterEvent } | null>(null);
  const loading = ref(false);
  let requestSeq = 0;

  async function trigger(event: BanterEvent, situation: string) {
    const id = personaId();
    const myReq = ++requestSeq;
    loading.value = true;
    try {
      const res = await $fetch<{ text: string; event: BanterEvent }>('/api/poker/banter', {
        method: 'POST',
        body: { personaId: id, event, situation },
      });
      // Drop stale responses if a newer trigger fired while we were waiting.
      if (myReq !== requestSeq) return;
      if (res.text) {
        currentLine.value = { text: res.text, event: res.event };
      }
    } catch {
      // Banter is best-effort — silent failure is fine.
    } finally {
      if (myReq === requestSeq) loading.value = false;
    }
  }

  function clear() {
    requestSeq++;
    currentLine.value = null;
    loading.value = false;
  }

  return { currentLine, loading, trigger, clear };
}
