<template>
  <div class="my-1 px-2 hover:bg-gray-300 hover:bg-opacity-30 rounded-md">
    <div class="flex flex-1 items-center">
      <slot />
      <button
        v-if="data.children && data.children.length > 0"
        type="button"
        :title="data.name"
        class="flex flex-1 items-center focus:outline-none"
        @click="$emit('open-operate')"
      >
        <svg
          v-if="data.expand && data.expand.icon"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="mr-2"
        >
          <use :xlink:href="'/svg/feather-sprite.svg#' + data.expand.icon" />
        </svg>
        <span class="py-1  mr-auto">{{ data.name }}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="ml-4"
        >
          <use
            v-if="isExpand"
            :xlink:href="'/svg/feather-sprite.svg#' + 'chevron-down'"
          />
          <use
            v-else
            :xlink:href="'/svg/feather-sprite.svg#' + 'chevron-right'"
          />
        </svg>
      </button>
      <label
        v-else
        :for="data.code"
        class="flex flex-1 items-center cursor-pointer"
      >
        <svg
          v-if="data.expand && data.expand.icon"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="mr-2"
        >
          <use :xlink:href="'/svg/feather-sprite.svg#' + data.expand.icon" />
        </svg>
        <span class="py-1 ">{{ data.name }}</span>
      </label>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from "vue";

import type { NodeData } from "@/api/request.type";

defineProps({
  data: {
    type: Object as PropType<NodeData>,
    default: () => {
      return {}
    }
  },
  isExpand: {
    type: Boolean,
    default: false
  }
})

defineEmits(['open-operate'])
</script>