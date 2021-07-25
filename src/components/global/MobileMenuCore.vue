<template>
  <ul class="mb-2 text-white">
    <li v-for="data in datas" :key="data.code">
      <a
        v-if="data.children && data.children.length > 0"
        href="javascript:;"
        @click.prevent="isOpen = !isOpen"
        class="flex items-center rounded-full h-10 pl-4"
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
      </a>
      <router-link
        v-else
        @click="itemOperation"
        :to="superior.concat(data.expand.path)"
        class="flex items-center h-10 rounded-full pl-4"
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
      </router-link>
      <MobileMenuCore
        v-show="isOpen"
        class="mx-4 bg-blue-900 bg-opacity-30 rounded-md"
        v-if="data.children && data.children.length > 0"
        :datas="data.children"
        :superior="data.expand.path"
        @menuAction="itemOperation"
      />
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits } from "vue";

defineProps({
  datas: {
    type: Array,
    default: [],
  },
  superior: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["menuAction"]);

const isOpen = ref(true);

const itemOperation = () => {
  emit("menuAction");
};
</script>

<style scoped>
.router-link-exact-active {
  @apply bg-gray-100 text-black;
}
</style>