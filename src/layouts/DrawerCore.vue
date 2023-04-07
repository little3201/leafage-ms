<template>
  <div class="text-white">
    <RouterLink
      v-if="data.children && data.children.length > 0"
      :to="data.expand.path"
      class="flex flex-1 items-center rounded-full h-12 pl-4 w-full"
      @click="isExpand = !isExpand"
    >
      <component
        :is="data.expand.icon"
        class="w-5 h-5 mr-3"
        aria-hidden="true"
      />
      <span> {{ $t(data.name.toLowerCase()) }}</span>
      <ChevronDownIcon
        v-if="isExpand"
        class="w-5 h-5 ml-auto mr-4"
        aria-hidden="true"
      />
      <ChevronRightIcon
        v-else
        class="w-5 h-5 ml-auto mr-4"
        aria-hidden="true"
      />
    </RouterLink>
    <RouterLink
      v-else
      :to="superior.concat(data.expand.path)"
      class="flex flex-1 items-center h-12 rounded-full pl-4"
      exact
      @click="itemOperation"
    >
      <component
        :is="data.expand.icon"
        class="w-5 h-5 mr-3"
        aria-hidden="true"
      />
      <span>{{ $t(data.name.toLowerCase()) }}</span>
    </RouterLink>
    <div
      v-show="isExpand"
      class="mx-4 bg-blue-900 bg-opacity-30 rounded-md"
    >
      <DrawerCore
        v-for="child in data.children"
        :key="child.id"
        :data="child"
        :superior="data.expand.path"
        @menu-action="itemOperation"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, PropType } from "vue";

import type { NodeData } from '~/api/request.type'
import { ChevronRightIcon, ChevronDownIcon } from '@heroicons/vue/24/outline'

defineProps({
  data: {
    type: Object as PropType<NodeData>,
    default: () => {
      return {}
    },
  },
  superior: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["menuAction"]);

const isExpand = ref(true);
/**
 * 操作
 */
const itemOperation = () => {
  emit("menuAction");
};
</script>

<style scoped>
.router-link-active {
  @apply bg-blue-100 bg-opacity-10
}

.router-link-exact-active {
  @apply bg-gray-100 text-black;
}
</style>