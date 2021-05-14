<template>
  <div class="col-span-12 mt-2">
    <div class="flex justify-between items-center h-10">
      <h2 class="text-lg font-medium">Portfolio</h2>
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
      <table class="mt-2 w-full truncate" aria-label="portfolio">
        <thead>
          <tr class="uppercase text-center text-xs sm:text-sm h-12">
            <th scope="col" class="px-4 py-2 md:px-5 md:py-3 text-left">No.</th>
            <th scope="col" class="px-4 py-2 md:px-5 md:py-3">Title</th>
            <th scope="col" class="px-4 py-2 md:px-5 md:py-3">Code</th>
            <th scope="col" class="px-4 py-2 md:px-5 md:py-3">Type</th>
            <th scope="col" class="px-4 py-2 md:px-5 md:py-3">Viewed</th>
            <th scope="col" class="px-4 py-2 md:px-5 md:py-3">Likes</th>
            <th scope="col" class="px-4 py-2 md:px-5 md:py-3">Modify Time</th>
            <th scope="col" class="px-4 py-2 md:px-5 md:py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="text-center bg-white border-t-8 border-b-8 border-gray-100"
            v-for="(data, index) in datas"
            :key="index"
          >
            <td class="px-4 py-2 md:px-5 md:py-3 text-left">
              {{ index + 1 }}
            </td>
            <td class="px-4 py-2 md:px-5 md:py-3">
              <a
                rel="noopener"
                href="https://www.leafage.top/portfolio"
                target="_blank"
                class="font-medium text-blue-600"
                v-text="data.title"
              ></a>
            </td>
            <td class="px-4 py-2 md:px-5 md:py-3" v-text="data.code"></td>
            <td class="px-4 py-2 md:px-5 md:py-3">
              <span
                v-text="data.type"
                :class="[
                  { 'text-blue-500': imgTypes.includes(data.type) },
                  { 'text-pink-500': videoTypes.includes(data.type) },
                ]"
              ></span>
            </td>
            <td class="px-4 py-2 md:px-5 md:py-3" v-text="data.viewed"></td>
            <td class="px-4 py-2 md:px-5 md:py-3" v-text="data.likes"></td>
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
    <Pagation
      @retrieve="retrieve"
      :total="total"
      :page="page"
      :size="size"
      @setPage="setPage"
    />
    <Confirm :isDel="isDel" @delAction="confirmOperate" />
    <Model
      :code="portfolioData.code"
      :isEdit="isEdit"
      @editAction="modelOperate"
      @commitAction="commitOperate"
    >
      <form class="w-full">
        <div class="grid grid-cols-12 gap-4 row-gap-3 w-full">
          <div class="col-span-12 sm:col-span-6">
            <label>Title</label>
            <input
              type="text"
              class="mt-1 w-full rounded-md border-gray-300 shadow-sm"
              placeholder="Title"
              v-model="portfolioData.title"
            />
          </div>
          <div class="col-span-12 sm:col-span-6">
            <label>Tags</label>
            <select
              multiple
              class="mt-1 w-full rounded-md border-gray-300 shadow-sm h-10"
              placeholder="Tags"
              v-model="portfolioData.tags"
            >
              <option disabled>请选择</option>
            </select>
          </div>
          <div class="col-span-12">
            <label>Content</label>
            <img
              v-if="portfolioData.url"
              :src="portfolioData.url"
              alt="portfolio content"
              class="rounded-md object-cover h-32 mt-1"
            />
            <div
              v-else
              class="rounded-md border border-gray-300 shadow-sm h-32 mt-1 flex items-center"
            >
              <div class="mx-auto text-center">
                <div class="text-center text-gray-600">
                  <label
                    for="file-upload"
                    class="relative cursor-pointer bg-white rounded-md text-gray-400 hover:text-indigo-500"
                  >
                    <svg
                      class="mx-auto h-8 w-8"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <input
                      id="file-upload"
                      name="cover"
                      multiple
                      type="file"
                      class="sr-only"
                      accept="image/png,image/jpeg,image/jpg,vedio/mp4"
                      @change="uploadImage($event.target.files)"
                    />
                  </label>
                </div>
                <p class="text-xs text-gray-500">png, jpeg, jpg, mp4</p>
              </div>
            </div>
          </div>
          <div class="col-span-12">
            <label>Description</label>
            <textarea
              class="mt-1 w-full rounded-md border-gray-300 shadow-sm"
              v-model="portfolioData.description"
              placeholder="Description"
            />
          </div>
        </div>
      </form>
    </Model>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";

import Operation from "/@/components/global/Operation.vue";
import Action from "/@/components/global/Action.vue";
import Pagation from "/@/components/global/Pagation.vue";
import Confirm from "/@/components/global/Confirm.vue";
import Model from "/@/components/global/Model.vue";

import instance from "../../api";
import SERVER_URL from "../../api/request";
import { uploadFile } from "../../plugins/upload";

import swal from "sweetalert";

export default defineComponent({
  name: "Portfolio",

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
      portfolioData: {},
      imgTypes: ["jpg", "jpeg", "png"],
      videoTypes: ["mp4", "avi"],
    };
  },

  methods: {
    // 删除确认
    confirmOperate(isDel: boolean) {
      this.isDel = isDel;
    },
    // 新增/编辑：打开
    modelOperate(isEdit: boolean, code: string) {
      this.portfolioData = {};
      if (isEdit && code) {
        instance.get(SERVER_URL.portfolio.concat("/", code)).then((res) => {
          this.portfolioData = res.data;
        });
      }
      this.isEdit = isEdit;
    },
    // 新增/编辑：提交
    commitOperate(code: string) {
      let data = this.portfolioData;
      if (code && code.length > 0) {
        instance
          .put(SERVER_URL.portfolio.concat("/", code), data)
          .then((res) => {
            // 将datas中修改项的历史数据删除
            this.datas = this.datas.filter((item: any) => item.code != code);
            // 将结果添加到第一个
            this.datas.unshift(res.data);
            swal("Operated Success!", "you updated the item", "success");
          });
      } else {
        instance.post(SERVER_URL.portfolio, data).then((res) => {
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

    // 上传文件
    uploadImage(files: Array<File>) {
      if (files.length > 0) {
        let urls = new Array(files.length);
        Array.from(Array(files.length).keys()).forEach((id) =>
          uploadFile(files[id]).subscribe({
            // next: (result) => {},
            // error: () => {},
            complete: (e: any) => {
              urls.push("https://cdn.leafage.top/" + e.key);
            },
          })
        );
        this.portfolioData = { ...this.portfolioData, url: urls };
      }
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
      await instance.get(SERVER_URL.portfolio.concat("/count")).then((res) => {
        total.value = res.data;
      });
    }
    // 查询列表
    async function retrieve() {
      await instance
        .get(
          SERVER_URL.portfolio.concat(
            "?page=" + page.value,
            "&size=" + size.value
          )
        )
        .then((response) => {
          datas.value = response.data;
        });
    }

    onMounted(() => {
      initDatas();
    });

    return {
      datas,
      page,
      size,
      total,
      retrieve,
      setPage,
    };
  },
});
</script>