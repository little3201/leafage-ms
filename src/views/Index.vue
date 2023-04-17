<template>
  <div class="px-4 py-3 h-screen">
    <Drawer
      :datas="menus"
      class="md:hidden"
    />
    <div class="flex flex-row sm-g-h md:h-full">
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

import Drawer from "~/layouts/Drawer.vue";
import Aside from "~/layouts/Aside.vue";
import TopBar from "~/layouts/TopBar.vue";

const menus = ref<Array<NodeData>>([]);

onMounted(() => {
  if (sessionStorage.getItem("menus") != null) {
    menus.value = JSON.parse(sessionStorage.getItem("menus") || '')
  } else {
    menus.value = []
  }

});
</script>