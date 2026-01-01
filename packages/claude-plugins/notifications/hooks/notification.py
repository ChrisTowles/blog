#!/usr/bin/env python3
"""
Cross-platform notification sound player for Claude Code hooks.
Plays confirmation_004.ogg using system audio players (ffplay or afplay).

Audio file: confirmation_004.ogg from https://kenney.nl/assets/interface-sounds
License: Creative Commons CC0
"""

import shutil
import subprocess
import sys
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent
SOUND_FILE = SCRIPT_DIR / "confirmation_004.ogg"

def find_audio_player():
    """Find an available audio player command."""
    if shutil.which("afplay"):
        return "afplay"
    if shutil.which("ffplay"):
        return "ffplay"
    return None

def play_sound():
    """Play notification sound using system audio player."""
    if not SOUND_FILE.exists():
        print(f"Error: Sound file not found: {SOUND_FILE}", file=sys.stderr)
        sys.exit(1)

    player = find_audio_player()
    if not player:
        print("Error: No audio player found. Install ffmpeg (for ffplay) or use macOS (afplay).", file=sys.stderr)
        sys.exit(1)

    try:
        if player == "afplay":
            subprocess.run([player, str(SOUND_FILE)], check=True, capture_output=True)
        elif player == "ffplay":
            subprocess.run(
                [player, "-nodisp", "-autoexit", "-loglevel", "quiet", str(SOUND_FILE)],
                check=True,
                capture_output=True
            )
    except subprocess.CalledProcessError as e:
        print(f"Error playing sound with {player}: {e}", file=sys.stderr)
        sys.exit(1)
    except Exception as e:
        print(f"Unexpected error: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    play_sound()
