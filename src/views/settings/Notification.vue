<template>
  <div>
    <form @submit.prevent>
      <div class="shadow overflow-hidden sm:rounded-md">
        <div class="px-4 py-5 bg-white space-y-6 sm:p-6 divide-y">
          <fieldset>
            <legend class="text-base font-medium text-gray-900">By Email</legend>
            <div class="mt-4 space-y-4">
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input
                    id="comments"
                    name="comments"
                    type="checkbox"
                    class="border-gray-300 rounded cursor-pointer"
                  />
                </div>
                <div class="ml-3 text-sm">
                  <label for="comments" class="font-medium text-gray-700">Comments</label>
                  <p class="text-gray-500">Get notified when someones posts a comment on a posting.</p>
                </div>
              </div>
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input
                    id="candidates"
                    name="candidates"
                    type="checkbox"
                    class="border-gray-300 rounded cursor-pointer"
                  />
                </div>
                <div class="ml-3 text-sm">
                  <label for="candidates" class="font-medium text-gray-700">Candidates</label>
                  <p class="text-gray-500">Get notified when a candidate applies for a job.</p>
                </div>
              </div>
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input
                    id="offers"
                    name="offers"
                    type="checkbox"
                    class="border-gray-300 rounded cursor-pointer"
                  />
                </div>
                <div class="ml-3 text-sm">
                  <label for="offers" class="font-medium text-gray-700">Offers</label>
                  <p
                    class="text-gray-500"
                  >Get notified when a candidate accepts or rejects an offer.</p>
                </div>
              </div>
            </div>
          </fieldset>
          <fieldset>
            <legend class="text-base font-medium text-gray-900 pr-4">Push Notifications</legend>
            <p class="text-sm text-gray-500">These are delivered via SMS to your mobile phone.</p>
            <div class="mt-4 space-y-4">
              <div class="flex items-center">
                <input
                  id="push-everything"
                  name="push-notifications"
                  type="radio"
                  class="border-gray-300 cursor-pointer"
                />
                <label
                  for="push-everything"
                  class="ml-3 block text-sm font-medium text-gray-700"
                >Everything</label>
              </div>
              <div class="flex items-center">
                <input
                  id="push-email"
                  name="push-notifications"
                  type="radio"
                  class="border-gray-300 cursor-pointer"
                />
                <label
                  for="push-email"
                  class="ml-3 block text-sm font-medium text-gray-700"
                >Same as email</label>
              </div>
              <div class="flex items-center">
                <input
                  id="push-nothing"
                  name="push-notifications"
                  type="radio"
                  class="border-gray-300 cursor-pointer"
                />
                <label
                  for="push-nothing"
                  class="ml-3 block text-sm font-medium text-gray-700"
                >No push notifications</label>
              </div>
            </div>
          </fieldset>
        </div>
        <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            type="submit"
            class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
          >Save</button>
        </div>
      </div>
    </form>
    <Model :isShow="isShow" @cancelAction="modelOperate" @commitAction="modelCommit">
      <div class="grid gap-4">
        <div>
          <label for="oldPassword">Old Password</label>
          <input
            id="oldPassword"
            name="oldPassword"
            type="password"
            v-model="password"
            class="rounded-md w-full border border-gray-300 mt-1"
            placeholder="Old Password"
            required
            minlength="8"
            maxlength="16"
            autofocus
          />
        </div>
        <div>
          <label for="newPassword">New Password</label>
          <input
            id="newPassword"
            name="newPassword"
            type="password"
            v-model="newPassword"
            class="rounded-md w-full border border-gray-300 mt-1"
            placeholder="New Password"
            required
            minlength="8"
            maxlength="16"
          />
        </div>
        <div>
          <label for="confirmPassword">Confirm New Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            v-model="confirmPassword"
            class="rounded-md w-full border border-gray-300 mt-1"
            placeholder="Confirm New Password"
            required
            minlength="8"
            maxlength="16"
          />
        </div>
      </div>
    </Model>
  </div>
</template>


<script lang="ts" setup>
import { ref } from "vue";

import { useRouter } from "vue-router";

import instance from "@/api";
import { SERVER_URL } from "@/api/request";
import Model from "@/components/Model.vue";

const router = useRouter();

let isShow = ref(false)
let password = ref("");
let newPassword = ref("");
let confirmPassword = ref("");

/**
 * 表单提交
 */
const onSumbit = async (): Promise<void> => {
  if (newPassword.value === confirmPassword.value) {
    await instance.patch(SERVER_URL.user).then(() => {
      router.replace("/signin");
    });
  }
};

/**
 * 开关
 */
const modelOperate = (operate: boolean): void => {
  isShow.value = operate
}
/**
 * 提交
 */
const modelCommit = (): void => { }
</script>