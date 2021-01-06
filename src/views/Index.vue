<template>
  <Report />
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import Report from "/src/components/global/Report.vue";

import instance from "../api";
import SERVER_URL from "../api/request";

export default defineComponent({
  name: "Dashboard",

  components: {
    Report,
  },

  setup() {
    const datas = ref([]);

    async function initList() {
      // await instance.get(SERVER_URL.role.concat("?page=0&size=10")).then(
      //   (response) => {
      //     datas.value = response.data;
      //   },
      //   (error) => {
      //     alert(error.statusText);
      //   }
      // );
    }

    onMounted(() => {
      initList();
    });

    return {
      datas,
    };
  },
});
</script>