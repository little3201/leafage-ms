<template>
  <div class="my-1 px-2 hover:bg-gray-300 hover:bg-opacity-30 rounded-md">
    <div class="flex flex-1 items-center">
      <button
        v-if="data.children && data.children.length > 0"
        type="button"
        :name="data.name"
        :aria-label="data.name"
        :title="data.name"
        class="flex flex-1 items-center focus:outline-none"
        @click="openOperate"
      >
        <component
          :is="data.expand.icon"
          v-if="data.expand && data.expand.icon"
          class="w-4 h-4 mr-2"
          aria-hidden="true"
        />
        <span class="py-1  mr-auto">{{ data.name }}</span>
        <ChevronDownIcon
          v-if="isExpand"
          class="w-5 h-5 ml-4"
          aria-hidden="true"
        />
        <ChevronRightIcon
          v-else
          class="w-5 h-5 ml-4"
          aria-hidden="true"
        />
      </button>
      <label
        v-else
        :for="data.name"
        class="flex flex-1 items-center cursor-pointer"
      >
        <component
          :is="data.expand.icon"
          v-if="data.expand && data.expand.icon"
          class="w-4 h-4 mr-2"
          aria-hidden="true"
        />
        <span class="py-1 ">{{ data.name }}</span>
      </label>
    </div>
  </div>
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
</template>

<script lang="ts" setup>
import { ref, watch, PropType } from "vue";

import { ChevronRightIcon, ChevronDownIcon } from '@heroicons/vue/24/outline'
import type { NodeData } from "~/api/request.type"

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