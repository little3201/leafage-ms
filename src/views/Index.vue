<template>
  <div class="px-4 py-3">
    <Drawer :datas="menus" class="md:hidden" />
    <div class="flex">
      <Aside :datas="menus" class="hidden md:block" />
      <main
        class="px-4 rounded-3xl bg-gray-100 w-full overflow-hidden"
        style="height: calc(100vh - 1.5rem)"
      >
        <TopBar />
        <RouterView></RouterView>
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";

import { Authority } from "@/api/request";

import Drawer from "@/layouts/Drawer.vue";
import Aside from "@/layouts/Aside.vue";
import TopBar from "@/layouts/TopBar.vue";

const menus = ref<Array<Authority>>([]);

onMounted(() => {
  if (sessionStorage.getItem("menus") != null) {
    menus.value = JSON.parse(sessionStorage.getItem("menus") || '')
  } else {
    menus.value = [{ "code": "2122466RP", "name": "Dashboard", "superior": "", "expand": { "path": "/", "icon": "home" }, "children": [] },
    { "code": "21224B8JZ", "name": "Posts", "superior": "", "expand": { "path": "/posts", "icon": "book" }, "children": [] },
    { "code": "21224QI72", "name": "Resource", "superior": "", "expand": { "path": "/resource", "icon": "monitor" }, "children": [] },
    { "code": "21224HMLG", "name": "Category", "superior": "", "expand": { "path": "/category", "icon": "tag" }, "children": [] }
    ]
  }

});
</script>