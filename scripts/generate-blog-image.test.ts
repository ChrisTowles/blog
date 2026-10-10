import { describe, it, expect, vi, beforeEach } from 'vitest';
import { generateBlogImage } from './generate-blog-image';

const fakeModels = {
  generateContent: vi.fn().mockResolvedValue({
    candidates: [
      {
        content: {
          parts: [{ inlineData: { mimeType: 'image/png', data: 'iVBORw0KGgo=' } }],
        },
      },
    ],
  }),
};

describe('generateBlogImage', () => {
  beforeEach(() => {
    vi.stubEnv('GOOGLE_AI_API_KEY', 'test-key');
  });

  it('returns success with output path', async () => {
    const result = await generateBlogImage({
      prompt: 'A test image',
      outputPath: '/tmp/test-blog-image.png',
      models: fakeModels,
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
        models: fakeModels,
      }),
    ).rejects.toThrow('GOOGLE_AI_API_KEY');
  });
});
