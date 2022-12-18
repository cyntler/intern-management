import { ref } from 'vue';
import { defineStore } from 'pinia';

import { fetchApi } from '@/utils/fetchApi';
import type { Intern, InternResponse } from '@/models';

export const useInternStore = defineStore('intern', () => {
  const interns = ref<Intern[]>([]);
  const page = ref(1);
  const totalPages = ref(0);

  const fetchInterns = async () => {
    const response = (await fetchApi('/users')) as InternResponse;

    interns.value = response.data;
    page.value = response.page;
    totalPages.value = response.total_pages;
  };

  return { interns, fetchInterns };
});
