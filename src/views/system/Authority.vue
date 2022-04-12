<template>
  <div class="col-span-12 mt-2">
    <div class="flex justify-between items-center">
      <h2 class="text-lg font-medium">{{ $t('authority') }}</h2>
      <button @click="retrieve"
        class="ml-4 inline-flex items-center text-blue-600 focus:outline-none active:cursor-wait">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round" class="mr-2">
          <use :xlink:href="'/svg/feather-sprite.svg#' + 'rotate-cw'" />
        </svg>
        {{ $t('reload') }}
      </button>
      <Operation :needAdd="false" :datas="datas" :fileName="'authority'" />
    </div>
    <div class="sm-t-h overflow-auto">
      <table class="w-full overflow-ellipsis whitespace-nowrap" aria-label="authority">
        <thead>
          <tr class="sticky top-0 bg-gray-100 uppercase text-center text-xs sm:text-sm">
            <th scope="col" class="px-4 py-2 sm:py-3 text-left">{{ $t('no') }}</th>
            <th scope="col" class="px-4">{{ $t('name') }}</th>
            <th scope="col" class="px-4">{{ $t('code') }}</th>
            <th scope="col" class="px-4">{{ $t('superior') }}</th>
            <th scope="col" class="px-4">{{ $t('type') }}</th>
            <th scope="col" class="px-4">{{ $t('path') }}</th>
            <th scope="col" class="px-4">{{ $t('isEnabled') }}</th>
            <th scope="col" class="px-4">{{ $t('roleCount') }}</th>
            <th scope="col" class="px-4">{{ $t('description') }}</th>
            <th scope="col" class="px-4">{{ $t('modifyTime') }}</th>
            <th scope="col" class="px-4">{{ $t('actions') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="text-center bg-white border-y-4 border lg:border-y-8 first:border-t-0 last:border-b-0 border-gray-100 hover:bg-gray-50 hover:text-blue-600"
            v-for="(data, index) in datas" :key="index">
            <td class="px-4 py-2 sm:py-3 text-left">{{ index + 1 }}</td>
            <td class="px-4">
              <div class="flex items-center">
                <svg v-if="data.icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <use :xlink:href="'/svg/feather-sprite.svg#' + data.icon" />
                </svg>
                <span class="font-medium ml-2" v-text="data.name"></span>
              </div>
            </td>
            <td class="px-4" v-text="data.code"></td>
            <td class="px-4" v-text="data.superior"></td>
            <td class="px-4">
              <span class="text-xs px-2 py-1 rounded-md"
                :class="{ 'bg-indigo-100': data.type === 'M', 'bg-blue-100': data.type === 'B', 'bg-pink-100': data.type === 'A' }">{{
                  data.type === 'M' ? 'menu' : (data.type === 'B' ? 'button' : 'api')
                }}</span>
            </td>
            <td class="px-4" v-text="data.path"></td>
            <td class="px-4">
              <div class="flex items-center justify-center">
                <span class="w-2 h-2 rounded-full"
                  :class="{ 'bg-lime-500': data.isEnabled, 'bg-red-500': !data.isEnabled }"></span>
                <span class="ml-2">{{ data.isEnabled ? $t('enable') : $t('disable') }}</span>
              </div>
            </td>
            <td class="px-4" v-text="data.count"></td>
            <td class="px-4" v-text="data.description"></td>
            <td class="px-4" v-text="new Date(data.modifyTime).toLocaleDateString()"></td>
            <td>
              <Action :needEdit="false" :needDel="false">
                <button v-if="data.count > 0" class="flex items-center mr-3 text-pink-600 focus:outline-none"
                  @click="previewOperation(true, data.code)">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
                    stroke-linecap="round" stroke-linejoin="round" class="mr-1">
                    <use :xlink:href="'/svg/feather-sprite.svg#' + 'pocket'" />
                  </svg>
                  {{ $t('role') }}
                </button>
                <button class="flex items-center mr-3 focus:outline-none"
                  :class="{ 'text-green-600': !data.isEnabled, 'text-yellow-600': data.isEnabled }"
                  @click="power(data.code)">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
                    stroke-linecap="round" stroke-linejoin="round" class="mr-1">
                    <use :xlink:href="'/svg/feather-sprite.svg#' + 'power'" />
                  </svg>
                  {{ data.isEnabled ? 'Disable' : 'Enable' }}
                </button>
              </Action>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Pagation @retrieve="retrieve" :total="total" :page="page" :size="size" @setPage="setPage" />

    <Preview :isShow="isShow" @closeAction="previewOperation">
      <table class="w-full overflow-ellipsis whitespace-nowrap" aria-label="role">
        <thead>
          <tr class="sticky top-0 bg-gray-100 uppercase text-center text-xs sm:text-sm">
            <th scope="col" class="px-4 py-2 sm:py-3 text-left">{{ $t('no') }}</th>
            <th scope="col" class="px-4">{{ $t('name') }}</th>
            <th scope="col" class="px-4">{{ $t('code') }}</th>
            <th scope="col" class="px-4">{{ $t('superior') }}</th>
            <th scope="col" class="px-4">{{ $t('userCount') }}</th>
            <th scope="col" class="px-4">{{ $t('description') }}</th>
            <th scope="col" class="px-4">{{ $t('modifyTime') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="text-center bg-white border-y-4 lg:border-y-8 first:border-t-0 last:border-b-0 border-gray-100 group hover:bg-gray-50 hover:text-blue-600"
            v-for="(role, index) in roles" :key="index">
            <td class="px-4 py-2 sm:py-3 text-left">{{ index + 1 }}</td>
            <td class="px-4" v-text="role.name"></td>
            <td class="px-4" v-text="role.code"></td>
            <td class="px-4" v-text="role.superior"></td>
            <td class="px-4" v-text="role.count"></td>
            <td class="px-4" v-text="role.description"></td>
            <td class="px-4" v-text="new Date(role.modifyTime).toLocaleDateString()"></td>
          </tr>
        </tbody>
      </table>
    </Preview>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";

import Operation from "@/components/Operation.vue";
import Action from "@/components/Action.vue";
import Pagation from "@/components/Pagation.vue";
import Preview from "@/components/Preview.vue";

import { instance, SERVER_URL } from "@/api";
import type { Authority, Role } from "@/api/request.type";

// 模态框参数
let isShow = ref(false)
// 数据
let datas = ref<Array<Authority>>([]);
let roles = ref<Array<Role>>([])
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
    instance.get(SERVER_URL.authority, { params: { page: page.value, size: size.value } })
      .then(res => datas.value = res.data),
    count()
  ]);
};
/**
 * 统计
 */
const count = async (): Promise<void> => {
  await instance.get(SERVER_URL.authority.concat("/count")).then(res => total.value = res.data)
}
/**
 * 预览
 * @param show 是否展示
 * @param code 代码
 */
const previewOperation = async (show: boolean, code: string) => {
  if (show) {
    await instance.get(SERVER_URL.authority.concat("/", code, '/role')).then(res => roles.value = res.data);
  }
  isShow.value = show
}
</script>