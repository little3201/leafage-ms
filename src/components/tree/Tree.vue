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
        @treeOperate="tracked"
      />
    </ul>
  </Model>
</template>

<script lang="ts" setup>
import { ref, PropType } from 'vue'

import Model from "@/components/Model.vue";
import TreeCore from "@/components/tree/TreeCore.vue";

import { TreeNode } from "@/api/request";

const props = defineProps({
  isShow: {
    type: Boolean,
    default: false,
  },
  datas: {
    type: Array as PropType<TreeNode[]>,
    default: [],
  },
  codes: {
    type: Array as PropType<String[]>,
    default: []
  }
});

let checked = ref<Array<String>>(props.codes)

/**
 * 选中/取消
 */
const tracked = (node: TreeNode) => {
  debugger
  if (checked.value.indexOf(node.code) === -1) {
    checked.value.push(node.code)
    recurrence(node, true)
  } else {
    checked.value.splice(checked.value.indexOf(node.code), 1)
    recurrence(node, false)
  }
  console.log("tracked: "  + checked.value)
}
/**
 * 递归
 */
const recurrence = (node: TreeNode, isChecked: boolean) => {
  if (node.children && node.children.length > 0) {
    node.children.forEach((item: TreeNode) => {
      if (isChecked && checked.value.indexOf(item.code) === -1) {
        checked.value.push(item.code)
      } else {
        checked.value.splice(checked.value.indexOf(item.code), 1)
      }
      recurrence(item, isChecked)
    })
  }

}
</script>