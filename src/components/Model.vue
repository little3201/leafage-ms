<template>
  <transition name="model">
    <div v-show="isShow" class="fixed inset-0 overflow-y-auto" role="dialog">
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity" aria-hidden="true"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle max-w-2xl"
        >
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <slot></slot>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse text-sm">
            <button
              type="button"
              @click="commitOperation"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 font-medium text-white focus:outline-none focus:ring-1 focus:ring-offset-2 sm:ml-3 sm:w-auto active:cursor-wait"
              :class="[
                isConfirm
                  ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
                  : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
              ]"
            >{{ isConfirm ? "确认" : "提交" }}</button>
            <button
              type="button"
              @click="cancelOperation"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-blue-600 sm:mt-0 sm:ml-3 sm:w-auto active:cursor-wait"
            >取消</button>
          </div>
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
});

const emit = defineEmits(["cancelAction", "commitAction"]);

const cancelOperation = () => {
  emit("cancelAction", false);
};

const commitOperation = () => {
  emit("commitAction");
};
</script>

<style scoped>
.model-enter-active,
.model-leave-active {
  transition: opacity 0.3s ease;
}

.model-enter-from,
.model-leave-to {
  opacity: 0;
}
</style>