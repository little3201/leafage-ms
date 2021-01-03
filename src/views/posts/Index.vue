<template>
  <div class="px-4 py-3">
    <MobileMenu />
    <div class="flex">
      <SideMenu />
      <div class="content">
        <TopBar />
        <div class="grid grid-cols-12 gap-6">
          <div class="col-span-12 xxl:col-span-9 grid grid-cols-12 gap-6">
            <router-view />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import MobileMenu from "../../components/global/MobileMenu.vue";
import SideMenu from "../../components/global/SideMenu.vue";
import TopBar from "../../components/global/TopBar.vue";

import instance from "../../api";
import SERVER_URL from "../../api/request";

export default defineComponent({
  name: "Posts",

  components: {
    MobileMenu,
    SideMenu,
    TopBar,
  },
});
</script>