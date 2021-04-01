<template>
  <div>
    <Report />
    <Doughnut
      :data="[25, 75, 30]"
      :labels="['Red', 'Green', 'Blue']"
      :colors="['red', 'green', 'blue']"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import Report from "/@/components/global/Report.vue";
import Doughnut from "/@/components/global/Doughnut.vue";

export default defineComponent({
  name: "Dashboard",

  components: {
    Report,
    Doughnut,
  },

  setup() {
    async function initList() {}

    onMounted(() => {
      initList();
    });

    return {};
  },
});
</script>