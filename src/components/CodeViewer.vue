<script setup lang="ts">
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'

defineProps<{
  code: string
}>()
</script>

<!-- TODO: move all replace logic to parsing -->

<template>
  <pre>
          <code class="hljs" v-html="hljs.highlight(code
              .replace(/```javascript/, '')
              .replace(/```/, '')
              .replace(/\n/, ''), { language: 'javascript' }).value"></code>
         </pre>
</template>

<style scoped>
pre {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5rem 0;
  font-size: 1.1rem;

  @media (min-width: 768px) {
    font-size: 1.3rem;
  }
}

.hljs {
  overflow-x: auto;
  background-color: transparent;
  padding: 0;
}
</style>
