<template>
  <div class="my-1 px-2 hover:bg-gray-300 hover:bg-opacity-30 rounded-md">
    <div class="flex flex-1 items-center">
      <slot />
      <button
        v-if="data.children && data.children.length > 0"
        type="button"
        :name="data.name"
        :aria-label="data.name"
        :title="data.name"
        class="flex flex-1 items-center focus:outline-none"
        @click="$emit('open-operate')"
      >
        <component
          :is="data.expand.icon"
          v-if="data.expand && data.expand.icon"
          class="w-4 h-4 mr-2"
          aria-hidden="true"
        />
        <span class="py-1  mr-auto">{{ data.name }}</span>
        <ChevronDownIcon
          v-if="isExpand"
          class="w-5 h-5 ml-4"
          aria-hidden="true"
        />
        <ChevronRightIcon
          v-else
          class="w-5 h-5 ml-4"
          aria-hidden="true"
        />
      </button>
      <label
        v-else
        :for="data.code"
        class="flex flex-1 items-center cursor-pointer"
      >
        <component
          :is="data.expand.icon"
          v-if="data.expand && data.expand.icon"
          class="w-4 h-4 mr-2"
          aria-hidden="true"
        />
        <span class="py-1 ">{{ data.name }}</span>
      </label>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from "vue";

import type { NodeData } from "@/api/request.type";
import { ChevronRightIcon, ChevronDownIcon } from '@heroicons/vue/24/outline'

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