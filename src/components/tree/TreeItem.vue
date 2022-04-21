<template>
  <div class="text-base">
    <TreeCore :data="data" @openOperate="openOperate" :isExpand="isExpand">
      <input :id="data.code" type="checkbox" class="rounded cursor-pointer mr-4" :value="data.code"
        v-model="innerTicked" @click="track(data)" />
    </TreeCore>
    <div v-show="isExpand" class="ml-4">
      <TreeItem v-for="child in data.children" :key="child.code" :data="child" :ticked="innerTicked"
        @treeOperate="track" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, PropType } from "vue";

import type { TreeNode } from "@/api/request.type"
import TreeCore from "./TreeCore.vue";

const props = defineProps({
  data: {
    type: Object as PropType<TreeNode>,
    default: {}
  },
  ticked: {
    type: Array as PropType<string[]>,
    default: []
  }
});

const emit = defineEmits(['update:ticked'])

let isExpand = ref(false);

let innerTicked = ref<Array<string>>([]);

watch(
  () => [...props.ticked],
  (newValue) => {
    innerTicked.value = newValue
  }
)

watch(
  () => [...props.ticked],
  (newValue) => {
    innerTicked.value = newValue
  }
)

const setTicked = (keys, state) => {
  let target = innerTicked.value
  const shouldEmit = props.ticked !== void 0

  if (shouldEmit === true) {
    target = target.slice()
  }

  if (state) {
    target = target.concat(keys)
      .filter((key, index, self) => self.indexOf(key) === index)
  }
  else {
    target = target.filter(k => keys.includes(k) === false)
  }

  if (shouldEmit === true) {
    emit('update:ticked', target)
  }
}

const track = (node: TreeNode) => {
  emit('treeOperate', node)
}

const openOperate = () => {
  isExpand.value = !isExpand.value
}
</script>