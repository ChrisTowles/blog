import type { Card } from '../../../app/utils/poker/types';
import type { DeckTheme } from './types';
import { cardCode } from './types';
import {
  PIP_LAYOUTS,
  SUIT_PATHS,
  escapeSvgText,
  pipUseElements,
  rankToLabel,
  suitColor,
} from './svg-helpers';

const W = 250;
const H = 350;
const PALETTE = { red: '#c0392b', black: '#1f2937' };
const SURFACE = '#fafafa';
const BORDER = '#1f2937';
const RADIUS = 18;

function defs(): string {
  return `<defs>
    <symbol id="suit-h" viewBox="0 0 100 100"><path d="${SUIT_PATHS.h}" fill="${PALETTE.red}"/></symbol>
    <symbol id="suit-d" viewBox="0 0 100 100"><path d="${SUIT_PATHS.d}" fill="${PALETTE.red}"/></symbol>
    <symbol id="suit-s" viewBox="0 0 100 100"><path d="${SUIT_PATHS.s}" fill="${PALETTE.black}"/></symbol>
    <symbol id="suit-c" viewBox="0 0 100 100"><path d="${SUIT_PATHS.c}" fill="${PALETTE.black}"/></symbol>
  </defs>`;
}

function cardSurface(): string {
  return `<rect x="0" y="0" width="${W}" height="${H}" rx="${RADIUS}" ry="${RADIUS}" fill="${SURFACE}" stroke="${BORDER}" stroke-width="2"/>`;
}

function cornerIndex(card: Card): string {
  const color = suitColor(card.suit, PALETTE);
  const rank = escapeSvgText(rankToLabel(card.rank));
  const suitId = `suit-${card.suit}`;
  // Compact corner index — frees up vertical space for a larger pip area.
  // "10" is two characters, so we compress it slightly via letter-spacing
  // to keep the corner footprint identical to single-character ranks.
  const isTen = card.rank === 10;
  const rankFontSize = isTen ? 20 : 24;
  const rankExtra = isTen ? ' letter-spacing="-1.5"' : '';
  const tl = `<g transform="translate(12 10)">
    <text x="9" y="22" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="${rankFontSize}" font-weight="700" fill="${color}"${rankExtra}>${rank}</text>
    <use href="#${suitId}" x="0" y="26" width="18" height="18"/>
  </g>`;
  const br = `<g transform="translate(${W - 12} ${H - 10}) rotate(180)">
    <text x="9" y="22" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="${rankFontSize}" font-weight="700" fill="${color}"${rankExtra}>${rank}</text>
    <use href="#${suitId}" x="0" y="26" width="18" height="18"/>
  </g>`;
  return tl + br;
}

function aceFace(card: Card): string {
  const suitId = `suit-${card.suit}`;
  const size = 130;
  const x = (W - size) / 2;
  const y = (H - size) / 2;
  return `<use href="#${suitId}" x="${x}" y="${y}" width="${size}" height="${size}"/>`;
}

function numberFace(card: Card): string {
  const suitId = `suit-${card.suit}`;
  // Pip column positions match a real reference deck: ~26% / 50% / 74%
  // horizontally; rows span ~18% to ~82% vertically.
  // Math:
  //   padX = 65 → frame.w = 120 → cols at 65/125/185 (26%/50%/74%)
  //   padY = 63 → frame.h = 224 → rows 0..6 span y=63..287 (18%..82%)
  //   row spacing for 10 = 224/6 ≈ 37px; pip = 32 → 5px gap (chunky reference-like).
  const padX = 65;
  const padY = 63;
  const frame = { x: padX, y: padY, w: W - padX * 2, h: H - padY * 2 };
  const pipScale = 0.32;
  return pipUseElements(card, frame, pipScale, suitId);
}

/**
 * Royal head silhouette for face cards. cx/cy is the center of the figure;
 * the figure is roughly `size` tall. Returns an inline <g> SVG fragment.
 */
