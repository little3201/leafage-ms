<template>
  <Tables :datas="datas" />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import instance from "../../api";
import SERVER_URL from "../../api/request";
import Tables from "/src/components/global/Tables.vue";

export default defineComponent({
  name: "Role",

  components: {
    Tables,
  },

  setup() {
    const datas = ref([]);

    function initDatas() {
      instance
        .get(SERVER_URL.role.concat("?page=0&size=10"))
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