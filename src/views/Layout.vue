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
        <router-view> </router-view>
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import MobileMenu from "/@/components/sections/MobileMenu.vue";
import SideMenu from "/@/components/sections/SideMenu.vue";
import TopBar from "/@/components/sections/TopBar.vue";

import instance from "../api";
import SERVER_URL from "../api/request";

const datas = ref([]);

onMounted(() => {
  retrieveAuthorities();
});

const retrieveAuthorities = async () => {
  let user = sessionStorage.getItem("user");
  if (user) {
    let username = JSON.parse(user).username;
    await instance
      .get(SERVER_URL.user.concat("/", username, "/authority"), {
        params: { type: "M" },
      })
      .then((res) => {
        datas.value = res.data;
      });
  }
};
</script>