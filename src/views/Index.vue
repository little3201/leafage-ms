<template>
  <div class="px-4 py-3 h-screen">
    <div class="md:hidden h-1/2 flex items-end justify-center">
      <p class="text-2xl text-white">
        为更好的体验，请使用大屏幕终端浏览！
      </p>
    </div>
    <div class="hidden md:flex flex-row sm-g-h h-full">
      <Aside
        :datas="menus"
        class="hidden md:block"
      />
      <main class="hidden md:block px-4 rounded-3xl bg-gray-100 w-full overflow-hidden">
        <TopBar />
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";

import type { NodeData } from "~/api/request.type";

import Aside from "~/components/Aside.vue";
import TopBar from "~/components/TopBar.vue";

const menus = ref<Array<NodeData>>([]);

onMounted(() => {
  if (sessionStorage.getItem("menus") != null) {
    menus.value = JSON.parse(sessionStorage.getItem("menus") || '')
  } else {
    menus.value = []
  }

});
</script>