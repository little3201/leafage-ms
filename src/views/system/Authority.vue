<template>
  <div class="col-span-12 mt-2">
    <div class="flex justify-between items-center">
      <h2 class="text-lg font-medium">Authorities</h2>
      <button
        @click="retrieve"
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
    <div class="overflow-scroll" style="height: calc(100vh - 11.5rem)">
      <table class="w-full overflow-ellipsis whitespace-nowrap" aria-label="authority">
        <thead>
          <tr class="sticky top-0 bg-gray-100 uppercase text-center text-xs sm:text-sm">
            <th scope="col" class="px-4 py-2 sm:py-3 text-left">No.</th>
            <th scope="col" class="px-4">Name</th>
            <th scope="col" class="px-4">Code</th>
            <th scope="col" class="px-4">Superior</th>
            <th scope="col" class="px-4">Type</th>
            <th scope="col" class="px-4">Description</th>
            <th scope="col" class="px-4">Role Count</th>
            <th scope="col" class="px-4">Path</th>
            <th scope="col" class="px-4">Modify Time</th>
            <th scope="col" class="px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="text-center bg-white border-y-4 border lg:border-y-8 first:border-t-0 last:border-b-0 border-gray-100 hover:bg-gray-50 hover:text-blue-600"
            v-for="(data, index) in datas"
            :key="index"
          >
            <td class="px-4 py-2 sm:py-3 text-left">{{ index + 1 }}</td>
            <td class="px-4">
              <div class="flex items-center">
                <div class="flex-shrink-0">
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
                </div>
                <span class="font-medium ml-2" v-text="data.name"></span>
              </div>
            </td>
            <td class="px-4" v-text="data.code"></td>
            <td class="px-4" v-text="data.superior"></td>
            <td class="px-4">
              <span
                class="text-xs px-2 py-1 rounded-md"
                :class="{ 'bg-indigo-100': data.type === 'M', 'bg-blue-100': data.type === 'B', 'bg-pink-100': data.type === 'A' }"
              >{{ data.type === 'M' ? 'menu' : (data.type === 'B' ? 'button' : 'api') }}</span>
            </td>
            <td class="px-4">
              <span v-text="data.description"></span>
            </td>
            <td class="px-4" v-text="data.count"></td>
            <td class="px-4" v-text="data.path"></td>
            <td class="px-4" v-text="new Date(data.modifyTime).toLocaleDateString()"></td>
            <td class="px-4">
              <Action
                @click.capture="dataCode = data.code"
                @delAction="confirmOperate"
                @editAction="modelOperate"
              >
                <button
                  class="flex items-center mr-3 text-pink-600 focus:outline-none"
                  @click="relation"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="mr-1"
                  >
                    <use :xlink:href="'/svg/feather-sprite.svg#' + 'pocket'" />
                  </svg>
                  Roles
                </button>
              </Action>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Pagation @retrieve="retrieve" :total="total" :page="page" :size="size" @setPage="setPage" />
    <Confirm :isShow="isDel" @cancelAction="confirmOperate" @commitAction="confirmCommit" />
    <Model :isShow="isEdit" @cancelAction="modelOperate" @commitAction="modelCommit">
      <form @submit.prevent>
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-12">
            <label for="name">
              Name
              <span class="text-red-600 text-base ml-1">*</span>
            </label>
            <input
              id="name"
              name="name"
              @blur="exist"
              type="text"
              class="mt-1 w-full block rounded-md border-gray-300"
              placeholder="Name"
              v-model.trim="authorityData.name"
              autofocus
            />
          </div>
          <div class="col-span-12 sm:col-span-6">
            <label for="type" :class="{ 'text-gray-300': authorityData.code }">
              Type
              <span class="text-red-600 text-base ml-1">*</span>
            </label>
            <select
              id="type"
              name="type"
              :disabled="authorityData.code"
              v-model.lazy="authorityData.type"
              class="mt-1 w-full block rounded-md border-gray-300"
              :class="{ 'text-gray-300': authorityData.code }"
            >
              <option value="undefined">请选择</option>
              <option value="M">Menu</option>
              <option value="B">Button</option>
              <option value="R">Router</option>
            </select>
          </div>
          <div class="col-span-12 sm:col-span-6">
            <label for="icon">
              Icon
              <span class="text-red-600 text-base ml-1">*</span>
            </label>
            <input
              id="icon"
              name="icon"
              type="text"
              class="mt-1 w-full block rounded-md border-gray-300"
              placeholder="Icon"
              v-model.trim="authorityData.icon"
              autofocus
            />
          </div>
          <div class="col-span-12 sm:col-span-6">
            <label for="path" :class="{ 'text-gray-300': authorityData.type == 'B' }">Path</label>
            <input
              id="path"
              name="path"
              :disabled="authorityData.type == 'B'"
              type="url"
              class="mt-1 w-full block rounded-md border-gray-300"
              :class="{
                'text-gray-300 placeholder-gray-300': authorityData.type == 'B',
              }"
              placeholder="Path"
              v-model.trim="authorityData.path"
            />
          </div>
          <div class="col-span-12 sm:col-span-6">
            <label for="superior">Superior</label>
            <select
              id="superior"
              name="superior"
              v-model.lazy="authorityData.superior"
              class="mt-1 w-full block rounded-md border-gray-300"
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
            <label for="description">Description</label>
            <textarea
              id="description"
              name="description"
              class="mt-1 w-full block rounded-md border-gray-300"
              v-model.trim="authorityData.description"
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

