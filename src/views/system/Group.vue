<template>
  <div class="col-span-12 mt-2">
    <div class="flex justify-between items-center">
      <h2 class="text-lg font-medium">{{ $t('group') }}</h2>
      <button @click="retrieve"
        class="ml-4 inline-flex items-center text-blue-600 focus:outline-none active:cursor-wait">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round" class="mr-2">
          <use :xlink:href="'/svg/feather-sprite.svg#' + 'rotate-cw'" />
        </svg>
        {{ $t('reload') }}
      </button>
      <Operation @click.capture="dataCode = ''" @modelOperate="modelOperate" :datas="datas" :fileName="'group'" />
    </div>
    <div class="sm-t-h overflow-auto">
      <table class="w-full overflow-ellipsis whitespace-nowrap" aria-label="group">
        <thead>
          <tr class="sticky top-0 bg-gray-100 uppercase text-center text-xs sm:text-sm">
            <th scope="col" class="px-4 py-2 sm:py-3 text-left">{{ $t('no') }}</th>
            <th scope="col" class="px-4">{{ $t('name') }}</th>
            <th scope="col" class="px-4">{{ $t('code') }}</th>
            <th scope="col" class="px-4">{{ $t('alias') }}</th>
            <th scope="col" class="px-4">{{ $t('superior') }}</th>
            <th scope="col" class="px-4">{{ $t('principal') }}</th>
            <th scope="col" class="px-4">{{ $t('userCount') }}</th>
            <th scope="col" class="px-4">{{ $t('description') }}</th>
            <th scope="col" class="px-4">{{ $t('modifyTime') }}</th>
            <th scope="col" class="px-4">{{ $t('actions') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="text-center bg-white border-y-4 lg:border-y-8 first:border-t-0 last:border-b-0 border-gray-100 group hover:bg-gray-50 hover:text-blue-600"
            v-for="(data, index) in datas" :key="index">
            <td class="px-4 py-2 sm:py-3 text-left">{{ index + 1 }}</td>
            <td class="px-4" v-text="data.name"></td>
            <td class="px-4" v-text="data.code"></td>
            <td class="px-4" v-text="data.alias"></td>
            <td class="px-4" v-text="data.superior"></td>
            <td class="px-4" v-text="data.principal"></td>
            <td class="px-4" v-text="data.count"></td>
            <td class="px-4" v-text="data.description"></td>
            <td class="px-4" v-text="new Date(data.modifyTime).toLocaleDateString()"></td>
            <td>
              <Action @click.capture="dataCode = data.code" @delAction="confirmOperate" @editAction="modelOperate">
                <button v-if="data.count > 0" class="flex items-center mr-3 text-green-600 focus:outline-none"
                  @click="previewOperation(true)">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
                    stroke-linecap="round" stroke-linejoin="round" class="mr-1">
                    <use :xlink:href="'/svg/feather-sprite.svg#' + 'user'" />
                  </svg>
                  {{ $t('crew') }}
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
            <label for="name">{{ $t('name') }}</label>
            <input id="name" name="name" type="text" class="mt-1 w-full block rounded-md border-gray-300"
              :placeholder="$t('name')" v-model.trim="groupData.name" autofocus />
          </div>
          <div class="col-span-12 sm:col-span-6">
            <label for="alias">{{ $t('alias') }}</label>
            <input id="alias" name="alias" type="text" class="mt-1 w-full block rounded-md border-gray-300"
              :placeholder="$t('alias')" v-model.trim="groupData.alias" autofocus />
          </div>
          <div class="col-span-12 sm:col-span-6">
            <label for="superior">{{ $t('superior') }}</label>
            <select id="superior" name="superior" v-model.lazy="groupData.superior"
              class="mt-1 w-full block rounded-md border-gray-300">
              <option value="undefined">---{{ $t('select') }}---</option>
              <option v-for="superior in superiors" :key="superior.code" :value="superior.code" v-text="superior.name">
              </option>
            </select>
          </div>
          <div class="col-span-12 sm:col-span-6">
            <label for="principal">{{ $t('principal') }}</label>
            <select id="principal" name="principal" v-model.lazy="groupData.principal"
              class="mt-1 w-full block rounded-md border-gray-300">
              <option value="undefined">---{{ $t('select') }}---</option>
              <option v-for="(account, index) in accounts" :key="index" :value="account.username"
                v-text="account.nickname"></option>
            </select>
          </div>
          <div class="col-span-12">
            <label for="description">{{ $t('description') }}</label>
            <textarea id="description" name="description" class="mt-1 w-full block rounded-md border-gray-300"
              v-model.trim="groupData.description" :placeholder="$t('description')" />
          </div>
        </div>
      </form>
    </Model>
    <Preview :isShow="isShow" @closeAction="previewOperation">
      <table class="w-full overflow-ellipsis whitespace-nowrap" aria-label="group-members">
        <thead>
          <tr class="sticky top-0 bg-gray-100 uppercase text-center text-xs sm:text-sm">
            <th scope="col" class="px-4 py-2 sm:py-3 text-left">{{ $t('no') }}</th>
            <th scope="col" class="px-4">{{ $t('username') }}</th>
            <th scope="col" class="px-4">{{ $t('nickname') }}</th>
            <th scope="col" class="px-4">{{ $t('accountLockedState') }}</th>
            <th scope="col" class="px-4">{{ $t('accountExpiresAt') }}</th>
            <th scope="col" class="px-4">{{ $t('credentialsExpiresAt') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="text-center bg-white border-y-4 lg:border-y-8 first:border-t-0 last:border-b-0 border-gray-100 hover:bg-gray-50 hover:text-blue-600"
            v-for="(account, index) in accounts" :key="index">
            <td class="px-4 py-2 sm:py-3 text-left">{{ index + 1 }}</td>
            <td class="px-4">{{ account.username }}</td>
            <td class="px-4">{{ account.nickname }}</td>
            <td class="px-4">
              <div class="flex items-center justify-center"
                :class="{ 'text-red-600': account.accountLocked, 'text-lime-600': !account.accountLocked }">
                <svg v-if="account.accountLocked" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round" class="feather feather-lock">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                  class="feather feather-unlock text-lime-600">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 9.9-1" />
                </svg>
              </div>
            </td>
            <td class="px-4">
              <div class="flex items-center justify-center">
                <span class="w-2 h-2 rounded-full"
                  :class="{ 'bg-lime-500': new Date(account.accountExpiresAt) > new Date(), 'bg-red-500': new Date(account.accountExpiresAt) <= new Date() }"></span>
                <span class="ml-2">{{
                  new Date(account.accountExpiresAt).toLocaleString('zh', { hour12: false })
                }}</span>
              </div>
            </td>
            <td class="px-4">
              <div class="flex items-center justify-center">
                <span class="w-2 h-2 rounded-full"
                  :class="{ 'bg-lime-500': new Date(account.credentialsExpiresAt) > new Date(), 'bg-red-500': new Date(account.credentialsExpiresAt) <= new Date() }"></span>
                <span class="ml-2">{{
                  new Date(account.credentialsExpiresAt).toLocaleString('zh', { hour12: false })
                }}</span>
              </div>
            </td>
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
import Confirm from "@/components/Confirm.vue";
import Model from "@/components/Model.vue";
import Preview from "@/components/Preview.vue";

import { instance, SERVER_URL } from "@/api";
import type { Group, Account } from "@/api/request.type";

// 模态框参数
let isEdit = ref(false);
let isDel = ref(false);
let isShow = ref(false)
// 数据
let groupData = ref({});
let dataCode = ref("");
let accounts = ref<Account>([]);
let superiors = ref<Group>([]);
let datas = ref<Array<Group>>([]);
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
 * @param s 分页大小
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
    instance.get(SERVER_URL.group, { params: { page: page.value, size: size.value } })
      .then(res => datas.value = res.data),
    count()
  ]);
};
/**
 * 统计
 */
const count = async (): Promise<void> => {
  await instance.get(SERVER_URL.group.concat("/count")).then(res => total.value = res.data)
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
  await instance.delete(SERVER_URL.group.concat("/", dataCode.value)).then(() => {
    // 将datas中修改项的历史数据删除
    datas.value = datas.value.filter(
      (item: any) => item.code != dataCode.value
    );
    isDel.value = false;
    count()
  });
};
/**
 * 查询关联账号
 */
const retrieveAccounts = async (): Promise<void> => {
  if (dataCode.value && dataCode.value.length > 0) {
    await instance.get(SERVER_URL.group.concat("/", dataCode.value, "/account"))
      .then(res => accounts.value = res.data)
  }
}
/**
 * 新增/编辑：打开
 * @param operate 是否打开
 */
const modelOperate = async (operate: boolean): Promise<void> => {
  if (operate) {
    groupData.value = {};
    await Promise.all([
      fetch(),
      instance.get(SERVER_URL.group).then(res => superiors.value = res.data),
      retrieveAccounts()
    ]);
  }
  isEdit.value = operate;
};
/**
 * 查询详情
 */
const fetch = async (): Promise<void> => {
  if (dataCode.value && dataCode.value.length > 0) {
    await instance.get(SERVER_URL.group.concat("/", dataCode.value)).then(res => groupData.value = res.data);
  }
};
/**
 * 新增/编辑：提交
 */
const modelCommit = async (): Promise<void> => {
  if (dataCode.value && dataCode.value.length > 0) {
    await instance.put(SERVER_URL.group.concat("/", dataCode.value), groupData.value)
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
    await instance.post(SERVER_URL.group, groupData.value).then(res => {
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
 * 预览
 * @param show 是否展示
 * @param code 代码
 */
const previewOperation = async (show: boolean) => {
  if (show) {
    await instance.get(SERVER_URL.group.concat("/", dataCode.value, "/account")).then(res => accounts.value = res.data);
  }
  isShow.value = show
}
</script>