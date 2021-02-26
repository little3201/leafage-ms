<template>
  <div class="col-span-12 mt-2">
    <div class="flex justify-between items-center h-10">
      <h2 class="text-lg font-medium mr-5">Authorities</h2>
      <Operation @modelOperate="modelOperate" />
    </div>
    <div class="overflow-auto">
      <table class="my-2 w-full truncate">
        <thead>
          <tr class="uppercase text-center text-xs sm:text-sm h-12">
            <th class="px-4 py-2 text-left">No.</th>
            <th class="px-4 py-2">Name</th>
            <th class="px-4 py-2">Code</th>
            <th class="px-4 py-2">Role Count</th>
            <th class="px-4 py-2">Superior</th>
            <th class="px-4 py-2">Type</th>
            <th class="px-4 py-2">Path</th>
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
            <td class="px-4 py-2" v-text="data.count"></td>
            <td class="px-4 py-2" v-text="data.superior"></td>
            <td class="px-4 py-2">
              <span
                v-text="data.type"
                class="p-1 bg-blue-300 rounded-md text-xs"
              ></span>
            </td>
            <td class="px-4 py-2" v-text="data.path"></td>
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
      :code="authorityData.code"
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
              v-model="authorityData.name"
            />
          </div>
          <div class="col-span-12 sm:col-span-6">
            <label>Path</label>
            <input
              type="text"
              class="py-2 px-3 rounded-md w-full border mt-2 flex-1 focus:outline-none focus:ring-1"
              placeholder="Path"
              v-model="authorityData.path"
            />
          </div>
          <div class="col-span-12 sm:col-span-6">
            <label>Superior</label>
            <select
              v-model="authorityData.superior"
              class="p-2 rounded-md w-full border mt-2 flex-1 focus:outline-none focus:ring-1"
            >
              <option disabled value="">请选择</option>
              <option
                v-for="(data, index) in datas"
                :key="index"
                :value="data.code"
              >
                {{ data.name }}
              </option>
            </select>
          </div>
          <div class="col-span-12 sm:col-span-6">
            <label>Type</label>
            <select
              v-model="authorityData.type"
              class="p-2 rounded-md w-full border mt-2 flex-1 focus:outline-none focus:ring-1"
            >
              <option disabled value="">请选择</option>
              <option value="Menu">Menu</option>
              <option value="Tab">Tab</option>
              <option value="Url">Url</option>
            </select>
          </div>
          <div class="col-span-12">
            <label>Description</label>
            <textarea
              class="py-2 px-3 rounded-md w-full border mt-2 flex-1 focus:outline-none focus:ring-1"
              v-model="authorityData.description"
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
  name: "Authority",

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
      authorityData: {},
    };
  },

  methods: {
    // 删除确认
    confirmOperate(isDel: boolean) {
      this.isDel = isDel;
    },
    // 新增/编辑：打开
    modelOperate(isEdit: boolean, params: string) {
      this.authorityData = {};
      if (isEdit && params) {
        instance.get(SERVER_URL.authority.concat("/", params)).then((res) => {
          this.authorityData = res.data;
        });
      }
      this.isEdit = isEdit;
    },
    // 新增/编辑：提交
    commitOperate(code: string) {
      let data = this.authorityData;
      if (code && code.length > 0) {
        instance.put(SERVER_URL.authority.concat("/", code), data).then(() => {
          this.initDatas();
        });
      } else {
        instance.post(SERVER_URL.authority, data).then((res) => {
          this.datas.push(res.data);
        });
      }
      this.isEdit = false;
    },
  },

  setup() {
    const datas = ref<any>([]);

    async function initDatas() {
      await instance
        .get(SERVER_URL.authority.concat("?page=0&size=10"))
        .then((response) => {
          datas.value = response.data;
        });
    }

    onMounted(() => {
      initDatas();
    });

    return {
      datas,
      initDatas,
    };
  },
});
</script>