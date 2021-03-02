<template>
  <div class="col-span-12 mt-2">
    <div class="flex items-center h-10">
      <h2 class="text-lg font-medium">General Report</h2>
      <a href="" class="ml-auto flex items-center text-blue-800">
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
          class="feather feather-rotate-cw mr-3"
        >
          <polyline points="23 4 23 10 17 10"></polyline>
          <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
        </svg>
        Reload Data
      </a>
    </div>
    <div class="grid grid-cols-12 gap-6 my-2">
      <div class="col-span-12 sm:col-span-6 xl:col-span-3">
        <div class="zoom-in">
          <div class="shadow-sm rounded-md bg-white p-5">
            <div class="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-shopping-cart text-blue-800"
              >
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path
                  d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"
                ></path>
              </svg>
              <div class="ml-auto">
                <div
                  class="flex items-center rounded-full px-2 py-1 text-xs text-white cursor-pointer"
                  style="background-color: #91c714"
                  title="33% Higher than last month"
                >
                  33%
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
                    class="feather feather-arrow-up"
                  >
                    <line x1="12" y1="19" x2="12" y2="5"></line>
                    <polyline points="5 12 12 5 19 12"></polyline>
                  </svg>
                </div>
              </div>
            </div>
            <div class="text-3xl font-bold leading-8 mt-6">4.510</div>
            <div class="text-base text-gray-600 mt-1">Item Sales</div>
          </div>
        </div>
      </div>
      <div class="col-span-12 sm:col-span-6 xl:col-span-3">
        <div class="zoom-in">
          <div class="shadow-sm rounded-md bg-white p-5">
            <div class="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-credit-card text-yellow-500"
              >
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                <line x1="1" y1="10" x2="23" y2="10"></line>
              </svg>
              <div class="ml-auto">
                <div
                  class="flex items-center rounded-full px-2 py-1 text-xs text-white bg-red-600 cursor-pointer"
                  title="2% Lower than last month"
                >
                  2%
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
                    class="feather feather-arrow-down"
                  >
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <polyline points="19 12 12 19 5 12"></polyline>
                  </svg>
                </div>
              </div>
            </div>
            <div class="text-3xl font-bold leading-8 mt-6">3.521</div>
            <div class="text-base text-gray-600 mt-1">New Orders</div>
          </div>
        </div>
      </div>
      <div class="col-span-12 sm:col-span-6 xl:col-span-3">
        <div class="relative zoom-in">
          <div class="shadow-sm rounded-md bg-white p-5">
            <div class="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-monitor text-purple-500"
              >
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
              <div class="ml-auto">
                <div
                  class="flex items-center rounded-full px-2 py-1 text-xs text-white cursor-pointer"
                  style="background-color: #91c714"
                  title="12% Higher than last month"
                >
                  12%
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
                    class="feather feather-arrow-up"
                  >
                    <line x1="12" y1="19" x2="12" y2="5"></line>
                    <polyline points="5 12 12 5 19 12"></polyline>
                  </svg>
                </div>
              </div>
            </div>
            <div class="text-3xl font-bold leading-8 mt-6">2.145</div>
            <div class="text-base text-gray-600 mt-1">Total Products</div>
          </div>
        </div>
      </div>
      <div class="col-span-12 sm:col-span-6 xl:col-span-3 -y">
        <div class="relative zoom-in">
          <div class="shadow-sm rounded-md bg-white p-5">
            <div class="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-user text-green-600"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <div class="ml-auto">
                <div
                  class="flex items-center rounded-full px-2 py-1 text-xs text-white cursor-pointer"
                  style="background-color: #91c714"
                  title="22% Higher than last month"
                >
                  22%
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-arrow-up w-4 h-4"
                  >
                    <line x1="12" y1="19" x2="12" y2="5"></line>
                    <polyline points="5 12 12 5 19 12"></polyline>
                  </svg>
                </div>
              </div>
            </div>
            <div class="text-3xl font-bold leading-8 mt-6">152.000</div>
            <div class="text-base text-gray-600 mt-1">Unique Visitor</div>
          </div>
        </div>
      </div>
      <div class="col-span-12 sm:col-span-6">
        <div class="relative zoom-in">
          <div class="shadow-sm rounded-md bg-white p-5">
            <div ref="barChartRef" class="w-full h-80"></div>
          </div>
        </div>
      </div>
      <div class="col-span-12 sm:col-span-6">
        <div class="relative zoom-in">
          <div class="shadow-sm rounded-md bg-white p-5">
            <div ref="lineChartRef" class="w-full h-80"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import echarts from "../../plugins/echarts";

import instance from "../../api";
import SERVER_URL from "../../api/request";

export default defineComponent({
  name: "Report",

  setup() {
    const barChartRef = ref();
    const lineChartRef = ref();

    const barchartInit = () => {
      const barChart = echarts.init(barChartRef.value);
      barChart.resize();
      instance.get(SERVER_URL.category).then((res) => {
        barChart.setOption({
          legend: {},
          tooltip: {},
          dataset: {
            source: [
              ["product", "Add", "Edit", "Del"],
              ["Sun", 4, 8, 0],
              ["Mon", 9, 4, 1],
              ["Tue", 4, 2, 2],
              ["Wes", 7, 9, 1],
              ["Thu", 7, 9, 1],
              ["Fri", 7, 9, 1],
              ["Sat", 7, 9, 1],
            ],
          },
          xAxis: { type: "category" },
          yAxis: {},
          // Declare several bar series, each will be mapped
          // to a column of dataset.source by default.
          series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }],
        });
      });
    };

    const linechartInit = () => {
      const lineChart = echarts.init(lineChartRef.value);
      lineChart.resize();
      instance.get(SERVER_URL.category).then((res) => {
        lineChart.setOption({
          tooltip: {
            trigger: "axis",
          },
          legend: {
            data: ["Add", "Edit", "Del"],
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
          },
          toolbox: {
            feature: {
              saveAsImage: {},
            },
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: ["Sun", "Mon", "Tue", "Wes", "Thu", "Fri", "Sat"],
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              name: "Add",
              type: "line",
              stack: "总量",
              data: [120, 132, 101, 134, 90, 230, 210],
            },
            {
              name: "Edit",
              type: "line",
              stack: "总量",
              data: [220, 182, 191, 234, 290, 330, 310],
            },
            {
              name: "Del",
              type: "line",
              stack: "总量",
              data: [150, 232, 201, 154, 190, 330, 410],
            },
          ],
        });
      });
    };

    onMounted(() => {
      setTimeout(() => {
        barchartInit();
        linechartInit();
      }, 100);
    });

    return {
      barChartRef,
      lineChartRef,
    };
  },
});
</script>