<template>
  <Model
    :isShow="isShow"
    @cancelAction="$emit('cancelAction')"
    @commitAction="$emit('commitAction', checked)"
  >
    <ul>
      <TreeCore
        v-for="data in datas"
        :key="data.code"
        :data="data"
        :checked="checked"
        @trackedOperate="tracked"
      />
    </ul>
  </Model>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import Model from "/@/components/Model.vue";
import TreeCore from "/@/components/tree/TreeCore.vue";

const props = defineProps({
  isShow: {
    type: Boolean,
    default: false,
  },
  datas: {
    type: Array,
    default: [],
  },
  codes: {
    type: Array,
    default: []
  }
});

let checked = ref(props.codes)

const tracked = (code: string) => {
  console.log("code: " + code)
  if (checked.value.includes(code)) {
    checked.value.splice(checked.value.indexOf(code), 1)
  } else {
    checked.value.push(code)
  }
}
</script>