/**
 * useCanvasExport — freehand drawing on a <canvas> with mouse + touch
 * support and PNG export.
 *
 * The canvas is filled white before export so the model sees ink on a
 * white field (a transparent PNG reads as black on black to vision).
 */

export function useCanvasExport(canvasRef: Ref<HTMLCanvasElement | null>) {
  const hasDrawing = ref(false);
  let ctx: CanvasRenderingContext2D | null = null;
  let drawing = false;
  let last: { x: number; y: number } | null = null;

  function prepare() {
    const canvas = canvasRef.value;
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
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
    hasDrawing.value = true;
  }

  function end() {
    drawing = false;
    last = null;
  }

  function clear() {
    prepare();
    hasDrawing.value = false;
  }

  /** Returns a `data:image/png;base64,...` data URL. */
  function toDataUrl(): string {
    const canvas = canvasRef.value;
    if (!canvas) return '';
    return canvas.toDataURL('image/png');
  }

  return { hasDrawing, prepare, start, move, end, clear, toDataUrl };
}
