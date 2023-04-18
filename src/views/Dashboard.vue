<template>
  <div class="col-span-12 sm-d-h overflow-auto">
    <div class="inline-flex items-center my-3">
      <h2 class="text-lg font-medium">
        {{ $t('statitics') }}
      </h2>
      <button
        type="button"
        name="reload"
        aria-label="reload"
        class="ml-4 inline-flex items-center text-blue-600 focus:outline-none active:cursor-wait"
        @click="refresh"
      >
        <ArrowPathIcon
          class="w-5 h-5 mr-2"
          aria-hidden="true"
        />
        {{ $t('reload') }}
      </button>
    </div>
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-12 sm:col-span-6 xl:col-span-3">
        <div class="shadow-sm hover:shadow-md rounded-md bg-white p-4 relative">
          <div class="flex items-center">
            <EyeIcon
              class="w-7 h-7 mr-1 text-blue-600"
              aria-hidden="true"
            />
            <span class="text-base text-gray-600 ml-1 mr-auto">{{ $t('viewed') }}</span>
            <div class="flex flex-row-reverse">
              <div
                class="inline-flex items-center justify-end -mt-4 text-lime-500 pr-1 text-sm"
                title="viewed"
              >
                <PlusIcon
                  class="w-4 h-4"
                  aria-hidden="true"
                />
                {{ overData.viewed }}
              </div>
              <h2
                class="text-2xl font-bold leading-8 mr-2"
                v-text="total.viewed"
              />
            </div>
          </div>
          <div class="absolute inset-4 top-10 opacity-50 h-12">
            <LineChart
              :labels="viewed.labels"
              :label="viewed.label"
              :title="viewed.title"
              :data="viewed.data"
              :color="viewed.color"
              :options="viewed.options"
            />
          </div>
        </div>
      </div>
      <div class="col-span-12 sm:col-span-6 xl:col-span-3">
        <div class="shadow-sm hover:shadow-md rounded-md bg-white p-4 relative">
          <div class="flex items-center">
            <ChatBubbleLeftEllipsisIcon
              class="w-7 h-7 mr-1 text-yellow-600"
              aria-hidden="true"
            />
            <span class="text-base text-gray-600 ml-1 mr-auto">{{ $t('comments') }}</span>
            <div class="flex flex-row-reverse">
              <div
                class="inline-flex items-center justify-end -mt-4 text-lime-500 pr-1 text-sm"
                title="viewed"
              >
                <PlusIcon
                  class="w-4 h-4"
                  aria-hidden="true"
                />
                {{ overData.comments }}
              </div>
              <h2
                class="text-2xl font-bold leading-8 mr-2"
                v-text="total.comments"
              />
            </div>
          </div>
          <div class="absolute inset-4 top-10 opacity-50 h-12">
            <LineChart
              :labels="comments.labels"
              :label="comments.label"
              :title="comments.title"
              :data="comments.data"
              :color="comments.color"
              :options="comments.options"
            />
          </div>
        </div>
      </div>
      <div class="col-span-12 sm:col-span-6 xl:col-span-3">
        <div class="shadow-sm hover:shadow-md rounded-md bg-white p-4 relative">
          <div class="flex items-center">
            <HandThumbUpIcon
              class="w-7 h-7 mr-1 text-purple-600"
              aria-hidden="true"
            />
            <span class="text-base text-gray-600 ml-1 mr-auto">{{ $t('likes') }}</span>
            <div class="flex flex-row-reverse">
              <div
                class="inline-flex items-center justify-end -mt-4 text-lime-500 pr-1 text-sm"
                title="viewed"
              >
                <PlusIcon
                  class="w-4 h-4"
                  aria-hidden="true"
                />
                {{ overData.likes }}
              </div>
              <h2
                class="text-2xl font-bold leading-8 mr-2"
                v-text="total.likes"
              />
            </div>
          </div>
        </div>
        <div class="absolute inset-4 top-10 opacity-50 h-12">
          <LineChart
            :labels="likes.labels"
            :label="likes.label"
            :title="likes.title"
            :data="likes.data"
            :color="likes.color"
            :options="likes.options"
          />
        </div>
      </div>
      <div class="col-span-12 sm:col-span-6 xl:col-span-3 -y">
        <div class="shadow-sm hover:shadow-md rounded-md bg-white p-4 relative">
          <div class="flex items-center">
            <CloudArrowDownIcon
              class="w-7 h-7 mr-1 text-green-600"
              aria-hidden="true"
            />
            <span class="text-base text-gray-600 ml-1 mr-auto">{{ $t('downloads') }}</span>
            <div class="flex flex-row-reverse">
              <div
                class="inline-flex items-center justify-end -mt-4 text-lime-500 pr-1 text-sm"
                title="viewed"
              >
                <PlusIcon
                  class="w-4 h-4"
                  aria-hidden="true"
                />
                {{ overData.downloads }}
              </div>
              <h2 class="text-2xl font-bold leading-8 mr-2">
                {{ total.downloads }}
              </h2>
            </div>
          </div>
          <div class="absolute inset-4 top-10 opacity-50 h-12">
            <LineChart
              :labels="downloads.labels"
              :label="downloads.label"
              :title="downloads.title"
              :data="downloads.data"
              :color="downloads.color"
              :options="downloads.options"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-12 gap-4 my-4">
      <div class="col-span-12 md:col-span-6">
        <div class="relative shadow-sm rounded-md bg-white p-4">
          <DoughnutChart
            :labels="categoryChart.labels"
            :label="categoryChart.label"
            :title="categoryChart.title"
            :data="categoryChart.data"
            :options="categoryChart.options"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";

