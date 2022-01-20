<template>
  <div class="col-span-12 mt-2">
    <div class="flex justify-between items-center">
      <h2 class="text-lg font-medium">Users</h2>
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
      <Operation :needAdd="false"  @modelOperate="modelOperate" />
    </div>
    <div class="overflow-scroll" style="height: calc(100vh - 11.5rem)">
      <table class="w-full overflow-ellipsis whitespace-nowrap" aria-label="user">
        <thead>
          <tr class="sticky top-0 bg-gray-100 uppercase text-center text-xs sm:text-sm">
            <th scope="col" class="px-4 py-2 sm:py-3 text-left">No.</th>
            <th scope="col" class="px-4">Nickname</th>
            <th scope="col" class="px-4">Username</th>
            <th scope="col" class="px-4">Description</th>
            <th scope="col" class="px-4">NonExpired</th>
            <th scope="col" class="px-4">Locked</th>
            <th scope="col" class="px-4">Credentials</th>
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
                <div class="flex-shrink-0 h-8 w-8">
                  <img src="/images/avatar.jpg" alt="avatar" class="rounded-full w-8 h-8 my-auto" />
                </div>
                <span class="ml-2">{{ data.nickname }}</span>
              </div>
            </td>
            <td class="px-4">
              <span class="font-medium" v-text="data.username"></span>
            </td>
            <td class="px-4">
              <span class="font-medium" v-text="data.description"></span>
            </td>
            <td class="px-4">
              <div v-if="data.accountNonExpired" class="flex items-center justify-center">
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
                  class="feather feather-check-circle text-green-600"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <div v-else class="flex items-center justify-center text-red-600">
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
                  class="feather feather-x-circle"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
              </div>
            </td>
            <td class="px-4">
              <div v-if="data.accountNonLocked" class="flex items-center justify-center">
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
                  class="feather feather-unlock text-green-600"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 9.9-1" />
                </svg>
              </div>
              <div v-else class="flex items-center justify-center text-red-600">
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
                  class="feather feather-lock"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
            </td>
            <td class="px-4">
              <div v-if="data.credentialsNonExpired" class="flex items-center justify-center">
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
                  class="feather feather-check-circle text-green-600"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <div v-else class="flex items-center justify-center text-red-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-x-circle"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
              </div>
            </td>
            <td class="px-4">
              <Action
                @click.capture="username = data.username"
                @delAction="confirmOperate"
                @editAction="modelOperate"
              >
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
          <div class="col-span-12 md:col-span-6">
            <span>
              Account Expired
              <span class="text-red-600 text-base ml-1">*</span>
            </span>
            <div class="mt-3">
              <input
                id="accountExpired_false"
                name="accountNonExpired"
                aria-label="account expired"
                type="radio"
                value="false"
                v-model="userData.accountNonExpired"
              />
              <label for="accountExpired_false" class="ml-2 cursor-pointer">True</label>
              <input
                id="accountExpired_true"
                name="accountNonExpired"
                aria-label="account expired"
                type="radio"
                class="ml-4"
                value="true"
                v-model="userData.accountNonExpired"
              />
              <label for="accountExpired_true" class="ml-2 cursor-pointer">False</label>
            </div>
          </div>
          <div class="col-span-12 md:col-span-6">
            <span>
              Account Locked
              <span class="text-red-600 text-base ml-1">*</span>
            </span>
            <div class="mt-3">
              <input
                id="accountLocked_false"
                name="accountLocked"
                aria-label="account locked"
                type="radio"
                value="false"
                v-model="userData.accountNonLocked"
              />
              <label for="accountLocked_false" class="ml-2 cursor-pointer">True</label>
              <input
                id="accountLocked_true"
                name="accountLocked"
                aria-label="account locked"
                type="radio"
                value="true"
                class="ml-4"
                v-model="userData.accountNonLocked"
              />
              <label for="accountLocked_true" class="ml-2 cursor-pointer">False</label>
            </div>
          </div>
          <div class="col-span-12 md:col-span-6">
            <span>
              Credentials Expired
              <span class="text-red-600 text-base ml-1">*</span>
            </span>
            <div class="mt-3">
              <input
                id="credentialsExpired_false"
                name="credentialsNonExpired"
                aria-label="credentials expired"
                type="radio"
                value="false"
                v-model="userData.credentialsNonExpired"
              />
              <label for="credentialsExpired_false" class="ml-2 cursor-pointer">True</label>
              <input
                id="credentialsExpired_true"
                name="credentialsNonExpired"
                aria-label="credentials expired"
                type="radio"
                value="true"
                class="ml-4"
                v-model="userData.credentialsNonExpired"
              />
              <label for="credentialsExpired_true" class="ml-2 cursor-pointer">False</label>
            </div>
          </div>
          <div class="col-span-12">
            <label for="description">Description</label>
            <textarea
              id="description"
              name="description"
              aria-label="description"
              class="mt-1 w-full rounded-md border-gray-300 shadow-sm"
              v-model.trim="userData.description"
              placeholder="Description"
            />
          </div>
        </div>
      </form>
    </Model>
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
import Model from "@/components/Model.vue";
import Tree from "@/components/tree/Tree.vue";

import instance from "@/api";
import { SERVER_URL, Account, TreeNode } from "@/api/request";

// 模态框参数
let isEdit = ref(false);
let isDel = ref(false);
let isTree = ref(false);
// 数据
let userData = ref<Account>({});
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
  isDel.value = operate;
};
// 删除确认
const confirmCommit = async (): Promise<void> => {
  await instance.delete(SERVER_URL.account.concat("/", username.value)).then(() => {
    // 将datas中修改项的历史数据删除
    datas.value = datas.value.filter(
      (item: any) => item.username != username.value
    );
    isDel.value = false;
    count()
  });
};
// 新增/编辑：打开
const modelOperate = async (operate: boolean): Promise<void> => {
  if (operate) {
    userData.value = {};
    if (username.value && username.value.length > 0) {
      await instance
        .get(SERVER_URL.account.concat("/", username.value))
        .then((res) => {
          userData.value = res.data;
        });
    }
  }
  isEdit.value = operate;
};
// 新增/编辑：提交
const modelCommit = async (): Promise<void> => {
  if (username.value && username.value.length > 0) {
    await instance
      .put(SERVER_URL.account.concat("/", username.value), userData.value)
      .then((res) => {
        // 将datas中修改项的历史数据删除
        datas.value = datas.value.filter(
          (item: any) => item.username != username.value
        );
        // 将结果添加到第一个
        datas.value.unshift(res.data);
        isEdit.value = false;
      });
  }
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