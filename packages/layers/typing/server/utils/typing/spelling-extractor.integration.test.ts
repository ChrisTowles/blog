/**
 * Live integration test for the spelling-list image extractor.
 * Skipped unless `RUN_INTEGRATION=1` and `ANTHROPIC_API_KEY` are set.
 *
 * Requires a fixture image at packages/blog/public/images/typing/test-worksheet.png
 * (a synthetic 6-word worksheet committed for this test). Skip if absent.
 */
import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { extractSpellingWords } from './spelling-extractor';

const fixturePath = join(
  process.cwd(),
  'packages',
  'blog',
  'public',
  'images',
  'typing',
  'test-worksheet.png',
);

const shouldRun =
  process.env.RUN_INTEGRATION === '1' && !!process.env.ANTHROPIC_API_KEY && existsSync(fixturePath);

describe.skipIf(!shouldRun)('extractSpellingWords (live Anthropic vision)', () => {
  it('extracts at least one word from the test worksheet', async () => {
    const buffer = readFileSync(fixturePath);
    const base64 = buffer.toString('base64');
    const result = await extractSpellingWords(base64, 'image/png');
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.words.length).toBeGreaterThan(0);
  }, 60_000);
});
