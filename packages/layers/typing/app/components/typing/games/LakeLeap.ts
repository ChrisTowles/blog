/**
 * Lake Leap — type the word on the next platform to jump there.
 *
 * Modes:
 *   - curriculum: words from the active stage's drill set.
 *   - topic: AI-generated words constrained to unlocked keys.
 *   - spelling: that week's spelling list.
 *
 * Round = 10 platforms. Mastery: clear with <= 2 wrong words.
 */
import type { Application, Container, Text } from 'pixi.js';
import { Container as PixiContainer, Graphics, Text as PixiText } from 'pixi.js';
import type { GameScene, GameSceneContext } from '../../../composables/useGameRunner';
import {
  pickWordsForRound,
  summarize,
  type LakeLeapMode,
} from '../../../utils/typing/games/lake-leap';

export type LakeLeapConfig = {
  mode: LakeLeapMode;
  source: string[];
  count?: number;
};

export function createLakeLeap(config: LakeLeapConfig): GameScene {
  const count = config.count ?? 10;
  const words = pickWordsForRound({ mode: config.mode, source: config.source, count });

  let app: Application | null = null;
  let stage: Container | null = null;
  let hud: Text | null = null;
  let inputText: Text | null = null;
  let endText: Text | null = null;
  const platforms: { x: number; y: number; label: Text; word: string }[] = [];
  let charY = 0;
  let charX = 0;
  let charSprite: Graphics | null = null;
  let currentIndex = 0;
  let typed = '';
  let wrongs = 0;
  let typedChars = 0;
  let correctChars = 0;
  let startedAt = 0;
  let unsubKey: (() => void) | null = null;
  const errorsByKey: Record<string, number> = {};

  function endRound(ctx: GameSceneContext) {
    if (!app) return;
    const summary = summarize({
      cleared: currentIndex,
      wrongs,
      startedAt,
      endedAt: Date.now(),
    });
    if (endText) {
      endText.text = summary.perfect
        ? `Cleared ${summary.cleared} platforms!`
        : `Cleared ${summary.cleared} (${wrongs} wrong)`;
      endText.visible = true;
    }
    const minutes = summary.durationMs / 60_000;
    const wpm = minutes > 0 ? correctChars / 5 / minutes : 0;
    const accuracy = typedChars > 0 ? correctChars / typedChars : 1;
    ctx.emitResult({
      gameSlug: 'lake-leap',
      wpm,
      netWpm: Math.max(0, wpm - wrongs / Math.max(0.01, minutes)),
      accuracy,
      durationMs: summary.durationMs,
      errorsByKey,
    });
  }

  function moveCharacterTo(idx: number) {
    if (!charSprite) return;
    const target = platforms[idx];
    if (!target) return;
    charX = target.x;
    charY = target.y - 20;
    charSprite.position.set(charX, charY);
  }

  return {
    async mount(ctx) {
      app = ctx.app;
      stage = new PixiContainer();
      app.stage.addChild(stage);

      const w = app.renderer.width;
      const h = app.renderer.height;

      // Lake background.
      const lake = new Graphics();
      lake.rect(0, h * 0.55, w, h * 0.45).fill(0x0e7490);
      stage.addChild(lake);

      // Platforms.
      const platformY = h * 0.55;
      const spacing = Math.max(120, w / (count + 1));
      for (let i = 0; i < count; i++) {
        const x = 80 + i * spacing;
        const platformG = new Graphics();
        platformG
          .roundRect(x - 50, platformY, 100, 20, 6)
          .fill({ color: i === 0 ? 0x84cc16 : 0xa3e635 });
        stage.addChild(platformG);
        const label = new PixiText({
          text: words[i] ?? '',
          style: {
            fontFamily: 'system-ui, sans-serif',
            fontSize: 22,
            fill: 0x1f2937,
            fontWeight: '700',
          },
        });
        label.anchor.set(0.5, 1);
        label.x = x;
        label.y = platformY - 4;
        stage.addChild(label);
        platforms.push({ x, y: platformY, label, word: words[i] ?? '' });
      }

      // Character.
      charSprite = new Graphics();
      charSprite.circle(0, 0, 16).fill(0xfb923c);
      stage.addChild(charSprite);
      moveCharacterTo(0);
      currentIndex = 1;

      hud = new PixiText({
        text: 'Type the next platform word',
        style: {
          fontFamily: 'system-ui, sans-serif',
          fontSize: 18,
          fill: 0xa7c3b3,
          fontWeight: '600',
        },
      });
      hud.x = 20;
      hud.y = 20;
      stage.addChild(hud);

      inputText = new PixiText({
        text: '',
        style: {
          fontFamily: 'monospace',
          fontSize: 28,
          fill: 0xfde68a,
          fontWeight: '700',
        },
      });
      inputText.anchor.set(0.5, 0);
      inputText.x = w / 2;
      inputText.y = 60;
      stage.addChild(inputText);

      endText = new PixiText({
        text: '',
        style: {
          fontFamily: 'system-ui, sans-serif',
          fontSize: 30,
          fill: 0xfde68a,
          fontWeight: '700',
          align: 'center',
        },
      });
      endText.anchor.set(0.5, 0.5);
      endText.x = w / 2;
      endText.y = 100;
      endText.visible = false;
      stage.addChild(endText);

      startedAt = Date.now();

      unsubKey = ctx.onKey(({ key }) => {
        if (currentIndex >= count) return;
        if (key === 'Backspace') {
          typed = typed.slice(0, -1);
          if (inputText) inputText.text = typed;
          return;
        }
        if (key.length !== 1) return;
        const target = platforms[currentIndex]?.word ?? '';
        const expected = target[typed.length];
        typedChars++;
        if (key === expected) {
          correctChars++;
          typed += key;
          if (inputText) inputText.text = typed;
          if (typed === target) {
            // Jump.
            moveCharacterTo(currentIndex);
            currentIndex++;
            typed = '';
            if (inputText) inputText.text = '';
            if (currentIndex >= count) endRound(ctx);
          }
        } else {
          wrongs++;
          errorsByKey[expected ?? key] = (errorsByKey[expected ?? key] ?? 0) + 1;
          // Reset the current word on a wrong key.
          typed = '';
          if (inputText) inputText.text = '';
        }
      });
    },
    unmount() {
      if (unsubKey) unsubKey();
      unsubKey = null;
      platforms.length = 0;
      currentIndex = 0;
      typed = '';
      wrongs = 0;
    },
  };
}
