<template>
  <div v-if="account && Object.keys(account).length > 0" class="flex justify-center items-center">
    <slot></slot>
    <button
      v-if="needEdit"
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
      v-if="needDel"
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

import { Account } from "@/api/request";

defineProps({
  needEdit: {
    type: Boolean,
    default: true,
  },
  needDel: {
    type: Boolean,
    default: true,
  },
})

const account = ref<Account>({})

onMounted(() => {
  let data = sessionStorage.getItem("account")
  if (data) {
    account.value = JSON.parse(data);
  }
});
</script>