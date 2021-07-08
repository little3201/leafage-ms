<template>
  <div class="flex items-center h-12 md:h-16 border-b bg-gray-100">
    <!-- BEGIN: Breadcrumb -->
    <div class="mr-auto hidden md:flex items-center">
      <router-link to="/" class="">Application</router-link>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-chevron-right opacity-50"
      >
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
      <router-link
        :to="this.$route.path"
        class="text-blue-600 font-medium"
        v-text="this.$route.name"
      ></router-link>
    </div>
    <div class="mr-3 sm:mr-6">
      <div class="hidden sm:block relative w-56 rounded-full pr-8 bg-gray-300">
        <input
          type="text"
          class="
            w-56
            py-1
            border border-gray-300
            bg-blue-100 bg-opacity-50
            rounded-full
          "
          placeholder="Search..."
        />
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
          class="
            feather feather-search
            absolute
            inset-y-0
            right-0
            my-auto
            mr-3
            opacity-60
          "
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </div>
    </div>
    <div class="relative mr-auto sm:mr-6">
      <div
        class="cursor-pointer"
        @click="(notify = !notify), (account = false)"
      >
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
          class="feather feather-bell"
        >
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
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
            origin-top-right
            p-4
            absolute
            w-80
            right-0
            mt-5
            rounded-md
            shadow-lg
            bg-white
            z-10
          "
        >
          <div class="mb-4">Notifications</div>
          <div class="cursor-pointer divide-y">
            <div class="overflow-hidden p-2 hover:bg-gray-100 rounded-md">
              <div class="flex items-center">
                <a href="javascript:;" class="font-medium truncate mr-5"
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
                <a href="javascript:;" class="font-medium truncate mr-5"
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
        <use xlink:href="/svg/feather-sprite.svg#globe" />
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
          aria-orientation="vertical" aria-labelledby="account-down" tabindex="-1"
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
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-user mr-2"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
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
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-lock mr-2"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              Reset Password
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
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-help-circle mr-2"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
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
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-toggle-right mr-2"
              >
                <rect x="1" y="5" width="22" height="14" rx="7" ry="7"></rect>
                <circle cx="16" cy="12" r="3"></circle>
              </svg>
              Logout
            </a>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import router from "../../router";
import { useStore } from "../../store";

import instance from "../../api";

export default defineComponent({
  name: "TopBar",

  setup() {
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

    const signout = () => {
      instance.post("/logout").then(() => {
        // 退出登录，设置user为空
        store.commit("setUser", {});
        sessionStorage.removeItem("user");
        router.replace("/signin");
      });
    };

    return {
      notify,
      account,
      user,
      signout,
    };
  },
});
</script>