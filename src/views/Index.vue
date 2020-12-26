<template>
  <div class="app">
    <MobileMenu />
    <SideMenu />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MobileMenu from "../components/common/MobileMenu.vue";
import SideMenu from "../components/common/SideMenu.vue";

export default defineComponent({
  name: "Home",

  components: {
    MobileMenu,
    SideMenu,
  },

  setup() {
    return {};
  },
});
</script>