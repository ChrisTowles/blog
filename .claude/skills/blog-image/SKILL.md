---
name: blog-image
description: Generate hero images for blog posts — analyzes content, crafts prompt, calls Gemini API, saves image, updates frontmatter. Replaces blog-image-prompt and blog-image-creator.
---

Generate a hero image for a blog post end-to-end: analyze content, craft a prompt, generate via Gemini, save image, update frontmatter.

## Input

**Blog post**: $ARGUMENTS (path to markdown file — if omitted, detect uncommitted posts via `git status`)

## Workflow

### 1. Analyze Content

Read the blog post to identify:

- Core concept/theme
- Key technical elements or metaphors
- Emotional tone
- Target audience context

### 2. Craft Prompt

Create a 3-4 sentence prompt:

- Opens with the primary subject/scene
- Includes specific visual details and composition
- Specifies lighting, mood, and atmosphere
- Incorporates brand style elements
- Avoids text/typography (AI mangles text rendering)

#### Prompt Structure

```
[Main subject/scene], [specific details], [environment/setting].
[Lighting description], [mood/atmosphere], [technical quality specs].
[Style modifiers], [color palette], [composition notes].
```

### 3. Generate Image

Run the Gemini script:

```bash
pnpm tsx scripts/generate-blog-image.ts "<prompt>" "packages/blog/public/images/blog/YYYYMMDD-slug.png"
```

The filename should match the post's date and slug (e.g., `20260327-hardest-part-of-ai.png`).

### 4. Update Frontmatter

Update the post's frontmatter (always set both, even if the image path hasn't changed):

- `image.src`: `/images/blog/YYYYMMDD-slug.png`
- `image.alt`: A descriptive alt text based on the generated image — must be updated to match the new image

### 5. Error Handling

If Gemini API fails:

1. Retry once
2. If retry fails, save the prompt to `._tmp/images/{YYYY}-{MM}-{DD}-{HH}{MM}-{blog-title}.md` with this format:

```markdown
# Image Prompt: {Blog Post Title}

**Blog Post**: {path}
**Date**: {YYYY-MM-DD HH:MM}

## Generated Prompt

{prompt}

## Metadata

- **Recommended filename**: `YYYYMMDD-slug.png`
- **Aspect ratio**: 16:9 (landscape)
- **Suggested generators**:
  - [Google AI Studio](https://aistudio.google.com/prompts/new_chat?model=models%2Fgemini-3-pro-image-preview&prompt={PROMPT_ENCODED_FOR_URL}) - use 16:9 aspect ratio

## Post-Generation Notes

{variations to try, color adjustments, alternative concepts}
```

Report failure with the saved prompt path.

## Brand Guidelines

**Visual Style**:

- Cinematic realism with dramatic lighting
- Warm/cool color contrast for depth
- Professional photography quality (8k, photorealistic)
- Optional: Fantasy, sci-fi, or comic book elements when appropriate

**Mood**: Contemplative, thought-provoking, professional yet approachable

**Composition**:

- 16:9 aspect ratio (landscape)
- Rule of thirds or centered dramatic composition
- Depth of field for focus
- Negative space for text overlay if needed

## Tips

- Use specific nouns over generic terms ("MacBook Pro" vs "laptop")
- Include camera perspective (overhead, side angle, close-up, etc.)
- Specify material qualities (metallic, glass, matte, glossy)
- Add environmental context for depth
- Use photography terminology (bokeh, depth of field, golden hour, etc.)

## Examples

**Performance optimization post**:

> A sleek, futuristic engine room with glowing holographic performance graphs floating in mid-air, a software engineer studying the data with focused intensity. Dramatic side lighting creates contrast between cool blue holographic displays and warm ambient light, shallow depth of field. Cinematic realism, professional photography, 8k quality, high contrast color grading with teal and orange tones.

**Architecture decisions post**:

> An architect's desk from above showing scattered blueprints transforming into floating 3D holographic building structures, hands gesturing between physical and digital elements. Golden hour lighting through windows, contemplative atmosphere, photorealistic with subtle sci-fi elements. 16:9 composition, rule of thirds, high detail, cinematic color grading.
