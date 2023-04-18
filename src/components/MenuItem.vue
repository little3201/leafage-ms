<template>
  <div class="relative text-white">
    <RouterLink
      v-if="data.children && data.children.length > 0"
      :to="data.expand.path"
      class="flex flex-1 items-center h-12 hover:bg-blue-100 hover:bg-opacity-10 rounded-l-full pl-4"
      exacts
      @click="isExpand = !isExpand"
    >
      <component
        :is="data.expand.icon"
        class="w-6 h-6 mr-3"
        aria-hidden="true"
      />
      <span class="hidden xl:block">{{ $t(data.name.toLowerCase()) }}</span>
      <ChevronDownIcon
        v-if="isExpand"
        class="w-6 h-6 ml-auto mr-4"
        aria-hidden="true"
      />
      <ChevronRightIcon
        v-else
        class="w-6 h-6 ml-auto mr-4"
        aria-hidden="true"
      />
    </RouterLink>
    <RouterLink
      v-else
      :to="superior.concat(data.expand.path)"
      class="flex flex-1 items-center h-12 hover:bg-blue-100 hover:bg-opacity-10 rounded-l-full pl-4 -mr-4"
      exact
    >
      <component
        :is="data.expand.icon"
        class="w-6 h-6 mr-3"
        aria-hidden="true"
      />
      <span class="hidden xl:block">{{ $t(data.name.toLowerCase()) }}</span>
    </RouterLink>
    <div
      v-show="isExpand"
      class="xl:ml-4 bg-blue-900 bg-opacity-30 rounded-md"
    >
      <MenuItem
        v-for="child in data.children"
        :key="child.id"
        :data="child"
        :superior="data.expand.path"
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
        return []
      },
    },
    superior: {
      type: String,
      default: "",
    },
  });
  
  const isExpand = ref(true);
  </script>
  
  <style scoped>
  .router-link-active {
    @apply bg-blue-100 bg-opacity-10
  }
  
  .router-link-exact-active {
    @apply bg-gray-100 text-black;
  }
  
  .router-link-exact-active:before {
    content: "";
    @apply absolute top-0 right-0 w-7 h-7 -mt-7 -mr-4 rotate-90;
    background-size: 100%;
    background-image: url("/svg/radius.svg");
  }
  
  .router-link-exact-active:after {
    content: "";
    @apply absolute top-0 right-0 w-7 h-7 mt-12 -mr-4;
    background-size: 100%;
    background-image: url("/svg/radius.svg");
  }
  </style>