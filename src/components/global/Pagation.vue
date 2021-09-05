<template>
  <div class="flex items-center mt-1 mb-3">
    <div class="hidden md:block">
      当前展示第&nbsp;
      <span v-text="page * size + 1"></span>&nbsp;-
      <span v-text="(page + 1) * size"></span>&nbsp;行记录，共&nbsp;
      <span v-text="total"></span>
      &nbsp;条记录
    </div>
    <ul class="inline-flex items-center ml-auto">
      <li>
        <button
          type="button"
          class="focus:outline-none w-8 h-8"
          :class="{ 'text-gray-300 cursor-not-allowed': page < 1 }"
          @click="(page = 0), give(page)"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="mr-2"
          >
            <use :xlink:href="'/svg/feather-sprite.svg#' + 'chevrons-left'" />
          </svg>
        </button>
      </li>
      <li>
        <button
          type="button"
          class="focus:outline-none w-8 h-8"
          :class="{ 'text-gray-300 cursor-not-allowed': page < 1 }"
          @click="decrease"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="mr-2"
          >
            <use :xlink:href="'/svg/feather-sprite.svg#' + 'chevron-left'" />
          </svg>
        </button>
      </li>
      <li v-if="pages > 5 && page > 0">
        <button type="button" class="focus:outline-none w-8 h-8 mr-2">...</button>
      </li>
      <li v-for="index in pages <= 5 ? pages : page + 5" :key="index">
        <button
          type="button"
          @click.prevent="give(index - 1)"
          v-text="index"
          class="focus:outline-none w-8 h-8 mr-2"
          :class="{
            'bg-white rounded-full border shadow-sm': index == page + 1,
            hidden: pages > 5 && (index > page + 5 || index < page + 1),
          }"
        ></button>
      </li>
      <li v-if="pages > 5 && page < pages">
        <button type="button" class="focus:outline-none w-8 h-8 mr-2">...</button>
      </li>
      <li>
        <button
          type="button"
          class="focus:outline-none w-8 h-8"
          :class="{ 'text-gray-300 cursor-not-allowed': page == pages - 1 }"
          @click="increment"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="mr-2"
          >
            <use :xlink:href="'/svg/feather-sprite.svg#' + 'chevron-right'" />
          </svg>
        </button>
      </li>
      <li>
        <button
          type="button"
          class="focus:outline-none w-8 h-8"
          :class="{ 'text-gray-300 cursor-not-allowed': page == pages - 1 }"
          @click="(page = pages - 1), give(page)"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="mr-2"
          >
            <use :xlink:href="'/svg/feather-sprite.svg#' + 'chevrons-right'" />
          </svg>
        </button>
      </li>
    </ul>
    <select v-model.number="size" class="py-1 border border-gray-300 rounded-md">
      <option>10</option>
      <option>15</option>
      <option>20</option>
      <option>30</option>
      <option>50</option>
    </select>
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

// 监听size, 调用查询方法
watch(size, (curSize, prevSize) => {
  if (curSize != prevSize) {
    give(page.value);
  }
});

const emit = defineEmits(["setPage", "retrieve"]);
// 设置
function give(p: number) {
  page.value = p;
  emit("setPage", page.value, size.value);
  emit("retrieve");
}

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

// 递增
const increment = () => {
  if (page.value < pages.value - 1) {
    page.value++;
    give(page.value);
  }
};

// 递减
const decrease = () => {
  if (page.value > 0) {
    page.value--;
    give(page.value);
  }
};
</script>