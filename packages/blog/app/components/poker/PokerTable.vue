<script setup lang="ts">
import { Application, Container, Graphics, Text } from 'pixi.js';
import type { Card, GameState } from '~/utils/poker/types';
import {
  drawCardBack,
  drawCardFace,
  drawCardSlot,
  drawDropShadow,
} from '~/components/poker/cardArt';

const props = defineProps<{
  state: GameState;
  /** When true, AI hole cards are shown face-up (showdown). */
  revealAi: boolean;
}>();

const containerRef = ref<HTMLDivElement | null>(null);
let app: Application | null = null;
let resizeObserver: ResizeObserver | null = null;

// Card layout constants — base size; the actual size scales with canvas width
const CARD_W_MAX = 80;
const CARD_ASPECT = 1.4; // height / width
const CARD_GAP_RATIO = 0.15; // gap as fraction of card width

function computeCardLayout(canvasWidth: number) {
  // Need to fit 5 community cards + side margins
  const horizontalPadding = 64;
  const usable = Math.max(canvasWidth - horizontalPadding, 200);
  // 5 cards + 4 gaps where gap = w * CARD_GAP_RATIO
  // total = 5w + 4 * 0.15w = 5.6w
  const w = Math.min(CARD_W_MAX, Math.floor(usable / 5.6));
  const h = Math.round(w * CARD_ASPECT);
  const gap = Math.round(w * CARD_GAP_RATIO);
  return { w, h, gap };
}

interface Scene {
  felt: Graphics;
  potText: Text;
  stageText: Text;
  playerStackText: Text;
  aiStackText: Text;
  playerCommittedText: Text;
  aiCommittedText: Text;
  toActText: Text;
  cardLayer: Container;
}

let scene: Scene | null = null;

async function buildScene() {
  if (!containerRef.value) return;
  const application = new Application();
  await application.init({
    background: 0x0b3d2e,
    antialias: true,
    resolution: Math.min(window.devicePixelRatio, 2),
    autoDensity: true,
    resizeTo: containerRef.value,
  });
  containerRef.value.appendChild(application.canvas);
  app = application;

  // Build static scene
  const felt = new Graphics();
  application.stage.addChild(felt);

  const stageText = new Text({
    text: '',
    style: {
      fontFamily: 'system-ui, sans-serif',
      fontSize: 14,
      fill: 0xa7c3b3,
      fontWeight: '600',
      letterSpacing: 2,
    },
  });
  stageText.anchor.set(0.5, 0);
  application.stage.addChild(stageText);

  const potText = new Text({
    text: 'Pot: 0',
    style: {
      fontFamily: 'system-ui, sans-serif',
      fontSize: 22,
      fill: 0xfff2c2,
      fontWeight: '700',
    },
  });
  potText.anchor.set(0.5, 0.5);
  application.stage.addChild(potText);

  const aiStackText = new Text({
    text: '',
    style: {
      fontFamily: 'system-ui, sans-serif',
      fontSize: 16,
      fill: 0xe5e7eb,
      fontWeight: '600',
    },
  });
  aiStackText.anchor.set(0.5, 0);
  application.stage.addChild(aiStackText);

  const aiCommittedText = new Text({
    text: '',
    style: {
      fontFamily: 'system-ui, sans-serif',
      fontSize: 14,
      fill: 0xfde68a,
    },
  });
  aiCommittedText.anchor.set(0.5, 0);
  application.stage.addChild(aiCommittedText);

  const playerStackText = new Text({
    text: '',
    style: {
      fontFamily: 'system-ui, sans-serif',
      fontSize: 16,
      fill: 0xe5e7eb,
      fontWeight: '600',
    },
  });
  playerStackText.anchor.set(0.5, 1);
  application.stage.addChild(playerStackText);

  const playerCommittedText = new Text({
    text: '',
    style: {
      fontFamily: 'system-ui, sans-serif',
      fontSize: 14,
      fill: 0xfde68a,
    },
  });
  playerCommittedText.anchor.set(0.5, 1);
  application.stage.addChild(playerCommittedText);

  const toActText = new Text({
    text: '',
    style: {
      fontFamily: 'system-ui, sans-serif',
      fontSize: 13,
      fill: 0x86efac,
      fontWeight: '700',
      letterSpacing: 1,
    },
  });
  toActText.anchor.set(0.5, 0.5);
  application.stage.addChild(toActText);

  const cardLayer = new Container();
  application.stage.addChild(cardLayer);

  scene = {
    felt,
    potText,
    stageText,
    playerStackText,
    aiStackText,
    playerCommittedText,
    aiCommittedText,
    toActText,
    cardLayer,
  };

  resizeObserver = new ResizeObserver(() => {
    drawScene();
  });
  resizeObserver.observe(containerRef.value);

  drawScene();
}

function drawCard(
  parent: Container,
  card: Card | null,
  x: number,
  y: number,
  cardW: number,
  cardH: number,
  faceDown = false,
) {
  const container = new Container();
  container.x = x;
  container.y = y;

  drawDropShadow(container, { w: cardW, h: cardH });

  const cardLayer = new Container();
  container.addChild(cardLayer);
  if (faceDown || !card) {
    drawCardBack(cardLayer, { w: cardW, h: cardH });
  } else {
    drawCardFace(cardLayer, card, { w: cardW, h: cardH });
  }

  parent.addChild(container);
}

