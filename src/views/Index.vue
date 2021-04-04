<template>
  <div>
    <Report />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import Report from "/@/components/global/Report.vue";

import instance from "../api";
import SERVER_URL from "../api/request";

export default defineComponent({
  name: "Dashboard",

  components: {
    Report,
  },

  setup() {
    let data = ref<Array<Object>>(new Array<Object>());
    let name = ref("Category");
    const labels = ref<Array<String>>(new Array<String>());

    function initList() {
      instance.get(SERVER_URL.category).then((res) => {
        res.data.forEach((e: any) => {
          labels.value.push(e.alias);
          data.value.push(e.count);
        });
      });
    }

    onMounted(() => {
      initList();
    });

    return {
      name,
      data,
      labels
    };
  },
});
</script>