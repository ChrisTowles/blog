/**
 * Weak-key selection for the adaptive "tricky keys" review lesson.
 *
 * Mines the per-key heatmap (attempts / errors / avgMs) that every lesson
 * and game already records, and picks the keys that most need practice:
 * highest error rate first, slowest average keystroke as the tiebreak.
 * Keys with too few attempts are skipped — a 1-for-2 key isn't a signal.
 */
import type { LocalKeyStat } from '~~/shared/typing-types';

const MIN_ATTEMPTS = 8;
const MIN_ERROR_RATE = 0.08;

export type TrickyKey = {
  key: string;
  attempts: number;
  errorRate: number;
  avgMs: number;
};

export function pickTrickyKeys(
  keyStats: Record<string, LocalKeyStat>,
  unlocked: readonly string[],
  max = 3,
): TrickyKey[] {
  const set = new Set(unlocked);
  return Object.entries(keyStats)
    .filter(([key]) => set.has(key) && key !== ' ')
    .map(([key, s]) => ({
      key,
      attempts: s.attempts,
      avgMs: s.avgMs,
      errorRate: s.attempts > 0 ? s.errors / s.attempts : 0,
    }))
    .filter((k) => k.attempts >= MIN_ATTEMPTS && k.errorRate >= MIN_ERROR_RATE)
    .sort((a, b) => b.errorRate - a.errorRate || b.avgMs - a.avgMs)
    .slice(0, max);
}
