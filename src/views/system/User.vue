<template>
  <div class="mt-2">
    <div class="flex justify-between items-center">
      <h2 class="text-lg font-medium">
        {{ $t('user') }}
      </h2>
      <button
        type="button"
        name="reload"
        aria-label="reload"
        class="ml-4 inline-flex items-center text-blue-600 focus:outline-none active:cursor-wait"
        @click="retrieve"
      >
        <ArrowPathIcon
          class="w-5 h-5 mr-2"
          aria-hidden="true"
        />
        {{ $t('reload') }}
      </button>
      <Operation
        :need-add="false"
        :datas="datas"
        :file-name="'user'"
      />
    </div>
    <div class="sm-t-h overflow-auto">
      <table
        class="w-full overflow-ellipsis whitespace-nowrap"
        aria-label="user"
      >
        <thead>
          <tr class="sticky top-0 bg-gray-100 uppercase text-center text-xs sm:text-sm">
            <th
              scope="col"
              class="px-4 py-2 sm:py-3 text-left"
            >
              {{ $t('no') }}
            </th>
            <th
              scope="col"
              class="px-4"
            >
              {{ $t('username') }}
            </th>
            <th
              scope="col"
              class="px-4"
            >
              {{ $t('nickname') }}
            </th>
            <th
              scope="col"
              class="px-4"
            >
              {{ $t('accountLockedState') }}
            </th>
            <th
              scope="col"
              class="px-4"
            >
              {{ $t('accountExpiresAt') }}
            </th>
            <th
              scope="col"
              class="px-4"
            >
              {{ $t('credentialsExpiresAt') }}
            </th>
            <th
              scope="col"
              class="px-4"
            >
              {{ $t('actions') }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(data, index) in datas"
            :key="index"
            class="text-center bg-white border-y-4 lg:border-y-8 first:border-t-0 last:border-b-0 border-gray-100 hover:bg-gray-50 hover:text-blue-600"
          >
            <td class="px-4 py-2 sm:py-3 text-left">
              {{ index + 1 }}
            </td>
            <td class="px-4">
              <div class="flex items-center">
                <figure class="flex-shrink-0 h-8 w-8">
                  <img
                    :src="data.avatar"
                    alt="avatar"
                    class="rounded-full w-8 h-8 my-auto"
                    width="32"
                    height="32"
                  >
                </figure>
                <span class="ml-2">{{ data.username }}</span>
              </div>
            </td>
            <td class="px-4">
              {{ data.nickname }}
            </td>
            <td class="px-4">
              <div
                class="flex items-center justify-center"
                :class="data.accountLocked ? 'text-red-600': 'text-lime-600'"
              >
                <LockClosedIcon
                  v-if="data.accountLocked"
                  class="w-5 h-5 cursor-pointer"
                  aria-hidden="true"
                  @click="unlock(data.username)"
                />
                <LockOpenIcon
                  v-else
                  class="w-5 h-5 text-lime-600"
                  aria-hidden="true"
                />
              </div>
            </td>
            <td class="px-4">
              <div class="flex items-center justify-center">
                <span
                  class="w-2 h-2 rounded-full"
                  :class="new Date(data.accountExpiresAt) > new Date() ? 'bg-lime-500': 'bg-red-500'"
                />
                <span class="ml-2">{{ new Date(data.accountExpiresAt).toLocaleString('zh', { hour12: false }) }}</span>
              </div>
            </td>
            <td class="px-4">
              <div class="flex items-center justify-center">
                <span
                  class="w-2 h-2 rounded-full"
                  :class="new Date(data.credentialsExpiresAt) > new Date() ? 'bg-lime-500': 'bg-red-500'"
                />
                <span class="ml-2">{{
                  new Date(data.credentialsExpiresAt).toLocaleString('zh', { hour12: false })
                }}</span>
              </div>
            </td>
            <td>
              <Action
                :need-edit="false"
                :need-del="false"
              >
                <button
                  type="button"
                  name="group"
                  aria-label="group"
                  class="flex items-center mr-3 text-cyan-600 focus:outline-none"
                  @click="treeOperate(true, 'group', data.username)"
                >
                  <UsersIcon
                    class="w-4 h-4 mr-1"
                    aria-hidden="true"
                  />
                  {{ $t('group') }}
                </button>
                <button
                  type="button"
                  name="role"
                  aria-label="role"
                  class="flex items-center mr-3 text-purple-600 focus:outline-none"
                  @click="treeOperate(true, 'role', data.username)"
                >
                  <LinkIcon
                    class="w-4 h-4 mr-1"
                    aria-hidden="true"
                  />
                  {{ $t('role') }}
                </button>
              </Action>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Pagation
      :total="total"
      :page="page"
      :size="size"
      @retrieve="retrieve"
      @set-page="setPage"
    />
    <Modal
      :is-show="isTree"
      :need-footer="true"
      @cancel-action="treeOperate"
      @commit-action="treeCommit"
    >
      <TreeItem
        v-for="data in treeDatas"
        :key="data.id"
        :data="data"
        :ticked="ticked"
      />
    </Modal>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive } from "vue";

import Operation from "~/components/Operation.vue";
import Action from "~/components/Action.vue";
import Pagation from "~/components/Pagation.vue.js";

import Modal from "~/components/Modal.vue";
import TreeItem from "~/components/tree/TreeItem.vue";

import { instance, SERVER_URL } from "~/api";
import type { User, NodeData } from "~/api/request.type";
import { ArrowPathIcon, LinkIcon, LockClosedIcon, LockOpenIcon, UsersIcon } from "@heroicons/vue/24/outline";

// 模态框参数
let isTree = ref(false);
// 数据
let treeDatas = ref<Array<NodeData>>([]);
let ticked = ref<Array<string>>([])
let datas = ref<Array<User>>([]);
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
  await instance.get(SERVER_URL.user, { params: { page: page.value, size: size.value } })
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
  await instance.patch(SERVER_URL.user.concat("/", username)).then(res => {
    if (res.data) {
      datas.value.forEach((item: User) => {
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
  await instance.get(SERVER_URL.user.concat('/', username, '/', type)).then(res => ticked.value = res.data)
}
/**
 * 提交
 * @param tracked 选中的数据
 */
const treeCommit = async (tracked: Array<string>): Promise<void> => {
  if (tracked && tracked.length > 0) {
    await instance.patch(SERVER_URL.user.concat('/', related.username, '/', related.type), tracked)
      .then(res => ticked.value = res.data)
  }
  isTree.value = false;
};
</script>