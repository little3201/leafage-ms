<template>
  <div class="col-span-12 mt-2">
    <div class="flex justify-between items-center">
      <h2 class="text-lg font-medium">Posts</h2>
      <button
        @click="retrieve"
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
      <Operation @click.capture="dataCode = ''" @modelOperate="modelOperate" />
    </div>
    <div class="overflow-scroll" style="height: calc(100vh - 11.5rem)">
      <table class="w-full overflow-ellipsis whitespace-nowrap" aria-label="posts">
        <thead>
          <tr class="sticky top-0 bg-gray-100 uppercase text-center text-xs sm:text-sm">
            <th scope="col" class="px-4 py-2 sm:py-3 text-left">No.</th>
            <th scope="col" class="px-4">Title</th>
            <th scope="col" class="px-4">Code</th>
            <th scope="col" class="px-4">Category</th>
            <th scope="col" class="px-4">Viewed</th>
            <th scope="col" class="px-4">Likes</th>
            <th scope="col" class="px-4">Comment</th>
            <th scope="col" class="px-4">Modify Time</th>
            <th scope="col" class="px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="text-center bg-white border-y-4 lg:border-y-8 first:border-t-0 last:border-b-0 border-gray-100 hover:bg-gray-50 hover:text-blue-600"
            v-for="(data, index) in datas"
            :key="index"
          >
            <td class="px-4 py-2 sm:py-3 text-left">{{ index + 1 }}</td>
            <td class="px-4 text-center max-w-xs truncate">
              <a
                :href="'https://www.leafage.top/posts/detail/' + data.code"
                target="_blank"
                class="font-medium hover:underline"
                v-text="data.title"
              ></a>
            </td>
            <td class="px-4" v-text="data.code"></td>
            <td class="px-4" v-text="data.category"></td>
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
    <Model :isShow="isEdit" @cancelAction="modelOperate" @commitAction="modelCommit">
      <form @submit.prevent>
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-12 md:col-span-8">
            <label for="title">Title</label>
            <input
              id="title"
              type="text"
              name="title"
              class="mt-1 w-full block rounded-md border-gray-300"
              placeholder="Title"
              maxlength="50"
              required
              autofocus
              v-model.trim="postsData.title"
            />
          </div>
          <div class="row-span-3 col-span-12 sm:col-span-4">
            <label for="cover">Cover</label>
            <figure v-if="postsData.cover" class="w-full h-32 mt-1">
              <img :src="postsData.cover" :alt="postsData.title" class="rounded-md w-full h-full" width="198" height="128" />
            </figure>
            <div v-else>
              <div
                class="h-36 mt-1 rounded-md border border-gray-300 flex items-center px-12 justify-center"
              >
                <div class="text-gray-600 text-center">
                  <label
                    for="file-upload"
                    class="relative cursor-pointer bg-white rounded-md text-gray-400 hover:text-blue-600"
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
                      name="posts_cover"
                      type="file"
                      class="sr-only"
                      accept="image/png, image/jpeg, image/jpg"
                      @change="uploadImage($event.target.files)"
                    />
                  </label>
                  <p class="text-xs text-gray-500">png, jpeg, jpg</p>
                  <p class="text-xs text-gray-500">up to 2MB</p>
                </div>
              </div>
            </div>
          </div>

          <div class="col-span-12 md:col-span-4">
            <label for="tags">Tags</label>
            <input
              id="tags"
              type="text"
              name="tags"
              @keydown.enter="addTag"
              class="mt-1 w-full block rounded-md border-gray-300"
              placeholder="Tags"
              v-model.trim="tagValue"
            />
          </div>
          <div class="col-span-12 md:col-span-4">
            <label for="category">Category</label>
            <select
              id="category"
              name="category"
              v-model.lazy="postsData.category"
              required
              class="mt-1 w-full block rounded-md border-gray-300"
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
        </div>

        <div class="overflow-auto text-sm -mt-2">
          <span
            v-for="(tag, index) in postsData.tags"
            :key="index"
            class="mr-1 border border-gray-300 bg-gray-100 rounded-md px-1 whitespace-nowrap inline-flex items-center"
          >
            {{ tag }}
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
        <div class="grid grid-cols-12 mt-2">
          <div class="col-span-12 relative">
            <label for="content">Content</label>
            <button
              type="button"
              @click="preview = !preview"
              class="top-3 right-1 absolute focus:outline-none"
            >
              <svg
                v-if="preview"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
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
                />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-eye opacity-30"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </button>
            <div
              class="grid grid-flow-row grid-rows-1 grid-cols-1 rounded-md mt-1 h-52 md:h-96"
              :class="{ border: preview }"
            >
              <textarea
                id="content"
                name="content"
                v-if="!preview"
                class="mt-1 w-full block rounded-md border-gray-300"
                v-model.trim="content"
                required
                placeholder="write with markdown..."
              ></textarea>
              <div
                v-else
                class="mt-1 p-2 prose overflow-y-auto"
                style="width: 606px"
                v-html="rendedHtml"
              ></div>
            </div>
          </div>
        </div>
      </form>
    </Model>
  </div>
