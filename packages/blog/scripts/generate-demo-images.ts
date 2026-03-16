import { GoogleGenAI, Modality } from '@google/genai';
import { writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';

const STYLE_PREFIX =
  'Child-friendly colorful illustration, flat digital art style, no text in image, ages 7-11, bright warm colors, simple shapes.';

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

async function generateImage(ai: GoogleGenAI, prompt: string): Promise<Buffer> {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: `${STYLE_PREFIX} ${prompt}`,
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

    // Cover image
    const cover = await generateImage(
      ai,
      `Book cover for a children's story called "${story.title}" about ${story.theme}.`,
    );
    await writeFile(join(storyDir, 'cover.png'), cover);
    console.log(`  cover.png saved`);

    // Page images
    for (let i = 0; i < story.pages.length; i++) {
      const page = await generateImage(
        ai,
        `Scene from a children's story about ${story.theme}: ${story.pages[i]}`,
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
