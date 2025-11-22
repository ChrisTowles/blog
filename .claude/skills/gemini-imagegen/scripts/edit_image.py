#!/usr/bin/env python3
"""
Edit an existing image using a text prompt with Google's Gemini API.

Usage:
    python edit_image.py input.png "Add a rainbow in the background" output.png
"""

import os
import sys
from google import genai
from google.genai import types
from PIL import Image


def edit_image(input_path: str, prompt: str, output_path: str, model: str = "gemini-2.5-flash-image"):
    """Edit an existing image using a text prompt."""

    # Check for API key
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        print("Error: GEMINI_API_KEY environment variable not set")
        print("Get your API key from: https://aistudio.google.com/apikey")
        sys.exit(1)

    # Load input image
    if not os.path.exists(input_path):
        print(f"Error: Input image not found: {input_path}")
        sys.exit(1)

    img = Image.open(input_path)
    print(f"Loaded image: {input_path}")

    # Initialize client
    client = genai.Client(api_key=api_key)

    print(f"Editing with prompt: {prompt}")
    print(f"Using model: {model}")

    # Generate content with both text and image
    response = client.models.generate_content(
        model=model,
        contents=[prompt, img],
        config=types.GenerateContentConfig(
            response_modalities=['TEXT', 'IMAGE']
        )
    )

    # Process response
    image_saved = False
    for part in response.parts:
        if part.text:
            print(f"Model response: {part.text}")
        elif part.inline_data:
            edited_image = part.as_image()
            edited_image.save(output_path)
            print(f"Edited image saved to: {output_path}")
            image_saved = True

    if not image_saved:
        print("Warning: No image was generated")
        sys.exit(1)


if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("Usage: python edit_image.py input.png \"Edit prompt\" output.png")
        print("\nOptional: Add model name as 4th argument")
        print("  python edit_image.py input.png \"prompt\" output.png gemini-3-pro-image-preview")
        sys.exit(1)

    input_path = sys.argv[1]
    prompt = sys.argv[2]
    output_path = sys.argv[3]
    model = sys.argv[4] if len(sys.argv) > 4 else "gemini-2.5-flash-image"

    edit_image(input_path, prompt, output_path, model)
