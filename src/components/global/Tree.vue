<template>
  <Model :isShow="isShow" @cancelAction="cancelOperation">
    <TreeCore :datas="datas" />
  </Model>
</template>

<script lang="ts" setup>
import Model from "/@/components/global/Model.vue";
import TreeCore from "/@/components/global/TreeCore.vue";

defineProps({
  isShow: {
    type: Boolean,
    default: false,
  },
  datas: {
    type: Array,
    default: [],
  },
});

const emit = defineEmits(["treeAction"]);

const cancelOperation = () => {
  emit("treeAction", false);
};
const commitOperation = () => { };
</script>