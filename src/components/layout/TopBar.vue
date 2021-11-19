<template>
  <div class="flex items-center h-12 md:h-16 border-b bg-gray-100">
    <div class="mr-auto hidden md:flex items-center">
      <router-link to="/" class>Application</router-link>
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
      <router-link :to="$route.path" class="text-blue-600 font-medium" v-text="$route.name"></router-link>
    </div>
    <div class="mr-3 sm:mr-6">
      <div class="hidden sm:block relative w-56 rounded-full pr-8 bg-gray-300">
        <input
          type="text"
          class="w-56 border border-gray-300 bg-blue-100 bg-opacity-50 rounded-full"
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
    <div class="relative mr-auto sm:mr-6">
      <div class="cursor-pointer" @click="operate('notify')">
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
        <span
          class="absolute animate-ping inset-y-0 right-px -mt-px rounded-full h-2 w-2 bg-red-600"
        ></span>
        <span class="absolute inset-y-0 right-px -mt-px rounded-full h-2 w-2 bg-red-600"></span>
      </div>
      <div
        v-show="isNotify"
        class="origin-top-left p-4 absolute w-64 md:w-80 left-0 md:left-auto md:right-0 mt-6 rounded-md shadow-lg bg-white z-10"
      >
        <span class="p-2 text-lg">Notifications</span>
        <div class="divide-y mt-2">
          <div
            v-for="(notification, index) in notifications"
            :key="index"
            class="overflow-hidden p-2 hover:bg-gray-100 rounded-md"
          >
            <router-link to="/notification/unread" @click="operate('')">
              <div class="flex items-center">
                <p class="font-medium truncate" v-text="notification.title"></p>
                <span
                  class="text-xs text-gray-500 ml-auto whitespace-no-wrap"
                  v-text="new Date(notification.modifyTime).toLocaleTimeString()"
                ></span>
              </div>
              <div class="w-full truncate text-gray-600">{{ notification.content }}</div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="relative mr-auto sm:mr-6">
      <div class="cursor-pointer" @click="operate('language')">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="mr-2"
        >
          <use :xlink:href="'/svg/feather-sprite.svg#' + 'globe'" />
        </svg>
      </div>
      <div
        v-show="isLanguage"
        class="origin-top-right py-4 px-2 divide-y absolute w-40 right-0 mt-6 rounded-md shadow-lg bg-white z-10"
      >
        <button
          type="button"
          class="flex items-center w-full bg-white hover:text-blue-600 hover:bg-gray-100 rounded-md p-2"
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
            <use :xlink:href="'/svg/feather-sprite.svg#' + 'globe'" />
          </svg>
          English
        </button>
        <button
          type="button"
          class="flex items-center w-full bg-white hover:text-blue-600 hover:bg-gray-100 rounded-md p-2"
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
            <use :xlink:href="'/svg/feather-sprite.svg#' + 'globe'" />
          </svg>
          Chinese
        </button>
      </div>
    </div>
    <div class="relative">
      <div
        v-if="user && Object.keys(user).length > 0"
        @click="operate('account')"
        class="rounded-full cursor-pointer w-8 h-8 text-center bg-white"
      >
        <img v-if="user.avatar" alt="leafage" :src="user.avatar" class="rounded-full" />
        <span v-else v-text="user.nickname.substr(0, 1)" class="text-xl rounded-full"></span>
      </div>
      <router-link
        v-else
        to="/signin"
        class="bg-blue-600 text-white hover:shadow-md hover:bg-blue-700 px-3 py-2 rounded-full"
      >Sign In</router-link>
      <div
        v-show="isAccount"
        class="origin-top-right py-4 px-2 absolute w-48 right-0 mt-4 rounded-md shadow-lg bg-white z-10"
        aria-orientation="vertical"
        aria-labelledby="account-down"
        tabindex="-1"
      >
        <div class="p-2">
          <h3 class="font-blod text-base">{{ user.nickname }}</h3>
          <h4 class="text-gray-500">{{ user.username }}</h4>
        </div>
        <router-link
          @click="operate('')"
          to="/settings/profile"
          class="flex items-center transition duration-300 ease-in-out hover:text-blue-600 hover:bg-gray-100 rounded-md p-2"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="mr-2"
          >
            <use :xlink:href="'/svg/feather-sprite.svg#' + 'user'" />
          </svg>
          Profile
        </router-link>
        <router-link
          @click="operate('')"
          to="/settings/secret"
          class="flex items-center transition duration-300 ease-in-out hover:text-blue-600 hover:bg-gray-100 rounded-md p-2"
        >
          <svg
            width="20"
            height="20"
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
        </router-link>
        <button
          type="button"
          class="flex items-center w-full hover:text-blue-600 focus:outline-none active:cursor-wait hover:bg-gray-100 rounded-md p-2"
        >
          <svg
            width="20"
            height="20"
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
        <button
          type="button"
          @click.prevent="signout"
          class="flex items-center w-full border-t hover:text-blue-600 focus:outline-none active:cursor-wait hover:bg-gray-100 rounded-md p-2"
        >
          <svg
            width="20"
            height="20"
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
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import router from "../../router";

import instance from "../../api";

// 控制通知是否打开
let isNotify = ref(false);
// 控制账号操作是否打开
let isAccount = ref(false);
// 语言设置是否打开
let isLanguage = ref(false)

const notifications = ref([
  {
    title: 'leafage 系统通知',
    content: 'Contrary to popular belief, Lorem Ipsum is not simply randomtext. It has roots in a piece of classical Latin literature from 45 BC, making it over 20',
    modifyTime: new Date()
  },
  {
    title: 'leafage 系统通知',
    content: 'Contrary to popular belief, Lorem Ipsum is not simply randomtext. It has roots in a piece of classical Latin literature from 45 BC, making it over 20',
    modifyTime: new Date()
  }
])

const user = ref({});

const signout = async () => {
  await instance.post("/logout").then(() => {
    // 退出登录，设置user为空
    sessionStorage.removeItem("user");
    // 清空menus
    sessionStorage.removeItem("menus");

    router.replace("/signin");
  });
};

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

// 请求链接webSocket
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

onMounted(() => {
  let data = sessionStorage.getItem("user");
  if (data) {
    user.value = JSON.parse(data)
    socket();
  }
});
</script>