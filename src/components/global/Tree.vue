<template>
  <Model :isShow="isShow" @cancelAction="cancelOperation">
    <TreeCore :datas="datas" />
  </Model>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Model from "/@/components/global/Model.vue";
import TreeCore from "./TreeCore.vue";

export default defineComponent({
  name: "Tree",

  components: {
    Model,
    TreeCore,
  },

  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    datas: {
      type: Array,
      default: [],
    },
  },

  methods: {
    cancelOperation() {
      this.$emit("treeAction", false);
    },
    commitOperation() {
      
    },
  },
});
</script>