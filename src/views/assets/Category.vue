<template>
  <div class="col-span-12 mt-6">
    <div class="flex justify-between items-center h-10">
      <h2 class="text-lg font-medium mr-5">Category</h2>
      <div class="flex items-center sm:ml-auto mt-3 sm:mt-0">
        <button
          class="hidden p-2 rounded-md bg-white sm:flex items-center text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-file-text mr-2"
          >
            <path
              d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
            ></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
          Export to Excel
        </button>
        <button
          class="hidden ml-3 p-2 rounded-md bg-white sm:flex items-center text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-file-text mr-2"
          >
            <path
              d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
            ></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
          Export to PDF
        </button>
        <button
          @click="modelOperate(true)"
          class="ml-3 p-2 rounded-md bg-blue-700 flex items-center text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-plus-circle mr-2"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="16"></line>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
          Add New
        </button>
      </div>
    </div>
    <div class="overflow-auto mt-8 sm:mt-0">
      <table class="mt-2 w-full truncate">
        <thead>
          <tr class="uppercase text-center h-14">
            <th class="px-4 py-2 md:px-5 md:py-3 text-left">No.</th>
            <th class="px-4 py-2 md:px-5 md:py-3">Alias</th>
            <th class="px-4 py-2 md:px-5 md:py-3">Code</th>
            <th class="px-4 py-2 md:px-5 md:py-3">Posts Count</th>
            <th class="px-4 py-2 md:px-5 md:py-3">Modify Time</th>
            <th class="px-4 py-2 md:px-5 md:py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="text-center bg-white border-8 border-gray-100"
            v-for="(data, index) in datas"
            :key="index"
          >
            <td class="px-4 py-2 md:px-5 md:py-3">
              {{ index + 1 }}
            </td>
            <td class="px-4 py-2 md:px-5 md:py-3">
              <a
                href=""
                class="font-medium whitespace-no-wrap"
                v-text="data.alias"
              ></a>
            </td>
            <td class="px-4 py-2 md:px-5 md:py-3" v-text="data.code"></td>
            <td class="px-4 py-2 md:px-5 md:py-3" v-text="data.count"></td>
            <td
              class="px-4 py-2 md:px-5 md:py-3"
              v-text="new Date(data.modifyTime).toLocaleDateString()"
            ></td>
            <td class="px-4 py-2 md:px-5 md:py-3">
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
    <Model :isEdit="isEdit" @editAction="modelOperate">
      <form class="w-full">
        <div class="grid grid-cols-12 gap-4 row-gap-3">
          <div class="col-span-12 sm:col-span-6">
            <label>Code</label>
            <input
              type="text"
              class="py-2 px-3 rounded-md w-full border mt-2 flex-1"
              placeholder="Code"
              :value="categoryData.code"
            />
          </div>
          <div class="col-span-12 sm:col-span-6">
            <label>Alias</label>
            <input
              type="text"
              class="py-2 px-3 rounded-md w-full border mt-2 flex-1"
              placeholder="Alias"
              :value="categoryData.alias"
            />
          </div>
        </div>
      </form>
    </Model>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import Action from "/@/components/global/Action.vue";
import Pagation from "/@/components/global/Pagation.vue";
import Confirm from "/@/components/global/Confirm.vue";
import Model from "/@/components/global/Model.vue";

import instance from "../../api";
import SERVER_URL from "../../api/request";

export default defineComponent({
  name: "Category",

  components: {
    Action,
    Pagation,
    Confirm,
    Model,
  },

  data() {
    return {
      isEdit: false,
      isDel: false,
      categoryData: {},
    };
  },

  methods: {
    confirmOperate(isDel: boolean) {
      this.isDel = isDel;
    },
    modelOperate(isEdit: boolean, params: string) {
      this.categoryData = {}
      if (isEdit && params) {
        instance
          .get(SERVER_URL.category.concat("/").concat(params))
          .then((res) => {
            this.categoryData = res.data;
          });
      }
      this.isEdit = isEdit
    },
  },

  setup() {
    const datas = ref([]);

    async function initDatas() {
      await instance.get(SERVER_URL.category.concat("?page=0&size=10")).then(
        (response) => {
          datas.value = response.data;
        },
        (error) => {
          alert(error.statusText);
        }
      );
    }

    onMounted(() => {
      initDatas();
    });

    return {
      datas,
    };
  },
});
</script>