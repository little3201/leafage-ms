<template>
  <div class="col-span-12 mt-2">
    <div class="flex justify-between items-center">
      <h2 class="text-lg font-medium">{{ $t('dictionary') }}</h2>
      <button @click="retrieve"
        class="ml-4 inline-flex items-center text-blue-600 focus:outline-none active:cursor-wait">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round" class="mr-2">
          <use :xlink:href="'/svg/feather-sprite.svg#' + 'rotate-cw'" />
        </svg>
        {{ $t('reload') }}
      </button>
      <Operation :needAdd="false" :datas="datas" :fileName="'dictionary'" />
    </div>
    <div class="sm-t-h overflow-auto">
      <table class="w-full overflow-ellipsis whitespace-nowrap" aria-label="dictionary">
        <thead>
          <tr class="sticky top-0 bg-gray-100 uppercase text-center text-xs sm:text-sm h-12">
            <th scope="col" class="px-4 py-2 sm:py-3 text-left">{{ $t('no') }}</th>
            <th scope="col" class="px-4">{{ $t('name') }}</th>
            <th scope="col" class="px-4">{{ $t('code') }}</th>
            <th scope="col" class="px-4">{{ $t('superior') }}</th>
            <th scope="col" class="px-4">{{ $t('isEnabled') }}</th>
            <th scope="col" class="px-4">{{ $t('description') }}</th>
            <th scope="col" class="px-4">{{ $t('modifyTime') }}</th>
            <th scope="col" class="px-4">{{ $t('actions') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="text-center bg-white border-y-4 lg:border-y-8 first:border-t-0 last:border-b-0 border-gray-100 hover:bg-gray-50 hover:text-blue-600"
            v-for="(data, index) in datas" :key="index">
            <td class="px-4 py-2 sm:py-3 text-left">{{ index + 1 }}</td>
            <td class="px-4">
              <span v-text="data.name"></span>
              <p class="text-xs text-gray-600" v-text="data.alias"></p>
            </td>
            <td class="px-4" v-text="data.code"></td>
            <td class="px-4" v-text="data.superior"></td>
            <td class="px-4">
              <div class="flex items-center justify-center">
                <span class="w-2 h-2 rounded-full"
                  :class="{ 'bg-lime-500': data.isEnabled, 'bg-red-500': !data.isEnabled }"></span>
                <span class="ml-2">{{ data.isEnabled ? $t('enable') : $t('disable') }}</span>
              </div>
            </td>
            <td class="px-4" v-text="data.description"></td>
            <td class="px-4" v-text="new Date(data.modifyTime).toLocaleDateString()"></td>
            <td>
              <Action :needEdit="false" :needDel="false" @click.capture="dataCode = data.code">
                <button class="flex items-center mr-3 focus:outline-none"
                  :class="{ 'text-green-600': !data.isEnabled, 'text-red-600': data.isEnabled }"
                  @click="power(data.code)">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
                    stroke-linecap="round" stroke-linejoin="round" class="mr-1">
                    <use :xlink:href="'/svg/feather-sprite.svg#' + 'power'" />
                  </svg>
                  {{ data.isEnabled ? $t('disable') : $t('enable') }}
                </button>
              </Action>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Pagation @retrieve="retrieve" :total="total" :page="page" :size="size" @setPage="setPage" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";

import Operation from "@/components/Operation.vue";
import Action from "@/components/Action.vue";
import Pagation from "@/components/Pagation.vue";

import { instance, SERVER_URL } from "@/api";
import type { Dictionary } from "@/api/request.type";

// 数据
let datas = ref<Array<Dictionary>>([]);
// 分页参数
let page = ref(0);
let size = ref(10);
let total = ref(0);

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
 * 启用
 * @param code 代码
 */
const power = async (code: string) => {
  await instance.patch(SERVER_URL.dictionary.concat("/", code)).then(res => {
    if (res.data && res.data == true) {
      datas.value.forEach((item: Dictionary) => {
        if (item.code === code) {
          item.isEnabled = !item.isEnabled
        }
      })
    }
  });
}
</script>