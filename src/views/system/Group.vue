<template>
  <div class="col-span-12 mt-2">
    <div class="flex justify-between items-center">
      <h2 class="text-lg font-medium">Groups</h2>
      <button
        @click="retrieve"
        class="ml-4 inline-flex items-center text-blue-600 focus:outline-none active:cursor-wait"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="mr-2"
        >
          <use :xlink:href="'/svg/feather-sprite.svg#' + 'rotate-cw'" />
        </svg>
        Reload Data
      </button>
      <Operation @click.capture="dataCode = null" @modelOperate="modelOperate" />
    </div>
    <div class="overflow-scroll" style="height: calc(100vh - 12rem)">
      <table class="w-full overflow-ellipsis whitespace-nowrap" aria-label="group">
        <thead>
          <tr class="sticky top-0 bg-gray-100 uppercase text-center text-xs sm:text-sm">
            <th scope="col" class="px-4 py-2 sm:py-3 text-left">No.</th>
            <th scope="col" class="px-4">Name</th>
            <th scope="col" class="px-4">Code</th>
            <th scope="col" class="px-4">Superior</th>
            <th scope="col" class="px-4">Principal</th>
            <th scope="col" class="px-4">User Count</th>
            <th scope="col" class="px-4">Modify Time</th>
            <th scope="col" class="px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="text-center bg-white border-t-4 border-b-4 sm:border-t-8 sm:border-b-8 first:border-t-0 last:border-b-0 border-gray-100"
            v-for="(data, index) in datas"
            :key="index"
          >
            <td class="px-4 py-2 sm:py-3 text-left">{{ index + 1 }}</td>
            <td class="px-4">
              <span class="font-medium" v-text="data.name"></span>
              <p class="text-gray-600 text-xs" v-text="data.description"></p>
            </td>
            <td class="px-4" v-text="data.code"></td>
            <td class="px-4" v-text="data.superior"></td>
            <td class="px-4" v-text="data.principal"></td>
            <td class="px-4" v-text="data.count"></td>
            <td class="px-4" v-text="new Date(data.modifyTime).toLocaleDateString()"></td>
            <td class="px-4">
              <Action
                @click.capture="dataCode = data.code"
                @delAction="confirmOperate"
                @editAction="modelOperate"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Pagation @retrieve="retrieve" :total="total" :page="page" :size="size" @setPage="setPage" />
    <Confirm :isShow="isDel" @cancelAction="confirmOperate" @commitAction="confirmCommit" />
    <Model :isShow="isEdit" @cancelAction="modelOperate" @commitAction="modelCommit">
      <form class="w-full">
        <div class="grid grid-cols-12 gap-4 row-gap-3">
          <div class="col-span-12">
            <label>
              Name
              <span class="text-red-600 text-base ml-1">*</span>
            </label>
            <input
              type="text"
              class="border border-gray-300 rounded-md w-full mt-1 shadow-sm"
              placeholder="Name"
              v-model.trim="groupData.name"
              autofocus
            />
          </div>
          <div class="col-span-12 sm:col-span-6">
            <label>Superior</label>
            <select
              v-model.lazy="groupData.superior"
              class="border border-gray-300 rounded-md w-full mt-1 shadow-sm"
            >
              <option value="null">请选择</option>
              <option
                v-for="superior in superiors"
                :key="superior.code"
                :value="superior.code"
                v-text="superior.name"
              ></option>
            </select>
          </div>
          <div class="col-span-12 sm:col-span-6">
            <label>Principal</label>
            <select
              v-model.lazy="groupData.principal"
              class="border border-gray-300 rounded-md w-full mt-1 shadow-sm"
            >
              <option value="null">请选择</option>
              <option
                v-for="(user, index) in users"
                :key="index"
                :value="user.username"
                v-text="user.nickname"
              ></option>
            </select>
          </div>
          <div class="col-span-12">
            <label>Description</label>
            <textarea
              class="mt-1 w-full rounded-md border-gray-300 shadow-sm"
              v-model.trim="groupData.description"
            />
          </div>
        </div>
      </form>
    </Model>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";

import Operation from "/@/components/global/Operation.vue";
import Action from "/@/components/global/Action.vue";
import Pagation from "/@/components/global/Pagation.vue";
import Confirm from "/@/components/global/Confirm.vue";
import Model from "/@/components/global/Model.vue";

import instance from "../../api";
import SERVER_URL from "../../api/request";

// 模态框参数
const isEdit = ref(false);
const isDel = ref(false);
// 数据
const groupData = ref({});
const dataCode = ref("");
const users = ref([]);
const superiors = ref([]);
const datas = ref<any>([]);
// 分页参数
let page = ref(0);
let size = ref(10);
const total = ref(0);

// 设置页码
const setPage = (p: number, s: number) => {
  page.value = p;
  size.value = s;
};

// 查询列表
const retrieve = async () => {
  await Promise.all([
    instance
      .get(SERVER_URL.group, { params: { page: page.value, size: size.value } })
      .then((res) => {
        datas.value = res.data;
      }),
    instance.get(SERVER_URL.group.concat("/count")).then((res) => {
      total.value = res.data;
    }),
  ]);
};
// 删除取消
const confirmOperate = (operate: boolean) => {
  isDel.value = operate;
};
// 删除确认
const confirmCommit = async () => {
  await instance
    .delete(SERVER_URL.group.concat("/", dataCode.value))
    .then(() => {
      // 将datas中修改项的历史数据删除
      datas.value = datas.value.filter(
        (item: any) => item.code != dataCode.value
      );
      isDel.value = false;
    });
};
// 查询关联用户
const retrieveUsers = () => {
  if (dataCode.value && dataCode.value.length > 0) {
    instance
      .get(SERVER_URL.group.concat("/", dataCode.value, "/user"))
      .then((res) => {
        users.value = res.data;
      })
  }
}
// 新增/编辑：打开
const modelOperate = async (operate: boolean) => {
  groupData.value = {};
  if (operate) {
    await Promise.all([
      fetch(),
      instance.get(SERVER_URL.group).then((res) => {
        superiors.value = res.data;
      }),
      retrieveUsers()
    ]);
  }
  isEdit.value = operate;
};
// 查询详情
const fetch = () => {
  if (dataCode.value && dataCode.value.length > 0) {
    instance.get(SERVER_URL.group.concat("/", dataCode.value)).then((res) => {
      groupData.value = res.data;
    });
  }
};
// 新增/编辑：提交
const modelCommit = async () => {
  let data = groupData.value;
  if (dataCode.value && dataCode.value.length > 0) {
    await instance
      .put(SERVER_URL.group.concat("/", dataCode.value), data)
      .then((res) => {
        // 将datas中修改项的历史数据删除
        datas.value = datas.value.filter(
          (item: any) => item.code != dataCode.value
        );
        // 将结果添加到第一个
        datas.value.unshift(res.data);
        isEdit.value = false;
      });
  } else {
    await instance.post(SERVER_URL.group, data).then((res) => {
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

onMounted(() => {
  retrieve();
});
</script>