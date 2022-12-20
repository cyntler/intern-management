import { ref } from 'vue';
import { defineStore } from 'pinia';

import { fetchApi } from '@/utils/fetchApi';
import type { Intern, InternResponse } from '@/models';

export const useInternStore = defineStore('intern', () => {
  const isFetching = ref(true);
  const interns = ref<Intern[]>([]);
  const page = ref(1);
  const totalPages = ref(0);

  const fetchInterns = async () => {
    const response: InternResponse = await fetchApi(
      `/users?page=${page.value}`,
    );

    isFetching.value = false;
    interns.value = response.data;
    page.value = response.page;
    totalPages.value = response.total_pages;
  };

  const getIntentById = (id: number) =>
    interns.value.find((intent) => intent.id === id);

  return { isFetching, interns, page, totalPages, fetchInterns, getIntentById };
});
