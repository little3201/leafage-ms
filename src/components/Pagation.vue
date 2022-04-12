<template>
  <div class="flex items-center mt-1 overflow-auto">
    <p class="hidden md:block">
      {{$t('pagation', {page: page * size + 1, size: (page + 1) * size, total: total})}}
    </p>
    <div class="flex flex-1 justify-end space-x-2">
      <button type="button" :disabled="page == 0"
        class="focus:outline-none w-8 h-8 hover:border border-gray-300 rounded-full inline-flex items-center justify-center"
        :class="{ 'text-gray-300 cursor-not-allowed': page == 0 }" @click="(page = 0), give(page)">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
          stroke-linecap="round" stroke-linejoin="round">
          <use :xlink:href="'/svg/feather-sprite.svg#' + 'chevrons-left'" />
        </svg>
      </button>
      <button type="button" :disabled="page == 0"
        class="focus:outline-none w-8 h-8 hover:border border-gray-300 rounded-full inline-flex items-center justify-center"
        :class="{ 'text-gray-300 cursor-not-allowed': page == 0 }" @click="decrease">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
          stroke-linecap="round" stroke-linejoin="round">
          <use :xlink:href="'/svg/feather-sprite.svg#' + 'chevron-left'" />
        </svg>
      </button>
      <span v-if="pages > 5 && page > 2" class>...</span>
      <button v-for="index in (pages <= 5 ? pages : (page < (pages - 5) ? page + 5 : pages))" :key="index" type="button"
        @click.prevent="give(index - 1)" v-text="index"
        class="focus:outline-none w-8 h-8 hover:border border-gray-300 rounded-full inline-flex items-center justify-center"
        :class="{
          'bg-white rounded-full border shadow-sm': index == page + 1,
          hidden: pages > 5 && (index > page + 3 || index < page - 1),
        }"></button>
      <span v-if="pages > 5 && page < pages">...</span>
      <button type="button" :disabled="page == pages - 1"
        class="focus:outline-none w-8 h-8 hover:border border-gray-300 rounded-full inline-flex items-center justify-center"
        :class="{ 'text-gray-300 cursor-not-allowed': page == pages - 1 }" @click="increment">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
          stroke-linecap="round" stroke-linejoin="round">
          <use :xlink:href="'/svg/feather-sprite.svg#' + 'chevron-right'" />
        </svg>
      </button>
      <button type="button" :disabled="page == pages - 1"
        class="focus:outline-none w-8 h-8 hover:border border-gray-300 rounded-full inline-flex items-center justify-center"
        :class="{ 'text-gray-300 cursor-not-allowed': page == pages - 1 }" @click="(page = pages - 1), give(page)">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
          stroke-linecap="round" stroke-linejoin="round">
          <use :xlink:href="'/svg/feather-sprite.svg#' + 'chevrons-right'" />
        </svg>
      </button>
      <select v-model.number="size" class="py-1 border border-gray-300 rounded-md">
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

const page = ref(props.page);
const size = ref(props.size);

/**
 * 监听size, 调用查询方法
 */
watch(size, (curSize, prevSize) => {
  if (curSize != prevSize) {
    give(page.value);
  }
});

const emit = defineEmits(["setPage", "retrieve"]);
/**
 * 设置分页
 */
const give = (p: number) => {
  page.value = p;
  emit("setPage", page.value, size.value);
  emit("retrieve");
}

/**
 * 计算总页数
 */
const pages = computed(() => {
  if (props.total) {
    if (props.total % size.value > 0) {
      // 通过 ~~number 来取整
      return ~~(props.total / size.value) + 1;
    } else {
      return ~~(props.total / size.value);
    }
  } else {
    return 1;
  }
});

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