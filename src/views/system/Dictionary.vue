<template>
  <div class="mt-2">
    <div class="flex justify-between items-center">
      <h2 class="text-lg font-medium">
        {{ $t('dictionary') }}
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
        :file-name="'dictionary'"
        @click.capture="dataCode = ''"
        @modal-operate="modalOperate"
      />
    </div>

    <div class="sm-t-h overflow-auto">
      <table
        class="w-full overflow-ellipsis whitespace-nowrap"
        aria-label="dictionary"
      >
        <thead>
          <tr class="sticky top-0 bg-gray-100 uppercase text-center text-xs sm:text-sm h-12">
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
              {{ $t('alias') }}
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
              {{ $t('description') }}
            </th>
            <th
              scope="col"
              class="px-4"
            >
              {{ $t('status') }}
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
            class="text-center bg-white border-y-4 lg:border-y-8 first:border-t-0 last:border-b-0 border-gray-100 hover:bg-gray-50 hover:text-blue-600"
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
              v-text="data.alias"
            />
            <td
              class="px-4"
              v-text="data.id"
            />
            <td
              class="px-4"
              v-text="data.description"
            />
            <td
              class="px-4"
            >
              <Toogle
                :checked="data.enabled"
              />
            </td>
            <td
              class="px-4"
              v-text="new Date(data.modifyTime).toLocaleDateString()"
            />
            <td>
              <Action
                :need-del="false"
                @click.capture="dataCode = data.id"
                @edit-action="modalOperate"
              />
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
              v-model.trim="dictData.name"
              name="name"
              type="text"
              class="mt-1 w-full block rounded-md border-gray-300"
              placeholder="Name"
              required
              autofocus
              aria-label="name"
            >
          </div>
          <div class="col-span-12 sm:col-span-6">
            <label for="alias">{{ $t('alias') }}</label>
            <input
              id="alias"
              v-model.trim="dictData.alias"
              name="alias"
              type="text"
              class="mt-1 w-full block rounded-md border-gray-300"
              placeholder="Alias"
              aria-label="alias"
            >
          </div>
          <div class="col-span-12 sm:col-span-6">
            <label for="superior">{{ $t('superior') }}</label>
            <select
              id="superior"
              v-model="dictData.superior"
              name="superior"
              class="mt-1 w-full block rounded-md border-gray-300"
              aria-label="dictionary superior"
            >
              <option selected>
                ---{{ $t('select') }}---
              </option>
              <option
                v-for="superior in superiors"
                :key="superior.id"
                :value="superior.alias"
              >
                {{ superior.name }}
              </option>
            </select>
          </div>
          <div class="col-span-12">
            <label for="description">{{ $t('description') }}</label>
            <textarea
              id="description"
              v-model.trim="dictData.description"
              name="description"
              class="mt-1 w-full block rounded-md border-gray-300"
            />
          </div>
        </div>
      </form>
    </Modal>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";

import Operation from "~/components/Operation.vue";
import Action from "~/components/Action.vue";
import Pagation from "~/components/Pagation.vue.js";
import Modal from "~/components/Modal.vue";
import Toogle from '~/components/Toogle.vue'

import { instance, SERVER_URL } from "~/api";
import type { Dictionary } from "~/api/request.type";
import { ArrowPathIcon } from "@heroicons/vue/24/outline";

// 模态框参数
let isEdit = ref(false);
// 数据
let dictData = ref<Dictionary>({
  id: 0,
  name: '',
  superior: '',
  alias: '',
  enabled: true,
  description: '',
  modifyTime: ''
})
let dataCode = ref("")
let datas = ref<Array<Dictionary>>([])
let superiors = ref<Array<Dictionary>>([])
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
 * @param s 大小
 */
const setPage = (p: number, s: number): void => {
  page.value = p;
  size.value = s;
};
/**
 * 查询列表
 */
const retrieve = async (): Promise<void> => {
  await instance.get(SERVER_URL.dictionary, { params: { page: page.value, size: size.value } })
    .then(res => {
      datas.value = res.data.content
      total.value = res.data.totalElements
    })
}
/**
 * 查询列表
 */
const retrieveSuperior = async (): Promise<void> => {
  await instance.get(SERVER_URL.dictionary.concat('/superior')).then(res => superiors.value = res.data)
};
/**
 * 新增/编辑：打开
 * @param operate 是否打开
 */
const modalOperate = async (operate: boolean): Promise<void> => {
  if (operate) {
    dictData.value = {
      id: 0,
      name: '',
      superior: '',
      alias: '',
      enabled: true,
      description: '',
      modifyTime: ''
    };
    await Promise.all([
      fetch(),
      retrieveSuperior()
    ]);
  }
  isEdit.value = operate;
};
/**
 * 查询详情
 */
const fetch = async (): Promise<void> => {
  if (dataCode.value && dataCode.value.length > 0) {
    await instance.get(SERVER_URL.dictionary.concat("/", dataCode.value)).then(res => dictData.value = res.data);
  }
};
/**
 * 新增/编辑：提交
 */
const modelCommit = async (): Promise<void> => {
  if (dataCode.value && dataCode.value.length > 0) {
    await instance.put(SERVER_URL.dictionary.concat("/", dataCode.value), dictData.value)
      .then(res => {
        // 将datas中修改项的历史数据删除
        datas.value = datas.value.filter(
          (item: Dictionary) => item.id != dataCode.value
        );
        // 将结果添加到第一个
        datas.value.unshift(res.data);
        isEdit.value = false;
      });
  } else {
    await instance.post(SERVER_URL.dictionary, dictData.value).then(res => {
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
 * 启用/禁用
 * @param id 主键
 */
const power = (id: string) => {
  alert("enable: " + id + " develogping...")
}
</script>