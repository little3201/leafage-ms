<template>
  <div class="mt-2">
    <div class="flex justify-between items-center">
      <h2 class="text-lg font-medium">
        {{ $t('group') }}
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
        :datas="datas"
        :file-name="'group'"
        @click.capture="dataCode = ''"
        @modal-operate="modalOperate"
      />
    </div>

    <div class="sm-t-h overflow-auto">
      <table
        class="w-full overflow-ellipsis whitespace-nowrap"
        aria-label="group"
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
              {{ $t('name') }}
            </th>
            <th
              scope="col"
              class="px-4"
            >
              {{ $t('code') }}
            </th>
            <th
              scope="col"
              class="px-4"
            >
              {{ $t('alias') }}
            </th>
            <th
              scope="col"
              class="px-4"
            >
              {{ $t('superior') }}
            </th>
            <th
              scope="col"
              class="px-4"
            >
              {{ $t('principal') }}
            </th>
            <th
              scope="col"
              class="px-4"
            >
              {{ $t('userCount') }}
            </th>
            <th
              scope="col"
              class="px-4"
            >
              {{ $t('description') }}
            </th>
            <th
              scope="col"
              class="px-4"
            >
              {{ $t('modifyTime') }}
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
            class="text-center bg-white border-y-4 lg:border-y-8 first:border-t-0 last:border-b-0 border-gray-100 group hover:bg-gray-50 hover:text-blue-600"
          >
            <td class="px-4 py-2 sm:py-3 text-left">
              {{ index + 1 }}
            </td>
            <td
              class="px-4"
              v-text="data.name"
            />
            <td
              class="px-4"
              v-text="data.code"
            />
            <td
              class="px-4"
              v-text="data.alias"
            />
            <td
              class="px-4"
              v-text="data.superior"
            />
            <td
              class="px-4"
              v-text="data.principal"
            />
            <td
              class="px-4"
              v-text="data.count"
            />
            <td
              class="px-4"
              v-text="data.description"
            />
            <td
              class="px-4"
              v-text="new Date(data.modifyTime).toLocaleDateString()"
            />
            <td>
              <Action
                @click.capture="dataCode = data.code"
                @del-action="confirmOperate"
                @edit-action="modalOperate"
              >
                <button
                  v-if="data.count > 0"
                  type="button"
                  name="members"
                  aria-label="members"
                  class="flex items-center mr-3 text-amber-600 focus:outline-none"
                  @click="previewOperation(true)"
                >
                  <UsersIcon
                    class="w-4 h-4 mr-1"
                    aria-hidden="true"
                  />
                  {{ $t('members') }}
                </button>
              </Action>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Page
      :total="total"
      :page="page"
      :size="size"
      @retrieve="retrieve"
      @set-page="setPage"
    />
    <Confirm
      :is-show="isDel"
      @cancel-action="confirmOperate"
      @commit-action="confirmCommit"
    />
    <Modal
      :is-show="isEdit"
      @cancel-action="modalOperate"
      @commit-action="modelCommit"
    >
      <form @submit.prevent>
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-12 sm:col-span-6">
            <label for="name">{{ $t('name') }}</label>
            <input
              id="name"
              v-model.trim="groupData.name"
              name="name"
              type="text"
              class="mt-1 w-full block rounded-md border-gray-300"
              :placeholder="$t('name')"
              autofocus
              aria-label="name"
            >
          </div>
          <div class="col-span-12 sm:col-span-6">
            <label for="alias">{{ $t('alias') }}</label>
            <input
              id="alias"
              v-model.trim="groupData.alias"
              name="alias"
              type="text"
              class="mt-1 w-full block rounded-md border-gray-300"
              :placeholder="$t('alias')"
              autofocus
              aria-label="alias"
            >
          </div>
          <div class="col-span-12 sm:col-span-6">
            <label for="superior">{{ $t('superior') }}</label>
            <select
              id="superior"
              v-model.lazy="groupData.superior"
              name="superior"
              class="mt-1 w-full block rounded-md border-gray-300"
              aria-label="group superior"
            >
              <option selected>
                ---{{ $t('select') }}---
              </option>
              <option
                v-for="superior in superiors"
                :key="superior.code"
                :value="superior.code"
                v-text="superior.name"
              />
            </select>
          </div>
          <div class="col-span-12 sm:col-span-6">
            <label for="principal">{{ $t('principal') }}</label>
            <select
              id="principal"
              v-model.lazy="groupData.principal"
              name="principal"
              class="mt-1 w-full block rounded-md border-gray-300"
              aria-label="principal"
            >
              <option selected>
                ---{{ $t('select') }}---
              </option>
              <option
                v-for="(account, index) in accounts"
                :key="index"
                :value="account.username"
                v-text="account.nickname"
              />
            </select>
          </div>
          <div class="col-span-12">
            <label for="description">{{ $t('description') }}</label>
            <textarea
              id="description"
              v-model.trim="groupData.description"
              name="description"
              class="mt-1 w-full block rounded-md border-gray-300"
              :placeholder="$t('description')"
            />
          </div>
        </div>
      </form>
    </Modal>
    <Modal
      :is-show="isShow"
      :need-footer="false"
      @close-action="previewOperation"
    >
      <table
        class="w-full overflow-ellipsis whitespace-nowrap"
        aria-label="group-members"
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
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(account, index) in accounts"
            :key="index"
            class="text-center bg-white border-y-4 lg:border-y-8 first:border-t-0 last:border-b-0 border-gray-100 hover:bg-gray-50 hover:text-blue-600"
          >
            <td class="px-4 py-2 sm:py-3 text-left">
              {{ index + 1 }}
            </td>
            <td class="px-4">
              {{ account.username }}
            </td>
            <td class="px-4">
              {{ account.nickname }}
            </td>
            <td class="px-4">
              <div
                class="flex items-center justify-center"
                :class="account.accountLocked ? 'text-red-600' : 'text-lime-600'"
              >
                <svg
                  v-if="account.accountLocked"
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
                  <rect
                    x="3"
                    y="11"
                    width="18"
                    height="11"
                    rx="2"
                    ry="2"
                  />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
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
                  class="feather feather-unlock text-lime-600"
                >
                  <rect
                    x="3"
                    y="11"
                    width="18"
                    height="11"
                    rx="2"
                    ry="2"
                  />
                  <path d="M7 11V7a5 5 0 0 1 9.9-1" />
                </svg>
              </div>
            </td>
            <td class="px-4">
              <div class="flex items-center justify-center">
                <span
                  class="w-2 h-2 rounded-full"
                  :class="new Date(account.accountExpiresAt) > new Date() ? 'bg-lime-500': 'bg-red-500'"
                />
                <span class="ml-2">{{
                  new Date(account.accountExpiresAt).toLocaleString('zh', { hour12: false })
                }}</span>
              </div>
            </td>
            <td class="px-4">
              <div class="flex items-center justify-center">
                <span
                  class="w-2 h-2 rounded-full"
                  :class="new Date(account.credentialsExpiresAt) > new Date() ? 'bg-lime-500': 'bg-red-500'"
                />
                <span class="ml-2">{{
                  new Date(account.credentialsExpiresAt).toLocaleString('zh', { hour12: false })
                }}</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </Modal>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";

