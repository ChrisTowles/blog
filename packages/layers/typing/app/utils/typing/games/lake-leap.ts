/**
 * Pure logic for Lake Leap word selection.
 */
export type LakeLeapMode = 'curriculum' | 'topic' | 'spelling';

const FALLBACK_WORDS = ['cat', 'dog', 'sun', 'fish', 'red', 'blue', 'sky', 'tree', 'home', 'jump'];

export function pickWordsForRound(opts: {
  mode: LakeLeapMode;
  source: string[];
  count: number;
}): string[] {
  const pool = opts.source.length > 0 ? opts.source : FALLBACK_WORDS;
  const words: string[] = [];
  for (let i = 0; i < opts.count; i++) {
    words.push(pool[Math.floor(Math.random() * pool.length)] ?? FALLBACK_WORDS[0]!);
  }
  return words;
}

export type LakeLeapResult = {
  cleared: number;
  wrongs: number;
  perfect: boolean;
  durationMs: number;
};

export function summarize(opts: {
  cleared: number;
  wrongs: number;
  startedAt: number;
  endedAt: number;
}): LakeLeapResult {
  return {
    cleared: opts.cleared,
    wrongs: opts.wrongs,
    perfect: opts.wrongs <= 2,
    durationMs: opts.endedAt - opts.startedAt,
  };
}
