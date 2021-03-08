<template>
  <div class="col-span-12 mt-2">
    <div class="flex justify-between items-center h-10">
      <h2 class="text-lg font-medium">Groups</h2>
      <button
        @click="retrieve(0, 10)"
        class="ml-4 flex items-center text-blue-800 focus:outline-none"
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
            <th class="px-4 py-2">Superior</th>
            <th class="px-4 py-2">Principal</th>
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
              <a
                href=""
                class="font-medium whitespace-no-wrap"
                v-text="data.name"
              ></a>
              <p
                class="text-gray-600 text-xs whitespace-no-wrap"
                v-text="data.description"
              ></p>
            </td>
            <td class="px-4 py-2" v-text="data.code"></td>
            <td class="px-4 py-2" v-text="data.superior"></td>
            <td class="px-4 py-2" v-text="data.principal"></td>
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
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Pagation @retrieve="retrieve" :total="total" />
    <Confirm :isDel="isDel" @delAction="confirmOperate" />
    <Model
      :code="groupData.code"
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
              class="py-2 px-3 rounded-md w-full border mt-2 flex-1 focus:outline-none focus:ring-1"
              placeholder="Name"
              v-model="groupData.name"
            />
          </div>
          <div class="col-span-12 sm:col-span-6">
            <label>Superior</label>
            <select
              v-model="groupData.superior"
              class="p-2 rounded-md w-full border mt-2 flex-1 focus:outline-none focus:ring-1"
            >
              <option disabled value="">请选择</option>
              <option
                v-for="(superior, index) in datas"
                :key="index"
                v-text="superior.name"
              ></option>
            </select>
          </div>
          <div class="col-span-12 sm:col-span-6">
            <label>Principal</label>
            <select
              v-model="groupData.principal"
              class="p-2 rounded-md w-full border mt-2 flex-1 focus:outline-none focus:ring-1"
            >
              <option disabled value="">请选择</option>
            </select>
          </div>
          <div class="col-span-12">
            <label>Description</label>
            <textarea
              class="py-2 px-3 rounded-md w-full border mt-2 flex-1 focus:outline-none focus:ring-1"
              v-model="groupData.description"
            />
          </div>
        </div>
      </form>
    </Model>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";

import Operation from "/@/components/global/Operation.vue";
import Action from "/@/components/global/Action.vue";
import Pagation from "/@/components/global/Pagation.vue";
import Confirm from "/@/components/global/Confirm.vue";
import Model from "/@/components/global/Model.vue";

import instance from "../../api";
import SERVER_URL from "../../api/request";

export default defineComponent({
  name: "Group",

  components: {
    Operation,
    Action,
    Pagation,
    Confirm,
    Model,
  },

  data() {
    return {
      isEdit: false,
      isDel: false,
      groupData: {},
    };
  },

  methods: {
    // 删除确认
    confirmOperate(isDel: boolean) {
      this.isDel = isDel;
    },
    // 新增/编辑：打开
    modelOperate(isEdit: boolean, params: string) {
      this.groupData = {};
      if (isEdit && params) {
        instance.get(SERVER_URL.group.concat("/", params)).then((res) => {
          this.groupData = res.data;
        });
      }
      this.isEdit = isEdit;
    },
    // 新增/编辑：提交
    commitOperate(code: string) {
      let data = this.groupData;
      if (code && code.length > 0) {
        instance.put(SERVER_URL.group.concat("/", code), data).then(() => {
          this.retrieve(0, 10);
        });
      } else {
        instance.post(SERVER_URL.group, data).then((res) => {
          this.datas.push(res.data);
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
      await instance.get(SERVER_URL.group.concat("/count")).then((res) => {
        total.value = res.data;
      });
    }
    // 查询列表
    async function retrieve(page: number, size: number) {
      await instance
        .get(SERVER_URL.group.concat("?page=" + page, "&size=" + size))
        .then((res) => {
          datas.value = res.data;
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