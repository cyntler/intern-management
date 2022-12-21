<script lang="ts" setup>
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/solid';

import InternTable from '@/components/InternTable.vue';
import Button from '@/components/Button.vue';
import { useInternStore } from '@/stores/intern';
import Pagination from '@/components/Pagination.vue';
import { getFullName } from '@/utils/getFullName';
import { INTERNS_PER_PAGE } from '@/consts';

const router = useRouter();
const internStore = useInternStore();
const searchQuery = ref('');

const { interns, page, totalPages } = storeToRefs(internStore);

const filteredInterns = computed(
  () =>
    interns.value
      .filter(
        (intern) =>
          intern.first_name
            .toLocaleLowerCase()
            .includes(searchQuery.value.toLocaleLowerCase()) ||
          intern.last_name
            .toLocaleLowerCase()
            .includes(searchQuery.value.toLocaleLowerCase()) ||
          getFullName(intern.first_name, intern.last_name)
            .toLocaleLowerCase()
            .includes(searchQuery.value.toLocaleLowerCase()),
      )
      .slice(
        (page.value - 1) * INTERNS_PER_PAGE,
        page.value * INTERNS_PER_PAGE,
      ), // pagination
);

const handleNewInternClick = () => {
  router.push('/new');
};

const handlePaginationChange = (newPage: number) => {
  internStore.setPage(newPage);
};
</script>

<template>
  <section class="intern-list">
    <h1>Intern List</h1>
    <div class="content-box">
      <div class="table-top-container">
        <div class="search-container">
          <input
            type="text"
            placeholder="Search for interns..."
            v-model="searchQuery"
            class="search-input"
          />
          <MagnifyingGlassIcon />
        </div>
        <Button
          variant="primary"
          :icon="PlusIcon"
          @click="handleNewInternClick"
        >
          Add intern
        </Button>
      </div>
      <InternTable :interns="filteredInterns" />
    </div>
    <Pagination
      v-if="searchQuery === ''"
      :current-page="page"
      :pages="totalPages"
      class="pagination"
      @on-change="handlePaginationChange"
    />
  </section>
</template>

<style scoped lang="scss">
.table-top-container {
  display: flex;
  margin-bottom: 1rem;
  justify-content: space-between;

  @media (max-width: 590px) {
    flex-direction: column;

    .search-container {
      order: 2;
    }

    button {
      margin-bottom: 1rem;
    }
  }
}

.search-container {
  display: flex;
  align-items: center;
  background-color: var(--color-input);
  border-radius: 14px;
  padding: 0 1rem;
  height: 40px;

  input {
    border: 0;
    background: transparent;
    font-size: 1rem;
    font-family: var(--font-family-default);
    flex: 1;
  }

  svg {
    width: 20px;
    height: 20px;
    fill: var(--color-text);
    margin-left: 0.75rem;
  }
}

.pagination {
  margin-top: 2rem;
}
</style>
