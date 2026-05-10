/**
 * useVirtualKeyboard — pure-data next-key + finger calculations.
 *
 * Given the next character the user must type, returns:
 *   - the actual physical key (e.g. 'A' for shifted 'a')
 *   - whether shift is required
 *   - which finger and which hand
 *
 * Rendering is typing-ui's responsibility.
 */
import type { Finger, Hand } from '~~/shared/typing-types';

const FINGER_MAP: Record<string, Finger> = {
  // Left hand
  q: 'lp',
  a: 'lp',
  z: 'lp',
  '1': 'lp',
  w: 'lr',
  s: 'lr',
  x: 'lr',
  '2': 'lr',
  e: 'lm',
  d: 'lm',
  c: 'lm',
  '3': 'lm',
  r: 'li',
  f: 'li',
  v: 'li',
  '4': 'li',
  t: 'li',
  g: 'li',
  b: 'li',
  '5': 'li',
  // Right hand
  y: 'ri',
  h: 'ri',
  n: 'ri',
  '6': 'ri',
  u: 'ri',
  j: 'ri',
  m: 'ri',
  '7': 'ri',
  i: 'rm',
  k: 'rm',
  ',': 'rm',
  '8': 'rm',
  o: 'rr',
  l: 'rr',
  '.': 'rr',
  '9': 'rr',
  p: 'rp',
  ';': 'rp',
  "'": 'rp',
  '/': 'rp',
  '0': 'rp',
  '-': 'rp',
  '[': 'rp',
  ']': 'rp',
  // Thumbs (space)
  ' ': 'thumb',
};

const HAND_MAP: Record<Finger, Hand> = {
  lp: 'left',
  lr: 'left',
  lm: 'left',
  li: 'left',
  thumb: 'left', // arbitrary; thumbs are both
  ri: 'right',
  rm: 'right',
  rr: 'right',
  rp: 'right',
};

export type KeyboardHint = {
  /** Lower-case glyph (always — the engine's "expected" char). */
  expected: string;
  /** The physical key the user must press (upper-case if shifted, etc.). */
  nextKey: string;
  shiftRequired: boolean;
  finger: Finger;
  hand: Hand;
};

export type UseVirtualKeyboardOptions = {
  nextChar: Ref<string> | ComputedRef<string>;
};

export type UseVirtualKeyboard = {
  hint: ComputedRef<KeyboardHint | null>;
};

const SHIFTED_NUMBER_MAP: Record<string, string> = {
  '!': '1',
  '@': '2',
  '#': '3',
  $: '4',
  '%': '5',
  '^': '6',
  '&': '7',
  '*': '8',
  '(': '9',
  ')': '0',
  ':': ';',
  '"': "'",
  '?': '/',
  '<': ',',
  '>': '.',
  '+': '=',
  _: '-',
  '~': '`',
  '{': '[',
  '}': ']',
  '|': '\\',
};

export function useVirtualKeyboard(options: UseVirtualKeyboardOptions): UseVirtualKeyboard {
  const hint = computed<KeyboardHint | null>(() => {
    const ch = options.nextChar.value;
    if (!ch) return null;

    let expected = ch;
    let shiftRequired = false;

    if (/^[A-Z]$/.test(ch)) {
      shiftRequired = true;
      expected = ch.toLowerCase();
    } else if (SHIFTED_NUMBER_MAP[ch]) {
      shiftRequired = true;
      expected = SHIFTED_NUMBER_MAP[ch];
    }

    const finger = FINGER_MAP[expected] ?? 'li';
    const hand = HAND_MAP[finger];

    return {
      expected,
      nextKey: ch,
      shiftRequired,
      finger,
      hand,
    };
  });

  return { hint };
}
