/**
 * useActiveLearner — who's typing right now.
 *
 * Stores the active learner id (or `'anon'` for anonymous) in a cookie +
 * `useState`. Components consume it via `activeLearner.value`.
 */
import type { Learner } from '~~/shared/typing-types';

export const ACTIVE_LEARNER_COOKIE = 'typing:active-learner';

export type ActiveLearnerId = number | 'anon';

export function useActiveLearner() {
  const cookie = useCookie<string>(ACTIVE_LEARNER_COOKIE, {
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365,
    default: () => 'anon',
  });

  const activeLearnerId = useState<ActiveLearnerId>('typing:active-learner-id', () => {
    const v = cookie.value;
    if (v === 'anon' || v === '' || v == null) return 'anon';
    const n = Number(v);
    return Number.isFinite(n) && n > 0 ? n : 'anon';
  });

  const learners = useState<Learner[]>('typing:available-learners', () => []);

  function setActive(id: ActiveLearnerId) {
    activeLearnerId.value = id;
    cookie.value = String(id);
  }

  function setLearners(xs: Learner[]) {
    learners.value = xs;
    // If the active learner isn't in the new list, fall back to anon.
    const id = activeLearnerId.value;
    if (id !== 'anon' && !xs.some((l) => l.id === id)) {
      setActive('anon');
    }
  }

  const active = computed<Learner | null>(() => {
    const id = activeLearnerId.value;
    if (id === 'anon') return null;
    return learners.value.find((l) => l.id === id) ?? null;
  });

  return { activeLearnerId, active, learners, setActive, setLearners };
}
