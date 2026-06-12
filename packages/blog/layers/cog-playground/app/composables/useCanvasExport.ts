/**
 * useCanvasExport — freehand drawing on a <canvas> with mouse + touch
 * support and PNG export.
 *
 * The canvas is filled white before export so the model sees ink on a
 * white field (a transparent PNG reads as black on black to vision).
 *
 * Tool modes:
 *   - 'draw'  → thin dark stroke (#0f172a, 3px)
 *   - 'erase' → fat white stroke (#ffffff, 24px) painted over existing
 *     ink. Same path geometry — we don't use globalCompositeOperation
 *     'destination-out' because that would punch transparent holes and
 *     break the white-background invariant the scorer depends on.
 */

export type CanvasMode = 'draw' | 'erase';

const DRAW_COLOR = '#0f172a';
const DRAW_WIDTH = 3;
const ERASE_COLOR = '#ffffff';
const ERASE_WIDTH = 24;

export function useCanvasExport(canvasRef: Ref<HTMLCanvasElement | null>) {
  const hasDrawing = ref(false);
  const mode = ref<CanvasMode>('draw');
  let ctx: CanvasRenderingContext2D | null = null;
  let drawing = false;
  let last: { x: number; y: number } | null = null;

  function applyToolStyle() {
    if (!ctx) return;
    if (mode.value === 'erase') {
      ctx.strokeStyle = ERASE_COLOR;
      ctx.lineWidth = ERASE_WIDTH;
    } else {
      ctx.strokeStyle = DRAW_COLOR;
      ctx.lineWidth = DRAW_WIDTH;
    }
  }

  function prepare() {
    const canvas = canvasRef.value;
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    applyToolStyle();
  }

  function setMode(next: CanvasMode) {
    mode.value = next;
    applyToolStyle();
  }

  function pos(e: MouseEvent | TouchEvent): { x: number; y: number } {
    const canvas = canvasRef.value!;
    const rect = canvas.getBoundingClientRect();
    const point = 'touches' in e ? (e.touches[0] ?? e.changedTouches[0]) : e;
    const clientX = point?.clientX ?? 0;
    const clientY = point?.clientY ?? 0;
    return {
      x: ((clientX - rect.left) / rect.width) * canvas.width,
      y: ((clientY - rect.top) / rect.height) * canvas.height,
    };
  }

  function start(e: MouseEvent | TouchEvent) {
    if (!ctx) prepare();
    drawing = true;
    last = pos(e);
  }

  function move(e: MouseEvent | TouchEvent) {
    if (!drawing || !ctx || !last) return;
    e.preventDefault();
    const p = pos(e);
    ctx.beginPath();
    ctx.moveTo(last.x, last.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    last = p;
    // Erasing doesn't add new content; only draw mode flips hasDrawing.
    if (mode.value === 'draw') hasDrawing.value = true;
  }

  function end() {
    drawing = false;
    last = null;
  }

  function clear() {
    // Preserve current mode across full-canvas clears.
    const prev = mode.value;
    prepare();
    mode.value = prev;
    applyToolStyle();
    hasDrawing.value = false;
  }

  /** Returns a `data:image/png;base64,...` data URL. */
  function toDataUrl(): string {
    const canvas = canvasRef.value;
    if (!canvas) return '';
    return canvas.toDataURL('image/png');
  }

  return { hasDrawing, mode, setMode, prepare, start, move, end, clear, toDataUrl };
}
