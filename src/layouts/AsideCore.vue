<template>
  <li
    class="relative text-white"
    :class="{
      'hover:bg-blue-100 hover:bg-opacity-10 rounded-l-full':
        !data.children || data.children.length == 0,
    }"
  >
    <div
      v-if="data.children && data.children.length > 0"
      :title="data.name"
      @click.prevent="isOpen = !isOpen"
      class="flex items-center h-12 hover:bg-blue-100 hover:bg-opacity-10 rounded-l-full pl-4 cursor-pointer"
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
      <span
        v-if="data.children && data.children.length > 0"
        class="hidden xl:flex items-center w-full"
      >
        {{ data.name }}
        <svg
          v-if="isOpen"
          width="18"
          height="18"
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
          width="18"
          height="18"
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
      <span v-else class="hidden xl:inline-flex items-center" v-text="data.name"></span>
    </div>
    <RouterLink
      :title="data.name"
      v-else
      :to="superior.concat(data.expand.path)"
      class="flex items-center h-12 rounded-l-full pl-4 -mr-4"
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
      <span class="hidden xl:block w-full" v-text="data.name"></span>
    </RouterLink>
    <ul v-show="isOpen" class="xl:ml-4 bg-blue-900 bg-opacity-30 rounded-md">
      <AsideCore v-for="child in data.children" :data="child" :superior="data.expand.path" />
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

const isOpen = ref(true);
</script>

<style scoped>
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