import Operation from "@/components/Operation.vue";
import Action from "@/components/Action.vue";
import Page from "@/components/Page.vue";
import Confirm from "@/components/Confirm.vue";
import Modal from "@/components/Modal.vue";

import { instance, SERVER_URL } from "@/api";
import { Group, AccountDetail } from "@/api/request.type";
import { ArrowPathIcon, UsersIcon } from "@heroicons/vue/24/outline";

// 模态框参数
let isEdit = ref(false)
let isDel = ref(false)
let isShow = ref(false)
// 数据
let groupData = ref<Group>({
  code: '',
  name: '',
  alias: '',
  superior: '',
  principal: '',
  count: 0,
  description: '',
  enabled: true,
  modifyTime: ''
})
let dataCode = ref("")
let accounts = ref<Array<AccountDetail>>([])
let superiors = ref<Array<Group>>([])
let datas = ref<Array<Group>>([])
// 分页参数
let page = ref(0);
let size = ref(10);
let total = ref(0);

onMounted(() => {
  retrieve()
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
  await instance.get(SERVER_URL.group, { params: { page: page.value, size: size.value } })
    .then(res => {
      datas.value = res.data.content
      total.value = res.data.totalElements
    })
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
      (item: Group) => item.code != dataCode.value
    );
    isDel.value = false;
  });
};
/**
 * 查询关联账号
 */
const retrieveAccounts = async (): Promise<void> => {
  if (groupData.value.count > 0 && dataCode.value && dataCode.value.length > 0) {
    await instance.get(SERVER_URL.group.concat("/", dataCode.value, "/members"))
      .then(res => accounts.value = res.data)
  }
}
/**
 * 新增/编辑：打开
 * @param operate 是否打开
 */
const modalOperate = async (operate: boolean): Promise<void> => {
  if (operate) {
    groupData.value = {
      code: '',
      name: '',
      alias: '',
      superior: '',
      principal: '',
      count: 0,
      description: '',
      enabled: true,
      modifyTime: ''
    };
    await Promise.all([
      fetch(),
      instance.get(SERVER_URL.group, { params: { page: 0, size: 99 } })
        .then(res => superiors.value = res.data.content),
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
          (item: Group) => item.code != dataCode.value
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
    await instance.get(SERVER_URL.group.concat("/", dataCode.value, "/user")).then(res => accounts.value = res.data);
  }
  isShow.value = show
}
</script>