</template>


<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";

import Operation from "@/components/Operation.vue";
import Action from "@/components/Action.vue";
import Pagation from "@/components/Pagation.vue";
import Confirm from "@/components/Confirm.vue";
import Model from "@/components/Model.vue";

import instance from "@/api";
import { SERVER_URL, Posts, PostsDetails, Category } from "@/api/request";
import marked from "@/plugins/markdown";
import { uploadFile } from "@/plugins/upload";

// 分页参数
let page = ref(0);
let size = ref(10);
let total = ref(0);
// 标签参数
let tagValue = ref("");
let tags = ref<Array<String>>([]);
// 模态框参数
let isEdit = ref(false);
let isDel = ref(false);
let preview = ref(false);
// 数据
let postsData = ref<PostsDetails>({});
let dataCode = ref("");
let categories = ref<Array<Category>>([]);
let content = ref("");
let datas = ref<Array<Posts>>([]);
// 设置页码
const setPage = (p: number, s: number): void => {
  page.value = p;
  size.value = s;
};
// 查询列表
const retrieve = async (): Promise<void> => {
  await Promise.all([
    instance
      .get(SERVER_URL.posts, { params: { page: page.value, size: size.value } })
      .then((res) => {
        datas.value = res.data;
      }),
    count()
  ]);
};
const count = (): void => {
  instance.get(SERVER_URL.posts.concat("/count")).then((res) => {
    total.value = res.data;
  })
}
// 添加tag
const addTag = (): void => {
  if (tagValue.value && tagValue.value.length > 0) {
    tags.value.push(tagValue.value);
    postsData.value = { ...postsData.value, tags: tags.value };
  }
  tagValue.value = "";
};
// 删除tag
const removeTag = (tag: String): void => {
  tags.value.splice(tags.value.indexOf(tag), 1)
  postsData.value = { ...postsData.value, tags: tags.value };
};
// 删除取消
const confirmOperate = (operate: boolean): void => {
  isDel.value = operate;
};
// 删除确认
const confirmCommit = async (): Promise<void> => {
  await instance.delete(SERVER_URL.posts.concat("/", dataCode.value)).then(() => {
    // 将datas中修改项的历史数据删除
    datas.value = datas.value.filter(
      (item: any) => item.code != dataCode.value
    );
    isDel.value = false;
    count()
  });
};
// 新增/编辑：打开
const modelOperate = async (operate: boolean): Promise<void> => {
  if (operate) {
    postsData.value = {};
    content.value = "";
    tags.value = [];
    await Promise.all([
      instance.get(SERVER_URL.category).then((res) => {
        categories.value = res.data;
      }),
      fetch(),
      fetchContent(),
    ]);
  }
  isEdit.value = operate;
};

const fetch = (): void => {
  if (dataCode.value && dataCode.value.length > 0) {
    instance.get(SERVER_URL.posts.concat("/", dataCode.value)).then((res) => {
      postsData.value = res.data;
      tags.value = res.data.tags;
    });
  }
};

const fetchContent = (): void => {
  if (dataCode.value && dataCode.value.length > 0) {
    instance
      .get(SERVER_URL.posts.concat("/", dataCode.value, "/content"))
      .then((res) => {
        content.value = res.data.content;
      });
  }
};

// 新增/编辑：提交
const modelCommit = async (): Promise<void> => {
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
        isEdit.value = false;
      });
  } else {
    await instance.post(SERVER_URL.posts, data).then((res) => {
      if (datas.value.length >= size.value) {
        // 删除第一个
        datas.value.pop();
      }
      // 将结果添加到第一个
      datas.value.unshift(res.data);
      isEdit.value = false;
      count()
    });
  }
};

// 上传文件
const uploadImage = (files: Array<File>): void => {
  if (files[0]) {
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

// 转换md为html
const rendedHtml = computed(() => {
  if (content.value) {
    return marked.parse(content.value);
  }
  return "";
});

onMounted(() => {
  retrieve();
});
</script>