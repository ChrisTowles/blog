import type { Finger } from '~~/shared/typing-types';

/** Soft palette used for the spotlight letter tile and hand-strip resting state. */
export const FINGER_BG_SOFT: Record<Finger, string> = {
  lp: 'bg-rose-300 dark:bg-rose-700',
  lr: 'bg-amber-300 dark:bg-amber-700',
  lm: 'bg-emerald-300 dark:bg-emerald-700',
  li: 'bg-sky-300 dark:bg-sky-700',
  thumb: 'bg-slate-300 dark:bg-slate-600',
  ri: 'bg-sky-300 dark:bg-sky-700',
  rm: 'bg-emerald-300 dark:bg-emerald-700',
  rr: 'bg-amber-300 dark:bg-amber-700',
  rp: 'bg-rose-300 dark:bg-rose-700',
};

/** Lighter palette used for keyboard key tints — softer to keep glyphs legible. */
export const FINGER_BG_KEY: Record<Finger, string> = {
  lp: 'bg-rose-200 dark:bg-rose-900/40 text-rose-900 dark:text-rose-100',
  lr: 'bg-amber-200 dark:bg-amber-900/40 text-amber-900 dark:text-amber-100',
  lm: 'bg-emerald-200 dark:bg-emerald-900/40 text-emerald-900 dark:text-emerald-100',
  li: 'bg-sky-200 dark:bg-sky-900/40 text-sky-900 dark:text-sky-100',
  thumb: 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100',
  ri: 'bg-sky-200 dark:bg-sky-900/40 text-sky-900 dark:text-sky-100',
  rm: 'bg-emerald-200 dark:bg-emerald-900/40 text-emerald-900 dark:text-emerald-100',
  rr: 'bg-amber-200 dark:bg-amber-900/40 text-amber-900 dark:text-amber-100',
  rp: 'bg-rose-200 dark:bg-rose-900/40 text-rose-900 dark:text-rose-100',
};

/** Saturated palette used for the translucent finger column above the keys. */
export const FINGER_BG_SOLID: Record<Finger, string> = {
  lp: 'bg-rose-400 dark:bg-rose-500',
  lr: 'bg-amber-400 dark:bg-amber-500',
  lm: 'bg-emerald-400 dark:bg-emerald-500',
  li: 'bg-sky-400 dark:bg-sky-500',
  thumb: 'bg-slate-300 dark:bg-slate-500',
  ri: 'bg-sky-400 dark:bg-sky-500',
  rm: 'bg-emerald-400 dark:bg-emerald-500',
  rr: 'bg-amber-400 dark:bg-amber-500',
  rp: 'bg-rose-400 dark:bg-rose-500',
};

export const FINGER_LABEL: Record<Finger, string> = {
  lp: 'pinky',
  lr: 'ring finger',
  lm: 'middle finger',
  li: 'index finger',
  thumb: 'thumb',
  ri: 'index finger',
  rm: 'middle finger',
  rr: 'ring finger',
  rp: 'pinky',
};
