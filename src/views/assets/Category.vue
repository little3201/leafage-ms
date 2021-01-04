<template>
  <Tables :head="head" :titles="titles" :datas="datas" />
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import Tables from "/src/components/global/Tables.vue";

import instance from "../../api";
import SERVER_URL from "../../api/request";

export default defineComponent({
  name: "Category",

  components: {
    Tables,
  },

  setup() {
    const head = ref("Category Tables");
    const titles = ref(["Code", "Alias"]);
    const datas = ref([]);

    async function initDatas() {
      await instance.get(SERVER_URL.category.concat("?page=0&size=10")).then(
        (response) => {
          datas.value = response.data;
        },
        (error) => {
          alert(error.statusText);
        }
      );
    }

    onMounted(() => {
      initDatas();
    });

    return {
      head,
      titles,
      datas,
    };
  },
});
</script>