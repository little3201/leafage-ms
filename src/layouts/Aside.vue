<template>
  <aside class="pr-4">
    <RouterLink
      to="/"
    >
      <h1 class="inline-flex items-center mt-2 space-x-4 text-white text-2xl ml-6">
        <img src="/svg/layer.svg">
        <span class="hidden xl:block">Leafage</span>
      </h1>
    </RouterLink>
    <div class="my-4 h-px w-full bg-gray-200 bg-opacity-30" />
    <div class="sm:w-20 xl:w-52 my-8">
      <AsideCore
        v-for="data in datas"
        :key="data.id"
        :data="data"
      />
    </div>
  </aside>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'

import AsideCore from "~/layouts/AsideCore.vue";

import type { NodeData } from '~/api/request.type'

defineProps({
  datas: {
    type: Array as PropType<NodeData[]>,
    default: () => {
      return []
    }
  }
});
</script>