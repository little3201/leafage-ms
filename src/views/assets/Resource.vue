<template>
  <div class="col-span-12 mt-2">
    <div class="flex justify-between items-center">
      <h2 class="text-lg font-medium">Portfolio</h2>
      <button
        @click="retrieve()"
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
      <table class="w-full overflow-ellipsis whitespace-nowrap" aria-label="portfolio">
        <thead>
          <tr class="sticky top-0 bg-gray-100 uppercase text-center text-xs sm:text-sm">
            <th scope="col" class="px-4 py-2 sm:py-3 text-left">No.</th>
            <th scope="col" class="px-4">Title</th>
            <th scope="col" class="px-4">Code</th>
            <th scope="col" class="px-4">Type</th>
            <th scope="col" class="px-4">Category</th>
            <th scope="col" class="px-4">Viewed</th>
            <th scope="col" class="px-4">Downloads</th>
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
                class="text-xs px-2 py-1 rounded-md"
                :class="{ 'bg-indigo-100': data.type === 'E', 'bg-blue-100': data.type === 'P', 'bg-pink-100': data.type === 'T' }"
              >{{ data.type === 'E' ? 'epub' : (data.type === 'P' ? 'pdf' : 'txt') }}</span>
            </td>
            <td class="px-4" v-text="data.category"></td>
            <td class="px-4" v-text="data.viewed"></td>
            <td class="px-4" v-text="data.downloads"></td>
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
        <div class="grid grid-cols-12 grid-rows-3 gap-4">
          <div class="col-span-12 sm:col-span-7">
            <label for="title">
              Title
              <span class="text-red-600 ml-1">*</span>
            </label>
            <input
              id="title"
              type="text"
              class="mt-1 w-full rounded-md border-gray-300 shadow-sm"
              placeholder="Title"
              required
              autofocus
              v-model.trim="resourceData.title"
            />
          </div>
          <div class="col-span-12 sm:col-span-5 row-span-3 mb-1">
            <label for="cover">Cover</label>
            <img
              id="cover"
              v-if="resourceData.cover"
              :src="resourceData.cover"
              alt="portfolio content"
              class="rounded-md object-cover h-56 mt-1 border"
            />
            <div v-else class="mt-1">
              <div
                class="h-56 rounded-md border border-gray-300 shadow-sm flex justify-center items-center"
              >
                <div class="text-gray-600">
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
                  <p class="text-xs text-gray-500">png, jpeg, jpg, mp4</p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-span-12 sm:col-span-7">
            <label for="type" class="inline-flex items-center">
              Category
              <span class="text-red-600 ml-1">*</span>
            </label>
            <select
              id="type"
              v-model="resourceData.category"
              class="mt-1 w-full rounded-md border-gray-300 shadow-sm"
            >
              <option value="undefined">请选择</option>
              <option
                v-for="category in categories"
                :key="category.code"
                :value="category.code"
                v-text="category.alias"
              ></option>
            </select>
          </div>
          <div class="col-span-12 sm:col-span-7">
            <label for="type" class="inline-flex items-center">
              Type
              <span class="text-red-600 ml-1">*</span>
            </label>
            <select
              id="type"
              v-model="resourceData.type"
              class="mt-1 w-full rounded-md border-gray-300 shadow-sm"
            >
              <option value="undefined">请选择</option>
              <option value="E">Epub</option>
              <option value="P">Pdf</option>
              <option value="T">Txt</option>
            </select>
          </div>
        </div>
        <div class="col-span-7 row-span-2 mt-4">
          <label for="description">Description</label>
          <textarea
            id="description"
            class="mt-1 w-full h-full rounded-md border-gray-300 shadow-sm"
            v-model.trim="resourceData.description"
            placeholder="Description"
          />
        </div>
      </form>
    </Model>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";

import Operation from "/@/components/Operation.vue";
import Action from "/@/components/Action.vue";
import Pagation from "/@/components/Pagation.vue";
import Confirm from "/@/components/Confirm.vue";
import Model from "/@/components/Model.vue";

import instance from "../../api";
import SERVER_URL from "../../api/request";
import { uploadFile } from "../../plugins/upload";

// 数据
let resourceData = ref({});
let dataCode = ref("");
let datas = ref<any>([]);
let categories = ref([])
// 分页参数
let page = ref(0);
let size = ref(10);
let total = ref(0);
// 模态框参数
let isEdit = ref(false);
let isDel = ref(false);

// 设置页码
const setPage = (p: number, s: number) => {
  page.value = p;
  size.value = s;
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
    count()
  ]);
};
const count = () => {
  instance.get(SERVER_URL.resource.concat("/count")).then((res) => {
    total.value = res.data;
  })
}
// 删除取消
const confirmOperate = (operate: boolean) => {
  isDel.value = operate;
};
// 删除确认
const confirmCommit = async () => {
  await instance.delete(SERVER_URL.resource.concat("/", dataCode.value)).then(() => {
    // 将datas中修改项的历史数据删除
    datas.value = datas.value.filter(
      (item: any) => item.code != dataCode.value
    );
    isDel.value = false;
    count()
  });
};
// 新增/编辑：打开
const modelOperate = async (operate: boolean) => {
  resourceData.value = {};
  if (operate && dataCode.value && dataCode.value.length > 0) {
    await Promise.all([instance.get(SERVER_URL.category).then((res) => {
      categories.value = res.data;
    }),
    fetch()]);
  }
  isEdit.value = operate;
};
const fetch = () => {
  instance
    .get(SERVER_URL.resource.concat("/", dataCode.value))
    .then(res =>
      resourceData.value = res.data
    )
}
// 新增/编辑：提交
const modelCommit = async () => {
  if (dataCode.value && dataCode.value.length > 0) {
    await instance
      .put(SERVER_URL.resource.concat("/", dataCode.value), resourceData.value)
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
    await instance.post(SERVER_URL.resource, resourceData.value).then((res) => {
      if (datas.value.length >= size.value) {
        // 删除第一个
        datas.value.shift();
      }
      // 将结果添加到第一个
      datas.value.unshift(res.data);
      isEdit.value = false;
      count()
    });
  }
};

// 上传文件
const uploadImage = (files: Array<File>) => {
  if (files[0]) {
    uploadFile(files[0]).subscribe({
      // next: (result) => {},
      // error: () => {},
      complete: (e: any) => {
        resourceData.value = { ...resourceData.value, cover: "https://cdn.leafage.top/" + e.key };
      }
    })
  }
};

onMounted(() => {
  retrieve();
});
</script>