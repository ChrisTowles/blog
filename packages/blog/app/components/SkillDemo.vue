<script setup lang="ts">
/**
 * SkillDemo — Step-driven interactive demo showing how Claude Code Skills work.
 *
 * Usage in MDC markdown:
 *   ::skill-demo
 *   ::
 *
 * Steps:
 * 1. User sees a prompt + generic Claude response
 * 2. User fills in a SKILL.md with their company-specific knowledge
 * 3. User drags the SKILL.md file into the .claude/skills/ folder
 * 4. Same prompt reruns — Claude now uses the skill and responds with their knowledge
 */

const step = ref(1)
const isAnimating = ref(false)
const skillInstalled = ref(false)
const showEnhancedResponse = ref(false)

// User-editable fields for the skill
const companyName = ref('Acme Corp')
const deployProcess = ref('run the full integration test suite, get sign-off from the on-call engineer, then deploy to canary (10% traffic) for 30 minutes before full rollout')

// Drag state
const isDragOver = ref(false)

const skillMdContent = computed(() => {
  return `---
name: deploy-checklist
description: "${companyName.value} production deployment process and checklist"
---

# Deploy Checklist

When deploying to production at ${companyName.value}, we always ${deployProcess.value}.

## Pre-deploy
- Run \`pnpm test:integration\`
- Check that staging passed all smoke tests
- Confirm the on-call engineer is available

## Deploy
- Use \`pnpm deploy:canary\` first (10% traffic)
- Monitor error rates for 30 minutes
- If clean, run \`pnpm deploy:full\``
})

function advanceStep(target: number) {
  if (isAnimating.value) return
  step.value = target
}

function handleDragStart(e: DragEvent) {
  e.dataTransfer?.setData('text/plain', 'SKILL.md')
  if (e.dataTransfer) {
    e.dataTransfer.effectAllowed = 'move'
  }
}

function handleDragOver(e: DragEvent) {
  e.preventDefault()
  if (e.dataTransfer) {
    e.dataTransfer.dropEffect = 'move'
  }
  isDragOver.value = true
}

function handleDragLeave() {
  isDragOver.value = false
}

function handleDrop(e: DragEvent) {
  e.preventDefault()
  isDragOver.value = false
  installSkill()
}

function installSkill() {
  if (skillInstalled.value) return
  isAnimating.value = true
  skillInstalled.value = true

  setTimeout(() => {
    isAnimating.value = false
    step.value = 4
  }, 600)
}

function rerunPrompt() {
  isAnimating.value = true
  showEnhancedResponse.value = false

  setTimeout(() => {
    showEnhancedResponse.value = true
    isAnimating.value = false
  }, 1200)
}

function resetDemo() {
  step.value = 1
  skillInstalled.value = false
  showEnhancedResponse.value = false
  isAnimating.value = false
}

const stepLabels = ['Ask Claude', 'Write skill', 'Install skill', 'Ask again']
</script>

