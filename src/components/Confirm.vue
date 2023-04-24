<template>
  <Modal
    :visible="visible"
  >
    <template #content>
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
    </template>
    <template #footer>
      <button
        type="submit"
        name="confirm"
        aria-label="confirm"
        class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 font-medium text-white focus:outline-none focus:ring-1 focus:ring-offset-2 sm:ml-3 sm:w-auto active:cursor-wait bg-red-600 hover:bg-red-700 focus:ring-red-500"
      >
        {{ $t('confirm') }}
      </button>
      <button
        type="button"
        name="cancle"
        aria-label="cancle"
        class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-blue-600 sm:mt-0 sm:ml-3 sm:w-auto active:cursor-wait"
      >
        {{
          $t('cancle')
        }}
      </button>
    </template>
  </Modal>
</template>

<script lang="ts" setup>
import Modal from "~/components/Modal.vue";
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline'

defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});

</script>