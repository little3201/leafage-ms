<template>
  <div class="col-span-12 mt-2">
    <div class="flex justify-between items-center h-10">
      <h2 class="text-lg font-medium">Portfolio</h2>
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
      <Operation @click.capture="dataCode = null" @modelOperate="modelOperate" />
    </div>
    <div class="overflow-scroll mt-2" style="height: calc(100vh - 12rem)">
      <table class="w-full overflow-ellipsis whitespace-nowrap" aria-label="portfolio">
        <thead>
          <tr class="sticky top-0 bg-gray-100 uppercase text-center text-xs sm:text-sm h-12">
            <th scope="col" class="px-4 text-left">No.</th>
            <th scope="col" class="px-4">Title</th>
            <th scope="col" class="px-4">Code</th>
            <th scope="col" class="px-4">Type</th>
            <th scope="col" class="px-4">Viewed</th>
            <th scope="col" class="px-4">Likes</th>
            <th scope="col" class="px-4">Comment</th>
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
            <td class="px-4 py-2 md:py-3 text-left">{{ index + 1 }}</td>
            <td class="px-4">
              <a
                rel="noopener"
                href="https://www.leafage.top/resource"
                target="_blank"
                class="font-medium text-blue-600"
                v-text="data.title"
              ></a>
            </td>
            <td class="px-4" v-text="data.code"></td>
            <td class="px-4">
              <span
                v-text="data.type"
                :class="[
                  { 'text-blue-500': imgTypes.includes(data.type) },
                  { 'text-pink-500': videoTypes.includes(data.type) },
                ]"
              ></span>
            </td>
            <td class="px-4" v-text="data.viewed"></td>
            <td class="px-4" v-text="data.likes"></td>
            <td class="px-4" v-text="data.comment"></td>
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
    <Model :isShow="isEdit" @cancelAction="modelOperate" @commitAction="commitOperate">
      <form class="w-full">
        <div class="grid grid-cols-12 grid-rows-4 gap-4">
          <div class="col-span-12 sm:col-span-7">
            <label class="inline-flex items-center">
              Title
              <span class="text-red-600 ml-1">*</span>
            </label>
            <input
              type="text"
              class="mt-1 w-full rounded-md border-gray-300 shadow-sm"
              placeholder="Title"
              required
              autofocus
              v-model.trim="resourceData.title"
            />
          </div>
          <div class="col-span-5 row-span-4 mb-6">
            <label>Cover</label>
            <img
              v-if="resourceData.url"
              :src="resourceData.url"
              alt="portfolio content"
              class="rounded-md object-cover h-full mt-1 border"
            />
            <div
              v-else
              class="rounded-md border border-gray-300 shadow-sm mt-1 h-full flex items-center"
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
                      name="resourceData.cover"
                      multiple
                      type="file"
                      class="sr-only"
                      accept="image/png, image/jpeg, image/jpg, vedio/mp4"
                      @change="uploadImage($event.target.files)"
                    />
                  </label>
                </div>
                <p class="text-xs text-gray-500">png, jpeg, jpg, mp4</p>
              </div>
            </div>
          </div>
          <div class="col-span-12 sm:col-span-7">
            <label class="inline-flex items-center">
              Type
              <span class="text-red-600 ml-1">*</span>
            </label>
            <select
              v-model="resourceData.type"
              class="mt-1 w-full rounded-md border-gray-300 shadow-sm"
            >
              <option value="undefined">请选择</option>
              <option value="ebook">EBook</option>
            </select>
          </div>
          <div class="col-span-7 row-span-2 mb-6">
            <label>Description</label>
            <textarea
              class="mt-1 w-full h-full rounded-md border-gray-300 shadow-sm"
              v-model.trim="resourceData.description"
              placeholder="Description"
            />
          </div>
        </div>
      </form>
    </Model>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";

import Operation from "/@/components/global/Operation.vue";
import Action from "/@/components/global/Action.vue";
import Pagation from "/@/components/global/Pagation.vue";
import Confirm from "/@/components/global/Confirm.vue";
import Model from "/@/components/global/Model.vue";

import instance from "../../api";
import SERVER_URL from "../../api/request";
import { uploadFile } from "../../plugins/upload";

const imgTypes = ref(["png", "jpeg", "jpg", "svg", "webp"]);
const videoTypes = ref([
  "mov",
  "avi",
  "flv",
  "m4v",
  "rm",
  "rmvb",
  "wmv",
  "mp4",
]);
// 数据
const resourceData = ref({});
const dataCode = ref("");
const datas = ref<any>([]);
// 分页参数
let page = ref(0);
let size = ref(10);
const total = ref(0);
// 标签参数
const tagValue = ref("");
const tags = ref<Array<String>>([]);
// 模态框参数
let isEdit = ref(false);
let isDel = ref(false);

// 设置页码
const setPage = (p: number, s: number) => {
  page.value = p;
  size.value = s;
};
// 添加tag
const addTag = () => {
  tags.value.push(tagValue.value);
  resourceData.value = { ...resourceData.value, tags: tags.value };
  tagValue.value = "";
};
// 删除tag
const removeTag = (tag: String) => {
  tags.value = tags.value.filter((item) => item !== tag);
  resourceData.value = { ...resourceData.value, tags: tags.value };
};
// 查询列表
const retrieve = async () => {
  await Promise.all([
    instance
      .get(SERVER_URL.resource, {
        params: { page: page.value, size: size.value },
      })
      .then((res) => {
        datas.value = res.data;
      }),
    instance.get(SERVER_URL.resource.concat("/count")).then((res) => {
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
    .delete(SERVER_URL.resource.concat("/", dataCode.value))
    .then(() => {
      // 将datas中修改项的历史数据删除
      datas.value = datas.value.filter(
        (item: any) => item.code != dataCode.value
      );
      isDel.value = false;
    });
};
// 新增/编辑：打开
const modelOperate = async (operate: boolean) => {
  resourceData.value = {};
  tags.value = [];
  if (operate && dataCode.value && dataCode.value.length > 0) {
    await instance
      .get(SERVER_URL.resource.concat("/", dataCode.value))
      .then((res) => {
        resourceData.value = res.data;
        tags.value = res.data.tags;
      });
  }
  isEdit.value = operate;
};
// 新增/编辑：提交
const commitOperate = async () => {
  let data = resourceData.value;
  if (dataCode.value && dataCode.value.length > 0) {
    await instance
      .put(SERVER_URL.resource.concat("/", dataCode.value), data)
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
    await instance.post(SERVER_URL.resource, data).then((res) => {
      if (datas.value.length >= 10) {
        // 删除第一个
        datas.value.shift();
      }
      // 将结果添加到第一个
      datas.value.unshift(res.data);
      isEdit.value = false;
    });
  }
};

// 上传文件
const uploadImage = (files: Array<File>) => {
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
    resourceData.value = { ...resourceData.value, url: urls };
  }
};

onMounted(() => {
  retrieve();
});
</script>