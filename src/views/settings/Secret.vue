<template>
  <div>
    <div class="shadow overflow-hidden sm:rounded-md">
      <div class="px-4 py-5 bg-white space-y-6 sm:p-6 divide-y">
        <fieldset>
          <legend class="text-base font-medium text-gray-900">Privileges</legend>
          <div class="mt-4 space-y-4">
            <div class="flex items-start justify-between">
              <div class="text-sm">
                <label for="comments" class="font-medium text-gray-700">Password</label>
                <input
                  id="comments"
                  name="comments"
                  type="text"
                  class="border-gray-300 rounded cursor-pointer sr-only"
                />
                <p class="text-gray-500">187****3090</p>
              </div>
              <button type="button" class="text-gray-500 hover:text-blue-600">edit</button>
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend class="text-base font-medium text-gray-900 pr-4">OAuth2</legend>
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
                <label for="comments" class="font-medium text-gray-700">Github</label>
                <p class="text-gray-500">{{ new Date().toString() }}</p>
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
                <p class="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
    </div>
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

import instance from "../../api";
import { SERVER_URL } from "../../api/request";
import Model from "/@/components/Model.vue";

const router = useRouter();

let isShow = ref(false)
let password = ref("");
let newPassword = ref("");
let confirmPassword = ref("");

const onSumbit = async (): Promise<void> => {
  if (newPassword.value === confirmPassword.value) {
    await instance.patch(SERVER_URL.user).then(() => {
      router.replace("/signin");
    });
  }
};

const modelOperate = (operate: boolean): void => {
  isShow.value = operate
}

const modelCommit = () => { }
</script>