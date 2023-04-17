<template>
  <nav>
    <div class="flex justify-between mb-2">
      <RouterLink
        to="/"
        class="inline-flex items-center"
      >
        <img src="/svg/layer.svg">
      </RouterLink>
      <span class="text-white text-xl tracking-wider">Leafage</span>
      <button
        type="button"
        class="outline-none"
        name="open"
        aria-label="open"
        @click="isShow = !isShow"
      >
        <Bars3BottomRightIcon
          class="w-7 h-7 text-white"
          aria-hidden="true"
        />
      </button>
    </div>
    <div class="mt-2 mb-4 h-px bg-gray-200 bg-opacity-30" />
    <div
      v-show="isShow"
      class="fixed inset-0 overflow-hidden max-w-xs z-10"
      aria-labelledby="slide-over-title"
      role="dialog"
      aria-modal="true"
    >
      <div class="fixed inset-y-0 left-0 flex">
        <div class="w-64">
          <div class="h-14 bg-transparent" />
          <div class="h-full flex flex-col pt-5 px-4 bg-blue-800 shadow-2xl overflow-y-scroll">
            <div>
              <NavItem
                v-for="data in datas"
                :key="data.id"
                :data="data"
                @menu-action="menuOperate"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { ref, PropType } from "vue";

import NavItem from "~/layouts/NavItem.vue";

import type { NodeData } from '~/api/request.type'
import { Bars3BottomRightIcon } from "@heroicons/vue/24/outline";

defineProps({
  datas: {
    type: Array as PropType<NodeData[]>,
    default: () => {
      return []
    },
  }
});

const isShow = ref(false);

const menuOperate = () => {
  isShow.value = false;
};
</script>