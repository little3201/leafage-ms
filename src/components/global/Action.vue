<template>
  <div
    v-if="user && Object.keys(user).length > 0"
    class="flex justify-center items-center"
  >
    <slot></slot>
    <a
      class="flex items-center mr-3"
      href="javascript:;"
      @click.prevent="openModel"
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
        <use :xlink:href="'/svg/feather-sprite.svg#' + 'check-square'" />
      </svg>
      Edit
    </a>
    <a
      class="flex items-center text-red-600"
      href="javascript:;"
      @click.prevent="openConfirm"
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
    </a>
  </div>
</template>

<script lang="ts" setup>
import { defineEmit, computed } from "vue";
import { useStore } from "../../store";

const emit = defineEmit(["delAction", "editAction"]);

const openConfirm = () => {
  emit("delAction", true);
};
const openModel = () => {
  emit("editAction", true);
};

const store = useStore();
const user = computed(() => {
  let data = sessionStorage.getItem("user");
  if (data) {
    return JSON.parse(data);
  } else {
    return store.state.user;
  }
});
</script>