/**
 * Letter Rain — falling letters; type to zap.
 *
 * - 60-second round.
 * - Letters fall at a stage-tuned rate (faster for higher stages).
 * - Pressing the matching key zaps the letter (particle burst).
 * - 5 misses = round ends.
 *
 * Returns a `GameResult` with wpm based on letters zapped per minute,
 * accuracy = zapped / typed, and `errorsByKey` for the heatmap.
 */
import type { Application, Container, Text } from 'pixi.js';
import { Container as PixiContainer, Graphics, Text as PixiText } from 'pixi.js';
import type { GameScene, GameSceneContext } from '../../../composables/useGameRunner';

export type LetterRainConfig = {
  /** Available keys; defaults to a-z. */
  letters?: string[];
  /** Round length in ms. */
  durationMs?: number;
  /** ms between drops at the start. */
  initialSpawnMs?: number;
  /** Fall speed pixels/sec. */
  initialFallSpeed?: number;
  /** Max simultaneous misses before the round ends. */
  maxMisses?: number;
};

type FallingLetter = {
  ch: string;
  text: Text;
  vy: number; // px / sec
};

export function createLetterRain(config: LetterRainConfig = {}): GameScene {
  const letters =
    config.letters ?? Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i));
  const durationMs = config.durationMs ?? 60_000;
  let spawnMs = config.initialSpawnMs ?? 1500;
  let fallSpeed = config.initialFallSpeed ?? 90;
  const maxMisses = config.maxMisses ?? 5;

  let app: Application | null = null;
  let stage: Container | null = null;
  let hud: Text | null = null;
  let scoreText: Text | null = null;
  let endText: Text | null = null;

  const falling: FallingLetter[] = [];
  let zapped = 0;
  let typed = 0;
  let missed = 0;
  let startedAt = 0;
  let endedAt = 0;
  let tickHandler: ((delta: { deltaMS: number }) => void) | null = null;
  let spawnAccumMs = 0;
  let unsubKey: (() => void) | null = null;
  const errorsByKey: Record<string, number> = {};

  function spawnLetter() {
    if (!app || !stage) return;
    const ch = letters[Math.floor(Math.random() * letters.length)] ?? 'a';
    const t = new PixiText({
      text: ch,
      style: {
        fontFamily: 'system-ui, sans-serif',
        fontSize: 48,
        fill: 0xfde68a,
        fontWeight: '700',
      },
    });
    t.anchor.set(0.5, 0.5);
    const w = app.renderer.width;
    t.x = 30 + Math.random() * Math.max(1, w - 60);
    t.y = -40;
    stage.addChild(t);
    falling.push({ ch, text: t, vy: fallSpeed * (0.8 + Math.random() * 0.4) });
  }

  function ramp() {
    // Difficulty ramps gradually over the round.
    spawnMs = Math.max(450, spawnMs * 0.97);
    fallSpeed = Math.min(220, fallSpeed * 1.02);
  }

  function endRound(ctx: GameSceneContext) {
    if (endedAt) return;
    endedAt = Date.now();
    if (tickHandler && app) app.ticker.remove(tickHandler);
    if (endText && stage) {
      endText.visible = true;
      endText.text = `Round over!\n${zapped} zapped`;
    }
    const durationActualMs = endedAt - startedAt;
    const minutes = durationActualMs / 60_000;
    // Approximate "words per minute" at 1 letter ~= 0.2 words.
    const wpm = minutes > 0 ? zapped / 5 / minutes : 0;
    const errors = typed - zapped;
    const accuracy = typed > 0 ? zapped / typed : 1;
    ctx.emitResult({
      gameSlug: 'letter-rain',
      wpm,
      netWpm: Math.max(0, wpm - errors / Math.max(0.01, minutes)),
      accuracy,
      durationMs: durationActualMs,
      errorsByKey,
    });
  }

  return {
    async mount(ctx) {
      app = ctx.app;
      stage = new PixiContainer();
      app.stage.addChild(stage);

      hud = new PixiText({
        text: 'Letter Rain',
        style: {
          fontFamily: 'system-ui, sans-serif',
          fontSize: 18,
          fill: 0xa7c3b3,
          fontWeight: '600',
          letterSpacing: 2,
        },
      });
      hud.x = 20;
      hud.y = 16;
      app.stage.addChild(hud);

      scoreText = new PixiText({
        text: '0 zapped · 0 misses',
        style: {
          fontFamily: 'system-ui, sans-serif',
          fontSize: 18,
          fill: 0xfff2c2,
          fontWeight: '700',
        },
      });
      scoreText.anchor.set(1, 0);
      scoreText.x = app.renderer.width - 20;
      scoreText.y = 16;
      app.stage.addChild(scoreText);

      endText = new PixiText({
        text: '',
        style: {
          fontFamily: 'system-ui, sans-serif',
          fontSize: 36,
          fill: 0xfde68a,
          fontWeight: '700',
          align: 'center',
        },
      });
      endText.anchor.set(0.5, 0.5);
      endText.x = app.renderer.width / 2;
      endText.y = app.renderer.height / 2;
      endText.visible = false;
      app.stage.addChild(endText);

      startedAt = Date.now();

      tickHandler = (delta: { deltaMS: number }) => {
        if (!app || !stage) return;
        const now = Date.now();
        if (now - startedAt >= durationMs) {
          endRound(ctx);
          return;
        }
        spawnAccumMs += delta.deltaMS;
        if (spawnAccumMs >= spawnMs) {
          spawnAccumMs = 0;
          spawnLetter();
          ramp();
        }
        const dtSec = delta.deltaMS / 1000;
        const h = app.renderer.height;
        for (let i = falling.length - 1; i >= 0; i--) {
          const f = falling[i]!;
          f.text.y += f.vy * dtSec;
          if (f.text.y > h - 20) {
            // Letter hit the ground — miss.
            stage.removeChild(f.text);
            f.text.destroy();
            falling.splice(i, 1);
            missed++;
            errorsByKey[f.ch] = (errorsByKey[f.ch] ?? 0) + 1;
            if (scoreText) scoreText.text = `${zapped} zapped · ${missed} misses`;
            if (missed >= maxMisses) endRound(ctx);
          }
        }
      };
      app.ticker.add(tickHandler);

      unsubKey = ctx.onKey(({ key }) => {
        if (key.length !== 1) return;
        typed++;
        // Find the lowest matching letter.
        let bestIdx = -1;
        let bestY = -Infinity;
        for (let i = 0; i < falling.length; i++) {
          const f = falling[i]!;
          if (f.ch === key && f.text.y > bestY) {
            bestY = f.text.y;
            bestIdx = i;
          }
        }
        if (bestIdx >= 0) {
          const f = falling[bestIdx]!;
          // Tiny "zap" effect — flash the letter color, then remove next tick.
          const burst = new Graphics();
          burst.circle(f.text.x, f.text.y, 30).fill({ color: 0xfde68a, alpha: 0.5 });
          stage?.addChild(burst);
          setTimeout(() => {
            burst.destroy();
          }, 150);
          stage?.removeChild(f.text);
          f.text.destroy();
          falling.splice(bestIdx, 1);
          zapped++;
        } else {
          errorsByKey[key] = (errorsByKey[key] ?? 0) + 1;
        }
        if (scoreText) scoreText.text = `${zapped} zapped · ${missed} misses`;
      });
    },
    unmount() {
      if (unsubKey) unsubKey();
      unsubKey = null;
      if (tickHandler && app) app.ticker.remove(tickHandler);
      tickHandler = null;
      falling.length = 0;
    },
  };
}
