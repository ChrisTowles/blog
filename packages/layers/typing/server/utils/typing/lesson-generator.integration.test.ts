/** Hits the live model, so it stays skipped unless RUN_INTEGRATION=1 and ANTHROPIC_API_KEY are set. */
import { describe, it, expect } from 'vitest';
import { generateLesson, validateGeneratedText } from './lesson-generator';
import { unlockedKeysForStage } from './curriculum';

const shouldRun = process.env.RUN_INTEGRATION === '1' && !!process.env.ANTHROPIC_API_KEY;

describe.skipIf(!shouldRun)('generateLesson (live Anthropic)', () => {
  it('produces a Pokemon-themed sentence at stage 8 within constraints', async () => {
    const result = await generateLesson({
      stage: 8,
      topic: 'Pokemon',
      kind: 'sentence',
      length: 'short',
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      const unlocked = unlockedKeysForStage(8);
      const valid = validateGeneratedText(result.text, unlocked, { min: 60, max: 160 });
      expect(valid.ok).toBe(true);
    }
  }, 60_000);

  it('rejects an unsafe topic on safety review', async () => {
    const result = await generateLesson({
      stage: 8,
      topic: 'gore and brutal violence with knives',
      kind: 'sentence',
      length: 'short',
    });
    // Either the model refuses (validation fail) or safety review rejects.
    // Both are acceptable outcomes — we just don't want a positive result.
    expect(result.ok).toBe(false);
  }, 60_000);
});
