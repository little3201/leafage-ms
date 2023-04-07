<template>
  <div class="mt-2">
    <div class="flex justify-between items-center">
      <h2 class="text-lg font-medium">
        {{ $t('regions') }}
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
        :file-name="'region'"
        @modal-operate="modalOperate"
      />
    </div>
    <div class="sm-t-h overflow-auto">
      <table
        class="w-full overflow-ellipsis whitespace-nowrap"
        aria-label="region"
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
              {{ $t('areaCode') }}
            </th>
            <th
              scope="col"
              class="px-4"
            >
              {{ $t('postalCode') }}
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
              v-text="data.regionName"
            />
            <td
              class="px-4"
              v-text="data.areaCode ? data.areaCode : '-'"
            />
            <td
              class="px-4"
              v-text="data.postalCode ? data.postalCode.toString().padStart(6, '0') : '-'"
            />
            <td
              class="px-4"
              v-text="data.superior"
            />
            <td
              class="px-4"
              v-text="new Date(data.modifyTime).toLocaleDateString()"
            />
            <td>
              <Action
                @click.capture="formData = data"
                @del-action="confirmOperate"
                @edit-action="modalOperate"
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
    <Confirm
      :is-show="model.isDel"
      @cancel-action="confirmOperate"
      @commit-action="confirmCommit"
    />
    <Modal
      :is-show="model.isEdit"
      @cancel-action="modalOperate"
      @commit-action="modelCommit"
    >
      <form @submit.prevent>
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-12 sm:col-span-6">
            <label for="name">{{ $t('name') }}</label>
            <input
              id="name"
              v-model.trim="formData.regionName"
              name="name"
              type="text"
              class="mt-1 w-full block rounded-md border-gray-300"
              :placeholder="$t('name')"
              required
              autofocus
              aria-label="name"
            >
          </div>
          <div class="col-span-12 sm:col-span-6">
            <label for="superior">{{ $t('superior') }}</label>
            <select
              id="superior"
              v-model="formData.superior"
              name="superior"
              class="mt-1 w-full block rounded-md border-gray-300"
              aria-label="region superior"
            >
              <option selected>
                ---{{ $t('select') }}---
              </option>
              <option
                v-for="superior in superiors"
                :key="superior.id"
                :value="superior.id"
              >
                {{ superior.regionName }}
              </option>
            </select>
          </div>
          <div class="col-span-12 sm:col-span-6">
            <label for="postal-id">{{ $t('postalCode') }}</label>
            <input
              id="postal-id"
              v-model.trim="formData.postalCode"
              name="postal-id"
              type="number"
              class="mt-1 w-full block rounded-md border-gray-300"
              :placeholder="$t('postalCode')"
              aria-label="postal-id"
            >
          </div>
          <div class="col-span-12 sm:col-span-6">
            <label for="area-id">{{ $t('areaCode') }}</label>
            <input
              id="area-id"
              v-model.trim="formData.areaCode"
              name="area-id"
              type="number"
              class="mt-1 w-full block rounded-md border-gray-300"
              :placeholder="$t('areaCode')"
              aria-label="area-id"
            >
          </div>
        </div>
      </form>
    </Modal>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive, watch } from "vue";

import Operation from "~/components/Operation.vue";
import Action from "~/components/Action.vue";
import Pagation from "~/components/Pagation.vue.js";
import Confirm from "~/components/Confirm.vue";
import Modal from "~/components/Modal.vue";

import { instance, SERVER_URL } from "~/api";
import type { Region } from "~/api/request.type";
import { ArrowPathIcon } from "@heroicons/vue/24/outline";

// 模态框参数
let model = reactive({
  isEdit: false,
  isDel: false
})

// 分页参数
let pagation = reactive({
  page: 0,
  size: 0,
  total: 0
})

// form 数据
let formData: Region = reactive({
  id: 0,
  regionName: '',
  superior: '',
  postalCode: 0,
  areaCode: 0,
  modifyTime: ''
});

let datas = ref<Array<Region>>([]);
let superiors = ref<Array<Region>>([]);

watch(() => formData.id, (newValue: number, oldValue: number) => {
  if (newValue != oldValue) {
    setTimeout(() => retrieveSuperior(newValue), 300)
  }
})

onMounted(() => {
  retrieve();
});
/**
 * 设置页码
 * @param p 页码
 * @param s 大小
 */
const setPage = (p: number, s: number): void => {
  pagation.page = p;
  pagation.size = s;
};
/**
 * 查询列表
 */
const retrieve = async (): Promise<void> => {
  await instance.get(SERVER_URL.region, { params: { page: pagation.page, size: pagation.size } })
    .then(res => {
      datas.value = res.data.content
      pagation.total = res.data.totalElements
    })
};
/**
 * confirm 操作
 * @param operate 是否打开
 */
const confirmOperate = (operate: boolean): void => {
  model.isDel = operate;
};
/**
 * confirm 提交
 */
const confirmCommit = async (): Promise<void> => {
  await instance.delete(SERVER_URL.region.concat(`/${formData.id}`)).then(() => {
    // 将datas中修改项的历史数据删除
    datas.value = datas.value.filter(
      (item: Region) => item.id != formData.id
    );
    model.isDel = false;
  });
};
/**
 * 新增/编辑：打开
 * @param operate 是否打开
 */
const modalOperate = async (operate: boolean): Promise<void> => {
  if (operate) {
    if (formData && formData.id && formData.id != 0) {
      await Promise.all([
        fetch(),
        retrieveSuperior(formData.id)
      ])
    } else {
      formData = {
        id: 0,
        regionName: '',
        superior: '',
        postalCode: 0,
        areaCode: 0,
        modifyTime: ''
      };
    }

  }
  model.isEdit = operate;
};
/**
 * 查询上级信息
 * @param id 主键
 */
const retrieveSuperior = async (id: number) => {
  let superior = 0
  if (id > 1000) {
    superior = Math.floor(id / 100)
    if (id > 110000000) {
      superior = Math.floor(id / 1000)
    }
    await instance.get(SERVER_URL.region.concat("/", superior + "/lower")).then(res => superiors.value = res.data)
  }
}
/**
 * 获取信息
 */
const fetch = async () => {
  if (formData.id) {
    await instance.get(SERVER_URL.region.concat(`/${formData.id}`)).then(res => formData = res.data);
  }
}
/**
 * 新增/编辑：提交
 */
const modelCommit = async (): Promise<void> => {
  if (formData.id && formData.id != 0) {
    await instance.put(SERVER_URL.region.concat(`/${formData.id}`), formData)
      .then(res => {
        // 将datas中修改项的历史数据删除
        datas.value = datas.value.filter(
          (item: Region) => item.id != formData.id
        );
        // 将结果添加到第一个
        datas.value.unshift(res.data);
      });
  } else {
    await instance.post(SERVER_URL.region, formData).then(res => {
      if (datas.value.length >= pagation.size) {
        // 删除第一个
        datas.value.shift();
      }
      // 将结果添加到第一个
      datas.value.unshift(res.data);
    });
  }
  model.isEdit = false
};

</script>