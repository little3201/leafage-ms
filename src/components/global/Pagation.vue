<template>
  <div class="flex items-center mt-1 mb-3">
    <ul class="flex items-center mr-0 sm:mr-auto">
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
    <select
      v-model="size"
      class="block border border-gray-300 rounded-md sm:text-sm"
    >
      <option>10</option>
      <option>20</option>
      <option>35</option>
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
  },

  methods: {
    // 递增
    increment() {
      if (this.page < this.pages - 1) {
        this.page++;
        this.give(this.page);
      }
    },
    // 递减
    decrease() {
      if (this.page > 0) {
        this.page--;
        this.give(this.page);
      }
    },
  },

  setup(props, ctx) {
    let page = ref(0);
    let size = ref(10);

    // 监听size, 调用查询方法
    watch(size, (curSize, prevSize) => {
      give(page.value);
    });

    // 设置
    function give(p: number) {
      page.value = p;
      ctx.emit("retrieve", page.value, size.value);
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

    return {
      page,
      size,
      pages,
      give,
    };
  },
});
</script>