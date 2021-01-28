<template>
  <div class="px-3 md:px-4 py-3">
    <MobileMenu />
    <div class="flex">
      <SideMenu />
      <main
        class="px-4 md:px-5 rounded-3xl bg-gray-100 w-full overflow-hidden"
        style="min-height: calc(100vh - 24px)"
      >
        <TopBar />
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MobileMenu from "/@/components/global/MobileMenu.vue";
import SideMenu from "/@/components/global/SideMenu.vue";
import TopBar from "/@/components/global/TopBar.vue";

export default defineComponent({
  name: "Layout",

  components: {
    MobileMenu,
    SideMenu,
    TopBar,
  },
});
</script>