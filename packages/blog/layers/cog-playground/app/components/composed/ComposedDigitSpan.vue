<script setup lang="ts">
/**
 * Digit Span — forward + backward.
 *
 * Public-domain paradigm (Jacobs 1887). Sequences are generated
 * randomly here — NOT taken from any proprietary battery's items.
 *
 * Rules: one trial per length, start at 3 digits. Correct → advance.
 * Wrong → end this section, record longest correctly completed.
 * Forward up to 8 digits, backward up to 7. Skipping a section records
 * zero for it.
 */
import { TEST_IDS } from '~~/shared/test-ids';

const emit = defineEmits<{ (e: 'submit', forwardSpan: number, backwardSpan: number): void }>();

type Section = 'forward' | 'backward';
type Phase = 'show' | 'input' | 'done';

const MAX_FORWARD = 8;
const MAX_BACKWARD = 7;
const START_LEN = 3;

const section = ref<Section>('forward');
const phase = ref<Phase>('show');
const currentLength = ref(START_LEN);
const forwardBest = ref(0);
const backwardBest = ref(0);
const sequence = ref<string[]>([]);
const userInput = ref('');
const showSeconds = computed(() => Math.max(2, currentLength.value));
const secondsLeft = ref(0);
let timer: ReturnType<typeof setInterval> | null = null;

function generate(length: number): string[] {
  const out: string[] = [];
  let last = -1;
  for (let i = 0; i < length; i++) {
    let next: number;
    do {
      next = Math.floor(Math.random() * 10);
    } while (next === last); // avoid trivial repeats
    last = next;
    out.push(String(next));
  }
  return out;
}

function startTrial() {
  phase.value = 'show';
  sequence.value = generate(currentLength.value);
  userInput.value = '';
  secondsLeft.value = showSeconds.value;
  if (timer) clearInterval(timer);
  timer = setInterval(() => {
    if (secondsLeft.value > 0) {
      secondsLeft.value--;
      if (secondsLeft.value === 0) {
        phase.value = 'input';
        if (timer) {
          clearInterval(timer);
          timer = null;
        }
      }
    }
  }, 1000);
}

function expectedAnswer(): string {
  return section.value === 'forward'
    ? sequence.value.join('')
    : [...sequence.value].reverse().join('');
}

function submit() {
  const cleaned = userInput.value.replace(/\D/g, '');
  const correct = cleaned === expectedAnswer();
  if (correct) {
    if (section.value === 'forward') forwardBest.value = currentLength.value;
    else backwardBest.value = currentLength.value;
    const cap = section.value === 'forward' ? MAX_FORWARD : MAX_BACKWARD;
    if (currentLength.value >= cap) {
      advanceSection();
    } else {
      currentLength.value++;
      startTrial();
    }
  } else {
    advanceSection();
  }
}

function advanceSection() {
  if (section.value === 'forward') {
    section.value = 'backward';
    currentLength.value = START_LEN;
    startTrial();
  } else {
    finish();
  }
}

function skipSection() {
  advanceSection();
}

function finish() {
  phase.value = 'done';
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
  emit('submit', forwardBest.value, backwardBest.value);
}

onMounted(startTrial);
onUnmounted(() => {
  if (timer) clearInterval(timer);
});
</script>

<template>
  <UCard>
    <template #header>
      <h2 class="text-xl font-bold text-(--ui-text-highlighted)">
        {{ section === 'forward' ? 'Repeat the numbers' : 'Now reverse them' }}
      </h2>
      <p class="mt-1 text-sm text-(--ui-text-muted)">
        <template v-if="section === 'forward'">
          Watch the digits, then type them back in the same order.
        </template>
        <template v-else>
          Watch the digits, then type them back in
          <strong>reverse</strong> order.
        </template>
        Length: {{ currentLength }} digit<span v-if="currentLength !== 1">s</span>.
      </p>
    </template>

    <div class="min-h-32 py-6">
      <div v-if="phase === 'show'" class="flex flex-col items-center gap-4">
        <div
          class="flex flex-wrap justify-center gap-3 font-mono text-4xl font-bold tabular-nums text-(--ui-text-highlighted)"
        >
          <span v-for="(d, i) in sequence" :key="i">{{ d }}</span>
        </div>
        <p class="text-xs text-(--ui-text-muted)">Disappears in {{ secondsLeft }}s</p>
      </div>

      <div v-else-if="phase === 'input'" class="flex flex-col items-center gap-3">
        <UFormField
          :label="section === 'forward' ? 'Type the digits in order' : 'Type the digits in reverse'"
        >
          <UInput
            v-model="userInput"
            :data-testid="TEST_IDS.COG_PLAYGROUND.COMPOSED.DIGIT_SPAN_INPUT"
            type="text"
            inputmode="numeric"
            autofocus
            class="w-48 text-center font-mono text-2xl"
            @keydown.enter="submit"
          />
        </UFormField>
      </div>
    </div>

    <template #footer>
      <div class="flex flex-wrap items-center gap-3">
        <UButton
          :data-testid="TEST_IDS.COG_PLAYGROUND.COMPOSED.DIGIT_SPAN_SUBMIT"
          :disabled="phase !== 'input' || userInput.length === 0"
          size="lg"
          icon="i-lucide-check"
          label="Submit"
          @click="submit"
        />
        <UButton
          :data-testid="TEST_IDS.COG_PLAYGROUND.COMPOSED.DIGIT_SPAN_SKIP"
          variant="soft"
          color="neutral"
          icon="i-lucide-skip-forward"
          :label="section === 'forward' ? 'Skip forward' : 'Skip backward'"
          @click="skipSection"
        />
      </div>
    </template>
  </UCard>
</template>
