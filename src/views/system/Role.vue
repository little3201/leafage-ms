<template>
  <div class="col-span-12 mt-2">
    <div class="flex justify-between items-center h-10">
      <h2 class="text-lg font-medium mr-5">Roles</h2>
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
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Pagation />
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
              class="py-2 px-3 rounded-md w-full border mt-2 flex-1 focus:outline-none focus:ring-1"
              placeholder="Name"
              v-model="roleData.name"
            />
          </div>
          <div class="col-span-12 sm:col-span-6">
            <label>Superior</label>
            <select v-model="roleData.superior" class="p-2 rounded-md w-full border mt-2 flex-1 focus:outline-none focus:ring-1">
              <option>System</option>
              <option>Posts</option>
            </select>
          </div>
          <div class="col-span-12">
            <label>Description</label>
            <textarea
              class="py-2 px-3 rounded-md w-full border mt-2 flex-1 focus:outline-none focus:ring-1"
              v-model="roleData.description"
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
  name: "Role",

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
      roleData: {},
    };
  },

  methods: {
    // 删除确认
    confirmOperate(isDel: boolean) {
      this.isDel = isDel;
    },
    // 新增/编辑：打开
    modelOperate(isEdit: boolean, params: string) {
      this.roleData = {};
      if (isEdit && params) {
        instance.get(SERVER_URL.role.concat("/", params)).then((res) => {
          this.roleData = res.data;
        });
      }
      this.isEdit = isEdit;
    },
    // 新增/编辑：提交
    commitOperate(code: string) {
      let data = this.roleData;
      if (code && code.length > 0) {
        instance
          .put(SERVER_URL.role.concat("/", code), data)
          .then(() => {
            this.initDatas();
          });
      } else {
        instance.post(SERVER_URL.role, data).then((res) => {
          this.datas.push(res.data);
        });
      }
      this.isEdit = false;
    },
  },

  setup() {
    const datas = ref<any>([]);

    function initDatas() {
      instance
        .get(SERVER_URL.role.concat("?page=0&size=10"))
        .then((response) => {
          datas.value = response.data;
        });
    }

    onMounted(() => {
      initDatas();
    });

    return {
      datas,
      initDatas
    };
  },
});
</script>