<template>
  <div
    v-if="account.username && account.username.length > 0"
    class="flex justify-center items-center text-sm"
  >
    <slot />
    <button
      v-if="needEdit"
      name="edit"
      aria-label="edit"
      type="button"
      class="flex items-center mr-3 focus:outline-none"
      @click="$emit('editAction', true)"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="mr-1"
      >
        <use :xlink:href="'/svg/feather-sprite.svg#' + 'edit-3'" />
      </svg>
      {{ $t('edit') }}
    </button>
    <button
      v-if="needDel"
      type="button"
      name="del"
      aria-label="del"
      class="flex items-center text-red-600 focus:outline-none"
      @click="$emit('delAction', true)"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="mr-1"
      >
        <use :xlink:href="'/svg/feather-sprite.svg#' + 'trash-2'" />
      </svg>
      {{ $t('delete') }}
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

import type { Account } from '@/api/request.type';

defineProps({
  needEdit: {
    type: Boolean,
    default: true,
  },
  needDel: {
    type: Boolean,
    default: true,
  },
});

defineEmits(['editAction', 'delAction']);

const account = ref<Account>({
  username: '',
  nickname: '',
  avatar: ''
});

onMounted(() => {
  let data = sessionStorage.getItem('account');
  if (data && data !== 'undefined') {
    account.value = JSON.parse(data);
  }
});
</script>
