<script setup lang="ts">
definePageMeta({
  layout: 'learn'
})

// Lesson data
const lessons = [
  { id: 1, title: 'Short A (cat, sat)', unlocked: true },
  { id: 2, title: 'Short A (can, man)', unlocked: true },
  { id: 3, title: 'Short E (get, set)', unlocked: true },
  { id: 4, title: 'Short E (bed, red)', unlocked: true },
  { id: 5, title: 'Short I (sit, hit)', unlocked: true }
]

function startLesson(lessonId: number) {
  navigateTo(`/learn/lesson/${lessonId}`)
}
</script>

<template>
  <div class="w-full max-w-4xl mx-auto px-4 py-8">
    <!-- Header -->
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold text-[#1a1a2e] mb-2">
        Learn to Read
      </h1>
      <p class="text-[#1a1a2e]/70">
        Tap a lesson to start
      </p>
    </div>

    <!-- Lesson map -->
    <div class="flex flex-wrap justify-center gap-4">
      <button
        v-for="lesson in lessons"
        :key="lesson.id"
        class="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold transition-all"
        :class="lesson.unlocked
          ? 'bg-white text-[#4a7bc9] shadow-lg hover:scale-110 cursor-pointer'
          : 'bg-white/30 text-[#1a1a2e]/30 cursor-not-allowed'"
        :disabled="!lesson.unlocked"
        :title="lesson.title"
        @click="lesson.unlocked && startLesson(lesson.id)"
      >
        {{ lesson.id }}
      </button>
    </div>

    <!-- Back to main site -->
    <div class="text-center mt-12">
      <NuxtLink
        to="/"
        class="text-[#1a1a2e]/50 hover:text-[#1a1a2e] transition-colors underline"
      >
        Back to main site
      </NuxtLink>
    </div>
  </div>
</template>
