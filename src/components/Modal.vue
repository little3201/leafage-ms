<template>
  <transition name="modal">
    <div
      v-if="visible"
      class="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-60 max-h-screen overflow-auto"
      role="dialog"
      aria-modal="true"
    >
      <div
        class=" bg-white rounded-lg text-left overflow-x-hidden overflow-y-auto max-h-screen md:max-w-lg lg:max-w-2xl my-6"
      >
        <button
          v-if="showClose"
          type="button"
          name="close"
          aria-label="close"
          class="inline-flex items-center justify-center rounded-bl-full bg-gray-400 opacity-70 absolute top-0 right-0 w-12 h-12"
          @click="closeOperation"
        >
          <span class="sr-only">Close</span>
          <XMarkIcon
            class="w-6 h-6 -mt-2 -mr-2"
            aria-hidden="true"
          />
        </button>
        <!-- content -->
        <div class="p-4 ">
          <div class="flex flex-col overflow-x-auto">
            <slot name="content" />
          </div>
        </div>
        <!-- footer -->
        <div class="bg-gray-50 py-3 px-4 sm:flex sm:flex-row-reverse text-sm">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { XMarkIcon } from '@heroicons/vue/24/outline'
defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  showClose: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(["closeAction"]);

const closeOperation = () => {
  emit("closeAction", false);
};
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>