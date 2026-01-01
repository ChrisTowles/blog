#!/bin/bash
# Play notification sound when Claude stops
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ffplay -nodisp -autoexit -loglevel quiet "$SCRIPT_DIR/confirmation_004.ogg"
