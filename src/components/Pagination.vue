<script setup lang="ts">
defineProps<{
  currentPage: number;
  pages: number;
}>();

const emit = defineEmits(['onChange']);
</script>

<template>
  <div class="pagination-container">
    <button
      class="page"
      :disabled="currentPage <= 1"
      @click="() => emit('onChange', currentPage - 1)"
    >
      «
    </button>
    <button
      v-for="page in [...Array(pages).keys()]"
      :key="page"
      class="page"
      :class="{ active: currentPage === page + 1 }"
      @click="() => emit('onChange', page + 1)"
    >
      {{ page + 1 }}
    </button>
    <button
      class="page"
      :disabled="currentPage + 1 > pages"
      @click="() => emit('onChange', currentPage + 1)"
    >
      »
    </button>
  </div>
</template>

<style scoped lang="scss">
.pagination-container {
  display: flex;

  .page {
    min-width: 30px;
    height: 30px;
    margin-right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    background: var(--color-white);
    cursor: pointer;
    border: 0;
    box-shadow: var(--shadow-default);
    font-weight: bold;
    font-size: 0.75rem;

    &:disabled {
      cursor: default;
    }
  }

  .active {
    background-color: var(--color-primary);
    color: var(--color-white);
    cursor: default;
  }
}
</style>
