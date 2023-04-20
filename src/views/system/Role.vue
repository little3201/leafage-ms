<template>
  <div class="mt-2">
    <Operation
      :datas="datas"
      :file-name="'role'"
      :items="items"
      @hand-reload="retrieve"
      @hand-add="showModal"
    />
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
              {{ $t('enabled') }}
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
              v-text="data.roleName"
            />
            <td
              class="px-4"
              v-text="data.count"
            />
            <td
              class="px-4"
              v-text="new Date(data.modifyTime).toLocaleDateString()"
            />
            <td class="px-4">
              <Toogle
                :checked="data.enabled"
                @click="enable"
              />
            </td>
            <td>
              <Action
                @del-action="confirmOperate"
                @edit-action="showModal(data.id)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Pagation
      :total="pagation.total"
      :page="pagation.page"
      @retrieve="retrieve"
      @set-page="setPage"
    />
    <Confirm
      :visible="operation.confirm"
    >
      <template #footer>
        <button
          type="submit"
          name="confirm"
          aria-label="confirm"
          class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 font-medium text-white focus:outline-none focus:ring-1 focus:ring-offset-2 sm:ml-3 sm:w-auto active:cursor-wait bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
          @click="confirmCommit(formData.id)"
        >
          {{ $t('confirm') }}
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
    </Confirm>
    <Drawer
      :visible="operation.modal"
      :title="'编辑角色'"
      @close-action="onClose"
    >
      <template #content>
        <div class="w-full">
          <label for="name">{{ $t('name') }}</label>
          <input
            id="name"
            v-model.trim="formData.roleName"
            name="name"
            type="text"
            aria-label="name"
            class="mt-1 w-full block rounded-md border-gray-300"
            :placeholder="$t('name')"
          >
        </div>
      </template>
      <template #footer>
        <button
          type="submit"
          name="commit"
          aria-label="commit"
          class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 font-medium text-white focus:outline-none focus:ring-1 focus:ring-offset-2 sm:ml-3 sm:w-auto active:cursor-wait bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
          @click="modelCommit(formData.id)"
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
import { onMounted, ref, reactive } from "vue"

import Operation from "~/components/Operation.vue"
import Action from "~/components/Action.vue"
import Pagation from "~/components/Pagation.vue"
import Confirm from "~/components/Confirm.vue"
import Drawer from "~/components/Drawer.vue";
import Toogle from '~/components/Toogle.vue';

import { instance, SERVER_URL } from "~/api"
import type { Role, Item } from "~/api/request.type"

// 模态框参数
let operation = reactive({
  modal: false,
  confirm: false
})

// 分页参数
let pagation = reactive({
  page: 0,
  size: 10,
  total: 0
})

const initData: Role = {
  id: 0,
  roleName: '',
  count: 0,
  enabled: true,
  modifyTime: ''
}
// 数据
let formData = ref<Role>(initData)

const items: Item[] = [
  {
    key: 'roleName',
    label: '名称'
  }
]

let datas = ref<Array<Role>>([])

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
  await instance.get(SERVER_URL.role, { params: { page: pagation.page, size: pagation.size } })
    .then(res => {
      datas.value = res.data.content
      pagation.total = res.data.totalElements
    })
}
/**
 * confirm 操作
 * @param operate 是否打开
 */
const confirmOperate = () => {
  operation.confirm = true;
}
/**
 * confirm 提交
 */
const confirmCommit = async (id: number) => {
  await instance.delete(SERVER_URL.role.concat(`/${id}`)).then(() => {
    // 将datas中修改项的历史数据删除
    datas.value = datas.value.filter(
      (item: Role) => item.id != id
    );
    operation.confirm = false;
  });
};
/**
 * 新增/编辑：打开
 * @param operate 是否打开
 */
const showModal = (id: number) => {
  if (id && id != 0) {
    fetch(id)
  } else {
    formData.value = initData;
  }
  operation.modal = true;
};
/**
 * 查详情
 */
const fetch = async (id: number) => {
  if (id && id != 0) {
    await instance.get(SERVER_URL.role.concat(`/${id}`)).then(res => formData.value = { ...res.data });
  }
};
/**
 * 添加
 */
const create = async () => {
  await instance.post(SERVER_URL.role, formData.value).then(res => {
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
  await instance.put(SERVER_URL.role.concat(`/${id}`), formData.value)
      .then(res => {
        // 将datas中修改项的历史数据删除
        datas.value = datas.value.filter(
          (item: Role) => item.id != id
        );
        // 将结果添加到第一个
        datas.value.unshift(res.data);
      });
}
/**
 * 新增/编辑：提交
 */
const modelCommit = async (id: number) => {
  if (id && id != 0) {
    modify(id)
  } else {
    create()
  }
  operation.modal = false
}

const onClose = () => {
  operation.modal = false
}
/**
 * 启用/禁用
 * @param id 主键
 */
 const enable = (id: number) => {
  datas.value.forEach(item => {
    if(id == item.id){
      item.enabled = true
    }
  })
}
</script>