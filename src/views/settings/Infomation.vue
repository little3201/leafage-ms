<template>
  <div class="divide-y">
    <fieldset class="sr-only"></fieldset>
    <fieldset class="my-2">
      <legend class="font-medium text-gray-900 pr-4">Change usernmae</legend>
      <div class="mt-4 text-sm">
        <label for="username" class="font-medium text-gray-700">Username</label>
        <div class="flex items-center space-x-4 mt-1">
          <input id="username" name="username" type="text" class="block w-80 border-gray-300 py-1 rounded-md"
            v-model="user.username" :disabled="!editUsername" />
          <button type="button" @click="editAllow(1)" class="text-blue-600 hover:underline">{{
            editUsername ? 'Save' :
              'Edit'
          }}</button>
        </div>
        <span class="text-xs mt-1 text-gray-400 inline-flex items-center max-w-none">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round" class="mr-1">
            <use :xlink:href="'/svg/feather-sprite.svg#' + 'help-circle'" />
          </svg> Looking to manage account security settings? You can find them in the
          <RouterLink to="/settings/security" class="text-blue-600 mx-1 hover:underline">Account security</RouterLink>
          tab.
        </span>
      </div>
    </fieldset>
    <fieldset class="my-6">
      <legend class="font-medium text-gray-900 pr-4">Public email</legend>
      <div class="mt-4 text-sm">
        <label for="email" class="font-medium text-gray-700">Public email</label>
        <div class="flex items-center space-x-4 mt-1">
          <input id="email" name="email" type="email" class="block w-80 border-gray-300 py-1 rounded-md"
            v-model="user.email" :disabled="!editEmail" />
          <button type="button" @click="editAllow(2)" class="text-blue-600 hover:underline">{{
            editEmail ? 'Save' :
              'Edit'
          }}</button>
        </div>
        <span class="text-xs text-gray-400">You can manage verified email addresses in your email settings.</span>
      </div>
    </fieldset>
    <fieldset class="my-6">
      <legend class="font-medium text-gray-900 pr-4">Change phone number</legend>
      <p class="text-sm text-gray-500">Changing your phone number can have unintended side effects.</p>
      <div class="mt-4">
        <button id="phone" name="phone" type="button"
          class="mt-1 bg-blue-600  text-white hover:bg-blue-700 focus:outline-none active:cursor-wait p-2 rounded-md block">Change
          phone number</button>
        <span class="text-xs text-gray-400">You can manage verified phone number in your phone number settings.</span>
      </div>
    </fieldset>
    <fieldset class="my-6">
      <legend class="font-medium text-gray-900 pr-4">By Email</legend>
      <div class="mt-4 space-y-4">
        <div class="flex items-start">
          <div class="flex items-center h-5">
            <input id="comments" name="comments" type="checkbox" class="border-gray-300 rounded cursor-pointer" />
          </div>
          <div class="ml-3 text-sm">
            <label for="comments" class="font-medium text-gray-700">Comments</label>
            <p class="text-gray-500">Get notified when someones posts a comment on a posting.</p>
          </div>
        </div>
        <div class="flex items-start">
          <div class="flex items-center h-5">
            <input id="candidates" name="candidates" type="checkbox" class="border-gray-300 rounded cursor-pointer" />
          </div>
          <div class="ml-3 text-sm">
            <label for="candidates" class="font-medium text-gray-700">Candidates</label>
            <p class="text-gray-500">Get notified when a candidate applies for a job.</p>
          </div>
        </div>
        <div class="flex items-start">
          <div class="flex items-center h-5">
            <input id="offers" name="offers" type="checkbox" class="border-gray-300 rounded cursor-pointer" />
          </div>
          <div class="ml-3 text-sm">
            <label for="offers" class="font-medium text-gray-700">Offers</label>
            <p class="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
          </div>
        </div>
      </div>
    </fieldset>
    <fieldset class="my-6">
      <legend class="font-medium text-gray-900 pr-4">Push Notifications</legend>
      <p class="text-sm text-gray-500">These are delivered via SMS to your mobile phone.</p>
      <div class="mt-4 space-y-4">
        <div class="flex items-center">
          <input id="push-everything" name="push-notifications" type="radio" class="border-gray-300 cursor-pointer" />
          <label for="push-everything" class="ml-3 block text-sm font-medium text-gray-700">Everything</label>
        </div>
        <div class="flex items-center">
          <input id="push-email" name="push-notifications" type="radio" class="border-gray-300 cursor-pointer" />
          <label for="push-email" class="ml-3 block text-sm font-medium text-gray-700">Same as email</label>
        </div>
        <div class="flex items-center">
          <input id="push-nothing" name="push-notifications" type="radio" class="border-gray-300 cursor-pointer" />
          <label for="push-nothing" class="ml-3 block text-sm font-medium text-gray-700">No push notifications</label>
        </div>
      </div>
    </fieldset>
    <fieldset class="my-2">
      <legend class="font-medium text-gray-900 pr-4">Delete Account</legend>
      <p class="text-sm text-gray-500">Once you delete your account, there is no going back. Please be certain.</p>
      <button @click="onSubmit" type="submit"
        class="text-red-600 border block mt-4 border-red-400 hover:bg-red-600 hover:text-white p-2 rounded-md">Delete
        Account</button>
      <span class="text-xs text-gray-400">Are you sure you don’t want to just downgrade your account to a FREE account?
        We won’t charge your payment information anymore.</span>
    </fieldset>
    <Confirm :isShow="isShow" @cancelAction="confirmOperate" @commitAction="confirmCommit" />  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";

import { useRouter } from "vue-router";

import { instance, SERVER_URL } from "@/api";
import type { User } from '@/api/request.type'

import Confirm from "@/components/Confirm.vue"

let editEmail = ref(false)
let editUsername = ref(false)
let user = ref<User>({})

let isShow = ref(false)

const router = useRouter();

const username = ref(JSON.parse(sessionStorage.getItem("account") || '').username)

onMounted(() => {
  fetch()
})
/**
 * 查询
 */
const fetch = async (): Promise<void> => {
  if (username.value && username.value.length > 0) {
    await instance.get(SERVER_URL.user.concat("/", username.value)).then(res => user.value = res.data)
  }
}
/**
 * 提交
 */
const onSubmit = async (): Promise<void> => {
  if (username.value && username.value.length > 0) {
    confirmOperate(true)
  }
};
/**
 * confirm 操作
 * @param operate 是否打开
 */
const confirmOperate = (operate: boolean): void => {
  isShow.value = operate;
};
/**
 * confirm 提交
 */
const confirmCommit = async (): Promise<void> => {
  await instance.delete(SERVER_URL.account.concat("/", username.value)).then(() => {
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