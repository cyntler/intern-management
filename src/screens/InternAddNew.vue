<script lang="ts" setup>
import { useRouter } from 'vue-router';

import BackButton from '@/components/BackButton.vue';
import InternForm from '@/components/InternForm.vue';
import { useInternStore } from '@/stores/intern';

const internStore = useInternStore();
const router = useRouter();

const handleSubmit = async (
  firstName: string,
  lastName: string,
  avatar: string,
) => {
  await internStore.addIntern({
    first_name: firstName,
    last_name: lastName,
    avatar,
  });

  router.push('/');
};
</script>

<template>
  <section class="intern-add-new">
    <h1><BackButton /> Add intern</h1>
    <h2>Complete the form below to add a new intern.</h2>
    <InternForm @submit="handleSubmit" />
  </section>
</template>
