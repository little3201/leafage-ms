<template>
  <div class="mt-2">
    <Operation
      :datas="datas"
      :file-name="'group'"
      :items="items"
      @hand-reload="retrieve"
      @hand-add="onModal"
    />

    <div class="sm-t-h overflow-auto">
      <table
        class="w-full overflow-ellipsis whitespace-nowrap"
        aria-label="group"
      >
        <thead>
          <tr class="sticky top-0 bg-neutral-100 uppercase text-center text-xs sm:text-sm">
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
            class="text-center bg-white border-y-4 lg:border-y-8 first:border-t-0 last:border-b-0 border-neutral-100 group hover:bg-neutral-50 hover:text-blue-600"
          >
            <td class="px-4 py-2 sm:py-3 text-left">
              {{ index + 1 }}
            </td>
            <td
              class="px-4"
              v-text="data.groupName"
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
              v-text="new Date(data.modifyTime).toLocaleDateString()"
            />
            <td>
              <Action
                :editable="true"
                :removeable="true"
                @edit="onModal(data.id)"
                @del="onConfirm"
              >
                <button
                  v-if="data.count > 0"
                  type="button"
                  name="members"
                  aria-label="members"
                  class="flex items-center mr-3 text-amber-600 focus:outline-none"
                  @click="onMember(data.id)"
                >
                  <UsersIcon
                    class="w-4 h-4 mr-1"
                    aria-hidden="true"
                  />
                  {{ $t('members') }}
                </button>
              </Action>
            </td>
            <Confirm
              :visible="operation.confirm"
            >
              <template #footer>
                <button
                  type="submit"
                  name="confirm"
                  aria-label="confirm"
                  class="w-full rounded-md border border-transparent shadow-sm px-4 py-2 font-medium text-white focus:outline-none focus:ring-1 focus:ring-offset-2 sm:ml-3 sm:w-auto bg-red-600 hover:bg-red-700 focus:ring-red-500"
                  @click="confirmCommit(data.id)"
                >
                  {{ $t('confirm') }}
                </button>
                <button
                  type="button"
                  name="cancle"
                  aria-label="cancle"
                  class="mt-3 w-full rounded-md border border-neutral-300 shadow-sm px-4 py-2 bg-white font-medium text-neutral-700 hover:bg-neutral-50 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-neutral-400 sm:mt-0 sm:ml-3 sm:w-auto"
                  @click="confirmClose"
                >
                  {{
                    $t('cancle')
                  }}
                </button>
              </template>
            </Confirm>
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
      :title="'编辑分组'"
      @close="modalClose"
    >
      <template #content>
        <div class="w-full">
          <label for="name">{{ $t('name') }}</label>
          <input
            id="name"
            v-model.trim="formData.groupName"
            name="name"
            type="text"
            class="mt-1 w-full block rounded-md border-neutral-300"
            :placeholder="$t('name')"
            aria-label="name"
          >
        </div>
        <div class="w-full">
          <label for="principal">{{ $t('principal') }}</label>
          <select
            id="principal"
            v-model.lazy="formData.principal"
            name="principal"
            class="mt-1 w-full block rounded-md border-neutral-300"
            aria-label="principal"
          >
            <option selected>
              ---{{ $t('select') }}---
            </option>
            <option
              v-for="(user, index) in users"
              :key="index"
              :value="user.username"
              v-text="user.nickname"
            />
          </select>
        </div>
      </template>
      <template #footer>
        <button
          type="submit"
          name="commit"
          aria-label="commit"
          class="w-full rounded-md border border-transparent shadow-sm px-4 py-2 font-medium text-white focus:outline-none focus:ring-1 focus:ring-offset-2 sm:ml-3 sm:w-auto bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
          @click="modelCommit(formData.id)"
        >
          {{ $t('commit') }}
        </button>
        <button
          type="button"
          name="cancle"
          aria-label="cancle"
          class="mt-3 w-full rounded-md border border-neutral-300 shadow-sm px-4 py-2 bg-white font-medium text-neutral-700 hover:bg-neutral-50 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-blue-600 sm:mt-0 sm:ml-3 sm:w-auto"
          @click="modalClose"
        >
          {{
            $t('cancle')
          }}
        </button>
      </template>
    </Drawer>
    <Modal
      :visible="operation.members"
      :closeable="true"
      @close="closeMember"
    >
      <template #content>
        <table
          class="w-full overflow-ellipsis whitespace-nowrap"
          aria-label="group-members"
        >
          <thead>
            <tr class="sticky top-0 bg-neutral-100 uppercase text-center text-xs sm:text-sm">
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
                {{ $t('accountLocked') }}
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
              v-for="(user, index) in members"
              :key="index"
              class="text-center bg-white border-y-4 lg:border-y-8 first:border-t-0 last:border-b-0 border-neutral-100 hover:bg-neutral-50 hover:text-blue-600"
            >
              <td class="px-4 py-2 sm:py-3 text-left">
                {{ index + 1 }}
              </td>
              <td class="px-4">
                {{ user.username }}
              </td>
              <td class="px-4">
                {{ user.nickname }}
              </td>
              <td class="px-4">
                <div
                  class="flex items-center justify-center"
                  :class="user.accountLocked ? 'text-red-600' : 'text-lime-600'"
                >
                  <LockClosedIcon
                    v-if="user.accountLocked"
                    class="w-5 h-5"
                    aria-hidden="true"
                  />
                  <LockOpenIcon
                    v-else
                    class="w-5 h-5"
                    aria-hidden="true"
                  />
                </div>
              </td>
              <td class="px-4">
                <div class="flex items-center justify-center">
                  <span
                    class="w-2 h-2 rounded-full"
                    :class="new Date(user.accountExpiresAt) > new Date() ? 'bg-lime-500' : 'bg-red-500'"
                  />
                  <span class="ml-2">{{
                    new Date(user.accountExpiresAt).toLocaleString('zh', { hour12: false })
                  }}</span>
                </div>
              </td>
              <td class="px-4">
                <div class="flex items-center justify-center">
                  <span
                    class="w-2 h-2 rounded-full"
                    :class="new Date(user.credentialsExpiresAt) > new Date() ? 'bg-lime-500' : 'bg-red-500'"
                  />
                  <span class="ml-2">{{
                    new Date(user.credentialsExpiresAt).toLocaleString('zh', { hour12: false })
                  }}</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive } from "vue";

