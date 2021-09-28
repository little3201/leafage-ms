<template>
  <li class="py-1 px-2 hover:bg-gray-300 hover:bg-opacity-30 rounded-md">
    <div class="flex items-center">
      <input
        type="checkbox"
        class="rounded cursor-pointer"
        :value="data.code"
        v-model="checked"
        @change="dataChecked(data.code)"
      />
      <span
        v-if="data.children && data.children.length > 0"
        @click="isOpen = !isOpen"
        class="ml-4 cursor-pointer flex items-center"
      >
        <svg
          v-if="data.expand && data.expand.icon"
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
          <use :xlink:href="'/svg/feather-sprite.svg#' + data.expand.icon" />
        </svg>
        {{ data.name }}
        <svg
          v-if="isOpen"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="ml-6"
        >
          <use :xlink:href="'/svg/feather-sprite.svg#' + 'chevron-down'" />
        </svg>
        <svg
          v-else
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="ml-6"
        >
          <use :xlink:href="'/svg/feather-sprite.svg#' + 'chevron-right'" />
        </svg>
      </span>
      <span v-else class="ml-4 flex items-center">
        <svg
          v-if="data.expand && data.expand.icon"
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
          <use :xlink:href="'/svg/feather-sprite.svg#' + data.expand.icon" />
        </svg>
        {{ data.name }}
      </span>
    </div>
    <ul v-show="isOpen" class="ml-4 mt-1">
      <TreeCore
        v-for="child in data.children"
        :key="child.code"
        :data="child"
        @addChecked="$emit('addChecked', child.code)"
        @delChecked="$emit('delChecked', child.code)"
      />
    </ul>
  </li>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import TreeCore from "/@/components/global/TreeCore.vue";

defineProps({
  data: {
    type: Object,
  }
});

const isOpen = ref(false);

const checked = ref(false);

const emit = defineEmits(["addChecked", "delChecked"]);

const dataChecked = (code: String) => {
  if (checked.value) {
    emit("addChecked", code);
  } else {
    emit("delChecked", code);
  }
};
</script>