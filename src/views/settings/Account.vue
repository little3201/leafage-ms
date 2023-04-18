<template>
  <div class="divide-y">
    <fieldset>
      <legend class="sr-only" />
    </fieldset>
    <fieldset class="my-2">
      <legend class="font-medium text-gray-900 pr-4">
        Change usernmae
      </legend>
      <div class="mt-4 text-sm">
        <label
          for="username"
          class="font-medium text-gray-700"
        >{{ $t('username') }}</label>
        <div class="flex items-center space-x-4 mt-1">
          <input
            id="username"
            v-model="user.username"
            name="username"
            type="text"
            class="block w-80 border-gray-300 py-1 rounded-md"
            :disabled="!editUsername"
            aria-label="username"
          >
          <button
            type="button"
            name="usernmae"
            aria-label="username"
            class="text-blue-600 hover:underline"
            @click="editAllow(1)"
          >
            {{
              editUsername ? 'Save' :
              'Edit'
            }}
          </button>
        </div>
        <span class="text-xs mt-1 text-gray-400 inline-flex items-center max-w-none">
          <QuestionMarkCircleIcon
            class="w-4 h-4 ml-1"
            aria-hidden="true"
          />
          Looking to manage user security settings? You can find them in the
          <RouterLink
            to="/settings/security"
            class="text-blue-600 mx-1 hover:underline"
          >User security</RouterLink>
          tab.
        </span>
      </div>
    </fieldset>
    <fieldset class="my-6">
      <legend class="font-medium text-gray-900 pr-4">
        By Email
      </legend>
      <div class="mt-4 space-y-4">
        <div class="flex items-start">
          <div class="flex items-center h-5">
            <input
              id="comments"
              name="comments"
              type="checkbox"
              class="border-gray-300 rounded cursor-pointer"
              aria-label="comments"
            >
          </div>
          <div class="ml-3 text-sm">
            <label
              for="comments"
              class="font-medium text-gray-700"
            >{{ $t('comments') }}</label>
            <p class="text-gray-500">
              Get notified when someones posts a comment on a posting.
            </p>
          </div>
        </div>
        <div class="flex items-start">
          <div class="flex items-center h-5">
            <input
              id="candidates"
              name="candidates"
              type="checkbox"
              class="border-gray-300 rounded cursor-pointer"
              aria-label="candidates"
            >
          </div>
          <div class="ml-3 text-sm">
            <label
              for="candidates"
              class="font-medium text-gray-700"
            >Candidates</label>
            <p class="text-gray-500">
              Get notified when a candidate applies for a job.
            </p>
          </div>
        </div>
        <div class="flex items-start">
          <div class="flex items-center h-5">
            <input
              id="offers"
              name="offers"
              type="checkbox"
              class="border-gray-300 rounded cursor-pointer"
              aria-label="offers"
            >
          </div>
          <div class="ml-3 text-sm">
            <label
              for="offers"
              class="font-medium text-gray-700"
            >Offers</label>
            <p class="text-gray-500">
              Get notified when a candidate accepts or rejects an offer.
            </p>
          </div>
        </div>
      </div>
    </fieldset>
    <fieldset class="my-6">
      <legend class="font-medium text-gray-900 pr-4">
        Push Notifications
      </legend>
      <p class="text-sm text-gray-500">
        These are delivered via SMS to your mobile phone.
      </p>
      <div class="mt-4 space-y-4">
        <div class="flex items-center">
          <input
            id="push-everything"
            name="push-everything"
            type="radio"
            class="border-gray-300 cursor-pointer"
            aria-label="push-everything"
          >
          <label
            for="push-everything"
            class="ml-3 block text-sm font-medium text-gray-700"
          >Everything</label>
        </div>
        <div class="flex items-center">
          <input
            id="push-email"
            name="push-email"
            type="radio"
            class="border-gray-300 cursor-pointer"
            aria-label="push-email"
          >
          <label
            for="push-email"
            class="ml-3 block text-sm font-medium text-gray-700"
          >Same as email</label>
        </div>
        <div class="flex items-center">
          <input
            id="push-nothing"
            name="push-messages"
            type="radio"
            class="border-gray-300 cursor-pointer"
            aria-label="push-messages"
          >
          <label
            for="push-nothing"
            class="ml-3 block text-sm font-medium text-gray-700"
          >No push messages</label>
        </div>
      </div>
    </fieldset>
    <fieldset class="my-2">
      <legend class="font-medium text-gray-900 pr-4">
        Delete User
      </legend>
      <p class="text-sm text-gray-500">
        Once you delete your user, there is no going back. Please be certain.
      </p>
      <button
        type="submit"
        name="submit"
        aria-label="submit"
        class="text-red-600 border block mt-4 border-red-400 hover:bg-red-600 hover:text-white px-2 py-1 rounded-md"
        @click="onSubmit"
      >
        Delete
        User
      </button>
      <span class="text-xs text-gray-400">Are you sure you don’t want to just downgrade your user to a FREE user?
        We won’t charge your payment information anymore.</span>
    </fieldset>
    <Confirm
      :is-show="isShow"
      @cancel-action="confirmOperate"
      @commit-action="confirmCommit"
    />
  </div>
</template>

<script lang="ts" setup>
import { QuestionMarkCircleIcon } from "@heroicons/vue/24/outline";
import { ref, onMounted } from "vue";

import { useRouter } from "vue-router";

import { instance, SERVER_URL } from "~/api";
import type { User } from '~/api/request.type'

import Confirm from "~/components/Confirm.vue"

let editEmail = ref(false)
let editUsername = ref(false)

let user = ref<User>({
  username: '',
  nickname: '',
  avatar: '',
  enabled: true,
  accountExpiresAt: '',
  accountLocked: false,
  credentialsExpiresAt: ''
})

let isShow = ref(false)

const router = useRouter();

const username = ref(JSON.parse(sessionStorage.getItem("user") || '').username)

onMounted(() => {
  fetch()
})
/**
 * 查询
 */
const fetch = async () => {
  if (username.value && username.value.length > 0) {
    await instance.get(SERVER_URL.user.concat("/", username.value)).then(res => user.value = res.data)
  }
}
/**
 * 提交
 */
const onSubmit = async () => {
  if (username.value && username.value.length > 0) {
    confirmOperate(true)
  }
};
/**
 * confirm 操作
 * @param operate 是否打开
 */
const confirmOperate = (operate: boolean) => {
  isShow.value = operate;
};
/**
 * confirm 提交
 */
const confirmCommit = async () => {
  await instance.delete(SERVER_URL.user.concat("/", username.value)).then(() => {
    sessionStorage.clear()
    router.replace({ path: "/signin" });
  });
  isShow.value = false;
};

const editAllow = (no: number) => {
  if (no == 1) {
    editUsername.value = !editUsername.value
  } else if (no == 2) {
    editEmail.value = !editEmail.value
  }
}
</script>