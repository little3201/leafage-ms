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
              class="w-7 h-7 mr-2 text-blue-600"
              aria-hidden="true"
            />
            <span class="text-base text-gray-600 ml-2">{{ $t('viewed') }}</span>
            <div
              class="ml-auto flex items-center rounded-full px-2 py-1 text-sm text-white cursor-pointer"
              :class="overViewed > 0 ? 'bg-lime-500' : 'bg-red-600'"
              title="overViewed"
            >
              {{ overViewed }}%
              <ArrowUpIcon
                v-if="overViewed > 0"
                class="w-4 h-4"
                aria-hidden="true"
              />
              <ArrowDownIcon
                v-else
                class="w-4 h-4"
                aria-hidden="true"
              />
            </div>
            <LineChart
              :labels="viewed.labels"
              :label="viewed.label"
              :title="viewed.title"
              :data="viewed.data"
              :color="viewed.color"
              :options="viewed.options"
            />
          </div>
          <h2
            class="text-3xl font-bold leading-8 mt-6"
            v-text="total.viewed"
          />
        </div>
      </div>
      <div class="col-span-12 sm:col-span-6 xl:col-span-3">
        <div class="shadow-sm hover:shadow-md rounded-md bg-white p-4 relative">
          <div class="flex">
            <ChatBubbleLeftEllipsisIcon
              class="w-7 h-7 mr-2 text-yellow-600"
              aria-hidden="true"
            />
            <span class="text-base text-gray-600 ml-2">{{ $t('comments') }}</span>
            <div
              class="ml-auto flex items-center rounded-full px-2 py-1 text-sm text-white cursor-pointer"
              :class="overComments > 0 ? 'bg-lime-500' : 'bg-red-600'"
              title="overComment"
            >
              {{ overComments }}%
              <ArrowUpIcon
                v-if="overViewed > 0"
                class="w-4 h-4"
                aria-hidden="true"
              />
              <ArrowDownIcon
                v-else
                class="w-4 h-4"
                aria-hidden="true"
              />
            </div>
            <LineChart
              :labels="comments.labels"
              :label="comments.label"
              :title="comments.title"
              :data="comments.data"
              :color="comments.color"
              :options="comments.options"
            />
          </div>
          <h2
            class="text-3xl font-bold leading-8 mt-6"
            v-text="total.comments"
          />
        </div>
      </div>
      <div class="col-span-12 sm:col-span-6 xl:col-span-3">
        <div class="shadow-sm hover:shadow-md rounded-md bg-white p-4 relative">
          <div class="flex">
            <HandThumbUpIcon
              class="w-7 h-7 mr-2 text-purple-600"
              aria-hidden="true"
            />
            <span class="text-base text-gray-600 ml-2">{{ $t('likes') }}</span>
            <div
              class="ml-auto flex items-center rounded-full px-2 py-1 text-xs text-white cursor-pointer"
              :class="overLikes > 0 ? 'bg-lime-500' : 'bg-red-600'"
              title="overLikes"
            >
              {{ overLikes }}%
              <ArrowUpIcon
                v-if="overViewed > 0"
                class="w-4 h-4"
                aria-hidden="true"
              />
              <ArrowDownIcon
                v-else
                class="w-4 h-4"
                aria-hidden="true"
              />
            </div>
            <LineChart
              :labels="likes.labels"
              :label="likes.label"
              :title="likes.title"
              :data="likes.data"
              :color="likes.color"
              :options="likes.options"
            />
          </div>
          <h2
            class="text-3xl font-bold leading-8 mt-6"
            v-text="total.likes"
          />
        </div>
      </div>
      <div class="col-span-12 sm:col-span-6 xl:col-span-3 -y">
        <div class="shadow-sm hover:shadow-md rounded-md bg-white p-4 relative">
          <div class="flex">
            <CloudArrowDownIcon
              class="w-7 h-7 mr-2 text-green-600"
              aria-hidden="true"
            />
            <span class="text-base text-gray-600 ml-2">{{ $t('downloads') }}</span>
            <div
              class="ml-auto flex items-center rounded-full px-2 py-1 text-xs text-white"
              title="overDownloads"
              :class="overDownloads > 0 ? 'bg-lime-500' : 'bg-red-600'"
            >
              {{ overDownloads }}%
              <ArrowUpIcon
                v-if="overViewed > 0"
                class="w-4 h-4"
                aria-hidden="true"
              />
              <ArrowDownIcon
                v-else
                class="w-4 h-4"
                aria-hidden="true"
              />
            </div>
            <LineChart
              :labels="downloads.labels"
              :label="downloads.label"
              :title="downloads.title"
              :data="downloads.data"
              :color="downloads.color"
              :options="downloads.options"
            />
          </div>
          <h2 class="text-3xl font-bold leading-8 mt-6">
            {{ total.downloads }}
          </h2>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-12 gap-4 my-4">
      <div class="col-span-12 md:col-span-6">
        <PieChart
          :labels="categoryChart.labels"
          :label="categoryChart.label"
          :title="categoryChart.title"
          :data="categoryChart.data"
          :options="categoryChart.options"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, onMounted } from "vue";