function drawScene() {
  if (!app || !scene) return;
  const w = app.renderer.width / app.renderer.resolution;
  const h = app.renderer.height / app.renderer.resolution;
  const layout = computeCardLayout(w);

  // Felt
  scene.felt.clear();
  scene.felt
    .roundRect(8, 8, w - 16, h - 16, 24)
    .fill(0x0e5237)
    .stroke({ color: 0x07261b, width: 4 });
  // Inner ring
  scene.felt
    .roundRect(28, 28, w - 56, h - 56, 18)
    .stroke({ color: 0x166644, width: 2, alpha: 0.6 });

  scene.stageText.text = props.state.stage.toUpperCase();
  scene.stageText.x = w / 2;
  scene.stageText.y = 40;

  scene.potText.text = `POT: ${props.state.pot}`;
  scene.potText.x = w / 2;
  scene.potText.y = h / 2 + 90;

  scene.aiStackText.text = `AI — ${props.state.ai.chips} chips`;
  scene.aiStackText.x = w / 2;
  scene.aiStackText.y = 70;

  if (props.state.ai.committed > 0) {
    scene.aiCommittedText.text = `bet: ${props.state.ai.committed}`;
    scene.aiCommittedText.visible = true;
    scene.aiCommittedText.x = w / 2;
    scene.aiCommittedText.y = 92;
  } else {
    scene.aiCommittedText.visible = false;
  }

  scene.playerStackText.text = `YOU — ${props.state.player.chips} chips`;
  scene.playerStackText.x = w / 2;
  scene.playerStackText.y = h - 70;

  if (props.state.player.committed > 0) {
    scene.playerCommittedText.text = `bet: ${props.state.player.committed}`;
    scene.playerCommittedText.visible = true;
    scene.playerCommittedText.x = w / 2;
    scene.playerCommittedText.y = h - 92;
  } else {
    scene.playerCommittedText.visible = false;
  }

  if (props.state.toAct === 'player') {
    scene.toActText.text = '▶ YOUR TURN';
    scene.toActText.style.fill = 0x86efac;
    scene.toActText.visible = true;
  } else if (props.state.toAct === 'ai') {
    scene.toActText.text = 'AI THINKING…';
    scene.toActText.style.fill = 0xfca5a5;
    scene.toActText.visible = true;
  } else {
    scene.toActText.visible = false;
  }
  scene.toActText.x = w / 2;
  // Position between AI cards and community cards, regardless of card scale.
  scene.toActText.y = h / 2 - layout.h / 2 - 18;

  // PIXI v8: removeChildren() does NOT free the underlying GPU/Geometry — destroy them.
  for (const child of scene.cardLayer.removeChildren()) {
    child.destroy({ children: true });
  }

  const cw = layout.w;
  const ch = layout.h;
  const gap = layout.gap;

  // AI hole cards (top, centered)
  const aiHoleY = 110;
  const aiHoleX0 = w / 2 - cw - gap / 2;
  for (let i = 0; i < 2; i++) {
    const c = props.state.ai.hole[i] ?? null;
    const x = aiHoleX0 + i * (cw + gap);
    drawCard(scene.cardLayer, c, x, aiHoleY, cw, ch, !props.revealAi);
  }

  // Community cards (center)
  const communityY = h / 2 - ch / 2;
  const communityX0 = w / 2 - (cw * 5 + gap * 4) / 2;
  for (let i = 0; i < 5; i++) {
    const c = props.state.community[i] ?? null;
    const x = communityX0 + i * (cw + gap);
    if (c) {
      drawCard(scene.cardLayer, c, x, communityY, cw, ch, false);
    } else {
      const slot = new Container();
      slot.x = x;
      slot.y = communityY;
      drawCardSlot(slot, { w: cw, h: ch });
      scene.cardLayer.addChild(slot);
    }
  }

  // Player hole cards (bottom)
  const playerHoleY = h - ch - 110;
  const playerHoleX0 = w / 2 - cw - gap / 2;
  for (let i = 0; i < 2; i++) {
    const c = props.state.player.hole[i] ?? null;
    const x = playerHoleX0 + i * (cw + gap);
    drawCard(scene.cardLayer, c, x, playerHoleY, cw, ch, false);
  }
}

watch(
  () => [
    props.state.handNumber,
    props.state.stage,
    props.state.pot,
    props.state.toAct,
    props.state.player.committed,
    props.state.ai.committed,
    props.state.player.chips,
    props.state.ai.chips,
    props.state.community.length,
    props.revealAi,
  ],
  () => {
    drawScene();
  },
);

onMounted(() => {
  buildScene();
});

onBeforeUnmount(() => {
  resizeObserver?.disconnect();
  resizeObserver = null;
  if (app) {
    app.destroy(true, { children: true });
    app = null;
  }
  scene = null;
});
</script>

<template>
  <div ref="containerRef" class="poker-table-canvas" />
</template>

<style scoped>
.poker-table-canvas {
  width: 100%;
  height: 600px;
  border-radius: 1rem;
  overflow: hidden;
  background: #07261b;
  box-shadow: 0 20px 60px -20px rgba(0, 0, 0, 0.6);
}

.poker-table-canvas :deep(canvas) {
  display: block;
  width: 100% !important;
  height: 100% !important;
}
</style>
