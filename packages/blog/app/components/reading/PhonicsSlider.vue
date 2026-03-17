<script setup lang="ts">
import type { StoryWord } from '~~/shared/reading-types';

const props = defineProps<{
  word: StoryWord;
}>();

const emit = defineEmits<{
  dismiss: [];
}>();

const { speakWord } = useTTS();

const segments = computed(() => splitWordIntoSegments(props.word.text, props.word.pattern));
const activeIndex = ref(-1);
const completedCount = ref(0);
const isDragging = ref(false);
const trackRef = ref<HTMLElement | null>(null);

function splitWordIntoSegments(word: string, pattern: string | null): string[] {
  const clean = word.toLowerCase().replace(/[^a-z]/g, '');
  if (!pattern || pattern === 'sight') return [clean];

  // Digraph patterns — keep digraph together
  if (pattern.startsWith('DG-')) {
    const digraph = pattern.replace('DG-', '');
    const idx = clean.indexOf(digraph);
    if (idx >= 0) {
      const parts: string[] = [];
      if (idx > 0) parts.push(clean.slice(0, idx));
      parts.push(digraph);
      if (idx + digraph.length < clean.length) parts.push(clean.slice(idx + digraph.length));
      return parts;
    }
  }

  // VCe patterns — onset, vowel, consonant+e
  if (pattern.startsWith('VCe-')) {
    if (clean.length >= 4) {
      return [clean.slice(0, -3), clean.slice(-3, -2), clean.slice(-2)];
    }
  }

  // Vowel team patterns
  if (pattern.startsWith('VT-')) {
    const team = pattern.replace('VT-', '');
    const idx = clean.indexOf(team);
    if (idx >= 0) {
      const parts: string[] = [];
      if (idx > 0) parts.push(clean.slice(0, idx));
      parts.push(team);
      if (idx + team.length < clean.length) parts.push(clean.slice(idx + team.length));
      return parts;
    }
  }

  // R-controlled patterns
  if (pattern.startsWith('RC-')) {
    const rc = pattern.replace('RC-', '');
    const idx = clean.indexOf(rc);
    if (idx >= 0) {
      const parts: string[] = [];
      if (idx > 0) parts.push(clean.slice(0, idx));
      parts.push(rc);
      if (idx + rc.length < clean.length) parts.push(clean.slice(idx + rc.length));
      return parts;
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
  if (!trackRef.value) return -1;
  const rect = trackRef.value.getBoundingClientRect();
  const x = clientX - rect.left;
  const segWidth = rect.width / segments.value.length;
  return Math.max(0, Math.min(segments.value.length - 1, Math.floor(x / segWidth)));
}

function onPointerDown(e: PointerEvent) {
  isDragging.value = true;
  completedCount.value = 0;
  activeIndex.value = -1;
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
  // Speak the segment sound
  speakWord(segments.value[idx]!);
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

    <!-- Dismiss hint -->
    <button class="text-xs text-[var(--reading-text)]/40 font-semibold" @click="emit('dismiss')">
      tap to close
    </button>
  </div>
</template>
