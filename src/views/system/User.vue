<template>
  <div class="mt-2">
    <Operation
      :need-add="false"
      :datas="datas"
      :file-name="'user'"
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
            <td>
              <Action
                :need-edit="false"
                :need-del="false"
              />
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
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive } from "vue";

import Operation from "~/components/Operation.vue";
import Action from "~/components/Action.vue";
import Pagation from "~/components/Pagation.vue";

import { instance, SERVER_URL } from "~/api";
import type { User } from "~/api/request.type";
import { LockClosedIcon, LockOpenIcon } from "@heroicons/vue/24/outline";

// 数据
let datas = ref<Array<User>>([]);

// 分页参数
let pagation = reactive({
  page: 0,
  size: 10,
  total: 0
})

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
</script>