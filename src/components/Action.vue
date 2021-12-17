<template>
  <div v-if="user && Object.keys(user).length > 0" class="flex justify-center items-center">
    <slot></slot>
    <button
      type="button"
      class="flex items-center mr-3 focus:outline-none"
      @click="$emit('editAction', true)"
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
        class="mr-1"
      >
        <use :xlink:href="'/svg/feather-sprite.svg#' + 'edit-3'" />
      </svg>
      Edit
    </button>
    <button
      type="button"
      class="flex items-center text-red-600 focus:outline-none"
      @click="$emit('delAction', true)"
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
        class="mr-1"
      >
        <use :xlink:href="'/svg/feather-sprite.svg#' + 'trash-2'" />
      </svg>
      Delete
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";

import { User } from "@/api/request";

const user = ref<User>({})

onMounted(() => {
  let data = sessionStorage.getItem("user")
  if (data) {
    user.value = JSON.parse(data);
  }
});
</script>