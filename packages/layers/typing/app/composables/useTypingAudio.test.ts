// @vitest-environment nuxt
//
// Note on environment: useTypingAudio reads `import.meta.client` and
// calls the auto-imported `useState` — both of which only resolve under
// the Nuxt test environment. The task suggested `@vitest-environment
// node` with a stubbed AudioContext, but stubbing AudioContext is
// orthogonal to the env, and running under `nuxt` lets the composable
// use its real auto-imports instead of re-implementing them here.

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

// ---------------------------------------------------------------------------
// Fake AudioContext that records every node/oscillator interaction.
// ---------------------------------------------------------------------------

type FakeOscillator = {
  type: OscillatorType;
  frequency: { value: number };
  connect: ReturnType<typeof vi.fn>;
  disconnect: ReturnType<typeof vi.fn>;
  start: ReturnType<typeof vi.fn>;
  stop: ReturnType<typeof vi.fn>;
  onended: (() => void) | null;
  // Track the requested start time so tests can assert offsets.
  startedAt: number | null;
};

type FakeGain = {
  gain: {
    setValueAtTime: ReturnType<typeof vi.fn>;
    exponentialRampToValueAtTime: ReturnType<typeof vi.fn>;
  };
  connect: ReturnType<typeof vi.fn>;
};

function makeFakeOscillator(): FakeOscillator {
  const osc: FakeOscillator = {
    type: 'sine',
    frequency: { value: 0 },
    connect: vi.fn(() => destination),
    disconnect: vi.fn(),
    start: vi.fn((when: number) => {
      osc.startedAt = when ?? 0;
    }),
    stop: vi.fn(),
    onended: null,
    startedAt: null,
  };
  return osc;
}

function makeFakeGain(): FakeGain {
  return {
    gain: {
      setValueAtTime: vi.fn(),
      exponentialRampToValueAtTime: vi.fn(),
    },
    connect: vi.fn(() => destination),
  };
}

// The composable calls `osc.connect(gain).connect(ctx.destination)`, so
// both `osc.connect()` and `gain.connect()` need to return something
// with its own `.connect()`. A shared destination stub is fine.
const destination = { connect: vi.fn() };

let constructedContexts = 0;
let oscillators: FakeOscillator[] = [];
let currentTime = 0;

class FakeAudioContext {
  state: 'running' | 'suspended' | 'closed' = 'running';
  destination = destination;
  constructor() {
    constructedContexts++;
  }
  get currentTime() {
    return currentTime;
  }
  createOscillator() {
    const osc = makeFakeOscillator();
    oscillators.push(osc);
    return osc;
  }
  createGain() {
    return makeFakeGain();
  }
  resume() {
    this.state = 'running';
    return Promise.resolve();
  }
}

// Module-scope `sharedAudioCtx` in useTypingAudio survives between
// tests in the same process, so we reload the module before each test
// to reset it.
async function loadFresh() {
  vi.resetModules();
  return await import('./useTypingAudio');
}

beforeEach(() => {
  constructedContexts = 0;
  oscillators = [];
  currentTime = 0;
  // happy-dom doesn't ship a WebAudio implementation, so plant the
  // fake directly on `window` (which the composable reads from). A
  // `vi.stubGlobal` call alone misses this because `window.AudioContext`
  // isn't a tracked global — it's a missing property.
  (window as unknown as { AudioContext: typeof FakeAudioContext }).AudioContext = FakeAudioContext;
});

afterEach(() => {
  vi.unstubAllGlobals();
  delete (window as unknown as { AudioContext?: unknown }).AudioContext;
});

