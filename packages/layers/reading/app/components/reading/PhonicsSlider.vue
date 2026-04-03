<script setup lang="ts">
import type { StoryWord } from '../../../shared/reading-types';

const props = defineProps<{
  word: StoryWord;
}>();

const emit = defineEmits<{
  dismiss: [];
}>();

const { speakWord } = useTTS();

// Map letter segments to phoneme-like pronunciations for TTS.
// TTS says letter names ("bee", "see") instead of sounds ("/b/", "/k/").
// These short words trick TTS into producing the phoneme sound.
const PHONEME_SOUNDS: Record<string, string> = {
  a: 'aah',
  b: 'buh',
  c: 'kuh',
  d: 'duh',
  e: 'eh',
  f: 'fuh',
  g: 'guh',
  h: 'huh',
  i: 'ih',
  j: 'juh',
  k: 'kuh',
  l: 'luh',
  m: 'muh',
  n: 'nuh',
  o: 'awe',
  p: 'puh',
  q: 'kwuh',
  r: 'ruh',
  s: 'suh',
  t: 'tuh',
  u: 'uh',
  v: 'vuh',
  w: 'wuh',
  x: 'ks',
  y: 'yuh',
  z: 'zuh',
  sh: 'shuh',
  ch: 'chuh',
  th: 'thuh',
  ck: 'kuh',
  wh: 'wuh',
  ph: 'fuh',
  ng: 'ning',
  ai: 'ay',
  ay: 'ay',
  ee: 'ee',
  ea: 'ee',
  oa: 'oh',
  oe: 'oh',
  oo: 'ooh',
  ou: 'ow',
  ow: 'ow',
  oi: 'oy',
  oy: 'oy',
  ar: 'are',
  or: 'ore',
  er: 'err',
  ir: 'err',
  ur: 'err',
  igh: 'eye',
  kn: 'nuh',
  wr: 'ruh',
  mb: 'muh',
};

function speakPhoneme(segment: string) {
  const sound = PHONEME_SOUNDS[segment.toLowerCase()];
  speakWord(sound || segment);
}

const segments = computed(() => splitWordIntoSegments(props.word.text, props.word.pattern));
const activeIndex = ref(-1);
const completedCount = ref(0);
const isDragging = ref(false);
const trackRef = ref<HTMLElement | null>(null);
let cachedRect: DOMRect | null = null;

// Split a word around a known substring (digraph, vowel team, etc.)
function splitOnSubstring(word: string, key: string): string[] | null {
  const idx = word.indexOf(key);
  if (idx < 0) return null;
  const parts: string[] = [];
  if (idx > 0) parts.push(word.slice(0, idx));
  parts.push(key);
  if (idx + key.length < word.length) parts.push(word.slice(idx + key.length));
  return parts;
}

function splitWordIntoSegments(word: string, pattern: string | null): string[] {
  const clean = word.toLowerCase().replace(/[^a-z]/g, '');
  if (!pattern || pattern === 'sight') return [clean];

  // Patterns with a known substring to split around (DG, VT, RC)
  for (const prefix of ['DG-', 'VT-', 'RC-']) {
    if (pattern.startsWith(prefix)) {
      const key = pattern.slice(prefix.length);
      const parts = splitOnSubstring(clean, key);
      if (parts) return parts;
    }
  }

  // VCe patterns — onset, vowel, consonant+e
  if (pattern.startsWith('VCe-')) {
    if (clean.length >= 4) {
      return [clean.slice(0, -3), clean.slice(-3, -2), clean.slice(-2)];
    }
  }

  // CVC patterns — split into onset-vowel-coda
  if (pattern.startsWith('CVC-')) {
    if (clean.length >= 3) {
      return [clean[0]!, clean[1]!, clean.slice(2)];
    }
  }

  // Fallback: individual letters
  return clean.split('');
}

function getSegmentFromX(clientX: number): number {
  const rect = cachedRect ?? trackRef.value?.getBoundingClientRect();
  if (!rect) return -1;
  const x = clientX - rect.left;
  const segWidth = rect.width / segments.value.length;
  return Math.max(0, Math.min(segments.value.length - 1, Math.floor(x / segWidth)));
}

function onPointerDown(e: PointerEvent) {
  isDragging.value = true;
  completedCount.value = 0;
  activeIndex.value = -1;
  cachedRect = trackRef.value?.getBoundingClientRect() ?? null;
  const idx = getSegmentFromX(e.clientX);
  activateSegment(idx);
  (e.target as HTMLElement)?.setPointerCapture?.(e.pointerId);
}

function onPointerMove(e: PointerEvent) {
  if (!isDragging.value) return;
  const idx = getSegmentFromX(e.clientX);
  if (idx !== activeIndex.value && idx >= 0) {
    activateSegment(idx);
  }
}

function onPointerUp() {
  if (!isDragging.value) return;
  isDragging.value = false;
  cachedRect = null;
  // If thumb reached last segment, play the full word
  if (activeIndex.value === segments.value.length - 1) {
    completedCount.value = segments.value.length;
    setTimeout(() => speakWord(props.word.text), 200);
  }
}

function activateSegment(idx: number) {
  if (idx < 0 || idx >= segments.value.length) return;
  activeIndex.value = idx;
  completedCount.value = idx;
  // Speak the phoneme sound (not the letter name)
  speakPhoneme(segments.value[idx]!);
}

function segmentClass(idx: number): string {
  if (idx === activeIndex.value && isDragging.value) {
    return 'bg-[var(--reading-accent)] text-white scale-110';
  }
  if (idx < completedCount.value) {
    return 'bg-[var(--reading-success)] text-white';
  }
  return 'bg-[var(--reading-primary)]/15 text-[var(--reading-text)]';
}
</script>

<template>
  <div class="flex flex-col items-center gap-2 py-2" @click.stop>
    <!-- Segment track -->
    <div
      ref="trackRef"
      class="relative flex rounded-full overflow-hidden shadow-md cursor-pointer touch-none select-none"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointercancel="onPointerUp"
    >
      <div
        v-for="(seg, i) in segments"
        :key="i"
        class="flex items-center justify-center min-w-[3rem] h-12 px-3 text-xl font-bold transition-all duration-150"
        :class="segmentClass(i)"
        style="font-family: var(--reading-font-display)"
      >
        {{ seg }}
      </div>
    </div>

    <!-- Controls row -->
    <div class="flex items-center gap-4">
      <button class="text-xs text-[var(--reading-text)]/40 font-semibold" @click="emit('dismiss')">
        tap to close
      </button>
    </div>
  </div>
</template>
