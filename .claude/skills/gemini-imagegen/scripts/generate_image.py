#!/usr/bin/env python3
"""
Generate an image from a text prompt using Google's Gemini API.

Usage:
    python generate_image.py "Your prompt here" output.png
"""

import os
import sys
from google import genai
from google.genai import types


def generate_image(prompt: str, output_path: str, model: str = "gemini-2.5-flash-image"):
    """Generate an image from a text prompt."""

    # Check for API key
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        print("Error: GEMINI_API_KEY environment variable not set")
        print("Get your API key from: https://aistudio.google.com/apikey")
        sys.exit(1)

    # Initialize client
    client = genai.Client(api_key=api_key)

    print(f"Generating image with prompt: {prompt}")
    print(f"Using model: {model}")

    # Generate content
    response = client.models.generate_content(
        model=model,
        contents=[prompt],
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
            image = part.as_image()
            image.save(output_path)
            print(f"Image saved to: {output_path}")
            image_saved = True

    if not image_saved:
        print("Warning: No image was generated")
        sys.exit(1)


if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python generate_image.py \"Your prompt here\" output.png")
        print("\nOptional: Add model name as 3rd argument")
        print("  python generate_image.py \"prompt\" output.png gemini-3-pro-image-preview")
        sys.exit(1)

    prompt = sys.argv[1]
    output_path = sys.argv[2]
    model = sys.argv[3] if len(sys.argv) > 3 else "gemini-2.5-flash-image"

    generate_image(prompt, output_path, model)
