<template>
  <div class="text-base">
    <TreeCore
      :data="data"
      :is-expand="isExpand"
      @open-operate="openOperate"
    >
      <input
        :id="data.name"
        v-model="isChecked"
        type="checkbox"
        :indeterminate="isIndeterminate"
        class="rounded cursor-pointer mr-4"
        :aria-label="data.name"
        @change="onTicked(data.id, isChecked)"
      >
    </TreeCore>
    <div
      v-show="isExpand"
      class="ml-4"
    >
      <TreeItem
        v-for="child in data.children"
        :key="child.id"
        v-model:ticked="innerTicked"
        :data="child"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, PropType } from "vue";

import type { NodeData } from "~/api/request.type"
import TreeCore from "./TreeCore.vue";

const props = defineProps({
  data: {
    type: Object as PropType<NodeData>,
    default: () => {
      return {}
    }
  },
  ticked: {
    type: Array as PropType<number[]>,
    default: () => {
      return []
    }
  }
});

const emit = defineEmits(['update:ticked'])

let innerTicked = ref<Array<number>>([]);

let isChecked = ref(innerTicked.value.includes(props.data.id) || false)
let isIndeterminate = ref(false)
let isExpand = ref(false);

watch(
  () => props.ticked,
  (val) => {
    innerTicked.value = val
  }
)

const onTicked = (id: number, state: boolean) => {
  setTicked([id], state)
}

const setTicked = (keys: Array<number>, state: boolean) => {
  let target = innerTicked.value
  const shouldEmit = props.ticked !== void 0

  if (shouldEmit === true) {
    target = target.slice()
  }

  if (state) {
    target = target.concat(keys).filter((key, index, self) => self.indexOf(key) === index)
  } else {
    target = target.filter(k => keys.includes(k) === false)
  }

  if (shouldEmit === true) {
    emit('update:ticked', target)
  }
}

const openOperate = () => {
  isExpand.value = !isExpand.value
}
</script>