<template>
  <div
    v-if="user.username && user.username.length > 0"
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
      <PencilSquareIcon
        class="w-4 h-4 mr-1"
        aria-hidden="true"
      />
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
      <TrashIcon
        class="w-4 h-4 mr-1"
        aria-hidden="true"
      />
      {{ $t('delete') }}
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

import type { User } from '~/api/request.type';
import { PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/outline'

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

const user = ref<User>({
  username: '',
  nickname: '',
  avatar: '',
  enabled: true,
  accountExpiresAt: '',
  accountLocked: false,
  credentialsExpiresAt: ''
});

onMounted(() => {
  let data = sessionStorage.getItem('user');
  if (data && data !== 'undefined') {
    user.value = JSON.parse(data);
  }
});
</script>
