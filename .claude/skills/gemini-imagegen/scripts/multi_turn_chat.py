#!/usr/bin/env python3
"""
Interactive multi-turn chat for iterative image refinement with Google's Gemini API.

Usage:
    python multi_turn_chat.py
"""

import os
import sys
from google import genai
from google.genai import types
from datetime import datetime


def multi_turn_chat(model: str = "gemini-2.5-flash-image"):
    """Start an interactive chat session for iterative image generation."""

    # Check for API key
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        print("Error: GEMINI_API_KEY environment variable not set")
        print("Get your API key from: https://aistudio.google.com/apikey")
        sys.exit(1)

    # Initialize client
    client = genai.Client(api_key=api_key)

    # Create chat session
    chat = client.chats.create(
        model=model,
        config=types.GenerateContentConfig(
            response_modalities=['TEXT', 'IMAGE']
        )
    )

    print(f"=== Gemini Image Generation Chat ===")
    print(f"Model: {model}")
    print("Type your prompts to generate or refine images")
    print("Type 'quit' or 'exit' to end the session")
    print("=" * 40)
    print()

    turn_number = 0

    while True:
        # Get user input
        try:
            prompt = input("You: ").strip()
        except (EOFError, KeyboardInterrupt):
            print("\nExiting...")
            break

        if not prompt:
            continue

        if prompt.lower() in ['quit', 'exit', 'q']:
            print("Goodbye!")
            break

        turn_number += 1

        try:
            # Send message
            response = chat.send_message(prompt)

            # Process response
            for part in response.parts:
                if part.text:
                    print(f"Gemini: {part.text}")
                elif part.inline_data:
                    # Generate timestamped filename
                    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
                    filename = f"gemini_image_{timestamp}_turn{turn_number}.png"

                    image = part.as_image()
                    image.save(filename)
                    print(f"[Image saved: {filename}]")

            print()

        except Exception as e:
            print(f"Error: {e}")
            print()


if __name__ == "__main__":
    model = "gemini-2.5-flash-image"

    if len(sys.argv) > 1:
        model = sys.argv[1]

    print(f"Starting chat with {model}...")
    print()

    multi_turn_chat(model)
