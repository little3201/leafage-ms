<template>
  <div
    v-if="user && Object.keys(user).length > 0"
    class="inline-flex items-center sm:ml-auto text-sm"
  >
    <button
      class="hidden p-2 rounded-md bg-white sm:inline-flex items-center text-gray-700 border hover:text-blue-600 hover:border-blue-600 focus:outline-none active:cursor-wait"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="mr-2"
      >
        <use :xlink:href="'/svg/feather-sprite.svg#' + 'file-text'" />
      </svg>
      Import
    </button>
    <button
      class="hidden ml-3 p-2 rounded-md bg-white sm:flex items-center text-gray-700 border hover:text-blue-600 hover:border-blue-600 focus:outline-none active:cursor-wait"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="mr-2"
      >
        <use :xlink:href="'/svg/feather-sprite.svg#' + 'file-text'" />
      </svg>
      Export
    </button>
    <button
      @click="operate"
      class="ml-3 p-2 rounded-md bg-blue-600 flex items-center text-white hover:bg-blue-700 focus:outline-none border active:cursor-wait"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="mr-2"
      >
        <use :xlink:href="'/svg/feather-sprite.svg#' + 'plus-circle'" />
      </svg>
      <span class="hidden sm:block">Add</span>&nbsp;New
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";

const emit = defineEmits(["modelOperate"]);

const operate = () => {
  emit("modelOperate", true);
};

const user = ref({})

onMounted(() => {
  let data = sessionStorage.getItem("user")
  if (data) {
    user.value = JSON.parse(data);
  }
});
</script>