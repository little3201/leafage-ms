<template>
  <ul class="text-white w-full">
    <li
      v-for="data in datas"
      :key="data.code"
      :class="{ 'hover:bg-blue-100 hover:bg-opacity-10 rounded-l-full': !data.children || data.children.length == 0 }"
    >
      <a
        v-if="data.children && data.children.length > 0"
        href="#"
        @click.prevent="isOpen = !isOpen"
        class="flex items-center h-12 rounded-full pl-5"
      >
        <div class="mr-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-layers"
          >
            <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
            <polyline points="2 17 12 22 22 17"></polyline>
            <polyline points="2 12 12 17 22 12"></polyline>
          </svg>
        </div>
        <span
          v-if="data.children && data.children.length > 0"
          class="hidden xl:flex items-center w-full"
        >
          {{ data.name }}
          <svg
            v-if="isOpen"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-chevron-down ml-auto mr-2"
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
            class="feather feather-chevron-right ml-auto mr-2"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </span>
        <span
          v-else
          class="hidden xl:flex items-center w-full"
          v-text="data.name"
        ></span>
      </a>
      <router-link
        v-else
        :to="superior.concat(data.path)"
        class="flex items-center h-12 rounded-l-full pl-5 -mr-5"
        exact
      >
        <div class="mr-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-home"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        </div>
        <div
          class="hidden xl:flex items-center w-full"
          v-text="data.name"
        ></div>
      </router-link>
      <SideMenuCore
        v-show="isOpen"
        class="xl:ml-4 bg-blue-900 bg-opacity-30"
        v-if="data.children && data.children.length > 0"
        :datas="data.children"
        :superior="data.path"
      />
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SideMenuCore",

  props: {
    datas: {
      type: Array,
      default: [],
    },
    superior: {
      type: String,
      default: "/",
    },
  },

  data() {
    return {
      isOpen: true,
    };
  },
});
</script>