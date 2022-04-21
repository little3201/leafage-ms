<template>
  <div class="mt-2">
    <div class="flex justify-between items-center">
      <h2 class="text-lg font-medium">{{ $t('account') }}</h2>
      <button @click="retrieve"
        class="ml-4 inline-flex items-center text-blue-600 focus:outline-none active:cursor-wait">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round" class="mr-2">
          <use :xlink:href="'/svg/feather-sprite.svg#' + 'rotate-cw'" />
        </svg>
        {{ $t('reload') }}
      </button>
      <Operation :needAdd="false" :datas="datas" :fileName="'account'" />
    </div>
    <div class="sm-t-h overflow-auto">
      <table class="w-full overflow-ellipsis whitespace-nowrap" aria-label="account">
        <thead>
          <tr class="sticky top-0 bg-gray-100 uppercase text-center text-xs sm:text-sm">
            <th scope="col" class="px-4 py-2 sm:py-3 text-left">{{ $t('no') }}</th>
            <th scope="col" class="px-4">{{ $t('username') }}</th>
            <th scope="col" class="px-4">{{ $t('nickname') }}</th>
            <th scope="col" class="px-4">{{ $t('accountLockedState') }}</th>
            <th scope="col" class="px-4">{{ $t('accountExpiresAt') }}</th>
            <th scope="col" class="px-4">{{ $t('credentialsExpiresAt') }}</th>
            <th scope="col" class="px-4">{{ $t('actions') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="text-center bg-white border-y-4 lg:border-y-8 first:border-t-0 last:border-b-0 border-gray-100 hover:bg-gray-50 hover:text-blue-600"
            v-for="(data, index) in datas" :key="index">
            <td class="px-4 py-2 sm:py-3 text-left">{{ index + 1 }}</td>
            <td class="px-4">
              <div class="flex items-center">
                <figure class="flex-shrink-0 h-8 w-8">
                  <img :src="data.avatar" alt="avatar" class="rounded-full w-8 h-8 my-auto" />
                </figure>
                <span class="ml-2">{{ data.username }}</span>
              </div>
            </td>
            <td class="px-4">{{ data.nickname }}</td>
            <td class="px-4">
              <div class="flex items-center justify-center"
                :class="{ 'text-red-600': data.accountLocked, 'text-lime-600': !data.accountLocked }">
                <svg v-if="data.accountLocked" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
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
                  :class="{ 'bg-lime-500': new Date(data.accountExpiresAt) > new Date(), 'bg-red-500': new Date(data.accountExpiresAt) <= new Date() }"></span>
                <span class="ml-2">{{ new Date(data.accountExpiresAt).toLocaleString('zh', { hour12: false }) }}</span>
              </div>
            </td>
            <td class="px-4">
              <div class="flex items-center justify-center">
                <span class="w-2 h-2 rounded-full"
                  :class="{ 'bg-lime-500': new Date(data.credentialsExpiresAt) > new Date(), 'bg-red-500': new Date(data.credentialsExpiresAt) <= new Date() }"></span>
                <span class="ml-2">{{
                  new Date(data.credentialsExpiresAt).toLocaleString('zh', { hour12: false })
                }}</span>
              </div>
            </td>
            <td>
              <Action :needEdit="false" :needDel="false">
                <button type="button" title="groups" class="flex items-center mr-3 text-cyan-600 focus:outline-none"
                  @click="treeOperate(true, 'group', data.username)">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
                    stroke-linecap="round" stroke-linejoin="round" class="mr-1">
                    <use :xlink:href="'/svg/feather-sprite.svg#' + 'users'" />
                  </svg>
                  {{ $t('group') }}
                </button>
                <button class="flex items-center mr-3 text-purple-600 focus:outline-none"
                  @click="treeOperate(true, 'role', data.username)">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
                    stroke-linecap="round" stroke-linejoin="round" class="mr-1">
                    <use :xlink:href="'/svg/feather-sprite.svg#' + 'pocket'" />
                  </svg>
                  {{ $t('role') }}
                </button>
                <button v-if="data.accountLocked" class="flex items-center mr-3 text-green-600 focus:outline-none"
                  @click="unlock(data.username)">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
                    stroke-linecap="round" stroke-linejoin="round" class="mr-1">
                    <use :xlink:href="'/svg/feather-sprite.svg#' + 'key'" />
                  </svg>
                  {{ $t('unlock') }}
                </button>
              </Action>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Page @retrieve="retrieve" :total="total" :page="page" :size="size" @setPage="setPage" />
    <Modal :isShow="isTree" :needFooter="true" @cancelAction="treeOperate" @commitAction="treeCommit">
      <TreeItem v-for="data in treeDatas" :key="data.code" :data="data" :ticked="ticked" />
    </Modal>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive } from "vue";

import Operation from "@/components/Operation.vue";
import Action from "@/components/Action.vue";
import Page from "@/components/Page.vue";

import Modal from "@/components/Modal.vue";
import TreeItem from "@/components/tree/TreeItem.vue";

import { instance, SERVER_URL } from "@/api";
import type { AccountDetail, TreeNode } from "@/api/request.type";

// 模态框参数
let isTree = ref(false);
// 数据
let treeDatas = ref<Array<TreeNode>>([]);
let ticked = ref<Array<string>>([])
let datas = ref<Array<AccountDetail>>([]);
let related = reactive({
  username: '',
  type: ''
})
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
  await instance.get(SERVER_URL.account, { params: { page: page.value, size: size.value } })
    .then(res => {
      datas.value = res.data.content
      total.value = res.data.totalElements
    })
};
/**
 * 解锁
 * @param username 账号
 */
const unlock = async (username: string) => {
  await instance.patch(SERVER_URL.account.concat("/", username)).then(res => {
    if (res.data) {
      datas.value.forEach((item: AccountDetail) => {
        if (item.username === username) {
          item.accountLocked = false
        }
      })
    }
  });
}
/**
 * 分组/角色树：打开/关闭
 * @param operate 是否打开
 * @param type 角色/分组
 */
const treeOperate = async (operate: boolean, type: string, username: string): Promise<void> => {
  if (operate) {
    if (type === "group") {
      await Promise.all([
        instance.get(SERVER_URL.group.concat("/tree")).then(res => treeDatas.value = res.data),
        relation(type, username)
      ])
    } else if (type === "role") {
      await Promise.all([
        instance.get(SERVER_URL.role.concat("/tree")).then(res => treeDatas.value = res.data),
        relation(type, username)
      ])
    }
  }
  isTree.value = operate;
};
/**
 * 关联数据
 * @param type 角色/分组
 */
const relation = async (type: string, username: string): Promise<void> => {
  related = { username: username, type: type }
  await instance.get(SERVER_URL.account.concat('/', username, '/', type)).then(res => ticked.value = res.data)
}
/**
 * 提交
 * @param tracked 选中的数据
 */
const treeCommit = async (tracked: Array<string>): Promise<void> => {
  if (tracked && tracked.length > 0) {
    await instance.patch(SERVER_URL.account.concat('/', related.username, '/', related.type), tracked)
      .then(res => codes.value = res.data)
  }
  isTree.value = false;
};
</script>