<template>
  <div class="my-8 rounded-lg border border-zinc-700 bg-zinc-900/50 overflow-hidden">
    <!-- Header -->
    <div class="flex items-center justify-between px-4 py-2.5 border-b border-zinc-800 bg-zinc-900">
      <div class="flex items-center gap-2">
        <UIcon name="i-lucide-graduation-cap" class="size-4 text-sky-400" />
        <span class="text-sm font-medium text-zinc-200">Interactive: How Skills Work</span>
      </div>
      <button
        v-if="step > 1"
        class="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
        @click="resetDemo"
      >
        Reset
      </button>
    </div>

    <!-- Step indicator -->
    <div class="flex items-center gap-1 px-4 py-3 border-b border-zinc-800 bg-zinc-950/50">
      <template v-for="(label, i) in stepLabels" :key="i">
        <button
          class="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs transition-all"
          :class="{
            'bg-sky-500/20 text-sky-300 font-medium': step === i + 1,
            'text-zinc-300': step > i + 1 && step !== i + 1,
            'text-zinc-600': step < i + 1,
          }"
          :disabled="i + 1 > step"
          @click="advanceStep(i + 1)"
        >
          <span
            class="flex items-center justify-center size-4 rounded-full text-[10px] font-bold border"
            :class="{
              'border-sky-400 bg-sky-500/20 text-sky-300': step === i + 1,
              'border-zinc-500 bg-zinc-700 text-zinc-300': step > i + 1 && step !== i + 1,
              'border-zinc-700 text-zinc-600': step < i + 1,
            }"
          >
            <UIcon v-if="step > i + 1" name="i-lucide-check" class="size-3" />
            <span v-else>{{ i + 1 }}</span>
          </span>
          <span class="hidden sm:inline">{{ label }}</span>
        </button>
        <UIcon
          v-if="i < stepLabels.length - 1"
          name="i-lucide-chevron-right"
          class="size-3 text-zinc-700"
        />
      </template>
    </div>

    <!-- Step 1: Ask Claude without a skill -->
    <div v-if="step === 1" class="p-4 space-y-4">
      <p class="text-sm text-zinc-400">
        You ask Claude Code to help with a deployment. Without any skills, it gives a reasonable but generic answer.
      </p>

      <!-- Terminal simulation -->
      <div class="rounded-md border border-zinc-800 bg-zinc-950 overflow-hidden">
        <div class="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 border-b border-zinc-800">
          <span class="size-2.5 rounded-full bg-red-500/70" />
          <span class="size-2.5 rounded-full bg-yellow-500/70" />
          <span class="size-2.5 rounded-full bg-green-500/70" />
          <span class="text-[10px] text-zinc-600 ml-2">claude</span>
        </div>

        <div class="p-4 font-mono text-sm space-y-3">
          <div class="flex gap-2">
            <span class="text-sky-400 shrink-0">&gt;</span>
            <span class="text-zinc-200">How should I deploy this service to production?</span>
          </div>

          <div class="pl-4 border-l-2 border-zinc-800 space-y-2">
            <p class="text-zinc-400">Here's a general production deployment approach:</p>
            <p class="text-zinc-500">1. Run your test suite</p>
            <p class="text-zinc-500">2. Build the production artifacts</p>
            <p class="text-zinc-500">3. Deploy to your hosting provider</p>
            <p class="text-zinc-500">4. Verify the deployment is healthy</p>
            <p class="text-zinc-500">5. Monitor for errors</p>
            <p class="text-zinc-600 text-xs mt-2 italic">
              ...correct but generic. It doesn't know YOUR process.
            </p>
          </div>
        </div>
      </div>

      <div class="flex justify-end">
        <UButton
          size="sm"
          color="primary"
          variant="solid"
          label="Next: Write a skill"
          trailing-icon="i-lucide-arrow-right"
          @click="advanceStep(2)"
        />
      </div>
    </div>

    <!-- Step 2: Write the SKILL.md -->
    <div v-if="step === 2" class="p-4 space-y-4">
      <p class="text-sm text-zinc-400">
        Now encode your team's deployment process into a skill.
        Edit the fields below — this is YOUR knowledge that Claude doesn't have.
      </p>

      <div class="rounded-md border border-zinc-800 bg-zinc-950 overflow-hidden">
        <!-- File tab -->
        <div class="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 border-b border-zinc-800">
          <UIcon name="i-lucide-file-text" class="size-3.5 text-sky-400" />
          <span class="text-xs text-zinc-300 font-mono">SKILL.md</span>
          <span class="text-[10px] text-zinc-600 ml-auto">edit your company's process</span>
        </div>

        <div class="p-4 font-mono text-sm space-y-3">
          <!-- Frontmatter -->
          <div class="text-zinc-600">---</div>
          <div class="flex flex-wrap items-center gap-1">
            <span class="text-purple-400">name:</span>
            <span class="text-emerald-400">deploy-checklist</span>
          </div>
          <div class="flex flex-wrap items-start gap-1">
            <span class="text-purple-400 shrink-0">description:</span>
            <span class="text-zinc-500">"</span>
            <input
              v-model="companyName"
              class="bg-zinc-800 border border-zinc-700 rounded px-1.5 py-0.5 text-amber-300 text-sm font-mono w-28 focus:outline-none focus:border-sky-500"
              placeholder="Company"
            >
            <span class="text-emerald-400">production deployment process</span>
            <span class="text-zinc-500">"</span>
          </div>
          <div class="text-zinc-600">---</div>

          <!-- Body -->
          <div class="mt-2">
            <span class="text-zinc-500"># Deploy Checklist</span>
          </div>
          <div class="mt-2 flex flex-wrap items-start gap-1">
            <span class="text-zinc-400">When deploying to production at</span>
            <span class="text-amber-300 font-medium">{{ companyName }}</span>
            <span class="text-zinc-400">, we always</span>
          </div>
          <textarea
            v-model="deployProcess"
            rows="3"
            class="w-full bg-zinc-800 border border-zinc-700 rounded px-2 py-1.5 text-amber-300 text-sm font-mono focus:outline-none focus:border-sky-500 resize-none"
            placeholder="describe your specific deployment process..."
          />
        </div>
      </div>

      <div class="flex justify-end">
        <UButton
          size="sm"
          color="primary"
          variant="solid"
          label="Next: Install the skill"
          trailing-icon="i-lucide-arrow-right"
          @click="advanceStep(3)"
        />
      </div>
    </div>

    <!-- Step 3: Drag into .claude/skills/ -->
    <div v-if="step === 3" class="p-4 space-y-4">
      <p class="text-sm text-zinc-400">
        Drag your SKILL.md into the <code class="text-sky-400 text-xs bg-zinc-800 px-1 py-0.5 rounded">.claude/skills/</code> folder.
        That's all it takes — Claude discovers it automatically.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 min-h-[180px]">
        <!-- Draggable SKILL.md file -->
        <div class="flex flex-col items-center justify-center">
          <div
            v-if="!skillInstalled"
            draggable="true"
            class="cursor-grab active:cursor-grabbing select-none rounded-md border border-zinc-700 bg-zinc-800 px-4 py-3 flex items-center gap-3 hover:border-sky-500/50 hover:bg-zinc-800/80 transition-all shadow-lg hover:shadow-sky-500/10"
            @dragstart="handleDragStart"
          >
            <UIcon name="i-lucide-file-text" class="size-8 text-sky-400" />
            <div>
              <div class="text-sm font-mono text-zinc-200">SKILL.md</div>
              <div class="text-[10px] text-zinc-500">deploy-checklist</div>
            </div>
            <UIcon name="i-lucide-grip-vertical" class="size-4 text-zinc-600 ml-2" />
          </div>
          <div v-else class="text-sm text-zinc-600 italic flex items-center gap-2">
            <UIcon name="i-lucide-check-circle" class="size-4 text-emerald-500" />
            Installed
          </div>
        </div>

        <!-- Drop target: .claude/skills/ folder -->
        <div
          class="rounded-md border-2 border-dashed transition-all flex flex-col items-center justify-center p-4"
          :class="{
            'border-sky-500 bg-sky-500/10': isDragOver,
            'border-zinc-700 bg-zinc-900/50': !isDragOver && !skillInstalled,
            'border-emerald-500/50 bg-emerald-500/5': skillInstalled,
          }"
          @dragover="handleDragOver"
          @dragleave="handleDragLeave"
          @drop="handleDrop"
        >
          <UIcon
            :name="skillInstalled ? 'i-lucide-folder-check' : 'i-lucide-folder-open'"
            class="size-10 mb-2"
            :class="{
              'text-sky-400 animate-pulse': isDragOver,
              'text-zinc-600': !isDragOver && !skillInstalled,
              'text-emerald-500': skillInstalled,
            }"
          />
          <span class="font-mono text-xs text-zinc-400">.claude/skills/</span>
          <span v-if="!skillInstalled" class="text-[10px] text-zinc-600 mt-1">
            {{ isDragOver ? 'Release to install' : 'Drop skill here' }}
          </span>

          <!-- Show installed file -->
          <div
            v-if="skillInstalled"
            class="mt-2 rounded border border-emerald-500/30 bg-zinc-800/50 px-2 py-1 flex items-center gap-2"
          >
            <UIcon name="i-lucide-file-text" class="size-3.5 text-emerald-400" />
            <span class="text-xs font-mono text-emerald-300">deploy-checklist/SKILL.md</span>
          </div>
        </div>
      </div>

      <!-- Mobile fallback: click button instead of drag -->
      <div v-if="!skillInstalled" class="flex justify-center md:hidden">
        <UButton
          size="sm"
          color="primary"
          variant="outline"
          icon="i-lucide-folder-input"
          label="Install skill"
          @click="installSkill"
        />
      </div>
    </div>

    <!-- Step 4: Rerun the same prompt -->
    <div v-if="step === 4" class="p-4 space-y-4">
      <p class="text-sm text-zinc-400">
        Now ask the exact same question. Claude discovers your skill, loads it, and responds with YOUR process.
      </p>

      <div class="rounded-md border border-zinc-800 bg-zinc-950 overflow-hidden">
        <div class="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 border-b border-zinc-800">
          <span class="size-2.5 rounded-full bg-red-500/70" />
          <span class="size-2.5 rounded-full bg-yellow-500/70" />
          <span class="size-2.5 rounded-full bg-green-500/70" />
          <span class="text-[10px] text-zinc-600 ml-2">claude</span>
        </div>

        <div class="p-4 font-mono text-sm space-y-3">
          <div class="flex gap-2">
            <span class="text-sky-400 shrink-0">&gt;</span>
            <span class="text-zinc-200">How should I deploy this service to production?</span>
          </div>

          <div v-if="!showEnhancedResponse && !isAnimating" class="flex justify-center py-4">
            <UButton
              size="sm"
              color="primary"
              variant="solid"
              icon="i-lucide-play"
              label="Run"
              @click="rerunPrompt"
            />
          </div>

          <!-- Loading animation -->
          <div v-if="isAnimating" class="pl-4 border-l-2 border-sky-500/30 space-y-2 py-2">
            <div class="flex items-center gap-2 text-sky-400 text-xs">
              <div class="size-2 rounded-full bg-sky-400 animate-pulse" />
              Reading skill: deploy-checklist/SKILL.md...
            </div>
          </div>

          <!-- Enhanced response -->
          <div
            v-if="showEnhancedResponse"
            class="pl-4 border-l-2 border-emerald-500/30 space-y-2"
          >
            <div class="flex items-center gap-1.5 text-emerald-400 text-xs mb-2">
              <UIcon name="i-lucide-sparkles" class="size-3" />
              Using skill: deploy-checklist
            </div>
            <p class="text-zinc-300">
              I found a deployment skill for <span class="text-amber-300 font-medium">{{ companyName }}</span>. Here's the process:
            </p>
            <p class="text-zinc-300">
              At <span class="text-amber-300 font-medium">{{ companyName }}</span>, we always
              <span class="text-amber-300">{{ deployProcess }}</span>.
            </p>
            <p class="text-zinc-400 mt-1">Let me walk through this step by step:</p>
            <p class="text-zinc-400">
              <span class="text-emerald-400">1.</span> Running <code class="text-sky-300 text-xs bg-zinc-800 px-1 rounded">pnpm test:integration</code>...
            </p>
            <p class="text-zinc-400">
              <span class="text-emerald-400">2.</span> Checking staging smoke tests...
            </p>
            <p class="text-zinc-400">
              <span class="text-emerald-400">3.</span> Confirming on-call engineer availability...
            </p>
            <p class="text-zinc-400">
              <span class="text-emerald-400">4.</span> Deploying to canary (10% traffic) with <code class="text-sky-300 text-xs bg-zinc-800 px-1 rounded">pnpm deploy:canary</code>
            </p>
            <p class="text-zinc-600 text-xs mt-3 italic">
              ...your specific process, not a generic checklist.
            </p>
          </div>
        </div>
      </div>

      <div v-if="showEnhancedResponse" class="flex justify-end">
        <button
          class="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
          @click="resetDemo"
        >
          Try again with different values
        </button>
      </div>
    </div>
  </div>
</template>
