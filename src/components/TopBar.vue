<template>
  <div class="flex items-center py-2 border-b">
    <div class="hidden md:inline-flex md:flex-grow items-center">
      <RouterLink to="/">
        {{ $t('application') }}
      </RouterLink>
      <span
        v-for="(route, index) in $route.path.substring(1).split('/')"
        :key="index"
        class="inline-flex items-center"
      >
        <ChevronRightIcon
          v-if="route"
          class="w-4 h-4 opacity-70"
          aria-hidden="true"
        />
        <RouterLink
          :to="$route.path"
          :class="{ 'text-blue-600': $route.name && route === $route.name.toString().toLowerCase() }"
        >
          {{ route ? $t(route) : "" }}
        </RouterLink>
      </span>
    </div>
    <div class="flex flex-1 items-center justify-between md:justify-end md:space-x-8">
      <div class="hidden sm:block relative w-56 rounded-full bg-neutral-300">
        <input
          type="text"
          name="search"
          class="w-56 py-1.5 border-neutral-300 bg-blue-100 bg-opacity-50 rounded-full"
          :placeholder="$t('search')"
          aria-label="search"
        >
        <MagnifyingGlassIcon
          class="absolute inset-y-0 right-0 my-auto mr-3 opacity-60 w-5 h-5"
          aria-hidden="true"
        />
      </div>

      <div class="relative inline-flex items-center">
        <button
          type="button"
          name="notify"
          aria-label="notify"
          class="focus:outline-none"
          @click="operate('notify')"
        >
          <BellIcon
            class="w-6 h-6"
            aria-hidden="true"
          />
          <figure v-if="count > 0">
            <span class="absolute animate-ping inset-y-0 right-px -mt-px rounded-full h-2 w-2 bg-red-600" />
            <span class="absolute inset-y-0 right-px -mt-px rounded-full h-2 w-2 bg-red-600" />
          </figure>
        </button>
        <div
          v-show="isNotify && messages.length > 0"
          class="origin-top-left p-2 absolute top-6 left-0 md:right-0 w-64 md:w-80 md:left-auto  mt-4 rounded-md shadow-lg bg-white z-10"
        >
          <span class="my-4 px-2 text-lg">{{ $t('messages') }}: <span class="text-sm text-neutral-400">{{ count }}
            {{ $t('unreadTotal') }}</span></span>
          <div class="divide-y">
            <div
              v-for="(message, index) in messages"
              :key="index"
              class="overflow-hidden"
            >
              <div class="hover:bg-neutral-100 rounded-md p-2">
                <RouterLink
                  to="/settings/messages"
                  @click="operate('')"
                >
                  <p
                    class="text-sm truncate"
                    v-text="message.title"
                  />
                  <p
                    class="text-xs text-neutral-500 my-1 whitespace-no-wrap"
                    v-text="new Date(message.modifyTime).toLocaleString()"
                  />
                  <div class="w-full text-xs truncate text-neutral-600">
                    {{ message.context }}
                  </div>
                </RouterLink>
              </div>
            </div>
            <div class="py-2 text-center">
              <RouterLink
                to="/settings/messages"
                class="text-neutral-400"
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
          name="language"
          aria-label="language"
          class="focus:outline-none"
          @click="operate('language')"
        >
          <LanguageIcon
            class="w-5 h-5"
            aria-hidden="true"
          />
        </button>
        <div
          v-show="isLanguage"
          class="origin-top-left text-sm p-2 divide-y absolute top-6 right-0 my-4 rounded-md shadow-lg bg-white z-10"
        >
          <button
            type="button"
            class="flex items-center w-full px-2 py-1"
            name="en-US"
            aria-label="en-US"
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
            name="zh-CN"
            aria-label="zh-CN"
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
          v-if="user.username && user.username.length > 0"
          type="button"
          name="username"
          aria-label="username"
          class="rounded-full w-8 h-8 text-center inline-flex items-center bg-white shadow focus:outline-none"
          @click="operate('user')"
        >
          <img
            v-if="user.avatar"
            :alt="user.nickname"
            :src="user.avatar"
            class="rounded-full"
            width="32"
            height="32"
          >
          <span
            v-else
            v-text="user.nickname.substring(0, 1)"
          />
        </button>
        <button
          v-else
          class="bg-blue-600 whitespace-nowrap text-sm text-white hover:bg-blue-700 px-3 py-1.5 rounded-full"
          @click="toSignin"
        >
          {{ $t('signin') }}
        </button>
        <div
          v-show="isAccount"
          class="origin-top-right p-2 absolute w-36 right-0 mt-3 rounded-md shadow-md bg-white divide-y z-10"
          aria-orientation="vertical"
          aria-labelledby="user-down"
          tabindex="-1"
        >
          <div class="px-2 py-1">
            <h3 class="font-blod">
              {{ user.nickname }}
            </h3>
            <h4 class="text-neutral-400 text-sm">
              {{ user.username }}
            </h4>
          </div>
          <div class="text-sm py-1">
            <RouterLink
              to="/settings/profile"
              class="flex items-center transition duration-300 ease-in-out hover:text-blue-600 hover:bg-neutral-100 rounded-md px-2 py-1"
              @click="operate('')"
            >
              <IdentificationIcon
                class="w-4 h-4 mr-2"
                aria-hidden="true"
              />
              {{ $t('profile') }}
            </RouterLink>
            <RouterLink
              to="/settings"
              class="flex items-center transition duration-300 ease-in-out hover:text-blue-600 hover:bg-neutral-100 rounded-md px-2 py-1"
              @click="operate('')"
            >
              <CogIcon
                class="w-4 h-4 mr-2"
                aria-hidden="true"
              />
              {{ $t('settings') }}
            </RouterLink>
            <button
              type="button"
              name="help"
              aria-label="help"
              class="flex items-center w-full hover:text-blue-600 focus:outline-none hover:bg-neutral-100 rounded-md px-2 py-1"
            >
              <QuestionMarkCircleIcon
                class="w-4 h-4 mr-2"
                aria-hidden="true"
              />
              {{ $t('help') }}
            </button>
          </div>
          <div class="text-sm pt-1">
            <button
              type="button"
              name="sign-out"
              aria-label="sign-out"
              class="flex items-center w-full hover:text-blue-600 focus:outline-none hover:bg-neutral-100 rounded-md px-2 py-1"
              @click.prevent="signout"
            >
              <ArrowRightCircleIcon
                class="w-4 h-4 mr-2"
                aria-hidden="true"
              />
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

