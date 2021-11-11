<template>
  <div v-if="user && Object.keys(user).length > 0" class="flex justify-center items-center">
    <slot></slot>
    <button type="button" class="flex items-center mr-3 focus:outline-none" @click="openModel">
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
        <use :xlink:href="'/svg/feather-sprite.svg#' + 'edit-3'" />
      </svg>
      Edit
    </button>
    <button
      type="button"
      class="flex items-center text-red-600 focus:outline-none"
      @click="openConfirm"
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
        <use :xlink:href="'/svg/feather-sprite.svg#' + 'trash-2'" />
      </svg>
      Delete
    </button>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

const emit = defineEmits(["delAction", "editAction"]);

const openConfirm = () => {
  emit("delAction", true);
};
const openModel = () => {
  emit("editAction", true);
};

const user = computed(() => {
  if (sessionStorage.getItem("user") != null) {
    return JSON.parse(sessionStorage.getItem("user") || '');
  }
  return {}
});
</script>