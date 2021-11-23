<template>
  <div class="col-span-12 mt-2">
    <div class="flex justify-between items-center">
      <h2 class="text-lg font-medium">Category</h2>
      <button
        @click="retrieve()"
        class="ml-4 inline-flex items-center text-blue-600 focus:outline-none active:cursor-wait"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="mr-2"
        >
          <use :xlink:href="'/svg/feather-sprite.svg#' + 'rotate-cw'" />
        </svg>
        Reload Data
      </button>
      <Operation @click.capture="dataCode = ''" @modelOperate="modelOperate" />
    </div>
    <div class="overflow-scroll" style="height: calc(100vh - 12rem)">
      <table class="w-full overflow-ellipsis whitespace-nowrap" aria-label="category">
        <thead>
          <tr class="sticky top-0 bg-gray-100 uppercase text-center text-xs sm:text-sm">
            <th scope="col" class="px-4 py-2 sm:py-3 text-left">No.</th>
            <th scope="col" class="px-4">Alias</th>
            <th scope="col" class="px-4">Code</th>
            <th scope="col" class="px-4">Description</th>
            <th scope="col" class="px-4">Posts Count</th>
            <th scope="col" class="px-4">Modify Time</th>
            <th scope="col" class="px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="text-center bg-white border-t-4 border-b-4 sm:border-t-8 sm:border-b-8 first:border-t-0 last:border-b-0 border-gray-100"
            v-for="(data, index) in datas"
            :key="index"
          >
            <td class="px-4 py-2 sm:py-3 text-left">{{ index + 1 }}</td>
            <td class="px-4">
              <a
                rel="noopener"
                href="https://www.leafage.top/posts"
                target="_blank"
                class="font-medium text-blue-600"
                v-text="data.alias"
              ></a>
            </td>
            <td class="px-4" v-text="data.code"></td>
            <td class="px-4" v-text="data.description"></td>
            <td class="px-4" v-text="data.count"></td>
            <td class="px-4" v-text="new Date(data.modifyTime).toLocaleDateString()"></td>
            <td class="px-4">
              <Action
                @click.capture="dataCode = data.code"
                @delAction="confirmOperate"
                @editAction="modelOperate"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Pagation @retrieve="retrieve" :total="total" :page="page" :size="size" @setPage="setPage" />
    <Confirm :isShow="isDel" @cancelAction="confirmOperate" @commitAction="confirmCommit" />
    <Model :isShow="isEdit" @cancelAction="modelOperate" @commitAction="modelCommit">
      <form class="w-full">
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-12">
            <label for="alias">Alias</label>
            <input
              id="alias"
              type="text"
              class="mt-1 w-full rounded-md border-gray-300 shadow-sm"
              placeholder="Alias"
              required
              autofocus
              v-model.trim="categoryData.alias"
            />
          </div>
          <div class="col-span-12">
            <label for="description">Description</label>
            <textarea
              id="description"
              class="mt-1 w-full rounded-md border-gray-300 shadow-sm"
              v-model.trim="categoryData.description"
              placeholder="Description"
            />
          </div>
        </div>
      </form>
    </Model>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";

import Operation from "/@/components/global/Operation.vue";
import Action from "/@/components/global/Action.vue";
import Pagation from "/@/components/global/Pagation.vue";
import Confirm from "/@/components/global/Confirm.vue";
import Model from "/@/components/global/Model.vue";

import instance from "../../api";
import SERVER_URL from "../../api/request";

// 模态框参数
let isEdit = ref(false);
let isDel = ref(false);
// 数据
let categoryData = ref({});
let dataCode = ref("");
let datas = ref<any>([]);
// 分页参数
let page = ref(0);
let size = ref(10);
let total = ref(0);

// 设置页码
const setPage = (p: number, s: number) => {
  page.value = p;
  size.value = s;
};
// 查询列表
const retrieve = async () => {
  await Promise.all([
    instance
      .get(SERVER_URL.category, {
        params: { page: page.value, size: size.value },
      })
      .then((res) => {
        datas.value = res.data;
      }),
    count()
  ]);
};
const count = () => {
  instance.get(SERVER_URL.category.concat("/count")).then((res) => {
    total.value = res.data;
  })
}
// 删除取消
const confirmOperate = (operate: boolean, code: string) => {
  if (operate && code && code.length > 0) {
    dataCode.value = code;
  }
  isDel.value = operate;
};
// 删除确认
const confirmCommit = async () => {
  await instance.delete(SERVER_URL.category.concat("/", dataCode.value)).then(() => {
    // 将datas中修改项的历史数据删除
    datas.value = datas.value.filter(
      (item: any) => item.code != dataCode.value
    );
    isDel.value = false;
    count()
  });
};
// 新增/编辑：打开
const modelOperate = async (operate: boolean) => {
  categoryData.value = {};
  if (operate && dataCode.value && dataCode.value.length > 0) {
    await instance
      .get(SERVER_URL.category.concat("/").concat(dataCode.value))
      .then((res) => {
        categoryData.value = res.data;
      });
  }
  isEdit.value = operate;
};
// 新增/编辑：提交
const modelCommit = async () => {
  debugger
  if (dataCode.value && dataCode.value.length > 0) {
    await instance
      .put(SERVER_URL.category.concat("/", dataCode.value), categoryData.value)
      .then((res) => {
        // 将datas中修改项的历史数据删除
        datas.value = datas.value.filter(
          (item: any) => item.code != dataCode.value
        );
        // 将结果添加到第一个
        datas.value.unshift(res.data);
        isEdit.value = false;
        count()
      });
  } else {
    await instance.post(SERVER_URL.category, categoryData.value).then((res) => {
      if (datas.value.length >= size.value) {
        // 删除第一个
        datas.value.shift();
      }
      // 将结果添加到第一个
      datas.value.unshift(res.data);
      isEdit.value = false;
      count()
    });
  }
};

onMounted(() => {
  retrieve();
});
</script>