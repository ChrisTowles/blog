---
title: image-prompt
---

Generate a concise 2-3 sentence prompt for AI image generation based on the blog post.

## Topic

Blog post path or topic : $ARGUMENTS


## Brand Essentials

**Style**: Cinematic realism with warm/cool contrast, Fantasy or comic book features, professional photography quality
**Mood**: Contemplative

## Output

- Save to `.temp/images/{YYYY}-{MM}-{DD}-{HH}{MM}-{blog-title}.md`
- include section for prompt
- include recommanded file name `{YYYY}{MM}{DD}-{HH}{MM}-{blog-title}.webp`
- incude the blog post title
- link to run at either: 
  - https://huggingface.co/spaces/black-forest-labs/FLUX.1-dev
  - https://aistudio.google.com/prompts/new_image using the 16:9 aspect ratio
