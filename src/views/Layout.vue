<template>
  <div class="px-4 py-3">
    <MobileMenu />
    <div class="flex">
      <SideMenu />
      <div class="content">
        <TopBar />
        <div class="grid grid-cols-12 gap-6">
          <div class="col-span-12 xxl:col-span-9 grid grid-cols-12 gap-6">
            <!-- BEGIN: General Report -->
            <router-view></router-view>
          </div>
        </div>
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