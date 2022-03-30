<template>
  <div class="col-span-12 mt-2">
    <div class="flex justify-between items-center">
      <h2 class="text-lg font-medium">Regions</h2>
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
      <Operation :needAdd="false" :datas="datas" :fileName="'region'" />
    </div>
    <div class="overflow-auto" style="height: calc(100vh - 10.5rem)">
      <table class="w-full overflow-ellipsis whitespace-nowrap" aria-label="region">
        <thead>
          <tr class="sticky top-0 bg-gray-100 uppercase text-center text-xs sm:text-sm h-12">
            <th scope="col" class="px-4 py-2 sm:py-3 text-left">No.</th>
            <th scope="col" class="px-4">Name</th>
            <th scope="col" class="px-4">Code</th>
            <th scope="col" class="px-4">Superior</th>
            <th scope="col" class="px-4">Is Able</th>
            <th scope="col" class="px-4">Description</th>
            <th scope="col" class="px-4">Modify Time</th>
            <th scope="col" class="px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="text-center bg-white border-y-4 lg:border-y-8 first:border-t-0 last:border-b-0 border-gray-100 hover:bg-gray-50 hover:text-blue-600"
            v-for="(data, index) in datas"
            :key="index"
          >
            <td class="px-4 py-2 sm:py-3 text-left">{{ index + 1 }}</td>
            <td class="px-4">
              <span v-text="data.name"></span>
              <p class="text-xs text-gray-600" v-text="data.alias"></p>
            </td>
            <td class="px-4" v-text="data.code"></td>
            <td class="px-4" v-text="data.superior"></td>
            <td class="px-4">
              <div class="flex items-center justify-center">
                <span
                  class="w-2 h-2 rounded-full"
                  :class="{ 'bg-lime-500': data.isAble, 'bg-red-500': !data.isAble }"
                ></span>
                <span class="ml-2">{{ data.isAble ? 'Able' : 'Disable' }}</span>
              </div>
            </td>
            <td class="px-4" v-text="data.description"></td>
            <td class="px-4" v-text="new Date(data.modifyTime).toLocaleDateString()"></td>
            <td class="px-4">
              <Action :needEdit="false" :needDel="false" @click.capture="dataCode = data.code">
                <button
                  class="flex items-center mr-3 focus:outline-none"
                  :class="{ 'text-green-600': !data.isAble, 'text-yellow-600': data.isAble }"
                  @click="power(data.code)"
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
                    <use :xlink:href="'/svg/feather-sprite.svg#' + 'power'" />
                  </svg>
                  {{ data.isAble ? 'Disable' : 'Enable' }}
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
          <div class="col-span-12 sm:col-span-6">
            <label for="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              class="mt-1 w-full block rounded-md border-gray-300"
              placeholder="Name"
              v-model.trim="dictData.name"
              required
              autofocus
            />
          </div>
          <div class="col-span-12 sm:col-span-6">
            <label for="alias">Alias</label>
            <input
              id="alias"
              name="alias"
              type="text"
              class="mt-1 w-full block rounded-md border-gray-300"
              placeholder="Alias"
              v-model.trim="dictData.alias"
            />
          </div>
          <div class="col-span-12 sm:col-span-6">
            <label for="code">Code</label>
            <input
              id="code"
              name="code"
              type="number"
              class="mt-1 w-full block rounded-md border-gray-300"
              placeholder="Code"
              v-model.trim="dictData.code"
            />
          </div>
          <div class="col-span-12 sm:col-span-6">
            <label for="superior">Superior</label>
            <select
              id="superior"
              name="superior"
              class="mt-1 w-full block rounded-md border-gray-300"
              v-model="dictData.superior"
            >
              <option value="undefined">---请选择---</option>
              <option
                v-for="superior in superiors"
                :key="superior.code"
                :value="superior.code"
              >{{ superior.name }}</option>
            </select>
          </div>
          <div class="col-span-12">
            <label for="description">Description</label>
            <textarea
              id="description"
              name="description"
              class="mt-1 w-full block rounded-md border-gray-300"
              v-model.trim="dictData.description"
            />
          </div>
        </div>
      </form>
    </Model>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";

