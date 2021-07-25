<template>
  <div v-show="isShow" class="fixed inset-0 overflow-y-auto" role="dialog">
    <div
      class="
        flex
        items-end
        justify-center
        min-h-screen
        pt-4
        px-4
        pb-20
        text-center
        sm:block
        sm:p-0
      "
    >
      <transition
        enter-active-class="transition ease-out duration-300"
        enter-from-class="transform opacity-0"
        enter-to-class="transform opacity-100"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="transform opacity-100"
        leave-to-class="transform opacity-0"
      >
        <div
          class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          aria-hidden="true"
        ></div>
      </transition>
      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
        >&#8203;</span
      >
      <transition
        enter-active-class="transition ease-out duration-300"
        enter-from-class="transform opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        enter-to-class="transform opacity-100 translate-y-0 sm:scale-100"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="transform opacity-100 translate-y-0 sm:scale-100"
        leave-to-class="transform opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      >
        <div
          class="
            inline-block
            align-bottom
            bg-white
            rounded-lg
            text-left
            overflow-hidden
            shadow-xl
            transform
            transition-all
            sm:my-8
            sm:align-middle
            max-w-2xl
          "
        >
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <slot></slot>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              @click="commitOperation"
              class="
                w-full
                inline-flex
                justify-center
                rounded-md
                border border-transparent
                shadow-sm
                px-4
                py-2
                text-base
                font-medium
                text-white
                focus:outline-none
                focus:ring-1 focus:ring-offset-2
                sm:ml-3
                sm:w-auto
                sm:text-sm
              "
              :class="[
                isConfirm
                  ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
                  : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
              ]"
            >
              {{ isConfirm ? "确认" : "提交" }}
            </button>
            <button
              type="button"
              @click="cancelOperation"
              class="
                mt-3
                w-full
                inline-flex
                justify-center
                rounded-md
                border border-gray-300
                shadow-sm
                px-4
                py-2
                bg-white
                text-base
                font-medium
                text-gray-700
                hover:bg-gray-50
                focus:outline-none
                focus:ring-1 focus:ring-offset-2 focus:ring-indigo-500
                sm:mt-0
                sm:ml-3
                sm:w-auto
                sm:text-sm
              "
            >
              取消
            </button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";

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