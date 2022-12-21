<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';

import Preloader from './components/Preloader.vue';
import { useInternStore } from './stores/intern';

const internStore = useInternStore();
const { isFetching } = storeToRefs(internStore);

onMounted(() => {
  internStore.fetchInterns();
});
</script>

<template>
  <Preloader v-if="isFetching" />
  <RouterView v-else />
</template>
