/**
 * Pure logic for Letter Tic-Tac-Toe AI moves and game evaluation.
 *
 * Cells are 0..8 in row-major order. Empty = -1 in the moves array.
 * 'p' = player, 'a' = AI.
 */
export type Cell = 'p' | 'a' | null;
export type Board = Cell[]; // length 9

export const WINNING_LINES: [number, number, number][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export function emptyBoard(): Board {
  return Array(9).fill(null);
}

export function winner(board: Board): Cell | 'tie' | null {
  for (const [a, b, c] of WINNING_LINES) {
    const v = board[a];
    if (v && v === board[b] && v === board[c]) return v;
  }
  if (board.every((c) => c !== null)) return 'tie';
  return null;
}

export type AILevel = 'random' | 'weighted' | 'minimax';

/** Choose an AI move. Returns the cell index 0..8. */
export function chooseAIMove(board: Board, level: AILevel): number {
  const empty = board.map((c, i) => (c === null ? i : -1)).filter((i) => i >= 0);
  if (empty.length === 0) return -1;
  if (level === 'random') {
    return empty[Math.floor(Math.random() * empty.length)] ?? empty[0]!;
  }
  if (level === 'weighted') {
    // Prefer center, then corners, then edges.
    const weights = [3, 2, 3, 2, 4, 2, 3, 2, 3];
    const candidates = empty.map((i) => ({ i, w: weights[i] ?? 1 }));
    const totalWeight = candidates.reduce((acc, c) => acc + c.w, 0);
    let r = Math.random() * totalWeight;
    for (const c of candidates) {
      r -= c.w;
      if (r <= 0) return c.i;
    }
    return candidates[0]!.i;
  }
  // Minimax — AI is the maximizing player.
  function scoreBoard(b: Board, depth: number): number {
    const w = winner(b);
    if (w === 'a') return 10 - depth;
    if (w === 'p') return depth - 10;
    if (w === 'tie') return 0;
    return Number.NaN; // not terminal
  }

  function minimax(b: Board, isAI: boolean, depth: number): { score: number; move: number } {
    const terminal = scoreBoard(b, depth);
    if (!Number.isNaN(terminal)) return { score: terminal, move: -1 };
    let best = isAI ? { score: -Infinity, move: -1 } : { score: Infinity, move: -1 };
    for (let i = 0; i < 9; i++) {
      if (b[i] !== null) continue;
      b[i] = isAI ? 'a' : 'p';
      const child = minimax(b, !isAI, depth + 1);
      b[i] = null;
      if (isAI ? child.score > best.score : child.score < best.score) {
        best = { score: child.score, move: i };
      }
    }
    return best;
  }

  return minimax([...board], true, 0).move;
}

export function aiLevelForStage(stage: number): AILevel {
  if (stage <= 2) return 'random';
  if (stage <= 4) return 'weighted';
  return 'minimax';
}
