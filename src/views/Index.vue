<template>
  <div>
    <MobileMenu />
    <div class="flex">
    <SideMenu />
    <div class="content">
      <TopBar />
      <div class="grid grid-cols-12 gap-6">
        <div class="col-span-12 xxl:col-span-9 grid grid-cols-12 gap-6">
          <!-- BEGIN: General Report -->
          <Report />
          <Table :datas="datas" />
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import MobileMenu from "../components/common/MobileMenu.vue";
import SideMenu from "../components/common/SideMenu.vue";

import Table from "../components/common/Table.vue";
import Report from "../components/common/Report.vue";
import TopBar from "../components/common/TopBar.vue";

import instance from "../api";
import SERVER_URL from "../api/request";

export default defineComponent({
  name: "Home",

  components: {
    MobileMenu,
    SideMenu,
    TopBar,
    Table,
    Report,
  },

  setup () {
    const datas = ref([]);

    async function initList() {
      await instance.get(SERVER_URL.role.concat("?page=0&size=10")).then(
        (response) => {
          datas.value = response.data;
        },
        (error) => {
          // alert(error.statusText);
        }
      );
    }

    onMounted(() => {
      initList();
    });

    return {
      datas,
    };
  }

});
</script>