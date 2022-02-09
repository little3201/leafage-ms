<template>
  <div class="col-span-12 mt-2">
    <div class="flex justify-between items-center">
      <h2 class="text-lg font-medium">Accounts</h2>
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
      <Operation :needAdd="false" />
    </div>
    <div class="overflow-scroll" style="height: calc(100vh - 11.5rem)">
      <table class="w-full overflow-ellipsis whitespace-nowrap" aria-label="user">
        <thead>
          <tr class="sticky top-0 bg-gray-100 uppercase text-center text-xs sm:text-sm">
            <th scope="col" class="px-4 py-2 sm:py-3 text-left">No.</th>
            <th scope="col" class="px-4">Username</th>
            <th scope="col" class="px-4">Nickname</th>
            <th scope="col" class="px-4">Account Expires At</th>
            <th scope="col" class="px-4">Account Locked State</th>
            <th scope="col" class="px-4">Credentials Expires At</th>
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
              <div class="flex items-center">
                <figure class="flex-shrink-0 h-8 w-8">
                  <img :src="data.avatar" alt="avatar" class="rounded-full w-8 h-8 my-auto" />
                </figure>
                <span class="ml-2">{{ data.username }}</span>
              </div>
            </td>
            <td class="px-4">{{ data.nickname }}</td>
            <td class="px-4">
              <div class="flex items-center justify-center">
                <span
                  class="w-2 h-2 rounded-full"
                  :class="{ 'bg-lime-500': new Date(data.accountExpiresAt) > new Date(), 'bg-red-500': new Date(data.accountExpiresAt) <= new Date() }"
                ></span>
                <span
                  class="ml-2"
                >{{ new Date(data.accountExpiresAt).toLocaleString('zh', { hour12: false }) }}</span>
              </div>
            </td>
            <td class="px-4">
              <div
                class="flex items-center justify-center"
                :class="{ 'text-lime-600': data.accountLocked, 'text-red-600': !data.accountLocked }"
              >
                <svg
                  v-if="data.accountLocked"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-unlock text-lime-600"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 9.9-1" />
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-lock"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
            </td>
            <td class="px-4">
              <div class="flex items-center justify-center">
                <span
                  class="w-2 h-2 rounded-full"
                  :class="{ 'bg-lime-500': new Date(data.credentialsExpiresAt) > new Date(), 'bg-red-500': new Date(data.credentialsExpiresAt) <= new Date() }"
                ></span>
                <span
                  class="ml-2"
                >{{ new Date(data.credentialsExpiresAt).toLocaleString('zh', { hour12: false }) }}</span>
              </div>
            </td>
            <td class="px-4">
              <Action @click.capture="username = data.username" :needEdit="false" :needDel="false">
                <button
                  type="button"
                  title="groups"
                  class="flex items-center mr-3 text-indigo-600 focus:outline-none"
                  @click="treeOperate(true, 'group')"
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
                    <use :xlink:href="'/svg/feather-sprite.svg#' + 'users'" />
                  </svg>
                  Groups
                </button>
                <button
                  class="flex items-center mr-3 text-pink-600 focus:outline-none"
                  @click="treeOperate(true, 'role')"
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
                <button
                  v-if="!data.accountLocked"
                  class="flex items-center mr-3 text-green-600 focus:outline-none"
                  @click="confirmOperate(true)"
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
                    <use :xlink:href="'/svg/feather-sprite.svg#' + 'key'" />
                  </svg>
                  Unlock
                </button>
              </Action>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Pagation @retrieve="retrieve" :total="total" :page="page" :size="size" @setPage="setPage" />
    <Confirm :isShow="isShow" @cancelAction="confirmOperate" @commitAction="confirmCommit" />
    <Tree
      :isShow="isTree"
      @cancelAction="treeOperate"
      @commitAction="treeCommit"
      :datas="treeDatas"
      :codes="codes"
    />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";

import Operation from "@/components/Operation.vue";
import Action from "@/components/Action.vue";
import Pagation from "@/components/Pagation.vue";
import Confirm from "@/components/Confirm.vue";
import Tree from "@/components/tree/Tree.vue";

import instance from "@/api";
import { SERVER_URL, Account, TreeNode } from "@/api/request";

// 模态框参数
let isShow = ref(false);
let isTree = ref(false);
// 数据
let username = ref("");
let treeDatas = ref<Array<TreeNode>>([]);
let codes = ref<Array<String>>([])
let datas = ref<Array<Account>>([]);
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
      .get(SERVER_URL.account, { params: { page: page.value, size: size.value } })
      .then((res) => {
        datas.value = res.data;
      }),
    count()
  ]);
};
const count = (): void => {
  instance.get(SERVER_URL.account.concat("/count")).then((res) => {
    total.value = res.data;
  })
}
// 删除取消
const confirmOperate = (operate: boolean): void => {
  isShow.value = operate;
};
// 删除确认
const confirmCommit = async (): Promise<void> => {
  await instance.patch(SERVER_URL.account.concat("/", username.value)).then(() => {
    // 结果处理

    isShow.value = false;
  });
};

// 分组/角色树：打开
const treeOperate = async (operate: boolean, type: string): Promise<void> => {
  if (operate) {
    if (type === "group") {
      await Promise.all([
        instance.get(SERVER_URL.group.concat("/tree")).then((res) => {
          treeDatas.value = res.data;
        }),
        relation(type)
      ])
    } else if (type === "role") {
      await Promise.all([
        instance.get(SERVER_URL.role.concat("/tree")).then((res) => {
          treeDatas.value = res.data;
        }),
        relation(type)
      ])
    }
  }
  isTree.value = operate;
};

const relation = (type: string): void => {
  instance.get(SERVER_URL.account.concat('/', username.value, '/', type)).then(res =>
    codes.value = res.data
  )
}
// 提交
const treeCommit = async (tracked: Array<String>): Promise<void> => {
  if (tracked && tracked.length > 0) {
    alert("commit " + tracked)
  }
  isTree.value = false;
};
onMounted(() => {
  retrieve();
});
</script>