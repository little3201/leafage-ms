<template>
  <div class="text-white">
    <RouterLink
      v-if="data.children && data.children.length > 0"
      :to="data.expand.path"
      class="flex flex-1 items-center rounded-full h-12 pl-4 w-full"
      @click="isExpand = !isExpand"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="mr-3"
      >
        <use :xlink:href="'/svg/feather-sprite.svg#' + data.expand.icon" />
      </svg>
      <span> {{ $t(data.name.toLowerCase()) }}</span>
      <svg
        v-if="isExpand"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="ml-auto mr-2"
      >
        <use :xlink:href="'/svg/feather-sprite.svg#' + 'chevron-down'" />
      </svg>
      <svg
        v-else
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="ml-auto mr-2"
      >
        <use :xlink:href="'/svg/feather-sprite.svg#' + 'chevron-right'" />
      </svg>
    </RouterLink>
    <RouterLink
      v-else
      :to="superior.concat(data.expand.path)"
      class="flex flex-1 items-center h-12 rounded-full pl-4"
      exact
      @click="itemOperation"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="mr-3"
      >
        <use :xlink:href="'/svg/feather-sprite.svg#' + data.expand.icon" />
      </svg>
      <span>{{ $t(data.name.toLowerCase()) }}</span>
    </RouterLink>
    <div
      v-show="isExpand"
      class="mx-4 bg-blue-900 bg-opacity-30 rounded-md"
    >
      <DrawerCore
        v-for="child in data.children"
        :key="child.code"
        :data="child"
        :superior="data.expand.path"
        @menu-action="itemOperation"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, PropType } from "vue";

import type { TreeNode } from '@/api/request.type'

defineProps({
  data: {
    type: Object as PropType<TreeNode>,
    default: () => {
      return {}
    },
  },
  superior: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["menuAction"]);

const isExpand = ref(true);
/**
 * 操作
 */
const itemOperation = () => {
  emit("menuAction");
};
</script>

<style scoped>
.router-link-active {
  @apply bg-blue-100 bg-opacity-10
}
.router-link-exact-active {
  @apply bg-gray-100 text-black;
}
</style>