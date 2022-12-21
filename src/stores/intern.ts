import { computed, ref, watch } from 'vue';
import { defineStore } from 'pinia';

import { fetchApi } from '@/utils/fetchApi';
import type {
  AddInternResponse,
  EditInternResponse,
  Intern,
  InternResponse,
} from '@/models';
import { INTERNS_PER_PAGE } from '@/consts';

export const useInternStore = defineStore('intern', () => {
  const isFetching = ref(true);
  const interns = ref<Intern[]>([]);
  const page = ref(1);
  const totalPages = computed(() =>
    Math.ceil(interns.value.length / INTERNS_PER_PAGE),
  );

  watch(totalPages, () => {
    if (page.value > totalPages.value) {
      page.value = totalPages.value;
    }
  });

  const fetchInterns = async () => {
    isFetching.value = true;
    const response = await fetchApi<InternResponse>(`/users?per_page=999`);
    isFetching.value = false;
    interns.value = response.data;
  };

  const setPage = (newPage: number) => {
    page.value = newPage;
  };

  const getIntentById = (id: number) =>
    interns.value.find((intent) => intent.id === id);

  const addIntern = async (intern: Omit<Intern, 'id'>) => {
    const response = await fetchApi<AddInternResponse>(`/users`, {
      method: 'POST',
      data: intern,
    });

    interns.value = [
      ...interns.value,
      {
        ...intern,
        id: parseInt(response.id, 10),
      },
    ];
  };

  const updateIntern = async (
    id: number,
    updatedIntern: Omit<Intern, 'id'>,
  ) => {
    await fetchApi<EditInternResponse>(`/users/${id}`, {
      method: 'PUT',
      data: updatedIntern,
    });

    interns.value = interns.value.map((intern) => {
      if (intern.id === id) {
        return {
          ...intern,
          ...updatedIntern,
        };
      }

      return intern;
    });
  };

  const removeIntern = async (id: number) => {
    await fetchApi(`/users/${id}`, {
      method: 'DELETE',
    });

    interns.value = interns.value.filter((intern) => intern.id !== id);
  };

  return {
    isFetching,
    interns,
    page,
    totalPages,
    fetchInterns,
    getIntentById,
    setPage,
    addIntern,
    updateIntern,
    removeIntern,
  };
});
