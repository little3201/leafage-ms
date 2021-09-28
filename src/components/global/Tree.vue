<template>
  <Model
    :isShow="isShow"
    @cancelAction="$emit('treeAction', false)"
    @commitAction="$emit('treeAction', checked)"
  >
    <ul>
      <TreeCore
        v-for="data in datas"
        :key="data.code"
        :data="data"
        @addChecked="addChecked"
        @delChecked="delChecked"
      />
    </ul>
  </Model>
</template>

<script lang="ts" setup>
import { ref } from "vue";

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

const checked = ref<Array<String>>([])

const addChecked = (code: String) => {
  checked.value.push(code)
}

const delChecked = (code: String) => {
  checked.value.splice(checked.value.indexOf(code), 1)
}
</script>