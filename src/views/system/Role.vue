<template>
  <div class="mt-2">
    <div class="flex justify-between items-center">
      <h2 class="text-lg font-medium">
        {{ $t('role') }}
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
        :file-name="'role'"
        @click.capture="dataCode = ''"
        @modal-operate="modalOperate"
      />
    </div>

    <div class="sm-t-h overflow-auto">
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
              {{ $t('code') }}
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
              v-text="data.superior"
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
                  type="button"
                  name="grant"
                  aria-label="grant"
                  class="flex items-center mr-3 text-sky-600 focus:outline-none"
                  @click.prevent="treeOperate(true)"
                >
                  <KeyIcon
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
    <Page
      :total="total"
      :page="page"
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
          <div class="col-span-12 md:col-span-6">
            <label for="name">{{ $t('name') }}</label>
            <input
              id="name"
              v-model.trim="roleData.name"
              name="name"
              type="text"
              aria-label="name"
              class="mt-1 w-full block rounded-md border-gray-300"
              :placeholder="$t('name')"
              autofocus
            >
          </div>
          <div class="col-span-12 md:col-span-6">
            <label for="superior">{{ $t('superior') }}</label>
            <select
              id="superior"
              v-model="roleData.superior"
              name="superior"
              class="mt-1 w-full block rounded-md border-gray-300"
              aria-label="role superior"
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
          <div class="col-span-12">
            <label for="description">{{ $t('description') }}</label>
            <textarea
              id="description"
              v-model.trim="roleData.description"
              aria-label="description"
              name="description"
              class="mt-1 w-full block rounded-md border-gray-300"
              :placeholder="$t('description')"
            />
          </div>
        </div>
      </form>
    </Modal>
    <Modal
      :is-show="isTree"
      :need-footer="true"
      @cancel-action="treeOperate"
      @commit-action="treeCommit"
    >
      <TreeItem
        v-for="treeData in treeDatas"
        :key="treeData.code"
        v-model:ticked="ticked"
        :data="treeData"
      />
    </Modal>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue"

import Operation from "@/components/Operation.vue"
import Action from "@/components/Action.vue"
import Page from "@/components/Page.vue"
import Confirm from "@/components/Confirm.vue"
import Modal from "@/components/Modal.vue"

import TreeItem from "@/components/tree/TreeItem.vue"

import { instance, SERVER_URL } from "@/api"
import type { Role, NodeData } from "@/api/request.type"
import { ArrowPathIcon, KeyIcon } from "@heroicons/vue/24/outline";

// 模态框参数
let isEdit = ref(false)
let isDel = ref(false)
let isTree = ref(false)
// 数据
let roleData = ref<Role>({
  code: '',
  name: '',
  superior: '',
  count: 0,
  description: '',
  enabled: true,
  modifyTime: ''
})
let dataCode = ref("")
let superiors = ref<Array<Role>>([])
let treeDatas = ref<Array<NodeData>>([])
let ticked = ref<Array<string>>([])
let datas = ref<Array<Role>>([])

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
  await instance.get(SERVER_URL.role, { params: { page: page.value, size: size.value } })
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
}
/**
 * confirm 提交
 */
const confirmCommit = async (): Promise<void> => {
  await instance.delete(SERVER_URL.role.concat("/", dataCode.value)).then(() => {
    // 将datas中修改项的历史数据删除
    datas.value = datas.value.filter(
      (item: Role) => item.code != dataCode.value
    );
    isDel.value = false;
  });
};
/**
 * 新增/编辑：打开
 * @param operate 是否打开
 */
const modalOperate = async (operate: boolean) => {
  if (operate) {
    roleData.value = {
      code: '',
      name: '',
      superior: '',
      count: 0,
      description: '',
      enabled: true,
      modifyTime: ''
    };
    await Promise.all([
      fetch(),
      await instance.get(SERVER_URL.role, { params: { page: 0, size: 99 } })
        .then(res => superiors.value = res.data.content),
    ]);
  }
  isEdit.value = operate;
};
/**
 * 查详情
 */
const fetch = async (): Promise<void> => {
  if (dataCode.value && dataCode.value.length > 0) {
    await instance.get(SERVER_URL.role.concat("/", dataCode.value)).then(res => roleData.value = res.data);
  }
};
/**
 * 授权：打开
 * @param operate 是否打开
 */
const treeOperate = async (operate: boolean) => {
  if (operate) {
    await Promise.all([
      instance.get(SERVER_URL.authority.concat("/tree")).then(res => treeDatas.value = res.data),
      instance.get(SERVER_URL.role.concat("/", dataCode.value, "/components")).then(res => ticked.value = res.data)
    ])
  }
  isTree.value = operate;
};
/**
 * 提交
 */
const treeCommit = async () => {
  if (ticked.value && ticked.value.length > 0) {
    alert("commit " + ticked.value)
  }
  isTree.value = false;
};
/**
 * 新增/编辑：提交
 */
const modelCommit = async (): Promise<void> => {
  if (dataCode.value && dataCode.value.length > 0) {
    await instance.put(SERVER_URL.role.concat("/", dataCode.value), roleData.value)
      .then(res => {
        // 将datas中修改项的历史数据删除
        datas.value = datas.value.filter(
          (item: Role) => item.code != dataCode.value
        );
        // 将结果添加到第一个
        datas.value.unshift(res.data);
        isEdit.value = false;
      });
  } else {
    await instance.post(SERVER_URL.role, roleData.value).then(res => {
      if (datas.value.length >= size.value) {
        // 删除第一个
        datas.value.shift();
      }
      // 将结果添加到第一个
      datas.value.unshift(res.data);
      isEdit.value = false;
    });
  }
}
</script>