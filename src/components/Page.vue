<template>
  <div class="flex items-center mt-1 overflow-auto">
    <p class="hidden md:block">
      {{ $t('Page', { page: page * size + 1, size: (page + 1) * size, total: total }) }}
    </p>
    <div class="flex flex-1 justify-end space-x-2">
      <button
        type="button"
        name="fist-page"
        aria-label="first-page"
        :disabled="page == 0"
        class="focus:outline-none w-8 h-8 hover:border border-gray-300 rounded-full"
        :class="{ 'text-gray-300 cursor-not-allowed': page == 0 }"
        @click="(page = 0), give(page)"
      >
        <ChevronDoubleLeftIcon
          class="w-5 h-5 mx-auto"
          aria-hidden="true"
        />
      </button>
      <button
        type="button"
        name="page-decrease"
        aria-label="page-decrease"
        :disabled="page == 0"
        class="focus:outline-none w-8 h-8 hover:border border-gray-300 rounded-full"
        :class="{ 'text-gray-300 cursor-not-allowed': page == 0 }"
        @click="decrease"
      >
        <ChevronLeftIcon
          class="w-5 h-5 mx-auto"
          aria-hidden="true"
        />
      </button>
      <span
        v-if="pages > 5 && page > 2"
        class
      >...</span>
      <button
        v-for="index in (pages <= 5 ? pages : (page < (pages - 5) ? page + 5 : pages))"
        :key="index"
        type="button"
        :name="`page-${index}`"
        :aria-label="`page-${index}`"
        class="focus:outline-none w-8 h-8 hover:border border-gray-300 rounded-full"
        :class="{
          'bg-white rounded-full border shadow-sm': index == page + 1,
          hidden: pages > 5 && (index > page + 3 || index < page - 1),
        }"
        @click="give(index - 1)"
      >
        {{ index }}
      </button>
      <span v-if="pages > 5 && page < pages - 1">...</span>
      <button
        type="button"
        name="page-increment"
        aria-label="page-increment"
        :disabled="page == pages - 1"
        class="focus:outline-none w-8 h-8 hover:border border-gray-300 rounded-full"
        :class="{ 'text-gray-300 cursor-not-allowed': page == pages - 1 }"
        @click="increment"
      >
        <ChevronRightIcon
          class="w-5 h-5 mx-auto"
          aria-hidden="true"
        />
      </button>
      <button
        type="button"
        :disabled="page == pages - 1"
        name="last-page"
        aria-label="last-page"
        class="focus:outline-none w-8 h-8 hover:border border-gray-300 rounded-full"
        :class="{ 'text-gray-300 cursor-not-allowed': page == pages - 1 }"
        @click="(page = pages - 1), give(page)"
      >
        <ChevronDoubleRightIcon
          class="w-5 h-5 mx-auto"
          aria-hidden="true"
        />
      </button>
      <select
        v-model.number="size"
        class="py-1 border border-gray-300 rounded-md"
        aria-label="page size"
      >
        <option>10</option>
        <option>15</option>
        <option>20</option>
        <option>30</option>
        <option>50</option>
      </select>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { computed, ref, watch } from "vue";

import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  total: {
    type: Number,
    default: 0,
  },
  page: {
    type: Number,
    default: 0,
  },
  size: {
    type: Number,
    default: 10,
  },
});

const emit = defineEmits(["setPage", "retrieve"]);

const page = ref(props.page);
const size = ref(props.size);

/**
 * 计算总页数
 * 通过 ~~number 来取整
 */
const pages = computed(() => {
  let pg = 1
  if (props.total) {
    if (props.total % size.value > 0) {
      pg = ~~(props.total / size.value) + 1;
    } else {
      pg = ~~(props.total / size.value);
    }
  }
  give(page.value)
  return pg
});
/**
 * 监听size, 调用查询方法
 */
watch(size, (curSize, prevSize) => {
  if (curSize != prevSize) {
    give(page.value);
  }
});

/**
 * 设置分页
 */
const give = (p: number) => {
  if (p > pages.value) {
    p = pages.value - 1
  }
  page.value = p;
  emit("setPage", page.value, size.value);
  emit("retrieve");
}

/**
 * 页码递增
 */
const increment = () => {
  if (page.value < pages.value - 1) {
    page.value++;
    give(page.value);
  }
};

/**
 * 页码递减
 */
const decrease = () => {
  if (page.value > 0) {
    page.value--;
    give(page.value);
  }
};
</script>