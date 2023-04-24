<template>
  <div class="mt-2">
    <Operation
      :datas="datas"
      :file-name="'posts'"
      :items="items"
      @hand-reload="retrieve"
      @hand-add="showModal"
    />
    <div class="sm-t-h overflow-auto">
      <table
        class="w-full overflow-ellipsis whitespace-nowrap"
        aria-label="posts"
      >
        <thead>
          <tr class="sticky top-0 bg-gray-100 uppercase text-center text-xs sm:text-sm">
            <th
              scope="col"
              class="px-4 py-2 sm:py-3 text-left"
            >
              {{ $t('no') }}
            </th>
            <th
              scope="col"
              class="px-4"
            >
              {{ $t('title') }}
            </th>
            <th
              scope="col"
              class="px-4"
            >
              {{ $t('category') }}
            </th>
            <th
              scope="col"
              class="px-4"
            >
              {{ $t('tags') }}
            </th>
            <th
              scope="col"
              class="px-4"
            >
              {{ $t('modifyTime') }}
            </th>
            <th
              scope="col"
              class="px-4"
            >
              {{ $t('actions') }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(data, index) in datas"
            :key="index"
            class="text-center bg-white border-y-4 lg:border-y-8 first:border-t-0 last:border-b-0 border-gray-100 hover:bg-gray-50 hover:text-blue-600"
          >
            <td class="px-4 py-2 sm:py-3 text-left">
              {{ index + 1 }}
            </td>
            <td class="px-4 text-center max-w-xs truncate">
              <a
                :href="'https://www.leafage.top/posts/' + data.id"
                target="_blank"
                class="font-medium hover:underline"
              >{{
                data.title }}
              </a>
            </td>
            <td
              class="px-4"
              v-text="data.category"
            />
            <td class="px-4">
              <span
                v-for="(t, idx) in data.tags"
                :key="idx"
                class="mr-1 text-sm border border-gray-300 bg-gray-100 rounded-md px-1 whitespace-nowrap inline-flex items-center"
              >
                {{ t }}
              </span>
            </td>
            <td
              class="px-4"
              v-text="new Date(data.modifyTime).toLocaleDateString()"
            />
            <td>
              <Action
                :editable="true"
                :removeable="true"
                @edit="showModal(data.id)"
                @del="confirmOperate"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Pagation
      :total="pagation.total"
      :page="pagation.page"
      :size="pagation.size"
      @retrieve="retrieve"
      @set-page="setPage"
    />
    <Confirm
      :visible="operation.confirm"
    >
      <template #footer>
        <button
          type="submit"
          name="confirm"
          aria-label="confirm"
          class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 font-medium text-white focus:outline-none focus:ring-1 focus:ring-offset-2 sm:ml-3 sm:w-auto active:cursor-wait bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
          @click="confirmCommit(formData.id)"
        >
          {{ $t('confirm') }}
        </button>
        <button
          type="button"
          name="cancle"
          aria-label="cancle"
          class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-blue-600 sm:mt-0 sm:ml-3 sm:w-auto active:cursor-wait"
          @click="onClose"
        >
          {{
            $t('cancle')
          }}
        </button>
      </template>
    </Confirm>
    <Drawer
      :visible="operation.modal"
      :title="'编辑帖子'"
      @close="onClose"
    >
      <template #content>
        <div class="w-full">
          <label for="title">{{ $t('title') }}</label>
          <input
            id="title"
            v-model.trim="formData.title"
            type="text"
            name="title"
            class="mt-1 w-full block rounded-md border-gray-300"
            :placeholder="$t('title')"
            maxlength="50"
            required
            aria-label="title"
          >
        </div>
        <div class="w-full">
          <label for="cover">{{ $t('cover') }}</label>
          <figure
            v-if="formData.cover"
            class="w-full h-32 mt-1 rounded-md relative group"
          >
            <div
              class="absolute w-full h-full rounded-md bg-black bg-opacity-50 hidden group-hover:flex items-center justify-center"
            >
              <button
                type="button"
                name="remove-cover"
                aria-label="remove-cover"
                class="text-white focus:outline-none"
                @click="removeCover"
              >
                <TrashIcon
                  class="w-6 h-6"
                  aria-hidden="true"
                />
              </button>
            </div>
            <img
              :src="formData.cover"
              :alt="formData.title"
              class="rounded-md w-full h-full"
              width="198"
              height="128"
            >
          </figure>
          <div
            v-else
            class="h-32 mt-1 rounded-md border border-gray-300 flex items-center justify-center"
          >
            <div class="text-gray-600 text-center">
              <label
                for="cover-upload"
                class="cursor-pointer bg-white rounded-md text-gray-400 hover:text-blue-600"
              >
                <PhotoIcon
                  class="w-8 h-8 mx-auto"
                  aria-hidden="true"
                />
                <input
                  id="cover-upload"
                  name="cover-upload"
                  type="file"
                  class="sr-only"
                  accept="image/png, image/jpeg, image/jpg"
                  aria-label="cover-upload"
                  @change="uploadImage($event)"
                >
                <p class="text-xs text-gray-500">png, jpeg, jpg</p>
                <p class="text-xs text-gray-500">up to 2MB</p>
              </label>
            </div>
          </div>
        </div>
        <div class="w-full">
          <label for="category">{{ $t('category') }}</label>
          <select
            id="category"
            v-model.lazy="formData.category"
            name="category"
            required
            class="mt-1 w-full block rounded-md border-gray-300"
            aria-label="posts category"
          >
            <option selected>
              ---{{ $t('select') }}---
            </option>
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
              v-text="category.categoryName"
            />
          </select>
        </div>
        <div class="w-full">
          <label for="tags">{{ $t('tags') }}</label>
          <input
            id="tags"
            v-model.trim="tag"
            type="text"
            name="tags"
            class="mt-1 w-full block rounded-md border-gray-300"
            aria-label="tag"
            :placeholder="$t('tags')"
            @keydown.enter="addTag(tag)"
          >
        </div>
        <div class="overflow-auto text-sm md:-mt-2">
          <span
            v-for="(t, index) in formData.tags"
            :key="index"
            class="mr-1 border border-gray-300 bg-gray-100 rounded-md px-1 whitespace-nowrap inline-flex items-center"
          >
            {{ t }}
            <XMarkIcon
              class="w-4 h-4 ml-1 cursor-pointer opacity-30"
              aria-hidden="true"
              @click="removeTag(t)"
            />
          </span>
        </div>
        
        <div class="w-full relative">
          <button
            type="button"
            name="preview"
            aria-label="preview"
            class="absolute top-2 right-1 focus:outline-none"
            @click="previewHtml"
          >
            <EyeSlashIcon
              v-if="operation.preview"
              class="w-4 h-4 opacity-40"
              aria-hidden="true"
            />
            <EyeIcon
              v-else
              class="w-4 h-4 opacity-40"
              aria-hidden="true"
            />
          </button>
          <div
            class="w-full border-none mt-1 h-64"
            :class="{ border: operation.preview }"
          >
            <label for="context">{{ $t('context') }}</label>
            <textarea
              v-if="!operation.preview"
              id="context"
              v-model.trim="formData.context"
              name="context"
              class="mt-1 w-full h-full rounded-md border-gray-300"
              required
              placeholder="markdown..."
            />
            <div
              v-else
              ref="rendedHtmlRef"
              class="mt-1 p-2 prose prose-base prose-blue overflow-y-auto w-full h-full border border-gray-300 rounded-md"
              v-html="rendedHtml"
            />
          </div>
        </div>
      </template>
      <template #footer>
        <button
          type="submit"
          name="commit"
          aria-label="commit"
          class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 font-medium text-white focus:outline-none focus:ring-1 focus:ring-offset-2 sm:ml-3 sm:w-auto active:cursor-wait bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
          @click="modelCommit(formData.id)"
        >
          {{ $t('commit') }}
        </button>
        <button
          type="button"
          name="cancle"
          aria-label="cancle"
          class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-blue-600 sm:mt-0 sm:ml-3 sm:w-auto active:cursor-wait"
          @click="onClose"
        >
          {{
            $t('cancle')
          }}
        </button>
      </template>
    </Drawer>
  </div>
</template>


<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";

import Operation from "~/components/Operation.vue";
import Action from "~/components/Action.vue";
import Pagation from "~/components/Pagation.vue";
import Confirm from "~/components/Confirm.vue";
import Drawer from "~/components/Drawer.vue";

import { instance, SERVER_URL } from "~/api";
import type { Post, Category, Item } from "~/api/request.type";
import markdownToHtml from '~/composables/markdownToHtml'
import { uploadFile } from "~/composables/upload";
import { EyeSlashIcon, EyeIcon, TrashIcon, XMarkIcon, PhotoIcon } from "@heroicons/vue/24/outline";

// 模板引用
let rendedHtmlRef = ref<HTMLElement>()
const rendedHtml = ref("")

// 模态框参数
let operation = reactive({
  modal: false,
  confirm: false,
  preview: false
})

// 分页参数
let pagation = reactive({
  page: 0,
  size: 10,
  total: 0
})

// 标签参数
let tag = ref("");

const initData: Post = {
  id: 0,
  title: '',
  cover: '',
  category: '',
  tags: [],
  context: '',
  modifyTime: ''
}
// 数据
let formData = ref<Post>(initData);

const items: Item[] = [
  {
    key: 'title',
    label: '标题'
  },
  {
    key: 'categoryId',
    label: '分类'
  }
]
let datas = ref<Array<Post>>([]);
let categories = ref<Array<Category>>([]);

onMounted(() => {
  retrieve();
});
/**
 * 设置页码
 * @param page 页码
 * @param size 大小
 */
const setPage = (page: number, size: number) => {
  pagation.page = page;
  pagation.size = size;
};
/**
 * 删除封面图
 */
const removeCover = () => {
  formData.value.cover = '';
};
/**
 * 查询列表
 */
const retrieve = async () => {
  await instance.get(SERVER_URL.posts, { params: { page: pagation.page, size: pagation.size } })
    .then(res => {
      datas.value = res.data.content
      pagation.total = res.data.totalElements
    })
};

/**
 * 查询分类
 */
const retrieveCategories = async () => {
  await instance.get(SERVER_URL.category, { params: { page: 0, size: 99 } }).then(res => {
    categories.value = res.data.content;
  })
}

/**
 * 查询信息
 */
const fetch = async (id: number) => {
  if (id && id != 0) {
    await instance.get(SERVER_URL.posts.concat(`/${id}`)).then(res => formData.value = {...res.data});
  }
};
/**
 * 添加
 */
const create = async () => {
  await instance.post(SERVER_URL.posts, {...formData.value, categoryId: formData.value.category}).then(res => {
      if (datas.value.length >= pagation.size) {
        // 删除最后一个
        datas.value.pop();
      }
      // 将结果添加到第一个
      datas.value.unshift(res.data);
    });
}
/**
 * 编辑
 * @param id 主键
 */
 const modify = async (id: number) => {
  await instance.put(SERVER_URL.posts.concat(`/${id}`), {...formData.value, categoryId: formData.value.category})
      .then(res => {
        // 将datas中修改项的历史数据删除
        datas.value = datas.value.filter(
          (item: Post) => item.id != formData.value.id
        );
        // 将结果添加到第一个
        datas.value.unshift(res.data);
      });
}
/**
 * 添加tag
 */
const addTag = (item: string) => {
  formData.value.tags.push(item)
  tag.value =  ''
};
/**
 * 删除tag
 * @param tag tag名称
 */
const removeTag = (tag: string) => {
  formData.value.tags = formData.value.tags.filter(item => item !== tag)
};
/**
 * confirm 操作
 */
const confirmOperate = () => {
  operation.confirm = true;
};
/**
 * confirm 提交
 */
const confirmCommit = async (id: number) => {
  await instance.delete(SERVER_URL.posts.concat(`/${id}`)).then(() => {
    // 将datas中修改项的历史数据删除
    datas.value = datas.value.filter(
      (item: Post) => item.id != formData.value.id
    );
    operation.confirm = false;
  });
};

const onClose = () => {
  operation.modal = false
}

/**
 * 新增/编辑：打开
 * @param id 主键
 */
const showModal = (id: number) => {
  if (id && id != 0) {
    fetch(id)
  } else {
    formData.value = initData
  }
  retrieveCategories()
  operation.modal = true;
};
/**
 * 新增/编辑：提交
 */
const modelCommit = async (id: number) => {
  if (id && id != 0) {
    modify(id)
  } else {
    create()
  }
  operation.modal = false
};
/**
 * 上传文件
 * @param files 文件
 */
const uploadImage = (event: Event) => {
  if (event && event.target) {
    let files = (event.target as HTMLInputElement).files
    if (files && files[0]) {
      uploadFile(files[0]).subscribe({
        complete: (e: any) => {
          formData.value.cover = "https://cdn.leafage.top/" + e.key
        }
      });
    }
  }

};
/**
 * 转换md为html
 */
const previewHtml = async () => {
  operation.preview = !operation.preview
  if (formData.value.context) {
    rendedHtml.value = await markdownToHtml(formData.value.context)
  }
}
</script>

<style src="highlight.js/styles/atom-one-dark.css"></style>