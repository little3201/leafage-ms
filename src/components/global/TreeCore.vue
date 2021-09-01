<template>
  <ul>
    <li
      v-for="data in datas"
      :key="data.code"
      class="py-1 px-2 hover:bg-gray-300 hover:bg-opacity-30 rounded-md"
    >
      <div class="flex items-center">
        <input type="checkbox" class="rounded" :value="data.code" v-model.lazy="checkedDatas" />
        <span
          v-if="data.children && data.children.length > 0"
          @click="isChildOpen = !isChildOpen"
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
            v-if="isChildOpen"
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
      <!-- children -->
      <TreeCore
        class="ml-4 mt-1"
        v-if="data.children && data.children.length > 0"
        v-show="isChildOpen"
        :datas="data.children"
      />
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { ref } from "vue";

defineProps({
  datas: {
    type: Array,
    default: [],
  },
  checked: {
    type: Array,
    default: [],
  }
});

const isChildOpen = ref(true);
const checkedDatas = ref<Array<String>>([]);

const emit = defineEmits(["checkedChange"]);

const dataChange = () => {
  console.log(checkedDatas.value.toString())
  emit("checkedChange", checkedDatas.value);
};
</script>