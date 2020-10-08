<template>
  <MobileMenu :menus="menus" />
  <SideMenu :menus="menus" />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import MobileMenu from "./menu/MobileMenu.vue";
import SideMenu from "./menu/SideMenu.vue";

export default defineComponent({
  name: "Menu",

  components: {
    MobileMenu,
    SideMenu,
  },

  setup() {
    return {
      menus: [
        {
          name: "Dashboard",
          icon: "",
          subs: [],
        },
        {
          name: "Management",
          icon: "",
          subs: [
            {
              name: "User",
              icon: "",
              subs: [],
            },
            {
              name: "Role",
              icon: "",
              subs: [],
            },
          ],
        },
      ],
    };
  },
});
</script>