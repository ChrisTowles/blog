import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock @google/genai before importing
vi.mock('@google/genai', () => {
  const mockGenerateContent = vi.fn().mockResolvedValue({
    candidates: [
      {
        content: {
          parts: [
            { text: 'Generated image description' },
            { inlineData: { mimeType: 'image/png', data: 'iVBORw0KGgo=' } },
          ],
        },
      },
    ],
  });
  return {
    GoogleGenAI: vi.fn().mockImplementation(function () {
      return { models: { generateContent: mockGenerateContent } };
    }),
    Modality: { TEXT: 'TEXT', IMAGE: 'IMAGE' },
  };
});

import { generateBlogImage } from './generate-blog-image';

describe('generateBlogImage', () => {
  beforeEach(() => {
    vi.stubEnv('GOOGLE_AI_API_KEY', 'test-key');
  });

  it('returns success with output path', async () => {
    const result = await generateBlogImage({
      prompt: 'A test image',
      outputPath: '/tmp/test-blog-image.png',
    });
    expect(result.success).toBe(true);
    expect(result.path).toBe('/tmp/test-blog-image.png');
  });

  it('throws without API key', async () => {
    vi.stubEnv('GOOGLE_AI_API_KEY', '');
    await expect(
      generateBlogImage({
        prompt: 'test',
        outputPath: '/tmp/test.png',
      }),
    ).rejects.toThrow('GOOGLE_AI_API_KEY');
  });
});
