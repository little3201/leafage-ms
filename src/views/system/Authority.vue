<template>
  <div class="col-span-12 mt-2">
    <div class="flex justify-between items-center h-10">
      <h2 class="text-lg font-medium">Authorities</h2>
      <button
        @click="retrieve()"
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
    <div class="overflow-auto" style="height: calc(100vh - 190px)">
      <table class="my-2 w-full truncate" aria-label="authority">
        <thead>
          <tr class="uppercase text-center text-xs sm:text-sm h-12">
            <th scope="col" class="px-4 py-2 text-left">No.</th>
            <th scope="col" class="px-4 py-2">Name</th>
            <th scope="col" class="px-4 py-2">Code</th>
            <th scope="col" class="px-4 py-2">Role Count</th>
            <th scope="col" class="px-4 py-2">Superior</th>
            <th scope="col" class="px-4 py-2">Type</th>
            <th scope="col" class="px-4 py-2">Icon</th>
            <th scope="col" class="px-4 py-2">Path</th>
            <th scope="col" class="px-4 py-2">Modify Time</th>
            <th scope="col" class="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="text-center bg-white border-t-8 border-b-8 border-gray-100"
            v-for="(data, index) in datas"
            :key="index"
          >
            <td class="px-4 py-2 text-left">
              {{ index + 1 }}
            </td>
            <td class="px-4 py-2">
              <span class="font-medium" v-text="data.name"></span>
              <p class="text-gray-600 text-xs" v-text="data.description"></p>
            </td>
            <td class="px-4 py-2" v-text="data.code"></td>
            <td class="px-4 py-2" v-text="data.count"></td>
            <td class="px-4 py-2" v-text="data.superior"></td>
            <td class="px-4 py-2">
              <span class="text-green-500" v-if="data.type == 'M'">Menu</span>
              <span class="text-blue-500" v-else-if="data.type == 'B'"
                >Button</span
              >
              <span class="text-pink-500" v-else>Api</span>
            </td>
            <td class="px-4 py-2">
              <svg
                v-if="data.icon"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="mx-auto"
              >
                <use
                  :xlink:href="'/src/assets/feather-sprite.svg#' + data.icon"
                />
              </svg>
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
    <Pagation
      @retrieve="retrieve"
      :total="total"
      :page="page"
      :size="size"
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
            <label>Name</label>
            <input
              type="text"
              class="border border-gray-300 rounded-md w-full mt-1 shadow-sm"
              placeholder="Name"
              v-model="authorityData.name"
            />
          </div>
          <div class="col-span-12 sm:col-span-6">
            <label>Type</label>
            <select
              :disabled="authorityData.code"
              v-model="authorityData.type"
              class="border border-gray-300 rounded-md w-full mt-1 shadow-sm"
              :class="{ 'text-gray-300': authorityData.code }"
            >
              <option disabled>请选择</option>
              <option value="M">Menu</option>
              <option value="B">Button</option>
              <option value="R">Router</option>
            </select>
          </div>
          <div class="col-span-12 sm:col-span-6">
            <label :class="{ 'text-gray-300': authorityData.type == 'B' }"
              >Path</label
            >
            <input
              :disabled="authorityData.type == 'B'"
              type="url"
              class="border border-gray-300 rounded-md w-full mt-1 shadow-sm"
              :class="{
                'text-gray-300 placeholder-gray-300': authorityData.type == 'B',
              }"
              placeholder="Path"
              v-model="authorityData.path"
            />
          </div>
          <div class="col-span-12 sm:col-span-6">
            <label>Superior</label>
            <select
              v-model="authorityData.superior"
              class="border border-gray-300 rounded-md w-full mt-1 shadow-sm"
            >
              <option disabled>请选择</option>
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
              v-model="authorityData.description"
              placeholder="Description"
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

import swal from "sweetalert";

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
      dataCode: "",
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
      this.authorityData = {};
      if (isEdit) {
        Promise.all([this.fetch(code), this.retrieveMenu()]);
      }
      this.isEdit = isEdit;
    },
    // 查详情
    fetch(code: string) {
      if (code && code.length > 0) {
        this.dataCode = code
        instance.get(SERVER_URL.authority.concat("/", code)).then((res) => {
          this.authorityData = res.data;
        });
      }
    },
    // 查所有菜单
    retrieveMenu() {
      instance.get(SERVER_URL.authority.concat("?type=menu")).then((res) => {
        this.superiors = res.data;
      });
    },
    // 新增/编辑：提交
    commitOperate(code: string) {
      let data = this.authorityData;
      if (code && code.length > 0) {
        instance
          .put(SERVER_URL.authority.concat("/", code), data)
          .then((res) => {
            // 将datas中修改项的历史数据删除
            this.datas = this.datas.filter((item: any) => item.code != code);
            // 将结果添加到第一个
            this.datas.unshift(res.data);
            swal("Operated Success!", "you updated the item", "success");
          });
      } else {
        instance.post(SERVER_URL.authority, data).then((res) => {
          if (this.datas.length >= 10) {
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
    let page = ref(0);
    let size = ref(10);
    const total = ref(0);

    // 设置页码
    function setPage(p: number, s: number) {
      page.value = p;
      size.value = s;
    }

    // 初始化数据
    async function initDatas() {
      await Promise.all([count(), retrieve()]);
    }
    // 统计数据
    async function count() {
      await instance.get(SERVER_URL.authority.concat("/count")).then((res) => {
        total.value = res.data;
      });
    }
    // 查询列表
    async function retrieve() {
      await instance
        .get(
          SERVER_URL.authority.concat(
            "?page=" + page.value,
            "&size=" + size.value
          )
        )
        .then((res) => {
          datas.value = res.data;
        });
    }

    onMounted(() => {
      initDatas();
    });

    return {
      datas,
      total,
      page,
      size,
      retrieve,
      setPage,
    };
  },
});
</script>