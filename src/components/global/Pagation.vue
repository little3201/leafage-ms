<template>
  <div class="flex items-center mt-1 mb-3">
    <div class="hidden md:block">
      当前展示第&nbsp;<span v-text="page * size + 1"></span>&nbsp;-
      <span v-text="(page + 1) * size"></span>&nbsp;行记录，共&nbsp;
      <span v-text="total"></span>
      &nbsp;条记录
    </div>
    <ul class="inline-flex items-center ml-auto">
      <li>
        <button
          type="button"
          class="focus:outline-none w-8 h-8"
          @click="(this.page = 0), give(page)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-chevrons-left"
          >
            <polyline points="11 17 6 12 11 7"></polyline>
            <polyline points="18 17 13 12 18 7"></polyline>
          </svg>
        </button>
      </li>
      <li>
        <button
          type="button"
          class="focus:outline-none w-8 h-8"
          @click="decrease"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-chevron-left"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
      </li>
      <li v-if="page > 3">
        <button type="button" class="focus:outline-none w-8 h-8 mr-2">
          ...
        </button>
      </li>
      <li v-for="index in pages" :key="index">
        <button
          type="button"
          @click.prevent="give(index - 1)"
          v-text="index"
          class="focus:outline-none w-8 h-8 mr-2"
          :class="{
            'bg-white rounded-full border shadow-sm': index == page + 1,
            hidden: page > 3 && index < 4,
          }"
        ></button>
      </li>
      <li v-if="pages / size > 6 && page < 4">
        <button type="button" class="focus:outline-none w-8 h-8 mr-2">
          ...
        </button>
      </li>
      <li>
        <button
          type="button"
          class="focus:outline-none w-8 h-8"
          @click="increment"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-chevron-right"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </li>
      <li>
        <button
          type="button"
          class="focus:outline-none w-8 h-8"
          @click="(page = pages - 1), give(page)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-chevrons-right"
          >
            <polyline points="13 17 18 12 13 7"></polyline>
            <polyline points="6 17 11 12 6 7"></polyline>
          </svg>
        </button>
      </li>
    </ul>
    <select v-model="size" class="py-1 border border-gray-300 rounded-md">
      <option>10</option>
      <option>15</option>
      <option>20</option>
      <option>30</option>
      <option>50</option>
    </select>
  </div>
</template>


<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";

export default defineComponent({
  name: "Pagation",

  props: {
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
  },

  setup(props, ctx) {
    let page = ref(props.page);
    let size = ref(props.size);

    // 监听size, 调用查询方法
    watch(size, (curSize, prevSize) => {
      if (curSize != prevSize) {
        give(page.value);
      }
    });

    // 设置
    function give(p: number) {
      page.value = p;
      ctx.emit("setPage", page.value, size.value);
      ctx.emit("retrieve");
    }

    let pages = computed(() => {
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
    function increment() {
      if (page.value < pages.value - 1) {
        page.value++;
        give(page.value);
      }
    }

    // 递减
    function decrease() {
      if (page.value > 0) {
        page.value--;
        give(page.value);
      }
    }

    return {
      page,
      size,
      pages,
      give,
      increment,
      decrease,
    };
  },
});
</script>