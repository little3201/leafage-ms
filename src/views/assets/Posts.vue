<template>
  <div class="col-span-12 mt-2">
    <div class="flex justify-between items-center">
      <h2 class="text-lg font-medium">{{ $t('posts') }}</h2>
      <button @click="retrieve"
        class="ml-4 inline-flex items-center text-blue-600 focus:outline-none active:cursor-wait">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round" class="mr-2">
          <use :xlink:href="'/svg/feather-sprite.svg#' + 'rotate-cw'" />
        </svg>
        {{ $t('reload') }}
      </button>
      <Operation @click.capture="dataCode = ''" @modelOperate="modelOperate" :datas="datas" :fileName="'posts'" />
    </div>
    <div class="sm-t-h overflow-auto">
      <table class="w-full overflow-ellipsis whitespace-nowrap" aria-label="posts">
        <thead>
          <tr class="sticky top-0 bg-gray-100 uppercase text-center text-xs sm:text-sm">
            <th scope="col" class="px-4 py-2 sm:py-3 text-left">{{ $t('no') }}</th>
            <th scope="col" class="px-4">{{ $t('title') }}</th>
            <th scope="col" class="px-4">{{ $t('code') }}</th>
            <th scope="col" class="px-4">{{ $t('category') }}</th>
            <th scope="col" class="px-4">{{ $t('viewed') }}</th>
            <th scope="col" class="px-4">{{ $t('likes') }}</th>
            <th scope="col" class="px-4">{{ $t('comments') }}</th>
            <th scope="col" class="px-4">{{ $t('modifyTime') }}</th>
            <th scope="col" class="px-4">{{ $t('actions') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="text-center bg-white border-y-4 lg:border-y-8 first:border-t-0 last:border-b-0 border-gray-100 hover:bg-gray-50 hover:text-blue-600"
            v-for="(data, index) in datas" :key="index">
            <td class="px-4 py-2 sm:py-3 text-left">{{ index + 1 }}</td>
            <td class="px-4 text-center max-w-xs truncate">
              <a :href="'https://www.leafage.top/posts/detail/' + data.code" target="_blank"
                class="font-medium hover:underline" v-text="data.title"></a>
            </td>
            <td class="px-4" v-text="data.code"></td>
            <td class="px-4" v-text="data.category"></td>
            <td class="px-4" v-text="data.viewed"></td>
            <td class="px-4" v-text="data.likes"></td>
            <td class="px-4" v-text="data.comment"></td>
            <td class="px-4" v-text="new Date(data.modifyTime).toLocaleDateString()"></td>
            <td>
              <Action @click.capture="dataCode = data.code" @delAction="confirmOperate" @editAction="modelOperate" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Page @retrieve="retrieve" :total="total" :page="page" :size="size" @setPage="setPage" />
    <Confirm :isShow="isDel" @cancelAction="confirmOperate" @commitAction="confirmCommit" />
    <Model :isShow="isEdit" @cancelAction="modelOperate" @commitAction="modelCommit">
      <form @submit.prevent>
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-12 md:col-span-8">
            <label for="title">{{ $t('title') }}</label>
            <input id="title" type="text" name="title" class="mt-1 w-full block rounded-md border-gray-300"
              :placeholder="$t('title')" maxlength="50" required autofocus v-model.trim="postsData.title" />
          </div>
          <div class="row-span-3 col-span-12 sm:col-span-4">
            <label for="cover">{{ $t('cover') }}</label>
            <figure v-if="postsData.cover" class="w-full h-32 mt-1 rounded-md relative group">
              <div
                class="absolute w-full h-full rounded-md bg-black bg-opacity-50 hidden group-hover:flex items-center justify-center">
                <button type="button" @click="removeCover" class="text-white focus:outline-none">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round">
                    <use :xlink:href="'/svg/feather-sprite.svg#' + 'trash-2'" />
                  </svg>
                </button>
              </div>
              <img :src="postsData.cover" :alt="postsData.title" class="rounded-md w-full h-full" width="198"
                height="128" />
            </figure>
            <div v-else class="h-32 mt-1 rounded-md border border-gray-300 flex items-center justify-center">
              <div class="text-gray-600 text-center">
                <label for="file-upload"
                  class="relative cursor-pointer bg-white rounded-md text-gray-400 hover:text-blue-600">
                  <svg class="mx-auto h-8 w-8" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <input id="file-upload" name="posts_cover" type="file" class="sr-only"
                    accept="image/png, image/jpeg, image/jpg" @click="uploadImage($event.target.files)" />
                  <p class="text-xs text-gray-500">png, jpeg, jpg</p>
                  <p class="text-xs text-gray-500">up to 2MB</p>
                </label>
              </div>
            </div>
          </div>

          <div class="col-span-12 md:col-span-4">
            <label for="tags">{{ $t('tags') }}</label>
            <input id="tags" type="text" name="tags" @keydown.enter="addTag"
              class="mt-1 w-full block rounded-md border-gray-300" :placeholder="$t('tags')" v-model.trim="tagValue" />
          </div>
          <div class="col-span-12 md:col-span-4">
            <label for="category">{{ $t('category') }}</label>
            <select id="category" name="category" v-model.lazy="postsData.category" required
              class="mt-1 w-full block rounded-md border-gray-300">
              <option value="undefined">---{{ $t('select') }}---</option>
              <option v-for="category in categories" :key="category.code" :value="category.code"
                v-text="category.alias"></option>
            </select>
          </div>
        </div>

        <div class="overflow-auto text-sm -mt-2">
          <span v-for="(tag, index) in postsData.tags" :key="index"
            class="mr-1 border border-gray-300 bg-gray-100 rounded-md px-1 whitespace-nowrap inline-flex items-center">
            {{ tag }}
            <svg @click="removeTag(tag)" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-1 cursor-pointer opacity-30">
              <use :xlink:href="'/svg/feather-sprite.svg#' + 'x'" />
            </svg>
          </span>
        </div>
        <div class="grid grid-cols-12 mt-2">
          <div class="col-span-12 relative">
            <label for="content">{{ $t('content') }}</label>
            <button type="button" @click="preview = !preview" class="top-3 right-1 absolute focus:outline-none">
              <svg v-if="preview" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-40">
                <use :xlink:href="'/svg/feather-sprite.svg#' + 'eye-off'" />
              </svg>
              <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round" class="opacity-40">
                <use :xlink:href="'/svg/feather-sprite.svg#' + 'eye'" />
              </svg>
            </button>
            <div class="grid grid-flow-row grid-rows-1 grid-cols-1 border-none mt-1 h-52 md:h-96"
              :class="{ border: preview }">
              <textarea id="content" name="content" v-if="!preview" class="mt-1 w-full rounded-md border-gray-300"
                v-model.trim="content" required placeholder="markdown..."></textarea>
              <div ref="rendedHtmlRef" v-else
                class="mt-1 p-2 prose prose-base prose-blue max-w-none overflow-y-auto w-full border border-gray-300 rounded-md"
                v-html="rendedHtml"></div>
            </div>
          </div>
        </div>
      </form>
    </Model>
    <Preview :isShow="view.isShow" @closeAction="previewOperation">
      <img :src="view.url" alt="preview" class="rounded-md w-full h-full" width="640" height="427" />
    </Preview>
  </div>
</template>


<script lang="ts" setup>
import { ref, reactive, onMounted, computed } from "vue";

import Operation from "@/components/Operation.vue";
import Action from "@/components/Action.vue";
import Page from "@/components/Page.vue";
import Confirm from "@/components/Confirm.vue";
import Model from "@/components/Model.vue";
import Preview from "@/components/Preview.vue";

import { instance, SERVER_URL } from "@/api";
import type { Posts, Category } from "@/api/request.type";
import marked from "@/plugins/md";
import { uploadFile } from "@/plugins/upload";

// 模板引用
let rendedHtmlRef = ref<HTMLElement>()

// 分页参数
let page = ref(0);
let size = ref(10);
let total = ref(0);
// 标签参数
let tagValue = ref("");
let tags = ref<Array<string>>([]);
// 模态框参数
let isEdit = ref(false);
let isDel = ref(false);
let preview = ref(false);
// 数据
let postsData = ref<Posts>({});

let dataCode = ref("");
let content = ref("");

let datas = ref<Array<Posts>>([]);
let categories = ref<Array<Category>>([]);

let view = reactive({
  isShow: false,
  url: ''
})

onMounted(() => {
  retrieve();
});
/**
 * 设置页码
 * @param p 页码
 * @param s 大小
 */
const setPage = (p: number, s: number): void => {
  page.value = p;
  size.value = s;
};
/**
 * 删除封面图
 */
const removeCover = (): void => {
  postsData.value.cover = '';
};
/**
 * 查询列表
 */
const retrieve = async (): Promise<void> => {
  await instance.get(SERVER_URL.posts, { params: { page: page.value, size: size.value } })
    .then(res => {
      datas.value = res.data.content
      total.value = res.data.totalElements
    })
};
/**
 * 添加tag
 */
const addTag = (): void => {
  if (tagValue.value && tagValue.value.length > 0) {
    tags.value.push(tagValue.value);
    postsData.value = { ...postsData.value, tags: tags.value };
  }
  tagValue.value = "";
};
/**
 * 删除tag
 * @param tag tag名称
 */
const removeTag = (tag: String): void => {
  tags.value.splice(tags.value.indexOf(tag), 1)
  postsData.value = { ...postsData.value, tags: tags.value };
};
/**
 * confirm 操作
 * @param operate 是否打开
 */
const confirmOperate = (operate: boolean): void => {
  isDel.value = operate;
};
/**
 * confirm 提交
 */
const confirmCommit = async (): Promise<void> => {
  await instance.delete(SERVER_URL.posts.concat("/", dataCode.value)).then(() => {
    // 将datas中修改项的历史数据删除
    datas.value = datas.value.filter(
      (item: any) => item.code != dataCode.value
    );
    isDel.value = false;
  });
};
/**
 * 新增/编辑：打开
 * @param operate 是否打开
 */
const modelOperate = async (operate: boolean): Promise<void> => {
  if (operate) {
    postsData.value = {};
    content.value = "";
    tags.value = [];
    await Promise.all([
      await instance.get(SERVER_URL.category, { params: { page: 0, size: 99 } }).then(res => {
        categories.value = res.data.content;
      }),
      fetch(),
      fetchContent(),
    ]);
  }
  isEdit.value = operate;
};
/**
 * 查询信息
 */
const fetch = async (): Promise<void> => {
  if (dataCode.value && dataCode.value.length > 0) {
    await instance.get(SERVER_URL.posts.concat("/", dataCode.value)).then(res => {
      postsData.value = res.data;
      tags.value = res.data.tags;
    });
  }
};
/**
 * 查询内容
 */
const fetchContent = async (): Promise<void> => {
  if (dataCode.value && dataCode.value.length > 0) {
    await instance.get(SERVER_URL.posts.concat("/", dataCode.value, "/content"))
      .then(res => content.value = res.data.content);
  }
};
/**
 * 新增/编辑：提交
 */
const modelCommit = async (): Promise<void> => {
  let data = {
    ...postsData.value,
    content: content.value,
  };
  if (dataCode.value && dataCode.value.length > 0) {
    await instance.put(SERVER_URL.posts.concat("/", dataCode.value), data)
      .then(res => {
        // 将datas中修改项的历史数据删除
        datas.value = datas.value.filter(
          (item: any) => item.code != dataCode.value
        );
        // 将结果添加到第一个
        datas.value.unshift(res.data);
        isEdit.value = false;
      });
  } else {
    await instance.post(SERVER_URL.posts, data).then(res => {
      if (datas.value.length >= size.value) {
        // 删除第一个
        datas.value.pop();
      }
      // 将结果添加到第一个
      datas.value.unshift(res.data);
      isEdit.value = false;
    });
  }
};
/**
 * 上传文件
 * @param files 文件
 */
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
/**
 * 转换md为html
 */
const rendedHtml = computed(() => {
  if (content.value) {
    addImgClickEvent()
    // a标签添加 target="_blank"
    return marked.parse(content.value).replace(/href="/gi, 'target="_blank" href="');
  }
  return "";
});
/**
 * 给img添加双击事件
 */
const addImgClickEvent = () => {
  if (rendedHtmlRef.value) {
    let imgs = rendedHtmlRef.value.querySelectorAll('img')
    if (imgs.length > 0) {
      setTimeout(() => {
        for (let i = 0, len = imgs.length; i < len; i++) {
          imgs[i].onclick = () => {
            const src = imgs[i].getAttribute('src');
            previewOperation(true, src);
          };
        }
      }, 600)
    }
  }
}
/**
 * img预览
 * @param show 是否展示
 * @param code 代码
 */
const previewOperation = (show: boolean, url: string) => {
  if (show) {
    view.url = url
  }
  view.isShow = show
}
</script>