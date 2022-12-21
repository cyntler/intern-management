<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { CheckIcon } from '@heroicons/vue/24/solid';
import { useRouter } from 'vue-router';

import Button from './Button.vue';
import TextField from './TextField.vue';
import { getFullName } from '@/utils/getFullName';
import { isValidUrl } from '@/utils/isValidUrl';
import { useInternStore } from '@/stores/intern';
import { AVATAR_PLACEHOLDER_SRC } from '@/consts';

const props = defineProps<{
  id?: number;
}>();

const emit = defineEmits(['submit']);
const internStore = useInternStore();
const router = useRouter();
const isEdit = typeof props.id === 'number';

const firstName = ref('');
const lastName = ref('');
const avatar = ref('');

onMounted(() => {
  if (!isEdit) {
    return;
  }

  const intern = internStore.getIntentById(props.id);

  if (!intern) {
    router.replace('/');
    return;
  }

  firstName.value = intern.first_name;
  lastName.value = intern.last_name;
  avatar.value = intern.avatar;
});
</script>

<template>
  <div class="intern-form">
    <div class="left-column">
      <div class="content-box">
        <form @submit.prevent="emit('submit', firstName, lastName, avatar)">
          <TextField
            type="text"
            name="first-name"
            label="First name"
            v-model="firstName"
            :required="true"
          />
          <TextField
            type="text"
            name="last-name"
            label="Last name"
            v-model="lastName"
            :required="true"
          />
          <TextField
            type="text"
            name="avatar"
            label="Avatar Image URL"
            v-model="avatar"
          />
          <Button
            type="submit"
            variant="primary"
            :icon="CheckIcon"
            class="save-btn"
          >
            {{ isEdit ? 'Save' : 'Add' }}
          </Button>
        </form>
      </div>
    </div>
    <div class="right-column">
      <div class="content-box preview-container">
        <img
          :src="isValidUrl(avatar) ? avatar : AVATAR_PLACEHOLDER_SRC"
          alt="Avatar Preview"
        />
        <p>{{ getFullName(firstName, lastName) }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
div.intern-form {
  display: flex;
  flex-direction: column;

  .left-column,
  .right-column {
    width: 100%;
    margin-bottom: 2rem;
  }

  .left-column {
    form {
      display: flex;
      flex-direction: column;
    }
  }

  .save-btn {
    margin-top: 2rem;
    align-self: flex-end;
  }

  .preview-container {
    text-align: center;

    img {
      width: 120px;
      height: 120px;
      border-radius: 100%;
      display: inline-block;
      margin: 1rem 0;
    }

    p {
      font-size: 1.5rem;
      word-wrap: break-word;
      max-width: 100%;
    }
  }

  @media (min-width: 900px) {
    flex-direction: row;

    .left-column {
      width: 60%;
      padding-right: 2rem;
    }

    .right-column {
      width: 40%;
    }
  }
}
</style>
