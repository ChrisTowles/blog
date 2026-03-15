import { GoogleGenAI, Modality } from '@google/genai';
import { writeFile, mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';

export interface GenerateImageOptions {
  prompt: string;
  outputPath: string;
  model?: string;
  aspectRatio?: string;
}

export interface GenerateImageResult {
  success: boolean;
  path: string;
}

export async function generateBlogImage(
  options: GenerateImageOptions,
): Promise<GenerateImageResult> {
  const apiKey = process.env.GOOGLE_AI_API_KEY;
  if (!apiKey) {
    throw new Error('GOOGLE_AI_API_KEY environment variable is required');
  }

  const ai = new GoogleGenAI({ apiKey });
  const model = options.model ?? 'gemini-2.5-flash-image';

  const response = await ai.models.generateContent({
    model,
    contents: options.prompt,
    config: {
      responseModalities: [Modality.TEXT, Modality.IMAGE],
      imageConfig: {
        aspectRatio: options.aspectRatio ?? '16:9',
      },
    },
  });

  const parts = response.candidates?.[0]?.content?.parts ?? [];
  const imagePart = parts.find((p: any) => p.inlineData?.mimeType?.startsWith('image/'));

  if (!imagePart?.inlineData?.data) {
    throw new Error('No image returned from Gemini API');
  }

  const buffer = Buffer.from(imagePart.inlineData.data, 'base64');
  await mkdir(dirname(options.outputPath), { recursive: true });
  await writeFile(options.outputPath, buffer);

  return { success: true, path: options.outputPath };
}

// CLI entrypoint
if (import.meta.url === `file://${process.argv[1]}`) {
  const [prompt, outputPath] = process.argv.slice(2);
  if (!prompt || !outputPath) {
    console.error('Usage: tsx scripts/generate-blog-image.ts "<prompt>" <output-path>');
    process.exit(1);
  }
  generateBlogImage({ prompt, outputPath })
    .then((r) => console.log(`Image saved to ${r.path}`))
    .catch((e) => {
      console.error(e.message);
      process.exit(1);
    });
}
