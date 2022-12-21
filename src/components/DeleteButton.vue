<script setup lang="ts">
import { TrashIcon } from '@heroicons/vue/24/solid';
import { useRouter } from 'vue-router';

import { useInternStore } from '@/stores/intern';
import Button from './Button.vue';

const props = defineProps<{
  id: number;
}>();

const router = useRouter();
const internStore = useInternStore();

const handleClick = async () => {
  if (confirm('Are you sure you want to delete this intern?')) {
    await internStore.removeIntern(props.id);
    router.replace('/');
  }
};
</script>

<template>
  <Button
    variant="small"
    :icon="TrashIcon"
    @click="handleClick"
    class="delete-btn"
  >
    delete
  </Button>
</template>

<style scoped lang="scss">
.delete-btn {
  background-color: var(--color-warn) !important;
  margin-right: 0;
}
</style>
