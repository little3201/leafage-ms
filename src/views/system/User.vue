<template>
  <div class="mt-2">
    <Operation
      :need-add="false"
      :datas="datas"
      :file-name="'user'"
      :items="items"
      @hand-reload="retrieve"
    />
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
              {{ $t('accountLocked') }}
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
              <div class="flex items-center justify-center">
                <span
                  v-if="data.accountExpiresAt"
                  class="w-2 h-2 rounded-full"
                  :class="new Date(data.accountExpiresAt) > new Date() ? 'bg-lime-500' : 'bg-red-500'"
                />
                <span class="ml-2">{{ data.accountExpiresAt ? new Date(data.accountExpiresAt).toLocaleString('zh', {
                  hour12: false
                }) : '-' }}</span>
              </div>
            </td>
            <td class="px-4">
              <div class="flex items-center justify-center">
                <span
                  v-if="data.credentialsExpiresAt"
                  class="w-2 h-2 rounded-full"
                  :class="new Date(data.credentialsExpiresAt) > new Date() ? 'bg-lime-500' : 'bg-red-500'"
                />
                <span class="ml-2">{{ data.credentialsExpiresAt ?
                  new Date(data.credentialsExpiresAt).toLocaleString('zh', { hour12: false }) : '-'
                }}</span>
              </div>
            </td>
            <td class="px-4">
              <div
                class="flex items-center justify-center"
                :class="data.accountLocked ? 'text-red-600' : 'text-lime-600'"
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
            <td>
              <Action
                :editable="false"
                :removeable="false"
              >
                <button
                  type="button"
                  name="grant"
                  aria-label="grant"
                  class="flex items-center mr-3 text-amber-600 focus:outline-none"
                  @click="showModal"
                >
                  <IdentificationIcon
                    class="w-4 h-4 mr-1"
                    aria-hidden="true"
                  />
                  {{ $t('grant') }}
                </button>
              </Action>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Pagation
      :total="pagation.total"
      :page="pagation.page"
      :size="pagation.size"
      @retrieve="retrieve"
      @set-page="setPage"
    />
    <Drawer
      :visible="operation.modal"
      :title="'授权'"
      @close="onClose"
    >
      <template #content>
        <div class="w-full">
          <label for="groups">{{ $t('groups') }}</label>
          <select
            id="groups"
            name="groups"
            class="mt-1 w-full block rounded-md border-gray-300"
            aria-label="groups"
          >
            <option selected>
              ---{{ $t('select') }}---
            </option>
            <option
              v-for="(group, index) in groups"
              :key="index"
              :value="group.id"
              v-text="group.groupName"
            />
          </select>
        </div>
        <div class="w-full">
          <label for="roles">{{ $t('roles') }}</label>
          <select
            id="roles"
            name="roles"
            class="mt-1 w-full block rounded-md border-gray-300"
            aria-label="roles"
          >
            <option selected>
              ---{{ $t('select') }}---
            </option>
            <option
              v-for="(role, index) in roles"
              :key="index"
              :value="role.id"
              v-text="role.roleName"
            />
          </select>
        </div>
      </template>
      <template #footer>
        <button
          type="submit"
          name="commit"
          aria-label="commit"
          class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 font-medium text-white focus:outline-none focus:ring-1 focus:ring-offset-2 sm:ml-3 sm:w-auto active:cursor-wait bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
        >
          {{ $t('commit') }}
        </button>
        <button
          type="button"
          name="cancle"
          aria-label="cancle"
          class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-blue-600 sm:mt-0 sm:ml-3 sm:w-auto active:cursor-wait"
          @click="onClose"
        >
          {{
            $t('cancle')
          }}
        </button>
      </template>
    </Drawer>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive } from "vue";

import Operation from "~/components/Operation.vue";
import Action from "~/components/Action.vue";
import Pagation from "~/components/Pagation.vue";
import Drawer from "~/components/Drawer.vue";

import { instance, SERVER_URL } from "~/api";
import type { User, Group, Role, Item } from "~/api/request.type";
import { IdentificationIcon, LockClosedIcon, LockOpenIcon } from "@heroicons/vue/24/outline";

// 模态框参数
let operation = reactive({
  modal: false
})

// 分页参数
let pagation = reactive({
  page: 0,
  size: 10,
  total: 0
})

const items: Item[] = [
  {
    key: 'username',
    label: '账号'
  },
  {
    key: 'nickname',
    label: '昵称'
  }
]

// 数据
let datas = ref<Array<User>>([]);
let groups = ref<Array<Group>>([])
let roles = ref<Array<Role>>([])

onMounted(() => {
  retrieve();
});
/**
 * 设置页码
 * @param page 页码
 * @param size 大小
 */
const setPage = (page: number, size: number) => {
  pagation.page = page;
  pagation.size = size;
};
/**
 * 查询列表
 */
const retrieve = async () => {
  await instance.get(SERVER_URL.user, { params: { page: pagation.page, size: pagation.size } })
    .then(res => {
      datas.value = res.data.content
      pagation.total = res.data.totalElements
    })
};
/**
 * 查询列表
 */
const retrieveGroups = async () => {
  await instance.get(SERVER_URL.group, { params: { page: 0, size: 100 } })
    .then(res => {
      groups.value = res.data.content
    })
};
/**
 * 查询列表
 */
const retrieveRoles = async () => {
  await instance.get(SERVER_URL.role, { params: { page: 0, size: 100 } })
    .then(res => {
      roles.value = res.data.content
    })
};
/**
 * 解锁
 * @param username 账号
 */
const unlock = async (username: string) => {
  await instance.patch(SERVER_URL.user.concat(`/${username}`)).then(res => {
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
 * 新增/编辑：打开
 * @param operate 是否打开
 */
const showModal = () => {
  retrieveGroups()
  retrieveRoles()
  operation.modal = true;
};
const onClose = () => {
  operation.modal = false
}
</script>