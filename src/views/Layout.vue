<template>
  <div class="px-4 py-3">
    <MobileMenu class="md:hidden" :datas="datas" />
    <div class="flex">
      <SideMenu class="hidden md:block" :datas="datas" />
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
import MobileMenu from "/@/components/sections/MobileMenu.vue";
import SideMenu from "/@/components/sections/SideMenu.vue";
import TopBar from "/@/components/sections/TopBar.vue";

const datas = ref([
  { "code": "2122466RP", "name": "Dashboard", "superior": "2122466RP", "expand": { "path": "/", "icon": "home" }, "children": [] },
  { "code": "21224B8JZ", "name": "Posts", "superior": "21224B8JZ", "expand": { "path": "/posts", "icon": "book" }, "children": [] },
  { "code": "21224QI72", "name": "Resource", "superior": "21224QI72", "expand": { "path": "/resource", "icon": "monitor" }, "children": [] },
  { "code": "21224HMLG", "name": "Category", "superior": "21224HMLG", "expand": { "path": "/category", "icon": "tag" }, "children": [] }
]);

onMounted(() => {
  let menus = sessionStorage.getItem("menus");
  if (menus) {
    datas.value = JSON.parse(menus)
  }
});
</script>