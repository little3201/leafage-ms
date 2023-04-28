<template>
  <div
    v-if="isLogin"
    class="flex justify-center items-center text-sm"
  >
    <slot />
    <button
      v-if="editable"
      name="edit"
      aria-label="edit"
      type="button"
      class="flex items-center mr-3 focus:outline-none"
      @click="$emit('edit', true)"
    >
      <PencilSquareIcon
        class="w-4 h-4 mr-1"
        aria-hidden="true"
      />
      {{ $t('edit') }}
    </button>
    <button
      v-if="removeable"
      type="button"
      name="del"
      aria-label="del"
      class="flex items-center text-red-600 focus:outline-none"
      @click="$emit('del', true)"
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
import { getCookie } from '~/composables/cookies';
import { PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/outline'

defineProps({
  editable: {
    type: Boolean,
    default: false,
  },
  removeable: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['edit', 'del']);

const isLogin = ref(false);

onMounted(() => {
  const username = getCookie('username');
  if (username && username.length > 0) {
    isLogin.value = true;
  }
});
</script>
