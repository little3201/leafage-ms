<template>
  <div class="flex justify-center items-center">
    <slot></slot>
    <a
      class="flex items-center mr-3"
      href="javascript:;"
      @click.prevent="openModel"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-check-square mr-2"
      >
        <polyline points="9 11 12 14 22 4"></polyline>
        <path
          d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"
        ></path>
      </svg>
      Edit
    </a>
    <a
      class="flex items-center text-red-600"
      href="javascript:;"
      @click.prevent="openConfirm"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-trash-2 mr-1"
      >
        <polyline points="3 6 5 6 21 6"></polyline>
        <path
          d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
        ></path>
        <line x1="10" y1="11" x2="10" y2="17"></line>
        <line x1="14" y1="11" x2="14" y2="17"></line>
      </svg>
      Delete
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Action",

  props:{
    code:{
      type: String,
      default: ''
    }
  },

  methods: {
    openConfirm() {
      this.$emit("delAction", true);
    },
    openModel() {
      this.$emit("editAction", true, this.code);
    },
  },
});
</script>