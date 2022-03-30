<template>
  <li class="py-1 px-2 hover:bg-gray-300 hover:bg-opacity-30 rounded-md">
    <div class="flex items-center">
      <input
        :id="data.code"
        type="checkbox"
        class="rounded cursor-pointer"
        :value="data.code"
        v-model="checked"
        @click="track(data)"
      />
      <span
        v-if="data.children && data.children.length > 0"
        @click="isOpen = !isOpen"
        class="ml-4 cursor-pointer inline-flex items-center"
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
        {{ data.name }}
        <svg
          v-if="isOpen"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="ml-8"
        >
          <use :xlink:href="'/svg/feather-sprite.svg#' + 'chevron-down'" />
        </svg>
        <svg
          v-else
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="ml-8"
        >
          <use :xlink:href="'/svg/feather-sprite.svg#' + 'chevron-right'" />
        </svg>
      </span>
      <label :for="data.code" v-else class="ml-4 flex items-center cursor-pointer">
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
        {{ data.name }}
      </label>
    </div>
    <ul v-show="isOpen" class="ml-4 my-1">
      <TreeCore
        v-for="child in data.children"
        :key="child.code"
        :data="child"
        :checked="tracked"
        @treeOperate="track"
      />
    </ul>
  </li>
</template>

<script lang="ts" setup>
import { ref, watch, PropType } from "vue";

import type { TreeNode } from "@/api/request.type";

const props = defineProps({
  data: {
    type: Object as PropType<TreeNode>,
    default: {}
  },
  checked: {
    type: Array as PropType<string[]>,
    default: []
  }
});

const emit = defineEmits(['treeOperate'])

let isOpen = ref(false);

let tracked = ref<Array<string>>([]);

watch(
  () => [...props.checked],
  (newValue) => {
    tracked.value = newValue
  }
)

const track = (node: TreeNode) => {
  emit('treeOperate', node)
}
</script>