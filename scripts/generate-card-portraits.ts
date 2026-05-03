/**
 * Generate AI portrait images for face cards (J/Q/K) of every deck theme.
 *
 * Strategy:
 *   - SVG cards keep the precise frame, corner indices, suit pip layouts.
 *   - For face cards we replace the silhouette with a Gemini-generated
 *     portrait image that the SVG embeds via <image href="..."/>.
 *   - 12 portraits per deck (J/Q/K × 4 suits) — affordable and consistent.
 *
 * Output:
 *   packages/blog/public/poker/decks/{deckId}/portraits/{cardCode}.png
 *
 * Usage:
 *   pnpm tsx scripts/generate-card-portraits.ts                 # generate all
 *   pnpm tsx scripts/generate-card-portraits.ts --deck classic  # one deck
 *   pnpm tsx scripts/generate-card-portraits.ts --cards hK,sQ   # specific cards
 *   pnpm tsx scripts/generate-card-portraits.ts --dry-run       # print prompts only
 */
import 'dotenv/config';
import { GoogleGenAI, Modality } from '@google/genai';
import { defineCommand, runMain } from 'citty';
import { consola } from 'consola';
import { mkdir, writeFile, access } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const REPO_ROOT = resolve(__dirname, '..');
const PORTRAITS_ROOT = resolve(REPO_ROOT, 'packages/blog/public/poker/decks');

type Suit = 'h' | 'd' | 'c' | 's';
type FaceRank = 'J' | 'Q' | 'K';

interface DeckStyle {
  id: string;
  baseStyle: string;
  background: string;
  /** Optional negative-direction notes appended to every prompt. */
  guards?: string;
}

const SUIT_THEME: Record<Suit, { name: string; color: string; mood: string }> = {
  h: {
    name: 'Hearts',
    color: 'warm crimson and rose with gold accents',
    mood: 'kind, romantic, regal warmth',
  },
  d: {
    name: 'Diamonds',
    color: 'rich gold, ochre, and warm amber with ruby highlights',
    mood: 'wealthy, bright, confident',
  },
  s: {
    name: 'Spades',
    color: 'deep midnight black, slate gray, and cold steel with silver accents',
    mood: 'austere, formal, commanding',
  },
  c: {
    name: 'Clubs',
    color: 'forest green and dark emerald with bronze highlights',
    mood: 'earthy, grounded, sturdy',
  },
};

const RANK_PERSONA: Record<FaceRank, { royal: string; attire: string; pose: string }> = {
  K: {
    royal: 'mature king with full beard, weathered noble face',
    attire: 'wearing an ornate jeweled crown with five points and a fur-trimmed velvet robe',
    pose: 'half-figure portrait, three-quarter angle, holding a regal scepter on his shoulder',
  },
  Q: {
    royal: 'elegant queen with composed graceful face, long flowing hair',
    attire: 'wearing a delicate gold tiara with a center gemstone and an embroidered gown',
    pose: 'half-figure portrait, three-quarter angle, holding a single ornate flower',
  },
  J: {
    royal: 'youthful noble squire with a confident expression, clean-shaven',
    attire: 'wearing a velvet cap with a single sweeping feather and a lace-collared doublet',
    pose: 'half-figure portrait, three-quarter angle, holding a small dagger by the hilt',
  },
};

const DECK_STYLES: Record<string, DeckStyle> = {
  classic: {
    id: 'classic',
    baseStyle:
      'Painterly classical playing-card portrait in the style of vintage tarot cards and ' +
      'medieval illuminated manuscripts. Rich saturated colors, hand-painted feel, soft lighting, ' +
      'subtle paper texture. Composition tight to the figure, head and shoulders prominent.',
    background:
      'Plain ivory parchment background with a subtle filigree border vignette in the suit color. ' +
      'No additional scene elements behind the figure.',
    guards:
      'NO text, NO letters, NO numbers, NO playing-card frame, NO suit symbols visible in the image. ' +
      'No watermarks. Vertical portrait composition. The figure must fully fit within the frame.',
  },
};

interface PortraitJob {
  deckId: string;
  cardCode: string;
  suit: Suit;
  rank: FaceRank;
  prompt: string;
  outputPath: string;
}

function buildPrompt(deck: DeckStyle, suit: Suit, rank: FaceRank): string {
  const t = SUIT_THEME[suit];
  const r = RANK_PERSONA[rank];
  return [
    `${deck.baseStyle}`,
    `Subject: a ${r.royal} representing the ${rank} of ${t.name}, ${r.attire}.`,
    `${r.pose}.`,
    `Color palette: ${t.color}; mood: ${t.mood}.`,
    deck.background,
    deck.guards ?? '',
  ]
    .filter(Boolean)
    .join(' ');
}

