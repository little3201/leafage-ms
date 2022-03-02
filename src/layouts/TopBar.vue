<template>
  <div class="flex items-center h-12 md:h-16 border-b bg-gray-100">
    <div class="mr-auto hidden md:flex items-center">
      <RouterLink to="/" class>Application</RouterLink>
      <svg
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
      <RouterLink :to="$route.path" class="text-blue-600 font-medium" v-text="$route.name"></RouterLink>
    </div>
    <div class="mr-3 sm:mr-6">
      <div class="hidden sm:block relative w-56 rounded-full pr-8 bg-gray-300">
        <input
          type="text"
          name="search"
          class="w-56 py-1.5 block border-gray-300 bg-blue-100 bg-opacity-50 rounded-full"
          placeholder="Search..."
        />
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="absolute inset-y-0 right-0 my-auto mr-3 opacity-60"
        >
          <use :xlink:href="'/svg/feather-sprite.svg#' + 'search'" />
        </svg>
      </div>
    </div>
    <div class="mr-3 sm:mr-6 mt-2">
      <button
        title="Toggle Theme"
        @click="themeMode"
        class="relative focus:outline-none transition-colors duration-500 ease-in border-transparent"
      >
        <svg
          v-if="isDark"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-moon"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-sun"
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      </button>
    </div>
    <div class="relative mr-auto sm:mr-6 mt-2">
      <button type="button" class="focus:outline-none" @click="operate('notify')">
        <svg
          width="20"
          height="20"
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
          <span
            class="absolute animate-ping inset-y-0 right-px -mt-px rounded-full h-2 w-2 bg-red-600"
          ></span>
          <span class="absolute inset-y-0 right-px -mt-px rounded-full h-2 w-2 bg-red-600"></span>
        </figure>
      </button>
      <div
        v-show="isNotify && notifications.length > 0"
        class="origin-top-left p-2 absolute w-64 md:w-80 left-0 md:left-auto md:right-0 mt-4 rounded-md shadow-lg bg-white z-10"
      >
        <span class="mt-4 mb-2 px-2">Notifications</span>
        <div class="divide-y">
          <div v-for="(notification, index) in notifications" :key="index" class="overflow-hidden">
            <div class="hover:bg-gray-100 rounded-md p-2">
              <RouterLink to="/settings/notification" @click="operate('')">
                <p class="text-sm truncate" v-text="notification.title"></p>
                <p
                  class="text-xs text-gray-500 my-1 whitespace-no-wrap"
                  v-text="new Date(notification.modifyTime).toLocaleString()"
                ></p>
                <div class="w-full text-xs truncate text-gray-600">{{ notification.content }}</div>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="relative mr-auto sm:mr-6 mt-2">
      <button type="button" class="focus:outline-none" @click="operate('language')">
        <svg
          width="20"
          height="20"
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
        class="origin-top-left text-sm p-2 divide-y absolute right-0 my-4 rounded-md shadow-lg bg-white z-10"
      >
        <button
          type="button"
          class="flex items-center w-full bg-white hover:text-blue-600 px-2 py-1"
        >English</button>
        <button
          type="button"
          class="flex items-center w-full bg-white hover:text-blue-600 px-2 py-1"
        >Chinese</button>
      </div>
    </div>
    <div class="relative">
      <button
        type="button"
        v-if="account && Object.keys(account).length > 0"
        @click="operate('account')"
        class="rounded-full w-8 h-8 text-center flex items-center bg-white shadow focus:outline-none"
      >
        <img
          v-if="account.avatar"
          :alt="account.nickname"
          :src="account.avatar"
          class="rounded-full"
        />
        <span v-else v-text="account.nickname.substr(0, 1)"></span>
      </button>
      <RouterLink
        v-else
        to="/signin"
        class="bg-blue-600 text-white hover:bg-blue-700 px-3 py-2 rounded-full"
      >Sign In</RouterLink>
      <div
        v-show="isAccount"
        class="origin-top-right p-2 absolute w-36 right-0 mt-4 rounded-md shadow-md bg-white divide-y z-10"
        aria-orientation="vertical"
        aria-labelledby="account-down"
        tabindex="-1"
      >
        <div class="px-2 py-1">
          <h3 class="font-blod">{{ account.nickname }}</h3>
          <h4 class="text-gray-400 text-sm">{{ account.username }}</h4>
        </div>
        <div class="text-sm py-1">
          <RouterLink
            @click="operate('')"
            to="/settings/profile"
            class="flex items-center transition duration-300 ease-in-out hover:text-blue-600 hover:bg-gray-100 rounded-md px-2 py-1"
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
            Profile
          </RouterLink>
          <RouterLink
            @click="operate('')"
            to="/settings"
            class="flex items-center transition duration-300 ease-in-out hover:text-blue-600 hover:bg-gray-100 rounded-md px-2 py-1"
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
            Settings
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
            Help
          </button>
        </div>
        <div class="text-sm pt-1">
          <button
            type="button"
            @click.prevent="signout"
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
              <use :xlink:href="'/svg/feather-sprite.svg#' + 'toggle-right'" />
            </svg>
            Logout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

import { instance, SERVER_URL } from "@/api";
import type { Account, Notification } from "@/api/request.type";

// 控制通知是否打开
let isNotify = ref(false);
// 控制账号操作是否打开
let isAccount = ref(false);
// 语言设置是否打开
let isLanguage = ref(false)
// 暗黑模式
let isDark = ref(false)

let notifications = ref<Array<Notification>>([])
let count = ref(0)

const router = useRouter();
const account = ref<Account>({});

const themeMode = () => {
  isDark.value = !isDark.value
}

onMounted(() => {
  let data = sessionStorage.getItem("account");
  if (data) {
    account.value = JSON.parse(data)
    retrieve();
    socket();
  }
});

const retrieve = async () => {
  await Promise.all([
    await instance.get(SERVER_URL.notification, { params: { page: 0, size: 6 } })
      .then((res) => notifications.value = res.data),
    await instance.get(SERVER_URL.notification.concat("/count"))
      .then((res) => count.value = res.data)
  ])
}

/**
 * 登出
 */
const signout = async () => {
  await instance.post("/logout").then(() => {
    // 退出登录，清空sessionStorage
    sessionStorage.clear()
  });

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