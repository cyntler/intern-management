<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';

import BackButton from '@/components/BackButton.vue';
import InternForm from '@/components/InternForm.vue';
import { useInternStore } from '@/stores/intern';
import DeleteButton from '@/components/DeleteButton.vue';

const route = useRoute();
const internStore = useInternStore();
const router = useRouter();

const id = parseInt(route.params.id as string, 10);

const handleSubmit = async (
  firstName: string,
  lastName: string,
  avatar: string,
) => {
  await internStore.updateIntern(id, {
    first_name: firstName,
    last_name: lastName,
    avatar,
  });

  router.push('/');
};
</script>

<template>
  <section class="intern-add-new">
    <h1>
      <BackButton />
      <span>Edit intern</span>
      <DeleteButton :id="id" />
    </h1>
    <h2>Update the form below to edit intern.</h2>
    <InternForm :id="id" @submit="handleSubmit" />
  </section>
</template>