import { instance, SERVER_URL } from "@/api";
import { Category, Statistics, StatisticsTotal } from "@/api/request.type";

import LineChart from "@/components/charts/LineChart.vue";
import PieChart from "@/components/charts/PieChart.vue";

import { ArrowPathIcon, EyeIcon, ChatBubbleLeftEllipsisIcon, ArrowUpIcon, ArrowDownIcon, HandThumbUpIcon, CloudArrowDownIcon } from '@heroicons/vue/24/outline'

// data
let categories = ref<Array<Category>>([])
let datas = ref<Array<Statistics>>([])
let total = ref<StatisticsTotal>({
  viewed: 0,
  likes: 0,
  comments: 0,
  downloads: 0
})
let overViewed = computed(() => {
  let cur = datas.value[0];
  let yst = datas.value[1];

  if (cur && yst) {
    if (yst.viewed == 0) {
      return cur.viewed * 100;
    } else {
      return Math.floor((cur.viewed - yst.viewed) / yst.viewed * 10000) / 100
    }
  }
  return 0
});
let overLikes = computed(() => {
  let cur = datas.value[0];
  let yst = datas.value[1];

  if (cur && yst) {
    if (yst.likes == 0) {
      return cur.likes * 100;
    } else {
      return Math.floor((cur.likes - yst.likes) / yst.likes * 10000) / 100
    }
  }
  return 0
});
let overComments = computed(() => {
  let cur = datas.value[0];
  let yst = datas.value[1];

  if (cur && yst) {
    if (yst.comments == 0) {
      return cur.comments * 100;
    } else {
      return Math.floor((cur.comments - yst.comments) / yst.comments * 10000) / 100
    }
  }
  return 0
});
let overDownloads = computed(() => {
  let cur = datas.value[0];
  let yst = datas.value[1];

  if (cur && yst) {
    if (yst.downloads == 0) {
      return cur.downloads * 100;
    } else {
      return Math.floor((cur.downloads - yst.downloads) / yst.downloads * 10000) / 100
    }
  }
  return 0
});
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
const initData = async (): Promise<void> => {
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
    datas.value = res.data.content;
    // chart data
    let labels = new Array<string>()
    datas.value.forEach(item => {
      let now = new Date(item.date)
      labels.unshift(now.getMonth() + 1 + '-' + now.getDate());
      // data
      viewed.data.unshift(item.viewed);
      likes.data.unshift(item.likes);
      comments.data.unshift(item.comments);
      downloads.data.unshift(item.downloads)
    })

    viewed.labels = labels
    likes.labels = labels
    comments.labels = labels
    downloads.labels = labels
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
      categories.value = res.data.content
      // chart data
      categories.value.forEach(item => {
    categoryChart.labels.push(item.name)
    categoryChart.data.push(item.count)
  })
    })
}

</script>