function royalSilhouette(
  rank: 11 | 12 | 13,
  cx: number,
  cy: number,
  size: number,
  color: string,
  accent: string,
): string {
  // Geometry helpers
  const headR = size * 0.18;
  const headY = cy - size * 0.18;
  const neckTop = headY + headR * 0.85;
  const robeTop = neckTop + size * 0.04;
  const robeBottom = cy + size * 0.42;
  const robeWidth = size * 0.74;

  // Robe (trapezoid)
  const robe = `<path d="M ${cx - robeWidth / 2} ${robeBottom}
    L ${cx - robeWidth * 0.32} ${robeTop}
    Q ${cx} ${robeTop - size * 0.03} ${cx + robeWidth * 0.32} ${robeTop}
    L ${cx + robeWidth / 2} ${robeBottom}
    Z" fill="${accent}" stroke="${color}" stroke-width="2"/>`;
  // Collar accent line
  const collar = `<path d="M ${cx - robeWidth * 0.28} ${robeTop + 6}
    Q ${cx} ${robeTop + size * 0.05} ${cx + robeWidth * 0.28} ${robeTop + 6}"
    fill="none" stroke="${color}" stroke-width="1.5"/>`;

  // Head (circle) + neck
  const head = `<circle cx="${cx}" cy="${headY}" r="${headR}" fill="${accent}" stroke="${color}" stroke-width="2"/>`;
  const neck = `<rect x="${cx - headR * 0.45}" y="${headY + headR * 0.7}" width="${headR * 0.9}" height="${size * 0.06}" fill="${accent}" stroke="${color}" stroke-width="1.5"/>`;

  // Headwear varies by rank: K = 5-point crown, Q = 3-point tiara, J = peaked cap with feather
  let headwear = '';
  if (rank === 13) {
    // 5-point crown
    const cw = headR * 2.2;
    const ch = size * 0.16;
    const top = headY - headR - ch * 0.05;
    const base = top + ch * 0.55;
    const x0 = cx - cw / 2;
    headwear = `
      <path d="M ${x0} ${base}
        L ${x0 + cw * 0.05} ${top + ch * 0.1}
        L ${x0 + cw * 0.2} ${base - ch * 0.05}
        L ${x0 + cw * 0.32} ${top}
        L ${x0 + cw * 0.45} ${base - ch * 0.1}
        L ${cx} ${top - ch * 0.15}
        L ${x0 + cw * 0.55} ${base - ch * 0.1}
        L ${x0 + cw * 0.68} ${top}
        L ${x0 + cw * 0.8} ${base - ch * 0.05}
        L ${x0 + cw * 0.95} ${top + ch * 0.1}
        L ${x0 + cw} ${base}
        Z" fill="${color}" stroke="${color}" stroke-width="1.5"/>
      <rect x="${x0}" y="${base}" width="${cw}" height="${ch * 0.35}" fill="${color}"/>
      <circle cx="${cx}" cy="${top - ch * 0.05}" r="${ch * 0.13}" fill="${accent}" stroke="${color}" stroke-width="1.2"/>
      <circle cx="${x0 + cw * 0.32}" cy="${top + ch * 0.06}" r="${ch * 0.09}" fill="${accent}"/>
      <circle cx="${x0 + cw * 0.68}" cy="${top + ch * 0.06}" r="${ch * 0.09}" fill="${accent}"/>`;
  } else if (rank === 12) {
    // 3-point tiara
    const cw = headR * 1.9;
    const ch = size * 0.11;
    const top = headY - headR - ch * 0.05;
    const base = top + ch * 0.7;
    const x0 = cx - cw / 2;
    headwear = `
      <path d="M ${x0} ${base}
        L ${x0 + cw * 0.18} ${top + ch * 0.15}
        L ${x0 + cw * 0.32} ${base - ch * 0.05}
        L ${cx} ${top - ch * 0.05}
        L ${x0 + cw * 0.68} ${base - ch * 0.05}
        L ${x0 + cw * 0.82} ${top + ch * 0.15}
        L ${x0 + cw} ${base}
        Z" fill="${color}" stroke="${color}" stroke-width="1.2"/>
      <circle cx="${cx}" cy="${top + ch * 0.05}" r="${ch * 0.16}" fill="${accent}"/>`;
  } else {
    // Jack: rounded cap with a feather sweep
    const cw = headR * 2.1;
    const ch = size * 0.12;
    const top = headY - headR - ch * 0.1;
    const x0 = cx - cw / 2;
    headwear = `
      <path d="M ${x0} ${top + ch * 0.7}
        Q ${cx} ${top - ch * 0.2} ${x0 + cw} ${top + ch * 0.7}
        L ${x0 + cw} ${top + ch}
        L ${x0} ${top + ch}
        Z" fill="${color}" stroke="${color}" stroke-width="1.2"/>
      <path d="M ${x0 + cw * 0.7} ${top + ch * 0.4}
        Q ${x0 + cw + ch * 0.3} ${top - ch * 0.2} ${x0 + cw + ch * 0.05} ${top + ch * 0.7}"
        fill="none" stroke="${accent}" stroke-width="2.5" stroke-linecap="round"/>`;
  }

  return `<g>
    ${robe}
    ${collar}
    ${neck}
    ${head}
    ${headwear}
  </g>`;
}

