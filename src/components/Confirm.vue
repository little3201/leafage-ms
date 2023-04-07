<template>
  <Modal
    :is-show="isShow"
    :is-confirm="true"
    @cancel-action="$emit('cancelAction', false)"
    @commit-action="$emit('commitAction')"
  >
    <div class="sm:flex">
      <span
        class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10 text-red-600"
      >
        <ExclamationTriangleIcon
          class="w-7 h-7"
          aria-hidden="true"
        />
      </span>

      <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
        <h3
          id="modal-headline"
          class="text-lg leading-6 font-medium text-gray-900"
        >
          {{ $t('deletion') }}
        </h3>
        <div class="mt-2">
          <p class="text-sm text-gray-500">
            {{ $t('note') }}
          </p>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script lang="ts" setup>
import Modal from "~/components/Modal.vue";
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline'

defineProps({
  isShow: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['cancelAction', 'commitAction'])
</script>