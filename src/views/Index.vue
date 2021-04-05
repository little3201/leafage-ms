<template>
  <div>
    <Report />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Report from "/@/components/global/Report.vue";

export default defineComponent({
  name: "Dashboard",

  components: {
    Report,
  },
});
</script>