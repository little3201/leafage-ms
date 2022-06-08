<template>
  <div class="flex items-center py-2 border-b">
    <div class="hidden md:inline-flex md:flex-grow items-center">
      <RouterLink
        to="/"
        class
      >
        {{ $t('application') }}
      </RouterLink>
      <span
        v-for="(route, index) in $route.path.substring(1).split('/')"
        :key="index"
        class="inline-flex items-center"
      >
        <svg
          v-if="route"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="opacity-60"
        >
          <use :xlink:href="'/svg/feather-sprite.svg#' + 'chevron-right'" />
        </svg>
        <RouterLink
          :to="$route.path"
          :class="{ 'text-blue-600': $route.name && route === $route.name.toString().toLowerCase() }"
        >
          {{ route ? $t(route) : "" }}
        </RouterLink>
      </span>
    </div>
    <div class="flex flex-1 items-center justify-between md:justify-end md:space-x-8">
      <div class="hidden sm:block relative w-56 rounded-full bg-gray-300">
        <input
          type="text"
          name="search"
          class="w-56 py-1.5 border-gray-300 bg-blue-100 bg-opacity-50 rounded-full"
          :placeholder="$t('search')"
        >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="absolute inset-y-0 right-0 my-auto mr-3 opacity-60"
        >
          <use :xlink:href="'/svg/feather-sprite.svg#' + 'search'" />
        </svg>
      </div>

      <div class="relative inline-flex items-center">
        <button
          type="button"
          class="focus:outline-none"
          @click="operate('notify')"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <use :xlink:href="'/svg/feather-sprite.svg#' + 'bell'" />
          </svg>
          <figure v-if="count > 0">
            <span class="absolute animate-ping inset-y-0 right-px -mt-px rounded-full h-2 w-2 bg-red-600" />
            <span class="absolute inset-y-0 right-px -mt-px rounded-full h-2 w-2 bg-red-600" />
          </figure>
        </button>
        <div
          v-show="isNotify && notifications.length > 0"
          class="origin-top-left p-2 absolute top-6 left-0 md:right-0 w-64 md:w-80 md:left-auto  mt-4 rounded-md shadow-lg bg-white z-10"
        >
          <span class="my-4 px-2 text-lg">{{ $t('notification') }}: <span class="text-sm text-gray-400">{{ count }}
            {{ $t('unreadTotal') }}</span></span>
          <div class="divide-y">
            <div
              v-for="(notification, index) in notifications"
              :key="index"
              class="overflow-hidden"
            >
              <div class="hover:bg-gray-100 rounded-md p-2">
                <RouterLink
                  to="/settings/notification"
                  @click="operate('')"
                >
                  <p
                    class="text-sm truncate"
                    v-text="notification.title"
                  />
                  <p
                    class="text-xs text-gray-500 my-1 whitespace-no-wrap"
                    v-text="new Date(notification.modifyTime).toLocaleString()"
                  />
                  <div class="w-full text-xs truncate text-gray-600">
                    {{ notification.content }}
                  </div>
                </RouterLink>
              </div>
            </div>
            <div class="py-2 text-center">
              <RouterLink
                to="/settings/notification"
                class="text-gray-400"
                @click="operate('')"
              >
                {{ $t('viewMore') }}
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
      <div class="relative inline-flex items-center">
        <button
          type="button"
          class="focus:outline-none"
          @click="operate('language')"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <use :xlink:href="'/svg/feather-sprite.svg#' + 'globe'" />
          </svg>
        </button>
        <div
          v-show="isLanguage"
          class="origin-top-left text-sm p-2 divide-y absolute top-6 right-0 my-4 rounded-md shadow-lg bg-white z-10"
        >
          <button
            type="button"
            class="flex items-center w-full px-2 py-1"
            :class="{ 'text-blue-600': locale == 'en-US' }"
            @click="switchLanguage('en-US')"
          >
            <figure class="h-8 w-8 inline-flex items-center">
              <img
                src="/svg/america.svg"
                alt="en-US"
                class="h-6 w-6"
                width="24"
                height="24"
              >
            </figure>English
          </button>
          <button
            type="button"
            class="flex items-center w-full hover:text-blue-600 px-2 py-1"
            :class="{ 'text-blue-600': locale == 'zh-CN' }"
            @click="switchLanguage('zh-CN')"
          >
            <figure class="h-8 w-8 inline-flex items-center">
              <img
                src="/svg/china.svg"
                alt="zh-CN"
                class="h-6 w-6"
                width="24"
                height="24"
              >
            </figure>中文
          </button>
        </div>
      </div>
      <div class="relative">
        <button
          v-if="account.username && account.username.length > 0"
          type="button"
          class="rounded-full w-8 h-8 text-center inline-flex items-center bg-white shadow focus:outline-none"
          @click="operate('account')"
        >
          <img
            v-if="account.avatar"
            :alt="account.nickname"
            :src="account.avatar"
            class="rounded-full"
          >
          <span
            v-else
            v-text="account.nickname.substr(0, 1)"
          />
        </button>
        <RouterLink
          v-else
          to="/signin"
          class="bg-blue-600 whitespace-nowrap text-sm text-white hover:bg-blue-700 px-3 py-1.5 rounded-full"
        >
          {{ $t('signin') }}
        </RouterLink>
        <div
          v-show="isAccount"
          class="origin-top-right p-2 absolute w-36 right-0 mt-3 rounded-md shadow-md bg-white divide-y z-10"
          aria-orientation="vertical"
          aria-labelledby="account-down"
          tabindex="-1"
        >
          <div class="px-2 py-1">
            <h3 class="font-blod">
              {{ account.nickname }}
            </h3>
            <h4 class="text-gray-400 text-sm">
              {{ account.username }}
            </h4>
          </div>
          <div class="text-sm py-1">
            <RouterLink
              to="/settings/profile"
              class="flex items-center transition duration-300 ease-in-out hover:text-blue-600 hover:bg-gray-100 rounded-md px-2 py-1"
              @click="operate('')"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="mr-2"
              >
                <use :xlink:href="'/svg/feather-sprite.svg#' + 'archive'" />
              </svg>
              {{ $t('profile') }}
            </RouterLink>
            <RouterLink
              to="/settings"
              class="flex items-center transition duration-300 ease-in-out hover:text-blue-600 hover:bg-gray-100 rounded-md px-2 py-1"
              @click="operate('')"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="mr-2"
              >
                <use :xlink:href="'/svg/feather-sprite.svg#' + 'settings'" />
              </svg>
              {{ $t('settings') }}
            </RouterLink>
            <button
              type="button"
              class="flex items-center w-full hover:text-blue-600 focus:outline-none active:cursor-wait hover:bg-gray-100 rounded-md px-2 py-1"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="mr-2"
              >
                <use :xlink:href="'/svg/feather-sprite.svg#' + 'help-circle'" />
              </svg>
              {{ $t('help') }}
            </button>
          </div>
          <div class="text-sm pt-1">
            <button
              type="button"
              class="flex items-center w-full hover:text-blue-600 focus:outline-none active:cursor-wait hover:bg-gray-100 rounded-md px-2 py-1"
              @click.prevent="signout"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="mr-2"
              >
                <use :xlink:href="'/svg/feather-sprite.svg#' + 'toggle-right'" />
              </svg>
              {{ $t('signout') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from 'vue-i18n'

import { instance, SERVER_URL } from "@/api";
import type { Account, Notification } from "@/api/request.type";

// 控制通知是否打开
let isNotify = ref(false);
// 控制账号操作是否打开
let isAccount = ref(false);
// 语言设置是否打开
let isLanguage = ref(false)

let notifications = ref<Array<Notification>>([])
let count = ref(0)

const { locale } = useI18n()
const router = useRouter();
const account = ref<Account>({
  username: '',
  nickname: '',
  avatar: ''
});

onMounted(() => {
  let data = sessionStorage.getItem("account");
  if (data && data !== "undefined") {
    account.value = JSON.parse(data)
    retrieve();
    socket();
  }
});

const retrieve = async () => {
  await instance.get(SERVER_URL.notification, { params: { page: 0, size: 6, read: false } })
    .then(res => {
      notifications.value = res.data.content
      count.value = res.data.totalElements
    })
}

/**
 * 登出
 */
const signout = async () => {
  await instance.post("/logout").then(() => sessionStorage.clear());

  router.replace("/signin");
};

/**
 * 开关
 */
const operate = (operation: string) => {
  switch (operation) {
    case "notify":
      isNotify.value = !isNotify.value;
      isLanguage.value = false;
      isAccount.value = false;
      break;
    case "language":
      isNotify.value = false;
      isLanguage.value = !isLanguage.value;
      isAccount.value = false;
      break;
    case "account":
      isNotify.value = false;
      isLanguage.value = false;
      isAccount.value = !isAccount.value;
      break;
    default:
      isNotify.value = false;
      isLanguage.value = false;
      isAccount.value = false;
  }
}
/**
 * 切换语言
 * @param language 语言编码
 */
const switchLanguage = (language: string) => {
  localStorage.setItem('language', language)
  locale.value = language
  isLanguage.value = false
}
/**
 * 请求链接webSocket
 */
const socket = () => {
  var ws = new WebSocket("wss://console.leafage.top/api/socket");
  ws.onopen = (event) => {
    console.log("Connection open ...", event);
  };

  ws.onmessage = (msg) => {
    ws.send(msg.data);
  };

  ws.onclose = (event) => {
    console.log("Connect closed.", event);
  };
}

</script>