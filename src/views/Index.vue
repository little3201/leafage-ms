<template>
  <Report />
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import Report from "/@/components/global/Report.vue";

export default defineComponent({
  name: "Dashboard",

  components: {
    Report,
  },

  setup() {

    async function initList() {
    }

    onMounted(() => {
      initList();
    });

    return {
    };
  },
});
</script>