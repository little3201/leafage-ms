<template>
  <div class="col-span-12 mt-2 overflow-scroll" style="height: calc(100vh - 96px)">
    <div class="inline-flex items-center h-10">
      <h2 class="text-lg font-medium">General Report</h2>
      <a href class="ml-4 inline-flex items-center text-blue-800">
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
      </a>
    </div>
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-12 sm:col-span-6 xl:col-span-3">
        <div class="shadow-sm rounded-md bg-white p-4 relative">
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
              <use :xlink:href="'/svg/feather-sprite.svg#' + 'eye'" />
            </svg>
            <div class="ml-auto">
              <div
                class="flex items-center rounded-full px-2 py-1 text-xs text-white cursor-pointer"
                style="background-color: #91c714"
                title="viewed higher than last month"
              >
                {{ data.overViewed }}%
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
                  <use :xlink:href="'/svg/feather-sprite.svg#' + 'arrow-up'" />
                </svg>
              </div>
            </div>
            <div class="absolute bottom-2 inset-x-4 opacity-50">
              <canvas id="viewedChart" ref="viewedChart" height="100"></canvas>
            </div>
          </div>
          <h2 class="text-3xl font-bold leading-8 mt-6" v-text="data.viewed"></h2>
          <div class="text-base text-gray-600 mt-1">Total Viewed</div>
        </div>
      </div>
      <div class="col-span-12 sm:col-span-6 xl:col-span-3">
        <div class="shadow-sm rounded-md bg-white p-4 relative">
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
              <use :xlink:href="'/svg/feather-sprite.svg#' + 'message-square'" />
            </svg>
            <div class="ml-auto">
              <div
                class="flex items-center rounded-full px-2 py-1 text-xs text-white bg-red-600 cursor-pointer"
                title="2% Lower than last month"
              >
                {{ data.overComment || 0 }}%
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
                  <use :xlink:href="'/svg/feather-sprite.svg#' + 'arrow-down'" />
                </svg>
              </div>
            </div>
            <div class="absolute bottom-2 inset-x-4 opacity-50">
              <canvas id="commentChart" ref="commentChart" height="100"></canvas>
            </div>
          </div>
          <h2 class="text-3xl font-bold leading-8 mt-6" v-text="data.comment"></h2>
          <div class="text-base text-gray-600 mt-1">Total Comments</div>
        </div>
      </div>
      <div class="col-span-12 sm:col-span-6 xl:col-span-3">
        <div class="shadow-sm rounded-md bg-white p-4 relative">
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
              <use :xlink:href="'/svg/feather-sprite.svg#' + 'heart'" />
            </svg>
            <div class="ml-auto">
              <div
                class="flex items-center rounded-full px-2 py-1 text-xs text-white cursor-pointer"
                style="background-color: #91c714"
                title="12% Higher than last month"
              >
                {{ data.overLikes || 0 }}%
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
                  <use :xlink:href="'/svg/feather-sprite.svg#' + 'arrow-up'" />
                </svg>
              </div>
            </div>
            <div class="absolute bottom-2 inset-x-4 opacity-50">
              <canvas id="likesChart" ref="likesChart" height="100"></canvas>
            </div>
          </div>
          <h2 class="text-3xl font-bold leading-8 mt-6" v-text="data.likes"></h2>
          <div class="text-base text-gray-600 mt-1">Total Likes</div>
        </div>
      </div>
      <div class="col-span-12 sm:col-span-6 xl:col-span-3 -y">
        <div class="relative zoom-in">
          <div class="shadow-sm rounded-md bg-white p-4">
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
                <use :xlink:href="'/svg/feather-sprite.svg#' + 'users'" />
              </svg>
              <div class="ml-auto">
                <div
                  class="flex items-center rounded-full px-2 py-1 text-xs text-white cursor-pointer"
                  style="background-color: #91c714"
                  title="22% Higher than last month"
                >
                  {{ data.overVisitor || 0 }}%
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
                    <use :xlink:href="'/svg/feather-sprite.svg#' + 'arrow-up'" />
                  </svg>
                </div>
              </div>
              <div class="absolute bottom-2 inset-x-4 opacity-50">
                <canvas id="visitorChart" ref="visitorChart" height="100"></canvas>
              </div>
            </div>
            <h2 class="text-3xl font-bold leading-8 mt-6" v-text="data.visitor || 0"></h2>
            <div class="text-base text-gray-600 mt-1">Visitors</div>
          </div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-12 gap-4 my-4">
      <div class="col-span-12 md:col-span-6">
        <div class="shadow-sm rounded-md bg-white p-4">
          <canvas id="doughnutChart" ref="doughnutChart"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { createDoughnutChart, createMiniChart } from "../../plugins/char";

import instance from "../../api";
import SERVER_URL from "../../api/request";

// chart
const doughnutChart = ref();
const viewedChart = ref();
const commentChart = ref();
const likesChart = ref();
const visitorChart = ref();
// data
const data = ref({});
// posts statistics
const postsDatas = ref<Array<Number>>([]);
const postsLabels = ref<Array<String>>([]);
// viewed statistics
const labels = ref<Array<String>>([]);
const viewedDatas = ref<Array<Number>>([]);
// comment statistics
const commentDatas = ref<Array<Number>>([]);
// likes statistics
const likesDatas = ref<Array<Number>>([]);
// visitor statistics
const visitorDatas = ref<Array<Number>>([]);

// 请求最新统计数据
const fetch = async () => {
  await instance.get(SERVER_URL.statistics.concat("/viewed")).then((res) => {
    data.value = res.data;
  });
};
// 请求七天内的统计数据
const retrieve = async () => {
  await instance
    .get(SERVER_URL.statistics, { params: { page: 0, size: 7 } })
    .then((res) => {
      res.data.forEach((item: any) => {
        labels.value.unshift(item.date);
        viewedDatas.value.unshift(item.overViewed);

        commentDatas.value.unshift(item.overCommnet);

        likesDatas.value.unshift(item.overLikes);

        visitorDatas.value.unshift(item.overVisitor);
      });
    });
};

const category = async () => {
  await instance
    .get(SERVER_URL.category, { params: { page: 0, size: 10 } })
    .then((res) => {
      res.data.forEach((item: any) => {
        postsLabels.value.unshift(item.alias);
        postsDatas.value.unshift(item.count);
      });
    });
};

const initData = async () => {
  await Promise.all([fetch(), retrieve(), category()]).then(() => {
    createMiniChart(viewedChart.value, labels.value, viewedDatas.value);
    createMiniChart(likesChart.value, labels.value, likesDatas.value);
    createMiniChart(commentChart.value, labels.value, commentDatas.value);
    createMiniChart(visitorChart.value, labels.value, visitorDatas.value);
    createDoughnutChart(
      doughnutChart.value,
      postsLabels.value,
      postsDatas.value
    );
  });
};

onMounted(() => {
  initData();
});
</script>