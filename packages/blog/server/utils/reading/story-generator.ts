import Anthropic from '@anthropic-ai/sdk';
import { annotateWords, calculateDecodability } from './phonics-validator';
import type { StoryContent } from '~~/shared/reading-types';

interface GenerateOptions {
  allowedPatterns: string[];
  sightWords: string[];
  targetWords: string[];
  theme: string;
  wordCount?: number;
}

interface GeneratedStory {
  title: string;
  content: StoryContent;
  rawText: string;
  decodabilityScore: number;
  fleschKincaid: number;
}

const MAX_RETRIES = 2;

export async function generateStory(options: GenerateOptions): Promise<GeneratedStory> {
  const { allowedPatterns, sightWords, targetWords, theme, wordCount = 75 } = options;

  const client = new Anthropic();

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      temperature: 0.3,
      system: `You are a decodable story writer for children ages 7-11. Follow these constraints EXACTLY:
ALLOWED PATTERNS: ${allowedPatterns.join(', ')}
SIGHT WORDS: ${sightWords.join(', ')}
TARGET NEW WORDS (use each 2+ times): ${targetWords.join(', ')}
INTEREST THEME: ${theme}
LENGTH: ${wordCount - 15}-${wordCount + 15} words, sentences 3-8 words each

Generate a story with a simple problem -> attempt -> resolution arc.
Use ONLY words that match the allowed patterns, sight words, or target words.
Output as JSON: { "title": "...", "text": "..." }`,
      messages: [{ role: 'user', content: `Write a decodable story about ${theme}.` }],
    });

    const textBlock = response.content.find((b) => b.type === 'text');
    if (!textBlock || textBlock.type !== 'text') {
      throw new Error('No text in response');
    }

    // Parse JSON from response
    const jsonMatch = textBlock.text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON in response');
    }

    const parsed = JSON.parse(jsonMatch[0]) as { title: string; text: string };
    const words = parsed.text.split(/\s+/).filter(Boolean);

    const decodabilityScore = calculateDecodability(words, allowedPatterns, sightWords);

    if (decodabilityScore >= 0.95 || attempt === MAX_RETRIES) {
      const annotatedWords = annotateWords(parsed.text, allowedPatterns, sightWords);

      // Split into pages (~20 words each)
      const wordsPerPage = 20;
      const pages = [];
      for (let i = 0; i < annotatedWords.length; i += wordsPerPage) {
        pages.push({ words: annotatedWords.slice(i, i + wordsPerPage) });
      }

      const content: StoryContent = { pages };
      const fk = calculateFleschKincaid(parsed.text);

      return {
        title: parsed.title,
        content,
        rawText: parsed.text,
        decodabilityScore,
        fleschKincaid: fk,
      };
    }
  }

  throw new Error('Failed to generate story with sufficient decodability');
}

function calculateFleschKincaid(text: string): number {
  const sentences = text.split(/[.!?]+/).filter(Boolean);
  const words = text.split(/\s+/).filter(Boolean);
  const syllables = words.reduce((sum, w) => sum + countSyllables(w), 0);

  if (sentences.length === 0 || words.length === 0) return 0;

  return 0.39 * (words.length / sentences.length) + 11.8 * (syllables / words.length) - 15.59;
}

function countSyllables(word: string): number {
  const clean = word.toLowerCase().replace(/[^a-z]/g, '');
  if (clean.length <= 3) return 1;
  const matches = clean.match(/[aeiouy]+/g);
  let count = matches ? matches.length : 1;
  if (clean.endsWith('e') && !clean.endsWith('le')) count--;
  return Math.max(1, count);
}
