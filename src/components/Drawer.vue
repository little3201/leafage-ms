<template>
  <transition name="fade">
    <div
      v-if="visible"
      class="absolute inset-0 flex flex-col items-end bg-black bg-opacity-60 h-screen overflow-auto"
      aria-modal="true"
    >
      <div
        class="bg-white overflow-y-auto h-full w-80 px-4"
      >
        <div class="flex flex-row items-center justify-between">
          <span class="text-xl">{{ title }}</span>
          <button
            type="button"
            class="w-12 h-12 mr-0 flex items-center justify-end"
            @click="onClose"
          >
            <XMarkIcon
              class="w-5 h-5"
              aria-hidden="true"
            />
          </button>
        </div>
        <div class="space-y-4">
          <slot name="content" />
        </div>
        <div class="mt-10 py-3 text-sm flex flex-row-reverse">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { withDefaults } from 'vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'

interface Props {
  visible: boolean,
  title: string
}

// 设置默认值
withDefaults(defineProps<Props>(), {
  visiable: false,
  title: ''
});

const emit = defineEmits(["close"]);

const onClose = () => {
  emit("close", false);
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>