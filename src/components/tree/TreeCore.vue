<template>
  <li class="py-1 px-2 hover:bg-gray-300 hover:bg-opacity-30 rounded-md">
    <div class="flex items-center">
      <input
        :id="data.name"
        type="checkbox"
        class="rounded cursor-pointer"
        :value="data.code"
        v-model="tracked"
      />
      <span
        v-if="data.children && data.children.length > 0"
        @click="isOpen = !isOpen"
        class="ml-4 cursor-pointer flex items-center"
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
      <label :for="data.name" v-else class="ml-4 flex items-center cursor-pointer">
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
    <ul v-show="isOpen" class="ml-4 mt-1">
      <TreeCore v-for="child in data.children" :key="child.code" :data="child" />
    </ul>
  </li>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import TreeCore from "/@/components/tree/TreeCore.vue";

defineProps({
  data: {
    type: Object,
    default: ''
  }
});

const isOpen = ref(false);

const tracked = ref(["21224B8JZ"]);

watch(
  () => [...tracked.value],
  (tracked, pre) => {
    console.log(tracked)
  }
)
</script>