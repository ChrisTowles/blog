/**
 * Pre-generate SVG card images for every deck theme into
 * `public/poker/decks/{deckId}/`. Run via `pnpm gen:cards`.
 *
 * Output per deck:
 *   public/poker/decks/{deckId}/back.svg
 *   public/poker/decks/{deckId}/{suitLetter}{rankLetter}.svg   (52 files)
 *
 * Card runtime loads these via PIXI.Assets — no per-frame drawing,
 * no font-glyph dependency.
 */
import { defineCommand, runMain } from 'citty';
import { consola } from 'consola';
import sharp from 'sharp';
import { mkdir, writeFile, readdir, readFile } from 'fs/promises';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';

import { DECKS } from '../shared/poker/decks';
import { cardCode } from '../shared/poker/decks/types';
import { RANKS, SUITS } from '../app/utils/poker/types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const OUT_ROOT = resolve(__dirname, '..', 'public', 'poker', 'decks');

const cmd = defineCommand({
  meta: {
    name: 'gen-card-decks',
    description: 'Generate SVG playing-card images for every deck theme',
  },
  async run() {
    consola.start(`Generating ${DECKS.length} deck(s) → ${OUT_ROOT}`);

    // Per-deck portraits directory: contains AI-generated face card images.
    // We resize each PNG → small JPEG and embed as a base64 data URI so the
    // SVG card stays self-contained and can be loaded via <img src="...svg">
    // (external <image href> URLs are blocked when SVGs load via <img>).
    async function loadPortraits(deckId: string): Promise<Map<string, string>> {
      const dir = join(OUT_ROOT, deckId, 'portraits');
      const map = new Map<string, string>();
      let files: string[] = [];
      try {
        files = await readdir(dir);
      } catch {
        return map;
      }
      for (const f of files) {
        if (!f.endsWith('.png')) continue;
        const code = f.replace(/\.png$/, '');
        const raw = await readFile(join(dir, f));
        const jpeg = await sharp(raw)
          .resize(384, 512, { fit: 'cover' })
          .jpeg({ quality: 82, mozjpeg: true })
          .toBuffer();
        map.set(code, `data:image/jpeg;base64,${jpeg.toString('base64')}`);
      }
      return map;
    }

    const counts: Array<{ deck: string; faces: number; portraits: number }> = [];
    for (const deck of DECKS) {
      const deckDir = join(OUT_ROOT, deck.id);
      await mkdir(deckDir, { recursive: true });
      const portraitData = await loadPortraits(deck.id);
      let faces = 0;
      for (const suit of SUITS) {
        for (const rank of RANKS) {
          const card = { rank, suit };
          const svg = deck.generateFace(card, { portraits: portraitData });
          const file = join(deckDir, `${cardCode(card)}.svg`);
          await writeFile(file, svg, 'utf8');
          faces++;
        }
      }
      const back = deck.generateBack();
      await writeFile(join(deckDir, 'back.svg'), back, 'utf8');
      counts.push({ deck: deck.name, faces, portraits: portraitData.size });
      consola.success(`${deck.name} — ${faces} faces + 1 back · ${portraitData.size} portrait(s)`);
    }

    consola.box({
      title: 'Deck generation complete',
      message: counts
        .map((c) => `${c.deck.padEnd(12)}  ${c.faces} faces + 1 back  ·  ${c.portraits} portraits`)
        .join('\n'),
    });
  },
});

runMain(cmd);
