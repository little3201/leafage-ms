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
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";

import Drawer from "/@/components/layout/Drawer.vue";
import Aside from "/@/components/layout/Aside.vue";
import TopBar from "/@/components/layout/TopBar.vue";

const menus = ref([
  { "code": "2122466RP", "name": "Dashboard", "superior": "", "expand": { "path": "/", "icon": "home" }, "children": [] },
  { "code": "21224B8JZ", "name": "Posts", "superior": "", "expand": { "path": "/posts", "icon": "book" }, "children": [] },
  { "code": "21224QI72", "name": "Resource", "superior": "", "expand": { "path": "/resource", "icon": "monitor" }, "children": [] },
  { "code": "21224HMLG", "name": "Category", "superior": "", "expand": { "path": "/category", "icon": "tag" }, "children": [] },
  { "code": "21953KO8", "name": "Region", "superior": "", "expand": { "path": "/region", "icon": "map-pin" }, "children": [] }
]);

onMounted(() => {
  if (sessionStorage.getItem("menus") != null) {
    menus.value = JSON.parse(sessionStorage.getItem("menus") || '')
  }
});
</script>