function faceCardFace(card: Card, portraitUrl: string | undefined): string {
  const color = suitColor(card.suit, PALETTE);
  const rank = escapeSvgText(rankToLabel(card.rank));
  const suitId = `suit-${card.suit}`;
  const accentBg = card.suit === 'h' || card.suit === 'd' ? '#fde6e6' : '#e5edf5';
  const figureSkin = card.suit === 'h' || card.suit === 'd' ? '#fff5f1' : '#f1f5f9';

  // Decorative outer panel
  const fx = 30;
  const fy = 38;
  const fw = W - fx * 2;
  const fh = H - fy * 2;

  // Inner area available for the figure / portrait
  const halfH = fh / 2;
  const figureSize = halfH * 0.95;
  const topCx = W / 2;
  const topCy = fy + halfH * 0.55;
  const botCx = W / 2;
  const botCy = fy + fh - halfH * 0.55;

  // Outer/inner frame and centerline. Same regardless of portrait.
  const frame = `<rect x="${fx}" y="${fy}" width="${fw}" height="${fh}" rx="10" ry="10" fill="${accentBg}" fill-opacity="0.5" stroke="${color}" stroke-width="2.5"/>
    <rect x="${fx + 8}" y="${fy + 8}" width="${fw - 16}" height="${fh - 16}" rx="7" ry="7" fill="none" stroke="${color}" stroke-width="0.8" stroke-opacity="0.55"/>`;

  const centerline = `<line x1="${fx + 14}" y1="${H / 2}" x2="${W - fx - 14}" y2="${H / 2}" stroke="${color}" stroke-width="1.2" stroke-opacity="0.5"/>
    <text x="${W / 2}" y="${H / 2 + 6}" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="20" font-weight="700" fill="${color}">${rank}</text>
    <use href="#${suitId}" x="${W / 2 - 11}" y="${H / 2 + 10}" width="22" height="22"/>`;

  if (portraitUrl) {
    // Portrait area inset slightly inside the inner frame. Same image is
    // shown twice — upright top half + rotated bottom half — to mimic the
    // classic court-card mirror composition.
    const px = fx + 12;
    const py = fy + 12;
    const pw = fw - 24;
    const ph = fh - 24;
    const half = ph / 2;
    return `<g>
      ${frame}
      <image href="${portraitUrl}" x="${px}" y="${py}" width="${pw}" height="${half - 6}" preserveAspectRatio="xMidYMid slice"/>
      <g transform="translate(${W / 2} ${H / 2}) rotate(180) translate(${-W / 2} ${-H / 2})">
        <image href="${portraitUrl}" x="${px}" y="${py}" width="${pw}" height="${half - 6}" preserveAspectRatio="xMidYMid slice"/>
      </g>
      ${centerline}
    </g>`;
  }

  // Fallback: hand-drawn silhouette art (used when AI portrait isn't generated).
  const topFigure = royalSilhouette(
    card.rank as 11 | 12 | 13,
    topCx,
    topCy,
    figureSize,
    color,
    figureSkin,
  );
  const bottomFigure = `<g transform="translate(${botCx} ${botCy}) rotate(180) translate(${-botCx} ${-botCy})">
    ${royalSilhouette(card.rank as 11 | 12 | 13, botCx, botCy, figureSize, color, figureSkin)}
  </g>`;
  return `<g>
    ${frame}
    ${topFigure}
    ${bottomFigure}
    ${centerline}
  </g>`;
}

function generateFace(card: Card, opts?: { portraits?: Map<string, string> }): string {
  let body = '';
  const portraitUrl = opts?.portraits?.get(cardCode(card));
  if (card.rank === 14) body = aceFace(card);
  else if (card.rank >= 11) body = faceCardFace(card, portraitUrl);
  else if (PIP_LAYOUTS[card.rank as keyof typeof PIP_LAYOUTS]) body = numberFace(card);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}">${defs()}${cardSurface()}${body}${cornerIndex(card)}</svg>`;
}

function generateBack(): string {
  // Diagonal lattice with a center medallion.
  const step = 18;
  const lines: string[] = [];
  for (let i = -H; i < W + H; i += step) {
    lines.push(
      `<line x1="${i}" y1="0" x2="${i + H}" y2="${H}" stroke="#3b82f6" stroke-width="1" stroke-opacity="0.55"/>`,
    );
    lines.push(
      `<line x1="${i}" y1="${H}" x2="${i + H}" y2="0" stroke="#3b82f6" stroke-width="1" stroke-opacity="0.55"/>`,
    );
  }
  const cx = W / 2;
  const cy = H / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}">
    <defs>
      <clipPath id="bg-clip">
        <rect x="10" y="10" width="${W - 20}" height="${H - 20}" rx="${RADIUS - 4}" ry="${RADIUS - 4}"/>
      </clipPath>
    </defs>
    <rect x="0" y="0" width="${W}" height="${H}" rx="${RADIUS}" ry="${RADIUS}" fill="#0e2a5b" stroke="#60a5fa" stroke-width="2.5"/>
    <rect x="10" y="10" width="${W - 20}" height="${H - 20}" rx="${RADIUS - 4}" ry="${RADIUS - 4}" fill="none" stroke="#93c5fd" stroke-width="1.5" stroke-opacity="0.85"/>
    <g clip-path="url(#bg-clip)">${lines.join('')}</g>
    <circle cx="${cx}" cy="${cy}" r="58" fill="#1e3a8a" stroke="#93c5fd" stroke-width="2"/>
    <circle cx="${cx}" cy="${cy}" r="50" fill="none" stroke="#60a5fa" stroke-width="1.2" stroke-opacity="0.7"/>
    <text x="${cx}" y="${cy + 16}" text-anchor="middle" font-family="system-ui, sans-serif" font-size="48" font-weight="700" fill="#dbeafe">✦</text>
  </svg>`;
}

export const classicDeck: DeckTheme = {
  id: 'classic',
  name: 'Classic',
  tagline: 'Traditional French deck.',
  icon: 'i-lucide-spade',
  width: W,
  height: H,
  generateFace,
  generateBack,
};
