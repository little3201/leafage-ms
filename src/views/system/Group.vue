<template>
  <Tables :head="head" :titles="titles" :datas="datas" />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import instance from "../../api";
import SERVER_URL from "../../api/request";
import Tables from "/src/components/global/Tables.vue";

export default defineComponent({
  name: "Group",

  components: {
    Tables,
  },

  setup() {
    const head = ref("Group Tables");
    const titles = ref(["Code", "Name", "Principal", "Superior", "Description","User Count"]);
    const datas = ref([]);

    function initDatas() {
      instance
        .get(SERVER_URL.group.concat("?page=0&size=10"))
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