import Operation from "~/components/Operation.vue";
import Action from "~/components/Action.vue";
import Pagation from "~/components/Pagation.vue";
import Confirm from "~/components/Confirm.vue";
import Modal from "~/components/Modal.vue";
import Drawer from "~/components/Drawer.vue";

import { instance, SERVER_URL } from "~/api";
import { Group, User, Item } from "~/api/request.type";
import { LockClosedIcon, LockOpenIcon, UsersIcon } from "@heroicons/vue/24/outline";

// 模态框参数
let operation = reactive({
  modal: false,
  confirm: false,
  members: false
})

// 分页参数
let pagation = reactive({
  page: 0,
  size: 10,
  total: 0
})

const initData: Group = {
  id: 0,
  groupName: '',
  principal: '',
  count: 0,
  enabled: true,
  modifyTime: ''
}
// 数据
let formData = ref<Group>(initData)

const items: Item[] = [
  {
    key: 'groupName',
    label: '名称'
  }
]

let users = ref<Array<User>>([])
let members = ref<Array<User>>([])
let datas = ref<Array<Group>>([])


onMounted(() => {
  retrieve()
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
  await instance.get(SERVER_URL.group, { params: { page: pagation.page, size: pagation.size } })
    .then(res => {
      datas.value = res.data.content
      pagation.total = res.data.totalElements
    })
}
/**
 * confirm 操作
 */
const onConfirm = () => {
  operation.confirm = true;
};
/**
 * confirm 提交
 */
const confirmCommit = async (id: number) => {
  await instance.delete(SERVER_URL.group.concat(`/${id}`)).then(() => {
    retrieve()
    confirmClose()
  });
};
/**
 * 查询关联账号
 */
const retrieveMembers = async (id: number) => {
  if (id && id != 0) {
    await instance.get(SERVER_URL.group.concat(`/${id}/members`))
      .then(res => members.value = res.data)
  }
}
/**
 * 查询关联账号
 */
 const retrieveUsers = async () => {
    await instance.get(SERVER_URL.user, {params: {page: 0, size: 100}})
      .then(res => users.value = res.data.content)
}
/**
 * 添加
 */
const create = async () => {
  await instance.post(SERVER_URL.group, formData.value).then(res => {
    if (datas.value.length >= pagation.size) {
      // 删除第一个
      datas.value.shift();
    }
    // 将结果添加到第一个
    datas.value.unshift(res.data);
  });
}
/**
 * 编辑
 * @param id 主键
 */
const modify = async (id: number) => {
  await instance.put(SERVER_URL.group.concat(`/${id}`), formData.value)
    .then(res => {
      // 将datas中修改项的历史数据删除
      datas.value = datas.value.filter(
        (item: Group) => item.id != id
      );
      // 将结果添加到第一个
      datas.value.unshift(res.data);
    });
}
/**
 * 新增/编辑：打开
 * @param operate 是否打开
 */
const onModal = (id: number) => {
  if (id && id != 0) {
    fetch(id)
  } else {
    formData.value = initData;
  }
  retrieveUsers()
  operation.modal = true
};
/**
 * 查询详情
 */
const fetch = async (id: number) => {
  if (id && id != 0) {
    await instance.get(SERVER_URL.group.concat(`/${id}`)).then(res => formData.value = { ...res.data });
  }
};
/**
 * 新增/编辑：提交
 */
const modelCommit = (id: number) => {
  if (id && id != 0) {
    modify(id)
  } else {
    create()
  }
  operation.modal = false;
};
/**
 * 预览
 * @param id 主键
 */
const onMember = (id: number) => {
  if (id && id != 0) {
    retrieveMembers(id)
  }
  operation.members = true
}
/**
 * 关闭 member展示
 */
const closeMember = () => {
  operation.members = false
}
/**
 * 关闭modal
 */
const modalClose = () => {
  operation.modal = false
}
/**
 * 关闭confirm
 */
 const confirmClose = () => {
  operation.confirm = false
}
</script>