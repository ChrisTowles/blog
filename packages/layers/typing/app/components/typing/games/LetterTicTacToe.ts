/**
 * Letter Tic-Tac-Toe — type a letter to claim its cell.
 *
 * Each cell is labelled with a letter from the unlocked set. Player types
 * to claim. AI plays at a stage-tuned level. First to 3 in a row wins.
 */
import type { Application, Container, Text } from 'pixi.js';
import { Container as PixiContainer, Graphics, Text as PixiText } from 'pixi.js';
import type { GameScene, GameSceneContext } from '../../../composables/useGameRunner';
import {
  aiLevelForStage,
  chooseAIMove,
  emptyBoard,
  winner,
  type AILevel,
  type Cell,
} from '../../../utils/typing/games/tic-tac-toe';

export type LetterTicTacToeConfig = {
  letters?: string[];
  stage?: number;
  aiLevel?: AILevel;
};

export function createLetterTicTacToe(config: LetterTicTacToeConfig = {}): GameScene {
  const letters = (
    config.letters ?? Array.from({ length: 9 }, (_, i) => String.fromCharCode(97 + i))
  ).slice(0, 9);
  while (letters.length < 9) letters.push(String.fromCharCode(97 + letters.length));
  const aiLevel = config.aiLevel ?? aiLevelForStage(config.stage ?? 1);

  let app: Application | null = null;
  let stage: Container | null = null;
  let statusText: Text | null = null;
  const cellLabels: Text[] = [];
  const cellMarkers: Text[] = [];
  let board: Cell[] = emptyBoard();
  let startedAt = 0;
  let typed = 0;
  let correctClaims = 0;
  const errorsByKey: Record<string, number> = {};
  let unsubKey: (() => void) | null = null;

  function checkEnd(ctx: GameSceneContext) {
    const w = winner(board);
    if (!w) return;
    const durationMs = Date.now() - startedAt;
    const accuracy = typed > 0 ? correctClaims / typed : 1;
    const message = w === 'p' ? 'You win!' : w === 'a' ? 'AI wins!' : "It's a tie!";
    if (statusText) statusText.text = message;
    ctx.emitResult({
      gameSlug: 'letter-tic-tac-toe',
      wpm: 0,
      netWpm: 0,
      accuracy,
      durationMs,
      errorsByKey,
    });
  }

  function aiMove(ctx: GameSceneContext) {
    const move = chooseAIMove(board, aiLevel);
    if (move < 0) return;
    board[move] = 'a';
    drawMarkers();
    checkEnd(ctx);
  }

  function drawMarkers() {
    for (let i = 0; i < 9; i++) {
      const v = board[i];
      const m = cellMarkers[i];
      if (!m) continue;
      m.text = v === 'p' ? '✓' : v === 'a' ? '✕' : '';
      m.style.fill = v === 'p' ? 0x34d399 : 0xfb7185;
    }
  }

  return {
    async mount(ctx) {
      app = ctx.app;
      stage = new PixiContainer();
      app.stage.addChild(stage);

      const w = app.renderer.width;
      const h = app.renderer.height;
      const cellSize = Math.min(120, Math.floor(Math.min(w, h) / 4));
      const offsetX = (w - cellSize * 3) / 2;
      const offsetY = (h - cellSize * 3) / 2 + 20;

      const grid = new Graphics();
      grid.setStrokeStyle({ color: 0xa7c3b3, width: 4 });
      for (let i = 1; i < 3; i++) {
        grid
          .moveTo(offsetX + i * cellSize, offsetY)
          .lineTo(offsetX + i * cellSize, offsetY + cellSize * 3)
          .moveTo(offsetX, offsetY + i * cellSize)
          .lineTo(offsetX + cellSize * 3, offsetY + i * cellSize);
      }
      grid.stroke();
      stage.addChild(grid);

      for (let i = 0; i < 9; i++) {
        const cx = offsetX + (i % 3) * cellSize + cellSize / 2;
        const cy = offsetY + Math.floor(i / 3) * cellSize + cellSize / 2;
        const label = new PixiText({
          text: letters[i] ?? '',
          style: {
            fontFamily: 'system-ui, sans-serif',
            fontSize: Math.floor(cellSize * 0.55),
            fill: 0xfde68a,
            fontWeight: '700',
          },
        });
        label.anchor.set(0.5, 0.5);
        label.x = cx;
        label.y = cy - 14;
        stage.addChild(label);
        cellLabels.push(label);

        const marker = new PixiText({
          text: '',
          style: {
            fontFamily: 'system-ui, sans-serif',
            fontSize: Math.floor(cellSize * 0.55),
            fill: 0x34d399,
            fontWeight: '900',
          },
        });
        marker.anchor.set(0.5, 0.5);
        marker.x = cx + cellSize * 0.3;
        marker.y = cy + cellSize * 0.3;
        stage.addChild(marker);
        cellMarkers.push(marker);
      }

      statusText = new PixiText({
        text: 'Type the letter to claim',
        style: {
          fontFamily: 'system-ui, sans-serif',
          fontSize: 20,
          fill: 0xa7c3b3,
          fontWeight: '600',
        },
      });
      statusText.anchor.set(0.5, 0);
      statusText.x = w / 2;
      statusText.y = 20;
      stage.addChild(statusText);

      startedAt = Date.now();

      unsubKey = ctx.onKey(({ key }) => {
        if (key.length !== 1) return;
        if (winner(board)) return;
        typed++;
        const idx = letters.indexOf(key.toLowerCase());
        if (idx >= 0 && board[idx] === null) {
          board[idx] = 'p';
          correctClaims++;
          drawMarkers();
          if (!winner(board)) {
            // Slight delay so the player sees their move first.
            setTimeout(() => aiMove(ctx), 350);
          } else {
            checkEnd(ctx);
          }
        } else {
          errorsByKey[key] = (errorsByKey[key] ?? 0) + 1;
        }
      });
    },
    unmount() {
      if (unsubKey) unsubKey();
      unsubKey = null;
      cellLabels.length = 0;
      cellMarkers.length = 0;
      board = emptyBoard();
    },
  };
}
