<template>
  <div class="px-4 py-3 h-screen">
    <Drawer
      :datas="menus"
      class="md:hidden"
    />
    <div class="flex flex-row sm-g-h md:h-full overflow-auto">
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

import type { NodeData } from "@/api/request.type";

import Drawer from "@/layouts/Drawer.vue";
import Aside from "@/layouts/Aside.vue";
import TopBar from "@/layouts/TopBar.vue";

const menus = ref<Array<NodeData>>([]);

onMounted(() => {
  if (sessionStorage.getItem("menus") != null) {
    menus.value = JSON.parse(sessionStorage.getItem("menus") || '')
  } else {
    menus.value = [{ "code": "2122466RP", "name": "Dashboard", "superior": "", "expand": { "path": "/", "icon": "home" }, "children": [] },
    { "code": "21224B8JZ", "name": "Posts", "superior": "", "expand": { "path": "/posts", "icon": "clipboard" }, "children": [] },
    { "code": "21224QI72", "name": "Resource", "superior": "", "expand": { "path": "/resource", "icon": "book" }, "children": [] },
    { "code": "21224HMLG", "name": "Category", "superior": "", "expand": { "path": "/category", "icon": "tag" }, "children": [] }
    ]
  }

});
</script>