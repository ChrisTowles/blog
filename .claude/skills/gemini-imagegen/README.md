# Gemini Image Generation Skill

A Claude Code skill for generating and editing images using Google's Gemini API.

## Setup

1. **Get a Gemini API Key:**
   - Visit https://aistudio.google.com/apikey
   - Create or use an existing API key

2. **Set Environment Variable:**
   ```bash
   export GEMINI_API_KEY="your-api-key-here"
   ```

   Or add to your shell profile (~/.bashrc, ~/.zshrc, etc.):
   ```bash
   echo 'export GEMINI_API_KEY="your-api-key-here"' >> ~/.bashrc
   source ~/.bashrc
   ```

3. **Install Dependencies:**
   ```bash
   pip install google-genai pillow
   ```

## Using the Skill

This skill will be automatically available in Claude Code. Simply ask Claude to:
- "Generate an image of a sunset over mountains"
- "Create a logo for my company"
- "Edit this image to add a rainbow"
- "Help me create product mockups"

## Manual Script Usage

You can also run the scripts directly:

### Generate Image from Text
```bash
python scripts/generate_image.py "A cat wearing a wizard hat" output.png
```

### Edit Existing Image
```bash
python scripts/edit_image.py input.png "Add a rainbow in the background" output.png
```

### Interactive Multi-Turn Chat
```bash
python scripts/multi_turn_chat.py
```

## Models

- **gemini-2.5-flash-image** (Default): Fast generation, 1024px resolution
- **gemini-3-pro-image-preview**: Higher quality, up to 4K resolution, better text rendering

To use the Pro model, specify it as the last argument:
```bash
python scripts/generate_image.py "prompt" output.png gemini-3-pro-image-preview
```

## Tips

- Be specific in your prompts for better results
- For photorealistic images, include camera and lighting details
- For logos and text, use the Pro model
- All generated images include SynthID watermarks

## Resources

- [Gemini API Documentation](https://ai.google.dev/gemini-api/docs)
- [Image Generation Guide](https://ai.google.dev/gemini-api/docs/image-generation)
