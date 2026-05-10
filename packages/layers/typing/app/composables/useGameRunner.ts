/**
 * useGameRunner — PixiJS Application lifecycle for typing-app games.
 *
 * Mirrors the pattern from `components/poker/PokerTable.vue`:
 *   - mounts a PixiJS Application into a container ref
 *   - subscribes to keypress events from window
 *   - cleans up the app + listeners on unmount
 *
 * Each game is a `GameScene` factory that gets the Application and a
 * keypress stream and returns destroy/update hooks.
 */
import type { Application } from 'pixi.js';

export type KeyEvent = { key: string; at: number };

export type GameSceneContext = {
  app: Application;
  /** Subscribe to keypress events. The unsubscribe is returned. */
  onKey: (handler: (e: KeyEvent) => void) => () => void;
  /** Returns a value the host can read after the game ends. */
  emitResult: (result: GameResult) => void;
};

export type GameResult = {
  gameSlug: string;
  wpm: number;
  netWpm: number;
  accuracy: number;
  durationMs: number;
  errorsByKey: Record<string, number>;
};

export type GameScene = {
  /** Called once after the app has been initialized. */
  mount: (ctx: GameSceneContext) => void | Promise<void>;
  /** Called when the host unmounts. */
  unmount: () => void;
};

export type UseGameRunnerOptions = {
  containerRef: Ref<HTMLDivElement | null>;
  scene: GameScene;
  onResult?: (result: GameResult) => void;
};

export function useGameRunner(options: UseGameRunnerOptions) {
  const result = ref<GameResult | null>(null);
  const ready = ref(false);

  let app: Application | null = null;
  let resizeObserver: ResizeObserver | null = null;
  const keyHandlers = new Set<(e: KeyEvent) => void>();

  function onKeydown(ev: KeyboardEvent) {
    if (ev.key === 'Tab') return; // let the user escape with tab
    if (ev.key.length !== 1 && ev.key !== 'Backspace' && ev.key !== 'Escape') return;
    ev.preventDefault();
    const e: KeyEvent = { key: ev.key, at: Date.now() };
    for (const h of keyHandlers) h(e);
  }

  async function start() {
    if (!import.meta.client) return;
    if (!options.containerRef.value) return;
    const { Application } = await import('pixi.js');
    const application = new Application();
    await application.init({
      background: 0x0b1424,
      antialias: true,
      resolution: Math.min(window.devicePixelRatio, 2),
      autoDensity: true,
      resizeTo: options.containerRef.value,
    });
    options.containerRef.value.appendChild(application.canvas);
    app = application;

    window.addEventListener('keydown', onKeydown);

    const ctx: GameSceneContext = {
      app: application,
      onKey: (handler) => {
        keyHandlers.add(handler);
        return () => keyHandlers.delete(handler);
      },
      emitResult: (r) => {
        result.value = r;
        options.onResult?.(r);
      },
    };

    await options.scene.mount(ctx);
    ready.value = true;
  }

  function stop() {
    options.scene.unmount();
    keyHandlers.clear();
    if (typeof window !== 'undefined') {
      window.removeEventListener('keydown', onKeydown);
    }
    resizeObserver?.disconnect();
    resizeObserver = null;
    if (app) {
      app.destroy(true, { children: true });
      app = null;
    }
    ready.value = false;
  }

  if (import.meta.client) {
    onMounted(() => {
      void start();
    });
    onBeforeUnmount(() => {
      stop();
    });
  }

  return { result, ready };
}
