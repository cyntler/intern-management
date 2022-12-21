<script setup lang="ts">
import { ArrowLeftIcon } from '@heroicons/vue/24/solid';
import { useRouter } from 'vue-router';

import Button from './Button.vue';

const router = useRouter();

const handleClick = () => {
  router.back();
};
</script>

<template>
  <Button variant="circle" :icon="ArrowLeftIcon" @click="handleClick" />
</template>
