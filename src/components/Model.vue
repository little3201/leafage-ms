<template>
  <transition name="modal">
    <div v-show="isShow"
      class="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-60 max-h-screen overflow-auto"
      role="dialog" aria-modal="true">
      <div
        class=" bg-white rounded-lg text-left overflow-x-hidden overflow-y-auto max-h-screen md:max-w-lg lg:max-w-2xl my-6">
        <button v-if="!needFooter" type="button" @click="closeOperation"
          class="inline-flex items-center justify-center rounded-bl-full bg-gray-400 opacity-70 absolute top-0 right-0 w-12 h-12">
          <span class="sr-only">Close</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round" class="-mt-2 -mr-2">
            <use :xlink:href="'/svg/feather-sprite.svg#' + 'x'" />
          </svg>
        </button>
        <!-- content -->
        <div class="p-4 ">
          <div class="flex overflow-x-auto">
            <slot></slot>
          </div>
        </div>
        <!-- footer -->
        <div v-if="needFooter" class="bg-gray-50 py-3 px-4 sm:flex sm:flex-row-reverse text-sm">
          <button type="button" @click="commitOperation"
            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 font-medium text-white focus:outline-none focus:ring-1 focus:ring-offset-2 sm:ml-3 sm:w-auto active:cursor-wait"
            :class="[
              isConfirm
                ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
                : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
            ]">{{ isConfirm ? $t('confirm') : $t('commit') }}</button>
          <button type="button" @click="cancelOperation"
            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-blue-600 sm:mt-0 sm:ml-3 sm:w-auto active:cursor-wait">{{
              $t('cancle')
            }}</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
defineProps({
  isShow: {
    type: Boolean,
    default: false,
  },
  isConfirm: {
    type: Boolean,
    default: false,
  },
  needFooter: {
    type: Boolean,
    default: true,
  }
});

const emit = defineEmits(["cancelAction", "commitAction", "closeAction"]);

const cancelOperation = () => {
  emit("cancelAction", false);
};

const commitOperation = () => {
  emit("commitAction");
};

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