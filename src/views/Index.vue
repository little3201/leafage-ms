<template>
  <div>
    <Landing />
    <Feature />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Landing from "../components/common/Landing.vue";
import Feature from "../components/sections/Feature.vue";

export default defineComponent({
  name: "Home",

  components: {
    Landing,
    Feature,
  },

  setup() {
    return {};
  },
});
</script>