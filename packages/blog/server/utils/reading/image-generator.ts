import { GoogleGenAI, Modality } from '@google/genai';

interface StoryIllustrations {
  cover: Buffer;
  pages: Buffer[];
}

const ILLUSTRATION_STYLE =
  'Flat vector illustration style. Soft rounded shapes with thick dark outlines. Warm saturated colors on cream/warm white backgrounds. Characters have simple expressive faces with dot eyes and small mouths. Characters are 2-3 heads tall (chibi proportions). Style similar to Bluey or Peppa Pig — simple, clean, appealing to ages 5-10. No text, no words, no letters in the image. Scene has simple background elements (grass, sky, simple furniture). Consistent warm lighting.';

const CHARACTER_DESCRIPTIONS: Record<string, string> = {
  cat: 'An orange tabby cat with big green eyes, round body, short stubby legs, pink nose, always smiling. Thick dark outline.',
  hen: 'A plump red hen with bright yellow beak, small flapping wings, wearing a tiny blue polka-dot bow on head. Round body.',
  'red hen':
    'A plump red hen with bright yellow beak, small flapping wings, wearing a tiny blue polka-dot bow on head. Round body.',
  dan: 'A young boy with curly brown hair, round cheerful face, wearing a blue and white striped t-shirt and brown shorts. Big brown eyes.',
  boy: 'A young boy with curly brown hair, round cheerful face, wearing a blue and white striped t-shirt and brown shorts. Big brown eyes.',
  dog: 'A friendly golden retriever puppy with floppy ears, wagging tail, round brown eyes. Slightly smaller than the cat.',
  fish: 'A bright blue tropical fish with big round eyes, small orange fins, friendly expression.',
  ship: 'A small red wooden sailboat with a white sail, simple design, floating on gentle blue waves.',
  boat: 'A small red wooden sailboat with a white sail, simple design, floating on gentle blue waves.',
};

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GOOGLE_AI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
}

function buildCharacterPrompt(characters: string[]): string {
  const descriptions = characters
    .map((c) => CHARACTER_DESCRIPTIONS[c.toLowerCase()])
    .filter(Boolean);
  if (descriptions.length === 0) return '';
  return `Characters in the scene: ${descriptions.join(' ')}`;
}

function extractCharacters(text: string): string[] {
  const lowerText = text.toLowerCase();
  const found: string[] = [];
  // Check longer keys first to avoid duplicate matches (e.g. "red hen" before "hen")
  const keys = Object.keys(CHARACTER_DESCRIPTIONS).sort((a, b) => b.length - a.length);
  for (const key of keys) {
    if (
      lowerText.includes(key) &&
      !found.some((f) => CHARACTER_DESCRIPTIONS[f] === CHARACTER_DESCRIPTIONS[key])
    ) {
      found.push(key);
    }
  }
  return found;
}

async function generateImage(
  ai: GoogleGenAI,
  prompt: string,
  characters: string[] = [],
): Promise<Buffer> {
  const charPrompt = buildCharacterPrompt(characters);
  const fullPrompt = [ILLUSTRATION_STYLE, charPrompt, prompt].filter(Boolean).join(' ');

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: fullPrompt,
    config: {
      responseModalities: [Modality.TEXT, Modality.IMAGE],
      imageConfig: { aspectRatio: '4:3' },
    },
  });

  const parts = response.candidates?.[0]?.content?.parts ?? [];
  const imagePart = parts.find((p: any) => p.inlineData?.mimeType?.startsWith('image/'));

  if (!imagePart?.inlineData?.data) {
    throw new Error('No image returned from Gemini API');
  }

  return Buffer.from(imagePart.inlineData.data, 'base64');
}

export async function generateStoryIllustrations(
  title: string,
  theme: string,
  pageTexts: string[],
): Promise<StoryIllustrations> {
  const ai = getGeminiClient();
  if (!ai) {
    throw new Error('GOOGLE_AI_API_KEY not configured');
  }

  // Extract all characters across all pages for the cover
  const allCharacters = extractCharacters([title, ...pageTexts].join(' '));

  const [cover, ...pages] = await Promise.all([
    generateImage(
      ai,
      `Book cover for a children's story called "${title}" about ${theme}.`,
      allCharacters,
    ),
    ...pageTexts.map((text) => {
      const pageCharacters = extractCharacters(text);
      return generateImage(
        ai,
        `Scene from a children's story about ${theme}: ${text}`,
        pageCharacters,
      );
    }),
  ]);

  return { cover: cover!, pages };
}

/**
 * Convert illustration buffers to data URI strings.
 * Stores images inline in the database rather than writing to the filesystem,
 * which ensures they persist on ephemeral hosting like Cloud Run.
 */
export function saveStoryImages(_storyId: number, images: StoryIllustrations): string[] {
  const urls: string[] = [];

  urls.push(`data:image/png;base64,${images.cover.toString('base64')}`);

  for (const page of images.pages) {
    urls.push(`data:image/png;base64,${page.toString('base64')}`);
  }

  return urls;
}