import { instance, SERVER_URL } from "~/api";
import type { User, Message } from "~/api/request.type";
import { ArrowRightCircleIcon, BellIcon, ChevronRightIcon, CogIcon, IdentificationIcon, LanguageIcon, MagnifyingGlassIcon, QuestionMarkCircleIcon } from '@heroicons/vue/24/outline'

// 控制通知是否打开
let isNotify = ref(false);
// 控制账号操作是否打开
let isAccount = ref(false);
// 语言设置是否打开
let isLanguage = ref(false)

let messages = ref<Array<Message>>([])
let count = ref(0)

const { locale } = useI18n()
const router = useRouter();
const user = ref<User>({
  username: '',
  nickname: '',
  avatar: '',
  enabled: true,
  accountExpiresAt: new Date().toDateString(),
  accountLocked: true,
  credentialsExpiresAt: new Date().toDateString()
});

onMounted(() => {
  let data = sessionStorage.getItem("user");
  if (data && data !== "undefined") {
    user.value = JSON.parse(data)
    retrieve();
  }
});

const retrieve = async () => {
  await instance.get(SERVER_URL.messages, { params: { page: 0, size: 6, receiver: user.value.username } })
    .then(res => {
      messages.value = res.data.content
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
    case "user":
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
const toSignin = () => {
  window.location.href = '/api/auth/'
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
</script>