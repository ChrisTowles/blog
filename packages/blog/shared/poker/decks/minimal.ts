import type { Card } from '../../../app/utils/poker/types';
import type { DeckTheme } from './types';
import { SUIT_PATHS, escapeSvgText, rankToLabel, suitColor } from './svg-helpers';

const W = 250;
const H = 350;
const PALETTE = { red: '#ef4444', black: '#0f172a' };
const SURFACE = '#ffffff';
const BORDER = '#cbd5e1';
const RADIUS = 22;

function defs(): string {
  return `<defs>
    <symbol id="suit-h" viewBox="0 0 100 100"><path d="${SUIT_PATHS.h}" fill="${PALETTE.red}"/></symbol>
    <symbol id="suit-d" viewBox="0 0 100 100"><path d="${SUIT_PATHS.d}" fill="${PALETTE.red}"/></symbol>
    <symbol id="suit-s" viewBox="0 0 100 100"><path d="${SUIT_PATHS.s}" fill="${PALETTE.black}"/></symbol>
    <symbol id="suit-c" viewBox="0 0 100 100"><path d="${SUIT_PATHS.c}" fill="${PALETTE.black}"/></symbol>
  </defs>`;
}

function generateFace(card: Card): string {
  const color = suitColor(card.suit, PALETTE);
  const rank = escapeSvgText(rankToLabel(card.rank));
  const suitId = `suit-${card.suit}`;
  // Big rank top-left, big suit bottom-right. Clean and modern.
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}">${defs()}
    <rect x="0" y="0" width="${W}" height="${H}" rx="${RADIUS}" ry="${RADIUS}" fill="${SURFACE}" stroke="${BORDER}" stroke-width="1.5"/>
    <text x="30" y="100" font-family="'Inter', system-ui, sans-serif" font-size="84" font-weight="800" fill="${color}" letter-spacing="-3">${rank}</text>
    <use href="#${suitId}" x="${W - 130}" y="${H - 140}" width="100" height="100"/>
  </svg>`;
}

function generateBack(): string {
  // Subtle two-tone gradient with a centered word-mark.
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}">
    <defs>
      <linearGradient id="m-bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#1f2937"/>
        <stop offset="100%" stop-color="#0f172a"/>
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="${W}" height="${H}" rx="${RADIUS}" ry="${RADIUS}" fill="url(#m-bg)"/>
    <rect x="14" y="14" width="${W - 28}" height="${H - 28}" rx="${RADIUS - 6}" ry="${RADIUS - 6}" fill="none" stroke="#475569" stroke-width="1"/>
    <text x="${W / 2}" y="${H / 2 + 12}" text-anchor="middle" font-family="'Inter', system-ui, sans-serif" font-size="28" font-weight="700" fill="#94a3b8" letter-spacing="6">DECK</text>
    <text x="${W / 2}" y="${H / 2 + 44}" text-anchor="middle" font-family="'Inter', system-ui, sans-serif" font-size="11" font-weight="500" fill="#475569" letter-spacing="3">— MINIMAL —</text>
  </svg>`;
}

export const minimalDeck: DeckTheme = {
  id: 'minimal',
  name: 'Minimal',
  tagline: 'Clean. Modern. Quiet.',
  icon: 'i-lucide-square',
  width: W,
  height: H,
  generateFace,
  generateBack,
};
