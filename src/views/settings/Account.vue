<template>
  <div class="shadow overflow-hidden bg-white sm:rounded-md">
    <div class="px-6 py-4 space-y-6 divide-y">
      <fieldset class="-mb-4"></fieldset>
      <fieldset>
        <legend class="font-medium text-gray-900 pr-4">Privileges</legend>
        <div class="mt-4 space-y-4">
          <div class="flex items-start justify-between">
            <div class="text-sm">
              <label for="nickname" class="font-medium text-gray-700">Nickname</label>
              <input
                id="nickname"
                name="nickname"
                type="text"
                class="border-gray-300 rounded cursor-pointer sr-only"
              />
              <p class="text-gray-500">布吉岛</p>
            </div>
            <button type="button" class="text-gray-500 hover:text-blue-600">edit</button>
          </div>
          <div class="flex items-start justify-between">
            <div class="text-sm">
              <label for="phoneNumber" class="font-medium text-gray-700">Phone Number</label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                class="border-gray-300 rounded cursor-pointer sr-only"
              />
              <p class="text-gray-500">187****3090</p>
            </div>
            <button type="button" class="text-gray-500 hover:text-blue-600">edit</button>
          </div>
          <div class="flex items-start justify-between">
            <div class="text-sm">
              <label for="email" class="font-medium text-gray-700">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                class="border-gray-300 rounded cursor-pointer sr-only"
              />
              <p class="text-gray-500">lea***e@leafage.top</p>
            </div>
            <button type="button" class="text-gray-500 hover:text-blue-600">edit</button>
          </div>
        </div>
      </fieldset>
      <fieldset>
        <legend class="font-medium text-gray-900 pr-4">By Email</legend>
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
              <p class="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
            </div>
          </div>
        </div>
      </fieldset>
      <fieldset>
        <legend class="font-medium text-gray-900 pr-4">Push Notifications</legend>
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
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";

import instance from "@/api";
import { SERVER_URL, Account } from "@/api/request";

let account = ref<Account>({});

const username = ref(JSON.parse(sessionStorage.getItem("user") || '').username)

/**
 * 查询
 */
const fetch = async (): Promise<void> => {
  if (username.value && username.value.length > 0) {
    // await instance.get(SERVER_URL.account.concat("/", username.value)).then(res =>
    //   account.value = res.data
    // )
  }
}

/**
 * 提交
 */
const onSubmit = async (): Promise<void> => {
  if (username.value && username.value.length > 0) {
    let data = { ...account.value, modifier: username.value }
    await instance.post(SERVER_URL.account, data).then((res) =>
      account.value = res.data
    );
  }
};

onMounted(() => {
  fetch()
})
</script>