<template>
  <div class="text-base">
    <TreeCore
      :data="data"
      :is-expand="isExpand"
      @open-operate="openOperate"
    >
      <input
        :id="data.code"
        v-model="isChecked"
        type="checkbox"
        :indeterminate="isIndeterminate"
        class="rounded cursor-pointer mr-4"
        aria-label="checked"
        @change="track(data)"
      >
    </TreeCore>
    <div
      v-show="isExpand"
      class="ml-4"
    >
      <TreeItem
        v-for="child in data.children"
        :key="child.code"
        :data="child"
        :ticked="innerTicked"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, PropType } from "vue";

import type { NodeData } from "@/api/request.type"
import TreeCore from "./TreeCore.vue";

const props = defineProps({
  data: {
    type: Object as PropType<NodeData>,
    default: () => {
      return {}
    }
  },
  ticked: {
    type: Array as PropType<string[]>,
    default: () => {
      return []
    }
  }
});

const emit = defineEmits(['update:ticked'])

let isExpand = ref(false);
let isChecked = ref(false)
let isIndeterminate = ref(false)

let innerTicked = ref<Array<string>>([]);

watch(
  () => [...props.ticked],
  (newTicked) => {
    innerTicked.value = newTicked

    let curdata = props.data
    if (innerTicked.value.includes(curdata.code)) {
      isChecked.value = true
    } else {
      isChecked.value = false
    }
  }
)

const track = (item: NodeData) => {
  let target = innerTicked.value
  const shouldEmit = props.ticked !== void 0

  if (shouldEmit === true) {
    target = target.slice()
  }

  if (isChecked.value) {
    target.push(item.code)
  } else {
    target = target.filter(k => item.code !== k)
  }

  if (shouldEmit === true) {
    emit('update:ticked', target)
  }

  console.log("ticked: ", target)
}

const openOperate = () => {
  isExpand.value = !isExpand.value
}
</script>