import { instance, SERVER_URL } from "~/api";
import { Category, Statistics } from "~/api/request.type";

import LineChart from "~/components/LineChart.vue";
import DoughnutChart from "~/components/DoughnutChart.vue";

import { ArrowPathIcon, EyeIcon, ChatBubbleLeftEllipsisIcon, HandThumbUpIcon, CloudArrowDownIcon, PlusIcon } from '@heroicons/vue/24/outline'

// data
let total = ref<Statistics>({
  viewed: 0,
  likes: 0,
  comments: 0,
  downloads: 0
})

let overData = ref<Statistics>({
  viewed: 1212,
  likes: 2320,
  comments: 293,
  downloads: 2323
})

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    filler: {
      propagate: false,
    },
  },
  elements: {
    point: {
      radius: 0,
      hoverRadius: 2
    }
  },
  interaction: {
    intersect: false,
  },
  scales: {
    x: {
      display: false
    },
    y: {
      display: false
    }
  }
}

const viewed = reactive({
  labels: new Array<string>(),
  label: '访问量',
  title: '访问量统计',
  data: new Array<number>(),
  color: '#2563ebcc',
  options: options
})

const likes = reactive({
  labels: new Array<string>(),
  label: '点赞数',
  title: '点赞数统计',
  data: new Array<number>(),
  color: '#9333eacc',
  options: options
})

const comments = reactive({
  labels: new Array<string>(),
  label: '评论数',
  title: '评论数统计',
  data: new Array<number>(),
  color: '#ca8a04cc',
  options: options
})

const downloads = reactive({
  labels: new Array<string>(),
  label: '下载量',
  title: '下载量统计',
  data: new Array<number>(),
  color: '#16a34acc',
  options: options
})

const categoryChart = reactive({
  labels: new Array<string>(),
  label: '帖子数',
  title: '帖子分类统计',
  data: new Array<number>(),
  options: {}
})

onMounted(() => {
  initData();
})
/**
 * 初始化请求数据
 */
const initData = async () => {
  await Promise.all([
    retrieveCategories(),
    retreiveStatistics(),
    fetchTotal()])
};
/**
 * 查询周统计
 */
const retreiveStatistics = async () => {
  await instance.get(SERVER_URL.statistics, { params: { page: 0, size: 7 } }).then(res => {
    let datas: Array<Statistics> = res.data.content;
    // chart data
    let labels = new Array<string>()
    let viewedData = new Array<number>()
    let commentsData = new Array<number>()
    let likesData = new Array<number>()
    let downloadsData = new Array<number>()


    datas.forEach(item => {
      // data
      viewedData.push(item.viewed);
      likesData.push(item.likes);
      commentsData.push(item.comments);
      downloadsData.push(item.downloads)
    })

    viewed.labels = labels
    viewed.data = viewedData

    likes.labels = labels
    likes.data = likesData

    comments.labels = labels
    comments.data = commentsData

    downloads.labels = labels
    downloads.data = downloadsData
  })
}
/**
 * 刷新数据
 */
const refresh = () => {
  fetchTotal()
}
/**
 * 总量统计
 */
const fetchTotal = async () => {
  await instance.get(SERVER_URL.statistics.concat("/total"))
    .then(res => total.value = res.data)
}
/**
 * 查询分类
 */
const retrieveCategories = async () => {
  await instance.get(SERVER_URL.category, { params: { page: 0, size: 99 } })
    .then(res => {
      let categories: Array<Category> = res.data.content
      let labels = Array<string>()
      let datas = Array<number>()
      // chart data
      categories.forEach(item => {
        labels.push(item.categoryName)
        datas.push(item.count)
      })

      categoryChart.labels = labels
      categoryChart.data = datas
    })
}

</script>