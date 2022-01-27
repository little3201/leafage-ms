<template>
  <div
    v-if="account && Object.keys(account).length > 0"
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
        <use :xlink:href="'/svg/feather-sprite.svg#' + 'file-plus'" />
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
      v-if="needAdd"
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

import { Account } from "@/api/request";

defineProps({
  needAdd: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["modelOperate"]);

const operate = () => {
  emit("modelOperate", true);
};

const account = ref<Account>({})

onMounted(() => {
  let data = sessionStorage.getItem("account")
  if (data) {
    account.value = JSON.parse(data);
  }
});
</script>