<template>
  <ul>
    <li
      v-for="data in datas"
      :key="data.code"
      class="py-1 px-2 hover:bg-gray-300 hover:bg-opacity-30 rounded-md"
    >
      <div class="flex items-center">
        <input
          type="checkbox"
          checked
          class="rounded-md"
          :value="data.code"
          v-model="menus"
        />
        <span
          v-if="data.children && data.children.length > 0"
          @click="isChildOpen = !isChildOpen"
          class="ml-4 cursor-pointer flex items-center"
        >
          <svg
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
            <use
              :xlink:href="'/src/assets/feather-sprite.svg#' + data.expand.icon"
            /></svg
          >{{ data.name }}
          <svg
            v-if="isChildOpen"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-chevron-down ml-6"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-chevron-right ml-6"
          >
            <polyline points="9 18 15 12 9 6"></polyline></svg
        ></span>
        <span v-else class="ml-4 flex items-center">
          <svg
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
            <use
              :xlink:href="'/src/assets/feather-sprite.svg#' + data.expand.icon"
            />
          </svg>
          {{ data.name }}
        </span>
      </div>
      <!-- children -->
      <TreeCore
        class="ml-4 mt-1"
        v-if="data.children && data.children.length > 0"
        v-show="isChildOpen"
        :datas="data.children"
      />
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TreeCore",

  props: {
    datas: {
      type: Array,
      default: [],
    },
  },

  data() {
    return {
      isChildOpen: true,
      menus: [],
    };
  },
});
</script>