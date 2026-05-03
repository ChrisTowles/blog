/**
 * Programmatic playing-card rendering for the poker felt.
 *
 * Real poker cards arrange suit pips in a standardized grid that scales
 * intuitively with rank. We replicate that here in PixiJS Graphics — no asset
 * pipeline, scales cleanly, theme-able.
 *
 * Layout grid: each card face uses a 3-column × 7-row coordinate system.
 * Pips placed in the bottom half (row >= 3.5) are drawn upside-down so a
 * card looks the same when flipped 180°, matching real cards.
 */
import type { Card, Suit } from '~/utils/poker/types';
import { isRedSuit, rankLabel, SUIT_GLYPH } from '~/utils/poker/types';

export interface CardSize {
  w: number;
  h: number;
}

// Pip positions in (col 0..2, row 0..6) space.
const PIP_LAYOUTS: Record<number, Array<[number, number]>> = {
  2: [
    [1, 0],
    [1, 6],
  ],
  3: [
    [1, 0],
    [1, 3],
    [1, 6],
  ],
  4: [
    [0, 0],
    [2, 0],
    [0, 6],
    [2, 6],
  ],
  5: [
    [0, 0],
    [2, 0],
    [1, 3],
    [0, 6],
    [2, 6],
  ],
  6: [
    [0, 0],
    [2, 0],
    [0, 3],
    [2, 3],
    [0, 6],
    [2, 6],
  ],
  7: [
    [0, 0],
    [2, 0],
    [1, 1.5],
    [0, 3],
    [2, 3],
    [0, 6],
    [2, 6],
  ],
  8: [
    [0, 0],
    [2, 0],
    [1, 1.5],
    [0, 3],
    [2, 3],
    [1, 4.5],
    [0, 6],
    [2, 6],
  ],
  9: [
    [0, 0],
    [2, 0],
    [0, 2],
    [2, 2],
    [1, 3],
    [0, 4],
    [2, 4],
    [0, 6],
    [2, 6],
  ],
  10: [
    [0, 0],
    [2, 0],
    [0, 2],
    [2, 2],
    [1, 1],
    [1, 5],
    [0, 4],
    [2, 4],
    [0, 6],
    [2, 6],
  ],
};

/** Padding (fraction of card width) inside the white face area. */
const PAD_X = 0.18;
const PAD_Y = 0.14;

function suitColor(suit: Suit): number {
  return isRedSuit(suit) ? 0xc0392b : 0x111827;
}

/**
 * Add a single suit pip glyph to `parent`, positioned by its center, optionally
 * flipped. Uses the suit Unicode glyph rendered as PIXI.Text so it picks up the
 * native font's actual shape rather than us reinventing club/spade vector art.
 */
async function drawPip(
  parent: import('pixi.js').Container,
  suit: Suit,
  cx: number,
  cy: number,
  size: number,
  flipped: boolean,
) {
  const PIXI = await import('pixi.js');
  const t = new PIXI.Text({
    text: SUIT_GLYPH[suit],
    style: {
      fontFamily: '"DejaVu Sans", "Segoe UI Symbol", system-ui, sans-serif',
      fontSize: size,
      fill: suitColor(suit),
      fontWeight: '600',
    },
  });
  t.anchor.set(0.5);
  t.x = cx;
  t.y = cy;
  if (flipped) {
    t.rotation = Math.PI;
  }
  parent.addChild(t);
}

/** Draw the rank+suit corner index, optionally flipped (for the bottom-right). */
async function drawCornerIndex(
  parent: import('pixi.js').Container,
  card: Card,
  cw: number,
  ch: number,
  flipped: boolean,
) {
  const PIXI = await import('pixi.js');
  const color = suitColor(card.suit);
  const rankSize = Math.max(13, Math.round(cw * 0.24));
  const suitSize = Math.max(11, Math.round(cw * 0.18));

  const group = new PIXI.Container();
  const rankText = new PIXI.Text({
    text: rankLabel(card.rank),
    style: {
      fontFamily: 'Georgia, "Times New Roman", serif',
      fontSize: rankSize,
      fill: color,
      fontWeight: '700',
      align: 'center',
    },
  });
  rankText.anchor.set(0.5, 0);
  rankText.x = 0;
  rankText.y = 0;
  group.addChild(rankText);

  const suitText = new PIXI.Text({
    text: SUIT_GLYPH[card.suit],
    style: {
      fontFamily: '"DejaVu Sans", "Segoe UI Symbol", system-ui, sans-serif',
      fontSize: suitSize,
      fill: color,
    },
  });
  suitText.anchor.set(0.5, 0);
  suitText.x = 0;
  suitText.y = rankSize * 0.92;
  group.addChild(suitText);

  if (flipped) {
    group.rotation = Math.PI;
    group.x = cw - Math.round(cw * 0.12);
    group.y = ch - Math.round(cw * 0.08);
  } else {
    group.x = Math.round(cw * 0.12);
    group.y = Math.round(cw * 0.08);
  }
  parent.addChild(group);
}

