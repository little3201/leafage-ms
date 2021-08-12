<template>
  <div
    v-if="user && Object.keys(user).length > 0"
    class="inline-flex items-center sm:ml-auto"
  >
    <button
      class="
        hidden
        p-2
        rounded-md
        bg-white
        sm:inline-flex
        items-center
        text-gray-700
        border
        hover:text-blue-600
        hover:border-blue-600
        focus:outline-none
      "
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
      Export to Excel
    </button>
    <button
      class="
        hidden
        ml-3
        p-2
        rounded-md
        bg-white
        sm:flex
        items-center
        text-gray-700
        border
        hover:text-blue-600
        hover:border-blue-600
        focus:outline-none
      "
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
      Export to PDF
    </button>
    <button
      @click="operate"
      class="
        ml-3
        p-2
        rounded-md
        bg-blue-600
        flex
        items-center
        text-white
        hover:bg-blue-700
        focus:outline-none
        border
      "
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
      Add New
    </button>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineEmits } from "vue";
import { useStore } from "../../store";

const emit = defineEmits(["modelOperate"]);

const operate = () => {
  emit("modelOperate", true);
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