import Operation from "@/components/Operation.vue";
import Action from "@/components/Action.vue";
import Pagation from "@/components/Pagation.vue";
import Confirm from "@/components/Confirm.vue";
import Model from "@/components/Model.vue";

import instance from "@/api";
import { SERVER_URL, Authority } from "@/api/request";

// 模态框参数
let isEdit = ref(false);
let isDel = ref(false);
// 数据
let authorityData = ref<Authority>({});
let dataCode = ref("");
let superiors = ref<Array<Authority>>([]);
let datas = ref<Array<Authority>>([]);
// 分页参数
let page = ref(0);
let size = ref(10);
let total = ref(0);

// 设置页码
const setPage = (p: number, s: number): void => {
  page.value = p;
  size.value = s;
};
// 查询列表
const retrieve = async (): Promise<void> => {
  await Promise.all([
    instance
      .get(SERVER_URL.authority, {
        params: { page: page.value, size: size.value },
      })
      .then((res) => {
        datas.value = res.data;
      }),
    count()
  ]);
};
const count = (): void => {
  instance.get(SERVER_URL.authority.concat("/count")).then((res) => {
    total.value = res.data;
  })
}
// 删除取消
const confirmOperate = (operate: boolean): void => {
  isDel.value = operate;
};
// 删除确认
const confirmCommit = async (): Promise<void> => {
  await instance.delete(SERVER_URL.authority.concat("/", dataCode.value)).then(() => {
    // 将datas中修改项的历史数据删除
    datas.value = datas.value.filter(
      (item: any) => item.code != dataCode.value
    );
    isDel.value = false;
    count()
  });
};
// 新增/编辑：打开
const modelOperate = async (operate: boolean): Promise<void> => {
  if (operate) {
    authorityData.value = {};
    await Promise.all([
      fetch(),
      instance.get(SERVER_URL.authority).then((res) => {
        superiors.value = res.data;
      }),
    ]);
  }
  isEdit.value = operate;
};
// 查详情
const fetch = (): void => {
  if (dataCode.value && dataCode.value.length > 0) {
    instance.get(SERVER_URL.authority.concat("/", dataCode.value)).then((res) => {
      authorityData.value = res.data;
    });
  }
};
// 检查唯一
const exist = (): void => {
  console.log("失去了焦点")
}
// 新增/编辑：提交
const modelCommit = async (): Promise<void> => {
  if (dataCode.value && dataCode.value.length > 0) {
    await instance
      .put(SERVER_URL.authority.concat("/", dataCode.value), authorityData.value)
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
    await instance.post(SERVER_URL.authority, authorityData.value).then((res) => {
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
/**
 * 查询关联角色信息
 */
const relation = async (): Promise<void> => {
  await instance.get(SERVER_URL.authority.concat("/", dataCode.value, '/role')).then((res) => {
    alert(res.data);
  });
}
onMounted(() => {
  retrieve();
});
</script>