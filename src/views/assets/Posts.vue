<template>
  <div class="col-span-12 mt-2">
    <div class="flex justify-between items-center h-10">
      <h2 class="text-lg font-medium">Posts</h2>
      <button
        @click="retrieve(0, page)"
        class="ml-4 inline-flex items-center text-blue-600 focus:outline-none"
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
    <div class="overflow-scroll mt-2" style="height: calc(100vh - 12rem)">
      <table
        class="w-full overflow-ellipsis whitespace-nowrap"
        aria-label="posts"
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
            <th scope="col" class="px-4">Title</th>
            <th scope="col" class="px-4">Code</th>
            <th scope="col" class="px-4">Category</th>
            <th scope="col" class="px-4">Viewed</th>
            <th scope="col" class="px-4">Likes</th>
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
            <td class="px-4 text-center max-h-32 max-w-sm truncate">
              <a
                :href="'https://www.leafage.top/posts/detail/' + data.code"
                target="_blank"
                class="font-medium text-blue-600"
                v-text="data.title"
              ></a>
            </td>
            <td class="px-4" v-text="data.code"></td>
            <td class="px-4" v-text="data.category"></td>
            <td class="px-4" v-text="data.viewed"></td>
            <td class="px-4" v-text="data.likes"></td>
            <td
              class="px-4"
              v-text="new Date(data.modifyTime).toLocaleDateString()"
            ></td>
            <td class="px-4">
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
        <div class="grid grid-rows-3 grid-cols-12 gap-x-4 gap-y-2">
          <div class="col-span-12 sm:col-span-8 md:flex items-center">
            <input
              type="text"
              class="w-full rounded-md border-gray-300 shadow-sm"
              placeholder="Title"
              maxlength="50"
              required
              v-model.trim="postsData.title"
            />
          </div>
          <div class="row-span-3 col-span-12 sm:col-span-4">
            <img
              v-if="postsData.cover"
              :src="postsData.cover"
              alt="cover"
              class="rounded-md object-cover w-48 h-36"
            />
            <div
              v-else
              class="
                rounded-md
                border border-gray-300
                w-48
                h-36
                flex
                items-center
              "
            >
              <div class="mx-auto text-center">
                <div class="text-center text-gray-600">
                  <label
                    for="file-upload"
                    class="
                      relative
                      cursor-pointer
                      bg-white
                      rounded-md
                      text-gray-400
                      hover:text-indigo-500
                    "
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
                      type="file"
                      class="sr-only"
                      accept="image/png,image/jpeg,image/jpg"
                      @change="uploadImage($event.target.files)"
                    />
                  </label>
                </div>
                <p class="text-xs text-gray-500">png, jpeg, jpg</p>
                <p class="text-xs text-gray-500">up to 2MB</p>
              </div>
            </div>
          </div>
          <div class="col-span-12 sm:col-span-8 relative">
            <input
              type="text"
              @keydown.enter="addTag"
              class="w-full rounded-md border-gray-300 shadow-sm"
              :style="{ paddingLeft: pl + 'rem' }"
              placeholder="Tags"
              v-model="tagValue"
            />
            <div class="absolute inset-y-0 left-3 flex items-center">
              <span
                v-for="(tag, index) in postsData.tags"
                :key="index"
                class="
                  mr-2
                  border border-gray-300
                  bg-gray-100
                  rounded-md
                  px-1
                  flex
                  items-center
                "
                >{{ tag }}
                <svg
                  @click="removeTag(tag)"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="ml-1 cursor-pointer opacity-30"
                >
                  <use xlink:href="/svg/feather-sprite.svg#x" />
                </svg>
              </span>
            </div>
          </div>
          <div class="col-span-12 sm:col-span-4 md:flex items-center">
            <select
              v-model="postsData.category"
              required
              class="w-full rounded-md border-gray-300 shadow-sm"
            >
              <option disabled>请选择</option>
              <option
                v-for="category in categories"
                :key="category.code"
                :value="category.code"
                v-text="category.alias"
              ></option>
            </select>
          </div>
          <div class="col-span-12">
            <textarea
              class="w-full rounded-md border-gray-300 shadow-sm"
              placeholder="Subtitle"
              maxlength="100"
              required
              v-model.trim="postsData.subtitle"
            ></textarea>
          </div>
        </div>
        <div class="grid grid-cols-12 mt-1">
          <div class="col-span-12">
            <div
              class="
                grid grid-flow-row grid-rows-1 grid-cols-1
                rounded-md
                h-52
                md:h-80
                relative
              "
              :class="{ border: preview }"
            >
              <a
                href="javascript:;"
                @click="preview = !preview"
                class="top-0 right-0 absolute"
              >
                <svg
                  v-if="preview"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-eye-off opacity-30"
                >
                  <path
                    d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
                  ></path>
                  <line x1="1" y1="1" x2="23" y2="23"></line>
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-eye opacity-30"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </a>
              <textarea
                v-if="!preview"
                class="w-full rounded-md border-gray-300 shadow-sm"
                v-model="content"
                required
                placeholder="write with markdown..."
              ></textarea>
              <figure
                v-else
                class="p-2 prose overflow-auto"
                style="width: 606px"
                v-html="rendedHtml"
              ></figure>
            </div>
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
import markdown from "../../plugins/markdown";
import { uploadFile } from "../../plugins/upload";

