import type { Card } from '../../../app/utils/poker/types';
import type { DeckTheme } from './types';
import { PIP_LAYOUTS, SUIT_PATHS, escapeSvgText, pipUseElements, rankToLabel } from './svg-helpers';

const W = 250;
const H = 350;
const RADIUS = 18;
const HOT_RED = '#ff3868';
const HOT_BLUE = '#22d3ee';
const SURFACE = '#0b1228';
const BORDER = '#1e293b';

function defs(): string {
  // Neon decks use cyan for clubs/spades and pink for hearts/diamonds.
  // A drop-shadow filter gives the glow effect.
  return `<defs>
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="2.5" result="b"/>
      <feMerge>
        <feMergeNode in="b"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <symbol id="suit-h" viewBox="0 0 100 100"><path d="${SUIT_PATHS.h}" fill="${HOT_RED}" filter="url(#glow)"/></symbol>
    <symbol id="suit-d" viewBox="0 0 100 100"><path d="${SUIT_PATHS.d}" fill="${HOT_RED}" filter="url(#glow)"/></symbol>
    <symbol id="suit-s" viewBox="0 0 100 100"><path d="${SUIT_PATHS.s}" fill="${HOT_BLUE}" filter="url(#glow)"/></symbol>
    <symbol id="suit-c" viewBox="0 0 100 100"><path d="${SUIT_PATHS.c}" fill="${HOT_BLUE}" filter="url(#glow)"/></symbol>
    <linearGradient id="card-bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0b1228"/>
      <stop offset="100%" stop-color="#06090f"/>
    </linearGradient>
  </defs>`;
}

function suitNeonColor(card: Card): string {
  return card.suit === 'h' || card.suit === 'd' ? HOT_RED : HOT_BLUE;
}

function cardSurface(): string {
  return `<rect x="0" y="0" width="${W}" height="${H}" rx="${RADIUS}" ry="${RADIUS}" fill="url(#card-bg)" stroke="${BORDER}" stroke-width="2"/>
    <rect x="6" y="6" width="${W - 12}" height="${H - 12}" rx="${RADIUS - 4}" ry="${RADIUS - 4}" fill="none" stroke="#1e293b" stroke-width="1"/>`;
}

function cornerIndex(card: Card): string {
  const color = suitNeonColor(card);
  const rank = escapeSvgText(rankToLabel(card.rank));
  const suitId = `suit-${card.suit}`;
  const tl = `<g transform="translate(20 14)" filter="url(#glow)">
    <text x="14" y="32" text-anchor="middle" font-family="'JetBrains Mono', 'Fira Code', monospace" font-size="32" font-weight="700" fill="${color}">${rank}</text>
    <use href="#${suitId}" x="2" y="38" width="24" height="24"/>
  </g>`;
  const br = `<g transform="translate(${W - 20} ${H - 14}) rotate(180)" filter="url(#glow)">
    <text x="14" y="32" text-anchor="middle" font-family="'JetBrains Mono', 'Fira Code', monospace" font-size="32" font-weight="700" fill="${color}">${rank}</text>
    <use href="#${suitId}" x="2" y="38" width="24" height="24"/>
  </g>`;
  return tl + br;
}

function aceFace(card: Card): string {
  const suitId = `suit-${card.suit}`;
  const size = 140;
  const x = (W - size) / 2;
  const y = (H - size) / 2;
  return `<use href="#${suitId}" x="${x}" y="${y}" width="${size}" height="${size}"/>`;
}

function numberFace(card: Card): string {
  const suitId = `suit-${card.suit}`;
  const padX = 45;
  const padY = 50;
  const frame = { x: padX, y: padY, w: W - padX * 2, h: H - padY * 2 };
  return pipUseElements(card, frame, 0.42, suitId);
}

function faceCardFace(card: Card): string {
  const color = suitNeonColor(card);
  const rank = escapeSvgText(rankToLabel(card.rank));
  const suitId = `suit-${card.suit}`;
  const fx = 38;
  const fy = 50;
  const fw = W - fx * 2;
  const fh = H - fy * 2;
  return `<g>
    <rect x="${fx}" y="${fy}" width="${fw}" height="${fh}" rx="10" ry="10" fill="none" stroke="${color}" stroke-width="2" filter="url(#glow)"/>
    <rect x="${fx + 8}" y="${fy + 8}" width="${fw - 16}" height="${fh - 16}" rx="6" ry="6" fill="none" stroke="${color}" stroke-width="0.8" stroke-opacity="0.45"/>
    <text x="${W / 2}" y="${H / 2 + 30}" text-anchor="middle" font-family="'JetBrains Mono', 'Fira Code', monospace" font-size="150" font-weight="800" fill="${color}" filter="url(#glow)">${rank}</text>
    <use href="#${suitId}" x="${fx + 18}" y="${fy + 18}" width="34" height="34"/>
    <g transform="translate(${W - fx - 18} ${H - fy - 18}) rotate(180)">
      <use href="#${suitId}" x="0" y="0" width="34" height="34"/>
    </g>
  </g>`;
}

function generateFace(card: Card): string {
  let body = '';
  if (card.rank === 14) body = aceFace(card);
  else if (card.rank >= 11) body = faceCardFace(card);
  else if (PIP_LAYOUTS[card.rank as keyof typeof PIP_LAYOUTS]) body = numberFace(card);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}">${defs()}${cardSurface()}${body}${cornerIndex(card)}</svg>`;
}

function generateBack(): string {
  // Concentric neon rings on a dark gradient.
  const cx = W / 2;
  const cy = H / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}">
    <defs>
      <radialGradient id="back-bg" cx="50%" cy="50%" r="60%">
        <stop offset="0%" stop-color="#1e293b"/>
        <stop offset="100%" stop-color="#020617"/>
      </radialGradient>
      <filter id="back-glow">
        <feGaussianBlur stdDeviation="2"/>
      </filter>
    </defs>
    <rect x="0" y="0" width="${W}" height="${H}" rx="${RADIUS}" ry="${RADIUS}" fill="url(#back-bg)"/>
    <rect x="6" y="6" width="${W - 12}" height="${H - 12}" rx="${RADIUS - 4}" ry="${RADIUS - 4}" fill="none" stroke="${HOT_BLUE}" stroke-width="2" filter="url(#back-glow)"/>
    <circle cx="${cx}" cy="${cy}" r="80" fill="none" stroke="${HOT_BLUE}" stroke-width="1.5"/>
    <circle cx="${cx}" cy="${cy}" r="60" fill="none" stroke="${HOT_RED}" stroke-width="1.2" stroke-opacity="0.85"/>
    <circle cx="${cx}" cy="${cy}" r="40" fill="none" stroke="${HOT_BLUE}" stroke-width="1"/>
    <circle cx="${cx}" cy="${cy}" r="22" fill="${SURFACE}" stroke="${HOT_RED}" stroke-width="1.5"/>
    <text x="${cx}" y="${cy + 8}" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="22" font-weight="800" fill="${HOT_BLUE}" filter="url(#back-glow)">★</text>
  </svg>`;
}

export const neonDeck: DeckTheme = {
  id: 'neon',
  name: 'Neon',
  tagline: 'Cyberpunk arcade glow.',
  icon: 'i-lucide-zap',
  width: W,
  height: H,
  generateFace,
  generateBack,
};
