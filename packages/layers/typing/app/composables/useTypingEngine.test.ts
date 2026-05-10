// @vitest-environment node
import { describe, expect, it, vi } from 'vitest';
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

  it('counts errors and records per-key error counts', () => {
    const clock = makeClock();
    const eng = useTypingEngine({ text: 'abc', clock: clock.fn });
    eng.feed({ key: 'x', at: clock.fn() }); // wrong, expected 'a'
    expect(eng.errors.value).toBe(1);
    expect(eng.errorsByKey.value).toEqual({ a: 1 });
    expect(eng.cursor.value).toBe(1);
    expect(eng.totalTyped.value).toBe(1);
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

  it('backspace reverses the cursor without inflating typed counts', () => {
    const clock = makeClock();
    const eng = useTypingEngine({ text: 'abc', clock: clock.fn });
    eng.feed({ key: 'X', at: clock.fn() }); // wrong at pos 0
    expect(eng.cursor.value).toBe(1);
    expect(eng.errors.value).toBe(1);
    eng.feed({ key: 'Backspace', at: clock.fn() });
    expect(eng.cursor.value).toBe(0);
    // Backspace itself does not change totalTyped or correctTyped beyond
    // the original keystroke.
    expect(eng.totalTyped.value).toBe(1);
    expect(eng.correctTyped.value).toBe(0);
    // After the correction, typing 'a' should advance correctly.
    eng.feed({ key: 'a', at: clock.fn() });
    expect(eng.cursor.value).toBe(1);
    expect(eng.correctTyped.value).toBe(1);
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

  it('exposes the next expected char', () => {
    const clock = makeClock();
    const eng = useTypingEngine({ text: 'ab', clock: clock.fn });
    expect(eng.nextChar.value).toBe('a');
    eng.feed({ key: 'a', at: clock.fn() });
    expect(eng.nextChar.value).toBe('b');
    eng.feed({ key: 'b', at: clock.fn() });
    expect(eng.nextChar.value).toBe('');
  });
});