let preview = ref(false);
let content = ref("");
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
// 数据
const postsData = ref({});
const dataCode = ref("");
const categories = ref([]);

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
  await instance.get(SERVER_URL.posts.concat("/count")).then((res) => {
    total.value = res.data;
  });
};
// 查询列表
const retrieve = async () => {
  await instance
    .get(SERVER_URL.posts.concat("?page=" + page.value, "&size=" + size.value))
    .then((res) => {
      datas.value = res.data;
    });
};
// 添加tag
const addTag = () => {
  tags.value.push(tagValue.value);
  postsData.value = { ...postsData.value, tags: tags.value };
  tagValue.value = "";
};
// 删除tag
const removeTag = (tag: String) => {
  tags.value = tags.value.filter((item) => item !== tag);
  postsData.value = { ...postsData.value, tags: tags.value };
};
// 删除确认
const confirmOperate = (operate: boolean) => {
  isDel.value = operate;
};
// 新增/编辑：打开
const modelOperate = async (operate: boolean, code: string) => {
  postsData.value = {};
  content.value = "";
  tags.value = [];
  if (operate) {
    await Promise.all([
      retrieveCategories(),
      fetchPosts(code),
      fetchContent(code),
    ]);
  }
  isEdit.value = operate;
};
// 获取所有分类
const retrieveCategories = async () => {
  await instance.get(SERVER_URL.category).then((res) => {
    categories.value = res.data;
  });
};
// 根据code查posts
const fetchPosts = async (code: string) => {
  if (code && code.length > 0) {
    dataCode.value = code;
    await instance.get(SERVER_URL.posts.concat("/", code)).then((res) => {
      postsData.value = res.data;
      tags.value = res.data.tags;
    });
  }
};
// 根据code查posts content
const fetchContent = async (code: string) => {
  if (code && code.length > 0) {
    await instance
      .get(SERVER_URL.posts.concat("/", code, "/content"))
      .then((res) => {
        content.value = res.data.content;
      });
  }
};
// 新增/编辑：提交
const commitOperate = async () => {
  let data = {
    ...postsData.value,
    content: content.value,
  };
  if (dataCode.value && dataCode.value.length > 0) {
    await instance
      .put(SERVER_URL.posts.concat("/", dataCode.value), data)
      .then((res) => {
        // 将datas中修改项的历史数据删除
        datas.value = datas.value.filter(
          (item: any) => item.code != dataCode.value
        );
        // 将结果添加到第一个
        datas.value.unshift(res.data);
      });
  } else {
    await instance.post(SERVER_URL.posts, data).then((res) => {
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

// 上传文件
const uploadImage = (files: Array<File>) => {
  if (files.length > 0) {
    uploadFile(files[0]).subscribe({
      complete: (e: any) => {
        postsData.value = {
          ...postsData.value,
          cover: "https://cdn.leafage.top/" + e.key,
        };
      },
    });
  }
};

const pl = computed(() => {
  if (tags.value) {
    return tags.value.length * 4 + 0.75;
  }
  return 0.75;
});

// 转换md为html
const rendedHtml = computed(() => {
  if (content.value) {
    return markdown.render(content.value);
  }
  return "";
});

onMounted(() => {
  initDatas();
});
</script>