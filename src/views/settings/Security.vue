<template>
  <div class="divide-y">
    <fieldset />
    <fieldset class="my-4">
      <legend class="font-medium text-gray-900 pr-4">
        Change password
      </legend>
      <form @submit.prevent>
        <div class="mt-4 space-y-2 max-w-sm">
          <div class="text-sm">
            <label
              for="password"
              class="font-medium text-gray-700"
            >Old password</label>
            <input
              id="password"
              v-model.trim="pwd.old"
              name="password"
              type="text"
              class="w-full border-gray-300 py-1 mt-1 rounded-md"
              required
              aria-label="password"
            >
          </div>
          <div class="text-sm">
            <label
              for="newpassword"
              class="font-medium text-gray-700"
            >New password</label>
            <input
              id="newpassword"
              v-model.trim="pwd.new"
              name="newpassword"
              type="text"
              class="w-full border-gray-300 py-1 mt-1 rounded-md"
              required
              aria-label="new password"
            >
          </div>
          <div class="text-sm">
            <label
              for="confirmnewpassword"
              class="font-medium text-gray-700"
            >Confirm new password</label>
            <input
              id="confirmnewpassword"
              v-model.trim="pwd.confirm"
              name="confirmnewpassword"
              type="text"
              class="w-full border-gray-300 py-1 mt-1 rounded-md"
              required
              aria-label="confirm new password"
            >
          </div>
          <div>
            <p class="text-xs text-gray-400">
              Make sure it's at least 15 characters OR at least 8 characters including a
              number and a lowercase letter. Learn more.
            </p>
            <div class="flex items-center space-x-4">
              <button
                name="submit"
                aria-label="submit"
                type="submit"
                class="mt-1 bg-blue-600  text-white hover:bg-blue-700 focus:outline-none active:cursor-wait px-2 py-1 rounded-md block"
                @click="onSubmit"
              >
                Update
                password
              </button>
              <RouterLink
                to="/forgot"
                class="text-blue-600 hover:underline"
              >
                I forgot my password
              </RouterLink>
            </div>
          </div>
        </div>
      </form>
    </fieldset>
    <fieldset class="my-6">
      <legend class="font-medium text-gray-900 pr-4">
        Two-factor authentication
      </legend>
      <div class="text-center">
        <div class="flex items-center justify-center my-6">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <use :xlink:href="'/svg/feather-sprite.svg#' + 'lock'" />
          </svg>
        </div>

        <h3 class="text-xl font-semibold">
          Two factor authentication is not enabled yet.
        </h3>
        <p class="text-gray-500 text-sm my-2 mx-16">
          Two-factor authentication adds an additional layer of security to
          your account by requiring more than just a password to sign in.
        </p>
        <button
          name="enable"
          aria-label="enable"
          type="button"
          class="my-4 border border-gray-300 text-gray-600 hover:border-blue-600 hover:text-blue-600 px-2 py-1 rounded-md"
        >
          Enable
          Two factor authentication
        </button>
        <RouterLink
          to="/"
          class="text-blue-600 hover:underline"
        >
          <p>Learn more</p>
        </RouterLink>
      </div>
    </fieldset>
    <fieldset class="my-6">
      <legend class="text-base font-medium text-gray-900 pr-4">
        Sessions
      </legend>
      <p class="text-sm text-gray-500">
        This is a list of devices that have logged into your account. Revoke any sessions
        that you do not recognize.
      </p>
      <div class="mt-4 border p-4 rounded-md divide-y">
        <div
          v-for="index in 4"
          :key="index"
          class="py-2"
        >
          <div class="flex items-center">
            <span
              class="w-2 h-2 bg-gray-400 rounded-full"
              :class="{ 'bg-lime-500': index == 1 }"
            />
            <svg
              v-if="index == 1"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="mx-2"
            >
              <use :xlink:href="'/svg/feather-sprite.svg#' + 'smartphone'" />
            </svg>
            <svg
              v-else
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="mx-2"
            >
              <use :xlink:href="'/svg/feather-sprite.svg#' + 'monitor'" />
            </svg>
            <div class="mr-auto text-sm text-gray-600">
              <span>陕西西安</span>
              <span class="mx-2">111.12.12.12</span>
              <p class="text-gray-400 text-xs">
                {{ new Date().toLocaleString() }}
              </p>
            </div>
            <button
              type="button"
              name="see-more"
              aria-label="see-more"
              class="text-gray-600 text-sm border py-1 px-2 rounded-md"
            >
              See more
            </button>
          </div>
          <span class="text-gray-500 text-sm">Seen in HK</span>
        </div>
      </div>
    </fieldset>
    <fieldset class="my-4">
      <legend class="text-base font-medium text-gray-900 pr-4">
        OAuth2
      </legend>
      <div class="mt-4 space-y-4">
        <div class="flex items-start">
          <div class="flex items-center h-5">
            <input
              id="github"
              name="github"
              type="checkbox"
              class="block border-gray-300 rounded cursor-pointer"
              aria-label="github"
            >
          </div>
          <div class="ml-3 text-sm">
            <label
              for="github"
              class="font-medium text-gray-700"
            >Github</label>
            <p class="text-gray-500">
              {{ new Date().toString() }}
            </p>
          </div>
        </div>
      </div>
    </fieldset>
  </div>
</template>


<script lang="ts" setup>
import { reactive, ref } from 'vue'

import { useRouter } from "vue-router";

import { instance, SERVER_URL } from "@/api";

const username = ref(JSON.parse(sessionStorage.getItem("account") || '').username)

const router = useRouter();

let pwd = reactive({
  old: '',
  new: '',
  confirm: ''
})

const onSubmit = async () => {
  if (!pwd.old || !pwd.new || !pwd.confirm) {
    alert("数据校验未通过！")
  } else {
    await instance.patch(SERVER_URL.account.concat("/", username.value), pwd).then(() => {
      sessionStorage.clear()
      router.replace({ path: "/signin" });
    })
  }
}
</script>