<template>
  <div class="col-span-12 mt-2">
    <div class="flex justify-between items-center h-10">
      <h2 class="text-lg font-medium">Category</h2>
      <button
        @click="retrieve(0, 10)"
        class="ml-4 flex items-center text-blue-600 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-rotate-cw mr-2"
        >
          <polyline points="23 4 23 10 17 10"></polyline>
          <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
        </svg>
        Reload Data
      </button>
      <Operation @modelOperate="modelOperate" />
    </div>
    <div class="overflow-auto">
      <table class="mt-2 w-full truncate" aria-label="category">
        <thead>
          <tr class="uppercase text-center text-xs sm:text-sm h-12">
            <th scope="col" class="px-4 py-2 md:px-5 md:py-3 text-left">No.</th>
            <th scope="col" class="px-4 py-2 md:px-5 md:py-3">Alias</th>
            <th scope="col" class="px-4 py-2 md:px-5 md:py-3">Code</th>
            <th scope="col" class="px-4 py-2 md:px-5 md:py-3">Posts Count</th>
            <th scope="col" class="px-4 py-2 md:px-5 md:py-3">Modify Time</th>
            <th scope="col" class="px-4 py-2 md:px-5 md:py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="text-center bg-white border-8 border-gray-100"
            v-for="(data, index) in datas"
            :key="index"
          >
            <td class="px-4 py-2 md:px-5 md:py-3">
              {{ index + 1 }}
            </td>
            <td class="px-4 py-2 md:px-5 md:py-3">
              <a
                rel="noopener"
                href="https://www.leafage.top/posts"
                target="_blank"
                class="font-medium text-blue-600"
                v-text="data.alias"
              ></a>
            </td>
            <td class="px-4 py-2 md:px-5 md:py-3" v-text="data.code"></td>
            <td class="px-4 py-2 md:px-5 md:py-3" v-text="data.count"></td>
            <td
              class="px-4 py-2 md:px-5 md:py-3"
              v-text="new Date(data.modifyTime).toLocaleDateString()"
            ></td>
            <td class="px-4 py-2 md:px-5 md:py-3">
              <Action
                :code="data.code"
                @delAction="confirmOperate"
                @editAction="modelOperate"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Pagation @retrieve="retrieve" :total="total" />
    <Confirm :isDel="isDel" @delAction="confirmOperate" />
    <Model
      :code="categoryData.code"
      :isEdit="isEdit"
      @editAction="modelOperate"
      @commitAction="commitOperate"
    >
      <form class="w-full">
        <div class="grid grid-cols-12">
          <div class="col-span-12">
            <label>Alias</label>
            <input
              type="text"
              class="block w-full rounded-md border-gray-300 shadow-sm"
              placeholder="Alias"
              v-model="categoryData.alias"
            />
          </div>
          <div class="col-span-12">
            <label>Description</label>
            <textarea
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              v-model="categoryData.description"
              placeholder="Description"
            />
          </div>
        </div>
      </form>
    </Model>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";

import Operation from "/@/components/global/Operation.vue";
import Action from "/@/components/global/Action.vue";
import Pagation from "/@/components/global/Pagation.vue";
import Confirm from "/@/components/global/Confirm.vue";
import Model from "/@/components/global/Model.vue";

import instance from "../../api";
import SERVER_URL from "../../api/request";

import swal from "sweetalert";

export default defineComponent({
  name: "Category",

  components: {
    Operation,
    Action,
    Pagation,
    Confirm,
    Model,
  },

  data() {
    return {
      isEdit: false,
      isDel: false,
      categoryData: {},
    };
  },

  methods: {
    // 删除确认
    confirmOperate(isDel: boolean) {
      this.isDel = isDel;
    },
    // 新增/编辑：打开
    modelOperate(isEdit: boolean, code: string) {
      this.categoryData = {};
      if (isEdit && code) {
        instance
          .get(SERVER_URL.category.concat("/").concat(code))
          .then((res) => {
            this.categoryData = res.data;
          });
      }
      this.isEdit = isEdit;
    },
    // 新增/编辑：提交
    commitOperate(code: string) {
      let data = this.categoryData;
      if (code && code.length > 0) {
        instance
          .put(SERVER_URL.category.concat("/", code), data)
          .then((res) => {
            // 将datas中修改项的历史数据删除
            this.datas = this.datas.filter((item: any) => item.code != code);
            // 将结果添加到第一个
            this.datas.unshift(res.data);
            swal("Operated Success!", "you updated the item", "success");
          });
      } else {
        instance.post(SERVER_URL.category, data).then((res) => {
          if (this.datas.length >= 10) {
            // 删除第一个
            this.datas.shift();
          }
          // 将结果添加到第一个
          this.datas.unshift(res.data);
          swal("Operated Success!", "you add a new item", "success");
        });
      }
      this.isEdit = false;
    },
  },

  setup() {
    const datas = ref<any>([]);
    const total = ref(0);

    // 初始化数据
    async function initDatas(page: number, size: number) {
      await Promise.all([count(), retrieve(page, size)]);
    }
    // 统计数据
    async function count() {
      await instance.get(SERVER_URL.category.concat("/count")).then((res) => {
        total.value = res.data;
      });
    }
    // 查询列表
    async function retrieve(page: number, size: number) {
      await instance
        .get(SERVER_URL.category.concat("?page=" + page, "&size=" + size))
        .then((res) => {
          datas.value = res.data;
        });
    }

    onMounted(() => {
      initDatas(0, 10);
    });

    return {
      datas,
      total,
      retrieve,
    };
  },
});
</script>