function buildJobs(deckIds: string[], cards: string[] | null): PortraitJob[] {
  const SUITS: Suit[] = ['h', 'd', 'c', 's'];
  const RANKS: FaceRank[] = ['J', 'Q', 'K'];
  const jobs: PortraitJob[] = [];
  for (const deckId of deckIds) {
    const deck = DECK_STYLES[deckId];
    if (!deck) {
      consola.warn(`No portrait style defined for deck "${deckId}" — skipping.`);
      continue;
    }
    for (const suit of SUITS) {
      for (const rank of RANKS) {
        const cardCode = `${suit}${rank}`;
        if (cards && !cards.includes(cardCode)) continue;
        jobs.push({
          deckId,
          cardCode,
          suit,
          rank,
          prompt: buildPrompt(deck, suit, rank),
          outputPath: join(PORTRAITS_ROOT, deckId, 'portraits', `${cardCode}.png`),
        });
      }
    }
  }
  return jobs;
}

async function fileExists(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function generatePortrait(ai: GoogleGenAI, job: PortraitJob, model: string) {
  const response = await ai.models.generateContent({
    model,
    contents: job.prompt,
    config: {
      responseModalities: [Modality.TEXT, Modality.IMAGE],
      imageConfig: {
        aspectRatio: '3:4',
      },
    },
  });
  const parts = response.candidates?.[0]?.content?.parts ?? [];
  const imagePart = parts.find((p: { inlineData?: { mimeType?: string; data?: string } }) =>
    p.inlineData?.mimeType?.startsWith('image/'),
  );
  if (!imagePart?.inlineData?.data) {
    throw new Error(`No image data returned for ${job.deckId}/${job.cardCode}`);
  }
  const raw = Buffer.from(imagePart.inlineData.data, 'base64');
  await mkdir(dirname(job.outputPath), { recursive: true });
  // Keep the high-res PNG as the canonical archive; SVG embedding is done
  // at deck-generation time which resizes & re-encodes for inline use.
  await writeFile(job.outputPath, raw);
}

const cmd = defineCommand({
  meta: {
    name: 'generate-card-portraits',
    description: 'Generate Gemini portraits for face cards (J/Q/K).',
  },
  args: {
    deck: {
      type: 'string',
      description: 'Comma-separated deck ids (default: all configured)',
      default: '',
    },
    cards: {
      type: 'string',
      description: 'Comma-separated card codes to (re)generate, e.g. "hK,sQ"',
      default: '',
    },
    model: {
      type: 'string',
      default: 'gemini-2.5-flash-image',
      description: 'Gemini model id',
    },
    'dry-run': {
      type: 'boolean',
      default: false,
      description: 'Print prompts but do not call the API',
    },
    force: {
      type: 'boolean',
      default: false,
      description: 'Re-generate even if the file already exists',
    },
  },
  async run({ args }) {
    const allDecks = Object.keys(DECK_STYLES);
    const deckIds = args.deck ? args.deck.split(',').map((s) => s.trim()) : allDecks;
    const cardFilter = args.cards ? args.cards.split(',').map((s) => s.trim()) : null;
    const jobs = buildJobs(deckIds, cardFilter);

    consola.start(`Planning ${jobs.length} portrait(s)`);

    if (args['dry-run']) {
      for (const j of jobs) {
        consola.info(`${j.deckId}/${j.cardCode}\n  → ${j.outputPath}\n  prompt: ${j.prompt}`);
      }
      consola.box('Dry run — no API calls made');
      return;
    }

    if (!process.env.GOOGLE_AI_API_KEY) {
      consola.error('GOOGLE_AI_API_KEY is not set in env. Aborting.');
      process.exit(1);
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_AI_API_KEY });

    let made = 0;
    let skipped = 0;
    let failed = 0;
    for (const job of jobs) {
      const exists = await fileExists(job.outputPath);
      if (exists && !args.force) {
        skipped++;
        consola.info(`skip ${job.deckId}/${job.cardCode} (already exists)`);
        continue;
      }
      try {
        await generatePortrait(ai, job, args.model);
        made++;
        consola.success(`gen  ${job.deckId}/${job.cardCode}`);
      } catch (err) {
        failed++;
        consola.error(
          `fail ${job.deckId}/${job.cardCode}: ${err instanceof Error ? err.message : String(err)}`,
        );
      }
    }

    consola.box({
      title: 'Portrait generation complete',
      message: `made: ${made}\nskipped: ${skipped}\nfailed: ${failed}\nout: ${PORTRAITS_ROOT}`,
    });
  },
});

runMain(cmd);
