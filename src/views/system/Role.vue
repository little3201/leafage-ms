<template>
  <div class="col-span-12 mt-2">
    <div class="flex justify-between items-center h-10">
      <h2 class="text-lg font-medium">Roles</h2>
      <button
        @click="retrieve(0, 10)"
        class="ml-4 flex items-center text-blue-600 focus:outline-none"
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
          class="feather feather-rotate-cw mr-2"
        >
          <polyline points="23 4 23 10 17 10"></polyline>
          <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
        </svg>
        Reload Data
      </button>
      <Operation @modelOperate="modelOperate" />
    </div>
    <div class="overflow-auto">
      <table class="mt-2 w-full truncate">
        <thead>
          <tr class="uppercase text-center text-xs sm:text-sm h-12">
            <th class="px-4 py-2 text-left">No.</th>
            <th class="px-4 py-2">Name</th>
            <th class="px-4 py-2">Code</th>
            <th class="px-4 py-2">User Count</th>
            <th class="px-4 py-2">Modify Time</th>
            <th class="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="text-center bg-white border-8 border-gray-100"
            v-for="(data, index) in datas"
            :key="index"
          >
            <td class="px-4 py-2 text-left">
              {{ index + 1 }}
            </td>
            <td class="px-4 py-2">
              <a href="" class="font-medium" v-text="data.name"></a>
              <p class="text-gray-600 text-xs" v-text="data.description"></p>
            </td>
            <td class="px-4 py-2" v-text="data.code"></td>
            <td class="px-4 py-2" v-text="data.count"></td>
            <td
              class="px-4 py-2"
              v-text="new Date(data.modifyTime).toLocaleDateString()"
            ></td>
            <td class="px-4 py-2">
              <Action
                :code="data.code"
                @delAction="confirmOperate"
                @editAction="modelOperate"
              >
                <a
                  class="flex items-center mr-3 text-purple-600"
                  href="javascript:;"
                  @click.prevent="isTree = true"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.6"
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
    <Pagation @retrieve="retrieve" :total="total" />
    <Confirm :isDel="isDel" @delAction="confirmOperate" />
    <Model
      :code="roleData.code"
      :isEdit="isEdit"
      @editAction="modelOperate"
      @commitAction="commitOperate"
    >
      <form class="w-full">
        <div class="grid grid-cols-12 gap-4 row-gap-3">
          <div class="col-span-12 sm:col-span-6">
            <label>Name</label>
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
              <option value="" disabled>请选择</option>
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
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              v-model="roleData.description"
            />
          </div>
        </div>
      </form>
    </Model>
    <Tree :isTree="isTree" @treeAction="treeOperate" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";

import Operation from "/@/components/global/Operation.vue";
import Action from "/@/components/global/Action.vue";
import Pagation from "/@/components/global/Pagation.vue";
import Confirm from "/@/components/global/Confirm.vue";
import Model from "/@/components/global/Model.vue";
import Tree from "/@/components/global/Tree.vue";

import instance from "../../api";
import SERVER_URL from "../../api/request";

import swal from "sweetalert";

export default defineComponent({
  name: "Role",

  components: {
    Operation,
    Action,
    Pagation,
    Confirm,
    Model,
    Tree,
  },

  data() {
    return {
      isEdit: false,
      isDel: false,
      isTree: false,
      roleData: {},
      superiors: [],
    };
  },

  methods: {
    // 删除确认
    confirmOperate(isDel: boolean) {
      this.isDel = isDel;
    },
    // 新增/编辑：打开
    modelOperate(isEdit: boolean, code: string) {
      this.roleData = {};
      Promise.all([this.fetch(isEdit, code), this.retrieveSuperiors()]);
      this.isEdit = isEdit;
    },
    // 查详情
    fetch(isEdit: boolean, code: string) {
      if (isEdit && code) {
        instance.get(SERVER_URL.role.concat("/", code)).then((res) => {
          this.roleData = res.data;
        });
      }
    },
    // 查所有角色
    retrieveSuperiors() {
      instance.get(SERVER_URL.role).then((res) => {
        this.superiors = res.data;
      });
    },
    // 授权：打开
    treeOperate(isTree: boolean) {
      this.isTree = isTree;
    },
    // 新增/编辑：提交
    commitOperate(code: string) {
      let data = this.roleData;
      if (code && code.length > 0) {
        instance.put(SERVER_URL.role.concat("/", code), data).then((res) => {
          // 将datas中修改项的历史数据删除
          this.datas = this.datas.filter((item: any) => item.code != code);
          // 将结果添加到第一个
          this.datas.unshift(res.data);
          swal("Operated Success!", "you updated the item", "success");
        });
      } else {
        instance.post(SERVER_URL.role, data).then((res) => {
          if (this.datas.size() >= 10) {
            // 删除第一个
            this.datas.shift();
          }
          // 将结果添加到第一个
          this.datas.unshift(res.data);
          swal("Operated Success!", "you add a new item", "success");
        });
      }
      this.isEdit = false;
    },
  },

  setup() {
    const datas = ref<any>([]);
    const total = ref(0);

    // 初始化数据
    async function initDatas(page: number, size: number) {
      await Promise.all([count(), retrieve(page, size)]);
    }
    // 统计数据
    async function count() {
      await instance.get(SERVER_URL.role.concat("/count")).then((res) => {
        total.value = res.data;
      });
    }
    // 查询列表
    async function retrieve(page: number, size: number) {
      await instance
        .get(SERVER_URL.role.concat("?page=" + page, "&size=" + size))
        .then((response) => {
          datas.value = response.data;
        });
    }

    onMounted(() => {
      initDatas(0, 10);
    });

    return {
      datas,
      total,
      retrieve,
    };
  },
});
</script>