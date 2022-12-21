<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  type: string;
  label?: string;
  name: string;
  modelValue: string;
  required?: boolean;
}>();

const emit = defineEmits(['update:modelValue']);

const id = computed(() => `${props.name}-text-field`);

const updateValue = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLInputElement)?.value);
};
</script>

<template>
  <div class="text-field">
    <label :for="id" v-if="label">{{ label }}</label>
    <input
      :id="id"
      :name="name"
      :value="modelValue"
      @input="updateValue"
      :required="required"
    />
  </div>
</template>

<style scoped lang="scss">
div.text-field {
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;

  label {
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    display: block;
    margin-bottom: 0.25rem;
  }

  &:last-of-type {
    margin-bottom: 0;
  }

  input {
    font-family: var(--font-family-default);
    font-size: 1rem;
    height: 38px;
    border: 0;
    border-radius: 4px;
    background-color: var(--color-input);
    padding: 0 0.5rem;
  }
}
</style>
