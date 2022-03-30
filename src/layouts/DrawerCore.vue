<template>
  <li class="text-white">
    <div
      v-if="data.children && data.children.length > 0"
      @click.prevent="isOpen = !isOpen"
      class="flex items-center rounded-full h-12 pl-4 cursor-pointer"
    >
      <div class="mr-3">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <use :xlink:href="'/svg/feather-sprite.svg#' + data.expand.icon" />
        </svg>
      </div>
      <span class="flex items-center w-full">
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
          class="ml-auto mr-2"
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
          class="ml-auto mr-2"
        >
          <use :xlink:href="'/svg/feather-sprite.svg#' + 'chevron-right'" />
        </svg>
      </span>
    </div>
    <RouterLink
      v-else
      @click="itemOperation"
      :to="superior.concat(data.expand.path)"
      class="flex items-center h-12 rounded-full pl-4"
      exact
    >
      <div class="mr-3">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <use :xlink:href="'/svg/feather-sprite.svg#' + data.expand.icon" />
        </svg>
      </div>
      <span class="flex items-center" v-text="data.name"></span>
    </RouterLink>
    <ul v-show="isOpen" class="mx-4 bg-blue-900 bg-opacity-30 rounded-md">
      <DrawerCore
        v-for="child in data.children"
        :data="child"
        :superior="data.expand.path"
        @menuAction="itemOperation"
      />
    </ul>
  </li>
</template>

<script lang="ts" setup>
import { ref, PropType } from "vue";

import type { Authority } from '@/api/request.type'

defineProps({
  data: {
    type: Object as PropType<Authority>,
    default: {},
  },
  superior: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["menuAction"]);

const isOpen = ref(true);
/**
 * 操作
 */
const itemOperation = () => {
  emit("menuAction");
};
</script>

<style scoped>
.router-link-exact-active {
  @apply bg-gray-100 text-black;
}
</style>