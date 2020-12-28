<template>
  <div>
    <MobileMenu />
    <SideMenu />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import MobileMenu from "../components/common/MobileMenu.vue";
import SideMenu from "../components/common/SideMenu.vue";

import instance from "../api";
import SERVER_URL from "../api/request";

export default defineComponent({
  name: "Home",

  components: {
    MobileMenu,
    SideMenu,
  },

});
</script>