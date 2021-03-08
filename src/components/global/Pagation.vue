<template>
  <div class="flex items-center mb-3">
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
        <button type="button" class="focus:outline-none w-8 h-8">...</button>
      </li>
      <li v-for="index in pages" :key="index">
        <button
          type="button"
          @click.prevent="give(index - 1)"
          v-text="index"
          class="focus:outline-none w-8 h-8"
          :class="{
            'bg-white rounded-full border shadow-sm': index == page + 1,
            hidden: page > 3 && index < 4,
          }"
        ></button>
      </li>
      <li v-if="pages / size > 6 && page < 4">
        <button type="button" class="focus:outline-none w-8 h-8">...</button>
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
      class="my-1 block py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    >
      <option>10</option>
      <option>25</option>
      <option>35</option>
      <option>50</option>
    </select>
  </div>
</template>


<script lang="ts">
import { computed, defineComponent, ref } from "vue";

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
    // 设置
    give(page: number) {
      this.page = page;
      this.$emit("retrieve", this.page, this.size);
    },
  },

  setup(props) {
    let page = ref(0);
    let size = ref(10);
    let pages = computed(() => {
      if (props.total) {
        if (props.total % size.value > 0) {
          console.log(props.total / size.value)
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
    };
  },
});
</script>