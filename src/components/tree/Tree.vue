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
        @treeOperate="track"
      />
    </ul>
  </Model>
</template>

<script lang="ts" setup>
import { ref, watch, PropType } from 'vue'

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

let checked = ref<Array<String>>([])

watch(
  () => [...props.codes],
  (newValue, oldValue) => {
    checked.value = newValue
  }
)

/**
 * 选中/取消
 */
const track = (node: TreeNode) => {
  let isCheck = false;
  if (checked.value.indexOf(node.code) === -1) {
    checked.value.push(node.code)
    isCheck = true
  } else {
    checked.value.splice(checked.value.indexOf(node.code), 1)
  }
  recurrence(node.children, isCheck)
}
/**
 * 递归
 */
const recurrence = (children: Array<TreeNode>, isCheck: boolean) => {
  if (children && children.length > 0) {
    children.forEach((item: TreeNode) => {
      if (isCheck) {
        if (checked.value.indexOf(item.code) === -1) {
          checked.value.push(item.code)
        }
      } else {
        checked.value.splice(checked.value.indexOf(item.code), 1)
      }
      recurrence(item.children, isCheck)
    })
  }
}
</script>