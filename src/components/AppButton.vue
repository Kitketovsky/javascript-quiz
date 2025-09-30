<script setup lang="ts"></script>

<template>
  <button>
    <slot />
  </button>
</template>

<style scoped>
button {
  --borderSize: 1.5px;
  --shadowSize: calc(var(--borderSize) * 2);
  --transform: calc(var(--shadowSize) * -1);

  padding: 1rem;
  border: var(--borderSize) solid var(--border);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  white-space: pre-wrap;
  background-color: #ffffff;
  appearance: none;
  font-family: inherit;

  box-shadow: var(--borderSize) var(--borderSize) 0px 0px var(--border);

  &:disabled {
    cursor: not-allowed;
    color: inherit;
  }

  &:not(:disabled):hover {
    transform: translate(var(--transform), var(--transform));
    box-shadow: var(--shadowSize) var(--shadowSize) 0px 0px var(--border);
  }
}
</style>
