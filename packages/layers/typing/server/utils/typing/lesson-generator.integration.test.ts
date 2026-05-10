/**
 * Live integration test for the AI lesson generator.
 *
 * Skipped unless `RUN_INTEGRATION=1` and `ANTHROPIC_API_KEY` are both set.
 * The unit test (`lesson-generator.test.ts`) covers the happy path and
 * retry logic with the SDK mocked.
 *
 * Run with:
 *   RUN_INTEGRATION=1 ANTHROPIC_API_KEY=... pnpm test --run lesson-generator.integration
 */
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
