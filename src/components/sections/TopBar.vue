<template>
  <div class="flex items-center h-12 md:h-16 border-b bg-gray-100">
    <!-- BEGIN: Breadcrumb -->
    <div class="mr-auto hidden md:flex items-center">
      <router-link to="/" class="">Application</router-link>
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
      <router-link
        :to="$route.path"
        class="text-blue-600 font-medium"
        v-text="$route.name"
      ></router-link>
    </div>
    <div class="mr-3 sm:mr-6">
      <div class="hidden sm:block relative w-56 rounded-full pr-8 bg-gray-300">
        <input
          type="text"
          class="
            w-56
            border border-gray-300
            bg-blue-100 bg-opacity-50
            rounded-full
          "
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
      <div
        class="cursor-pointer"
        @click="(notify = !notify), (account = false)"
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
        >
          <use :xlink:href="'/svg/feather-sprite.svg#' + 'bell'" />
        </svg>
        <span
          class="
            absolute
            animate-ping
            inset-y-0
            right-px
            -mt-px
            rounded-full
            h-2
            w-2
            bg-red-600
          "
        ></span>
        <span
          class="
            absolute
            inset-y-0
            right-px
            -mt-px
            rounded-full
            h-2
            w-2
            bg-red-600
          "
        ></span>
      </div>
      <transition
        enter-active-class="transition ease-out duration-100"
        enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-from-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
      >
        <div
          v-show="notify"
          class="
            origin-top-left
            p-4
            absolute
            w-64
            md:w-80
            left-0
            md:left-auto
            md:right-0
            mt-4
            rounded-md
            shadow-lg
            bg-white
            z-10
          "
        >
          <span class="p-2 text-lg">Notifications</span>
          <div class="cursor-pointer divide-y mt-2">
            <div class="overflow-hidden p-2 hover:bg-gray-100 rounded-md">
              <div class="flex items-center">
                <a href="javascript:;" class="font-medium truncate"
                  >John Travolta</a
                >
                <div class="text-xs text-gray-500 ml-auto whitespace-no-wrap">
                  06:05 AM
                </div>
              </div>
              <div class="w-full truncate text-gray-600">
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature from
                45 BC, making it over 20
              </div>
            </div>
            <div class="overflow-hidden p-2 hover:bg-gray-100 rounded-md">
              <div class="flex items-center">
                <a href="javascript:;" class="font-medium truncate"
                  >John Travolta</a
                >
                <div class="text-xs text-gray-500 ml-auto whitespace-no-wrap">
                  06:05 AM
                </div>
              </div>
              <div class="w-full truncate text-gray-600">
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature from
                45 BC, making it over 20
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <div class="mr-auto sm:mr-6 cursor-pointer">
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
    <div class="relative">
      <div
        v-if="user && Object.keys(user).length > 0"
        @click="(account = !account), (notify = false), (settings = false)"
        class="rounded-full cursor-pointer w-8 h-8 text-center bg-white"
      >
        <img
          v-if="user.avatar"
          alt="leafage"
          :src="user.avatar"
          class="rounded-full"
        />
        <span
          v-else
          v-text="user.nickname.substr(0, 1)"
          class="text-xl rounded-full"
        ></span>
      </div>
      <router-link
        v-else
        to="/signin"
        class="
          bg-blue-600
          text-white
          hover:shadow-md
          hover:bg-blue-700
          px-3
          py-2
          rounded-full
        "
        >Sign In</router-link
      >
      <transition
        enter-active-class="transition ease-out duration-100"
        enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-from-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
      >
        <div
          v-show="account"
          class="
            origin-top-right
            p-4
            absolute
            w-48
            right-0
            mt-4
            rounded-md
            shadow-lg
            bg-white
            z-10
          "
          aria-orientation="vertical"
          aria-labelledby="account-down"
          tabindex="-1"
        >
          <div class="py-2">
            <h3 class="font-blod text-base" v-text="user.nickname"></h3>
            <h4 class="text-gray-500" v-text="user.username"></h4>
          </div>
          <div>
            <router-link
              @click="account = false"
              to="/settings/profile"
              class="
                flex
                items-center
                py-2
                transition
                duration-300
                ease-in-out
                hover:text-blue-600
              "
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
              @click="account = false"
              to="/settings/secret"
              class="
                flex
                items-center
                py-2
                transition
                duration-300
                ease-in-out
                hover:text-blue-600
              "
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
                <use :xlink:href="'/svg/feather-sprite.svg#' + 'lock'" />
              </svg>
              Secret
            </router-link>
            <a
              href=""
              class="
                flex
                items-center
                py-2
                transition
                duration-300
                ease-in-out
                hover:text-blue-600
              "
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
            </a>
          </div>
          <div class="py-2 border-t border-theme-40">
            <a
              href="javascript:;"
              @click.prevent="signout"
              class="
                flex
                items-center
                transition
                duration-300
                ease-in-out
                hover:text-blue-600
              "
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
                <use
                  :xlink:href="'/svg/feather-sprite.svg#' + 'toggle-right'"
                />
              </svg>
              Logout
            </a>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import router from "../../router";
import { useStore } from "../../store";

import instance from "../../api";

// 控制通知是否打开
let notify = ref(false);
// 控制账号操作是否打开
let account = ref(false);

const store = useStore();

const user = computed(() => {
  let data = sessionStorage.getItem("user");
  if (data) {
    return JSON.parse(data);
  } else {
    return store.state.user;
  }
});

const signout = async () => {
  await instance.post("/logout").then(() => {
    // 退出登录，设置user为空
    store.commit("setUser", {});
    sessionStorage.removeItem("user");
    // 清空menus
    store.commit("setMenus", []);
    sessionStorage.removeItem("menus");

    router.replace("/signin");
  });
};

// 请求链接webSocket
const socket = () => {
  var ws = new WebSocket("wss://console.leafage.top/api/socket");
  ws.onopen = function (evt) {
    console.log("Connection open ...", evt);
    ws.send("Hi! Can you speak chinese?");
  };

  ws.onmessage = function (msg) {
    console.log("Received Message: ", msg.data);
  };

  ws.onclose = function (evt) {
    console.log("Connect closed.", evt);
  };
}

onMounted(() => {
  let data = sessionStorage.getItem("user");
  if (data) {
    socket();
  }
});
</script>