describe('useTypingAudio — synth helpers', () => {
  it('does NOT construct an AudioContext when audioOn is false', async () => {
    const { useTypingAudio } = await loadFresh();
    const audio = useTypingAudio();
    audio.audioOn.value = false;

    audio.playClick();

    expect(constructedContexts).toBe(0);
    expect(oscillators).toHaveLength(0);
  });

  it('reuses the shared AudioContext across getAudioCtx() calls', async () => {
    const { useTypingAudio } = await loadFresh();
    const audio = useTypingAudio();
    // The audioOn useState is cached in the Nuxt SSR context across the
    // whole suite, so explicitly reset it for every test that needs
    // sound.
    audio.audioOn.value = true;

    audio.playClick();
    audio.playClick();
    audio.playClick();

    expect(constructedContexts).toBe(1);
    expect(oscillators).toHaveLength(3);
  });

  it('clamps playStreakDing tier to [1, 5] — three notes at tier 1', async () => {
    const { useTypingAudio } = await loadFresh();
    const audio = useTypingAudio();
    audio.audioOn.value = true;

    audio.playStreakDing(0); // clamps up to 1
    expect(oscillators).toHaveLength(3);
  });

  it('plays four notes at tier 4', async () => {
    const { useTypingAudio } = await loadFresh();
    const audio = useTypingAudio();
    audio.audioOn.value = true;

    audio.playStreakDing(4);
    expect(oscillators).toHaveLength(4);
  });

  it('plays five notes at tier 5 and clamps higher tiers', async () => {
    const { useTypingAudio } = await loadFresh();
    const audio = useTypingAudio();
    audio.audioOn.value = true;

    audio.playStreakDing(99); // clamps down to 5
    expect(oscillators).toHaveLength(5);
  });

  it('play() short-circuits when audioOn is false', async () => {
    const { useTypingAudio } = await loadFresh();
    const audio = useTypingAudio();
    audio.audioOn.value = false;

    const speakSpy = vi.fn();
    vi.stubGlobal('speechSynthesis', { speak: speakSpy, cancel: vi.fn(), getVoices: () => [] });

    await audio.play('a');

    // No oscillator, no web-speech call, no fetch — purely a no-op.
    expect(oscillators).toHaveLength(0);
    expect(speakSpy).not.toHaveBeenCalled();
  });

  it('stopAll() stops and disconnects every active oscillator', async () => {
    const { useTypingAudio } = await loadFresh();
    const audio = useTypingAudio();
    audio.audioOn.value = true;

    audio.playFanfare(); // schedules 4 oscillators
    expect(oscillators).toHaveLength(4);

    // None have ended yet (we never fire onended), so stopAll should
    // explicitly stop + disconnect each one.
    audio.stopAll();

    for (const osc of oscillators) {
      // stop is called at least twice — once by playTone's
      // osc.stop(end) schedule and once by stopAll's immediate stop().
      expect(osc.stop).toHaveBeenCalled();
      expect(osc.disconnect).toHaveBeenCalled();
    }
  });

  it('stopAll() is idempotent — onended drains the set before stopAll runs', async () => {
    const { useTypingAudio } = await loadFresh();
    const audio = useTypingAudio();
    audio.audioOn.value = true;

    audio.playClick();
    // Simulate the oscillator finishing naturally before stopAll runs.
    const [osc] = oscillators;
    expect(osc).toBeDefined();
    osc!.onended?.();

    // Should not throw, and the second osc.stop() shouldn't happen
    // because onended already removed it from the active set.
    expect(() => audio.stopAll()).not.toThrow();
    expect(osc!.stop).toHaveBeenCalledTimes(1); // only the scheduled stop
  });

  it('playFanfare() schedules its first note with a 200 ms initial offset', async () => {
    const { useTypingAudio } = await loadFresh();
    const audio = useTypingAudio();
    audio.audioOn.value = true;

    currentTime = 10; // pretend the context is 10 seconds in
    audio.playFanfare();

    expect(oscillators).toHaveLength(4);
    // baseDelayMs = 200, so first note starts at currentTime + 0.2 and
    // subsequent notes are cumulative +0.11 seconds apart.
    expect(oscillators[0]!.startedAt).toBeCloseTo(10 + 0.2, 5);
    expect(oscillators[1]!.startedAt).toBeCloseTo(10 + 0.2 + 0.11, 5);
    expect(oscillators[2]!.startedAt).toBeCloseTo(10 + 0.2 + 0.22, 5);
    expect(oscillators[3]!.startedAt).toBeCloseTo(10 + 0.2 + 0.33, 5);
  });
});
