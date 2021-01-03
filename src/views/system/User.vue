<template>
    <Table :datas="datas" />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import instance from "../../api";
import SERVER_URL from "../../api/request";
import Table from "../../components/global/Table.vue";

export default defineComponent({
  name: "User",

  components: {
    Table,
  },

  setup() {
    const datas = ref([]);

    async function initDatas() {
      await instance
        .get(SERVER_URL.user.concat("?page=0&size=10"))
        .then((response) => {
          datas.value = response.data;
        });
    }

    onMounted(() => {
      initDatas();
    });

    return {
      datas,
    };
  },
});
</script>