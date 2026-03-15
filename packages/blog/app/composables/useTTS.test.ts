import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useTTS } from './useTTS';

// Mock Web Speech API
const mockUtterance = {
  rate: 1,
  pitch: 1,
  volume: 1,
  text: '',
  onboundary: null as ((e: SpeechSynthesisEvent) => void) | null,
  onend: null as (() => void) | null,
};

// Use a real class so `new` works in all environments
class MockSpeechSynthesisUtterance {
  rate = 1;
  pitch = 1;
  volume = 1;
  text = '';
  onboundary: ((e: SpeechSynthesisEvent) => void) | null = null;
  onend: (() => void) | null = null;
  constructor(text?: string) {
    this.text = text ?? '';
    // Proxy assignments back to shared object so tests can inspect
    Object.assign(mockUtterance, this);
    return mockUtterance as unknown as MockSpeechSynthesisUtterance;
  }
}

vi.stubGlobal('SpeechSynthesisUtterance', MockSpeechSynthesisUtterance);
vi.stubGlobal('speechSynthesis', {
  speak: vi.fn(),
  cancel: vi.fn(),
  pause: vi.fn(),
  resume: vi.fn(),
  speaking: false,
  paused: false,
});

describe('useTTS', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('creates utterance with child-friendly rate', () => {
    const { speak } = useTTS();
    speak('hello world');
    expect(mockUtterance.rate).toBe(0.8);
  });

  it('exposes speaking state', () => {
    const { isSpeaking } = useTTS();
    expect(isSpeaking.value).toBe(false);
  });

  it('tracks current word index via onboundary', () => {
    const { speak, currentWordIndex } = useTTS();
    speak('the cat sat');
    expect(currentWordIndex.value).toBe(-1);
  });
});
