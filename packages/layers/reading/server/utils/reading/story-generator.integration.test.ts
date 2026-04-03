import { describe, it, expect } from 'vitest';
import { generateStory } from './story-generator';
import { reviewStorySafety } from './story-safety';

const hasApiKeys = !!process.env.ANTHROPIC_API_KEY && !!process.env.BRAINTRUST_API_KEY;

describe.skipIf(!hasApiKeys)('AI story generation pipeline', () => {
  it('generates a decodable story with correct structure', async () => {
    const result = await generateStory({
      allowedPatterns: ['CVC-short-a', 'CVC-short-i', 'CVC-short-o'],
      sightWords: [
        'the',
        'a',
        'is',
        'on',
        'he',
        'she',
        'to',
        'and',
        'it',
        'in',
        'not',
        'so',
        'they',
        'are',
      ],
      targetWords: ['dig', 'hit', 'ran'],
      theme: 'dinosaurs',
      wordCount: 60,
    });

    // Has title
    expect(result.title).toBeTruthy();
    expect(typeof result.title).toBe('string');

    // Has content with pages
    expect(result.content.pages).toBeDefined();
    expect(result.content.pages.length).toBeGreaterThan(0);

    // Pages contain annotated StoryWord objects
    const firstPage = result.content.pages[0]!;
    expect(firstPage.words.length).toBeGreaterThan(0);

    const firstWord = firstPage.words[0]!;
    expect(firstWord).toHaveProperty('text');
    expect(firstWord).toHaveProperty('decodable');
    expect(firstWord).toHaveProperty('pattern');
    expect(firstWord).toHaveProperty('sightWord');

    // Decodability should be reasonable (>= 0.6, target is 0.95)
    expect(result.decodabilityScore).toBeGreaterThanOrEqual(0.6);

    // Flesch-Kincaid should be a finite number
    expect(Number.isFinite(result.fleschKincaid)).toBe(true);

    // Raw text should be non-empty
    expect(result.rawText.length).toBeGreaterThan(0);
  }, 30000);

  it('passes safety review on a generated story', async () => {
    const generated = await generateStory({
      allowedPatterns: ['CVC-short-a', 'CVC-short-i'],
      sightWords: ['the', 'a', 'is', 'on', 'he', 'she', 'to', 'and'],
      targetWords: ['cat', 'sat'],
      theme: 'pets',
      wordCount: 40,
    });

    const safety = await reviewStorySafety(generated.rawText);
    expect(safety.safe).toBe(true);
  }, 30000);
});
