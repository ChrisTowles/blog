/**
 * Programmatic playing-card rendering for the poker felt.
 *
 * Draws cards via PixiJS Graphics — no asset pipeline, scales cleanly. Pip
 * placement data is shared with the SVG deck generator via PIP_LAYOUTS so the
 * live game and the pre-generated decks can never drift.
 */
import { Container, Graphics, Text } from 'pixi.js';
import type { Card, Suit } from '~/utils/poker/types';
import { isRedSuit, rankLabel, SUIT_GLYPH } from '~/utils/poker/types';
import { PIP_LAYOUTS } from '~~/shared/poker/decks/svg-helpers';

export interface CardSize {
  w: number;
  h: number;
}

const PAD_X = 0.18;
const PAD_Y = 0.14;

function suitColor(suit: Suit): number {
  return isRedSuit(suit) ? 0xc0392b : 0x111827;
}

function drawPip(
  parent: Container,
  suit: Suit,
  cx: number,
  cy: number,
  size: number,
  flipped: boolean,
) {
  const t = new Text({
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
  if (flipped) t.rotation = Math.PI;
  parent.addChild(t);
}

function drawCornerIndex(parent: Container, card: Card, cw: number, ch: number, flipped: boolean) {
  const color = suitColor(card.suit);
  const rankSize = Math.max(13, Math.round(cw * 0.24));
  const suitSize = Math.max(11, Math.round(cw * 0.18));

  const group = new Container();
  const rankText = new Text({
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
  group.addChild(rankText);

  const suitText = new Text({
    text: SUIT_GLYPH[card.suit],
    style: {
      fontFamily: '"DejaVu Sans", "Segoe UI Symbol", system-ui, sans-serif',
      fontSize: suitSize,
      fill: color,
    },
  });
  suitText.anchor.set(0.5, 0);
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

function drawNumberFace(parent: Container, card: Card, cw: number, ch: number) {
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
    drawPip(parent, card.suit, x, y, pipSize, row > 3.5);
  }
}

function drawAceFace(parent: Container, card: Card, cw: number, ch: number) {
  drawPip(parent, card.suit, cw / 2, ch / 2, Math.max(28, Math.round(cw * 0.7)), false);
}

/** Stylized face card: inset frame + large rank monogram + suit accents. */
function drawFaceCardFace(parent: Container, card: Card, cw: number, ch: number) {
  const color = suitColor(card.suit);
  const accent = isRedSuit(card.suit) ? 0xfde0e0 : 0xe5e7eb;

  const frameX = cw * 0.18;
  const frameY = ch * 0.14;
  const frameW = cw - frameX * 2;
  const frameH = ch - frameY * 2;
  const frame = new Graphics();
  frame
    .roundRect(frameX, frameY, frameW, frameH, Math.max(4, cw * 0.06))
    .fill({ color: accent, alpha: 0.55 })
    .stroke({ color, width: Math.max(1, Math.round(cw * 0.02)), alpha: 0.85 });
  parent.addChild(frame);

  const innerInset = cw * 0.04;
  const innerFrame = new Graphics();
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

  const monogram = new Text({
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

  const accentSize = Math.max(11, Math.round(cw * 0.2));
  drawPip(
    parent,
    card.suit,
    frameX + innerInset + accentSize * 0.7,
    frameY + innerInset + accentSize * 0.7,
    accentSize,
    false,
  );
  drawPip(
    parent,
    card.suit,
    frameX + frameW - innerInset - accentSize * 0.7,
    frameY + frameH - innerInset - accentSize * 0.7,
    accentSize,
    true,
  );
}

export function drawCardFace(parent: Container, card: Card, size: CardSize) {
  const { w: cw, h: ch } = size;
  const radius = Math.max(6, Math.round(cw * 0.13));

  const surface = new Graphics();
  surface.roundRect(0, 0, cw, ch, radius).fill(0xfafafa).stroke({ color: 0x111827, width: 1.5 });
  parent.addChild(surface);

  if (card.rank === 14) drawAceFace(parent, card, cw, ch);
  else if (card.rank >= 11 && card.rank <= 13) drawFaceCardFace(parent, card, cw, ch);
  else drawNumberFace(parent, card, cw, ch);

  drawCornerIndex(parent, card, cw, ch, false);
  drawCornerIndex(parent, card, cw, ch, true);
}

/** Card back — diagonal line lattice on a deep blue. */
export function drawCardBack(parent: Container, size: CardSize) {
  const { w: cw, h: ch } = size;
  const radius = Math.max(6, Math.round(cw * 0.13));

  const surface = new Graphics();
  surface.roundRect(0, 0, cw, ch, radius).fill(0x0e2a5b).stroke({ color: 0x60a5fa, width: 2 });
  surface
    .roundRect(6, 6, cw - 12, ch - 12, Math.max(3, radius - 4))
    .stroke({ color: 0x93c5fd, width: 1.5, alpha: 0.85 });
  parent.addChild(surface);

  const lattice = new Graphics();
  const step = Math.max(8, Math.round(cw * 0.16));
  for (let i = -ch; i < cw + ch; i += step) {
    lattice.moveTo(i, 0).lineTo(i + ch, ch);
    lattice.moveTo(i, ch).lineTo(i + ch, 0);
  }
  lattice.stroke({ color: 0x3b82f6, width: 1, alpha: 0.5 });

  const mask = new Graphics();
  mask.roundRect(8, 8, cw - 16, ch - 16, Math.max(3, radius - 4)).fill(0xffffff);
  parent.addChild(mask);
  lattice.mask = mask;
  parent.addChild(lattice);

  const medallion = new Graphics();
  const cx = cw / 2;
  const cy = ch / 2;
  const r = Math.max(8, Math.round(cw * 0.22));
  medallion
    .circle(cx, cy, r)
    .fill({ color: 0x1e3a8a, alpha: 0.95 })
    .stroke({ color: 0x93c5fd, width: 1.5 });
  medallion.circle(cx, cy, r - 4).stroke({ color: 0x60a5fa, width: 1, alpha: 0.7 });
  parent.addChild(medallion);

  const star = new Text({
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

export function drawCardSlot(parent: Container, size: CardSize) {
  const { w: cw, h: ch } = size;
  const radius = Math.max(6, Math.round(cw * 0.13));
  const slot = new Graphics();
  slot.roundRect(0, 0, cw, ch, radius).stroke({ color: 0x166644, width: 2, alpha: 0.7 });
  parent.addChild(slot);
}

export function drawDropShadow(parent: Container, size: CardSize) {
  const { w: cw, h: ch } = size;
  const radius = Math.max(6, Math.round(cw * 0.13));
  const shadow = new Graphics();
  shadow.roundRect(2, 4, cw, ch, radius).fill({ color: 0x000000, alpha: 0.35 });
  parent.addChild(shadow);
}
