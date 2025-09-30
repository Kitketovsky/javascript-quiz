<script setup lang="ts">
import './global.css'
import VueMarkdown from 'vue-markdown-render'
import jsQuestions from './questions/javascript/js-questions.json'

import { computed, ref } from 'vue'
import AnswerButton from './components/AppAnswerButton.vue'
import AppButton from './components/AppButton.vue'
import CodeViewer from './components/CodeViewer.vue'

const userAnswer = ref<string | null>(null)
const currentQuestionIndex = ref(0)

const nextQuestion = () => {
  currentQuestionIndex.value++
  userAnswer.value = null
}

const currentQuestion = computed(() => jsQuestions[currentQuestionIndex.value])

const handleAnswer = (letter: string) => {
  userAnswer.value = letter
}
</script>

<template>
  <div class="layout">
    <div class="quiz-wrapper">
      <h1>{{ currentQuestion.id }}. {{ currentQuestion.question }}</h1>

      <CodeViewer :code="currentQuestion.code" />

      <div class="variants">
        <AnswerButton
          v-for="variant in currentQuestion.variants"
          :key="variant.variant"
          :letter="variant.letter"
          :variant="variant.variant"
          :userAnswer="userAnswer"
          :correctAnswer="currentQuestion.answer"
          @answer="handleAnswer"
        />
      </div>

      <div v-if="userAnswer === currentQuestion.answer" class="actions">
        <AppButton @click="nextQuestion">Next</AppButton>
      </div>

      <VueMarkdown
        v-if="userAnswer"
        :html="true"
        :source="currentQuestion.explanation.replace(/\n/g, '<br />')"
        :options="{ html: true }"
      />

      <div v-if="userAnswer && userAnswer !== currentQuestion.answer" class="actions">
        <AppButton @click="nextQuestion">Next</AppButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
}

.layout {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem 1rem;
}

.quiz-wrapper {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
}

.variants {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
}

.actions {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