/** Number-card pip pattern using PIP_LAYOUTS. */
async function drawNumberFace(
  parent: import('pixi.js').Container,
  card: Card,
  cw: number,
  ch: number,
) {
  const layout = PIP_LAYOUTS[card.rank as keyof typeof PIP_LAYOUTS];
  if (!layout) return;
  const innerX = cw * PAD_X;
  const innerY = ch * PAD_Y;
  const innerW = cw - innerX * 2;
  const innerH = ch - innerY * 2;
  const pipSize = Math.max(14, Math.round(cw * 0.32));
  for (const [col, row] of layout) {
    const x = innerX + (col / 2) * innerW;
    const y = innerY + (row / 6) * innerH;
    const flipped = row > 3.5;
    await drawPip(parent, card.suit, x, y, pipSize, flipped);
  }
}

/** Single big centered pip (Ace). */
async function drawAceFace(
  parent: import('pixi.js').Container,
  card: Card,
  cw: number,
  ch: number,
) {
  await drawPip(parent, card.suit, cw / 2, ch / 2, Math.max(28, Math.round(cw * 0.7)), false);
}

/**
 * Stylized face card (J, Q, K). We draw an inset frame, a large rank letter as
 * the "portrait", and a small suit pip in opposing corners — evoking a court
 * card without needing real artwork. Color matches the suit.
 */
async function drawFaceCardFace(
  parent: import('pixi.js').Container,
  card: Card,
  cw: number,
  ch: number,
) {
  const PIXI = await import('pixi.js');
  const color = suitColor(card.suit);
  const accent = isRedSuit(card.suit) ? 0xfde0e0 : 0xe5e7eb;

  const frameX = cw * 0.18;
  const frameY = ch * 0.14;
  const frameW = cw - frameX * 2;
  const frameH = ch - frameY * 2;
  const frame = new PIXI.Graphics();
  frame
    .roundRect(frameX, frameY, frameW, frameH, Math.max(4, cw * 0.06))
    .fill({ color: accent, alpha: 0.55 })
    .stroke({ color, width: Math.max(1, Math.round(cw * 0.02)), alpha: 0.85 });
  parent.addChild(frame);

  // Inner double border for a more "ornate" feel.
  const innerInset = cw * 0.04;
  const innerFrame = new PIXI.Graphics();
  innerFrame
    .roundRect(
      frameX + innerInset,
      frameY + innerInset,
      frameW - innerInset * 2,
      frameH - innerInset * 2,
      Math.max(3, cw * 0.05),
    )
    .stroke({ color, width: 1, alpha: 0.5 });
  parent.addChild(innerFrame);

  // Big rank letter as the "portrait"
  const monogram = new PIXI.Text({
    text: rankLabel(card.rank),
    style: {
      fontFamily: 'Georgia, "Times New Roman", serif',
      fontSize: Math.max(34, Math.round(cw * 0.78)),
      fill: color,
      fontWeight: '700',
    },
  });
  monogram.anchor.set(0.5);
  monogram.x = cw / 2;
  monogram.y = ch / 2;
  parent.addChild(monogram);

  // Small suit accents top-left & bottom-right of inner frame
  const accentSize = Math.max(11, Math.round(cw * 0.2));
  await drawPip(
    parent,
    card.suit,
    frameX + innerInset + accentSize * 0.7,
    frameY + innerInset + accentSize * 0.7,
    accentSize,
    false,
  );
  await drawPip(
    parent,
    card.suit,
    frameX + frameW - innerInset - accentSize * 0.7,
    frameY + frameH - innerInset - accentSize * 0.7,
    accentSize,
    true,
  );
}

