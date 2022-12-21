<script setup lang="ts">
import type { Component } from 'vue';

defineProps<{
  variant: 'primary' | 'small' | 'circle';
  icon?: Component;
}>();

const emit = defineEmits(['click']);
</script>

<template>
  <button :class="variant" @click="emit('click')">
    <component v-if="icon" :is="icon" class="icon"></component>
    <slot v-if="variant !== 'circle'" />
  </button>
</template>

<style scoped lang="scss">
button {
  width: auto;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  border: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
  font-weight: bold;
  font-family: var(--font-family-default);

  .icon {
    width: 24px;
    height: 24px;
    fill: var(--color-white);
  }

  &.primary {
    background-color: var(--color-primary);
    color: var(--color-white);
    border-radius: 14px;

    &:hover {
      background-color: var(--color-text);
    }

    .icon {
      margin-right: 0.5rem;
    }
  }

  &.small {
    padding: 0.25rem 0.5rem;
    font-weight: normal;
    font-size: 0.75rem;
    border-radius: 8px;
    background-color: var(--color-text);
    color: var(--color-white);

    .icon {
      width: 14px;
      height: 14px;
      margin-right: 0.25rem;
    }
  }

  &.circle {
    width: 36px;
    height: 36px;
    border-radius: 100%;
    background-color: var(--color-text);
    padding: 0;

    .icon {
      width: 20px;
      height: 20px;
      margin: 0;
    }
  }
}
</style>
