<script setup lang="ts">
import AppButton from './AppButton.vue'

defineProps<{
  letter: string
  variant: string
  userAnswer: string | null
  correctAnswer: string
}>()

const emit = defineEmits<{ answer: [letter: string] }>()
</script>

<template>
  <AppButton
    :data-correct="
      (userAnswer && userAnswer === letter && userAnswer === correctAnswer) ||
      (userAnswer && userAnswer !== correctAnswer && letter === correctAnswer)
    "
    :data-incorrect="userAnswer && userAnswer === letter && userAnswer !== correctAnswer"
    :disabled="!!userAnswer"
    @click="emit('answer', letter)"
  >
    {{ letter }}. {{ variant }}
  </AppButton>
</template>

<style scoped>
[data-correct='true'] {
  --border: var(--correct);
}

[data-incorrect='true'] {
  --border: var(--wrong);
}
</style>
