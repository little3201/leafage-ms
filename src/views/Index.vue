<template>
  <div class="px-4 py-3 h-screen">
    <div class="md:hidden">
      <p>为更好的体验，请使用大屏幕终端浏览！</p>
      <img src="">
    </div>
    <div class="md:flex flex-row sm-g-h md:h-full">
      <Aside
        :datas="menus"
        class="hidden md:block"
      />
      <main class="px-4 rounded-3xl bg-gray-100 w-full overflow-hidden">
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