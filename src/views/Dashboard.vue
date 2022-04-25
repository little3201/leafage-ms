<template>
  <div class="col-span-12 sm-d-h overflow-auto">
    <div class="inline-flex items-center my-3">
      <h2 class="text-lg font-medium">
        {{ $t('statitics') }}
      </h2>
      <button
        type="button"
        class="ml-4 inline-flex items-center text-blue-600 focus:outline-none active:cursor-wait"
        @click="initData"
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
          <use :href="'/svg/feather-sprite.svg#' + 'rotate-cw'" />
        </svg>
        {{ $t('reload') }}
      </button>
    </div>
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-12 sm:col-span-6 xl:col-span-3">
        <div class="shadow-sm hover:shadow-md rounded-md bg-white p-4 relative">
          <div class="flex items-center">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="text-blue-600"
            >
              <use :href="'/svg/feather-sprite.svg#' + 'eye'" />
            </svg>
            <span class="text-base text-gray-600 ml-2">{{ $t('viewed') }}</span>
            <div class="ml-auto">
              <div
                class="flex items-center rounded-full px-2 py-1 text-sm text-white cursor-pointer"
                :class="{ 'bg-lime-500': latest.overViewed > 0, 'bg-red-600': latest.overViewed <= 0 }"
                title="overViewed"
              >
                {{ latest.overViewed }}%
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <use
                    v-if="latest.overViewed > 0"
                    :href="'/svg/feather-sprite.svg#' + 'arrow-up'"
                  />
                  <use
                    v-else
                    :href="'/svg/feather-sprite.svg#' + 'arrow-down'"
                  />
                </svg>
              </div>
            </div>
            <div class="absolute inset-4 top-10 opacity-50">
              <canvas
                id="overViewed"
                ref="overViewedRef"
                aria-label="over-viewed"
                role="img"
              />
            </div>
          </div>
          <h2
            class="text-3xl font-bold leading-8 mt-6"
            v-text="latest.viewed"
          />
        </div>
      </div>
      <div class="col-span-12 sm:col-span-6 xl:col-span-3">
        <div class="shadow-sm hover:shadow-md rounded-md bg-white p-4 relative">
          <div class="flex">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="text-yellow-600"
            >
              <use :href="'/svg/feather-sprite.svg#' + 'message-square'" />
            </svg>

            <span class="text-base text-gray-600 ml-2">{{ $t('comments') }}</span>
            <div class="ml-auto">
              <div
                class="flex items-center rounded-full px-2 py-1 text-sm text-white cursor-pointer"
                :class="{ 'bg-lime-500': latest.overComments > 0, 'bg-red-600': latest.overComments <= 0 }"
                title="overComment"
              >
                {{ latest.overComments }}%
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <use
                    v-if="latest.overComments > 0"
                    :href="'/svg/feather-sprite.svg#' + 'arrow-up'"
                  />
                  <use
                    v-else
                    :href="'/svg/feather-sprite.svg#' + 'arrow-down'"
                  />
                </svg>
              </div>
            </div>
            <div class="absolute inset-4 top-10 opacity-50">
              <canvas
                id="overComment"
                ref="overCommentRef"
                aria-label="over-comments"
                role="img"
              />
            </div>
          </div>
          <h2
            class="text-3xl font-bold leading-8 mt-6"
            v-text="latest.comments"
          />
        </div>
      </div>
      <div class="col-span-12 sm:col-span-6 xl:col-span-3">
        <div class="shadow-sm hover:shadow-md rounded-md bg-white p-4 relative">
          <div class="flex">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="text-purple-600"
            >
              <use :href="'/svg/feather-sprite.svg#' + 'thumbs-up'" />
            </svg>

            <span class="text-base text-gray-600 ml-2">{{ $t('likes') }}</span>
            <div class="ml-auto">
              <div
                class="flex items-center rounded-full px-2 py-1 text-xs text-white cursor-pointer"
                :class="{ 'bg-lime-500': latest.overLikes > 0, 'bg-red-600': latest.overLikes <= 0 }"
                title="overLikes"
              >
                {{ latest.overLikes }}%
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <use
                    v-if="latest.overLikes > 0"
                    :href="'/svg/feather-sprite.svg#' + 'arrow-up'"
                  />
                  <use
                    v-else
                    :href="'/svg/feather-sprite.svg#' + 'arrow-down'"
                  />
                </svg>
              </div>
            </div>
            <div class="absolute inset-4 top-10 opacity-50">
              <canvas
                id="overLikes"
                ref="overLikesRef"
                aria-label="over-likes"
                role="img"
              />
            </div>
          </div>
          <h2
            class="text-3xl font-bold leading-8 mt-6"
            v-text="latest.likes"
          />
        </div>
      </div>
      <div class="col-span-12 sm:col-span-6 xl:col-span-3 -y">
        <div class="shadow-sm hover:shadow-md rounded-md bg-white p-4 relative">
          <div class="flex">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="text-green-600"
            >
              <use :href="'/svg/feather-sprite.svg#' + 'book'" />
            </svg>

            <span class="text-base text-gray-600 ml-2">{{ $t('downloads') }}</span>
            <div class="ml-auto">
              <div
                class="flex items-center rounded-full px-2 py-1 text-xs text-white bg-red-600 cursor-pointer"
                title="overDownloads"
              >
                {{ 0 }}%
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <use
                    v-if="latest.overLikes"
                    :href="'/svg/feather-sprite.svg#' + 'arrow-up'"
                  />
                  <use
                    v-else
                    :href="'/svg/feather-sprite.svg#' + 'arrow-down'"
                  />
                </svg>
              </div>
            </div>
            <div class="absolute inset-4 top-10 opacity-50">
              <canvas
                id="overDownloads"
                ref="overDownloadsRef"
                aria-label="over-downloads"
                role="img"
              />
            </div>
          </div>
          <h2 class="text-3xl font-bold leading-8 mt-6">
            0
          </h2>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-12 gap-4 my-4">
      <div class="col-span-12 md:col-span-6">
        <div class="relative shadow-sm rounded-md bg-white p-4 h-full">
          <canvas
            id="viewed"
            ref="viewedRef"
            aria-label="viewed"
            role="img"
            height="100"
          />
        </div>
      </div>
      <div class="col-span-12 md:col-span-6">
        <div class="bg-white p-4 shadow-sm rounded-md">
          <div class="overflow-auto">
            <table
              class="w-full overflow-ellipsis whitespace-nowrap"
              aria-label="category"
            >
              <thead>
                <tr class="bg-gray-100 uppercase text-sm">
                  <th
                    scope="col"
                    class="px-3 py-2 sm:py-3 text-left"
                  >
                    {{ $t('no') }}
                  </th>
                  <th
                    scope="col"
                    class="px-3"
                  >
                    {{ $t('content') }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(comment, index) in comments"
                  :key="index"
                  class="text-center bg-white border-y-4 lg:border-y-6 first:border-t-0 last:border-b-0 border-gray-100 hover:bg-gray-50 hover:text-blue-600"
                >
                  <td class="px-3 py-2 sm:py-3 text-left">
                    {{ index + 1 }}
                  </td>

                  <td class="px-3 max-w-sm truncate">
                    <a
                      :href="`https://www.leafage.top/posts/detail/${comment.posts}`"
                      target="_blank"
                      class="font-medium hover:underline"
                    >{{ comment.content }}</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { createBarChart, createMiniChart } from "@/plugins/chart";

import { instance, SERVER_URL } from "@/api";
import type { Comment, Statistics } from "@/api/request.type";

// data
let comments = ref<Array<Comment>>([])
let datas = ref<Array<Statistics>>([])
const latest = computed(() => datas.value[0] || {});

// ref
const viewedRef = ref();
const overViewedRef = ref();
const overCommentRef = ref();
const overLikesRef = ref();
const overDownloadsRef = ref();

onMounted(() => {
  initData();
})
/**
 * 初始化请求数据
 */
const initData = async (): Promise<void> => {
  await Promise.all([
    instance.get(SERVER_URL.statistics, { params: { page: 0, size: 8 } }).then(res => {
      datas.value = res.data.content;
      construceChart()
    }),
    instance.get(SERVER_URL.comment, { params: { page: 0, size: 10 } })
      .then(res => comments.value = res.data.content)])
};

const construceChart = (): void => {
  let obj = {
    labels: Array<string>(),
    viewed: Array<number>(),
    likes: Array<number>(),
    comments: Array<number>(),
    overViewed: Array<number>(),
    overLikes: Array<number>(),
    overComments: Array<number>(),
    overDownloads: Array<number>()
  }
  for (let i = 0; i < datas.value.length - 1; i++) {
    obj.labels.unshift(datas.value[i].date.toLocaleDateString());
    // data
    obj.viewed.unshift(datas.value[i].viewed - datas.value[i + 1].viewed);
    obj.likes.unshift(datas.value[i].likes - datas.value[i + 1].likes);
    obj.comments.unshift(datas.value[i].comments - datas.value[i + 1].comments);
    // over data
    obj.overViewed.unshift(datas.value[i].overViewed)
    obj.overComments.unshift(datas.value[i].overComments);
    obj.overLikes.unshift(datas.value[i].overLikes);
    obj.overDownloads.unshift(0)
  }

  let labels = obj.labels
  // 浏览量统计
  createMiniChart(overViewedRef.value, labels, obj.overViewed, "rgba(37, 99, 235, 0.8)");
  // 评论数统计
  createMiniChart(overCommentRef.value, labels, obj.overComments, "rgba(217, 119, 6, 0.8)");
  // 喜欢数统计
  createMiniChart(overLikesRef.value, labels, obj.overLikes, "rgba(124, 58, 237, 0.8)");
  // 喜欢数统计
  createMiniChart(overDownloadsRef.value, labels, obj.overDownloads, "rgba(22, 163, 74, 0.8)");
  // 帖子分类统计
  createBarChart(viewedRef.value, labels, obj.viewed, obj.likes, obj.comments);
}
</script>