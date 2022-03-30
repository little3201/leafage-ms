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

import type { TreeNode } from "@/api/request.type";

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
    type: Array as PropType<string[]>,
    default: []
  }
});

let checked = ref<Array<string>>([])

watch(
  () => [...props.codes],
  (newValue) => {
    checked.value = newValue
  }
)

/**
 * 选中/取消
 */
const track = (node: TreeNode) => {
  let isCheck = false;
  if (checked.value.indexOf(node.code) == -1) {
    checked.value.push(node.code)
    isCheck = true
  } else {
    checked.value.splice(checked.value.indexOf(node.code), 1)
  }

  recurrenceChildren(node.children, isCheck)
}
/**
 * 递归子节点
 * @param children 子节点 
 * @param isCheck 是否勾选 
 */
const recurrenceChildren = (children: Array<TreeNode>, isCheck: boolean) => {
  if (children && children.length > 0) {
    children.forEach((item: TreeNode) => {
      if (isCheck) {
        if (checked.value.indexOf(item.code) == -1) {
          checked.value.push(item.code)
        }
      } else {
        checked.value.splice(checked.value.indexOf(item.code), 1)
      }
      recurrenceChildren(item.children, isCheck)
    })
  }
}
/**
 * 递归父节点
 * @param code 当前节点
 * @param datas 所有tree数据
 */
const recurrenceParents = (code: string, datas: Array<TreeNode>) => {
  for (let item of datas) {
    if (item.code === code) {
      return []
    }
    if (item.children && item.children.length > 0) {
      let codes = recurrenceParents(code, item.children)
      if (codes) {
        return codes.concat(item.code)
      }
    }
  }
}
</script>