import Operation from "@/components/Operation.vue";
import Action from "@/components/Action.vue";
import Pagation from "@/components/Pagation.vue";
import Confirm from "@/components/Confirm.vue";
import Model from "@/components/Model.vue";

import { instance, SERVER_URL } from "@/api";
import type { Dictionary } from "@/api/request.type";

// 模态框参数
let isEdit = ref(false);
let isDel = ref(false);
// 数据
let dictData = ref<Dictionary>({});
let dataCode = ref(null);
let datas = ref<Array<Dictionary>>([]);
let superiors = ref<Array<Dictionary>>([]);
// 分页参数
let page = ref(0);
let size = ref(10);
let total = ref(0);

watch(() => dictData.code, (newValue: number, oldValue: number) => {
  if (newValue != oldValue) {
    setTimeout(() => retrieveSuperior(newValue), 300)
  }
})

onMounted(() => {
  retrieve();
});
/**
 * 设置页码
 * @param p 页码
 * @param s 大小
 */
const setPage = (p: number, s: number): void => {
  page.value = p;
  size.value = s;
};
/**
 * 查询列表
 */
const retrieve = async (): Promise<void> => {
  await Promise.all([
    instance.get(SERVER_URL.dictionary, { params: { page: page.value, size: size.value } })
      .then(res => datas.value = res.data),
    count()
  ]);
};
/**
 * 统计
 */
const count = async (): Promise<void> => {
  await instance.get(SERVER_URL.dictionary.concat("/count")).then(res => total.value = res.data)
}
/**
 * confirm 操作
 * @param operate 是否打开
 */
const confirmOperate = (operate: boolean): void => {
  isDel.value = operate;
};
/**
 * confirm 提交
 */
const confirmCommit = async (): Promise<void> => {
  await instance.delete(SERVER_URL.dictionary.concat("/", dataCode.value)).then(() => {
    // 将datas中修改项的历史数据删除
    datas.value = datas.value.filter(
      (item: any) => item.code != dataCode.value
    );
    isDel.value = false;
    count()
  });
};
/**
 * 新增/编辑：打开
 * @param operate 是否打开
 */
const modelOperate = async (operate: boolean): Promise<void> => {
  if (operate) {
    dictData.value = {};
    superiors.value = []
    await Promise.all([
      fetch(),
      retrieveSuperior(dataCode.value)
    ])
  }
  isEdit.value = operate;
};
/**
 * 查询上级信息
 * @param code 代码
 */
const retrieveSuperior = async (code: number) => {
  let superior = 0
  if (code > 1000) {
    superior = Math.floor(code / 100)
    if (code > 110000000) {
      superior = Math.floor(code / 1000)
    }
    await instance.get(SERVER_URL.dictionary.concat("/", superior + "/lower")).then(res => superiors.value = res.data)
  }
}
/**
 * 获取信息
 */
const fetch = async () => {
  if (dataCode.value) {
    await instance.get(SERVER_URL.dictionary.concat("/", dataCode.value)).then(res => dictData.value = res.data);
  }
}
/**
 * 新增/编辑：提交
 */
const modelCommit = async (): Promise<void> => {
  if (dataCode.value && dataCode.value.length > 0) {
    await instance.put(SERVER_URL.dictionary.concat("/", dataCode.value), dictData.value)
      .then(res => {
        // 将datas中修改项的历史数据删除
        datas.value = datas.value.filter(
          (item: any) => item.code != dataCode.value
        );
        // 将结果添加到第一个
        datas.value.unshift(res.data);
        isEdit.value = false;
      });
  } else {
    await instance.post(SERVER_URL.dictionary, dictData.value).then(res => {
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
}
/**
 * 启用
 * @param code 代码
 */
const power = async (code: string) => {
  await instance.patch(SERVER_URL.dictionary.concat("/", code)).then(res => {
    if (res.data && res.data == true) {
      datas.value.forEach((item: Dictionary) => {
        if (item.code === code) {
          item.isAble = !item.isAble
        }
      })
    }
  });
}
</script>