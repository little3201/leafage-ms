<template>
  <div class="col-span-12 mt-2">
    <div class="flex justify-between items-center h-10">
      <h2 class="text-lg font-medium">Roles</h2>
      <button
        @click="retrieve()"
        class="ml-4 inline-flex items-center text-blue-600 focus:outline-none"
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
      <Operation @modelOperate="modelOperate" />
    </div>
    <div class="overflow-scroll mt-2" style="height: calc(100vh - 12rem)">
      <table
        class="w-full overflow-ellipsis whitespace-nowrap"
        aria-label="role"
      >
        <thead>
          <tr
            class="
              sticky
              top-0
              bg-gray-100
              uppercase
              text-center text-xs
              sm:text-sm
              h-12
            "
          >
            <th scope="col" class="px-4 text-left">No.</th>
            <th scope="col" class="px-4">Name</th>
            <th scope="col" class="px-4">Code</th>
            <th scope="col" class="px-4">Superior</th>
            <th scope="col" class="px-4">User Count</th>
            <th scope="col" class="px-4">Modify Time</th>
            <th scope="col" class="px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="text-center bg-white border-t-8 border-b-8 border-gray-100"
            v-for="(data, index) in datas"
            :key="index"
          >
            <td class="px-4 py-2 md:py-3 text-left">
              {{ index + 1 }}
            </td>
            <td class="px-4">
              <span class="font-medium" v-text="data.name"></span>
              <p class="text-gray-600 text-xs" v-text="data.description"></p>
            </td>
            <td class="px-4" v-text="data.code"></td>
            <td class="px-4" v-text="data.superior"></td>
            <td class="px-4" v-text="data.count"></td>
            <td
              class="px-4"
              v-text="new Date(data.modifyTime).toLocaleDateString()"
            ></td>
            <td class="px-4">
              <Action
                :code="data.code"
                @delAction="confirmOperate"
                @editAction="modelOperate"
              >
                <a
                  class="flex items-center mr-3 text-purple-600"
                  href="javascript:;"
                  @click.prevent="treeOperate(true)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-power mr-2"
                  >
                    <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
                    <line x1="12" y1="2" x2="12" y2="12"></line>
                  </svg>
                  Auz
                </a>
              </Action>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Pagation
      @retrieve="retrieve"
      :total="total"
      :page="page"
      @setPage="setPage"
    />
    <Confirm :isShow="isDel" @cancelAction="confirmOperate" />
    <Model
      :isShow="isEdit"
      @cancelAction="modelOperate"
      @commitAction="commitOperate"
    >
      <form class="w-full">
        <div class="grid grid-cols-12 gap-4 row-gap-3">
          <div class="col-span-12 sm:col-span-6">
            <label
              >Name
              <span class="text-red-600 text-base ml-1">*</span>
            </label>
            <input
              type="text"
              class="border border-gray-300 rounded-md w-full mt-1 shadow-sm"
              placeholder="Name"
              v-model="roleData.name"
            />
          </div>
          <div class="col-span-12 sm:col-span-6">
            <label>Superior</label>
            <select
              v-model="roleData.superior"
              class="border border-gray-300 rounded-md w-full mt-1 shadow-sm"
            >
              <option value="undefined">请选择</option>
              <option
                v-for="superior in superiors"
                :key="superior.code"
                :value="superior.code"
                v-text="superior.name"
              ></option>
            </select>
          </div>
          <div class="col-span-12">
            <label>Description</label>
            <textarea
              class="mt-1 w-full rounded-md border-gray-300 shadow-sm"
              v-model="roleData.description"
            />
          </div>
        </div>
      </form>
    </Model>
    <Tree :isShow="isTree" @treeAction="treeOperate" :datas="authorities" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";

import Operation from "/@/components/global/Operation.vue";
import Action from "/@/components/global/Action.vue";
import Pagation from "/@/components/global/Pagation.vue";
import Confirm from "/@/components/global/Confirm.vue";
import Model from "/@/components/global/Model.vue";
import Tree from "/@/components/global/Tree.vue";

import instance from "../../api";
import SERVER_URL from "../../api/request";

// 模态框参数
const isEdit = ref(false);
const isDel = ref(false);
const isTree = ref(false);
// 数据
const roleData = ref({});
const dataCode = ref("");
const superiors = ref([]);
const authorities = ref([]);
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

// 初始化数据
const initDatas = async () => {
  await Promise.all([count(), retrieve()]);
};
// 统计数据
const count = async () => {
  await instance.get(SERVER_URL.role.concat("/count")).then((res) => {
    total.value = res.data;
  });
};
// 查询列表
const retrieve = async () => {
  await instance
    .get(SERVER_URL.role.concat("?page=" + page.value, "&size=" + size.value))
    .then((response) => {
      datas.value = response.data;
    });
};
// 删除确认
const confirmOperate = (operate: boolean) => {
  isDel.value = operate;
};
// 新增/编辑：打开
const modelOperate = async (operate: boolean, code: string) => {
  roleData.value = {};
  if (operate) {
    await Promise.all([fetch(code), retrieveSuperiors()]);
  }
  isEdit.value = operate;
};
// 查详情
const fetch = async (code: string) => {
  if (code && code.length > 0) {
    dataCode.value = code;
    await instance.get(SERVER_URL.role.concat("/", code)).then((res) => {
      roleData.value = res.data;
    });
  }
};
// 查所有角色
const retrieveSuperiors = async () => {
  await instance.get(SERVER_URL.role).then((res) => {
    superiors.value = res.data;
  });
};
// 授权：打开
const treeOperate = async (operate: boolean) => {
  if (operate) {
    await instance.get(SERVER_URL.authority.concat("/tree")).then((res) => {
      authorities.value = res.data;
    });
  }
  isTree.value = operate;
};
// 新增/编辑：提交
const commitOperate = async () => {
  let data = roleData.value;
  if (dataCode.value && dataCode.value.length > 0) {
    await instance
      .put(SERVER_URL.role.concat("/", dataCode.value), data)
      .then((res) => {
        // 将datas中修改项的历史数据删除
        datas.value = datas.value.filter(
          (item: any) => item.code != dataCode.value
        );
        // 将结果添加到第一个
        datas.value.unshift(res.data);
      });
  } else {
    await instance.post(SERVER_URL.role, data).then((res) => {
      if (datas.value.length >= 10) {
        // 删除第一个
        datas.value.shift();
      }
      // 将结果添加到第一个
      datas.value.unshift(res.data);
    });
  }
  isEdit.value = false;
};

onMounted(() => {
  initDatas();
});
</script>