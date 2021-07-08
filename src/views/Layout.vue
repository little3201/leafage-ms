<template>
  <div class="px-3 md:px-4 py-3">
    <MobileMenu class="md:hidden" />
    <div class="flex">
      <SideMenu class="hidden md:block" />
      <main
        class="px-4 md:px-5 rounded-3xl bg-gray-100 w-full overflow-hidden"
        style="height: calc(100vh - 1.25rem)"
      >
        <TopBar />
        <router-view> </router-view>
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
import MobileMenu from "/@/components/sections/MobileMenu.vue";
import SideMenu from "/@/components/sections/SideMenu.vue";
import TopBar from "/@/components/sections/TopBar.vue";
</script>