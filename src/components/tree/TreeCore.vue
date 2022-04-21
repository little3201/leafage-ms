<template>
  <div class="my-1 px-2 hover:bg-gray-300 hover:bg-opacity-30 rounded-md">
    <div class="flex flex-1 items-center">
      <slot />
      <button type="button" :title="data.name" v-if="data.children && data.children.length > 0"
        @click="$emit('openOperate')" class="flex flex-1 items-center focus:outline-none w-full">
        <svg v-if="data.expand && data.expand.icon" width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
          <use :xlink:href="'/svg/feather-sprite.svg#' + data.expand.icon" />
        </svg>
        <span class="py-1  mr-10">{{ data.name }}</span>
        <svg v-if="isExpand" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round">
          <use :xlink:href="'/svg/feather-sprite.svg#' + 'chevron-down'" />
        </svg>
        <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round">
          <use :xlink:href="'/svg/feather-sprite.svg#' + 'chevron-right'" />
        </svg>
      </button>
      <label :for="data.code" v-else class="flex flex-1 items-center cursor-pointer">
        <svg v-if="data.expand && data.expand.icon" width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
          <use :xlink:href="'/svg/feather-sprite.svg#' + data.expand.icon" />
        </svg>
        <span class="py-1 ">{{ data.name }}</span>
      </label>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from "vue";

import type { TreeNode } from "@/api/request.type";

defineProps({
  data: {
    type: Object as PropType<TreeNode>,
    default: {}
  },
  isExpand: {
    type: Boolean,
    default: false
  }
})
</script>