<template>
  <div
    v-if="isShow"
    class="flex bg-blue-100 rounded-lg p-4 mb-4 text-sm text-blue-700 dark:bg-blue-200 dark:text-blue-800"
    role="alert"
  >
    <InformationCircleIcon
      class="w-5 h-5 mr-1"
      aria-hidden="true"
    />
    <div>
      <span class="font-medium">Info alert!</span> Change a few things up and try submitting again.
    </div>
  </div>
</template>

<script lang="ts" setup>
import { InformationCircleIcon } from '@heroicons/vue/24/outline'
defineProps({
    isShow: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        default: "",
    }
});
</script>