<template>
  <div class="px-3 md:px-4 py-3">
    <MobileMenu />
    <div class="flex">
      <SideMenu />
      <div
        class="px-4 md:px-5 rounded-3xl bg-gray-100 w-full overflow-hidden"
        style="min-height: calc(100vh - 24px)"
      >
        <TopBar />
        <!-- BEGIN: General Report -->
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MobileMenu from "/src/components/global/MobileMenu.vue";
import SideMenu from "/src/components/global/SideMenu.vue";
import TopBar from "/src/components/global/TopBar.vue";

export default defineComponent({
  name: "Layout",

  components: {
    MobileMenu,
    SideMenu,
    TopBar,
  },
});
</script>