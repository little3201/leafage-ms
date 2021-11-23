<template>
  <Model
    :isShow="isShow"
    @cancelAction="$emit('treeOperate', false)"
    @commitAction="$emit('treeCommit', tracked)"
  >
    <ul>
      <TreeCore v-for="data in datas" :key="data.code" :data="data" />
    </ul>
  </Model>
</template>

<script lang="ts" setup>
import Model from "/@/components/global/Model.vue";
import TreeCore from "/@/components/tree/TreeCore.vue";

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
</script>