<template>
  <div class="mt-2">
    <Operation
      :need-add="false"
      :datas="datas"
      :file-name="'components'"
      :items="items"
      @hand-reload="retrieve"
    />
    <div class="sm-t-h overflow-auto">
      <table
        class="w-full overflow-ellipsis whitespace-nowrap"
        aria-label="components"
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
              {{ $t('id') }}
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
              {{ $t('type') }}
            </th>
            <th
              scope="col"
              class="px-4"
            >
              {{ $t('path') }}
            </th>
            <th
              scope="col"
              class="px-4"
            >
              {{ $t('roleCount') }}
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
            class="text-center bg-white border-y-4 border lg:border-y-8 first:border-t-0 last:border-b-0 border-gray-100 hover:bg-gray-50 hover:text-blue-600"
          >
            <td class="px-4 py-2 sm:py-3 text-left">
              {{ index + 1 }}
            </td>
            <td class="px-4">
              <div class="flex items-center">
                <component
                  :is="data.icon"
                  v-if="data.icon"
                  aria-hidden="true"
                />
                <span
                  class="font-medium ml-2"
                  v-text="data.componentName"
                />
              </div>
            </td>
            <td
              class="px-4"
              v-text="data.id"
            />
            <td
              class="px-4"
              v-text="data.superior"
            />
            <td class="px-4">
              <span
                class="text-xs px-2 py-1 rounded-md"
                :class="data.type === 'M' ? 'bg-indigo-100' : (data.type === 'B' ? 'bg-blue-100' : 'bg-pink-100')"
              >{{
                data.type === 'M' ? 'menu' : (data.type === 'B' ? 'button' : 'api')
              }}</span>
            </td>
            <td
              class="px-4"
              v-text="data.path"
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
                :need-edit="false"
                :need-del="false"
              >
                <button
                  v-if="data.count > 0"
                  type="button"
                  name="role"
                  aria-label="role"
                  class="flex items-center mr-3 text-purple-600 focus:outline-none"
                  @click="showModal(data.id)"
                >
                  <LinkIcon
                    class="w-4 h-4 mr-1"
                    aria-hidden="true"
                  />
                  {{ $t('roles') }}
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

    <Modal
      :visible="visible"
      :show-close="true"
      @close-action="onClose"
    >
      <template #content>
        <table
          class="w-full overflow-ellipsis whitespace-nowrap"
          aria-label="role"
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
                {{ $t('userCount') }}
              </th>
              <th
                scope="col"
                class="px-4"
              >
                {{ $t('modifyTime') }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(role, index) in roles"
              :key="index"
              class="text-center bg-white border-y-4 lg:border-y-8 first:border-t-0 last:border-b-0 border-gray-100 group hover:bg-gray-50 hover:text-blue-600"
            >
              <td class="px-4 py-2 sm:py-3 text-left">
                {{ index + 1 }}
              </td>
              <td
                class="px-4"
                v-text="role.roleName"
              />
              <td
                class="px-4"
                v-text="role.count"
              />
              <td
                class="px-4"
                v-text="new Date(role.modifyTime).toLocaleDateString()"
              />
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
import Modal from "~/components/Modal.vue";

import { instance, SERVER_URL } from "~/api";
import type { Component, Role, Item } from "~/api/request.type";
import { LinkIcon } from "@heroicons/vue/24/outline";

// 模态框参数
let visible = ref(false)

const items: Item[] = [
  {
    key: 'componentName',
    label: '名称'
  },
  {
    key: 'superior',
    label: '上级'
  }
]

// 数据
let datas = ref<Array<Component>>([]);
let roles = ref<Array<Role>>([])

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
  await instance.get(SERVER_URL.components, { params: { page: pagation.page, size: pagation.size } })
    .then(res => {
      datas.value = res.data.content
      pagation.total = res.data.totalElements
    })
};
const retrieveRoles = async (id: number) => {
  await instance.get(SERVER_URL.components.concat(`/${id}/roles`)).then(res => roles.value = res.data);
}
/**
 * 打开 modal
 * @param show 是否展示
 * @param id 主键
 */
const showModal = async (id: number) => {
  retrieveRoles(id)
  visible.value = true
}

const onClose = () => {
  visible.value = false
}
</script>