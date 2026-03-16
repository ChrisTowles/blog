import { GoogleGenAI, Modality } from '@google/genai';
import { writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';

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

const DEMO_STORIES = [
  {
    id: 'the-big-cat',
    title: 'The Big Cat',
    theme: 'animals',
    pages: [
      'The big cat sat on a mat',
      'The cat is sad. He can not nap',
      'A dog ran to the cat. The cat hid',
      'The dog sat. The cat sat. They are pals',
    ],
  },
  {
    id: 'the-red-hen',
    title: 'The Red Hen',
    theme: 'farm',
    pages: [
      'The red hen got a bug',
      'She fed the bug to the ten chicks',
      'The sun is hot. The hen dug a pit',
      'The hen and the chicks sat in the mud. They are so wet',
    ],
  },
  {
    id: 'dan-and-the-ship',
    title: 'Dan and the Ship',
    theme: 'adventure',
    pages: [
      'Dan has a big ship',
      'He ran to the ship and sat in it',
      'The ship hit a big fish. Splash',
      'Dan is so glad. He did it. He can wish and wish',
    ],
  },
];

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

async function main() {
  const apiKey = process.env.GOOGLE_AI_API_KEY;
  if (!apiKey) {
    console.error('GOOGLE_AI_API_KEY environment variable is required');
    process.exit(1);
  }

  const ai = new GoogleGenAI({ apiKey });
  const baseDir = join(import.meta.dirname, '../public/images/reading/demo');

  for (const story of DEMO_STORIES) {
    const storyDir = join(baseDir, story.id);
    await mkdir(storyDir, { recursive: true });

    console.log(`Generating images for "${story.title}"...`);

    // Extract all characters for cover
    const allCharacters = extractCharacters([story.title, ...story.pages].join(' '));

    // Cover image with all story characters
    const cover = await generateImage(
      ai,
      `Book cover for a children's story called "${story.title}" about ${story.theme}.`,
      allCharacters,
    );
    await writeFile(join(storyDir, 'cover.png'), cover);
    console.log(`  cover.png saved`);

    // Page images with per-page characters
    for (let i = 0; i < story.pages.length; i++) {
      const pageCharacters = extractCharacters(story.pages[i]!);
      const page = await generateImage(
        ai,
        `Scene from a children's story about ${story.theme}: ${story.pages[i]}`,
        pageCharacters,
      );
      await writeFile(join(storyDir, `page-${i}.png`), page);
      console.log(`  page-${i}.png saved`);
    }

    console.log(`Done: ${story.title}`);
  }

  console.log('\nAll demo images generated!');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
