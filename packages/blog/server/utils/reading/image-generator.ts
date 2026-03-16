import { GoogleGenAI, Modality } from '@google/genai';
import { writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';

interface StoryIllustrations {
  cover: Buffer;
  pages: Buffer[];
}

const STYLE_PREFIX =
  'Child-friendly colorful illustration, flat digital art style, no text in image, ages 7-11, bright warm colors, simple shapes.';

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GOOGLE_AI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
}

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

export async function generateStoryIllustrations(
  title: string,
  theme: string,
  pageTexts: string[],
): Promise<StoryIllustrations> {
  const ai = getGeminiClient();
  if (!ai) {
    throw new Error('GOOGLE_AI_API_KEY not configured');
  }

  const cover = await generateImage(
    ai,
    `Book cover for a children's story called "${title}" about ${theme}.`,
  );

  const pages: Buffer[] = [];
  for (const text of pageTexts) {
    const page = await generateImage(ai, `Scene from a children's story about ${theme}: ${text}`);
    pages.push(page);
  }

  return { cover, pages };
}

export async function saveStoryImages(
  storyId: number,
  images: StoryIllustrations,
): Promise<string[]> {
  const baseDir = join(process.cwd(), 'public/images/reading/stories', String(storyId));
  await mkdir(baseDir, { recursive: true });

  const urls: string[] = [];

  const coverPath = join(baseDir, 'cover.png');
  await writeFile(coverPath, images.cover);
  urls.push(`/images/reading/stories/${storyId}/cover.png`);

  for (let i = 0; i < images.pages.length; i++) {
    const pagePath = join(baseDir, `page-${i}.png`);
    await writeFile(pagePath, images.pages[i]!);
    urls.push(`/images/reading/stories/${storyId}/page-${i}.png`);
  }

  return urls;
}
