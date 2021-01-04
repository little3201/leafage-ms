<template>
  <Tables :head="head" :titles="titles" :datas="datas" />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import instance from "../../api";
import SERVER_URL from "../../api/request";
import Tables from "/src/components/global/Tables.vue";

export default defineComponent({
  name: "Authority",

  components: {
    Tables,
  },

  setup() {
    const head = ref("Authority Tables");
    const titles = ref(["Code", "Name", "Path", "Superior","Type"]);
    const datas = ref([]);

    async function initDatas() {
      await instance
        .get(SERVER_URL.authority.concat("?page=0&size=10"))
        .then((response) => {
          datas.value = response.data;
        });
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