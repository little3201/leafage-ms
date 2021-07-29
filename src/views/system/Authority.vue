<template>
  <div class="col-span-12 mt-2">
    <div class="flex justify-between items-center h-10">
      <h2 class="text-lg font-medium">Authorities</h2>
      <button
        @click="retrieve"
        class="ml-4 inline-flex items-center text-blue-600 focus:outline-none"
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
      <Operation
        @click.capture="dataCode = undefined"
        @modelOperate="modelOperate"
      />
    </div>
    <div class="overflow-scroll my-2" style="height: calc(100vh - 12rem)">
      <table
        class="w-full overflow-ellipsis whitespace-nowrap"
        aria-label="authority"
      >
        <thead>
          <tr
            class="
              sticky
              top-0
              bg-gray-100
              uppercase
              text-center text-xs
              sm:text-sm
              h-12
            "
          >
            <th scope="col" class="px-4 text-left">No.</th>
            <th scope="col" class="px-4">Name</th>
            <th scope="col" class="px-4">Code</th>
            <th scope="col" class="px-4">Role Count</th>
            <th scope="col" class="px-4">Superior</th>
            <th scope="col" class="px-4">Type</th>
            <th scope="col" class="px-4">Icon</th>
            <th scope="col" class="px-4">Path</th>
            <th scope="col" class="px-4">Modify Time</th>
            <th scope="col" class="px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="text-center bg-white border-t-8 border-b-8 border-gray-100"
            v-for="(data, index) in datas"
            :key="index"
          >
            <td class="px-4 py-2 md:py-3 text-left">
              {{ index + 1 }}
            </td>
            <td class="px-4">
              <span class="font-medium" v-text="data.name"></span>
              <p class="text-gray-600 text-xs" v-text="data.description"></p>
            </td>
            <td class="px-4" v-text="data.code"></td>
            <td class="px-4" v-text="data.count"></td>
            <td class="px-4" v-text="data.superior"></td>
            <td class="px-4">
              <span class="text-green-500" v-if="data.type == 'M'">Menu</span>
              <span class="text-blue-500" v-else-if="data.type == 'B'"
                >Button</span
              >
              <span class="text-pink-500" v-else>Api</span>
            </td>
            <td class="px-4">
              <svg
                v-if="data.icon"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="mx-auto"
              >
                <use :xlink:href="'/svg/feather-sprite.svg#' + data.icon" />
              </svg>
            </td>
            <td class="px-4" v-text="data.path"></td>
            <td
              class="px-4"
              v-text="new Date(data.modifyTime).toLocaleDateString()"
            ></td>
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
    <Pagation
      @retrieve="retrieve"
      :total="total"
      :page="page"
      :size="size"
      @setPage="setPage"
    />
    <Confirm
      :isShow="isDel"
      @cancelAction="confirmOperate"
      @commitAction="confirmCommit"
    />
    <Model
      :isShow="isEdit"
      @cancelAction="modelOperate"
      @commitAction="commitOperate"
    >
      <form class="w-full">
        <div class="grid grid-cols-12 gap-4 row-gap-3">
          <div class="col-span-12 sm:col-span-6">
            <label
              >Name
              <span class="text-red-600 text-base ml-1">*</span>
            </label>
            <input
              type="text"
              class="border border-gray-300 rounded-md w-full mt-1 shadow-sm"
              placeholder="Name"
              v-model="authorityData.name"
            />
          </div>
          <div class="col-span-12 sm:col-span-6">
            <label :class="{ 'text-gray-300': authorityData.code }"
              >Type
              <span class="text-red-600 text-base ml-1">*</span>
            </label>
            <select
              :disabled="authorityData.code"
              v-model="authorityData.type"
              class="border border-gray-300 rounded-md w-full mt-1 shadow-sm"
              :class="{ 'text-gray-300': authorityData.code }"
            >
              <option value="undefined">请选择</option>
              <option value="M">Menu</option>
              <option value="B">Button</option>
              <option value="R">Router</option>
            </select>
          </div>
          <div class="col-span-12 sm:col-span-6">
            <label :class="{ 'text-gray-300': authorityData.type == 'B' }"
              >Path</label
            >
            <input
              :disabled="authorityData.type == 'B'"
              type="url"
              class="border border-gray-300 rounded-md w-full mt-1 shadow-sm"
              :class="{
                'text-gray-300 placeholder-gray-300': authorityData.type == 'B',
              }"
              placeholder="Path"
              v-model="authorityData.path"
            />
          </div>
          <div class="col-span-12 sm:col-span-6">
            <label>Superior</label>
            <select
              v-model="authorityData.superior"
              class="border border-gray-300 rounded-md w-full mt-1 shadow-sm"
            >
              <option value="undefined">请选择</option>
              <option
                v-for="superior in superiors"
                :key="superior.code"
                :value="superior.code"
                v-text="superior.name"
              ></option>
            </select>
          </div>
          <div class="col-span-12">
            <label>Description</label>
            <textarea
              class="mt-1 w-full rounded-md border-gray-300 shadow-sm"
              v-model="authorityData.description"
              placeholder="Description"
            />
          </div>
        </div>
      </form>
    </Model>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";