/** Top-level: draw a complete card face into `parent` at origin (0,0). */
export async function drawCardFace(
  parent: import('pixi.js').Container,
  card: Card,
  size: CardSize,
) {
  const PIXI = await import('pixi.js');
  const { w: cw, h: ch } = size;
  const radius = Math.max(6, Math.round(cw * 0.13));

  // Card surface
  const surface = new PIXI.Graphics();
  surface.roundRect(0, 0, cw, ch, radius).fill(0xfafafa).stroke({ color: 0x111827, width: 1.5 });
  parent.addChild(surface);

  // Pip pattern / face art
  if (card.rank === 14) {
    await drawAceFace(parent, card, cw, ch);
  } else if (card.rank >= 11 && card.rank <= 13) {
    await drawFaceCardFace(parent, card, cw, ch);
  } else {
    await drawNumberFace(parent, card, cw, ch);
  }

  // Corner indices (top-left, bottom-right rotated)
  await drawCornerIndex(parent, card, cw, ch, false);
  await drawCornerIndex(parent, card, cw, ch, true);
}

/** Card back — diagonal line lattice on a deep blue. */
export async function drawCardBack(parent: import('pixi.js').Container, size: CardSize) {
  const PIXI = await import('pixi.js');
  const { w: cw, h: ch } = size;
  const radius = Math.max(6, Math.round(cw * 0.13));

  const surface = new PIXI.Graphics();
  surface.roundRect(0, 0, cw, ch, radius).fill(0x0e2a5b).stroke({ color: 0x60a5fa, width: 2 });
  parent.addChild(surface);

  // Inset border
  surface
    .roundRect(6, 6, cw - 12, ch - 12, Math.max(3, radius - 4))
    .stroke({ color: 0x93c5fd, width: 1.5, alpha: 0.85 });

  // Diagonal lattice pattern, clipped to the inset border via a mask.
  const lattice = new PIXI.Graphics();
  const step = Math.max(8, Math.round(cw * 0.16));
  for (let i = -ch; i < cw + ch; i += step) {
    lattice.moveTo(i, 0).lineTo(i + ch, ch);
    lattice.moveTo(i, ch).lineTo(i + ch, 0);
  }
  lattice.stroke({ color: 0x3b82f6, width: 1, alpha: 0.5 });

  const mask = new PIXI.Graphics();
  mask.roundRect(8, 8, cw - 16, ch - 16, Math.max(3, radius - 4)).fill(0xffffff);
  parent.addChild(mask);
  lattice.mask = mask;
  parent.addChild(lattice);

  // Center medallion
  const medallion = new PIXI.Graphics();
  const cx = cw / 2;
  const cy = ch / 2;
  const r = Math.max(8, Math.round(cw * 0.22));
  medallion
    .circle(cx, cy, r)
    .fill({ color: 0x1e3a8a, alpha: 0.95 })
    .stroke({ color: 0x93c5fd, width: 1.5 });
  medallion.circle(cx, cy, r - 4).stroke({ color: 0x60a5fa, width: 1, alpha: 0.7 });
  parent.addChild(medallion);

  const star = new PIXI.Text({
    text: '✦',
    style: {
      fontFamily: 'system-ui, sans-serif',
      fontSize: Math.max(14, Math.round(cw * 0.32)),
      fill: 0xdbeafe,
      fontWeight: '700',
    },
  });
  star.anchor.set(0.5);
  star.x = cx;
  star.y = cy;
  parent.addChild(star);
}

/** Card slot placeholder (empty community slot). */
export async function drawCardSlot(parent: import('pixi.js').Container, size: CardSize) {
  const PIXI = await import('pixi.js');
  const { w: cw, h: ch } = size;
  const radius = Math.max(6, Math.round(cw * 0.13));
  const slot = new PIXI.Graphics();
  slot.roundRect(0, 0, cw, ch, radius).stroke({ color: 0x166644, width: 2, alpha: 0.7 });
  parent.addChild(slot);
}

/** Drop-shadow rect drawn behind everything else. */
export async function drawDropShadow(parent: import('pixi.js').Container, size: CardSize) {
  const PIXI = await import('pixi.js');
  const { w: cw, h: ch } = size;
  const radius = Math.max(6, Math.round(cw * 0.13));
  const shadow = new PIXI.Graphics();
  shadow.roundRect(2, 4, cw, ch, radius).fill({ color: 0x000000, alpha: 0.35 });
  parent.addChild(shadow);
}
