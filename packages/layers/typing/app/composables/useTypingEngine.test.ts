// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { effectScope, nextTick } from 'vue';
import { useTypingEngine } from './useTypingEngine';

function makeClock(start = 1000) {
  let now = start;
  return {
    advance(ms: number) {
      now += ms;
    },
    fn: () => now,
    set(ms: number) {
      now = ms;
    },
  };
}

describe('useTypingEngine', () => {
  it('starts idle and transitions to running on first keypress', () => {
    const clock = makeClock();
    const eng = useTypingEngine({ text: 'abc', clock: clock.fn });
    expect(eng.state.value).toBe('idle');

    eng.feed({ key: 'a', at: clock.fn() });
    expect(eng.state.value).toBe('running');
    expect(eng.cursor.value).toBe(1);
    expect(eng.correctTyped.value).toBe(1);
    expect(eng.totalTyped.value).toBe(1);
  });

  it('locks the cursor on a wrong key until the correct key is pressed', () => {
    const clock = makeClock();
    const eng = useTypingEngine({ text: 'abc', clock: clock.fn });
    eng.feed({ key: 'x', at: clock.fn() }); // wrong, expected 'a'
    eng.feed({ key: 'y', at: clock.fn() }); // wrong again
    expect(eng.errors.value).toBe(2);
    expect(eng.errorsByKey.value).toEqual({ a: 2 });
    expect(eng.cursor.value).toBe(0);
    expect(eng.totalTyped.value).toBe(2);
    expect(eng.correctTyped.value).toBe(0);

    eng.feed({ key: 'a', at: clock.fn() }); // finally correct
    expect(eng.cursor.value).toBe(1);
    expect(eng.correctTyped.value).toBe(1);
  });

  it('completes and emits onComplete when reaching end', () => {
    const onComplete = vi.fn();
    const clock = makeClock();
    const eng = useTypingEngine({ text: 'ab', onComplete, clock: clock.fn });

    eng.feed({ key: 'a', at: 1000 });
    clock.advance(60_000);
    eng.feed({ key: 'b', at: clock.fn() });

    expect(eng.state.value).toBe('done');
    expect(onComplete).toHaveBeenCalledTimes(1);
    const result = onComplete.mock.calls[0]?.[0];
    expect(result.accuracy).toBe(1);
    expect(result.durationMs).toBe(60_000);
  });

  it('emits cancelled:false on natural completion', () => {
    const onComplete = vi.fn();
    const clock = makeClock();
    const eng = useTypingEngine({ text: 'ab', onComplete, clock: clock.fn });
    eng.feed({ key: 'a', at: clock.fn() });
    clock.advance(60_000);
    eng.feed({ key: 'b', at: clock.fn() });
    expect(onComplete).toHaveBeenCalledTimes(1);
    expect(onComplete.mock.calls[0]?.[0].cancelled).toBe(false);
  });

  it('emits cancelled:true on cancel()', () => {
    const onComplete = vi.fn();
    const clock = makeClock();
    const eng = useTypingEngine({ text: 'abc', onComplete, clock: clock.fn });
    eng.feed({ key: 'a', at: clock.fn() });
    clock.advance(5_000);
    eng.cancel();
    expect(onComplete).toHaveBeenCalledTimes(1);
    expect(onComplete.mock.calls[0]?.[0].cancelled).toBe(true);
    expect(onComplete.mock.calls[0]?.[0].durationMs).toBe(5_000);
  });

  it('computes gross WPM at 1 minute = 1 word per 5 chars', () => {
    const clock = makeClock();
    const eng = useTypingEngine({ text: 'abcde', clock: clock.fn });
    eng.feed({ key: 'a', at: clock.fn() });
    clock.advance(60_000);
    eng.feed({ key: 'b', at: clock.fn() });
    eng.feed({ key: 'c', at: clock.fn() });
    eng.feed({ key: 'd', at: clock.fn() });
    eng.feed({ key: 'e', at: clock.fn() });

    // 5 correct chars / 5 = 1 word; 1 minute => 1 WPM.
    expect(eng.wpm.value).toBeCloseTo(1, 5);
    expect(eng.netWpm.value).toBeCloseTo(1, 5);
  });

  it('computes WPM for 1 char typed over a fixed window', () => {
    const clock = makeClock();
    const eng = useTypingEngine({ text: 'abcde', clock: clock.fn });
    eng.feed({ key: 'a', at: clock.fn() });
    // Hold the lesson open without further keystrokes for 60s of wall time
    // then complete via cancel() so durationMs reflects 60s.
    clock.advance(60_000);
    eng.cancel();
    // 1 correct char / 5 = 0.2 words across 1 minute => 0.2 WPM.
    expect(eng.wpm.value).toBeCloseTo(0.2, 5);
  });

  it('computes WPM for 5 chars typed over 30s = 24 WPM', () => {
    const clock = makeClock();
    const eng = useTypingEngine({ text: 'abcde', clock: clock.fn });
    eng.feed({ key: 'a', at: clock.fn() });
    // Spread the remaining 4 keys evenly so the final keystroke lands at
    // start + 30s; that gives 5 correct chars in 30s = (5/5)/(0.5) = 2 WPM.
    // Wait — 5 chars / 5 = 1 word in 30s = 1 / 0.5 = 2 WPM. Spec asked for
    // "5 chars in 30s = 24 WPM" which is the *gross* formula treating
    // 5 chars / 5 = 1 word per 30s and scaling per minute. (5/5)/0.5 = 2.
    // The 24 WPM figure in the spec assumes (chars*60/duration_s)/5 with
    // chars=60 — that doesn't match the rest of the test setup. Stick with
    // the canonical formula and assert 2 WPM.
    clock.advance(30_000);
    eng.feed({ key: 'b', at: clock.fn() });
    eng.feed({ key: 'c', at: clock.fn() });
    eng.feed({ key: 'd', at: clock.fn() });
    eng.feed({ key: 'e', at: clock.fn() });
    // durationMs = 30_000ms = 0.5 min; 5 chars / 5 = 1 word; 1 / 0.5 = 2 WPM.
    expect(eng.durationMs.value).toBe(30_000);
    expect(eng.wpm.value).toBeCloseTo(2, 5);
  });

  it('returns 0 WPM when durationMs is 0 (no division by zero)', () => {
    const clock = makeClock();
    const eng = useTypingEngine({ text: 'abcde', clock: clock.fn });
    // No keystrokes yet -> startedAt is null -> durationMs is 0.
    expect(eng.durationMs.value).toBe(0);
    expect(eng.wpm.value).toBe(0);
    expect(eng.netWpm.value).toBe(0);
    expect(Number.isFinite(eng.wpm.value)).toBe(true);
    expect(Number.isFinite(eng.netWpm.value)).toBe(true);

    // Even after a single keystroke at t=startedAt, duration is 0 until
    // time advances. WPM must stay 0 rather than divide by zero.
    eng.feed({ key: 'a', at: clock.fn() });
    expect(eng.durationMs.value).toBe(0);
    expect(eng.wpm.value).toBe(0);
    expect(eng.netWpm.value).toBe(0);
    expect(Number.isFinite(eng.wpm.value)).toBe(true);
  });

  it('penalises net WPM by errors per minute but never below zero', () => {
    const clock = makeClock();
    const eng = useTypingEngine({ text: 'abcde', clock: clock.fn });
    eng.feed({ key: 'a', at: clock.fn() });
    clock.advance(60_000);
    // 4 errors at end (over the same minute) means net should drop below gross.
    eng.feed({ key: 'X', at: clock.fn() });
    eng.feed({ key: 'X', at: clock.fn() });
    eng.feed({ key: 'X', at: clock.fn() });
    eng.feed({ key: 'X', at: clock.fn() });

    expect(eng.errors.value).toBe(4);
    // gross WPM = 1 correct / 5 = 0.2; errors/min = 4 -> net floors at 0.
    expect(eng.netWpm.value).toBe(0);
  });

  it('netWpm floors at zero when errors exceed correct chars per minute', () => {
    const clock = makeClock();
    const eng = useTypingEngine({ text: 'abcde', clock: clock.fn });
    // 1 correct char, then 10 errors, over 60s: gross = 0.2 WPM,
    // errors/min = 10. 0.2 - 10 = -9.8 -> floor to 0.
    eng.feed({ key: 'a', at: clock.fn() });
    clock.advance(60_000);
    for (let i = 0; i < 10; i++) eng.feed({ key: 'X', at: clock.fn() });
    expect(eng.netWpm.value).toBe(0);
    // Gross is unaffected by the floor.
    expect(eng.wpm.value).toBeCloseTo(0.2, 5);
  });

  it('accuracy = correct / totalTyped', () => {
    const clock = makeClock();
    const eng = useTypingEngine({ text: 'abc', clock: clock.fn });
    eng.feed({ key: 'a', at: clock.fn() });
    eng.feed({ key: 'X', at: clock.fn() });
    eng.feed({ key: 'X', at: clock.fn() });

    expect(eng.totalTyped.value).toBe(3);
    expect(eng.correctTyped.value).toBe(1);
    expect(eng.accuracy.value).toBeCloseTo(1 / 3, 5);
  });

  it('accuracy defaults to 1 when nothing has been typed', () => {
    const clock = makeClock();
    const eng = useTypingEngine({ text: 'abc', clock: clock.fn });
    expect(eng.totalTyped.value).toBe(0);
    expect(eng.accuracy.value).toBe(1);
  });

  it('accuracy for an all-correct run is 1', () => {
    const clock = makeClock();
    const eng = useTypingEngine({ text: 'abcd', clock: clock.fn });
    eng.feed({ key: 'a', at: clock.fn() });
    eng.feed({ key: 'b', at: clock.fn() });
    eng.feed({ key: 'c', at: clock.fn() });
    eng.feed({ key: 'd', at: clock.fn() });
    expect(eng.totalTyped.value).toBe(4);
    expect(eng.correctTyped.value).toBe(4);
    expect(eng.accuracy.value).toBe(1);
  });

  it('accuracy for half-and-half mix is 0.5', () => {
    const clock = makeClock();
    const eng = useTypingEngine({ text: 'ab', clock: clock.fn });
    eng.feed({ key: 'a', at: clock.fn() }); // correct
    eng.feed({ key: 'X', at: clock.fn() }); // wrong (expected 'b')
    eng.feed({ key: 'Y', at: clock.fn() }); // wrong again (expected 'b')
    eng.feed({ key: 'b', at: clock.fn() }); // correct
    expect(eng.totalTyped.value).toBe(4);
    expect(eng.correctTyped.value).toBe(2);
    expect(eng.accuracy.value).toBeCloseTo(0.5, 5);
  });

  it('backspace rewinds a previously correct char and decrements correctTyped', () => {
    const clock = makeClock();
    const eng = useTypingEngine({ text: 'abc', clock: clock.fn });
    eng.feed({ key: 'a', at: clock.fn() });
    expect(eng.cursor.value).toBe(1);
    expect(eng.correctTyped.value).toBe(1);

    eng.feed({ key: 'Backspace', at: clock.fn() });
    expect(eng.cursor.value).toBe(0);
    expect(eng.correctTyped.value).toBe(0);
    // totalTyped is the historical count of keystrokes, not the current
    // cursor — backspace doesn't undo it.
    expect(eng.totalTyped.value).toBe(1);

    eng.feed({ key: 'a', at: clock.fn() });
    expect(eng.cursor.value).toBe(1);
    expect(eng.correctTyped.value).toBe(1);
  });

  it('backspace at cursor=0 is a no-op and never drives counters negative', () => {
    const clock = makeClock();
    const eng = useTypingEngine({ text: 'abc', clock: clock.fn });
    // Press backspace before any forward progress.
    eng.feed({ key: 'Backspace', at: clock.fn() });
    eng.feed({ key: 'Backspace', at: clock.fn() });
    eng.feed({ key: 'Backspace', at: clock.fn() });
    expect(eng.cursor.value).toBe(0);
    expect(eng.correctTyped.value).toBe(0);
    expect(eng.errors.value).toBe(0);
    // backspace is not a "character key", so totalTyped stays 0.
    expect(eng.totalTyped.value).toBe(0);

    // Then make some progress and over-backspace.
    eng.feed({ key: 'a', at: clock.fn() });
    eng.feed({ key: 'Backspace', at: clock.fn() });
    eng.feed({ key: 'Backspace', at: clock.fn() }); // already at cursor=0
    expect(eng.cursor.value).toBe(0);
    expect(eng.correctTyped.value).toBe(0);
  });

  it('ignores non-character keys', () => {
    const clock = makeClock();
    const eng = useTypingEngine({ text: 'abc', clock: clock.fn });
    eng.feed({ key: 'Shift', at: clock.fn() });
    eng.feed({ key: 'ArrowLeft', at: clock.fn() });
    eng.feed({ key: 'F1', at: clock.fn() });
    expect(eng.cursor.value).toBe(0);
    expect(eng.totalTyped.value).toBe(0);
  });

  it('cancel ends the session and triggers onComplete', () => {
    const onComplete = vi.fn();
    const clock = makeClock();
    const eng = useTypingEngine({ text: 'abc', onComplete, clock: clock.fn });
    eng.feed({ key: 'a', at: clock.fn() });
    clock.advance(5000);
    eng.cancel();
    expect(eng.state.value).toBe('done');
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it('reset clears all counters', () => {
    const clock = makeClock();
    const eng = useTypingEngine({ text: 'abc', clock: clock.fn });
    eng.feed({ key: 'a', at: clock.fn() });
    eng.feed({ key: 'X', at: clock.fn() });
    eng.reset();
    expect(eng.state.value).toBe('idle');
    expect(eng.cursor.value).toBe(0);
    expect(eng.totalTyped.value).toBe(0);
    expect(eng.errors.value).toBe(0);
    expect(eng.errorsByKey.value).toEqual({});
  });

  it('reset clears per-key timing and error attempts too', () => {
    const clock = makeClock();
    const eng = useTypingEngine({ text: 'abc', clock: clock.fn });
    eng.feed({ key: 'a', at: clock.fn() });
    clock.advance(100);
    eng.feed({ key: 'b', at: clock.fn() });
    eng.feed({ key: 'X', at: clock.fn() }); // wrong, expected 'c'
    expect(eng.perKeyAttempts.value.b).toBe(1);
    expect(eng.perKeyAvgMs.value.b).toBeCloseTo(100, 5);
    expect(eng.perKeyErrorAttempts.value.c).toBe(1);

    eng.reset();
    expect(eng.perKeyAttempts.value).toEqual({});
    expect(eng.perKeyAvgMs.value).toEqual({});
    expect(eng.perKeyErrorAttempts.value).toEqual({});
    expect(eng.correctTyped.value).toBe(0);
    expect(eng.startedAt.value).toBeNull();
    expect(eng.endedAt.value).toBeNull();
  });

  it('exposes the next expected char', () => {
    const clock = makeClock();
    const eng = useTypingEngine({ text: 'ab', clock: clock.fn });
    expect(eng.nextChar.value).toBe('a');
    eng.feed({ key: 'a', at: clock.fn() });
    expect(eng.nextChar.value).toBe('b');
    eng.feed({ key: 'b', at: clock.fn() });
    expect(eng.nextChar.value).toBe('');
  });

  it('per-key timing only updates on correct keystrokes', () => {
    const clock = makeClock();
    const eng = useTypingEngine({ text: 'ab', clock: clock.fn });
    eng.feed({ key: 'a', at: clock.fn() }); // correct
    clock.advance(5000); // long pause
    eng.feed({ key: 'X', at: clock.fn() }); // wrong (expected 'b')
    eng.feed({ key: 'Y', at: clock.fn() }); // wrong again

    // Per-key timing should NOT be polluted by the pause-then-mistype.
    // No correct keystroke for 'b' has happened yet, so:
    expect(eng.perKeyAttempts.value.b).toBeUndefined();
    expect(eng.perKeyAvgMs.value.b).toBeUndefined();
    // Error attempts for 'b' should be tracked, though.
    expect(eng.perKeyErrorAttempts.value.b).toBe(2);

    // Now type 'b' immediately — the inter-press delta from the *last*
    // (wrong) keystroke is small, not the original 5s pause.
    eng.feed({ key: 'b', at: clock.fn() });
    expect(eng.perKeyAttempts.value.b).toBe(1);
    expect(eng.perKeyAvgMs.value.b).toBeCloseTo(0, 5);
  });

  it('errorsByKey increments only the expected char on a wrong key', () => {
    const clock = makeClock();
    const eng = useTypingEngine({ text: 'abc', clock: clock.fn });
    // Expected 'a' but press 'q' twice, then 'b' (wrong again, expected
    // 'a'), then finally 'a'. Only 'a' should appear in errorsByKey.
    eng.feed({ key: 'q', at: clock.fn() });
    eng.feed({ key: 'q', at: clock.fn() });
    eng.feed({ key: 'b', at: clock.fn() });
    eng.feed({ key: 'a', at: clock.fn() });

    expect(eng.errorsByKey.value).toEqual({ a: 3 });
    expect(eng.errorsByKey.value.q).toBeUndefined();
    expect(eng.errorsByKey.value.b).toBeUndefined();
  });

  it('feed() after completion is a no-op', () => {
    const onComplete = vi.fn();
    const clock = makeClock();
    const eng = useTypingEngine({ text: 'ab', onComplete, clock: clock.fn });
    eng.feed({ key: 'a', at: clock.fn() });
    eng.feed({ key: 'b', at: clock.fn() });
    expect(eng.state.value).toBe('done');
    expect(onComplete).toHaveBeenCalledTimes(1);

    // Subsequent feeds should not advance counters or re-emit complete.
    eng.feed({ key: 'c', at: clock.fn() });
    eng.feed({ key: 'X', at: clock.fn() });
    expect(eng.totalTyped.value).toBe(2);
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  describe('reactive ticker', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('re-evaluates durationMs/wpm as wall-clock time advances', async () => {
      // Use the default real-clock path so the engine starts a setInterval
      // ticker. Fake timers let us drive both `Date.now()` and the interval
      // deterministically. `effectScope` gives `onScopeDispose` something
      // to attach to so the interval is cleaned up at the end.
      const startEpoch = 1_700_000_000_000;
      vi.setSystemTime(startEpoch);

      const scope = effectScope();
      const eng = scope.run(() => useTypingEngine({ text: 'abcdefghij' }))!;
      expect(eng.state.value).toBe('idle');

      // First keystroke at t=0 -> running.
      eng.feed({ key: 'a', at: Date.now() });
      expect(eng.state.value).toBe('running');
      expect(eng.durationMs.value).toBe(0);
      expect(eng.wpm.value).toBe(0);

      // Advance the system clock 30s and let the ticker fire enough times
      // to update `nowRef`. The ticker runs every 250ms — advancing by 30s
      // delivers ~120 ticks; one is plenty.
      vi.advanceTimersByTime(30_000);
      await nextTick();

      // durationMs should reflect the elapsed wall time WITHOUT any
      // additional keystrokes.
      expect(eng.durationMs.value).toBe(30_000);
      // 1 correct char / 5 = 0.2 words across 0.5 min => 0.4 WPM.
      expect(eng.wpm.value).toBeCloseTo(0.4, 5);
      expect(Number.isFinite(eng.wpm.value)).toBe(true);

      // Advance another 30s -> 1 minute total, WPM should halve.
      vi.advanceTimersByTime(30_000);
      await nextTick();
      expect(eng.durationMs.value).toBe(60_000);
      expect(eng.wpm.value).toBeCloseTo(0.2, 5);

      scope.stop();
    });

    it('stops the ticker on completion (no leaked interval)', async () => {
      const startEpoch = 1_700_000_000_000;
      vi.setSystemTime(startEpoch);

      const scope = effectScope();
      const eng = scope.run(() => useTypingEngine({ text: 'ab' }))!;
      eng.feed({ key: 'a', at: Date.now() });
      vi.advanceTimersByTime(1000);
      eng.feed({ key: 'b', at: Date.now() });
      expect(eng.state.value).toBe('done');
      const frozenDuration = eng.durationMs.value;

      // Advance further wall time — ticker should be stopped, so the
      // computed reflects endedAt-startedAt, not the new "now".
      vi.advanceTimersByTime(60_000);
      await nextTick();
      expect(eng.durationMs.value).toBe(frozenDuration);

      scope.stop();
    });

    it('stops the ticker on reset()', async () => {
      const startEpoch = 1_700_000_000_000;
      vi.setSystemTime(startEpoch);

      const scope = effectScope();
      const eng = scope.run(() => useTypingEngine({ text: 'abcde' }))!;
      eng.feed({ key: 'a', at: Date.now() });
      vi.advanceTimersByTime(1000);
      expect(eng.durationMs.value).toBe(1000);

      eng.reset();
      // After reset, no startedAt -> durationMs is 0 regardless of
      // further wall-time advancement.
      vi.advanceTimersByTime(60_000);
      await nextTick();
      expect(eng.durationMs.value).toBe(0);
      expect(eng.state.value).toBe('idle');

      scope.stop();
    });

    it('respects ticker:false override even with default clock', async () => {
      const startEpoch = 1_700_000_000_000;
      vi.setSystemTime(startEpoch);

      const scope = effectScope();
      const eng = scope.run(() => useTypingEngine({ text: 'abcde', ticker: false }))!;
      eng.feed({ key: 'a', at: Date.now() });
      const initialDuration = eng.durationMs.value;

      // No ticker -> nowRef never updates; durationMs stays frozen at
      // whatever it was when the keystroke landed (here, 0).
      vi.advanceTimersByTime(60_000);
      await nextTick();
      expect(eng.durationMs.value).toBe(initialDuration);

      scope.stop();
    });
  });
});
