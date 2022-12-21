<script setup lang="ts">
import { PencilIcon } from '@heroicons/vue/24/solid';
import { useRouter } from 'vue-router';

import type { Intern } from '@/models';
import { getFullName } from '@/utils/getFullName';
import Button from './Button.vue';
import DeleteButton from './DeleteButton.vue';
import { isValidUrl } from '@/utils/isValidUrl';
import { AVATAR_PLACEHOLDER_SRC } from '@/consts';

defineProps<{
  interns: Intern[];
}>();

const router = useRouter();

const handleEdit = (id: number) => {
  router.push(`/edit/${id}`);
};
</script>

<template>
  <table class="intern-table">
    <thead>
      <tr>
        <th width="15%"></th>
        <th width="60%">Full Name</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="!interns.length">
        <td colspan="3">No interns.</td>
      </tr>
      <tr v-for="intern in interns" :key="intern.id">
        <td>
          <img
            :src="
              isValidUrl(intern.avatar) ? intern.avatar : AVATAR_PLACEHOLDER_SRC
            "
            :alt="getFullName(intern.first_name, intern.last_name)"
            class="avatar"
          />
        </td>
        <td>{{ getFullName(intern.first_name, intern.last_name) }}</td>
        <td>
          <div class="actions-container">
            <Button
              variant="small"
              :icon="PencilIcon"
              @click="() => handleEdit(intern.id)"
            >
              edit
            </Button>
            <DeleteButton :id="intern.id" />
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped lang="scss">
table {
  width: 100%;
  border: 0;
  border-collapse: collapse;
  border-spacing: 0;

  th {
    font-weight: bold;
    text-align: left;
    padding: 0.5rem;
    border-bottom: 1px solid var(--color-divider);
  }

  tr {
    td {
      text-align: left;
      padding: 0.5rem;
    }

    &:first-child {
      td {
        padding-top: 1rem;
      }
    }

    &:nth-child(even) {
      background-color: var(--color-background);

      td:first-child {
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
      }

      td:last-child {
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
      }
    }
  }

  .avatar {
    width: 48px;
    height: 48px;
    border-radius: 100%;
    display: block;
  }

  .actions-container {
    display: flex;
    flex-direction: row;

    @media (max-width: 414px) {
      flex-direction: column;
    }

    button {
      margin-right: 0.5rem;
    }

    .delete-btn {
      background-color: var(--color-warn);

      @media (max-width: 414px) {
        margin-top: 0.25rem;
      }
    }
  }
}
</style>
