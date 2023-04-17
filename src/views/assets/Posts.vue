<template>
  <div class="mt-2">
    <Operation
      :datas="datas"
      :file-name="'posts'"
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
                @del-action="confirmOperate"
                @edit-action="showModal(data.id)"
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
    <Modal
      :visible="operation.modal"
    >
      <template #content>
        <div class="grid grid-cols-12 gap-4">
          <div class="col-span-12 md:col-span-8">
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
          <div class="row-span-3 col-span-12 sm:col-span-4">
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
          <div class="col-span-12 md:col-span-4">
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
          <div class="col-span-12 md:col-span-4">
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
        <div class="grid grid-cols-12 mt-2">
          <div class="col-span-12 relative">
            <label for="context">{{ $t('context') }}</label>
            <button
              type="button"
              name="preview"
              aria-label="preview"
              class="top-3 right-1 absolute focus:outline-none"
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
              class="grid grid-flow-row grid-rows-1 grid-cols-1 border-none mt-1 h-52 md:h-96"
              :class="{ border: operation.preview }"
            >
              <textarea
                v-if="!operation.preview"
                id="context"
                v-model.trim="formData.context"
                name="context"
                class="mt-1 w-full rounded-md border-gray-300"
                required
                placeholder="markdown..."
              />
              <div
                v-else
                ref="rendedHtmlRef"
                class="mt-1 p-2 prose prose-base prose-blue max-w-none overflow-y-auto w-full border border-gray-300 rounded-md"
                v-html="rendedHtml"
              />
            </div>
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
    </Modal>
    <Modal
      :visible="view.isShow"
      :is-show-close="true"
      @close-action="previewOperation"
    >
      <img
        :src="view.url"
        alt="preview"
        class="rounded-md w-full h-full"
        width="640"
        height="427"
      >
    </Modal>
  </div>
</template>


<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";

import Operation from "~/components/Operation.vue";
import Action from "~/components/Action.vue";
import Pagation from "~/components/Pagation.vue";
import Confirm from "~/components/Confirm.vue";
import Modal from "~/components/Modal.vue";

import { instance, SERVER_URL } from "~/api";
import type { Post, Category } from "~/api/request.type";
import markdownToHtml from '~/composables/markdownToHtml'
import { uploadFile } from "~/composables/upload";
import { EyeSlashIcon, EyeIcon, TrashIcon, XMarkIcon } from "@heroicons/vue/24/outline";

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

let datas = ref<Array<Post>>([]);
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
const retrieveCategory = async () => {
  await instance.get(SERVER_URL.category, { params: { page: 0, size: 99 } }).then(res => {
    categories.value = res.data.content;
  })
}

/**
 * 查询信息
 */
const fetch = async () => {
  if (formData && formData.value.id && formData.value.id != 0) {
    await instance.get(SERVER_URL.posts.concat(`/${formData.value.id}`)).then(res => {
      formData.value = res.data;
    });
  }
};
/**
 * 添加
 */
const create = async () => {
  await instance.post(SERVER_URL.posts, formData).then(res => {
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
  await instance.put(SERVER_URL.posts.concat(`/${id}`), formData.value)
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
const addTag = (tag: string) => {
  formData.value.tags.push(tag)
};
/**
 * 删除tag
 * @param tag tag名称
 */
const removeTag = (tag: string) => {
  formData.value.tags.filter(item => item !== tag)
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
    Promise.all([
      retrieveCategory(),
      fetch(),
    ]);
  } else {
    formData.value = initData
  }
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
  addImgClickEvent()
  if (formData.value.context) {
    rendedHtml.value = await markdownToHtml(formData.value.context)
  }
}

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
            if (src) {
              previewOperation(true, src);
            }
          };
        }
      }, 600)
    }
  }
}
/**
 * img预览
 * @param show 是否展示
 * @param id 主键
 */
const previewOperation = (show: boolean, url: string) => {
  if (show) {
    view.url = url
  }
  view.isShow = show
}
</script>

<style src="highlight.js/styles/atom-one-dark.css"></style>