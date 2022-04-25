<template>
  <div class="relative text-white">
    <RouterLink
      v-if="data.children && data.children.length > 0"
      :to="data.expand.path"
      :title="data.name"
      class="flex flex-1 items-center h-12 hover:bg-blue-100 hover:bg-opacity-10 rounded-l-full pl-4 w-full"
      exacts
      @click="isExpand = !isExpand"
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
      <svg
        v-if="isExpand"
        width="22"
        height="22"
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
        width="22"
        height="22"
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
      :title="data.name"
      :to="superior.concat(data.expand.path)"
      class="flex flex-1 items-center h-12 rounded-l-full pl-4 -mr-4"
      exact
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
      <span class="hidden xl:block w-full">{{ $t(data.name.toLowerCase()) }}</span>
    </RouterLink>
    <div
      v-show="isExpand"
      class="xl:ml-4 bg-blue-900 bg-opacity-30 rounded-md"
    >
      <AsideCore
        v-for="child in data.children"
        :key="child.code"
        :data="child"
        :superior="data.expand.path"
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
      return []
    },
  },
  superior: {
    type: String,
    default: "",
  },
});

const isExpand = ref(true);
</script>

<style scoped>
.router-link-active {
  @apply bg-blue-100 bg-opacity-10
}

.router-link-exact-active {
  @apply bg-gray-100 text-black;
}

.router-link-exact-active:before {
  content: "";
  @apply absolute top-0 right-0 w-7 h-7 -mt-7 -mr-4 rotate-90;
  background-size: 100%;
  background-image: url("/svg/radius.svg");
}

.router-link-exact-active:after {
  content: "";
  @apply absolute top-0 right-0 w-7 h-7 mt-12 -mr-4;
  background-size: 100%;
  background-image: url("/svg/radius.svg");
}
</style>