import Operation from "/@/components/global/Operation.vue";
import Action from "/@/components/global/Action.vue";
import Pagation from "/@/components/global/Pagation.vue";
import Confirm from "/@/components/global/Confirm.vue";
import Model from "/@/components/global/Model.vue";

import instance from "../../api";
import SERVER_URL from "../../api/request";

// 模态框参数
const isEdit = ref(false);
const isDel = ref(false);
// 数据
const authorityData = ref({});
const dataCode = ref("");
const superiors = ref([]);
const datas = ref<any>([]);
// 分页参数
let page = ref(0);
let size = ref(10);
const total = ref(0);

// 设置页码
const setPage = (p: number, s: number) => {
  page.value = p;
  size.value = s;
};
// 查询列表
const retrieve = async () => {
  await Promise.all([
    instance
      .get(SERVER_URL.authority, {
        params: { page: page.value, size: size.value },
      })
      .then((res) => {
        datas.value = res.data;
      }),
    instance.get(SERVER_URL.authority.concat("/count")).then((res) => {
      total.value = res.data;
    }),
  ]);
};
// 删除取消
const confirmOperate = (operate: boolean) => {
  isDel.value = operate;
};
// 删除确认
const confirmCommit = () => {
  instance.delete(SERVER_URL.authority.concat("/", dataCode.value)).then(() => {
    // 将datas中修改项的历史数据删除
    datas.value = datas.value.filter(
      (item: any) => item.code != dataCode.value
    );
    isDel.value = false;
  });
};
// 新增/编辑：打开
const modelOperate = async (operate: boolean) => {
  authorityData.value = {};
  if (operate) {
    await Promise.all([
      fetch(dataCode.value),
      instance
        .get(SERVER_URL.authority, { params: { type: "M" } })
        .then((res) => {
          superiors.value = res.data;
        }),
    ]);
  }
  isEdit.value = operate;
};
// 查详情
const fetch = async (code: string) => {
  if (code && code.length > 0) {
    await instance.get(SERVER_URL.authority.concat("/", code)).then((res) => {
      authorityData.value = res.data;
    });
  }
};
// 新增/编辑：提交
const commitOperate = async () => {
  let data = authorityData.value;
  if (dataCode.value && dataCode.value.length > 0) {
    await instance
      .put(SERVER_URL.authority.concat("/", dataCode.value), data)
      .then((res) => {
        // 将datas中修改项的历史数据删除
        datas.value = datas.value.filter(
          (item: any) => item.code != dataCode.value
        );
        // 将结果添加到第一个
        datas.value.unshift(res.data);
        isEdit.value = false;
      });
  } else {
    await instance.post(SERVER_URL.authority, data).then((res) => {
      if (datas.value.length >= 10) {
        // 删除第一个
        datas.value.shift();
      }
      // 将结果添加到第一个
      datas.value.unshift(res.data);
      isEdit.value = false;
    });
  }
};

onMounted(() => {
  retrieve();
});
</script>