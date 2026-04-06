import { annotateWords, calculateDecodability } from './phonics-validator';
import type { StoryContent, StoryPreview } from '../../../shared/reading-types';
import { MODEL_HAIKU } from '~~/shared/models';

interface GenerateOptions {
  allowedPatterns: string[];
  sightWords: string[];
  targetWords: string[];
  theme: string;
  who?: string;
  idea?: string;
  selectedPreview?: StoryPreview;
  wordCount?: number;
}

interface PreviewOptions {
  theme: string;
  who?: string;
  idea?: string;
  childInterests: string[];
}

interface GeneratedStory {
  title: string;
  content: StoryContent;
  rawText: string;
  decodabilityScore: number;
  fleschKincaid: number;
}

const MAX_RETRIES = 2;

export function buildStoryPromptExtras(options: {
  who?: string;
  idea?: string;
  selectedPreview?: StoryPreview;
}): string {
  const parts: string[] = [];
  if (options.who) {
    parts.push(`MAIN CHARACTER: ${options.who}`);
  }
  if (options.idea) {
    parts.push(`STORY IDEA: ${options.idea}`);
  }
  if (options.selectedPreview) {
    parts.push(
      `USE THIS STORY CONCEPT: Title: "${options.selectedPreview.title}" — ${options.selectedPreview.summary}`,
    );
  }
  return parts.join('\n');
}

export async function generateStoryPreviews(options: PreviewOptions): Promise<StoryPreview[]> {
  const client = getAnthropicClient();

  const contextParts: string[] = [`THEME: ${options.theme}`];
  if (options.who) contextParts.push(`MAIN CHARACTER: ${options.who}`);
  if (options.idea) contextParts.push(`STORY IDEA: ${options.idea}`);
  if (options.childInterests.length > 0) {
    contextParts.push(`CHILD'S INTERESTS: ${options.childInterests.join(', ')}`);
  }

  const response = await client.messages.create({
    model: MODEL_HAIKU,
    max_tokens: 512,
    temperature: 0.7,
    system: `You generate story previews for children ages 7-11. Create exactly 4 unique story concepts.
${contextParts.join('\n')}

Output as JSON array: [{ "title": "...", "summary": "..." }, ...]
Each summary should be exactly one sentence describing the story plot.
Make titles fun and engaging for children. Vary the story arcs (adventure, mystery, friendship, humor).`,
    messages: [{ role: 'user', content: `Generate 4 story previews about ${options.theme}.` }],
  });

  const textBlock = response.content.find((b) => b.type === 'text');
  if (!textBlock || textBlock.type !== 'text') {
    throw new Error('No text in preview response');
  }

  const jsonMatch = textBlock.text.match(/\[[\s\S]*\]/);
  if (!jsonMatch) {
    throw new Error('No JSON array in preview response');
  }

  const previews = JSON.parse(jsonMatch[0]) as StoryPreview[];
  return previews.slice(0, 4);
}

export async function generateStory(options: GenerateOptions): Promise<GeneratedStory> {
  const {
    allowedPatterns,
    sightWords,
    targetWords,
    theme,
    who,
    idea,
    selectedPreview,
    wordCount = 75,
  } = options;

  const client = getAnthropicClient();
  const extras = buildStoryPromptExtras({ who, idea, selectedPreview });

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    const response = await client.messages.create({
      model: MODEL_HAIKU,
      max_tokens: 1024,
      temperature: 0.3,
      system: `You are a decodable story writer for children ages 7-11. Follow these constraints EXACTLY:
ALLOWED PATTERNS: ${allowedPatterns.join(', ')}
SIGHT WORDS: ${sightWords.join(', ')}
TARGET NEW WORDS (use each 2+ times): ${targetWords.join(', ')}
INTEREST THEME: ${theme}
LENGTH: ${wordCount - 15}-${wordCount + 15} words, sentences 3-8 words each
${extras}

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

export function calculateFleschKincaid(text: string): number {
  const sentences = text.split(/[.!?]+/).filter(Boolean);
  const words = text.split(/\s+/).filter(Boolean);
  const syllables = words.reduce((sum, w) => sum + countSyllables(w), 0);

  if (sentences.length === 0 || words.length === 0) return 0;

  return 0.39 * (words.length / sentences.length) + 11.8 * (syllables / words.length) - 15.59;
}

export function countSyllables(word: string): number {
  const clean = word.toLowerCase().replace(/[^a-z]/g, '');
  if (clean.length <= 3) return 1;
  const matches = clean.match(/[aeiouy]+/g);
  let count = matches ? matches.length : 1;
  if (clean.endsWith('e') && !clean.endsWith('le')) count--;
  return Math.max(1, count);
}
