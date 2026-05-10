// @vitest-environment node
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { computed, effectScope, nextTick, ref } from 'vue';
import { useTypingFeedback } from './useTypingFeedback';
import type { UseTypingEngine } from './useTypingEngine';

function makeEngine() {
  const correctTyped = ref(0);
  const errors = ref(0);
  const cursor = ref(0);
  const nextChar = computed(() => '');
  return {
    correctTyped,
    errors,
    cursor,
    nextChar,
  } as unknown as UseTypingEngine;
}

function makeAudio() {
  return {
    playClick: vi.fn(),
    playWrong: vi.fn(),
    playStreakDing: vi.fn(),
    playFanfare: vi.fn(),
    playEncouragement: vi.fn(),
    play: vi.fn(),
    preload: vi.fn(),
    setAudioForStage: vi.fn(),
    audioOn: ref(true),
  };
}

describe('useTypingFeedback', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('increments pressTick and streak on each correct keystroke', async () => {
    const engine = makeEngine();
    const audio = makeAudio();
    const scope = effectScope();
    const fb = scope.run(() => useTypingFeedback(engine, audio))!;

    engine.correctTyped.value = 1;
    await nextTick();
    expect(fb.pressTick.value).toBe(1);
    expect(fb.streak.value).toBe(1);
    expect(audio.playClick).toHaveBeenCalledTimes(1);

    engine.correctTyped.value = 2;
    await nextTick();
    expect(fb.pressTick.value).toBe(2);
    expect(fb.streak.value).toBe(2);

    scope.stop();
  });

  it('fires tierUp + playStreakDing on every 3-in-a-row milestone', async () => {
    const engine = makeEngine();
    const audio = makeAudio();
    const scope = effectScope();
    const fb = scope.run(() => useTypingFeedback(engine, audio))!;

    for (let i = 1; i <= 9; i++) {
      engine.correctTyped.value = i;
      await nextTick();
    }
    // 3, 6, 9 all crossed
    expect(fb.tierUp.value).toBe(3);
    expect(audio.playStreakDing).toHaveBeenCalledTimes(3);
    expect(audio.playStreakDing).toHaveBeenNthCalledWith(1, 1);
    expect(audio.playStreakDing).toHaveBeenNthCalledWith(2, 2);
    expect(audio.playStreakDing).toHaveBeenNthCalledWith(3, 3);

    scope.stop();
  });

  it('resets streak to zero on a wrong keystroke and fires the buzz + onWrong hook', async () => {
    const engine = makeEngine();
    const audio = makeAudio();
    const onWrong = vi.fn();
    const scope = effectScope();
    const fb = scope.run(() => useTypingFeedback(engine, audio, { onWrong }))!;

    for (let i = 1; i <= 3; i++) {
      engine.correctTyped.value = i;
      await nextTick();
    }
    expect(fb.streak.value).toBe(3);

    engine.errors.value = 1;
    await nextTick();
    expect(fb.streak.value).toBe(0);
    expect(fb.wrongFlash.value).toBe(true);
    expect(audio.playWrong).toHaveBeenCalledTimes(1);
    expect(onWrong).toHaveBeenCalledTimes(1);

    scope.stop();
  });

  it('clears wrongFlash after flashMs', async () => {
    const engine = makeEngine();
    const audio = makeAudio();
    const scope = effectScope();
    const fb = scope.run(() => useTypingFeedback(engine, audio, { flashMs: 100 }))!;

    engine.errors.value = 1;
    await nextTick();
    expect(fb.wrongFlash.value).toBe(true);

    vi.advanceTimersByTime(100);
    expect(fb.wrongFlash.value).toBe(false);

    scope.stop();
  });

  it('resets streak when correctTyped decreases (backspace)', async () => {
    const engine = makeEngine();
    const audio = makeAudio();
    const scope = effectScope();
    const fb = scope.run(() => useTypingFeedback(engine, audio))!;

    for (let i = 1; i <= 5; i++) {
      engine.correctTyped.value = i;
      await nextTick();
    }
    expect(fb.streak.value).toBe(5);

    engine.correctTyped.value = 4; // backspace
    await nextTick();
    expect(fb.streak.value).toBe(0);

    scope.stop();
  });

  it('cancels the pending flash timer on unmount', async () => {
    const engine = makeEngine();
    const audio = makeAudio();
    const scope = effectScope();
    const fb = scope.run(() => useTypingFeedback(engine, audio, { flashMs: 200 }))!;

    engine.errors.value = 1;
    await nextTick();
    expect(fb.wrongFlash.value).toBe(true);

    scope.stop();

    // After the scope stops, the timer should be cleared — advancing
    // virtual time must NOT flip wrongFlash back to false because the
    // setTimeout was cancelled.
    vi.advanceTimersByTime(200);
    expect(fb.wrongFlash.value).toBe(true);
  });
});
